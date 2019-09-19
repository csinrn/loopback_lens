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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table lensdb.admin: ~1 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`account`, `password`, `create_at`, `name`) VALUES
	('qwe', '$2a$10$.881muRUU5c2uCPeTbif0OQvHpKIbvjncUTWNDz89MCav3.e6Aslu', '2019-08-29', 'qwe');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table lensdb.lens
CREATE TABLE IF NOT EXISTS `lens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `no` int(10) NOT NULL,
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
  `update_at` date DEFAULT NULL,
  `url` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4;

ALTER TABLE lens CONVERT TO CHARACTER SET UTF8;
-- Dumping data for table lensdb.lens: ~9 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `name`, `no`, `diameter`, `BC`, `powerL`, `powerH`, `water`, `daily`, `biweekly`, `monthly`, `place_of_prod`, `price`, `package`, `special_price`, `event_disp`, `license`, `new_tag`, `hotsale_tag`, `onsale_tag`, `create_at`, `update_at`, `url`) VALUES
	(38, '星空灰', 3, 15, 17, 500, 600, 20, 1, 1, 0, '台灣', 3000, 10, 2500, '開幕優惠', 'L12345', 1, 0, 1, '2019-09-13', NULL, '/lensPic/星空灰.png'),
	(39, '星空棕', 0, 15, 17, 500, 1000, 20, 1, 0, 0, '台灣', 3500, 10, 2500, '開幕優惠', 'L12345', 1, 1, 1, '2019-09-13', NULL, '/lensPic/星空棕.png'),
	(40, '香檳金', 1, 13, 17, 0, 50, 50, 1, 0, 1, '馬來西亞', 200, 10, 150, '打折', 'L78910', 0, 0, 1, '2019-09-13', NULL, '/lensPic/香檳金.png'),
	(41, '栗子蒙布朗', 2, 13, 17, 1000, 1500, 50, 1, 0, 1, '馬來西亞', 2000, 3, NULL, NULL, 'L78910', 0, 1, 0, '2019-09-13', '2021-09-13', '/lensPic/栗子蒙布朗.png'),
	(42, '甜心灰', 4, 13, 17, 100, 500, 50, 0, 1, 0, '巴西', 200, 1, NULL, NULL, 'L78910', 1, 0, 0, '2019-09-13', NULL, '/lensPic/甜心灰.png'),
	(43, '馬卡龍灰', 7, 10, 7, 900, 1000, 24, 0, 1, 0, '印度', 900, 30, 500, '情人節促銷活動', 'L78910', 1, 0, 1, '2019-09-13', NULL, '/lensPic/馬卡龍灰.png'),
	(44, '楓糖奶茶', 6, 10, 7, 900, 1000, 24, 1, 0, 0, '美國', 400, 30, NULL, NULL, 'B333777', 1, 1, 0, '2019-09-13', '2019-09-14', '/lensPic/楓糖奶茶.png'),
	(45, '焦糖布蕾', 5, 20, 6, 100, 200, 10, 1, 0, 0, '日本', 700, 20, NULL, NULL, 'B34567', 0, 1, 0, '2019-09-13', NULL, '/lensPic/焦糖布蕾.png'),
	(46, '幕斯可可', 8, 13, 10, 50, 100, 20, 1, 0, 0, '北極', 3000, 3, NULL, NULL, 'K123456', 0, 1, 0, '2019-09-13', NULL, '/lensPic/幕斯可可.png');
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
