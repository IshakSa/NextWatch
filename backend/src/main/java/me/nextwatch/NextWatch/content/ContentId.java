package me.nextwatch.NextWatch.content;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ContentId implements Serializable {
    private Integer contentId;
    private ContentType contentType;
}
