package com.ssafy.doyouwannabuildasnowball.domain;

import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Board extends BaseEntity {
    @Id
    @Column(name = "board_id")
    private Long boardId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snowball_id")
    private Snowglobe snowglobe;

    @Column(length = 200)
    private String content;

    @Column(length = 200)
    private String picture;
}
