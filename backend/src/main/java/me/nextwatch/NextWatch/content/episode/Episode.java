package me.nextwatch.NextWatch.content.episode;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import me.nextwatch.NextWatch.content.season.Season;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Episode {
    @Id
    private Integer id;

    private String name;
    private String stillPath;
    private Integer runtime;
    private String overview;
    private Integer episodeNumber;

    @ManyToOne
    @JoinColumn(name = "season_id")
    private Season season;
}
