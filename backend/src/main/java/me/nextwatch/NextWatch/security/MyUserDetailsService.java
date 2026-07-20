package me.nextwatch.NextWatch.security;

import me.nextwatch.NextWatch.user.User;
import me.nextwatch.NextWatch.user.UserRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String email) throws UsernameNotFoundException {
        User user =
                userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        return new UserPrincipal(user);
    }
}
