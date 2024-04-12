-- MariaDB dump 10.19  Distrib 10.5.23-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: vc10_kuis
-- ------------------------------------------------------
-- Server version	10.5.23-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AnswerChoices`
--

DROP TABLE IF EXISTS `AnswerChoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AnswerChoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_ID` int(11) NOT NULL,
  `text` varchar(2048) NOT NULL DEFAULT 'Sample choice',
  `isCorrect` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_ID`),
  CONSTRAINT `AnswerChoices_ibfk_1` FOREIGN KEY (`question_ID`) REFERENCES `Questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AnswerChoices`
--

LOCK TABLES `AnswerChoices` WRITE;
/*!40000 ALTER TABLE `AnswerChoices` DISABLE KEYS */;
INSERT INTO `AnswerChoices` VALUES (6,5,'2',1),(7,5,'3',0),(8,5,'10',0),(9,6,'5',0),(10,6,'6',1),(11,6,'7',0),(12,7,'4',0),(13,7,'6',1),(14,7,'8',0),(15,8,'London',0),(16,8,'Paris',1),(17,8,'Berlin',0),(18,9,'Amazon River',0),(19,9,'Nile River',1),(20,9,'Mississippi River',0),(21,10,'Europe',0),(22,10,'Africa',0),(23,10,'Australia',1),(24,11,'GDP (Gross Domestic Product)',1),(25,11,'CPI (Consumer Price Index)',0),(26,11,'PPP (Purchasing Power Parity)',0),(27,12,'Capitalism',1),(28,12,'Socialism',0),(29,12,'Communism',0),(30,13,'Providing grants for artistic projects',0),(31,13,'Providing loans and financial assistance to developing countries',1),(32,13,'Regulating international trade agreements',0);
/*!40000 ALTER TABLE `AnswerChoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attempts`
--

DROP TABLE IF EXISTS `Attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Attempts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `score` int(3) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `Attempts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `Attempts_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `Quizzes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attempts`
--

LOCK TABLES `Attempts` WRITE;
/*!40000 ALTER TABLE `Attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Questions`
--

DROP TABLE IF EXISTS `Questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_ID` int(11) NOT NULL,
  `text` text NOT NULL DEFAULT 'Sample Question',
  `point` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_ID` (`quiz_ID`),
  CONSTRAINT `Questions_ibfk_1` FOREIGN KEY (`quiz_ID`) REFERENCES `Quizzes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Questions`
--

LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
INSERT INTO `Questions` VALUES (5,6,'1 + 1 = ...',10),(6,6,'How many sides does a hexagon have?',5),(7,6,'2 + 2 x 2 = ...',15),(8,7,'What is the capital of France?',10),(9,7,'Which river is the longest in the world?',10),(10,7,'Which continent is known as the \"Land of Kangaroos\"?',10),(11,8,'What is the term for the total value of all goods and services produced in a country in a specific time period?',10),(12,8,'Which economic system relies on supply and demand to determine the production, distribution, and pricing of goods and services?',10),(13,8,'What is the main function of the World Bank?',10);
/*!40000 ALTER TABLE `Questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuizPermissions`
--

DROP TABLE IF EXISTS `QuizPermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `QuizPermissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `QuizPermissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `QuizPermissions_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `Quizzes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuizPermissions`
--

LOCK TABLES `QuizPermissions` WRITE;
/*!40000 ALTER TABLE `QuizPermissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `QuizPermissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Quizzes`
--

DROP TABLE IF EXISTS `Quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Quizzes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_ID` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `duration` int(11) NOT NULL,
  `visibility` enum('private','public') NOT NULL DEFAULT 'public',
  PRIMARY KEY (`id`),
  KEY `user_ID` (`user_ID`),
  CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quizzes`
--

LOCK TABLES `Quizzes` WRITE;
/*!40000 ALTER TABLE `Quizzes` DISABLE KEYS */;
INSERT INTO `Quizzes` VALUES (6,10,'Mathematics',15,'public'),(7,11,'Geography',10,'public'),(8,11,'Economy',5,'public');
/*!40000 ALTER TABLE `Quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `name` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` enum('superadmin','admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (10,'jeremiah','Jeremiah','$2a$12$.R3TWIGZI0ZvOSUdW.jtCuv1BLlrTJPjhDR6ZSPZSMS3OxNsfrq16','user'),(11,'jennifer','Jennifer','$2a$12$0sKZ8TdJ.qdZ1cfaFFJsIutcWrCAC9RZ/B1BeR3dqLWqubUPiRc7u','user');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-12 20:41:41
