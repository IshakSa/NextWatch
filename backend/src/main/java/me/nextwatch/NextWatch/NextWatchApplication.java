package me.nextwatch.NextWatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class NextWatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(NextWatchApplication.class, args);
    }
}
