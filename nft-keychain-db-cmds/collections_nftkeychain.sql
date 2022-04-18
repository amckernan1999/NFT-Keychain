use nftkeychain;

DROP TABLE IF EXISTS collections CASCADE;

CREATE TABLE `collections` (
	`url` varchar(500) NOT NULL,
    `userName` varchar(100) NOT NULL,
    PRIMARY KEY (`url`)
);