package me.nextwatch.NextWatch.user.dtos;

public record LoginResponseDto(String token, long expirationTimeMs) {}
