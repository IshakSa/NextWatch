package me.nextwatch.NextWatch.user;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Component
@EnableScheduling
public class DemoAccountResetTask {
    private final UserRepository userRepository;

    public DemoAccountResetTask(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void resetDemoAccount() {
        userRepository.findByEmail("test@mail.com").ifPresent(user -> {
            if (user.getWatchlistItems() != null) {
                user.getWatchlistItems().clear();
            } else {
                user.setWatchlistItems(new ArrayList<>());
            }
            user.setEmbedding(null);
            userRepository.save(user);
        });
    }
}
