use nftkeychain;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE `users` (
    `userID` INT AUTO_INCREMENT PRIMARY KEY,
	`userName` varchar(100) NOT NULL,
    `userPassword` varchar(100) NOT NULL
);