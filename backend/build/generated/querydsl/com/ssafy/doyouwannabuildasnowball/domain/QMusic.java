package com.ssafy.doyouwannabuildasnowball.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMusic is a Querydsl query type for Music
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMusic extends EntityPathBase<Music> {

    private static final long serialVersionUID = -1867334678L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMusic music = new QMusic("music");

    public final com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity _super = new com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity(this);

    public final QCategory category;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final NumberPath<Long> musicId = createNumber("musicId", Long.class);

    public final StringPath title = createString("title");

    public final StringPath url = createString("url");

    public QMusic(String variable) {
        this(Music.class, forVariable(variable), INITS);
    }

    public QMusic(Path<? extends Music> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMusic(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMusic(PathMetadata metadata, PathInits inits) {
        this(Music.class, metadata, inits);
    }

    public QMusic(Class<? extends Music> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new QCategory(forProperty("category")) : null;
    }

}

