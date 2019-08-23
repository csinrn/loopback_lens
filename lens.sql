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

-- Dumping data for table lensdb.admin: ~0 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`account`, `password`, `creat_at`, `name`) VALUES
	('string', '$2a$10$OVL/wwHL/kpKKFi/58G4meLD3RyauYkzxUg/IzZ.FqWAdfBQuLa9u', '2019-03-03', 'string');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping data for table lensdb.lens: ~2 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `name`, `no`, `diameter`, `BC`, `power`, `water`, `wearing_time`, `place_of_prod`, `price`, `special_price`, `event_disp`, `license`, `new_tag`, `hotsale_tag`, `onsale_tag`, `create_at`, `update_at`, `url`) VALUES
	(5, 'string', 8, 0, 0, 0, 0, 'daily', 'string', 0, 0, 'string', 'string', 0, 0, 0, '2019-03-03', NULL, 'string'),
	(6, 'dd', 7, 10, 10, 10, 10, 'weekly', 'ddd', 100, 100, NULL, 'sdf', 1, 1, 1, '2019-08-24', NULL, 'sdff');
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;

-- Dumping data for table lensdb.userlens: ~0 rows (approximately)
/*!40000 ALTER TABLE `userlens` DISABLE KEYS */;
/*!40000 ALTER TABLE `userlens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
