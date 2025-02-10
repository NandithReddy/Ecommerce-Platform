package com.example.userservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity // Marks this class as a database table
@Table(name = "users") // Optional: Specifies the table name
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Generates a unique ID automatically
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;
}
