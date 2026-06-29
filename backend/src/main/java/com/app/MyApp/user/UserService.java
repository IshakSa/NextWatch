package com.app.MyApp.user;

import org.springframework.stereotype.Service;

import com.app.MyApp.utils.MockData;

@Service
public class UserService {

    public RegisterDto register(RegisterDto user) {
        return user;
    }

    public LoginDto login(LoginDto user) {
        if (user.email().equals(MockData.mockUser.email()) && user.password().equals(MockData.mockUser.password()))
            return user;
        else
            throw new RuntimeException("login failed");
    }

}
