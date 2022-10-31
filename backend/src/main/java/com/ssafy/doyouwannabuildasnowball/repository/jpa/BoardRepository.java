package com.ssafy.doyouwannabuildasnowball.repository.jpa;

import com.ssafy.doyouwannabuildasnowball.domain.Board;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {


    @Query("select b from Board b where b.snowglobe.id =:snowglobeId")
    Optional<List<Board>> findAllContents(Long snowglobeId);
    @Transactional
    @Modifying
    @Query("UPDATE Board b SET b.content = :content, b.picture = :picture WHERE b.boardId = :boardId")
    void updateBoardContent(String content, String picture, Long boardId);

}
