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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  `auth_provider` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `kakao_id` bigint DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `profile_image_url` varchar(200) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `snowglobe_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_hh9kg6jti4n1eoiertn2k6qsc` (`nickname`),
  KEY `FK3dlgls2hqot7oofddbl8x6jwi` (`snowglobe_id`),
  CONSTRAINT `FK3dlgls2hqot7oofddbl8x6jwi` FOREIGN KEY (`snowglobe_id`) REFERENCES `snowglobe` (`snowglobe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2022-11-19 15:25:52','2022-11-19 15:25:52',NULL,NULL,NULL,'guest','guest',NULL,NULL,NULL,NULL),(2,'2022-11-19 03:11:07','2022-11-19 03:11:07','KAKAO','gumska@nate.com',2511158732,'성은','크리스마스트리','http://k.kakaocdn.net/dn/GJsAK/btrQrujvSEo/NvufiJKWiIP0fuXcF947m1/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4OTUwNjU1LCJleHAiOjE2Njk1NTU0NTV9.koATRgMX5m9gOlTT3AKIn-18iYirP_A5gAUyzoxn0v9_8DevitmcGTWoMZdToqh8wd7bFa9np0ULtYlt3V6qog','ROLE_MEMBER',2),(3,'2022-11-19 03:16:35','2022-11-19 03:16:35','KAKAO','chris980@naver.com',2508499050,'원민석','원민석2508499050','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4OTU1Mjg3LCJleHAiOjE2Njk1NjAwODd9.zqhU5MXUzksOZODnmJlpPWzzzLb2NNl6ZLO_Bs3HLH2vLg4It8qX11iGuCN8_LGhD1XgLev2Hf28QBd686KC7g','ROLE_MEMBER',3),(4,'2022-11-19 05:56:16','2022-11-19 05:56:16','KAKAO','psh104404@naver.com',2496835113,'백승훈','백승훈','http://k.kakaocdn.net/dn/clUd4x/btrLhO8irGb/GBphmFLGQPwccH60rKtv8k/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4OTU1Mjg3LCJleHAiOjE2Njk1NjAwODd9.zqhU5MXUzksOZODnmJlpPWzzzLb2NNl6ZLO_Bs3HLH2vLg4It8qX11iGuCN8_LGhD1XgLev2Hf28QBd686KC7g','ROLE_MEMBER',4),(5,'2022-11-19 06:28:11','2022-11-19 06:28:11','KAKAO','dhcoaud98@gmail.com',2497979303,'오채명','채명','http://k.kakaocdn.net/dn/hQ6FK/btrFKn8PKtE/0V9v5S4kybHdnbMut8edU0/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4OTUwMzc3LCJleHAiOjE2Njk1NTUxNzd9.CK2-LhHe4UFl9pDQGyDE7neGKfi_Zj6SsnXT0qg1Yn6E7LRBJbDdKDE1cyNyZpFg6MafDJaP8YY5nrmHLrXVTQ','ROLE_MEMBER',5),(6,'2022-11-19 08:11:37','2022-11-19 08:11:38','KAKAO',NULL,2541026893,'배하은','배하은2541026893','http://k.kakaocdn.net/dn/bDFef9/btrQ1K0mj1l/9PXpSS7KDCh4ZiwSTLQAyk/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4ODQ1NDk3LCJleHAiOjE2Njk0NTAyOTd9.vltoo0Zeue2aFaXRJKN8nZ6J9efQgLOrjU8HcfESkff-TZxs6ic8r0fAlpdDFxhy95URspoio__vmD9qtGCoSA','ROLE_MEMBER',6),(7,'2022-11-19 13:00:26','2022-11-19 13:00:26','KAKAO','son22722@naver.com',2505898073,'손민지','S2mj27','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4OTQ4MzkyLCJleHAiOjE2Njk1NTMxOTJ9.SF-4bIxKobeD6RyJFcAPiOcBoy3VwCeWd_SIDH-Oo3Y0c29OnTSxO1cqWVeYJ1LEDvTdXICDqIS-S-b7TOXEsw','ROLE_MEMBER',7),(8,'2022-11-19 15:26:34','2022-11-19 15:26:34','KAKAO','koyura183982@naver.com',2505896320,'고유라','유라','http://k.kakaocdn.net/dn/cZfDai/btrPhnzftG2/nRxrMK1kdesacskEiaHjr0/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4OTUyNzU5LCJleHAiOjE2Njk1NTc1NTl9.5rjEXLHWz2KYFDxB78I_6ftTwwFHSs3thDkKXtXsh39MSFvQxzdu4a3JRybWXGbKR72zteYK7tg0aAKcovdDNA','ROLE_MEMBER',12),(9,'2022-11-20 11:38:32','2022-11-20 11:38:32','KAKAO',NULL,2542594769,'김규란','김규란2542594769','http://k.kakaocdn.net/dn/cha0F9/btrwm9FGlm7/3vo1F0CnLnRvKhjaCYK9Vk/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4OTQ0MzU3LCJleHAiOjE2Njk1NDkxNTd9._XnIsENfsN1Rnvess4m79fDKhkFTGwT-XcDtLDMnF_pNo4SIQBvAZCWvAU2Q9S8kKjcdkMZzdWAixE1fCe9uXA','ROLE_MEMBER',18),(10,'2022-11-20 14:50:35','2022-11-20 14:50:35','KAKAO',NULL,2542844720,'성은','성은2542844720','http://k.kakaocdn.net/dn/jMY1J/btrqBGirbhb/h109aii0G7kRPn7Cw88Kh1/img_110x110.jpg','eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJBNjAxIiwiaWF0IjoxNjY4OTU1ODM1LCJleHAiOjE2Njk1NjA2MzV9.B_Q5-0qCkN4h7ATtxvY-QzJnC04jrlwkLVj8V6D9p-Y7OUkbgISzfeqgCgGaBLNdLLuVLtDvEdH5Oth0NEVVtw','ROLE_MEMBER',27);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
