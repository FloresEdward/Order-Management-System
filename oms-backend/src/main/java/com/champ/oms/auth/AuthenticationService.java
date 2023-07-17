package com.champ.oms.auth;

import com.champ.oms.config.JwtService;
import com.champ.oms.document.Role;
import com.champ.oms.service.MailService;
import com.champ.oms.service.UserService;
import com.champ.oms.token.Token;
import com.champ.oms.token.TokenRepository;
import com.champ.oms.token.TokenType;
import com.champ.oms.document.User;
import com.champ.oms.repo.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final UserService userService;
  private final MailService mailService;

  public AuthenticationResponse register(RegisterRequest request) {
    var user = User.builder()
            .id(new ObjectId().toString())
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail().toLowerCase())
            .password(passwordEncoder.encode(request.getPassword()))
            .status("active")
            .role(request.getRole() != null ? request.getRole() : Role.TELLER)
            .build();
    var savedUser = repository.save(user);
    Map<String, Object> map = new HashMap<>();
    map.put("role", user.getRole());
    var jwtToken = jwtService.generateToken(map, user);
    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {

    try {
      authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                      request.getEmail().toLowerCase(),
                      request.getPassword()
              )
      );
    } catch (AuthenticationException exception) {
        var user = repository.findByEmail(request.getEmail().toLowerCase()).orElseThrow();
        user.setLoginAttempts(user.getLoginAttempts() + 1);

        if(user.getLoginAttempts() >= 3) {
          user.setStatus("locked");
        }

        repository.save(user);

        throw exception;
    }

    var user = repository.findByEmail(request.getEmail().toLowerCase())
        .orElseThrow();
    if (!user.isAccountNonLocked()){
      throw new LockedException("User account is locked");
    }
    Map<String, Object> map = new HashMap<>();
    map.put("role", user.getRole());
    var jwtToken = jwtService.generateToken(map, user);
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
        .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }

  public ResponseEntity<?> changePassword(Map<String, String> requestMap) {
    try {
      User user  = repository.findByEmail(requestMap.get("email")).orElse(null);

      if(passwordEncoder.matches(requestMap.get("oldPassword"), user.getPassword())) {
        user.setPassword(passwordEncoder.encode(requestMap.get("newPassword")));
        repository.save(user);

        return ResponseEntity.ok("Password updated successfully");
      } else {
        return ResponseEntity.status(500).build();
      }
    } catch (Exception ex) {
      ex.printStackTrace();
    }

    return ResponseEntity.status(500).build();
  }

  public ResponseEntity<?> forgotPassword(Map<String, String> requestMap) {

    try {
      User user  = repository.findByEmail(requestMap.get("email")).orElse(null);

      if(!Objects.isNull(user)){
        String temporaryPassword = generateRandomPassword(12);
        user.setPassword(passwordEncoder.encode(temporaryPassword));
        repository.save(user);
        mailService.sendEmail(user.getEmail(), "OMS Temporary Password", temporaryPassword);
      }
      return ResponseEntity.ok("Forgot password sent in email");
    } catch (Exception ex) {
      ex.printStackTrace();
    }
    return ResponseEntity.status(500).build();
  }

  private String generateRandomPassword(int len)
  {
    // ASCII range – alphanumeric (0-9, a-z, A-Z)
    final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    SecureRandom random = new SecureRandom();
    StringBuilder sb = new StringBuilder();

    // each iteration of the loop randomly chooses a character from the given
    // ASCII range and appends it to the `StringBuilder` instance

    for (int i = 0; i < len; i++)
    {
      int randomIndex = random.nextInt(chars.length());
      sb.append(chars.charAt(randomIndex));
    }

    return sb.toString();
  }
}
