package com.ssafy.doyouwannabuildasnowball.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRequest is a Querydsl query type for Request
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRequest extends EntityPathBase<Request> {

    private static final long serialVersionUID = 470704916L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRequest request = new QRequest("request");

    public final com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity _super = new com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity(this);

    public final QMember ask;

    public final QMember asked;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final NumberPath<Long> requestId = createNumber("requestId", Long.class);

    public QRequest(String variable) {
        this(Request.class, forVariable(variable), INITS);
    }

    public QRequest(Path<? extends Request> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRequest(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRequest(PathMetadata metadata, PathInits inits) {
        this(Request.class, metadata, inits);
    }

    public QRequest(Class<? extends Request> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ask = inits.isInitialized("ask") ? new QMember(forProperty("ask"), inits.get("ask")) : null;
        this.asked = inits.isInitialized("asked") ? new QMember(forProperty("asked"), inits.get("asked")) : null;
    }

}

