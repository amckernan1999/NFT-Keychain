use nftkeychain;

DROP TABLE IF EXISTS collections;

CREATE TABLE `collections` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
	`url` varchar(500) NOT NULL,
    `title` varchar(500) NOT NULL,
    `path` varchar(500) NOT NULL,
    `userID` VARCHAR(8) NOT NULL,
    `keyhash` VARCHAR(100) NOT NULL
);