package com.ssafy.doyouwannabuildasnowball.domain;

import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Builder
public class Board extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snowglobe_id")
    private Snowglobe snowglobe;

    @Column(length = 200)
    private String content;

    @Column(length = 200)
    private String picture;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private Member writer;

    @Builder
    public Board(Long boardId, Snowglobe snowglobe, String content, String picture, Member writer) {
        this.boardId = boardId;
        this.snowglobe = snowglobe;
        this.content = content;
        this.picture = picture;
        this.writer = writer;
    }


    public void contentUpdate(String content, String picture) {

        this.content = content;
        this.picture = picture;
    }
}
