package com.app.MyApp.content;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ContentType {
    MOVIE, TV;

    @JsonValue
    public String toLower() {
        return this.name().toLowerCase();
    }
}
