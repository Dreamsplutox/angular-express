USE testdb;
CREATE TABLE tutorials (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO testdb.tutorials (title, description, published, createdAt, updatedAt) 
VALUES ("Node.js Express", "Tut#2 Description", 0, "2021-06-01 03:19:55", "2021-06-01 03:19:55"),
("Angular 12 Node.js MySQL CRUD example", "Tut#3 Description", 1, "2021-06-01 03:21:33", "2021-06-01 03:25:19"),
("Node.js Express CRUD example", "Tut#4 Description", 0, "2021-06-01 03:22:22", "2021-06-01 03:22:22"),
("Express.js Advanced", "Tut#5 Description", 0, "2021-06-01 03:22:38", "2021-06-01 03:22:38")