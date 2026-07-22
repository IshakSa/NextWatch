package me.nextwatch.NextWatch.user;

import me.nextwatch.NextWatch.content.dtos.ContentSummaryDto;
import me.nextwatch.NextWatch.recommendation.EmbeddingService;
import me.nextwatch.NextWatch.recommendation.RecommendationService;
import me.nextwatch.NextWatch.security.JwtService;
import me.nextwatch.NextWatch.user.dtos.LoginDto;
import me.nextwatch.NextWatch.user.dtos.LoginResponseDto;
import me.nextwatch.NextWatch.user.dtos.RegisterDto;
import me.nextwatch.NextWatch.watchlist.WatchlistItem;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmbeddingService embeddingService;
    private final RecommendationService recommendationService;

    public UserService(
            UserRepository userRepository,
            UserMapper userMapper,
            BCryptPasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            EmbeddingService embeddingService,
            RecommendationService recommendationService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.embeddingService = embeddingService;
        this.recommendationService = recommendationService;
    }

    public User register(RegisterDto userDto) {
        String hashedPassword = passwordEncoder.encode(userDto.password());
        User user = userMapper.toUserEntity(userDto, hashedPassword);

        userRepository.save(user);
        return user;
    }

    public LoginResponseDto login(LoginDto userDto) {
        UsernamePasswordAuthenticationToken loginToken =
                new UsernamePasswordAuthenticationToken(userDto.email(), userDto.password());

        Authentication authentication = authenticationManager.authenticate(loginToken);

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(userDto.email(), "USER");
            return new LoginResponseDto(token, jwtService.getExpirationTime());
        } else {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    public void delete(Integer userId) {
        userRepository.deleteById(userId);
    }

    public void updateEmbedding(Integer userId, List<WatchlistItem> watchlist) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        float[] embedding = embeddingService.getUserEmbedding(watchlist);
        user.setEmbedding(embedding);

        userRepository.save(user);
    }

    public List<ContentSummaryDto> getRecommendations(Integer userId, int limit) {
        return recommendationService.getUserRecommendations(userId, limit);
    }
}
