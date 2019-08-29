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
  `wearing_time` enum('daily','weekly','monthly','annually') NOT NULL,
  `place_of_prod` varchar(50) NOT NULL,
  `price` int(11) unsigned NOT NULL,
  `special_price` int(11) unsigned NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table lensdb.lens: ~4 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `name`, `no`, `diameter`, `BC`, `power`, `water`, `wearing_time`, `place_of_prod`, `price`, `special_price`, `event_disp`, `license`, `new_tag`, `hotsale_tag`, `onsale_tag`, `create_at`, `update_at`, `url`) VALUES
	(7, 'happy', 0, 0, 0, 0, 0, 'daily', 'string', 0, 0, 'string', 'string', 0, 0, 0, '2019-08-08', NULL, 'string'),
	(8, 'new', 1, 0, 0, 0, 0, 'daily', 'string', 0, 0, 'string', 'string', 0, 0, 0, '2019-08-08', NULL, 'string'),
	(9, 'ttest', 2, 0, 0, 0, 0, 'daily', 'string', 0, 0, 'string', 'string', 0, 0, 0, '2019-08-08', NULL, 'string'),
	(11, 'string', 3, 22, 22, 22, 22, 'daily', '22', 22, 22, '22', '22', 1, 1, 1, '2019-08-29', NULL, '22');
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
