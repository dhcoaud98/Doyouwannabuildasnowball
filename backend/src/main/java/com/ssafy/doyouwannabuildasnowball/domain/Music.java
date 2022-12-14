package com.ssafy.doyouwannabuildasnowball.domain;

import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Music extends BaseEntity {

    @Id
    @Column(name = "music_id")
    private Long musicId;

    @Column(length = 200)
    private String url;

    @Column(length = 200)
    private String title;


}
