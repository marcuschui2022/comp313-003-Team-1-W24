package com.foodista.services;

import com.foodista.entities.User;
import com.foodista.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {
    private final UserRepository userRepository;

    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Value("${token.secret.key}")
    String jwtSecretKey;

    @Value("${token.expirationms}")
    Long jwtExpirationMs;

    String jwtSecretKeyBase64;
    private Key key;

    @PostConstruct
    private void init() {
        jwtSecretKeyBase64 = Base64.getEncoder().encodeToString(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecretKeyBase64);
        key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractUserId(String token) {
        // System.out.println("extractUserId");
        Claims claims = extractAllClaims(token);
        //  System.out.println(claims);
        //   System.out.println(claims.get("userId"));

        String id = claims.get("userId") + "";
        return id;
    }

    /**
     * Extracts the user details from the provided token.
     *
     * @param token The token from which to extract the user details
     * @return An Optional object that contains the User details if found, otherwise empty
     */
    public Optional<User> extractUserDetails(String token) {
        String userId = this.extractUserId(token);
        return this.userRepository.findById(Long.valueOf(userId));
    }

    public String generateToken(User userDetails) {
        Map<String, Object> obj = new HashMap<>();
        obj.put("userId", userDetails.getUserId());
        return generateToken(obj, userDetails);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(jwtSecretKeyBase64);
//        return Keys.hmacShaKeyFor(keyBytes);
        return key;
    }

}
