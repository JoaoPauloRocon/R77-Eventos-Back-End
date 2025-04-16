/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - r77_eventos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`r77_eventos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `r77_eventos`;

/*Table structure for table `events` */

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` datetime NOT NULL,
  `street` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `neighborhood` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `events` */

insert  into `events`(`id`,`title`,`description`,`date`,`street`,`number`,`neighborhood`,`city`,`state`,`zip_code`,`created_by`,`createdAt`,`updatedAt`) values 
(1,'Workshop de Node.js com JP ','Evento voltado para desenvolvedores interessados em backend com Node.js.','2025-05-10 19:00:00','Av. Paulista','1000','Bela Vista','São Paulo','SP','01310-100',2,'2025-04-15 16:06:14','2025-04-15 16:08:27'),
(9,'Evento de Teste 3','Um evento para testar imagens','2025-06-01 22:00:00','Rua das Flores','123','Centro','São Paulo','SP','01001-200',2,'2025-04-15 17:49:55','2025-04-16 15:55:18'),
(11,'Evento de Teste','Um evento para testar imagens','2025-06-01 22:00:00','Rua das Flores','123','Centro','São Paulo','SP','01001-200',2,'2025-04-15 22:10:08','2025-04-15 22:10:08'),
(12,'Evento de Teste','Um evento para testar imagens','2025-06-01 22:00:00','Rua das Flores','123','Centro','São Paulo','SP','01001-200',2,'2025-04-16 15:15:39','2025-04-16 15:15:39'),
(13,'Evento de Teste','Um evento para testar imagens','2025-06-01 22:00:00','Rua das Flores','123','Centro','São Paulo','SP','01001-200',2,'2025-04-16 15:56:22','2025-04-16 15:57:46'),
(14,'Evento Teste','Descrição do evento','2025-04-20 10:00:00','Rua Teste','123','Bairro Teste','Cidade Teste','SP','12345-678',2,'2025-04-16 18:57:43','2025-04-16 18:57:43'),
(15,'Evento de Teste','Um evento para testar imagens','2025-06-01 22:00:00','Rua das Flores','123','Centro','São Paulo','SP','01001-200',2,'2025-04-16 18:59:02','2025-04-16 18:59:02'),
(16,'Evento de Teste','Um evento para testar imagens','2025-06-01 22:00:00','Rua das Flores','123','Centro','São Paulo','SP','01001-200',2,'2025-04-16 18:59:09','2025-04-16 18:59:09'),
(17,'Evento Teste','Descrição do evento','2025-04-20 10:00:00','Rua Teste','123','Bairro Teste','Cidade Teste','SP','12345-678',2,'2025-04-16 19:03:19','2025-04-16 19:03:19'),
(18,'Evento Teste','Descrição do evento','2025-04-20 10:00:00','Rua Teste','123','Bairro Teste','Cidade Teste','SP','12345-678',2,'2025-04-16 19:07:31','2025-04-16 19:07:31'),
(19,'Evento Teste','Descrição do evento','2025-04-20 10:00:00','Rua Teste','123','Bairro Teste','Cidade Teste','SP','12345-678',2,'2025-04-16 19:10:50','2025-04-16 19:10:50'),
(20,'Evento Teste','Descrição do evento','2025-04-20 10:00:00','Rua Teste','123','Bairro Teste','Cidade Teste','SP','12345-678',2,'2025-04-16 19:40:06','2025-04-16 19:40:06'),
(21,'Evento Teste','Descrição do evento','2025-04-20 10:00:00','Rua Teste','123','Bairro Teste','Cidade Teste','SP','12345-678',2,'2025-04-16 19:53:16','2025-04-16 19:53:16');

/*Table structure for table `images` */

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `event_id` int(11) NOT NULL,
  `uploadedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `images` */

insert  into `images`(`id`,`filename`,`url`,`event_id`,`uploadedAt`) values 
(30,'1744755008828-Captura de tela 2024-10-31 185659.png','/uploads/11/1744755008828-Captura de tela 2024-10-31 185659.png',11,'2025-04-15 22:10:08'),
(31,'1744816539777-Captura de tela 2024-10-31 185659.png','/uploads/12/1744816539777-Captura de tela 2024-10-31 185659.png',12,'2025-04-16 15:15:39'),
(33,'1744818224234-Captura de tela 2024-10-31 185659.png','/uploads/9/1744818224234-Captura de tela 2024-10-31 185659.png',9,'2025-04-16 15:43:44'),
(34,'1744818236671-Captura de tela 2024-10-31 185659.png','/uploads/9/1744818236671-Captura de tela 2024-10-31 185659.png',9,'2025-04-16 15:43:56'),
(36,'1744818242145-Captura de tela 2024-10-31 185659.png','/uploads/9/1744818242145-Captura de tela 2024-10-31 185659.png',9,'2025-04-16 15:44:02'),
(38,'1744818982312-Captura de tela 2024-10-31 185659.png','/uploads/13/1744818982312-Captura de tela 2024-10-31 185659.png',13,'2025-04-16 15:56:22'),
(40,'1744829942584-Captura de tela 2024-10-31 185659.png','/uploads/15/1744829942584-Captura de tela 2024-10-31 185659.png',15,'2025-04-16 18:59:02');

/*Table structure for table `ratings` */

DROP TABLE IF EXISTS `ratings`;

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `event_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `ratings` */

insert  into `ratings`(`id`,`rating`,`comment`,`event_id`,`user_id`,`createdAt`,`updatedAt`) values 
(1,4,'Excelente evento!',1,2,'2025-04-16 16:31:59','2025-04-16 16:31:59');

/*Table structure for table `sequelizemeta` */

DROP TABLE IF EXISTS `sequelizemeta`;

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `sequelizemeta` */

insert  into `sequelizemeta`(`name`) values 
('20250410115007-test-connection.js'),
('20250410122919-create-user.js'),
('20250415122920-create-events.js'),
('20250415122921-create-image.js'),
('20250415122922-create-rating.js'),
('create-events.js');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`password`,`role`,`createdAt`,`updatedAt`) values 
(1,'João1','joao@email.com','$2b$10$lPLacW63W0/ArURtAtIQbOqvjJj1fblh.Tz7/hdwMQox7aPdbkshO','USER','2025-04-10 13:11:51','2025-04-10 21:14:31'),
(2,'Admin Master','admin@email.com','$2b$10$0IBHmvtpUHx./eE.oWjbBeQ77THFbFCCSqR6iHhGS5ro6S82cEM1a','ADMIN','2025-04-10 21:09:12','2025-04-10 21:09:12');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
