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
INSERT INTO `admin` (`account`, `password`, `creatat`, `name`) VALUES
	('string', '$2a$10$2GfZolvAUFwPH6R54Prh2O29cFLdUHdhTBu1IRoO7f1ZLtyqf9gn.', 0, 'string');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping data for table lensdb.lens: ~4 rows (approximately)
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` (`lensId`, `lenspic`, `lensname`, `createAt`, `updateAt`) VALUES
	(1, '[0]', 'string', 0, 0),
	(2, '[0]', 'tt', 191919, 191213),
	(3, '[0]', 'kk', 181026, 183030);
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;

-- Dumping data for table lensdb.userlens: ~3 rows (approximately)
/*!40000 ALTER TABLE `userlens` DISABLE KEYS */;
INSERT INTO `userlens` (`id`, `userId`, `lensId`, `lensCount`, `lensTime`, `createAt`, `updateAt`) VALUES
	(1, '0', '0', 1, 0, 0, 0),
	(2, '2', '4', 2, 0, 0, 0),
	(3, '10', '0', 1, 7, 0, 0);
/*!40000 ALTER TABLE `userlens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
