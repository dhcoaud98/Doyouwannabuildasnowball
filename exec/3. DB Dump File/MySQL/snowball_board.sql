-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: k7a601.p.ssafy.io    Database: snowball
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `snowglobe_id` bigint DEFAULT NULL,
  `writer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKk8d40fupwusy4ad7u3jfxceja` (`snowglobe_id`),
  KEY `FKi57kt4qb1qssjljxotb26a4h0` (`writer_id`),
  CONSTRAINT `FKi57kt4qb1qssjljxotb26a4h0` FOREIGN KEY (`writer_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKk8d40fupwusy4ad7u3jfxceja` FOREIGN KEY (`snowglobe_id`) REFERENCES `snowglobe` (`snowglobe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (4,'2022-11-19 08:55:51','2022-11-19 08:55:51','바꿔라!!','https://601snowball.s3-ap-northeast-2.amazonaws.com/boardImage/2022-11-20-180803-709Z5.jpeg',5,1),(5,'2022-11-19 08:55:57','2022-11-19 08:55:57','바꿔버릴거야!','https://www.gousa.or.kr/sites/default/files/styles/16_9_770x433/public/images/hero_media_image/2016-12/Fish%20Creek%20Main%20Street%20Holiday%20Scene.jpg?h=7685ba0d&itok=pP145ocO',5,1),(7,'2022-11-20 07:04:17','2022-11-20 07:04:17','ㅎㅇㅎㅇ','https://www.gousa.or.kr/sites/default/files/styles/16_9_770x433/public/images/hero_media_image/2016-12/Fish%20Creek%20Main%20Street%20Holiday%20Scene.jpg?h=7685ba0d&itok=pP145ocO',5,1),(10,'2022-11-20 08:43:51','2022-11-20 08:43:51','','https://601snowball.s3-ap-northeast-2.amazonaws.com/boardImage/2022-11-20-174551-075Z8.jpeg',3,1),(20,'2022-11-20 11:51:53','2022-11-20 11:51:53','!!!!!','https://601snowball.s3-ap-northeast-2.amazonaws.com/boardImage/2022-11-20-205225-564Z5.jpeg',5,5),(22,'2022-11-20 12:21:39','2022-11-20 12:21:39','','https://601snowball.s3-ap-northeast-2.amazonaws.com/boardImage/2022-11-20-212207-822Z2.jpeg',2,2),(23,'2022-11-20 12:22:19','2022-11-20 12:22:19','','https://601snowball.s3-ap-northeast-2.amazonaws.com/boardImage/2022-11-20-212207-822Z2.jpeg',2,2),(26,'2022-11-20 12:23:43','2022-11-20 12:23:43','안녕','',4,4),(27,'2022-11-20 12:24:12','2022-11-20 12:24:12','이것은 나의 방명록입니다.','https://601snowball.s3-ap-northeast-2.amazonaws.com/boardImage/2022-11-20-212411-132Z2.jpeg',4,2),(28,'2022-11-20 13:24:03','2022-11-20 13:24:03','승훈아 우리 예전에 여행 갔을 때 참 좋았다 그치?','https://601snowball.s3-ap-northeast-2.amazonaws.com/boardImage/2022-11-20-222313-765Z2.jpeg',4,2);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  0:01:22
