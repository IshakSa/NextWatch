package com.app.MyApp.config;

import org.springframework.core.convert.converter.Converter;

import org.springframework.core.convert.converter.ConverterFactory;

@SuppressWarnings("rawtypes")
public final class StringToEnumConverterFactory implements ConverterFactory<String, Enum> {

    @SuppressWarnings("unchecked")
    public <T extends Enum> Converter<String, T> getConverter(Class<T> targetType) {
        return new StringToEnumConverter(targetType);
    }

    private final class StringToEnumConverter<T extends Enum> implements Converter<String, T> {

        private final Class<T> enumType;

        public StringToEnumConverter(Class<T> enumType) {
            this.enumType = enumType;
        }

        @SuppressWarnings("unchecked")
        public T convert(String source) {
            if (source == null || source.trim().isEmpty()) {
                return null;
            }

            return (T) Enum.valueOf(this.enumType, source.trim().toUpperCase());
        }
    }
}
