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
-- Table structure for table `snowglobe`
--

DROP TABLE IF EXISTS `snowglobe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `snowglobe` (
  `snowglobe_id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `maker_saved` bit(1) DEFAULT NULL,
  `receiver_saved` bit(1) DEFAULT NULL,
  `screenshot` varchar(200) DEFAULT NULL,
  `maker_id` bigint DEFAULT NULL,
  `music_id` bigint DEFAULT NULL,
  `receiver_id` bigint DEFAULT NULL,
  PRIMARY KEY (`snowglobe_id`),
  KEY `FKoexyy0mebvvstmtbj4nw1ernh` (`maker_id`),
  KEY `FKfsvrp8pynlt3nx1srt7xcxm5` (`music_id`),
  KEY `FKsjw1ij84eq9rvud66shio6w7c` (`receiver_id`),
  CONSTRAINT `FKfsvrp8pynlt3nx1srt7xcxm5` FOREIGN KEY (`music_id`) REFERENCES `music` (`music_id`),
  CONSTRAINT `FKoexyy0mebvvstmtbj4nw1ernh` FOREIGN KEY (`maker_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKsjw1ij84eq9rvud66shio6w7c` FOREIGN KEY (`receiver_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `snowglobe`
--

LOCK TABLES `snowglobe` WRITE;
/*!40000 ALTER TABLE `snowglobe` DISABLE KEYS */;
INSERT INTO `snowglobe` VALUES (2,'2022-11-19 03:11:07','2022-11-19 03:11:25',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/2.png',2,0,2),(3,'2022-11-19 03:16:35','2022-11-20 14:41:01',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/3.png',3,1,3),(4,'2022-11-19 05:56:16','2022-11-20 14:41:53',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/4.png',4,6,4),(5,'2022-11-19 06:28:11','2022-11-20 10:03:54',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/5.png',5,0,5),(6,'2022-11-19 08:11:38','2022-11-19 08:13:38',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/6.png',6,0,6),(7,'2022-11-19 13:00:26','2022-11-20 11:37:17',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/7.png',7,4,7),(8,'2022-11-19 15:06:27','2022-11-19 15:06:30',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/8.png',2,1,5),(9,'2022-11-19 15:10:21','2022-11-19 15:10:21',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/9.png',3,1,4),(10,'2022-11-19 15:16:12','2022-11-19 15:16:13',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/10.png',3,1,4),(11,'2022-11-19 15:26:22','2022-11-19 15:26:22',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/11.png',3,1,4),(12,'2022-11-19 15:26:34','2022-11-19 15:29:49',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/12.png',8,4,8),(13,'2022-11-19 15:27:15','2022-11-19 15:27:15',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/13.png',3,1,4),(14,'2022-11-19 15:39:49','2022-11-19 15:40:21',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/14.png',2,1,5),(15,'2022-11-20 08:40:03','2022-11-20 08:40:06',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/15.png',8,1,3),(16,'2022-11-20 08:41:46','2022-11-20 08:41:46',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/16.png',1,1,3),(17,'2022-11-20 08:57:02','2022-11-20 08:57:04',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/17.png',8,1,3),(18,'2022-11-20 11:38:32','2022-11-20 11:38:32',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/DEFAULT.png',9,0,9),(19,'2022-11-20 11:51:11','2022-11-20 11:51:11',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/19.png',2,1,5),(20,'2022-11-20 11:54:27','2022-11-20 11:54:27',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/20.png',2,1,4),(21,'2022-11-20 11:58:25','2022-11-20 11:58:25',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/21.png',1,1,2),(22,'2022-11-20 12:19:46','2022-11-20 12:19:49',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/22.png',4,1,5),(23,'2022-11-20 12:22:22','2022-11-20 12:22:24',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/23.png',4,1,5),(24,'2022-11-20 12:30:35','2022-11-20 12:30:35',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/24.png',1,1,4),(25,'2022-11-20 12:31:04','2022-11-20 12:31:04',_binary '\0',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/25.png',1,1,4),(26,'2022-11-20 13:22:32','2022-11-20 13:22:38',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/26.png',2,1,5),(27,'2022-11-20 14:50:35','2022-11-20 14:50:35',_binary '',_binary '','https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/DEFAULT.png',10,0,10);
/*!40000 ALTER TABLE `snowglobe` ENABLE KEYS */;
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
