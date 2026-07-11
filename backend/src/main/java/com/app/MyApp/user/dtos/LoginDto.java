package com.app.MyApp.user.dtos;

import lombok.Builder;

@Builder
public record LoginDto(
        String email,
        String password) {
}
