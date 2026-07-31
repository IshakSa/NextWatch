package me.nextwatch.NextWatch;

import me.nextwatch.NextWatch.user.User;
import me.nextwatch.NextWatch.user.UserRepository;
import me.nextwatch.NextWatch.user.UserService;
import me.nextwatch.NextWatch.user.dtos.RegisterDto;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

@SpringBootApplication
@EnableFeignClients
public class NextWatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(NextWatchApplication.class, args);
    }

    // creates demo account if not found in database
    @Bean
    public CommandLineRunner commandLineRunner(UserService userService, UserRepository userRepository) {
        return args -> {
            Optional<User> foundUser = userRepository.findByEmail("test@mail.com");
            if (foundUser.isEmpty()) {
                userService.register(RegisterDto.builder()
                        .username("testAccount")
                        .email("test@mail.com")
                        .password("Test1234")
                        .acceptedTos(true)
                        .build());
            }
        };
    }
}
