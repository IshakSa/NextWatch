package me.nextwatch.NextWatch.user;

import me.nextwatch.NextWatch.user.dtos.RegisterDto;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public User toUserEntity(RegisterDto userDto, String hashedPassword) {
        return User.builder()
                .username(userDto.username())
                .email(userDto.email())
                .password(hashedPassword)
                .acceptedTos(userDto.acceptedTos())
                .build();
    }
}
