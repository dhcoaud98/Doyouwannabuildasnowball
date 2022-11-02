package com.ssafy.doyouwannabuildasnowball.domain;

import com.ssafy.doyouwannabuildasnowball.domain.base.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Component extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "component_id")
    private Long componentId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "category_id", name = "first")
    private Category first;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "category_id", name = "second")
    private Category second;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "category_id", name = "third")
    private Category third;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "category_id")
//    private List<Category> categories;

}


