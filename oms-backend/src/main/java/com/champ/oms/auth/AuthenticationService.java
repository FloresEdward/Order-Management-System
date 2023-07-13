package com.champ.oms.auth;

import com.champ.oms.config.JwtService;
import com.champ.oms.document.Role;
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
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final UserService userService;

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

      if(passwordEncoder.matches(requestMap.get("old"), user.getPassword())) {
        user.setPassword(passwordEncoder.encode(requestMap.get("new")));
        repository.save(user);

        return ResponseEntity.ok("Password updated successfully");
      }
    } catch (Exception ex) {
      ex.printStackTrace();
    }

    return ResponseEntity.status(500).build();
  }
}
