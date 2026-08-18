package me.nextwatch.NextWatch;

import me.nextwatch.NextWatch.user.DemoAccountResetTask;
import me.nextwatch.NextWatch.user.User;
import me.nextwatch.NextWatch.user.UserRepository;
import me.nextwatch.NextWatch.user.UserService;
import me.nextwatch.NextWatch.user.dtos.RegisterDto;
import me.nextwatch.NextWatch.watchlist.WatchlistService;
import me.nextwatch.NextWatch.watchlist.dtos.WatchlistAddDto;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.Optional;

@SpringBootApplication
@EnableFeignClients
public class NextWatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(NextWatchApplication.class, args);
    }

    // creates demo account if not found in database
    @Bean
    public CommandLineRunner commandLineRunner(
            UserService userService,
            UserRepository userRepository,
            WatchlistService watchlistService,
            DemoAccountResetTask demoAccountResetTask) {
        return args -> {
            Optional<User> foundUser = userRepository.findByEmail("test@mail.com");
            if (foundUser.isEmpty()) {
                User user = userService.register(RegisterDto.builder()
                        .username("testAccount")
                        .email("test@mail.com")
                        .password("Test1234")
                        .acceptedTos(true)
                        .build());
                List<WatchlistAddDto> defaultWatchlist = demoAccountResetTask.getDefaultWatchlist();
                defaultWatchlist.forEach(item -> watchlistService.add(user.getId(), item));
            }
        };
    }
}
