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

-- Dumping structure for table fmo_lensdb.lens
DROP TABLE IF EXISTS `lens`;
CREATE TABLE IF NOT EXISTS `lens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `part_no` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `url2` varchar(50) NOT NULL,
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
  `series` varchar(50) DEFAULT NULL,
  `brand` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `part_no` (`part_no`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table fmo_lensdb.lens: ~11 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `part_no`, `name`, `url`, `url2`, `no`, `state`, `launch_at`, `remove_at`, `diameter`, `BC`, `powerL`, `powerH`, `water`, `daily`, `biweekly`, `monthly`, `place_of_prod`, `price`, `package`, `special_price`, `event_disp`, `license`, `new_tag`, `hotsale_tag`, `onsale_tag`, `create_at`, `update_at`, `pic_ver`, `isdeleted`, `series`, `brand`) VALUES
	(0, 'JK7890', '栗子蒙布朗', '/lensPic/JK7890.png', '/lensPic_show/JK7890.png', 6, 1, '1999-09-07 00:00:00', '2020-01-08 00:00:00', 1.3, 17, 1000, 1500, 50, 1, 0, 1, '泰國', 2000, 3, NULL, NULL, 'L78910', 0, 1, 0, '2019-09-13 00:00:00', '2019-12-10 18:17:01', 2, 0, '睛靚玩美', '海島'),
	(1, '45', '香檳金', '/lensPic/45.png', '/lensPic_show/45.png', 0, 1, '2019-08-30 00:00:00', '2020-10-22 00:00:00', 13, 17, 0, 50, 50, 1, 0, 1, '馬來西亞', 200, 10, 150, '打折', 'L78910', 0, 0, 1, '2019-09-13 00:00:00', '2019-12-02 21:07:49', 2, 0, '333', '海島'),
	(2, '38', '星空灰', '/lensPic/38.png', '/lensPic_show/38.png', 5, 1, '2019-09-09 00:00:00', '2019-12-31 00:00:00', 15, 17, 500, 600, 20, 1, 1, 0, '台灣', 3000, 10, 2500, '開幕優惠', 'L12345', 1, 0, 1, '2019-09-13 00:00:00', '2019-12-10 18:17:08', 2, 0, '睛靚玩美', '海島'),
	(3, '39', '星空棕', '/lensPic/39.png', '/lensPic_show/39.png', NULL, 2, '2019-10-24 00:00:00', '2019-10-30 00:00:00', 15, 17, 500, 1000, 20, 1, 0, 0, '台灣', 3500, 10, 2500, '開幕優惠', 'L12345', 1, 1, 1, '2019-09-13 00:00:00', '2019-12-02 21:08:19', 2, 0, '女神日彩', '海島'),
	(4, '55555', '甜心灰', '/lensPic/55555.png', '/lensPic_show/55555.png', NULL, 2, '2019-10-24 00:00:00', '2019-10-31 00:00:00', 13, 17.5, 100, 500, 50, 0, 1, 0, '巴西', 200, 12, 150, '開幕優惠', 'L78910', 1, 1, 1, '2019-09-13 00:00:00', '2019-12-10 18:19:04', 5, 0, '女神日彩', '海島'),
	(5, 'KK', '楓糖奶茶', '/lensPic/KK.png', '/lensPic_show/KK.png', NULL, 2, '2019-10-22 00:00:00', '2019-10-31 00:00:00', 10.5, 7, 900, 1000, 24, 1, 0, 0, '美國', 400, 30, NULL, NULL, 'B333777', 1, 1, 0, '2019-09-13 00:00:00', '2019-12-02 21:09:34', 4, 0, 'MIMA', '海島'),
	(6, 'JK678', '馬卡龍灰', '/lensPic/JK678.png', '/lensPic_show/JK678.png', 3, 1, '2019-09-16 00:00:00', '2019-12-31 00:00:00', 2, 5, 400, 800, 7, 0, 1, 0, '紐西蘭', 200, 10, NULL, NULL, 'LH333', 1, 0, 0, '2019-09-29 00:00:00', '2019-12-02 21:12:38', 7, 0, '星眸系列', '海島'),
	(7, 'CHANGE24', '焦糖布蕾', '/lensPic/CHANGE24.png', '/lensPic_show/CHANGE24.png', 2, 1, '2019-10-08 00:00:00', '2019-12-31 00:00:00', 20, 6, 100, 200, 10, 1, 0, 0, '日本', 700, 20, NULL, NULL, 'B34567', 0, 1, 0, '2019-09-13 00:00:00', '2019-12-02 21:12:10', 4, 0, '星眸系列', '海島'),
	(8, 'KK48', '太妃糖杏', '/lensPic/KK48.png', '/lensPic_show/KK48.png', 1, 1, '2019-10-15 00:00:00', '2019-12-31 00:00:00', 13, 10, 50, 100, 20, 1, 0, 0, '北極', 3000, 3, NULL, NULL, 'K123456', 0, 0, 0, '2019-09-13 00:00:00', '2019-12-02 21:11:35', 2, 0, '星眸系列', '海島'),
	(9, 'E37', '黑醋栗摩卡', '/lensPic/E37.png', '/lensPic_show/E37.png', 4, 1, '2019-09-22 00:00:00', '2019-12-31 00:00:00', 30, 35, 50, 200, 3, 1, 0, 0, '荷蘭', 300, 10, NULL, NULL, 'L4444', 0, 1, 0, '2019-09-29 00:00:00', '2019-12-02 21:13:05', 15, 0, '星眸系列', '海島'),
	(13, 'KK789', '黑森林', '/lensPic/KK789.png', '/lensPic_show/KK789.png', NULL, 2, '2019-10-23 00:00:00', '2019-10-28 00:00:00', 15.6, 20.1, 50, 100, 30, 1, 1, 1, '土耳其', 300, 3, NULL, NULL, 'TT666', 1, 1, 0, '2019-09-30 00:00:00', '2019-12-02 21:09:05', 14, 0, '女神日彩', '海島');
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
