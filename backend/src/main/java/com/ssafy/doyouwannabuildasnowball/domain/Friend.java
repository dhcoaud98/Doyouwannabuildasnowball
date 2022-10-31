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
public class Friend extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long friendId;

    private boolean acceptance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follow_id")
    private Member follow;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followed_id")
    private Member followed;
    
    
  
    public static Friend create(Member follow, Member followed) {
    	
    	Friend friend = new Friend();
    	friend.acceptance = false;
    	friend.follow = follow;
    	friend.followed = followed;
    	
        return friend;
    }
    
    public static Friend approve(Friend friend) {
    	
    	friend.acceptance = true;
    	
        return friend;
    }
    
}
