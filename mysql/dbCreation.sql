-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema workshop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema workshop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `workshop` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `workshop` ;

-- -----------------------------------------------------
-- Table `workshop`.`UserRole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`UserRole` ;

CREATE TABLE IF NOT EXISTS `workshop`.`UserRole` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`UserState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`UserState` ;

CREATE TABLE IF NOT EXISTS `workshop`.`UserState` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`User` ;

CREATE TABLE IF NOT EXISTS `workshop`.`User` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(60) NULL,
  `role` INT UNSIGNED NOT NULL,
  `state` INT UNSIGNED NOT NULL,
  `sessionId` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `userName_UNIQUE` (`username` ASC),
  INDEX `UserRole_idx` (`role` ASC),
  INDEX `UserState_idx` (`state` ASC),
  CONSTRAINT `UserRole`
    FOREIGN KEY (`role`)
    REFERENCES `workshop`.`UserRole` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `UserState`
    FOREIGN KEY (`state`)
    REFERENCES `workshop`.`UserState` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`TDTodo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`TDTodo` ;

CREATE TABLE IF NOT EXISTS `workshop`.`TDTodo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shortDesc` VARCHAR(50) NOT NULL,
  `description` VARCHAR(250) NULL,
  `category` INT UNSIGNED NOT NULL,
  `priority` INT UNSIGNED NOT NULL DEFAULT 3,
  `state` INT UNSIGNED NOT NULL DEFAULT 1,
  `dateDue` DATETIME NOT NULL,
  `dateCreation` DATETIME NOT NULL DEFAULT now(),
  `dateUpdate` DATETIME NULL,
  `comment` VARCHAR(250) NULL,
  `creator` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `Creator_idx` (`creator` ASC),
  CONSTRAINT `Creator`
    FOREIGN KEY (`creator`)
    REFERENCES `workshop`.`User` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`WLWishList`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`WLWishList` ;

CREATE TABLE IF NOT EXISTS `workshop`.`WLWishList` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shortDesc` VARCHAR(50) NOT NULL,
  `description` VARCHAR(500) NULL,
  `creator` INT UNSIGNED NOT NULL,
  `dateCreation` DATETIME NOT NULL DEFAULT now(),
  `dateDue` DATETIME NOT NULL DEFAULT '9999-12-31',
  `state` INT UNSIGNED NOT NULL DEFAULT 1,
  `comment` VARCHAR(500) NULL,
  `priority` INT UNSIGNED NOT NULL DEFAULT 3,
  `category` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `shortDesc_UNIQUE` (`shortDesc` ASC),
  INDEX `WLCreator_idx` (`creator` ASC),
  CONSTRAINT `WLCreator`
    FOREIGN KEY (`creator`)
    REFERENCES `workshop`.`User` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`TDCategory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`TDCategory` ;

CREATE TABLE IF NOT EXISTS `workshop`.`TDCategory` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`TDPriority`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`TDPriority` ;

CREATE TABLE IF NOT EXISTS `workshop`.`TDPriority` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`TDState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`TDState` ;

CREATE TABLE IF NOT EXISTS `workshop`.`TDState` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`WLCategory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`WLCategory` ;

CREATE TABLE IF NOT EXISTS `workshop`.`WLCategory` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`WLPriority`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`WLPriority` ;

CREATE TABLE IF NOT EXISTS `workshop`.`WLPriority` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`WLState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `workshop`.`WLState` ;

CREATE TABLE IF NOT EXISTS `workshop`.`WLState` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC))
ENGINE = InnoDB;

USE `workshop` ;

-- -----------------------------------------------------
-- View `workshop`.`Users`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `workshop`.`Users` ;
USE `workshop`;
CREATE  OR REPLACE VIEW `Users` AS
Select user.id, user.username, user.password, user.sessionId, role.label as role, state.label as state from User as user, UserRole as role, UserState as state
	where user.role=role.id and user.state=state.id
;

-- -----------------------------------------------------
-- View `workshop`.`TDTodos`
-- -----------------------------------------------------
DROP VIEW IF EXISTS `workshop`.`TDTodos` ;
USE `workshop`;
CREATE  OR REPLACE VIEW `TDTodos` AS
select TDTodo.*, TDCategory.label as categoryLabel, TDPriority.label as priorityLabel, TDState.label as stateLabel, User.username as creatorUsername from TDTodo, TDCategory, TDPriority, TDState, User 
	where TDTodo.category=TDCategory.id	and TDTodo.priority=TDPriority.id and TDTodo.state=TDState.id and TDTodo.creator=User.id
;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
