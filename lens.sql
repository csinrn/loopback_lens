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
CREATE DATABASE IF NOT EXISTS `lensdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
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

-- Dumping data for table lensdb.admin: ~0 rows (approximately)
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
  `daily` tinyint(3) unsigned NOT NULL,
  `biweekly` tinyint(3) unsigned NOT NULL,
  `monthly` tinyint(3) unsigned NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

ALTER TABLE lens CONVERT TO CHARACTER SET UTF8;
-- Dumping data for table lensdb.lens: ~8 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `name`, `no`, `diameter`, `BC`, `power`, `water`, `daily`, `biweekly`, `monthly`, `place_of_prod`, `price`, `special_price`, `event_disp`, `license`, `new_tag`, `hotsale_tag`, `onsale_tag`, `create_at`, `update_at`, `url`) VALUES
	(15, 'blink', 1, 20, 10, 150, 40, 0, 0, 0, 'Japan', 400, 2000, 'ee', '22222', 1, 1, 1, '2019-09-07', NULL, 'ddd'),
	(16, 'cherry', 2, 20, 10, 150, 40, 0, 0, 0, 'australia', 400, 200, '', '22222', 1, 0, 1, '2019-09-07', '2019-09-07', 'ddd'),
	(17, 'black', 0, 70, 50, 30, 20, 0, 0, 0, 'australia', 500, 200, '', '22222', 1, 1, 1, '2019-09-07', NULL, 'ddd'),
	(22, '新名稱', 4, 122, 22, 22, 22, 0, 0, 0, 'ww', 22, 22, '22', 'ww', 1, 1, 1, '2019-09-07', NULL, '22'),
	(23, 'ww', 3, 122, 22, 22, 22, 0, 0, 0, 'ww', 22, NULL, NULL, 'ww', 1, 1, 0, '2019-09-07', NULL, '22'),
	(25, '焦糖布蕾', 5, 122, 22, 22, 22, 0, 0, 0, '台灣', 22, 300, 'dd', 'ww', 1, 1, 1, '2019-09-07', NULL, '22'),
	(29, '123', 6, 1233, 123, 123, 123, 0, 0, 0, '123', 123, NULL, NULL, '123', 0, 0, 0, '2019-09-10', NULL, 'C:/Users/jenny/Desktop/test/test.jpg'),
	(31, '123', 7, 123, 123, 123, 123, 1, 1, 1, '123', 123, NULL, NULL, '123', 1, 1, 0, '2019-09-10', NULL, 'C:/Users/jenny/Desktop/test/未命名.png');
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
