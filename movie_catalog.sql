-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2025 at 07:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_catalog`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_title` varchar(255) NOT NULL,
  `release_year` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `movie_title`, `release_year`) VALUES
(5, 5, 'Madame DuBarry', 1919),
(6, 5, 'The Regeneration', 1915),
(53, 14, 'Hum Aapke Hain Koun..!', 1994),
(67, 15, 'Cleopatra', 1912);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'xyz@gmail.com', '$2b$10$hOkDtWeDBQoG5Gd3LujmK.HTCTWXPy6UMa1wdY.grPAz6pJF5wwby'),
(3, 'xyz1@gmail.com', '$2b$10$eW5b3yBD8JHq5e1ugO4FXOMq0pRu3apn2EKRxm0sMNtM5evNG8kp2'),
(5, 'aanjalisingh.2536@gmail.com', '$2b$10$bjrkA8fvMQHu8/IDb.XOwueUbTNwDB3qjzUbANaHT3TmqWTReZefu'),
(6, 'sonamku8130@gmail.com', '$2b$10$uwC60S0Y7nS3HRflF0t7e.Gd8DhhTkY2bqGOKg9gVkcmM6UUZPgBu'),
(7, 'monika@gmail.com', '$2b$10$Yu7sEsyXuxAcupU4GsMzE.pv.IdoVniona.zmtn4YDi8OPfH9WBaS'),
(13, 'abcd@gmail.com', '$2b$10$JQ6SwThWIhpfjaComS0hi.Uyby66dhAImnMGGTHGDPanBcA8DyvP.'),
(14, 'shivani24@navgurukul.org', '$2b$10$fSBublA6hgMG7mEcy1AKiuCgU6nAGSjZpWXdRTWLHwgcmgLhIcPz.'),
(15, 'aanjali23@navgurukul.org', '$2b$10$jm4lyl/kOkq65rlouzOT2ewOJS3uExjSgBDiYqlx5weOQIira4LlG'),
(16, 'riya23@navgurukul.org', '$2b$10$5fPb3.If38/qlp3gl3IfXeQkipsZoRRklhOkmryeGzo0g8rCJRQQW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_movie_year` (`user_id`,`movie_title`,`release_year`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
