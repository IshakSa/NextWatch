package me.nextwatch.NextWatch.content;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ContentType {
    MOVIE,
    TV,
    PERSON;

    @JsonValue
    public String toLower() {
        return this.name().toLowerCase();
    }
}
