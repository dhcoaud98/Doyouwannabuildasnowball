package com.ssafy.doyouwannabuildasnowball.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QElement is a Querydsl query type for Element
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QElement extends EntityPathBase<Element> {

    private static final long serialVersionUID = 2007142273L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QElement element = new QElement("element");

    public final com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity _super = new com.ssafy.doyouwannabuildasnowball.domain.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdTime = _super.createdTime;

    public final NumberPath<Long> elementId = createNumber("elementId", Long.class);

    public final QCategory first;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final QCategory second;

    public final QCategory third;

    public QElement(String variable) {
        this(Element.class, forVariable(variable), INITS);
    }

    public QElement(Path<? extends Element> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QElement(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QElement(PathMetadata metadata, PathInits inits) {
        this(Element.class, metadata, inits);
    }

    public QElement(Class<? extends Element> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.first = inits.isInitialized("first") ? new QCategory(forProperty("first")) : null;
        this.second = inits.isInitialized("second") ? new QCategory(forProperty("second")) : null;
        this.third = inits.isInitialized("third") ? new QCategory(forProperty("third")) : null;
    }

}

