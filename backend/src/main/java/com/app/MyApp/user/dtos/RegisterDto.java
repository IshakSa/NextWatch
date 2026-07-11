package com.app.MyApp.user.dtos;

import lombok.Builder;

@Builder
public record RegisterDto(
        String username,
        String email,
        String password,
        boolean acceptedTos) {
}
