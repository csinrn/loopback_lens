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

-- Dumping data for table lensdb.admin: ~2 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`account`, `password`, `creatAt`, `name`) VALUES
	('strinffg', '$2a$10$qnbiC7fEPzsiOBjNompMiOfZo6UimUaVVKZSsRbRDovAM5S1rEQxq', '2019-08-08', 'string'),
	('string', '$2a$10$2GfZolvAUFwPH6R54Prh2O29cFLdUHdhTBu1IRoO7f1ZLtyqf9gn.', '0000-00-00', 'string');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping data for table lensdb.lens: ~3 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`id`, `lensPic`, `name`, `diameter`, `BC`, `power`, `water`, `wearingTime`, `placeOfProd`, `price`, `specialPrice`, `eventDisp`, `license`, `newTag`, `hotsaleTag`, `onsaleTag`, `launchAt`, `closeAt`, `url`) VALUES
	(2, 'string', 'string', 0, 0, 0, 0, 'daily', 'string', 0, 0, 'string', 'string', 0, 0, 0, '2019-08-09', NULL, NULL),
	(3, 'string', 'string', 0, 0, 0, 0, 'daily', 'string', 0, 0, 'string', 'string', 10, 0, 0, '2019-08-09', NULL, NULL),
	(4, '3', 'string', 0, 0, 0, 0, 'daily', 'string', 0, 0, 'string', 'string', 0, 0, 0, '2019-01-01', NULL, NULL);
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;

-- Dumping data for table lensdb.userlens: ~5 rows (approximately)
/*!40000 ALTER TABLE `userlens` DISABLE KEYS */;
INSERT INTO `userlens` (`id`, `userId`, `lensId`, `lensCount`, `lensTime`, `createAt`, `updateAt`) VALUES
	(1, 0, 0, 1, 0, '0000-00-00', '0000-00-00'),
	(2, 2, 4, 2, 0, '0000-00-00', '0000-00-00'),
	(3, 10, 0, 1, 7, '0000-00-00', '0000-00-00'),
	(5, 0, 0, 0, 0, '2019-08-09', NULL),
	(6, 0, 0, 0, 0, '2019-08-09', NULL);
/*!40000 ALTER TABLE `userlens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
