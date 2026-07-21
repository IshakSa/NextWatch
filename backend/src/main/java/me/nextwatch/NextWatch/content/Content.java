package me.nextwatch.NextWatch.content;

import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;
import me.nextwatch.NextWatch.content.credit.Credit;
import me.nextwatch.NextWatch.content.provider.Provider;
import me.nextwatch.NextWatch.content.season.Season;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Content {
    @EmbeddedId
    private ContentId id;

    private String title;
    private List<Integer> genreIds;
    private String overview;
    private Integer length;
    private Double rating;
    private String posterPath;
    private String backdropPath;
    private LocalDate releaseDate;
    private String trailerId;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    @Nullable
    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Season> seasons;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Credit> credits;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL)
    private List<Provider> providers;
}
