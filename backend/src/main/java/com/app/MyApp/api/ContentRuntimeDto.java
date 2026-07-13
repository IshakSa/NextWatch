package com.app.MyApp.api;

import com.fasterxml.jackson.annotation.JsonAlias;

public record ContentRuntimeDto(
    @JsonAlias("number_of_episodes") int runtime
) {}
