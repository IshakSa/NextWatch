package com.app.MyApp.user;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String email;

    private String password;
    private String username;
    private boolean acceptedTos;

    @CreationTimestamp
    private Instant acceptedTosAt;

    @CreationTimestamp
    private Instant createdAt;
}
