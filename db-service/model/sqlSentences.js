module.exports = {
    createDB: 'CREATE DATABASE IF NOT EXISTS BUILDING;',
    setDB: 'USE BUILDING',
    createTableUser: `CREATE TABLE IF NOT EXISTS USER (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        Username VARCHAR(20) NOT NULL UNIQUE,
        LicensePlate VARCHAR(7) NOT NULL UNIQUE,
        Password CHAR(32) NOT NULL,
        verified BOOLEAN DEFAULT FALSE NOT NULL,
        Ewelink TINYINT(1),
        Ewemail VARCHAR(50),
        Ewpassword VARCHAR(50),
        devicesON LONGTEXT
    ) ENGINE=InnoDB;`,
    createTableSensor: `CREATE TABLE IF NOT EXISTS SENSOR (
        ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        AT DATETIME
    ) ENGINE=InnoDB;`,
    createTableDetections: `CREATE TABLE IF NOT EXISTS DETECTIONS (
        ID INT PRIMARY KEY,
        TRUE_DETECTION INT NOT NULL,
        FALSE_DETECTION INT NOT NULL,
        BELONG INT NOT NULL,
        NOT_BELONG INT NOT NULL
    ) ENGINE=InnoDB;`,
    initialTableDetections: `INSERT IGNORE INTO DETECTIONS VALUES (0,0,0,0,0)`
}
