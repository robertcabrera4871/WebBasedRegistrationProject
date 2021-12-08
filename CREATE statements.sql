SET @fSearch = ("SELECT firstName, lastName FROM USER WHERE userID = '17181920'");
PREPARE stmt FROM @fSearch;
EXECUTE stmt;

