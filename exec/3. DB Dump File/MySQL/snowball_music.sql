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
-- Table structure for table `music`
--

DROP TABLE IF EXISTS `music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music` (
  `music_id` bigint NOT NULL,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`music_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `music`
--

LOCK TABLES `music` WRITE;
/*!40000 ALTER TABLE `music` DISABLE KEYS */;
INSERT INTO `music` VALUES (0,'2022-11-19 01:11:15','2022-11-19 01:11:15','We Wish You a Merry Christmas','https://601snowball.s3.ap-northeast-2.amazonaws.com/music/We+Wish+You+a+Merry+Christmas.wav'),(1,'2022-11-19 01:11:48','2022-11-19 01:11:48','Holy Night','https://601snowball.s3.ap-northeast-2.amazonaws.com/music/O+Holy+Night(A.Sax).wav'),(2,'2022-11-19 01:12:23','2022-11-19 01:12:23','Joy To The World(EDM)','https://601snowball.s3.ap-northeast-2.amazonaws.com/music/Joy+To+The+World(EDM).mp3'),(3,'2022-11-19 01:12:47','2022-11-19 01:12:47','천사들의 노래가(Angels We Have Heard on High)','https://601snowball.s3.ap-northeast-2.amazonaws.com/music/%EC%B2%9C%EC%82%AC%EB%93%A4%EC%9D%98+%EB%85%B8%EB%9E%98%EA%B0%80(Angels+We+Have+Heard+on+High).wav'),(4,'2022-11-19 01:13:07','2022-11-19 01:13:07','징글벨(Jingle Bell)','https://601snowball.s3.ap-northeast-2.amazonaws.com/music/%EC%A7%95%EA%B8%80%EB%B2%A8(Jingle+Bell).wav'),(5,'2022-11-19 01:13:33','2022-11-19 01:13:33','오 베들레헴 작은 마을(O Little Town Of Bethlehem)','https://601snowball.s3.ap-northeast-2.amazonaws.com/music/%EC%98%A4+%EB%B2%A0%EB%93%A4%EB%A0%88%ED%97%B4+%EC%9E%91%EC%9D%80+%EB%A7%88%EC%9D%84(O+Little+Town+Of+Bethlehem).wav'),(6,'2022-11-20 14:04:23','2022-11-20 14:04:23','노래 없음',NULL),(7,'2022-11-20 14:04:27','2022-11-20 14:04:27','노래 없음',NULL),(8,'2022-11-20 14:04:30','2022-11-20 14:04:30','노래 없음',NULL),(9,'2022-11-20 14:04:33','2022-11-20 14:04:33','노래 없음',NULL);
/*!40000 ALTER TABLE `music` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  0:01:21
