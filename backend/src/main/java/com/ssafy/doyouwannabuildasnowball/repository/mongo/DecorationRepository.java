package com.ssafy.doyouwannabuildasnowball.repository.mongo;

import com.ssafy.doyouwannabuildasnowball.domain.collection.Decoration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DecorationRepository extends JpaRepository<Decoration, String> {
}
