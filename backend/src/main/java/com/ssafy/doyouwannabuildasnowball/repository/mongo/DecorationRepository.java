package com.ssafy.doyouwannabuildasnowball.repository.mongo;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Decoration;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DecorationRepository extends MongoRepository<Decoration, Long> {
}
