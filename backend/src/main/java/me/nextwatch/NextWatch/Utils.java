package me.nextwatch.NextWatch;

import java.util.function.Supplier;

public class Utils {
    public static <T, R> R executeIfNonNullElseNull(T nullableData, Supplier<R> action) {
        return nullableData != null ? action.get() : null;
    }
}
