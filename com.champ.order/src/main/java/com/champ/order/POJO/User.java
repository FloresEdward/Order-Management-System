package com.champ.order.POJO;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Struct;

import java.io.Serializable;
import java.time.LocalDate;

@NamedQuery(name = "User.findByEmailId", query = "select u from User u where u.email=:email")

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "roleId", nullable = false)
    private Long roleId;

    @Column(name = "modifierId")
    private Long modifierId;

    @Column(name = "createdAt", nullable = true)
    private LocalDate createdAt;

    @Column(name = "updatedAt", nullable = true)
    private LocalDate updatedAt;

    @Column(name = "status", nullable = true)
    @Enumerated(EnumType.STRING)
    private UserStatus status;

    public enum UserStatus {
        ACTIVE,
        INACTIVE,
        PENDING,
        BLOCKED
    }

}
