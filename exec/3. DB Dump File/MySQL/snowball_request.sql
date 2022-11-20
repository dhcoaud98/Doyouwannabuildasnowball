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
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `request_id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `ask_id` bigint DEFAULT NULL,
  `asked_id` bigint DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `FK48ufp0bfpl0yum03bclfee7fg` (`ask_id`),
  KEY `FKaboqjuost69d15iukc5jc27r0` (`asked_id`),
  CONSTRAINT `FK48ufp0bfpl0yum03bclfee7fg` FOREIGN KEY (`ask_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKaboqjuost69d15iukc5jc27r0` FOREIGN KEY (`asked_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,'2022-11-19 14:49:09','2022-11-19 14:49:09',2,5),(3,'2022-11-20 05:04:55','2022-11-20 05:04:55',5,3),(4,'2022-11-20 09:01:16','2022-11-20 09:01:16',8,3),(6,'2022-11-20 12:18:53','2022-11-20 12:18:53',4,3),(7,'2022-11-20 12:21:37','2022-11-20 12:21:37',4,5),(8,'2022-11-20 12:21:39','2022-11-20 12:21:39',4,7),(10,'2022-11-20 12:27:51','2022-11-20 12:27:51',5,4),(11,'2022-11-20 12:28:13','2022-11-20 12:28:13',5,8);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
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
