package me.nextwatch.NextWatch.content.credit;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import me.nextwatch.NextWatch.content.Content;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Credit {
    @Id
    private Integer id;

    private String type;
    private String name;
    private String profilePath;

    @Nullable
    private String character;

    private Integer displayOrder;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "content_id", referencedColumnName = "contentId"),
        @JoinColumn(name = "content_type", referencedColumnName = "contentType")
    })
    private Content content;
}
