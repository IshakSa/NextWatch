package me.nextwatch.NextWatch.content.season;

import jakarta.persistence.*;
import lombok.*;
import me.nextwatch.NextWatch.content.Content;
import me.nextwatch.NextWatch.content.episode.Episode;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Season {
    @Id
    @GeneratedValue
    private Integer id;

    private Integer seasonNumber;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "content_id", referencedColumnName = "contentId"),
        @JoinColumn(name = "content_type", referencedColumnName = "contentType")
    })
    private Content content;

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    private List<Episode> episodes;
}
