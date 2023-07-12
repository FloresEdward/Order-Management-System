package com.champ.oms.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static com.champ.oms.user.Permission.*;
import static com.champ.oms.document.Role.*;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  private final LogoutHandler logoutHandler;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf()
        .disable().cors().and()
        .authorizeHttpRequests()
        .requestMatchers(
                "/api/v1/auth/**",
                "/v2/api-docs",
                "/v3/api-docs",
                "/v3/api-docs/**",
                "/swagger-resources",
                "/swagger-resources/**",
                "/configuration/ui",
                "/configuration/security",
                "/swagger-ui/**",
                "/webjars/**",
                "/swagger-ui.html"
        )
          .permitAll()
                // CATEGORY MANAGER
                .requestMatchers("/api/v1/management/category/**").hasAnyRole(CATEGORY.name(), ADMIN.name(), TELLER.name(), MENU.name(), ORDER.name())
                .requestMatchers(GET, "/api/v1/management/category/**").hasAnyAuthority(CATEGORY_READ.name())
                .requestMatchers(POST, "/api/v1/management/category/**").hasAnyAuthority(CATEGORY_CREATE.name())
                .requestMatchers(PUT, "/api/v1/management/category/**").hasAnyAuthority(CATEGORY_UPDATE.name())
                .requestMatchers(DELETE, "/api/v1/management/category/**").hasAnyAuthority(CATEGORY_DELETE.name())
                // MENU MANAGER
                .requestMatchers("/api/v1/management/menu/**").hasAnyRole(MENU.name(), ADMIN.name(), TELLER.name(), CATEGORY.name(), ORDER.name())
                .requestMatchers(GET, "/api/v1/management/menu/**").hasAnyAuthority(MENU_READ.name())
                .requestMatchers(POST, "/api/v1/management/menu/**").hasAnyAuthority(MENU_CREATE.name())
                .requestMatchers(PUT, "/api/v1/management/menu/**").hasAnyAuthority(MENU_UPDATE.name())
                .requestMatchers(DELETE, "/api/v1/management/menu/**").hasAnyAuthority(MENU_DELETE.name())
                // ORDER MANAGER
                .requestMatchers("/api/v1/management/order/**").hasAnyRole(ORDER.name(), TELLER.name(), RIDER.name(), MENU.name(), CATEGORY.name(), ADMIN.name())
                .requestMatchers(GET,"/api/v1/management/order/**").hasAnyAuthority(ORDER_READ.name())
                .requestMatchers(POST,"/api/v1/management/order/**").hasAnyAuthority(ORDER_CREATE.name())
                .requestMatchers(PUT,"/api/v1/management/order/**").hasAnyAuthority(ORDER_UPDATE.name())
                .requestMatchers(DELETE,"/api/v1/management/order/**").hasAnyAuthority(ORDER_DELETE.name())
                // ACCOUNT MANAGER
                .requestMatchers("/api/v1/management/user/**").hasAnyRole(ACCOUNT.name(), ADMIN.name(), ORDER.name())
                .requestMatchers(GET,"/api/v1/management/user/**").hasAnyAuthority(ACCOUNT_READ.name())
                .requestMatchers(PUT,"/api/v1/management/user/**").hasAnyAuthority(ACCOUNT_UPDATE.name())
                .requestMatchers(DELETE,"/api/v1/management/user/**").hasAnyAuthority(ACCOUNT_DELETE.name())

//            .requestMatchers("/api/v1/management/**").hasAnyRole(ADMIN.name(), MANAGER.name())
//            .requestMatchers(GET, "/api/v1/management/**").hasAnyAuthority(ADMIN_READ.name(), MANAGER_READ.name())
//            .requestMatchers(POST, "/api/v1/management/**").hasAnyAuthority(ADMIN_CREATE.name(), MANAGER_CREATE.name())
//            .requestMatchers(PUT, "/api/v1/management/**").hasAnyAuthority(ADMIN_UPDATE.name(), MANAGER_UPDATE.name())
//            .requestMatchers(DELETE, "/api/v1/management/**").hasAnyAuthority(ADMIN_DELETE.name(), MANAGER_DELETE.name())

       /* .requestMatchers("/api/v1/admin/**").hasRole(ADMIN.name())
        .requestMatchers(GET, "/api/v1/admin/**").hasAuthority(ADMIN_READ.name())
        .requestMatchers(POST, "/api/v1/admin/**").hasAuthority(ADMIN_CREATE.name())
        .requestMatchers(PUT, "/api/v1/admin/**").hasAuthority(ADMIN_UPDATE.name())
        .requestMatchers(DELETE, "/api/v1/admin/**").hasAuthority(ADMIN_DELETE.name())*/


        .anyRequest()
          .authenticated()
        .and()
          .sessionManagement()
          .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .logout()
        .logoutUrl("/api/v1/auth/logout")
        .addLogoutHandler(logoutHandler)
        .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
    ;

    return http.build();
  }
}
