use nftkeychain;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE `users` (
	`userName` varchar(100) NOT NULL,
    `userPassword` varchar(100) NOT NULL,
    `email` varchar(100),
    `fName` varchar(100),
    `lName` varchar(100),
    PRIMARY KEY (`userName`)
);