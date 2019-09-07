-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.7-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for lensdb
CREATE DATABASE IF NOT EXISTS `lensdb` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `lensdb`;

-- Dumping structure for table lensdb.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `account` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_at` date NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`account`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table lensdb.admin: ~1 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`account`, `password`, `create_at`, `name`) VALUES
	('qwe', '$2a$10$.881muRUU5c2uCPeTbif0OQvHpKIbvjncUTWNDz89MCav3.e6Aslu', '2019-08-29', 'qwe'),
	('rrr', '$2a$10$CL41ykQffv5WnQ6o8.tRh.1IqUgXkLOmo6wdMosXOwa3iR15w8yFK', '2019-09-07', 'rrr'),
	('string', '$2a$10$OVL/wwHL/kpKKFi/58G4meLD3RyauYkzxUg/IzZ.FqWAdfBQuLa9u', '2019-03-03', 'string'),
	('string777', '$2a$10$I4iLe8ZcBopTsmUkz6hYkeCCrmVlg0wbPKrjEpbXX.yhPxJfVSrUO', '2019-08-05', 'string');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table lensdb.lens
CREATE TABLE IF NOT EXISTS `lens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `no` int(10) NOT NULL,
  `diameter` float unsigned NOT NULL,
  `BC` float unsigned NOT NULL,
  `power` int(11) unsigned NOT NULL,
  `water` int(11) unsigned NOT NULL,
  `wearing_time` enum('daily','biweekly','monthly') NOT NULL,
  `place_of_prod` varchar(50) NOT NULL,
  `price` int(11) unsigned NOT NULL,
  `special_price` int(11) unsigned DEFAULT NULL,
  `event_disp` varchar(50) DEFAULT NULL,
  `license` varchar(50) NOT NULL,
  `new_tag` tinyint(1) NOT NULL,
  `hotsale_tag` tinyint(1) NOT NULL,
  `onsale_tag` tinyint(1) NOT NULL,
  `create_at` date NOT NULL,
  `update_at` date DEFAULT NULL,
  `url` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Dumping data for table lensdb.lens: ~9 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `name`, `no`, `diameter`, `BC`, `power`, `water`, `wearing_time`, `place_of_prod`, `price`, `special_price`, `event_disp`, `license`, `new_tag`, `hotsale_tag`, `onsale_tag`, `create_at`, `update_at`, `url`) VALUES
	(7, 'yellow', 7, 2, 30, 100, 70, 'daily', 'Korea', 30, NULL, NULL, 'fff', 0, 0, 1, '2019-09-07', NULL, 'fff'),
	(8, 'blue', 4, 14, 40, 200, 20, 'biweekly', 'Vitnam', 400, 0, 'string', 'string', 0, 0, 0, '2019-08-08', NULL, 'string'),
	(9, 'red', 5, 15, 81, 30, 70, 'daily', 'Tailand', 5000, 0, 'string', 'string', 0, 0, 0, '2019-08-08', NULL, 'string'),
	(11, 'shiny', 3, 22, 22, 150, 22, 'daily', 'USA', 300, 30, '22', '22', 1, 1, 1, '2019-08-29', NULL, '22'),
	(12, 'forest', 10, 30, 7, 500, 70, 'monthly', 'Taiwan', 70, NULL, NULL, 'hhhh', 1, 0, 0, '2019-09-07', NULL, 'kkk'),
	(14, 'skyblue', 8, 20, 20, 150, 40, 'daily', 'Japan', 3000, 3000, 'special', '22222', 0, 1, 1, '2019-09-07', NULL, 'ddd'),
	(15, 'blink', 1, 20, 10, 150, 40, 'monthly', 'Japan', 400, 2000, 'ee', '22222', 1, 1, 1, '2019-09-07', NULL, 'ddd'),
	(16, 'cherry', 2, 20, 10, 150, 40, 'biweekly', 'australia', 400, 200, '', '22222', 1, 0, 1, '2019-09-07', '2019-09-07', 'ddd'),
	(17, 'black', 0, 70, 50, 30, 20, 'daily', 'australia', 500, 200, '', '22222', 1, 1, 1, '2019-09-07', NULL, 'ddd'),
	(18, 'cookie', 6, 70, 10, 30, 20, 'biweekly', 'australia', 2000, 200, '', '22222', 1, 0, 1, '2019-09-07', NULL, 'ddd'),
	(19, 'summer', 9, 70, 10, 30, 20, 'daily', 'australia', 100, 20, '', '22222', 0, 0, 1, '2019-09-07', NULL, 'ddd'),
	(20, 'purple', 11, 22, 22, 22, 22, 'biweekly', 'ee', 22, 22, '22', 'ee', 1, 1, 1, '2019-09-07', NULL, '22');
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;

-- Dumping structure for table lensdb.userlens
CREATE TABLE IF NOT EXISTS `userlens` (
  `user_id` int(11) NOT NULL DEFAULT 0,
  `lens_id` int(11) NOT NULL DEFAULT 0,
  `lens_count` int(11) NOT NULL,
  `lens_time` int(11) DEFAULT NULL,
  `create_at` date NOT NULL,
  `update_at` date DEFAULT NULL,
  KEY `lens_id` (`lens_id`),
  CONSTRAINT `lens_id` FOREIGN KEY (`lens_id`) REFERENCES `lens` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table lensdb.userlens: ~0 rows (approximately)
/*!40000 ALTER TABLE `userlens` DISABLE KEYS */;
/*!40000 ALTER TABLE `userlens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
