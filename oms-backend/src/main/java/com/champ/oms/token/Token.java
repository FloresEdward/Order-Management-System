package com.champ.oms.token;

import com.champ.oms.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "jwt_security")
public class Token {

//  @Id
//  @GeneratedValue
  public String id;

//  @Column(unique = true)
  public String token;

//  @Enumerated(EnumType.STRING)
  public TokenType tokenType = TokenType.BEARER;

  public boolean revoked;

  public boolean expired;

//  @ManyToOne(fetch = FetchType.LAZY)
//  @JoinColumn(name = "user_id")
  public User user;
}
