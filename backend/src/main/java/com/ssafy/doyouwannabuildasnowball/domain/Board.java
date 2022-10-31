package com.ssafy.doyouwannabuildasnowball.domain;

import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Builder
public class Board extends BaseEntity {
    @Id
    @Column(name = "board_id")
    private Long boardId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snowglobe_id")
    private Snowglobe snowglobe;

    @Column(length = 200)
    private String content;

    @Column(length = 200)
    private String picture;


    @Builder
    public Board(Long boardId, Snowglobe snowglobe, String content, String picture) {
        this.boardId = boardId;
        this.snowglobe = snowglobe;
        this.content = content;
        this.picture = picture;
    }


    public void contentUpdate(String content, String picture) {

        this.content = content;
        this.picture = picture;
    }
}
