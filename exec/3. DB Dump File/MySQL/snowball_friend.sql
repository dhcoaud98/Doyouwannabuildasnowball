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
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `friend_id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `acceptance` bit(1) NOT NULL,
  `follow_id` bigint DEFAULT NULL,
  `followed_id` bigint DEFAULT NULL,
  PRIMARY KEY (`friend_id`),
  KEY `FKppwnd84vf0o36seaarec18fju` (`follow_id`),
  KEY `FK81bftweewmo6qecln7ogbwkki` (`followed_id`),
  CONSTRAINT `FK81bftweewmo6qecln7ogbwkki` FOREIGN KEY (`followed_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKppwnd84vf0o36seaarec18fju` FOREIGN KEY (`follow_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES (2,'2022-11-19 09:27:38','2022-11-19 11:10:45',_binary '',5,3),(4,'2022-11-19 09:27:47','2022-11-19 13:37:16',_binary '',5,2),(6,'2022-11-19 15:44:22','2022-11-20 12:18:33',_binary '',2,4),(7,'2022-11-19 15:53:40','2022-11-20 08:44:26',_binary '',2,3),(8,'2022-11-20 08:34:33','2022-11-20 11:21:40',_binary '',8,2),(9,'2022-11-20 08:35:07','2022-11-20 08:44:25',_binary '',8,3),(10,'2022-11-20 09:01:25','2022-11-20 09:01:25',_binary '\0',8,4),(11,'2022-11-20 09:01:34','2022-11-20 12:21:21',_binary '',8,7),(12,'2022-11-20 09:01:39','2022-11-20 12:13:43',_binary '',8,5),(13,'2022-11-20 09:01:44','2022-11-20 09:01:44',_binary '\0',8,6),(14,'2022-11-20 12:18:27','2022-11-20 12:18:27',_binary '\0',4,6),(15,'2022-11-20 12:19:12','2022-11-20 12:21:30',_binary '',4,5),(16,'2022-11-20 12:20:47','2022-11-20 12:21:20',_binary '',4,7);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
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
