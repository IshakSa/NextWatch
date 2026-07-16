package com.app.MyApp.user;

import org.springframework.stereotype.Service;

import com.app.MyApp.user.dtos.RegisterDto;

@Service
public class UserMapper {

    public User toUserEntity(RegisterDto userDto) {
        User user = User.builder()
                .username(userDto.username())
                .email(userDto.email())
                .password(userDto.password())
                .acceptedTos(userDto.acceptedTos())
                .build();
        return user;
    }

}
