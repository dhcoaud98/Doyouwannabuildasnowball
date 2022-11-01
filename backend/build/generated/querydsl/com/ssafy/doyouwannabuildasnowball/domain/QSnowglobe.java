package com.ssafy.doyouwannabuildasnowball.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSnowglobe is a Querydsl query type for Snowglobe
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSnowglobe extends EntityPathBase<Snowglobe> {

    private static final long serialVersionUID = 652682639L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSnowglobe snowglobe = new QSnowglobe("snowglobe");

    public final com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity _super = new com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final QMember maker;

    public final BooleanPath makerSaved = createBoolean("makerSaved");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final QMusic music;

    public final QMember receiver;

    public final BooleanPath receiverSaved = createBoolean("receiverSaved");

    public final StringPath screenshot = createString("screenshot");

    public final NumberPath<Long> snowglobeId = createNumber("snowglobeId", Long.class);

    public QSnowglobe(String variable) {
        this(Snowglobe.class, forVariable(variable), INITS);
    }

    public QSnowglobe(Path<? extends Snowglobe> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSnowglobe(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSnowglobe(PathMetadata metadata, PathInits inits) {
        this(Snowglobe.class, metadata, inits);
    }

    public QSnowglobe(Class<? extends Snowglobe> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.maker = inits.isInitialized("maker") ? new QMember(forProperty("maker"), inits.get("maker")) : null;
        this.music = inits.isInitialized("music") ? new QMusic(forProperty("music"), inits.get("music")) : null;
        this.receiver = inits.isInitialized("receiver") ? new QMember(forProperty("receiver"), inits.get("receiver")) : null;
    }

}

