-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2025 at 08:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `st_luke`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `depId` int(11) NOT NULL,
  `depname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`depId`, `depname`) VALUES
(2, 'Nursing'),
(3, 'Surgery');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `postId` int(11) NOT NULL,
  `PostTitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`postId`, `PostTitle`) VALUES
(1, 'Cleaner'),
(2, 'Nurse');

-- --------------------------------------------------------

--
-- Table structure for table `recruitment`
--

CREATE TABLE `recruitment` (
  `recId` int(11) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `employeeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `employeeId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `dob` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `depId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`employeeId`, `postId`, `firstname`, `lastname`, `gender`, `dob`, `email`, `phone`, `address`, `depId`) VALUES
(2, 1, 'MUGANZA', 'Jesus', 'Male', 'part time', '0muganz@gmail.com', '0794883436', 'Kanombe', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `employeeId`, `username`, `password`) VALUES
(1, 0, 'MUGANZA', '$2b$10$4zeazGhmZ9nU5Yo0.OHVqOwP8HFg0ThduLxYRj.xr9pUSHRLjTMIC'),
(4, 0, 'mucyo', '$2b$10$kdeEzIzr.Q6ju9Qg4Zd6MOPteYYN3yDWS0TRtg3kB8LjJH13SNvnS'),
(5, 0, 'mugwiza', '$2b$10$rsGB7mQUqcEMjdpjA2oFmeirGPiHrlFEoGXHeh4xorFMLfJlUbL/C'),
(6, 0, 'kmkvb924', '$2b$10$FYjZzX0jBYuphJytXg5Qnef.IgMexXV9afhBxQGWVlna0I/4Q6reK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`depId`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`postId`);

--
-- Indexes for table `recruitment`
--
ALTER TABLE `recruitment`
  ADD PRIMARY KEY (`recId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`employeeId`),
  ADD KEY `postId` (`postId`),
  ADD KEY `depId` (`depId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `depId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `recruitment`
--
ALTER TABLE `recruitment`
  MODIFY `recId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `employeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recruitment`
--
ALTER TABLE `recruitment`
  ADD CONSTRAINT `recruitment_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `staff` (`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `depId` FOREIGN KEY (`depId`) REFERENCES `department` (`depId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `postId` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
