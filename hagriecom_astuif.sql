-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2023 at 05:54 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hagriecom_astuif`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `adminId` int(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`adminId`, `fullname`, `email`, `password`, `picture`, `createdAt`, `updatedAt`) VALUES
(1, 'Abraham Mekuria Bayssie', 'biruk@gmail.com', '$2b$10$gk4D1C4yjzoEmXMjUYtpGeq1kBeaCm4kfGUhQit/rNRhSdiNillVa', NULL, '2023-06-25 12:17:43', '2023-06-25 12:17:43'),
(2, 'Nebiyu Mohammed Bedaso', 'nebiyu@gmail.com', '$2b$10$ehh0Wc7IHMprtnmWLMyN1OtErwQEpfqwgLReFZ/qHdZICH.ulKXCO', 'Images\\\\Stud_Image\\\\1687788778437.png\r\n', '2023-06-25 12:17:43', '2023-06-25 12:17:43');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'ALL', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(2, 'STAFF', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(3, 'STUDENT', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(4, 'SOCAE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(5, 'SOMCME', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(6, 'SOEEC', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(7, 'SOANS', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(8, 'DOFP', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(9, 'ARCHITECTURE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(10, 'WRE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(11, 'ME', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(12, 'CE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(13, 'MSE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(14, 'CSE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(15, 'ECE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(16, 'EPCE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(17, 'FDP', '2023-06-08 06:03:31', '2023-06-08 06:03:31');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `chatId` int(11) NOT NULL,
  `creatorType` enum('staff','student') NOT NULL,
  `categoryId` int(11) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `restrictedMode` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`chatId`, `creatorType`, `categoryId`, `topic`, `restrictedMode`, `createdAt`, `updatedAt`, `creatorId`) VALUES
(1, 'student', 8, 'hello everyone', 0, '2023-06-08 07:40:32', '2023-06-08 07:40:32', 4),
(2, 'student', 8, 'hello student', 1, '2023-06-08 07:43:30', '2023-06-08 07:43:30', 4),
(3, 'staff', 8, 'hello teacher', 1, '2023-06-08 07:43:50', '2023-06-08 07:43:50', 10),
(4, 'student', 14, 'hello cse', 1, '2023-06-26 22:07:57', '2023-06-26 22:07:57', 1);

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `convid` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `from` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `senderType` enum('Student','Staff') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `chatId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`convid`, `message`, `from`, `userId`, `senderType`, `createdAt`, `updatedAt`, `chatId`) VALUES
(1, 'hello', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-08 07:44:23', '2023-06-08 07:44:23', 1),
(2, 'good morninig', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-08 07:44:56', '2023-06-08 07:44:56', 1),
(3, 'hello', 'Milkias Solomon Gebrasilassie', 6, 'Student', '2023-06-08 07:47:51', '2023-06-08 07:47:51', 1),
(4, 'hello', 'Tamiru Belachew Hailemariyam', 4, 'Student', '2023-06-08 07:48:44', '2023-06-08 07:48:44', 1),
(5, 'hello', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-08 08:04:10', '2023-06-08 08:04:10', 1),
(6, 'hello', 'Milkias Solomon Gebrasilassie', 6, 'Student', '2023-06-08 08:04:52', '2023-06-08 08:04:52', 1),
(7, 'geej', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-08 08:05:38', '2023-06-08 08:05:38', 1),
(8, 'ayasanew', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 06:24:28', '2023-06-23 06:24:28', 1),
(9, 'heloo', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 06:27:16', '2023-06-23 06:27:16', 1),
(10, 'absra', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 06:28:38', '2023-06-23 06:28:38', 1),
(11, 'go', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 08:16:42', '2023-06-23 08:16:42', 1),
(12, 'halo', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 08:49:12', '2023-06-23 08:49:12', 1),
(13, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 08:57:33', '2023-06-23 08:57:33', 1),
(14, 'abraham', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 08:59:00', '2023-06-23 08:59:00', 1),
(15, 'hallo', 'Bereket Honelign Alene', 2, 'Student', '2023-06-23 09:00:35', '2023-06-23 09:00:35', 1),
(16, 'hell', 'Bereket Honelign Alene', 2, 'Student', '2023-06-23 09:06:30', '2023-06-23 09:06:30', 1),
(17, 'helloaa', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 09:06:55', '2023-06-23 09:06:55', 1),
(18, 'hellozdsdf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 09:29:47', '2023-06-23 09:29:47', 1),
(19, 'hsahfdsdflsdah', 'Bereket Honelign Alene', 2, 'Student', '2023-06-23 09:30:10', '2023-06-23 09:30:10', 1),
(20, 'sdfdsf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-23 09:46:41', '2023-06-23 09:46:41', 1),
(21, 'kk', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-24 19:20:11', '2023-06-24 19:20:11', 1),
(22, 'sgs', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-24 20:19:01', '2023-06-24 20:19:01', 1),
(23, 'dfgd', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-24 20:22:20', '2023-06-24 20:22:20', 1),
(24, 'hhh', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-24 20:23:03', '2023-06-24 20:23:03', 1),
(25, 'sfsf', 'Biruk Yonas Neway', 1, 'Staff', '2023-06-25 05:21:23', '2023-06-25 05:21:23', 1),
(26, 'HI Asayeynew', 'Biruk Yonas Neway', 1, 'Staff', '2023-06-25 05:49:06', '2023-06-25 05:49:06', 1),
(27, 'hi', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 05:50:18', '2023-06-25 05:50:18', 1),
(28, 'asdfasdf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 05:50:38', '2023-06-25 05:50:38', 1),
(29, 'HIII', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 05:55:50', '2023-06-25 05:55:50', 1),
(30, 'Abrhaam ^ ', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 05:56:34', '2023-06-25 05:56:34', 1),
(31, 'Sara', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 05:58:21', '2023-06-25 05:58:21', 1),
(32, 'Hi', 'Biruk Yonas Neway', 1, 'Staff', '2023-06-25 06:06:10', '2023-06-25 06:06:10', 3),
(33, 'Masikno', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:10:49', '2023-06-25 06:10:49', 1),
(34, 'hi man', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:16:43', '2023-06-25 06:16:43', 2),
(35, 'afsdfasdf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:17:48', '2023-06-25 06:17:48', 2),
(36, 'hi', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:20:26', '2023-06-25 06:20:26', 2),
(37, 'hijjj', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:22:48', '2023-06-25 06:22:48', 2),
(38, 'adgdag', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:24:49', '2023-06-25 06:24:49', 2),
(39, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:24:56', '2023-06-25 06:24:56', 2),
(40, 'dagdeg', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:25:37', '2023-06-25 06:25:37', 2),
(41, 'absra', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:25:53', '2023-06-25 06:25:53', 2),
(42, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:26:59', '2023-06-25 06:26:59', 2),
(43, 'abraham', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:27:59', '2023-06-25 06:27:59', 2),
(44, 'akkam', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:28:59', '2023-06-25 06:28:59', 2),
(45, 'naga', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:32:13', '2023-06-25 06:32:13', 2),
(46, 'hello', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:33:58', '2023-06-25 06:33:58', 2),
(47, 'jjj', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:38:59', '2023-06-25 06:38:59', 2),
(48, 'mmm', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:39:07', '2023-06-25 06:39:07', 2),
(49, 'kkkk', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:39:21', '2023-06-25 06:39:21', 2),
(50, 'hallo', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:39:32', '2023-06-25 06:39:32', 2),
(51, 'jewewe', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:40:05', '2023-06-25 06:40:05', 2),
(52, 'asjfasjg', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:40:20', '2023-06-25 06:40:20', 2),
(53, 'adgda', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:40:28', '2023-06-25 06:40:28', 1),
(54, 'zdhzdfhzdrr', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:40:55', '2023-06-25 06:40:55', 1),
(55, 'dsfgsdfhd', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:41:51', '2023-06-25 06:41:51', 2),
(56, 'dsgf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:42:10', '2023-06-25 06:42:10', 2),
(57, 'dsgfdhsdf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:42:34', '2023-06-25 06:42:34', 2),
(58, 'dsgdsf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:42:46', '2023-06-25 06:42:46', 2),
(59, 'love', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:42:55', '2023-06-25 06:42:55', 2),
(60, 'love everyone', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:43:11', '2023-06-25 06:43:11', 1),
(61, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:44:02', '2023-06-25 06:44:02', 2),
(62, 'd', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:44:18', '2023-06-25 06:44:18', 2),
(63, 'sda', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:44:49', '2023-06-25 06:44:49', 2),
(64, 'go', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:45:05', '2023-06-25 06:45:05', 2),
(65, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:47:24', '2023-06-25 06:47:24', 2),
(66, 'dgd', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:47:35', '2023-06-25 06:47:35', 2),
(67, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:48:43', '2023-06-25 06:48:43', 2),
(68, 'sdf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:52:00', '2023-06-25 06:52:00', 2),
(69, 'asas', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:52:35', '2023-06-25 06:52:35', 2),
(70, 'hello', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:55:48', '2023-06-25 06:55:48', 1),
(71, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:56:29', '2023-06-25 06:56:29', 2),
(72, 'd', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:56:34', '2023-06-25 06:56:34', 2),
(73, 'jjdf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:57:09', '2023-06-25 06:57:09', 2),
(74, 'hello abraham', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 06:59:36', '2023-06-25 06:59:36', 1),
(75, 'jjads', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 06:59:50', '2023-06-25 06:59:50', 1),
(76, 'jsdfjsdkh yabets', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 07:05:20', '2023-06-25 07:05:20', 2),
(77, 'afagre', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 07:05:37', '2023-06-25 07:05:37', 2),
(78, 'afagre', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 07:05:37', '2023-06-25 07:05:37', 2),
(79, 'fgfsd', 'Bekalu Jegnaw Mehari', 3, 'Student', '2023-06-25 07:05:58', '2023-06-25 07:05:58', 2),
(80, 'dgsd', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-25 07:13:25', '2023-06-25 07:13:25', 2),
(81, 'hejj', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 04:55:08', '2023-06-26 04:55:08', 1),
(82, 'jhe', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 04:55:24', '2023-06-26 04:55:24', 1),
(83, 'hsafg', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 04:56:43', '2023-06-26 04:56:43', 1),
(84, 'asgfd', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 04:57:06', '2023-06-26 04:57:06', 1),
(85, 'jashfas', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 04:57:35', '2023-06-26 04:57:35', 1),
(86, 'whfyrR', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 04:58:00', '2023-06-26 04:58:00', 2),
(87, 'SDVDG', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:02:38', '2023-06-26 05:02:38', 1),
(88, '', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:02:40', '2023-06-26 05:02:40', 1),
(89, 'SDGDA', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:02:48', '2023-06-26 05:02:48', 1),
(90, 'H', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:04:48', '2023-06-26 05:04:48', 1),
(91, 'SGHH', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:05:22', '2023-06-26 05:05:22', 1),
(92, 'DFHD', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:06:53', '2023-06-26 05:06:53', 3),
(93, 'sdgdaf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:13:59', '2023-06-26 05:13:59', 1),
(94, 'asdfsad', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:14:12', '2023-06-26 05:14:12', 1),
(95, 'sgsd', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:15:01', '2023-06-26 05:15:01', 1),
(96, 'jjf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:15:12', '2023-06-26 05:15:12', 1),
(97, 'asda', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:15:25', '2023-06-26 05:15:25', 1),
(98, 'agdasdg', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:15:33', '2023-06-26 05:15:33', 1),
(99, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:15:44', '2023-06-26 05:15:44', 1),
(100, 'hhh', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:15:49', '2023-06-26 05:15:49', 1),
(101, 'qtwe', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:16:36', '2023-06-26 05:16:36', 1),
(102, 'qwetqwe', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:16:42', '2023-06-26 05:16:42', 1),
(103, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:17:14', '2023-06-26 05:17:14', 1),
(104, 'hello as', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:17:25', '2023-06-26 05:17:25', 1),
(105, 'hghhgj', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:17:56', '2023-06-26 05:17:56', 1),
(106, 'hello', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:22:00', '2023-06-26 05:22:00', 1),
(107, 'jel', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:22:42', '2023-06-26 05:22:42', 1),
(108, 'jsfg', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:28:09', '2023-06-26 05:28:09', 1),
(109, 'hello ayse', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:29:11', '2023-06-26 05:29:11', 1),
(110, 'helo teac', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:30:00', '2023-06-26 05:30:00', 1),
(111, 'sfsf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:30:22', '2023-06-26 05:30:22', 1),
(112, 'hsfhsa', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:31:09', '2023-06-26 05:31:09', 3),
(113, 'teacheer', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:32:02', '2023-06-26 05:32:02', 3),
(114, 'sdgdh', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:38:27', '2023-06-26 05:38:27', 1),
(115, '', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:38:31', '2023-06-26 05:38:31', 1),
(116, '', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:38:33', '2023-06-26 05:38:33', 1),
(117, 'wet', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:38:41', '2023-06-26 05:38:41', 1),
(118, 'dg', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:39:30', '2023-06-26 05:39:30', 1),
(119, 'sgs', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:39:36', '2023-06-26 05:39:36', 1),
(120, 'hallo', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:40:12', '2023-06-26 05:40:12', 1),
(121, 'sdfj', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:43:42', '2023-06-26 05:43:42', 1),
(122, 'kfs', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:44:13', '2023-06-26 05:44:13', 1),
(123, 'saff', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:44:23', '2023-06-26 05:44:23', 1),
(124, 'asfsa', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:44:31', '2023-06-26 05:44:31', 1),
(125, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:44:43', '2023-06-26 05:44:43', 1),
(126, 'gfs', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:44:55', '2023-06-26 05:44:55', 1),
(127, 'jjr', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:45:04', '2023-06-26 05:45:04', 1),
(128, 'dsg', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:45:22', '2023-06-26 05:45:22', 3),
(129, 'ad', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:45:33', '2023-06-26 05:45:33', 2),
(130, 'hello', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:47:57', '2023-06-26 05:47:57', 1),
(131, 'gobeze', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:48:09', '2023-06-26 05:48:09', 1),
(132, 'hol', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:48:21', '2023-06-26 05:48:21', 1),
(133, 'leba', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 05:48:29', '2023-06-26 05:48:29', 1),
(134, 'halo evey', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 05:49:09', '2023-06-26 05:49:09', 1),
(135, 'hsdfh', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 06:16:32', '2023-06-26 06:16:32', 1),
(136, 'jsdjh', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 06:16:46', '2023-06-26 06:16:46', 1),
(137, 'ajsdfh', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 06:17:10', '2023-06-26 06:17:10', 2),
(138, 'sdghhd', 'Nebiyu Mohammed Bedaso', 10, 'Staff', '2023-06-26 06:18:26', '2023-06-26 06:18:26', 1),
(139, 'jd', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 06:38:09', '2023-06-26 06:38:09', 1),
(140, 'sgf', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 06:39:37', '2023-06-26 06:39:37', 1),
(141, 'kkdfg', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 06:39:43', '2023-06-26 06:39:43', 1),
(142, 'hello neba', 'Aysanew Yonas Neway', 1, 'Student', '2023-06-26 09:28:25', '2023-06-26 09:28:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `depId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ShortedName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `schoolId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`depId`, `name`, `ShortedName`, `createdAt`, `updatedAt`, `schoolId`) VALUES
(1, 'Architecture', 'ARCHITECTURE', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 1),
(2, 'Water Resource Engineering', 'WRE', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 1),
(3, 'Mechanical Engineering', 'ME', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 2),
(4, 'Chemical Engineering', 'CE', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 2),
(5, 'Materials Science Engineering', 'MSE', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 2),
(6, 'Computer Science and Engineering', 'CSE', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 3),
(7, 'Electronics and Communication Engineering', 'ECE', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 3),
(8, 'Electrical Power and Control Engineering', 'EPCE', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 3),
(9, 'Freshman Division Program', 'FDP', '2023-06-08 06:03:31', '2023-06-08 06:03:31', 5);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `likeId` int(11) NOT NULL,
  `liked_by_type` varchar(255) NOT NULL,
  `liked_by_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `postId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`likeId`, `liked_by_type`, `liked_by_id`, `createdAt`, `updatedAt`, `postId`) VALUES
(2, 'student', '3', '2023-06-26 11:17:19', '2023-06-26 11:17:19', 1),
(3, 'student', '3', '2023-06-26 11:22:34', '2023-06-26 11:22:34', 2),
(4, 'student', '3', '2023-06-26 12:45:55', '2023-06-26 12:45:55', 8),
(5, 'student', '3', '2023-06-26 20:29:15', '2023-06-26 20:29:15', 24),
(6, 'student', '3', '2023-06-26 20:29:38', '2023-06-26 20:29:38', 23),
(10, 'student', '8', '2023-06-26 21:08:08', '2023-06-26 21:08:08', 24),
(11, 'staff', '8', '2023-06-26 21:18:09', '2023-06-26 21:18:09', 24),
(12, 'staff', '8', '2023-06-26 21:18:22', '2023-06-26 21:18:22', 8),
(24, 'staff', '1', '2023-06-27 00:09:51', '2023-06-27 00:09:51', 8),
(25, 'student', '1', '2023-06-27 00:10:01', '2023-06-27 00:10:01', 8),
(28, 'student', '1', '2023-06-27 01:04:09', '2023-06-27 01:04:09', 22),
(29, 'student', '1', '2023-06-27 01:07:13', '2023-06-27 01:07:13', 23),
(30, 'student', '1', '2023-06-27 01:07:42', '2023-06-27 01:07:42', 21),
(33, 'student', '1', '2023-06-27 01:34:39', '2023-06-27 01:34:39', 24),
(35, 'staff', '10', '2023-06-27 01:36:31', '2023-06-27 01:36:31', 23),
(36, 'staff', '10', '2023-06-27 01:36:37', '2023-06-27 01:36:37', 21);

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `optionId` int(11) NOT NULL,
  `preferenceId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`optionId`, `preferenceId`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(2, 2, 2, '2023-06-15 06:58:34', '2023-06-15 06:58:34'),
(3, 2, 2, '2023-06-15 06:58:58', '2023-06-15 06:58:58'),
(4, 2, 2, '2023-06-15 06:59:00', '2023-06-15 06:59:00'),
(5, 2, 3, '2023-06-15 07:04:17', '2023-06-15 07:04:17'),
(11, 6, 9, '2023-06-15 08:12:20', '2023-06-15 08:12:20'),
(12, 6, 4, '2023-06-15 08:12:26', '2023-06-15 08:12:26'),
(14, 6, 5, '2023-06-15 17:16:57', '2023-06-15 17:16:57'),
(15, 7, 5, '2023-06-15 17:17:38', '2023-06-15 17:17:38'),
(16, 8, 5, '2023-06-15 17:17:43', '2023-06-15 17:17:43'),
(17, 9, 5, '2023-06-15 17:18:05', '2023-06-15 17:18:05'),
(30, 15, 9, '2023-06-26 22:38:49', '2023-06-26 22:38:49'),
(31, 15, 12, '2023-06-26 22:39:01', '2023-06-26 22:39:01'),
(32, 12, 14, '2023-06-27 01:37:57', '2023-06-27 01:37:57'),
(33, 12, 11, '2023-06-27 01:38:08', '2023-06-27 01:38:08');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postId` int(11) NOT NULL,
  `summarizable` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `staffName` varchar(255) NOT NULL,
  `eventLocation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `staffId` int(11) DEFAULT NULL,
  `title` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postId`, `summarizable`, `content`, `image`, `categoryId`, `staffName`, `eventLocation`, `createdAt`, `updatedAt`, `staffId`, `title`) VALUES
(1, '0', 'hello d hh  hello bb again mm The world we inhabit is a complex and ever-evolving place, filled with limitless potential for exploration and discovery. From the vast expanse of the universe to the intricate workings of the astuman mind and body, there is an abundance of wonders to uncover. astumans have sought to comprehend the world around them throughout history, striving to understand their place in it and establish meaning and purpose in their lives. From the earliest groups of astunter-gatherers to the most advanced technological societies, people have developed a myriad of customs, beliefs, and methods to navigate the challenges of their existence and search for happiness and fulfillment.Throughout history, astumans have faced countless obstacles and setbacks, including wars, famines, diseases, and natural disasters. Yet, through perseverance and determination, they have continued to progress and flourish, always aiming to create a brighter tomorrow for themselves and future generations. Today, we face unprecedented global challenges like climate change, inequality, and the threat of nuclear war. However, we also have unparalleled opportunities to cultivate a more equitable, sustainable, and harmonious world, harnessing the strength of science, technology, and astuman collaboration.In recent years, technological advancements have facilitated a rapid acceleration of progress in many fields, from medicine to communications to transportation. However, these advancements have also brought new challenges and concerns, such as the impact of automation on job markets and the potential consequences of unchecked artificial intelligence. Moreover, many global challenges, such as climate change and inequality, require coordinated efforts and cooperation at the international level to address.In the face of these challenges, it is critical that we work together to create a more just and sustainable world. This will require investment in education and scientific research, as well as greater collaboration and communication among nations. It will also require a commitment to protecting the environment, prioritizing social justice, and promoting peace. By working together, we can build a brighter future for all, one in which the wonders of the world are preserved, and astuman potential is fully realized.', 'Images\\Post_Image\\1687791391968.png', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aadd', '2023-06-08 06:03:34', '2023-06-26 14:56:31', 1, 'astu bbb if'),
(2, '0', 'Join us this weekend for a charity event at the local community center. Let\'s make a difference together!', NULL, 1, 'Ephrem Honelign Alene', 'astu Stadium', '2023-06-08 06:03:34', '2023-06-08 06:03:34', 2, NULL),
(3, '0', 'We are excited to announce our partnership with a leading tech company. This collaboration will bring new opportunities for growth and innovation.', NULL, 1, 'Abel Jegnaw Mehari', 'astu Stadium', '2023-06-08 06:03:34', '2023-06-08 06:03:34', 3, NULL),
(4, '0', 'Attention students! Don\'t forget to submit your applications for the upcoming internship program. This is a great opportunity to gain valuable work experience.', NULL, 4, 'Robel Belachew Hailemariyam', 'astu Stadium', '2023-06-08 06:03:34', '2023-06-08 06:03:34', 4, NULL),
(6, '0', 'Exciting update! Our company has been nominated for the Best Employer of the Year award. We are proud of our team\'s dedication and hard work.', NULL, 4, 'Selam Alebachew Debeb', 'astu Stadium', '2023-06-08 06:03:34', '2023-06-08 06:03:34', 6, NULL),
(7, '0', 'Calling all talented artists! We are organizing an art competition with amazing prizes. Show us your creativity and passion.', NULL, 5, 'Yonas Muliye Fite', 'astu Stadium', '2023-06-08 06:03:34', '2023-06-08 06:03:34', 7, NULL),
(8, '0', 'Are you interested in learning new languages? Join our language exchange program where you can meet language entastusiasts and improve your skills.', NULL, 6, 'Henok Belayneh Eridaw', 'astu Stadium', '2023-06-08 06:03:34', '2023-06-08 06:03:34', 8, NULL),
(9, '0', 'Save the date! Our annual conference will take place on November 15th. Get ready for inspiring talks and valuable networking opportunities.', NULL, 9, 'Daniel Fantaastun Gebremeskel', 'astu Stadium', '2023-06-08 06:03:34', '2023-06-08 06:03:34', 9, NULL),
(10, '0', 'Attention graduates! We are organizing a career fair next month. Don\'t miss this chance to connect with top companies and explore job opportunities.', NULL, 10, 'Nebiyu Mohammed Bedaso', 'astu Stadium', '2023-06-08 06:03:34', '2023-06-08 06:03:34', 10, NULL),
(11, '0', 'and ethiopia', 'Images\\Post_Image\\1686332036147.png', 4, 'Biruk Yonas Neway', 'Addis abbbaba', '2023-06-09 17:33:56', '2023-06-09 17:33:56', 1, 'jhjghh'),
(14, '0', 'and ethiopiassas ss', 'Images\\Post_Image\\1686334598989.png', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aa', '2023-06-09 18:16:39', '2023-06-09 18:16:39', 1, 'astu bbb if'),
(15, '0', '', NULL, 4, 'Biruk Yonas Neway', 'Addis abbbaba  aa', '2023-06-15 17:57:04', '2023-06-15 17:57:04', 1, 'astu bbb if'),
(16, '0', 'hello', NULL, 4, 'Biruk Yonas Neway', 'Addis abbbaba  aa', '2023-06-15 17:57:50', '2023-06-15 17:57:50', 1, 'astu bbb if'),
(17, '0', 'hello d', NULL, 4, 'Biruk Yonas Neway', 'Addis abbbaba  aa', '2023-06-15 17:58:26', '2023-06-15 17:58:26', 1, 'astu bbb if'),
(18, '0', 'hello d', 'Images\\Post_Image\\1686852087573.jpg', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aadd', '2023-06-15 18:01:27', '2023-06-15 18:01:27', 1, 'astu bbb if'),
(19, '0', 'hello d bb', 'Images\\Post_Image\\1687191370615.jpg', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aadd', '2023-06-19 16:16:10', '2023-06-19 16:16:10', 1, 'astu bbb if'),
(20, '0', 'hello d bb The world we inhabit is a complex and ever-evolving place, filled with limitless potential for exploration and discovery. From the vast expanse of the universe to the intricate workings of the astuman mind and body, there is an abundance of wonders to uncover. astumans have sought to comprehend the world around them throughout history, striving to understand their place in it and establish meaning and purpose in their lives. From the earliest groups of astunter-gatherers to the most advanced technological societies, people have developed a myriad of customs, beliefs, and methods to navigate the challenges of their existence and search for happiness and fulfillment.Throughout history, astumans have faced countless obstacles and setbacks, including wars, famines, diseases, and natural disasters. Yet, through perseverance and determination, they have continued to progress and flourish, always aiming to create a brighter tomorrow for themselves and future generations. Today, we face unprecedented global challenges like climate change, inequality, and the threat of nuclear war. However, we also have unparalleled opportunities to cultivate a more equitable, sustainable, and harmonious world, harnessing the strength of science, technology, and astuman collaboration.In recent years, technological advancements have facilitated a rapid acceleration of progress in many fields, from medicine to communications to transportation. However, these advancements have also brought new challenges and concerns, such as the impact of automation on job markets and the potential consequences of unchecked artificial intelligence. Moreover, many global challenges, such as climate change and inequality, require coordinated efforts and cooperation at the international level to address.In the face of these challenges, it is critical that we work together to create a more just and sustainable world. This will require investment in education and scientific research, as well as greater collaboration and communication among nations. It will also require a commitment to protecting the environment, prioritizing social justice, and promoting peace. By working together, we can build a brighter future for all, one in which the wonders of the world are preserved, and astuman potential is fully realized.', 'Images\\Post_Image\\1687191526772.jpg', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aadd', '2023-06-19 16:18:46', '2023-06-19 16:18:46', 1, 'astu bbb if'),
(21, '0', 'hello d  hello bb The world we inhabit is a complex and ever-evolving place, filled with limitless potential for exploration and discovery. From the vast expanse of the universe to the intricate workings of the astuman mind and body, there is an abundance of wonders to uncover. astumans have sought to comprehend the world around them throughout history, striving to understand their place in it and establish meaning and purpose in their lives. From the earliest groups of astunter-gatherers to the most advanced technological societies, people have developed a myriad of customs, beliefs, and methods to navigate the challenges of their existence and search for happiness and fulfillment.Throughout history, astumans have faced countless obstacles and setbacks, including wars, famines, diseases, and natural disasters. Yet, through perseverance and determination, they have continued to progress and flourish, always aiming to create a brighter tomorrow for themselves and future generations. Today, we face unprecedented global challenges like climate change, inequality, and the threat of nuclear war. However, we also have unparalleled opportunities to cultivate a more equitable, sustainable, and harmonious world, harnessing the strength of science, technology, and astuman collaboration.In recent years, technological advancements have facilitated a rapid acceleration of progress in many fields, from medicine to communications to transportation. However, these advancements have also brought new challenges and concerns, such as the impact of automation on job markets and the potential consequences of unchecked artificial intelligence. Moreover, many global challenges, such as climate change and inequality, require coordinated efforts and cooperation at the international level to address.In the face of these challenges, it is critical that we work together to create a more just and sustainable world. This will require investment in education and scientific research, as well as greater collaboration and communication among nations. It will also require a commitment to protecting the environment, prioritizing social justice, and promoting peace. By working together, we can build a brighter future for all, one in which the wonders of the world are preserved, and astuman potential is fully realized.', 'Images\\Post_Image\\1687191829934.jpg', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aadd', '2023-06-19 16:23:49', '2023-06-19 16:23:49', 1, 'astu bbb if'),
(22, 'Here is the full text of President Donald Trump\'s State of the Union address:', 'hello d  hello bb again The world we inhabit is a complex and ever-evolving place, filled with limitless potential for exploration and discovery. From the vast expanse of the universe to the intricate workings of the astuman mind and body, there is an abundance of wonders to uncover. astumans have sought to comprehend the world around them throughout history, striving to understand their place in it and establish meaning and purpose in their lives. From the earliest groups of astunter-gatherers to the most advanced technological societies, people have developed a myriad of customs, beliefs, and methods to navigate the challenges of their existence and search for happiness and fulfillment.Throughout history, astumans have faced countless obstacles and setbacks, including wars, famines, diseases, and natural disasters. Yet, through perseverance and determination, they have continued to progress and flourish, always aiming to create a brighter tomorrow for themselves and future generations. Today, we face unprecedented global challenges like climate change, inequality, and the threat of nuclear war. However, we also have unparalleled opportunities to cultivate a more equitable, sustainable, and harmonious world, harnessing the strength of science, technology, and astuman collaboration.In recent years, technological advancements have facilitated a rapid acceleration of progress in many fields, from medicine to communications to transportation. However, these advancements have also brought new challenges and concerns, such as the impact of automation on job markets and the potential consequences of unchecked artificial intelligence. Moreover, many global challenges, such as climate change and inequality, require coordinated efforts and cooperation at the international level to address.In the face of these challenges, it is critical that we work together to create a more just and sustainable world. This will require investment in education and scientific research, as well as greater collaboration and communication among nations. It will also require a commitment to protecting the environment, prioritizing social justice, and promoting peace. By working together, we can build a brighter future for all, one in which the wonders of the world are preserved, and astuman potential is fully realized.', 'Images\\Post_Image\\1687191957717.jpg', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aadd', '2023-06-19 16:25:57', '2023-06-19 17:31:50', 1, 'astu bbb if'),
(23, 'Here is the full text of President Donald Trump\'s State of the Union address:', 'hello d  hello bb again mm The world we inhabit is a complex and ever-evolving place, filled with limitless potential for exploration and discovery. From the vast expanse of the universe to the intricate workings of the astuman mind and body, there is an abundance of wonders to uncover. astumans have sought to comprehend the world around them throughout history, striving to understand their place in it and establish meaning and purpose in their lives. From the earliest groups of astunter-gatherers to the most advanced technological societies, people have developed a myriad of customs, beliefs, and methods to navigate the challenges of their existence and search for happiness and fulfillment.Throughout history, astumans have faced countless obstacles and setbacks, including wars, famines, diseases, and natural disasters. Yet, through perseverance and determination, they have continued to progress and flourish, always aiming to create a brighter tomorrow for themselves and future generations. Today, we face unprecedented global challenges like climate change, inequality, and the threat of nuclear war. However, we also have unparalleled opportunities to cultivate a more equitable, sustainable, and harmonious world, harnessing the strength of science, technology, and astuman collaboration.In recent years, technological advancements have facilitated a rapid acceleration of progress in many fields, from medicine to communications to transportation. However, these advancements have also brought new challenges and concerns, such as the impact of automation on job markets and the potential consequences of unchecked artificial intelligence. Moreover, many global challenges, such as climate change and inequality, require coordinated efforts and cooperation at the international level to address.In the face of these challenges, it is critical that we work together to create a more just and sustainable world. This will require investment in education and scientific research, as well as greater collaboration and communication among nations. It will also require a commitment to protecting the environment, prioritizing social justice, and promoting peace. By working together, we can build a brighter future for all, one in which the wonders of the world are preserved, and astuman potential is fully realized.', 'Images\\Post_Image\\1687193356646.jpg', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aadd', '2023-06-19 16:49:16', '2023-06-19 17:32:14', 1, 'astu bbb if'),
(24, 'Here is the full text of President Donald Trump\'s State of the Union address:', 'hello d hh  hello bb again mm The world we inhabit is a complex and ever-evolving place, filled with limitless potential for exploration and discovery. From the vast expanse of the universe to the intricate workings of the astuman mind and body, there is an abundance of wonders to uncover. astumans have sought to comprehend the world around them throughout history, striving to understand their place in it and establish meaning and purpose in their lives. From the earliest groups of astunter-gatherers to the most advanced technological societies, people have developed a myriad of customs, beliefs, and methods to navigate the challenges of their existence and search for happiness and fulfillment.Throughout history, astumans have faced countless obstacles and setbacks, including wars, famines, diseases, and natural disasters. Yet, through perseverance and determination, they have continued to progress and flourish, always aiming to create a brighter tomorrow for themselves and future generations. Today, we face unprecedented global challenges like climate change, inequality, and the threat of nuclear war. However, we also have unparalleled opportunities to cultivate a more equitable, sustainable, and harmonious world, harnessing the strength of science, technology, and astuman collaboration.In recent years, technological advancements have facilitated a rapid acceleration of progress in many fields, from medicine to communications to transportation. However, these advancements have also brought new challenges and concerns, such as the impact of automation on job markets and the potential consequences of unchecked artificial intelligence. Moreover, many global challenges, such as climate change and inequality, require coordinated efforts and cooperation at the international level to address.In the face of these challenges, it is critical that we work together to create a more just and sustainable world. This will require investment in education and scientific research, as well as greater collaboration and communication among nations. It will also require a commitment to protecting the environment, prioritizing social justice, and promoting peace. By working together, we can build a brighter future for all, one in which the wonders of the world are preserved, and astuman potential is fully realized.', 'Images\\Post_Image\\1687196164578.jpg', 4, 'Biruk Yonas Neway', 'Addis abbbaba  aadd', '2023-06-19 17:36:04', '2023-06-19 17:36:19', 1, 'astu bbb if');

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `preferenceId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userType` enum('Student','Staff') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `preferences`
--

INSERT INTO `preferences` (`preferenceId`, `userId`, `userType`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'Staff', '2023-06-15 06:58:34', '2023-06-15 06:58:34'),
(6, 2, 'Staff', '2023-06-15 08:12:15', '2023-06-15 08:12:15'),
(7, 2, '', '2023-06-15 17:17:38', '2023-06-15 17:17:38'),
(8, 2, '', '2023-06-15 17:17:43', '2023-06-15 17:17:43'),
(9, 2, 'Student', '2023-06-15 17:18:05', '2023-06-15 17:18:05'),
(12, 10, 'Staff', '2023-06-26 04:58:35', '2023-06-26 04:58:35'),
(15, 1, 'Student', '2023-06-26 22:07:16', '2023-06-26 22:07:16');

-- --------------------------------------------------------

--
-- Table structure for table `rsvps`
--

CREATE TABLE `rsvps` (
  `id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `postId` int(11) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `forUser` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `rsvps`
--

INSERT INTO `rsvps` (`id`, `status`, `postId`, `userType`, `createdAt`, `updatedAt`, `forUser`) VALUES
(1, 1, 11, 'Student', '2023-06-09 17:33:56', '2023-06-25 07:28:53', 1),
(2, 1, 11, 'Student', '2023-06-09 17:33:56', '2023-06-25 07:30:25', 2),
(3, 1, 11, 'Student', '2023-06-09 17:33:56', '2023-06-26 10:54:43', 3),
(4, 0, 11, 'Student', '2023-06-09 17:33:56', '2023-06-09 17:33:56', 4),
(5, 0, 11, 'Student', '2023-06-09 17:33:56', '2023-06-09 17:33:56', 22),
(6, 0, 11, 'Student', '2023-06-09 17:33:56', '2023-06-09 17:33:56', 23),
(13, 1, 13, 'Student', '2023-06-09 18:05:49', '2023-06-25 07:28:53', 1),
(14, 1, 13, 'Student', '2023-06-09 18:05:49', '2023-06-25 07:30:25', 2),
(15, 1, 13, 'Student', '2023-06-09 18:05:49', '2023-06-26 10:54:43', 3),
(16, 0, 13, 'Student', '2023-06-09 18:05:49', '2023-06-09 18:05:49', 4),
(17, 0, 13, 'Student', '2023-06-09 18:05:49', '2023-06-09 18:05:49', 22),
(18, 0, 13, 'Student', '2023-06-09 18:05:49', '2023-06-09 18:05:49', 23),
(19, 1, 14, 'Student', '2023-06-09 18:16:39', '2023-06-25 07:28:53', 1),
(20, 1, 14, 'Student', '2023-06-09 18:16:39', '2023-06-25 07:30:25', 2),
(21, 1, 14, 'Student', '2023-06-09 18:16:39', '2023-06-26 10:54:43', 3),
(22, 0, 14, 'Student', '2023-06-09 18:16:39', '2023-06-09 18:16:39', 4),
(23, 0, 14, 'Student', '2023-06-09 18:16:39', '2023-06-09 18:16:39', 22),
(24, 0, 14, 'Student', '2023-06-09 18:16:39', '2023-06-09 18:16:39', 23),
(25, 1, 15, 'Student', '2023-06-15 17:57:04', '2023-06-25 07:28:53', 1),
(26, 1, 15, 'Student', '2023-06-15 17:57:04', '2023-06-25 07:30:25', 2),
(27, 1, 15, 'Student', '2023-06-15 17:57:04', '2023-06-26 10:54:43', 3),
(28, 0, 15, 'Student', '2023-06-15 17:57:04', '2023-06-15 17:57:04', 4),
(29, 0, 15, 'Student', '2023-06-15 17:57:04', '2023-06-15 17:57:04', 22),
(30, 0, 15, 'Student', '2023-06-15 17:57:04', '2023-06-15 17:57:04', 23),
(31, 1, 16, 'Student', '2023-06-15 17:57:51', '2023-06-26 10:37:07', 1),
(32, 1, 16, 'Student', '2023-06-15 17:57:51', '2023-06-26 10:36:43', 2),
(33, 1, 16, 'Student', '2023-06-15 17:57:51', '2023-06-26 10:54:43', 3),
(34, 0, 16, 'Student', '2023-06-15 17:57:51', '2023-06-15 17:57:51', 4),
(35, 0, 16, 'Student', '2023-06-15 17:57:51', '2023-06-15 17:57:51', 22),
(36, 0, 16, 'Student', '2023-06-15 17:57:51', '2023-06-15 17:57:51', 23),
(37, 1, 17, 'Student', '2023-06-15 17:58:26', '2023-06-26 10:37:07', 1),
(38, 1, 17, 'Student', '2023-06-15 17:58:26', '2023-06-26 10:36:43', 2),
(39, 1, 17, 'Student', '2023-06-15 17:58:26', '2023-06-26 10:54:43', 3),
(40, 0, 17, 'Student', '2023-06-15 17:58:26', '2023-06-15 17:58:26', 4),
(41, 0, 17, 'Student', '2023-06-15 17:58:26', '2023-06-15 17:58:26', 22),
(42, 0, 17, 'Student', '2023-06-15 17:58:26', '2023-06-15 17:58:26', 23),
(43, 1, 18, 'Student', '2023-06-15 18:01:27', '2023-06-26 10:37:07', 1),
(44, 1, 18, 'Student', '2023-06-15 18:01:27', '2023-06-26 10:36:43', 2),
(45, 1, 18, 'Student', '2023-06-15 18:01:27', '2023-06-26 10:54:43', 3),
(46, 0, 18, 'Student', '2023-06-15 18:01:27', '2023-06-15 18:01:27', 4),
(47, 0, 18, 'Student', '2023-06-15 18:01:27', '2023-06-15 18:01:27', 22),
(48, 0, 18, 'Student', '2023-06-15 18:01:27', '2023-06-15 18:01:27', 23),
(49, 1, 19, 'Student', '2023-06-19 16:16:10', '2023-06-26 10:37:07', 1),
(50, 1, 19, 'Student', '2023-06-19 16:16:10', '2023-06-26 10:36:43', 2),
(51, 1, 19, 'Student', '2023-06-19 16:16:10', '2023-06-26 10:54:43', 3),
(52, 0, 19, 'Student', '2023-06-19 16:16:10', '2023-06-19 16:16:10', 4),
(53, 0, 19, 'Student', '2023-06-19 16:16:10', '2023-06-19 16:16:10', 22),
(54, 0, 19, 'Student', '2023-06-19 16:16:10', '2023-06-19 16:16:10', 23),
(55, 1, 20, 'Student', '2023-06-19 16:18:46', '2023-06-26 10:37:07', 1),
(56, 1, 20, 'Student', '2023-06-19 16:18:46', '2023-06-26 10:36:43', 2),
(57, 1, 20, 'Student', '2023-06-19 16:18:46', '2023-06-26 10:54:43', 3),
(58, 0, 20, 'Student', '2023-06-19 16:18:46', '2023-06-19 16:18:46', 4),
(59, 0, 20, 'Student', '2023-06-19 16:18:46', '2023-06-19 16:18:46', 22),
(60, 0, 20, 'Student', '2023-06-19 16:18:46', '2023-06-19 16:18:46', 23),
(61, 1, 21, 'Student', '2023-06-19 16:23:50', '2023-06-26 10:37:07', 1),
(62, 1, 21, 'Student', '2023-06-19 16:23:50', '2023-06-26 10:36:43', 2),
(63, 1, 21, 'Student', '2023-06-19 16:23:50', '2023-06-26 10:54:43', 3),
(64, 0, 21, 'Student', '2023-06-19 16:23:50', '2023-06-19 16:23:50', 4),
(65, 0, 21, 'Student', '2023-06-19 16:23:50', '2023-06-19 16:23:50', 22),
(66, 0, 21, 'Student', '2023-06-19 16:23:50', '2023-06-19 16:23:50', 23),
(67, 1, 22, 'Student', '2023-06-19 16:25:57', '2023-06-26 10:37:07', 1),
(68, 1, 22, 'Student', '2023-06-19 16:25:57', '2023-06-26 10:36:43', 2),
(69, 1, 22, 'Student', '2023-06-19 16:25:57', '2023-06-26 10:54:43', 3),
(70, 0, 22, 'Student', '2023-06-19 16:25:57', '2023-06-19 16:25:57', 4),
(71, 0, 22, 'Student', '2023-06-19 16:25:57', '2023-06-19 16:25:57', 22),
(72, 0, 22, 'Student', '2023-06-19 16:25:57', '2023-06-19 16:25:57', 23),
(73, 1, 24, 'Student', '2023-06-19 17:36:04', '2023-06-26 10:37:07', 1),
(74, 1, 24, 'Student', '2023-06-19 17:36:04', '2023-06-26 10:36:43', 2),
(75, 1, 24, 'Student', '2023-06-19 17:36:04', '2023-06-26 10:54:43', 3),
(76, 0, 24, 'Student', '2023-06-19 17:36:04', '2023-06-19 17:36:04', 4),
(77, 0, 24, 'Student', '2023-06-19 17:36:04', '2023-06-19 17:36:04', 22),
(78, 0, 24, 'Student', '2023-06-19 17:36:04', '2023-06-19 17:36:04', 23);

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `schoolId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ShortedName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`schoolId`, `name`, `ShortedName`, `createdAt`, `updatedAt`) VALUES
(1, 'School of civil and architecture engineering', 'SOCAE', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(2, 'School of Mechanical Chemical and Materials Engineering', 'SOMCME', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(3, 'School of Electrical Engineering and Computing', 'SOEEC', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(4, 'School of Applied Natural Science', 'SOANS', '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(5, 'Division of Freshman Program', 'DOFP', '2023-06-08 06:03:31', '2023-06-08 06:03:31');

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE `staffs` (
  `staffId` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `staffs`
--

INSERT INTO `staffs` (`staffId`, `fullname`, `email`, `password`, `picture`, `isVerified`, `createdAt`, `updatedAt`) VALUES
(1, 'Biruk Yonas Neway', 'biruk@gmail.com', '$2b$10$gk4D1C4yjzoEmXMjUYtpGeq1kBeaCm4kfGUhQit/rNRhSdiNillVa', NULL, 0, '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(2, 'Ephrem Honelign Alene', 'ephrem@gmail.com', '$2b$10$7sVCV5FyI.5Ec1Zv2Qs.be9VzjQH5W6jbvx4eVnblNCGhs6/0Ycom', NULL, 0, '2023-06-08 06:03:31', '2023-06-08 06:03:31'),
(3, 'yohanis', 'abel@gmail.com', '$2b$10$qqK16tYr1uPJf91roOca9uDptx.LRZDhiqI3rV5e0uqO1rDY5i4F6', 'Images\\Staff_Image\\1687789287106.png', 0, '2023-06-08 06:03:32', '2023-06-26 14:21:27'),
(4, 'Robel Belachew Hailemariyam', 'robel@gmail.com', '$2b$10$4SY3ah6cvF9YHNCrwAc.R.cF8d4SOciP.1SCGikGQMOYVgIL9lg8.', NULL, 0, '2023-06-08 06:03:32', '2023-06-08 06:03:32'),
(5, 'Milkias Solomon Gebrasilassie', 'milkias@gmail.com', '$2b$10$8hSqYJOTl.bkWDinyKSRROM6Z4dE5Eln./v4u7n/yt/3ChWiDrk0G', NULL, 0, '2023-06-08 06:03:32', '2023-06-08 06:03:32'),
(6, 'Selam Alebachew Debeb', 'selam@gmail.com', '$2b$10$hbXrUrhj6C2g2r3AfiH6oupiUN8ifK3NSVvPgP0.ZpRPGzg4mCi7K', NULL, 0, '2023-06-08 06:03:32', '2023-06-08 06:03:32'),
(7, 'Yonas Muliye Fite', 'yonas@gmail.com', '$2b$10$GjuwPQLB.iNzDM7l0yTmNeVFWv0PKFTItlziFL6LU2T4ELwLh0Jzu', NULL, 0, '2023-06-08 06:03:32', '2023-06-08 06:03:32'),
(8, 'Henok Belayneh Eridaw', 'henok@gmail.com', '$2b$10$up/i4O/GdcZtrlexRjAxNOER.BiGC/PxOSoi2gpdTQoolUuk4qZaC', NULL, 0, '2023-06-08 06:03:32', '2023-06-08 06:03:32'),
(9, 'Daniel Fantaastun Gebremeskel', 'daniel@gmail.com', '$2b$10$3VFSmszY1qiuLeu2UkvhOOjYVKrkf5MtE8EO3.d4na01DyYCqd.dm', NULL, 0, '2023-06-08 06:03:32', '2023-06-08 06:03:32'),
(10, 'Nebiyu Mohammed Bedaso', 'nebiyu@gmail.com', '$2b$10$RMhd.h1a1fJ60eEUTEJOqerQh4Opqm/MlFdmO6jHkPVoOmGA1rIbS', NULL, 1, '2023-06-08 06:03:32', '2023-06-27 01:42:30'),
(11, 'Milkias solomon', 'seifegabriel9@gmail.com', '$2b$10$LZxta5QH40UnLMMBOm6N9uDHhHVqf/UKciog6/ylwVW2l9/tmaM7W', 'Images\\Staff_Image\\1686331192426.jpg', 0, '2023-06-09 17:19:52', '2023-06-27 01:43:39');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentId` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `year` int(11) NOT NULL,
  `isVerified` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `depId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`studentId`, `fullname`, `email`, `password`, `picture`, `year`, `isVerified`, `createdAt`, `updatedAt`, `depId`) VALUES
(1, 'Aysanew Yonas Neway', 'aysanew@gmail.com', '$2b$10$/0zHeV42w/0O7ljNyuneKOv4xP8G6tCrnmmfukRXR1dAHGm4v40iK', NULL, 5, 1, '2023-06-08 06:03:32', '2023-06-08 06:03:32', 1),
(2, 'Bereket Honelign Alene', 'bereket@gmail.com', '$2b$10$Z65JemF7WoBj5EU5IC.CXe.iiMwkku5Rj3PjP5evagmMP5xPwoqEq', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 1),
(3, 'yohanis', 'bekalu@gmail.com', '$2b$10$GIAnAnRVeDjVD.kaBL0Wdu6TDGMKTnwFzZcDXzwgGDjXDk4crRXe2', 'Images\\Stud_Image\\1687788778437.png', 3, 0, '2023-06-08 06:03:33', '2023-06-26 14:12:58', 2),
(4, 'Tamiru Belachew Hailemariyam', 'tamiru@gmail.com', '$2b$10$GastuxAK5AfXYQTgb2CdvGBe7ETIs8T8lMXCb8Dwa9BAGlgn5/M37Xy', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 2),
(5, 'Tinsae astunegnaw Ambaneh', 'tinsae@gmail.com', '$2b$10$iLKg3tpw.iuLMKpTn.QYxesg3vWsrC5giBoUQlVwv6E4AEyUHg9wG', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 3),
(6, 'Milkias Solomon Gebrasilassie', 'milkias@gmail.com', '$2b$10$caA6hyeVZN.j3BEgVVw2Fefc9lsMHA6k/yUgaEdkBtlwGdhPYPCh.', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 3),
(7, 'Habtamu Alebachew Debeb', 'habtamu@gmail.com', '$2b$10$cz8A82/SNWZ4NX6ZYPfdYujKFZUY7465d1Bo0dXJZgT0gAfqwKQJG', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 4),
(8, 'Samuel Muliye Fite', 'samuel@gmail.com', '$2b$10$morw/1UXIlYb.yO7HsuJqOLIva.WW2lfxryeg1DjMcUbVPai5dfNy', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 4),
(9, 'Yeastualashet Belayneh Eridaw', 'yeastualashet@gmail.com', '$2b$10$Qx0CrCbdYWh/lCU6TFqufOHMNkP0Vgqf.0ujTzmqRur/GdJrV96mi', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 5),
(10, 'Brook Fantaastun Gebremeskel', 'brook@gmail.com', '$2b$10$MmfoMnIywZBvaFxwC4XAA.s7om9YzqkXN.agFFricKWTDTlwXcz/i', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 5),
(11, 'Fuad Mohammed Bedaso', 'fuad@gmail.com', '$2b$10$mBnAaDr.d7m.SDFbdsoafeSHIZEtDZQ4/1AzS0BFXwk6CXmisOv6u', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 6),
(12, 'Absra Girma Tenna', 'absra@gmail.com', '$2b$10$XwvGOJ99smiJFIgPwqvTT.cIHwzcQ2bQVksEQ/DICXAenEVWNuI9e', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 6),
(13, 'Mentesenot Kibebew Kebede', 'mentesenot@gmail.com', '$2b$10$VXvr.oWqnz3arIIBR5oV6.XvgkukzEp4Sw3lNbCC5GerAeexxK256', NULL, 5, 0, '2023-06-08 06:03:33', '2023-06-08 06:03:33', 7),
(14, 'Ayantu Lemma Gizaw', 'ayantu@gmail.com', '$2b$10$vPTowXmPxW6/dgastuT1cwWOJdgGXQTvktUDfEkGGEAlsOyspwoz6hK', NULL, 5, 0, '2023-06-08 06:03:34', '2023-06-08 06:03:34', 7),
(15, 'Mekdem Alemu Gebre', 'mekdem@gmail.com', '$2b$10$RSktv78RyrYAnBiaeMZDbe6idVyxJWeS92RtNAXgnBWFQNRFYtEw2', NULL, 5, 0, '2023-06-08 06:03:34', '2023-06-08 06:03:34', 8),
(16, 'Abdi Adem Abdela', 'abdi@gmail.com', '$2b$10$GTprC9YPRERCfSONVL/i9Om2rdYseFFWcittYs.rOSwArcamkB4X2', NULL, 5, 0, '2023-06-08 06:03:34', '2023-06-08 06:03:34', 8),
(17, 'Naila Abdelah Hassen', 'naila@gmail.com', '$2b$10$zyyL0zOMaLfJKuMRP3RRqOtBB5Uy2TxGFngbqGpjrzQCisr1EvaBi', NULL, 5, 0, '2023-06-08 06:03:34', '2023-06-08 06:03:34', 9),
(18, 'Etsubsira Dirsha Demam', 'etsubsira@gmail.com', '$2b$10$OXbUcX1QeFxIHJ6.UV4hReyyQUVfH59ddDFp00hFJr2/1ypEB2JSu', NULL, 5, 0, '2023-06-08 06:03:34', '2023-06-08 06:03:34', 9),
(19, 'Yared Abera Mengistu', 'yared@gmail.com', '$2b$10$Pgr0hSgYYGjMQPyO2UbJeOeO3S3a5GJ6nq2o2WjzzdpoSZWEEOwN6', NULL, 5, 0, '2023-06-08 06:03:34', '2023-06-08 06:03:34', 6),
(20, 'Yafet Berhanu Garno', 'yafet@gmail.com', '$2b$10$vb1EPlZlrKxtTz4gDodXt.MdFp4Mdu/wHaLrd2zb/bJQNxLZa0hcO', NULL, 5, 0, '2023-06-08 06:03:34', '2023-06-08 06:03:34', 6),
(22, 'Kifle Abebaw', 'aaab', '$2b$10$76e/X15541pJwCjLKwmnP.QT44wkGeEJYDv2BUCs0U.3IFHy2IumS', 'Images\\Stud_Image\\1686325494930.jpg', 5, 0, '2023-06-09 15:44:55', '2023-06-09 15:44:55', 2),
(23, 'yohanis', 'abragdag', '$2b$10$Mvvh2FLRStcCi6im7xSIVO4BiNriLJDdwea3uW3RyGA5ZcCUoexQq', 'Images\\Stud_Image\\1686329294370.jpg', 5, 0, '2023-06-09 16:48:14', '2023-06-09 16:48:14', 2),
(43, 'yohanis', 'seifegabriel9@gmail.com', '$2b$10$rrEw1HMMaN5XpWcaG1QZjeWY0QqRIMSDQDUzo3iVg6fOssyM95wcq', NULL, 5, 0, '2023-06-23 20:03:29', '2023-06-26 12:28:09', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`adminId`),
  ADD UNIQUE KEY `adminId` (`adminId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chatId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`convid`),
  ADD KEY `chatId` (`chatId`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`depId`),
  ADD KEY `schoolId` (`schoolId`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`likeId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`optionId`),
  ADD KEY `preferenceId` (`preferenceId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `staffId` (`staffId`);

--
-- Indexes for table `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`preferenceId`);

--
-- Indexes for table `rsvps`
--
ALTER TABLE `rsvps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`schoolId`);

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`staffId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`studentId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD KEY `depId` (`depId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `adminId` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `chatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `convid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `depId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `likeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `optionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `preferences`
--
ALTER TABLE `preferences`
  MODIFY `preferenceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `rsvps`
--
ALTER TABLE `rsvps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `schoolId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `staffId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `studentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_10` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_11` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_12` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_13` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_14` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_15` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_16` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_17` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_4` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_5` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_6` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_7` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_8` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `chats_ibfk_9` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_10` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_11` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_12` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_13` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_14` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_15` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_16` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_17` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_2` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_3` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_4` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_5` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_6` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_7` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_8` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_9` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_10` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_11` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_12` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_13` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_14` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_15` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_16` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_17` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_2` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_3` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_4` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_5` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_6` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_7` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_8` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `departments_ibfk_9` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`schoolId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_10` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_11` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_12` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_13` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_14` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_15` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_16` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_17` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_4` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_5` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_6` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_7` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_8` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_9` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_10` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_11` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_12` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_13` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_14` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_15` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_16` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_17` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_18` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_19` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_20` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_21` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_22` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_23` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_24` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_25` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_26` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_27` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_28` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_3` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_4` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_5` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_6` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_7` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_8` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_9` FOREIGN KEY (`preferenceId`) REFERENCES `preferences` (`preferenceId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_10` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_11` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_12` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_13` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_14` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_15` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_16` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_17` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_18` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_19` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_20` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_21` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_22` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_23` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_24` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_25` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_26` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_27` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_28` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_29` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_30` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_31` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_32` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_33` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_34` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_4` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_5` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_6` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_7` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_8` FOREIGN KEY (`staffId`) REFERENCES `staffs` (`staffId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_9` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_10` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_11` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_12` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_13` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_14` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_15` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_16` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_17` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_5` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_6` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_7` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_8` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_9` FOREIGN KEY (`depId`) REFERENCES `departments` (`depId`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
