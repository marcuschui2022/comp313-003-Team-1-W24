package com.foodista.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString

@Table(name = "PAYMENT_DETAIL")
public class PaymentDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payDetId;

    @Column(name = "card_no", nullable = false)
    private String cardNo;

    @Column(name = "card_type", nullable = false)
    private String cardType;

    @Column(name = "expiry_date", nullable = false)
    private Timestamp expiryDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and Setters
}