package com.ssafy.doyouwannabuildasnowball.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -2067761803L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity _super = new com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity(this);

    public final EnumPath<com.ssafy.doyouwannabuildasnowball.domain.type.AuthProvider> authProvider = createEnum("authProvider", com.ssafy.doyouwannabuildasnowball.domain.type.AuthProvider.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final StringPath email = createString("email");

    public final NumberPath<Long> kakaoId = createNumber("kakaoId", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath profileImageUrl = createString("profileImageUrl");

    public final StringPath refreshToken = createString("refreshToken");

    public final EnumPath<com.ssafy.doyouwannabuildasnowball.domain.type.MemberRole> role = createEnum("role", com.ssafy.doyouwannabuildasnowball.domain.type.MemberRole.class);

    public final QSnowglobe snowglobe;

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.snowglobe = inits.isInitialized("snowglobe") ? new QSnowglobe(forProperty("snowglobe"), inits.get("snowglobe")) : null;
    }

}

