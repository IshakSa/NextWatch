package me.nextwatch.NextWatch.content.provider;

import jakarta.persistence.*;
import lombok.*;
import me.nextwatch.NextWatch.content.Content;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Provider {
    @Id
    private String id;

    private String countryCode;
    private String logoPath;
    private String name;
    private Integer displayPriority;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "content_id", referencedColumnName = "contentId"),
        @JoinColumn(name = "content_type", referencedColumnName = "contentType")
    })
    private Content content;
}
