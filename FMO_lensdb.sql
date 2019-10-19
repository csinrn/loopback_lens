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
DROP DATABASE IF EXISTS `fmo_lensdb`;
CREATE DATABASE IF NOT EXISTS `fmo_lensdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `fmo_lensdb`;

-- Dumping structure for table fmo_lensdb.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_at` datetime NOT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table fmo_lensdb.admin: ~7 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `account`, `password`, `create_at`, `is_admin`, `name`) VALUES
	(1, '33333333', '$2a$10$n0BsjiMVeEQa895LUQSvc.4kD8JAuxNP5F5XlVuVJeBifb1cPRf8K', '2019-09-29 00:00:00', 0, '陳琛'),
	(2, '444', '$2a$10$mVoirp3MPBDA2Ty/h5.Zhu.tXkf39L9DnmsjeK0M3QrFnlUE/PTTK', '2019-09-26 00:00:00', 0, '詹則方'),
	(3, '4444', '$2a$10$eReuQLBsuEscfbNlvZt0P.7Ml0f6zr.KBUVp7tfSswitA/eXF8ihq', '2019-09-29 00:00:00', 1, 'Louis Labat'),
	(4, 'eee', '$2a$10$eecAEIhBKpYO84ZFCYSRjuLh4Uk9sCBdAwnhKLQAQ68fxFIIWD2Ri', '2019-09-29 00:00:00', 1, 'JK Rolin'),
	(5, 'qwe', '$2a$10$JB91FVZfTtL1AFVexN0hjOjbfN.kt4PPj4hAKYs44P6fP7PM.ohxW', '2019-09-29 00:00:00', 0, '宇文濬'),
	(6, 'rrrr', '$2a$10$8ThDOrjsKnwepj0KcB04KuNW/u99RyqLT1dgeuj1M/MGCfMu/tsXG', '2019-09-26 00:00:00', 0, '令狐沖'),
	(7, 'admin', '$2a$10$BaRvtyDgN9lhmWa3YGQgKepfjuxZX5x1vxP5eWpwg3grH0tP/IoTu', '2019-01-03 00:00:00', 1, '羽生結弦');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table fmo_lensdb.iris_points
CREATE TABLE IF NOT EXISTS `iris_points` (
  `user_id` int(11) DEFAULT NULL,
  `leftpupil_x` int(11) DEFAULT NULL,
  `leftpupil_y` int(11) DEFAULT NULL,
  `rightpupil_x` int(11) DEFAULT NULL,
  `rightpupil_y` int(11) DEFAULT NULL,
  `iris_radius` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table fmo_lensdb.iris_points: ~0 rows (approximately)
/*!40000 ALTER TABLE `iris_points` DISABLE KEYS */;
/*!40000 ALTER TABLE `iris_points` ENABLE KEYS */;

-- Dumping structure for table fmo_lensdb.lens
CREATE TABLE IF NOT EXISTS `lens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `part_no` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `no` int(10) DEFAULT NULL,
  `state` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `launch_at` datetime NOT NULL,
  `remove_at` datetime NOT NULL,
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
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `pic_ver` int(11) DEFAULT 0,
  `isdeleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `part_no` (`part_no`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table fmo_lensdb.lens: ~11 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `part_no`, `name`, `url`, `no`, `state`, `launch_at`, `remove_at`, `diameter`, `BC`, `powerL`, `powerH`, `water`, `daily`, `biweekly`, `monthly`, `place_of_prod`, `price`, `package`, `special_price`, `event_disp`, `license`, `new_tag`, `hotsale_tag`, `onsale_tag`, `create_at`, `update_at`, `pic_ver`, `isdeleted`) VALUES
	(0, 'JK7890', '栗子蒙布朗', '/lensPic/JK7890.png', 4, 1, '1999-09-07 00:00:00', '2019-10-31 00:00:00', 1.3, 17, 1000, 1500, 50, 1, 0, 1, '泰國', 2000, 3, NULL, NULL, 'L78910', 0, 1, 0, '2019-09-13 00:00:00', '2019-10-18 10:36:23', 0, 1),
	(1, '45', '香檳金', '/lensPic/45.png', 1, 1, '2019-08-30 00:00:00', '2020-10-03 00:00:00', 13, 17, 0, 50, 50, 1, 0, 1, '馬來西亞', 200, 10, 150, '打折', 'L78910', 0, 0, 1, '2019-09-13 00:00:00', '2019-10-12 00:00:00', 0, 1),
	(2, '38', '星空灰', '/lensPic/38.png', 2, 1, '2019-09-09 00:00:00', '2019-10-30 00:00:00', 15, 17, 500, 600, 20, 1, 1, 0, '台灣', 3000, 10, 2500, '開幕優惠', 'L12345', 1, 0, 1, '2019-09-13 00:00:00', '2019-10-18 12:22:42', 0, 0),
	(3, '39', '星空棕', '/lensPic/39.png', NULL, 2, '2019-09-24 00:00:00', '2019-10-18 00:00:00', 15, 17, 500, 1000, 20, 1, 0, 0, '台灣', 3500, 10, 2500, '開幕優惠', 'L12345', 1, 1, 1, '2019-09-13 00:00:00', '2019-10-18 12:26:09', 0, 0),
	(4, '42', '甜心灰', '/lensPic/42.png', 6, 1, '2019-09-24 00:00:00', '2019-10-31 00:00:00', 13, 17.5, 100, 500, 50, 0, 1, 0, '巴西', 200, 12, 150, '開幕優惠', 'L78910', 1, 1, 1, '2019-09-13 00:00:00', '2019-10-18 14:23:51', 1, 0),
	(5, 'KK', '楓糖奶茶', '/lensPic/KK.png', NULL, 0, '2019-10-24 00:00:00', '2019-10-31 00:00:00', 10.5, 7, 900, 1000, 24, 1, 0, 0, '美國', 400, 30, NULL, NULL, 'B333777', 1, 1, 0, '2019-09-13 00:00:00', '2019-10-18 12:26:09', 0, 0),
	(6, 'JK678', '馬卡龍灰', '/lensPic/JK678.png', 3, 1, '2019-09-16 00:00:00', '2019-10-30 00:00:00', 2, 5, 400, 800, 7, 0, 1, 0, '紐西蘭', 2000, 10, NULL, NULL, 'LH333', 1, 0, 0, '2019-09-29 00:00:00', '2019-10-18 14:13:39', 4, 0),
	(7, 'change23', '焦糖布蕾', '/lensPic/change23.png', 5, 1, '2019-10-08 00:00:00', '2019-10-30 00:00:00', 20, 6, 100, 200, 10, 1, 0, 0, '日本', 700, 20, NULL, NULL, 'B34567', 0, 1, 0, '2019-09-13 00:00:00', '2019-10-18 12:26:49', 2, 0),
	(8, 'KK48', '太妃糖杏', '/lensPic/KK48.png', 0, 1, '2019-10-15 00:00:00', '2019-10-23 00:00:00', 13, 10, 50, 100, 20, 1, 0, 0, '北極', 3000, 3, NULL, NULL, 'K123456', 0, 0, 0, '2019-09-13 00:00:00', '2019-10-17 11:20:25', 0, 1),
	(9, '33333', '黑醋栗摩卡', '/lensPic/33333.png', 7, 1, '2019-09-22 00:00:00', '2019-10-30 00:00:00', 30, 35, 50, 200, 3, 1, 0, 0, '荷蘭', 300, 10, NULL, NULL, 'L4444', 0, 1, 0, '2019-09-29 00:00:00', '2019-10-18 14:16:41', 12, 0),
	(13, 'KT789', '黑森林', '/lensPic/KT789.png', NULL, 2, '2019-10-01 00:00:00', '2019-10-18 00:00:00', 15.6, 20.1, 50, 100, 30, 1, 1, 1, '土耳其', 300, 3, NULL, NULL, 'TT666', 1, 1, 0, '2019-09-30 00:00:00', '2019-10-18 12:26:09', 0, 0);
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;

-- Dumping structure for table fmo_lensdb.update_time
CREATE TABLE IF NOT EXISTS `update_time` (
  `id` varchar(5) NOT NULL DEFAULT '',
  `update_from` int(11) unsigned NOT NULL,
  `update_to` int(11) unsigned NOT NULL,
  `update_freq` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table fmo_lensdb.update_time: ~0 rows (approximately)
/*!40000 ALTER TABLE `update_time` DISABLE KEYS */;
INSERT INTO `update_time` (`id`, `update_from`, `update_to`, `update_freq`) VALUES
	('0', 8, 16, 5);
/*!40000 ALTER TABLE `update_time` ENABLE KEYS */;

-- Dumping structure for table fmo_lensdb.userlens
CREATE TABLE IF NOT EXISTS `userlens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL DEFAULT '',
  `lens_id` int(10) unsigned NOT NULL,
  `lens_count` int(11) NOT NULL,
  `lens_time` int(11) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `is_customer` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userlens_lens` (`lens_id`),
  CONSTRAINT `FK_userlens_lens` FOREIGN KEY (`lens_id`) REFERENCES `lens` (`id`) ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='lens_count : how many times this user try on this contact lens\r\nlens_time: the total second that this user try on this contact lens';

-- Dumping data for table fmo_lensdb.userlens: ~7 rows (approximately)
/*!40000 ALTER TABLE `userlens` DISABLE KEYS */;
INSERT INTO `userlens` (`id`, `user_id`, `lens_id`, `lens_count`, `lens_time`, `create_at`, `update_at`, `is_customer`) VALUES
	(1, '10', 7, 4, 40, '2019-09-30 00:00:00', '2019-10-02 00:00:00', 0),
	(2, '10', 8, 3, 30, '2019-09-30 00:00:00', '2019-09-30 00:00:00', 0),
	(3, '5', 1, 3, 30, '2019-09-30 00:00:00', '2019-09-30 00:00:00', 0),
	(5, '30', 1, 10, 10, '2019-09-30 00:00:00', '2019-09-30 00:00:00', 0),
	(6, '7', 5, 10, 10, '2019-09-30 00:00:00', '2019-09-30 00:00:00', 0),
	(7, '7', 7, 10, 10, '2019-09-30 00:00:00', '2019-09-30 00:00:00', 0),
	(8, '20', 5, 1, 20, '2019-10-02 00:00:00', '2019-10-02 00:00:00', 1);
/*!40000 ALTER TABLE `userlens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
