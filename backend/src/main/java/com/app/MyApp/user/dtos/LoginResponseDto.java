package com.app.MyApp.user.dtos;

public record LoginResponseDto(String token, long expirationTimeMs) {}
