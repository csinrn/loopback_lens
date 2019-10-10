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


-- Dumping database structure for fmo_lensdb
CREATE DATABASE IF NOT EXISTS `fmo_lensdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `fmo_lensdb`;

-- Dumping structure for table fmo_lensdb.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_at` date NOT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table fmo_lensdb.admin: ~7 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `account`, `password`, `create_at`, `is_admin`, `name`) VALUES
	(1, '33333333', '$2a$10$n0BsjiMVeEQa895LUQSvc.4kD8JAuxNP5F5XlVuVJeBifb1cPRf8K', '2019-09-29', 0, '6666'),
	(2, '444', '$2a$10$mVoirp3MPBDA2Ty/h5.Zhu.tXkf39L9DnmsjeK0M3QrFnlUE/PTTK', '2019-09-26', 0, '叉叉'),
	(3, '4444', '$2a$10$eReuQLBsuEscfbNlvZt0P.7Ml0f6zr.KBUVp7tfSswitA/eXF8ihq', '2019-09-29', 1, '6666'),
	(4, 'eee', '$2a$10$eecAEIhBKpYO84ZFCYSRjuLh4Uk9sCBdAwnhKLQAQ68fxFIIWD2Ri', '2019-09-29', 1, 'eeee'),
	(5, 'qwe', '$2a$10$JB91FVZfTtL1AFVexN0hjOjbfN.kt4PPj4hAKYs44P6fP7PM.ohxW', '2019-09-29', 0, 'qwe'),
	(6, 'rrrr', '$2a$10$8ThDOrjsKnwepj0KcB04KuNW/u99RyqLT1dgeuj1M/MGCfMu/tsXG', '2019-09-26', 0, 'er'),
	(7, 'admin', '$2a$10$BaRvtyDgN9lhmWa3YGQgKepfjuxZX5x1vxP5eWpwg3grH0tP/IoTu', '2019-01-03', 1, 'admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table fmo_lensdb.lens
CREATE TABLE IF NOT EXISTS `lens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `part_no` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `no` int(10) DEFAULT NULL,
  `diameter` float unsigned NOT NULL,
  `BC` float unsigned NOT NULL,
  `powerL` int(11) unsigned NOT NULL,
  `powerH` int(11) unsigned NOT NULL,
  `water` int(11) unsigned NOT NULL,
  `daily` tinyint(3) unsigned NOT NULL,
  `biweekly` tinyint(3) unsigned NOT NULL,
  `monthly` tinyint(3) unsigned NOT NULL,
  `place_of_prod` varchar(50) NOT NULL,
  `price` int(11) unsigned NOT NULL,
  `package` int(11) unsigned NOT NULL,
  `special_price` int(11) unsigned DEFAULT NULL,
  `event_disp` varchar(50) DEFAULT NULL,
  `license` varchar(50) NOT NULL,
  `new_tag` tinyint(1) NOT NULL,
  `hotsale_tag` tinyint(1) NOT NULL,
  `onsale_tag` tinyint(1) NOT NULL,
  `create_at` date NOT NULL,
  `launch_at` date NOT NULL,
  `remove_at` date NOT NULL,
  `update_at` date NOT NULL,
  `url` varchar(50) NOT NULL,
  `state` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `part_no` (`part_no`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table fmo_lensdb.lens: ~11 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `part_no`, `name`, `no`, `diameter`, `BC`, `powerL`, `powerH`, `water`, `daily`, `biweekly`, `monthly`, `place_of_prod`, `price`, `package`, `special_price`, `event_disp`, `license`, `new_tag`, `hotsale_tag`, `onsale_tag`, `create_at`, `launch_at`, `remove_at`, `update_at`, `url`, `state`) VALUES
	(0, 'JK7890', '栗子蒙布朗', 0, 1.3, 17, 1000, 1500, 50, 1, 0, 1, '泰國', 2000, 3, NULL, NULL, 'L78910', 0, 1, 0, '2019-09-13', '1999-09-07', '2019-10-06', '2019-09-30', '/lensPic/JK7890.png', 1),
	(1, '40', '香檳金', 2, 13, 17, 0, 50, 50, 1, 0, 1, '馬來西亞', 200, 10, 150, '打折', 'L78910', 0, 0, 1, '2019-09-13', '2019-08-30', '2020-10-03', '2019-09-30', '/lensPic/40.png', 1),
	(2, '38', '星空灰', 4, 15, 17, 500, 600, 20, 1, 1, 0, '台灣', 3000, 10, 2500, '開幕優惠', 'L12345', 1, 0, 1, '2019-09-13', '2019-09-09', '2019-09-24', '2019-09-30', '/lensPic/38.png', 2),
	(3, '39', '星空棕', 7, 15, 17, 500, 1000, 20, 1, 0, 0, '台灣', 3500, 10, 2500, '開幕優惠', 'L12345', 1, 1, 1, '2019-09-13', '2019-09-10', '2019-12-02', '2019-09-30', '/lensPic/39.png', 1),
	(4, '42', '甜心灰', 7, 13, 17.5, 100, 500, 50, 0, 1, 0, '巴西', 200, 13, 150, '開幕優惠', 'L78910', 1, 1, 1, '2019-09-13', '2019-09-01', '2019-09-11', '2019-09-30', '/lensPic/42.png', 2),
	(5, 'KK', '楓糖奶茶', NULL, 10.5, 7, 900, 1000, 24, 1, 0, 0, '美國', 400, 30, NULL, NULL, 'B333777', 1, 1, 0, '2019-09-13', '2019-10-08', '2019-10-22', '2019-09-30', '/lensPic/44.png', 0),
	(6, 'JK678', '馬卡龍灰', 1, 2, 5, 400, 800, 7, 0, 1, 0, '紐西蘭', 2000, 10, NULL, NULL, 'LH333', 1, 0, 0, '2019-09-29', '2019-09-16', '2019-10-30', '2019-09-30', '/lensPic/JK678.png', 1),
	(7, 'change23', '焦糖布蕾', 3, 20, 6, 100, 200, 10, 1, 0, 0, '日本', 700, 20, NULL, NULL, 'B34567', 0, 1, 0, '2019-09-13', '2019-09-29', '2019-10-03', '2019-09-30', '/lensPic/change23.png', 1),
	(8, '46', '幕斯可可', 5, 13, 10, 50, 100, 20, 1, 0, 0, '北極', 3000, 3, NULL, NULL, 'K123456', 0, 1, 0, '2019-09-13', '2019-09-28', '2019-10-23', '2019-09-30', '/lensPic/46.png', 1),
	(9, '33333', '黑醋栗摩卡', 6, 30, 35, 50, 200, 3, 1, 0, 0, '荷蘭', 300, 10, NULL, NULL, 'L4444', 0, 1, 0, '2019-09-29', '2019-09-22', '2019-10-16', '2019-09-30', '/lensPic/33333.png', 1),
	(13, 'KT789', '黑森林', 7, 15.6, 20.1, 50, 100, 30, 1, 1, 1, '土耳其', 300, 3, NULL, NULL, 'TT666', 1, 1, 0, '2019-09-30', '2019-10-21', '2019-10-22', '2019-09-30', '/lensPic/KT789.png', 0);
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;

-- Dumping structure for table fmo_lensdb.userlens
CREATE TABLE IF NOT EXISTS `userlens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `lens_id` int(10) unsigned NOT NULL,
  `lens_count` int(11) NOT NULL,
  `lens_time` int(11) NOT NULL,
  `create_at` date NOT NULL,
  `update_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userlens_lens` (`lens_id`),
  CONSTRAINT `FK_userlens_lens` FOREIGN KEY (`lens_id`) REFERENCES `lens` (`id`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='lens_count : how many times this user try on this contact lens\r\nlens_time: the total second that this user try on this contact lens';

-- Dumping data for table fmo_lensdb.userlens: ~6 rows (approximately)
/*!40000 ALTER TABLE `userlens` DISABLE KEYS */;
INSERT INTO `userlens` (`id`, `user_id`, `lens_id`, `lens_count`, `lens_time`, `create_at`, `update_at`) VALUES
	(1, 10, 7, 3, 30, '2019-09-30', '2019-09-30'),
	(2, 10, 8, 3, 30, '2019-09-30', '2019-09-30'),
	(3, 5, 1, 3, 30, '2019-09-30', '2019-09-30'),
	(5, 30, 1, 10, 10, '2019-09-30', '2019-09-30'),
	(6, 7, 5, 10, 10, '2019-09-30', '2019-09-30'),
	(7, 7, 7, 10, 10, '2019-09-30', '2019-09-30');
/*!40000 ALTER TABLE `userlens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
