-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.28-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para insight
CREATE DATABASE IF NOT EXISTS `insight` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `insight`;

-- Copiando estrutura para tabela insight.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT 'Insight',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela insight.courses: ~1 rows (aproximadamente)
INSERT INTO `courses` (`id`, `name`, `description`) VALUES
	(1, 'Desenvolvimento Back-en', 'Insight');

-- Copiando estrutura para tabela insight.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Indentificador único chave primária do user',
  `username` varchar(200) DEFAULT NULL COMMENT 'Nome de usuario da conta',
  `password` varchar(200) DEFAULT NULL COMMENT 'senha em hash da conta',
  `nickname` varchar(200) DEFAULT NULL COMMENT 'nome do usuario da conta',
  `description` varchar(200) DEFAULT 'Transformando conhecimento em poder, unindo mentes para alcançar novas vitórias.' COMMENT 'descricao do perfil',
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'adicionar automaticamente a data de criação da conta',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabela para armazenamento dos dados de usuarios';

-- Copiando dados para a tabela insight.users: ~1 rows (aproximadamente)
INSERT INTO `users` (`id`, `username`, `password`, `nickname`, `description`, `creation_date`) VALUES
	(1, 'machinecombat68', '$2a$12$Ps7v2efLc31TxJKQI5qDEuDc991QzZiEea.rrDrf/YNX9LAcPEBua', 'João', 'Transformando conhecimento em poder, unindo mentes para alcançar novas vitórias.', '2024-08-21 03:28:34');

-- Copiando estrutura para tabela insight.user_courses
CREATE TABLE IF NOT EXISTS `user_courses` (
  `user_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `enrollment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `user_courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela insight.user_courses: ~1 rows (aproximadamente)
INSERT INTO `user_courses` (`user_id`, `course_id`, `enrollment_date`) VALUES
	(1, 1, '2024-08-27 23:31:47');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
