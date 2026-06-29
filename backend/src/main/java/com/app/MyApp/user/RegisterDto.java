package com.app.MyApp.user;

import lombok.Builder;

@Builder
public record RegisterDto(
        String username,
        String email,
        String password,
        boolean acceptedTerms) {
}
