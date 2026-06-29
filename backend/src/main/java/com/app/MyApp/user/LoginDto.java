package com.app.MyApp.user;

import lombok.Builder;

@Builder
public record LoginDto(
        String email,
        String password) {
}
