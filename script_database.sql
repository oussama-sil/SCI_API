DROP DATABASE IF EXISTS BDD_SCI_MAILBOX ;

CREATE DATABASE IF NOT EXISTS BDD_SCI_MAILBOX;

USE BDD_SCI_MAILBOX;


-- Creation of a new user for the app 
DROP USER IF EXISTS 'sci_api';
CREATE USER 'sci_api' IDENTIFIED  BY 'sci_api_password';
-- Granting all rights on the database to the new user 
GRANT INSERT, UPDATE, DELETE, SELECT on BDD_SCI_MAILBOX.* TO 'sci_api' ;

CREATE TABLE MailBox(
   mailboxID INT,
   mailboxName VARCHAR(50),
   nbMails INT,
   isFree BOOL,
  PRIMARY KEY(mailboxID)
);

INSERT INTO MailBox (mailboxID,nbMails,isFree,mailboxName) VALUES (2,00,true,"Second mailbox");
INSERT INTO MailBox (mailboxID,nbMails,isFree,mailboxName) VALUES (1,00,true,"First mailbox");

select * from mailbox;

DROP TABLE IF EXISTS Person;
CREATE TABLE Person(
   personID INT,
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   badgeID VARCHAR(50),
   username VARCHAR(50),
   passwd VARCHAR(50),
   isAdmin BOOL,
   PRIMARY KEY(personID)
);

INSERT INTO Person (personID,firstname,lastname,badgeID,username,passwd,isAdmin) VALUES (1,"Silem","Oussama","5C","osil","osil",true);
INSERT INTO Person (personID,firstname,lastname,badgeID,username,passwd,isAdmin) VALUES (2,"Benguerra","Djad","9B","djidji","djidji",false);

SELECT * FROM Person;

-- To save all the events
DROP TABLE IF EXISTS Event;
CREATE TABLE Event(
   eventID INT,
   dateEvent DATETIME,
   mailboxID VARCHAR(50),
   eventType VARCHAR(50),
   nbMails VARCHAR(50),
   personID VARCHAR(50),
   PRIMARY KEY(eventID)
);

select * from Event;

DROP TABLE IF EXISTS Assigned;

CREATE TABLE Assigned(
   mailboxID INT,
   personID INT,
   PRIMARY KEY(mailboxID, personID),
   FOREIGN KEY(mailboxID) REFERENCES MailBox(mailboxID),
   FOREIGN KEY(personID) REFERENCES Person(personID)
);

