DROP DATABASE Application;
CREATE DATABASE IF NOT EXISTS Application;
USE Application;

CREATE TABLE User(
    userID INT NOT NULL, 
    firstName VARCHAR(25) NOT NULL,
    lastName VARCHAR(25) NOT NULL,
    DOB VARCHAR(10) NOT NULL,
    city VARCHAR(25) NOT NULL,
    state VARCHAR(25) NOT NULL,
    zipCode VARCHAR(8) NOT NULL,
    address VARCHAR(25) NOT NULL,
    userType VARCHAR(25) NOT NULL,
    PRIMARY KEY (userId)
);

CREATE TABLE LoginInfo(
    userID INT NOT NULL,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    userType VARCHAR(25) NOT NULL,
    status VARCHAR(25) NOT NULL,
    FOREIGN KEY (userID) REFERENCES User (userID)
);

CREATE TABLE Student(
    studentID INT NOT NULL,
    creditsEarned DOUBLE NOT NULL,
    yearLevel VARCHAR(10) NOT NULL,
    studentType VARCHAR(25) NOT NULL,
    yearOfEntrance DATE NOT NULL,
    FOREIGN KEY (studentID) REFERENCES User (userID)
);

CREATE TABLE Faculty(
    facultyID INT NOT NULL,
    rank VARCHAR(25) NOT NULL,
    FOREIGN KEY (facultyID) REFERENCES User (userID)
);

CREATE TABLE FulltimeFac(
    facultyID INT NOT NULL,
    minCourse INT NOT NULL,
    maxCourse INT NOT NULL,
    FOREIGN KEY (facultyID) REFERENCES Faculty(facultyID)
);
CREATE TABLE PartTimeFac(
    facultyID INT NOT NULL,
    minCourse INT NOT NULL,
    maxCourse INT NOT NULL,
    FOREIGN KEY (facultyID) REFERENCES Faculty(facultyID)
);

CREATE TABLE Admin(
    adminID INT NOT NULL,
    status VARCHAR(25) NOT NULL,
    FOREIGN KEY (adminID) REFERENCES User (userID)
);

CREATE TABLE ResearchStaff(
    researchID INT NOT NULL,
    status VARCHAR(25) NOT NULL,
    FOREIGN KEY (researchID) REFERENCES User (userID)
);

CREATE TABLE Faculty_Advising(
     facultyID INT NOT NULL,
     studentID INT NOT NULL,
     dateOfAppointment DATE NOT NULL,
     FOREIGN KEY (facultyID) REFERENCES Faculty (facultyID),
     FOREIGN KEY (studentID) REFERENCES Student (studentID)
);

CREATE TABLE Hold(
    holdID INT NOT NULL,
    holdType VARCHAR(25) NOT NULL,
    PRIMARY KEY (holdID)
);

CREATE TABLE StudentHold(
     studentID INT NOT NULL,
     holdID INT NOT NULL,
     dateOfHold DATE NOT NULL,
     FOREIGN KEY (holdID) REFERENCES Hold (HoldID),
     FOREIGN KEY (studentID) REFERENCES Student (studentID)
);

CREATE TABLE Graduate(
    studentID INT NOT NULL,
    program VARCHAR(25) NOT NULL,
    staus VARCHAR(25) NOT NULL,
    examPassed BOOLEAN NOT NULL,
    thesisTitle VARCHAR(25) NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Student(studentID)
);

CREATE TABLE Undergraduate(
    studentID INT NOT NULL,
    yearLevel VARCHAR(10) NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Student(studentID)
);

CREATE TABLE GradFulltime(
    studentID INT NOT NULL,
    minCredit INT NOT NULL,
    maxCredit INT NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Graduate(studentID)
);
CREATE TABLE GradPartTime(
    studentID INT NOT NULL,
    minCredit INT NOT NULL,
    maxCredit INT NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Graduate(studentID)
);


CREATE TABLE UndergradFulltime(
    studentID INT NOT NULL,
    minCredit INT NOT NULL,
    maxCredit INT NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Undergraduate(studentID)
);
CREATE TABLE UndergradPartTime(
    studentID INT NOT NULL,
    minCredit INT NOT NULL,
    maxCredit INT NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Undergraduate(studentID)
);

CREATE TABLE Major(
    majorID VARCHAR(25) NOT NULL,
    departmentID VARCHAR(25),
    PRIMARY KEY (majorID),
    FOREIGN KEY (departmentID) REFERENCES Department (departmentID)
);

CREATE TABLE Minor(
    minorID VARCHAR(25) NOT NULL,
    departmentID VARCHAR(25),
    PRIMARY KEY (minorID),
    FOREIGN KEY (departmentID) REFERENCES Department (departmentID)
);

CREATE TABLE StudentMajor(
    majorID VARCHAR(25) NOT NULL,
    studentID INT NOT NULL,
    dateOfDeclaration DATE NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Student(studentID),
    FOREIGN KEY (majorID) REFERENCES Major(majorID)
);

CREATE TABLE StudentMinor(
    minorID VARCHAR(25) NOT NULL,
    studentID INT NOT NULL,
    dateOfDeclaration DATE NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Student(studentID),
    FOREIGN KEY (minorID) REFERENCES Minor(minorID)
);

CREATE TABLE Timeslot(
    timeslotID INT NOT NULL,
    day VARCHAR(10) NOT NULL,
    period INT NOT NULL,
    PRIMARY KEY (timeslotID)
);

CREATE TABLE Day(
    dayID VARCHAR(10) NOT NULL,
    day VARCHAR(10) NOT NULL,
    PRIMARY KEY(dayID)
);
CREATE TABLE Period(
    periodID INT NOT NULL,
    startTime VARCHAR(10),
    endTime VARCHAR(10),
    PRIMARY KEY(periodID)
);


CREATE TABLE TimeSlotDay(
    timeslotID INT NOT NULL,
    dayID VARCHAR(10) NOT NULL,
    FOREIGN KEY (timeslotID) REFERENCES Timeslot (timeslotID),
    FOREIGN KEY (dayID) REFERENCES Day (dayID)
);

CREATE TABLE TimeSlotPeriod(
    timeslotID INT NOT NULL,
    periodID INT NOT NULL,
    FOREIGN KEY (timeslotID) REFERENCES Timeslot (timeslotID),
    FOREIGN KEY (periodID) REFERENCES Period (periodID)
);

CREATE TABLE SemesterYear(
    semesterYearID VARCHAR(25) NOT NULL,
    semestername VARCHAR(10) NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY(semesterYearID)
);

CREATE TABLE Building(
    buildingID VARCHAR(25) NOT NULL,
    buidingUse VARCHAR(50) NOT NULL,
    PRIMARY KEY(buildingID)
);

CREATE TABLE Room(
    roomID VARCHAR(25) NOT NULL,
    buildingID VARCHAR(25) NOT NULL,
    roomType VARCHAR(12) NOT NULL,
    PRIMARY KEY (roomID),
    FOREIGN KEY (buildingID) REFERENCES Building (buildingID)
);

CREATE TABLE Lab(
    roomID VARCHAR(25) NOT NULL,
    labCapacity INT NOT NULL,
    FOREIGN KEY (roomID) REFERENCES Room (roomID)
);
CREATE TABLE Office(
    roomID VARCHAR(25) NOT NULL,
    officeCapacity INT NOT NULL,
    FOREIGN KEY (roomID) REFERENCES Room (roomID)
);
CREATE TABLE Classroom(
    roomID VARCHAR(25) NOT NULL,
    classCapacity INT NOT NULL,
    FOREIGN KEY (roomID) REFERENCES Room (roomID)
);

CREATE TABLE Department(
    departmentID VARCHAR(30) NOT NULL,
    roomID VARCHAR(25) NOT NULL,
    dEmail VARCHAR(30) NOT NULL,
    dPhone VARCHAR(15) NOT NULL,
    dChair VARCHAR(25) NOT NULL,
    dManager VARCHAR(25) NOT NULL,
    PRIMARY KEY (departmentID),
    FOREIGN KEY (roomID) REFERENCES Room(roomID)
);

CREATE TABLE Faculty_Department(
    facultyID INT NOT NULL,
    departmentID VARCHAR(30) NOT NULL,
    percTimeCommitment DOUBLE NOT NULL,
    dateOfAppt DATE NOT NULL,
    FOREIGN KEY (facultyID) REFERENCES Faculty(facultyID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
);

CREATE TABLE Course(
    courseID VARCHAR(30) NOT NULL,
    departmentID VARCHAR(30) NOT NULL,
    numOfCredits INT NOT NULL,
    PRIMARY KEY (courseID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
);

CREATE TABLE Prerequisite(
    courseID VARCHAR(30) NOT NULL,
    prereqCourseID VARCHAR(30) NOT NULL,
    gradeReq DOUBLE NOT NULL,
    FOREIGN KEY (courseID) REFERENCES Course(courseID),
    FOREIGN KEY (prereqCourseID) REFERENCES Course(courseID)
);

CREATE TABLE MajorRequirements(
    courseID VARCHAR(30) NOT NULL,
    majorID VARCHAR(25) NOT NULL,
    minCourseGrade DOUBLE NOT NULL,
    FOREIGN KEY (courseID) REFERENCES Course(courseID),
    FOREIGN KEY (majorID) REFERENCES Major(majorID)
);

CREATE TABLE MinorRequirements(
    courseID VARCHAR(30) NOT NULL,
    minorID VARCHAR(25) NOT NULL,
    minCourseGrade DOUBLE NOT NULL,
    FOREIGN KEY (courseID) REFERENCES Course(courseID),
    FOREIGN KEY (minorID) REFERENCES Minor(minorID)
);

CREATE TABLE CourseSection(
    CRN VARCHAR(10) NOT NULL,
    timeslotID INT NOT NULL,
    facultyID INT NOT NULL,
    roomID VARCHAR(25) NOT NULL,
    semesterYearID VARCHAR(25) NOT NULL,
    availableSeats INT NOT NULL,
    sectionNum INT NOT NULL,
    PRIMARY KEY(CRN),
    FOREIGN KEY(timeslotID) REFERENCES Timeslot(timeslotID),
    FOREIGN KEY(facultyID) REFERENCES Faculty(facultyID),
    FOREIGN KEY(roomID) REFERENCES Room(roomID),
    FOREIGN KEY(semesterYearID) REFERENCES SemesterYear(semesterYearID)  
);



CREATE TABLE Enrollment(
    CRN VARCHAR(10) NOT NULL,
    studentID INT NOT NULL,
    grade DOUBLE NOT NULL,
    enrollDate DATE NOT NULL,
    FOREIGN KEY(CRN) REFERENCES CourseSection(CRN),
    FOREIGN KEY(studentID) REFERENCES Student(studentID)
    
);
CREATE TABLE StudentHistory(
    studentHistoryID INT NOT NULL,
    CRN VARCHAR(10) NOT NULL,
    studentID INT NOT NULL,
    semesterYearID VARCHAR(25) NOT NULL,
    grade DOUBLE,
    FOREIGN KEY (CRN) REFERENCES Enrollment (CRN),
    FOREIGN KEY (studentID) REFERENCES Enrollment(studentID),
    FOREIGN KEY (semesterYearID) REFERENCES SemesterYear(semesterYearID)
);

CREATE TABLE FacultyHistory(
    facHistoryID INT NOT NULL,
    CRN VARCHAR(10) NOT NULL,
    facultyID INT NOT NULL,
    semesterYearID VARCHAR(25) NOT NULL,
    FOREIGN KEY (CRN) REFERENCES CourseSection (CRN),
    FOREIGN KEY (facultyID) REFERENCES CourseSection(facultyID),
    FOREIGN KEY (semesterYearID) REFERENCES SemesterYear(semesterYearID)
);

CREATE TABLE Attendence(
    attendenceID INT NOT NULL,
    CRN VARCHAR(10) NOT NULL,
    studentID INT NOT NULL,
    meetingDate DATE NOT NULL,
    presentOrAbsent BOOLEAN NOT NULL,
    PRIMARY KEY(attendenceID),
    FOREIGN KEY (CRN) REFERENCES Enrollment (CRN),
    FOREIGN KEY (studentID) REFERENCES Enrollment(studentID)
);


-- Is this correct
CREATE TABLE ClassList(
    classListID INT NOT NULL,
    CRN VARCHAR(10) NOT NULL,
    studentID INT NOT NULL,
    PRIMARY KEY (classListID),
    FOREIGN KEY (CRN) REFERENCES Enrollment (CRN),
    FOREIGN KEY (studentID) REFERENCES Enrollment(studentID)
);