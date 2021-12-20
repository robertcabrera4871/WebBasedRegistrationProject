import Axios from 'axios';

    export default class dbUtil {
        
     static async login(email, password) {
          const loginResponse = await Axios.post("https://web-registration-app.herokuapp.com/login", {
            email: email,
            password: password
          })
          return loginResponse.data
      }
      
      static async userExists(email){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/emailExist",{
          params: {
            email: email
          }
        })
        return response.data
      }


      static async AddDepartment(dep){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/AddDepartment",{
          params:{
            departmentID: dep.departmentID,
            roomID: dep.roomID,
            dEmail: dep.dEmail,
            dPhone: dep.dPhone,
            dChair: dep.dChair,
            dManager: dep.dManager
          }
        })
        return response.data;
      }

      static async newDepAssign(newRow){
        const response = await Axios.put("https://web-registration-app.herokuapp.com/newDepAssign",{
          params: {
            newRow: newRow
          }
        })
        return response.data
      }

      static async deleteDepAppt(row){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/deleteDepAppt",{
          params: {
            row: row
          }
        })
        return response.data
      }


      
      static async getFacultyDepartment(departmentID){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/getFacultyDepartment",{
          params:{
            departmentID: departmentID,
          }
        })
        return response.data;
      }

      static async getFacultyHistory(facultyID){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/getFacultyHistory",{
          params:{
            facultyID: facultyID,
          }
        })
        return response.data;
      }

      static async addFacHistory(newRow){
        const response = await Axios.put("https://web-registration-app.herokuapp.com/addFacHistory",{
          params:{
            newRow: newRow,
          }
        })
        return response.data;
      }
      static async deleteFacHistory(CRN){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/deleteFacHistory",{
          params:{
            CRN: CRN,
          }
        })
        return response.data;
      }



      static async editRoom(room, oldid){
        const response = await Axios.post('https://web-registration-app.herokuapp.com/editRoom', {
          params:{
            roomID: room.roomID,
            buildingID: room.buildingID,
            roomType: room.roomType,
            oldid: oldid
          }
        })
        return response.data
      }

      static async deleteDepartment(depoID){
        const response = await Axios.put("https://web-registration-app.herokuapp.com/deleteDepartment",{
          params: {
            departmentID: depoID
          }
        })
        return response;
      }
      static async editDepartment(newDepo, oldID){
        const response = await Axios.put("https://web-registration-app.herokuapp.com/editDepartment", {
          params: {
            departmentID: newDepo.departmentID,
            roomID: newDepo.roomID,
            dEmail: newDepo.dEmail,
            dPhone: newDepo.dPhone,
            dChair: newDepo.dChair,
            dManager: newDepo.dManager,
            oldID: oldID
          }
        })
        return response.data
      }

      static async editBuilding(newbuild, oldid){
        const response = await Axios.put("https://web-registration-app.herokuapp.com/editBuilding", {
          params: {
            buildingID: newbuild.buildingID,
            buildingUse: newbuild.buidingUse,
            oldid: oldid
          }
        })
        return response.data
      }

      static async getDepartments(){
        const response = await Axios.get("https://web-registration-app.herokuapp.com/getDepartments")
        return response.data
      }

      static async deleteRoom(row){
        const response = await Axios.put("https://web-registration-app.herokuapp.com/deleteRoom",{
          params:{
            roomID: row.roomID
          }
        })
        return response.data
      }

      static async editMS(row, oldCRN){
    
        const editResponse = await Axios.put("https://web-registration-app.herokuapp.com/editMS", {
          params: {
        OldCRN: oldCRN,
        CRN: row.CRN,
        timeSlotID: row.timeSlotID,
        facultyID: row.facultyID,
        roomID: row.roomID,
        semesterYearID: row.semesterYearID,
        courseID: row.courseID,
        availableSeats: row.availableSeats,
        capacity: row.capacity,
        sectionNum: row.sectionNum,
        availableSeats: row.availableSeats,
        capacity: row.capacity
          }
        })
        return editResponse.data
      }
      static async addMS(row){
        const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/addMS", {
          params:{
         CRN: row.CRN,
         timeSlotID: row.timeSlotID,
         facultyID: row.facultyID,
         roomID: row.roomID,
         semesterYearID: row.semesterYearID,
         courseID: row.courseID,
         availableSeats: row.availableSeats,
         capacity: row.capacity,
         sectionNum: row.sectionNum,
         availableSeats: row.availableSeats,
         capacity: row.capacity
          }
        })
        return addResponse.data
      }
      static async generateAttendance(CRN, studentID, meetingDate){
        const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/generateAttendance", {
          params:{
           CRN: CRN,
           studentID: studentID,
           meetingDate: meetingDate
          }
        })
        return addResponse.data
      }

      static async getSemesterFromCRN(CRN){
        const addResponse = await Axios.post("https://web-registration-app.herokuapp.com/getSemesterFromCRN", {
          params:{
           CRN: CRN
          }
        })
        return addResponse.data
      }

      static async checkSemesterYear(row){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/checkSemesterYear", {
          params: {
            semesterYearID: row.semesterYearID
          }
        })
        return response.data
      }

      static async checkSemID(semesterID, CRN){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/checkSemID", {
          params: {
            semesterID: semesterID,
            CRN: CRN
          }
        })
        return response.data
      }

      static async checkCRNsemester(row){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/checkCRNsemester", {
          params: {
            row: row
          }
        })
        return response.data
      }
    static async unenrollAll(row){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/unenrollAll", {
        params: {
          CRN: row.CRN
        }
      })
      return response.data
    }
    static async checkEnrollment(studentID, CRN){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/checkEnrollment", {
        params: {
          studentID: studentID,
          CRN: CRN
        }
      })
      return response.data
    }
    static async checkAnyEnrollment(CRN){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/checkAnyEnrollment", {
        params: {
          CRN: CRN
        }
      })
      return response.data
    }
    static async updateEnroll(row, oldCRN){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/updateEnroll", {
        params: {
          OldCRN : oldCRN,
          CRN: row.CRN
        }
      })
      return response.data
    }

    
    static async editCourse(row, oldCourseID){
      const editResponse = await Axios.put("https://web-registration-app.herokuapp.com/editCourse", {
        params:{
          oldCourseID: oldCourseID,
          courseID: row.courseID,
          departmentID: row.departmentID,
          credits: row.numOfCredits
        }
      })
      return editResponse.data
    }

    static async checkAvailability(row){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/checkAvailability", {
        params : {
          timeSlotID: row.timeSlotID,
          roomID: row.roomID
        }
      })
      return response.data
    }

    static async checkAvailableSeats(CRN){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/checkAvailableSeats", {
        params : {
          CRN: CRN
        }
      })
      return response.data
    }
    static async minusAvailableSeats(CRN){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/minusAvailableSeats", {
        params : {
          CRN: CRN
        }
      })
      return response.data
    }
    static async plusAvailableSeats(CRN){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/minusAvailableSeats", {
        params : {
          CRN: CRN
        }
      })
      return response.data
    }

    static async addRoom(room){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/addRoom",{
        params: {
          roomID: room.roomID,
          buildingID: room.buildingID,
          roomType: room.roomType
        }
      })
      return response.data
    }

    static async checkRoomOfType(roomType){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/checkRoomOfType", {
        params: {
          roomType: roomType
        }
      })
      return response.data;
    }

    static async addRoomOfType(room){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/addRoomOfType",{
        params: {
          roomID: room.roomID,
          capacity: room.capacity,
          roomType: room.roomType
        }
      })
      return response.data
    }

    static async addBuilding(building){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/addBuilding", {
      params: {
        buildingID: building.buildingID,
        buildingUse: building.buildingUse
      }
    })
    return response.data
    }

    static async deleteBuilding(row){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/deleteBuilding",{
        params: {
          buildingID: row.buildingID
        }
      })
      return response.data
    }

    
     
    static async addMajor(newMajor){
      const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/addMajor",{
        params :{
          majorID: newMajor.majorID,
          departmentID: newMajor.departmentID,
          creditsRequired: newMajor.creditsRequired
        }
      })
      return addResponse.data
    }

    static async addMinor(newMinor){
      const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/addMinor",{
        params :{
          minorID: newMinor.minorID,
          departmentID: newMinor.departmentID,
          creditsRequired: newMinor.creditsRequired
        }
      })
      return addResponse.data
    }

    static async addMajReq(newReq, majorID){
      const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/addMajReq",{
        params :{
          newReq: newReq,
          majorID: majorID
        }
      })
      return addResponse.data
    }

    
    static async addMinReq(newReq, minorID){
      const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/addMinReq",{
        params :{
          newReq: newReq,
          minorID: minorID
        }
      })
      return addResponse.data
    }



    static async getRooms(){
      const response = await Axios.get("https://web-registration-app.herokuapp.com/getRooms")
      return response.data
    }

    static async getAttendence(CRN){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/getAttendence", {
        params:{
          CRN: CRN
        }
      })
      return response.data
    }
    static async switchAttendence(userID, meetingDate, presence){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/switchAttendence", {
        params:{
          userID: userID,
          meetingDate: meetingDate,
          presence: presence
        }
      })
      return response.data
    }

    static async createAttendence(CRN, studentID, date){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/createAttendence", {
        params:{
          CRN: CRN,
          studentID: studentID,
          date: date
        }
      })
      return response.data
    }

    static async assignGrade(studentID, grade){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/assignGrade", {
        params:{
          studentID: studentID,
          grade: grade
        }
      })
      return response.data
    }

    static async deleteAttendence(date){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/deleteAttendence", {
        params:{
          date: date
        }
      })
      return response.data
    }

    static async deleteAttendenceByID(userID){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/deleteAttendenceByID", {
        params:{
          userID: userID
        }
      })
      return response.data
    }
    

    static async getBuildings(){
      const response = await Axios.get("https://web-registration-app.herokuapp.com/getBuildings")
      return response.data
    }

    
    static async getMasterSchedule(){
      const mSchedResponse = await Axios.get("https://web-registration-app.herokuapp.com/masterSchedule")
      return mSchedResponse.data
  }
  static async getFallCal(){
    const mSchedResponse = await Axios.get("https://web-registration-app.herokuapp.com/getFallCal")
    return mSchedResponse.data
}
static async getSpringCal(){
  const mSchedResponse = await Axios.get("https://web-registration-app.herokuapp.com/getSpringCal")
  return mSchedResponse.data
}

  static async getClassList(crn){
    const res = await Axios.post("https://web-registration-app.herokuapp.com/getClassList", {
      params:{
        CRN: crn
      }
    })
    return res.data
}

    static async addCourse(newCourse){
      const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/addCourse", {
        params: {
          courseID: newCourse.courseName,
          departmentID: newCourse.departmentID,
          credits: newCourse.credits,
        }
      })
      return addResponse.data
    }

    static async addPreReq(newCourse){
      const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/addPreReq", {
        params: {
          newCourse: newCourse
        }
      })
      return addResponse.data
    }

    static async checkReveseReq(newCourse){
      const addResponse = await Axios.post("https://web-registration-app.herokuapp.com/checkReveseReq", {
        params: {
          newCourse: newCourse
        }
      })
      return addResponse.data
    }
    

      static async deleteMS(row){
        const deleteResponse = await Axios.put("https://web-registration-app.herokuapp.com/deleteMS", {
          params: {
            CRN: row.CRN
          }
        })
        return deleteResponse.data
      } 

      static async deleteUser(userID){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/deleteUser" , {
          params: {
            userID: userID
          }
        })
        return response.data
      }

      static async deleteCourse(row){
        console.log(row.courseID)
        const deleteResponse = await Axios.put("https://web-registration-app.herokuapp.com/deleteCourse", {
          params: {
            courseID: row.courseID
          }
        })
        return deleteResponse.data
      }
      
       static async resetPassword(email) {
        const resetResponse = await Axios.put("https://web-registration-app.herokuapp.com/resetPassword", {
          params: {
            email: email
          }
        })
        return resetResponse.data
      }
      
       static async unlockAccount(email, newPass) {
        const unlockResponse = await Axios.put("https://web-registration-app.herokuapp.com/updateAndUnlock", {
          params: {
            email: email,
            newPass: newPass
          }
        })
        return unlockResponse.data
      }
      static async getMyAdvisors(userID){
        const myAdvisorsResponse = await Axios.post("https://web-registration-app.herokuapp.com/myAdvisors", {
          params: {
            userID: userID
          }
        })
        return myAdvisorsResponse.data
      }

      static async addAdvising(newRow){
        const myAdvisorsResponse = await Axios.put("https://web-registration-app.herokuapp.com/addAdvising", {
          params: {
            newRow: newRow
          }
        })
        return myAdvisorsResponse.data
      }

      static async deleteAdvising(facultyID, studentID){
        const myAdvisorsResponse = await Axios.post("https://web-registration-app.herokuapp.com/deleteAdvising", {
          params: {
            facultyID: facultyID,
            studentID: studentID
          }
        })
        return myAdvisorsResponse.data
      }

      static async getMyAdvisees(userID){
        const myAdvisorsResponse = await Axios.post("https://web-registration-app.herokuapp.com/myAdvisees", {
          params: {
            userID: userID
          }
        })
        return myAdvisorsResponse.data
      }

      static async getUserSched(userID){
        const userSchedResponse = await Axios.post("https://web-registration-app.herokuapp.com/getUserSched", {
          params: {
            userID: userID
          }
        })
        return userSchedResponse.data
      }
      static async getStudentHistory(userID){
        const userSchedResponse = await Axios.post("https://web-registration-app.herokuapp.com/getStudentHistory", {
          params: {
            userID: userID
          }
        })
        return userSchedResponse.data
      }

      static async getCoursesTeaching(userID){
        const userSchedResponse = await Axios.post("https://web-registration-app.herokuapp.com/getCoursesTeaching", {
          params: {
            userID: userID
          }
        })
        return userSchedResponse.data
      }
      static async checkStudentHistory(userID, CRN){
        const userSchedResponse = await Axios.post("https://web-registration-app.herokuapp.com/checkStudentHistory", {
          params: {
            userID: userID,
            CRN: CRN
          }
        })
        return userSchedResponse.data
      }

      static async checkDoubleCourse(courseID, userID){
        const userSchedResponse = await Axios.post("https://web-registration-app.herokuapp.com/checkDoubleCourse", {
          params: {
            userID: userID,
            courseID: courseID
          }
        })
        return userSchedResponse.data
      }

      static async checkPreReq(courseID, userID){
        const userSchedResponse = await Axios.post("https://web-registration-app.herokuapp.com/checkPreReq", {
          params: {
            userID: userID,
            courseID: courseID
          }
        })
        return userSchedResponse.data
      }

      static async addStudentHistory(newRow){
        const userSchedResponse = await Axios.post("https://web-registration-app.herokuapp.com/addStudentHistory", {
          params: {
            newRow: newRow
          }
        })
        return userSchedResponse.data
      }

      static async addMyClass(CRN, userID){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/addMyClass", {
          params: {
            CRN: CRN,
            userID: userID
          }
        })
        return response.data;
      }
      static async creditCheck(studentID){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/creditCheck", {
          params: {
            studentID: studentID
          }
        })
        return response.data;
      }
      static async courseMinMaxCheck(userID){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/courseMinMaxCheck", {
          params: {
            userID: userID
          }
        })
        return response.data;
      }
      static async getCreditsTaking(studentID){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/getCreditsTaking", {
          params: {
            studentID: studentID
          }
        })
        return response.data;
      }
      static async addTeachClass(CRN, userID){
        const response = await Axios.post("https://web-registration-app.herokuapp.com/addTeachClass", {
          params: {
            CRN: CRN,
            userID: userID
          }
        })
        return response.data;
      }

      static async getMyMajors(userID){
        const myMajorsResponse = await Axios.post("https://web-registration-app.herokuapp.com/myMajors", {
        params: {
          userID: userID
        }
      })
        return myMajorsResponse.data
      }
      static async getMyMinors(userID){
        const myMinorsResponse = await Axios.post("https://web-registration-app.herokuapp.com/myMinors", {
          params: {
            userID: userID
          }
        })
        return myMinorsResponse.data
      }


      static async getAllUsers(){
        const userResponse = await Axios.get("https://web-registration-app.herokuapp.com/allUsers")
        return userResponse.data
      }
      static async getUser(userID){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/getUser", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }

      static async updateUser(newRow){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/updateUser", {
          params: {
            newRow: newRow
          }
        })
        return userResponse.data
      }
      static async updateLogin(newRow){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/updateLogin", {
          params: {
            newRow: newRow
          }
        })
        console.log(userResponse)
        return userResponse.data
      }

      static async getStudent(userID){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/getStudent", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }

      static async getGrad(userID){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/getGrad", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }

      static async getFacRank(userID){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/getFacRank", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }
      static async updateFullPartFac(newRow){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/updateFullPartFac", {
          params: {
            userID: newRow.userID,
            fullpart: newRow.rank,
            minCourse: newRow.minCourse,
            maxCourse: newRow.maxCourse
          }
        })
        return userResponse.data
      }

      static async updateResearch(newRow){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/updateResearch", {
          params: {
           newRow: newRow
          }
        })
        return userResponse.data
      }

      static async updateStudent(newRow){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/updateStudent", {
          params: {
           newRow: newRow
          }
        })
        return userResponse.data
      }
      static async updateUndergrad(newRow){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/updateUndergrad", {
          params: {
           newRow: newRow
          }
        })
        return userResponse.data
      }
      static async updateGrad(newRow){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/updateGrad", {
          params: {
           newRow: newRow
          }
        })
        return userResponse.data
      }
      static async getMinMaxFac(newRow, facRank){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/getMinMax", {
          params: {
            userID: newRow.userID,
            fullpart: facRank
          }
        })
        return userResponse.data
      }
      
      static async getLoginInfo(userID){
        const userResponse = await Axios.post("https://web-registration-app.herokuapp.com/getLoginInfo", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }
      



      static async getMajors(){
        const majorsResponse = await Axios.get("https://web-registration-app.herokuapp.com/majors")
        return majorsResponse.data      
      }
      static async getMajorRequirements(){
        const majorRequireResponse = await Axios.get("https://web-registration-app.herokuapp.com/majorRequirements")
        return majorRequireResponse.data      
      }

      static async myMajorRequirements(userID, majorID){
        const majorsResponse = await Axios.post("https://web-registration-app.herokuapp.com/myMajorRequirements",{
          params: {
            userID: userID,
            majorID:majorID
          }
        })
        return majorsResponse.data      
      }
      static async myMinorRequirements(userID, minorID){
        const majorRequireResponse = await Axios.post("https://web-registration-app.herokuapp.com/myMinorRequirements",{
          params: {
            userID: userID,
            minorID: minorID
          }
        })
        return majorRequireResponse.data      
      }

      static async editCalDesc(title, description, semester){
        const majorRequireResponse = await Axios.post("https://web-registration-app.herokuapp.com/editCalDesc",{
          params: {
            title: title,
            description: description,
            semester: semester
          }
        })
        return majorRequireResponse.data      
      }
      static async updateCalDate(title, date, semester){
        const majorRequireResponse = await Axios.post("https://web-registration-app.herokuapp.com/updateCalDate",{
          params: {
            title: title,
            date: date,
            semester: semester
          }
        })
        return majorRequireResponse.data      
      }
      static async deleteCalEvent(title, semester){
        const res = await Axios.post("https://web-registration-app.herokuapp.com/deleteCalEvent",{
          params: {
            title: title,
            semester: semester
          }
        })
        return res.data      
      }


      static async deleteMajorReq(majorID, courseID){
        const majorRequireResponse = await Axios.post("https://web-registration-app.herokuapp.com/deleteMajorReq",
        {
          params:{
            majorID: majorID,
            courseID: courseID
          }
        })
        return majorRequireResponse.data      
      }
      static async deleteMinorReq(minorID, courseID){
        const majorRequireResponse = await Axios.post("https://web-registration-app.herokuapp.com/deleteMinorReq",{
          params:{
            minorID: minorID,
            courseID: courseID
          }
        })
        return majorRequireResponse.data      
      }
      static async deleteMajor(majorID){
        const majorRequireResponse = await Axios.post("https://web-registration-app.herokuapp.com/deleteMajor",{
          params:{
            majorID: majorID,
          }
        })
        return majorRequireResponse.data      
      }
      static async deleteMinor(minorID){
        const majorRequireResponse = await Axios.post("https://web-registration-app.herokuapp.com/deleteMinor",{
          params:{
            minorID: minorID,
          }
        })
        return majorRequireResponse.data      
      }
      static async getMinors(){
        const minorsResponse = await Axios.get("https://web-registration-app.herokuapp.com/minors")
        return minorsResponse.data
      }
      static async getMinorRequirements(){
        const minorRequireResponse = await Axios.get("https://web-registration-app.herokuapp.com/minorRequirements")
        return minorRequireResponse.data      
      }
      static async getCourses(){
        const courseResponse = await Axios.get("https://web-registration-app.herokuapp.com/courses")
        return courseResponse.data
      }

         static async getPrereqs(){
        const courseResponse = await Axios.get("https://web-registration-app.herokuapp.com/getPrereqs")
        return courseResponse.data
      }

      static async getPrereqByID(courseID){
        const courseResponse = await Axios.post("https://web-registration-app.herokuapp.com/getPrereqByID",{
          params:{
            courseID: courseID
          }
        })
        return courseResponse.data
      }

      static async deletePrereq(courseID){
        const courseResponse = await Axios.post("https://web-registration-app.herokuapp.com/deletePrereq",{
          params:{
            courseID: courseID
          }
        })
        return courseResponse.data
      }
      static async getHolds(userID){
        const holdResponse = await Axios.post("https://web-registration-app.herokuapp.com/getHolds", {
        params: {
          userID: userID
        }
      })
        return holdResponse.data
    }
    static async dropHold(holdID, userID){
      const holdResponse = await Axios.post("https://web-registration-app.herokuapp.com/dropHold", {
      params: {
        holdID: holdID,
        userID: userID
      }
    })
      return holdResponse.data
  }
    static async assignHold(holdID, userID){
      const holdResponse = await Axios.post("https://web-registration-app.herokuapp.com/assignHold", {
      params: {
        userID: userID,
        holdID: holdID
      }
    })
      return holdResponse.data
  }

    static async createFullUndergrad(student){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createFullUndergrad",{
        params: {
          studentID: student.userID,
          minCredit: student.minCredit,
          maxCredit: student.maxCredit
        }        
      })
      return response.data
    }

    static async createFaculty(fac){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createFaculty",{
        params: {
          userID: fac.userID,
          rank: fac.rank
        }        
      })
      return response.data
    }

    static async createPartUndergrad(student){
      console.log(student)
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createPartUndergrad",{
        params: {
          studentID: student.userID,
          minCredit: student.minCredit,
          maxCredit: student.maxCredit
        }        
      })
      return response.data
    }
    static async createPartGrad(student){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createPartGrad",{
        params: {
          studentID: student.userID,
          minCredit: student.minCredit,
          maxCredit: student.maxCredit
        }        
      })
      return response.data
    }
    static async createFullGrad(student){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createFullGrad",{
        params: {
          studentID: student.userID,
          minCredit: student.minCredit,
          maxCredit: student.maxCredit
        }        
      })
      return response.data
    }
    static async createFullPartFac(fac, fullPart){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createFullPartFac",{
        params: {
          facultyID: fac.userID,
          minCourse: fac.minCourse,
          maxCourse: fac.maxCourse,
          fullPart: fullPart
        }        
      })
      return response.data
    }



    static async createGrad(user){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createGrad",{
        params: {
          studentID: user.userID,
          program: user.program,
          yearIn: user.yearIn,
          qualifyingExam: user.qualifyingExam,
          thesisTitle: user.thesisTitle
        }
      })
      return response.data
    }

    static async createUndergrad(user){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createUndergrad",{
        params: {
          studentID: user.userID,
          yearLevel: user.yearLevel
        }
      })
      return response.data
    }

    static async createStudent(user){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createStudent", {
        params: {
          studentID: user.userID,
          creditsEarned: user.creditsEarned,
          yearLevel: user.yearLevel,
          studentType: user.studentType,
          yearOfEntrance: user.yearOfEntrance,
        }
      })
      return response.data
    }


    static async createLogin(user){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createLogin", {
        params: {
          userID: user.userID,
          email: user.email,
          password: user.password,
          userType: user.userType,
          status: user.status
        }
      })
      return response.data
    }

    static async createAdmin(user){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createAdmin" , {
        params: {
          userID: user.userID,
          status: user.status
        }
      })
      return response.data
    }
    static async createResearch(user){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createResearch" , {
        params: {
          userID: user.userID,
          status: user.status
        }
      })
      return response.data
    }
    
    
    static async createUser(user){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/createUser", {
        params: {
          userID: user.userID,
          firstName: user.firstName,
          lastName: user.lastName,
          DOB: user.DOB,
          city: user.city,
          state: user.state,
          zipCode: user.zipCode,
          address: user.address,
          userType: user.studentType
        }
      })
      return response.data
    }

    static async addUserOfType(user){
      const response = await Axios.put("https://web-registration-app.herokuapp.com/addUserOfType",{
      params: {
        userType: user.userType,
        userID: user.userID,
      }
      })
      return response.data
    }

    static async getGradCourses(){
      const gradResponse = await Axios.get("https://web-registration-app.herokuapp.com/getGradCourses")
      return gradResponse.data
    }
    static async getUndergradCourses(){
      const gradResponse = await Axios.get("https://web-registration-app.herokuapp.com/getUndergradCourses")
      return gradResponse.data
    }
     
     

    static async dropMyMajor(majorID, userID){
      const dropResponse = await Axios.put("https://web-registration-app.herokuapp.com/dropMyMajor", {
        params: {
          majorID: majorID,
          userID: userID
        }
      })
      return dropResponse.data
    }

    static async dropMyMinor(minorID, userID){
      const dropResponse = await Axios.put("https://web-registration-app.herokuapp.com/dropMyMinor", {
        params: {
          minorID: minorID,
          userID: userID
        }
      })
      return dropResponse.data
    }

    static async dropMyClass(CRN, userID){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/dropMyClass",{
        params: {
          CRN: CRN,
          userID: userID
        }
      })
      return response.data
    }

    
    static async changeNumOfCredits(courseID, numOfCredits){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/changeNumOfCredits",{
        params: {
          courseID: courseID,
          numOfCredits: numOfCredits
        }
      })
      return response.data
    }


  
    static async dropAllClasses(userID){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/dropAllClasses",{
        params: {
          userID: userID
        }
      })
      return response.data
    }
    static async deleteAllStudentHistory(userID){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/deleteAllStudentHistory",{
        params: {
          userID: userID
        }
      })
      return response.data
    }

    static async deleteStudentHistory(CRN, userID){
      const response = await Axios.post("https://web-registration-app.herokuapp.com/deleteStudentHistory",{
        params: {
          userID: userID,
          CRN: CRN
        }
      })
      return response.data
    }




    static async declareMyMajor(majorID, userID){
      const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/declareMyMajor" ,{
        params: {
          majorID: majorID,
          userID: userID
        }
      })
      return addResponse.data
    }
    static async declareMyMinor(minorID, userID){
      const addResponse = await Axios.put("https://web-registration-app.herokuapp.com/declareMyMinor" ,{
        params: {
          minorID: minorID,
          userID: userID
        }
      })
      return addResponse.data
    }
    static async getFacultyID(firstName, lastName){
      const getResponse = await Axios.post("https://web-registration-app.herokuapp.com/getFacultyID",{
        params: {
          firstName: firstName,
          lastName: lastName
        }
      })
      return getResponse.data
    }
    static async getFacRank(userID){
      const getResponse = await Axios.post("https://web-registration-app.herokuapp.com/getFacRank",{
        params: {
          userID: userID
        }
      })
      return getResponse.data
    }

    static async getTimeSlotID(startTime, endTime, day){
      const getResponse = await Axios.post("https://web-registration-app.herokuapp.com/getTimeSlotID",{
        params: {
          startTime: startTime,
          endTime: endTime,
          day: day
        }
      })
      return getResponse.data
    }

    static async getStudentsEnrolled(){
      const getResponse = await Axios.get("https://web-registration-app.herokuapp.com/getStudentsEnrolled")
      return getResponse.data
    }

    static async getUndergradStudents(){
      const getResponse = await Axios.get("https://web-registration-app.herokuapp.com/getUndergradStudents")
      return getResponse.data
    }
    static async getGradStudents(){
      const getResponse = await Axios.get("https://web-registration-app.herokuapp.com/getGradStudents")
      return getResponse.data
    }
    static async getGrades(){
      const getResponse = await Axios.get("https://web-registration-app.herokuapp.com/getGrades")
      return getResponse.data
    }

    static async getCourseAmount(){
      const getResponse = await Axios.get("https://web-registration-app.herokuapp.com/getCourseAmount")
      return getResponse.data
    }

    


 
     
      
    }