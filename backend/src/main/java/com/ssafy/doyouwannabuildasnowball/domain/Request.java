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
public class Request extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ask_id")
    private Member ask;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asked_id")
    private Member asked;
    
    public static Request create(Member ask, Member asked) {
    	
    	Request request = new Request();
    	request.ask = ask;
    	request.asked = asked;
    	
        return request;
    }
}
