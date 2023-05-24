DROP DATABASE IF EXISTS BDD_SCI_MAILBOX ;

CREATE DATABASE IF NOT EXISTS BDD_SCI_MAILBOX;

USE BDD_SCI_MAILBOX;


-- Creation of a new user for the app 
DROP USER IF EXISTS 'sci_api';
CREATE USER 'sci_api' IDENTIFIED  BY 'sci_api_password';
-- Granting all rights on the database to the new user 
GRANT INSERT, UPDATE, DELETE, SELECT on BDD_SCI_MAILBOX.* TO 'sci_api' ;

DROP TABLE IF exists MailBox;
CREATE TABLE MailBox(
   mailboxID INT,
   mailboxName VARCHAR(50),
   nbMails INT,
   isFree BOOL, 
   lastUpdate DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY(mailboxID)
);
select max(mailboxID) as max from MailBox; 
SELECT mailboxID, mailboxName,nbMails,isFree, (TIME_TO_SEC(CURRENT_TIMESTAMP()) - TIME_TO_SEC(lastUpdate))/60 as lastUpdate FROM MailBox;
INSERT INTO MailBox (mailboxID,nbMails,isFree,mailboxName) VALUES (2,00,true,"Second mailbox");
INSERT INTO MailBox (mailboxID,nbMails,isFree,mailboxName) VALUES (1,00,true,"First mailbox");

select TIME_TO_SEC(CURRENT_TIMESTAMP()) - TIME_TO_SEC(lastUpdate) from MailBox;
select * from mailbox;

DROP TABLE IF EXISTS Person;
CREATE TABLE Person(
   personID INT,
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   email VARCHAR(50),
   badgeID VARCHAR(50),
   username VARCHAR(50),
   passwd VARCHAR(50),
   isAdmin BOOL,
   PRIMARY KEY(personID)
);
select * from Person;
INSERT INTO Person (personID,firstname,lastname,email,badgeID,username,passwd,isAdmin) VALUES (1,"Silem","Oussama","jo_silem@esi.dz","5C","osil","osil",true);
INSERT INTO Person (personID,firstname,lastname,badgeID,username,passwd,isAdmin) VALUES (2,"Benguerra","Djad","jo_silem@esi.dz","9B","djidji","djidji",false);

SELECT * FROM Person;

-- To save all the events
DROP TABLE IF EXISTS Event;
CREATE TABLE Event(
   eventID INT,
   dateEvent DATETIME,
   mailboxID INT,
   eventType VARCHAR(50),
   nbMails INT,
   personID INT unique,
   PRIMARY KEY(eventID),
   FOREIGN KEY (mailboxID) REFERENCES Mailbox(mailboxID)
);

select * from Event;
INSERT INTO Event(eventID,dateEvent,mailboxID,eventType,nbMails,personID) VALUES (1,CURRENT_TIMESTAMP(),1," BoxMail Opened",0,-1);

select eventID,TIME(dateEvent) as time ,DATE(dateEvent)as date,mailboxID,eventType,nbMails,personID from Event;
DROP TABLE IF EXISTS Assigned;
CREATE TABLE Assigned(
   mailboxID INT,
   personID INT,
   PRIMARY KEY(mailboxID, personID),
   FOREIGN KEY(mailboxID) REFERENCES MailBox(mailboxID),
   FOREIGN KEY(personID) REFERENCES Person(personID) on delete cascade
);
select * from assigned;
INSERT INTO ASSIGNED(mailboxID,personID) VALUES (1,1);
select * from assigned where mailboxID = 1;
select * from assigned where personID = 1;
delete from assigned where mailboxID=1 and personID = 1;
delete from assigned where true;