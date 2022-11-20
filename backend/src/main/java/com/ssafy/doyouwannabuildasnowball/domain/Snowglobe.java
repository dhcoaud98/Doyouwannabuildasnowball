package com.ssafy.doyouwannabuildasnowball.domain;

import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import com.ssafy.doyouwannabuildasnowball.dto.snowglobe.response.SnowglobeShelfResponseDto;
import lombok.*;

import javax.persistence.*;

@Entity
@NamedNativeQuery(
        name = "set_shelf",
        query = "select snowglobe_id, screenshot, maker_id from snowglobe where (maker_id=:id and maker_saved=true) or (receiver_id=:id and receiver_saved=true)",
        resultSetMapping = "shelf_dto"
)
@SqlResultSetMapping(
        name = "shelf_dto",
        classes = @ConstructorResult(
                targetClass = SnowglobeShelfResponseDto.class,
                columns = {
                        @ColumnResult(name = "snowglobe_id", type = Long.class),
                        @ColumnResult(name = "screenshot", type = String.class),
                        @ColumnResult(name = "maker_id", type = Long.class)
                }
        )
)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Snowglobe extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snowglobe_id")
    private Long snowglobeId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "maker_id")
    private Member maker;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @Column(name = "maker_saved")
    private boolean makerSaved;

    @Column(name = "receiver_saved")
    private boolean receiverSaved;

    @Column(length = 200)
    private String screenshot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_id")
    private Music music;

    public void updateScreenshot(String screenshot) {
        this.screenshot = screenshot;
    }

    public void updateMakerSaved(Boolean makerSaved) {
        this.makerSaved = makerSaved;
    }

    public void updateReceiverSaved(Boolean receiverSaved) {
        this.receiverSaved = receiverSaved;
    }

    public void updateMusic(Music music) {
        this.music = music;
    }
}
