import Axios from 'axios';

    export default class dbUtil {
        
     static async login(email, password) {
          const loginResponse = await Axios.post("http://localhost:8000/login", {
            email: email,
            password: password
          })
          return loginResponse.data
      }
      
      static async userExists(email){
        const response = await Axios.post("/emailExist",{
          params: {
            email: email
          }
        })
        console.log(response)
        return response.data
      }

      static async AddDepartment(dep){
        const response = await Axios.post("http://localhost:8000/AddDepartment",{
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

      static async editRoom(room, oldid){
        const response = await Axios.post('http://localhost:8000/editRoom', {
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
        const response = await Axios.put("http://localhost:8000/deleteDepartment",{
          params: {
            departmentID: depoID
          }
        })
        return response;
      }
      static async editDepartment(newDepo, oldID){
        const response = await Axios.put("http://localhost:8000/editDepartment", {
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
        const response = await Axios.put("http://localhost:8000/editBuilding", {
          params: {
            buildingID: newbuild.buildingID,
            buildingUse: newbuild.buidingUse,
            oldid: oldid
          }
        })
        return response.data
      }

      static async getDepartments(){
        const response = await Axios.get("http://localhost:8000/getDepartments")
        return response.data
      }

      static async deleteRoom(row){
        const response = await Axios.put("http://localhost:8000/deleteRoom",{
          params:{
            roomID: row.roomID
          }
        })
        return response.data
      }

      static async editMS(row, oldCRN){
    
        const editResponse = await Axios.put("http://localhost:8000/editMS", {
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
        const addResponse = await Axios.put("http://localhost:8000/addMS", {
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

      static async checkSemesterYear(row){
        const response = await Axios.post("http://localhost:8000/checkSemesterYear", {
          params: {
            semesterYearID: row.semesterYearID
          }
        })
        return response.data
      }
    static async unenrollAll(row){
      const response = await Axios.put("http://localhost:8000/unenrollAll", {
        params: {
          CRN: row.CRN
        }
      })
      return response.data
    }
    static async updateEnroll(row, oldCRN){
      const response = await Axios.put("http://localhost:8000/updateEnroll", {
        params: {
          OldCRN : oldCRN,
          CRN: row.CRN
        }
      })
      return response.data
    }

    
    static async editCourse(row, oldCourseID){
      const editResponse = await Axios.put("http://localhost:8000/editCourse", {
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
      const response = await Axios.post("http://localhost:8000/checkAvailability", {
        params : {
          timeSlotID: row.timeSlotID,
          roomID: row.roomID
        }
      })
      return response.data
    }

    static async addRoom(room){
      const response = await Axios.put("http://localhost:8000/addRoom",{
        params: {
          roomID: room.roomID,
          buildingID: room.buildingID,
          roomType: room.roomType
        }
      })
      return response.data
    }

    static async checkRoomOfType(roomType){
      const response = await Axios.post("http://localhost:8000/checkRoomOfType", {
        params: {
          roomType: roomType
        }
      })
      return response.data;
    }

    static async addRoomOfType(room){
      const response = await Axios.put("http://localhost:8000/addRoomOfType",{
        params: {
          roomID: room.roomID,
          capacity: room.capacity,
          roomType: room.roomType
        }
      })
      return response.data
    }

    static async addBuilding(building){
      const response = await Axios.put("http://localhost:8000/addBuilding", {
      params: {
        buildingID: building.buildingID,
        buildingUse: building.buildingUse
      }
    })
    return response.data
    }

    static async deleteBuilding(row){
      const response = await Axios.put("http://localhost:8000/deleteBuilding",{
        params: {
          buildingID: row.buildingID
        }
      })
      return response.data
    }

    
     
    static async addMajor(newMajor){
      const addResponse = await Axios.put("http://localhost:8000/addMajor",{
        params :{
          majorID: newMajor.majorID,
          departmentID: newMajor.departmentID,
          creditsRequired: newMajor.creditsRequired
        }
      })
      return addResponse.data
    }

    static async addMinor(newMinor){
      const addResponse = await Axios.put("http://localhost:8000/addMinor",{
        params :{
          minorID: newMinor.minorID,
          departmentID: newMinor.departmentID,
          creditsRequired: newMinor.creditsRequired
        }
      })
      return addResponse.data
    }

    static async addMajReq(newReq, majorID){
      const addResponse = await Axios.put("http://localhost:8000/addMajReq",{
        params :{
          newReq: newReq,
          majorID: majorID
        }
      })
      return addResponse.data
    }

    
    static async addMinReq(newReq, minorID){
      const addResponse = await Axios.put("http://localhost:8000/addMinReq",{
        params :{
          newReq: newReq,
          minorID: minorID
        }
      })
      return addResponse.data
    }



    static async getRooms(){
      const response = await Axios.get("http://localhost:8000/getRooms")
      return response.data
    }

    static async getAttendence(CRN){
      const response = await Axios.post("http://localhost:8000/getAttendence", {
        params:{
          CRN: CRN
        }
      })
      return response.data
    }

    static async createAttendence(CRN, studentID, date){
      const response = await Axios.post("http://localhost:8000/createAttendence", {
        params:{
          CRN: CRN,
          studentID: studentID,
          date: date
        }
      })
      return response.data
    }

    static async assignGrade(studentID, grade){
      const response = await Axios.post("http://localhost:8000/assignGrade", {
        params:{
          studentID: studentID,
          grade: grade
        }
      })
      return response.data
    }

    static async deleteAttendence(date){
      const response = await Axios.post("http://localhost:8000/deleteAttendence", {
        params:{
          date: date
        }
      })
      return response.data
    }

    static async deleteAttendenceByID(userID){
      const response = await Axios.post("http://localhost:8000/deleteAttendenceByID", {
        params:{
          userID: userID
        }
      })
      return response.data
    }



    

    static async getBuildings(){
      const response = await Axios.get("http://localhost:8000/getBuildings")
      return response.data
    }

    
    static async getMasterSchedule(){
      const mSchedResponse = await Axios.get("http://localhost:8000/masterSchedule")
      return mSchedResponse.data
  }

  static async getClassList(crn){
    const res = await Axios.post("http://localhost:8000/getClassList", {
      params:{
        CRN: crn
      }
    })
    return res.data
}

    static async addCourse(newCourse){
      const addResponse = await Axios.put("http://localhost:8000/addCourse", {
        params: {
          courseID: newCourse.courseName,
          departmentID: newCourse.departmentID,
          credits: newCourse.credits,
        }
      })
      return addResponse.data
    }

      static async deleteMS(row){
        const deleteResponse = await Axios.put("http://localhost:8000/deleteMS", {
          params: {
            CRN: row.CRN
          }
        })
        return deleteResponse.data
      } 

      static async deleteUser(userID){
        const response = await Axios.post("http://localhost:8000/deleteUser" , {
          params: {
            userID: userID
          }
        })
        return response.data
      }

      static async deleteCourse(row){
        console.log(row.courseID)
        const deleteResponse = await Axios.put("http://localhost:8000/deleteCourse", {
          params: {
            courseID: row.courseID
          }
        })
        return deleteResponse.data
      }
      
       static async resetPassword(email) {
        const resetResponse = await Axios.put("http://localhost:8000/resetPassword", {
          params: {
            email: email
          }
        })
        console.log(resetResponse)
        return resetResponse.data
      }
      
       static async unlockAccount(email, newPass) {
        const unlockResponse = await Axios.put("http://localhost:8000/updateAndUnlock", {
          params: {
            email: email,
            newPass: newPass
          }
        })
        return unlockResponse.data
      }
      static async getMyAdvisors(userID){
        const myAdvisorsResponse = await Axios.post("http://localhost:8000/myAdvisors", {
          params: {
            userID: userID
          }
        })
        return myAdvisorsResponse.data
      }

      static async addAdvising(newRow){
        const myAdvisorsResponse = await Axios.put("http://localhost:8000/addAdvising", {
          params: {
            newRow: newRow
          }
        })
        return myAdvisorsResponse.data
      }

      static async deleteAdvising(facultyID, studentID){
        const myAdvisorsResponse = await Axios.post("http://localhost:8000/deleteAdvising", {
          params: {
            facultyID: facultyID,
            studentID: studentID
          }
        })
        return myAdvisorsResponse.data
      }

      static async getMyAdvisees(userID){
        const myAdvisorsResponse = await Axios.post("http://localhost:8000/myAdvisees", {
          params: {
            userID: userID
          }
        })
        return myAdvisorsResponse.data
      }

      static async getUserSched(userID){
        const userSchedResponse = await Axios.post("http://localhost:8000/getUserSched", {
          params: {
            userID: userID
          }
        })
        return userSchedResponse.data
      }

      static async addMyClass(CRN, userID){
        const response = await Axios.post("http://localhost:8000/addMyClass", {
          params: {
            CRN: CRN,
            userID: userID
          }
        })
        return response.data;
      }

      static async getMyMajors(userID){
        const myMajorsResponse = await Axios.post("http://localhost:8000/myMajors", {
        params: {
          userID: userID
        }
      })
        return myMajorsResponse.data
      }
      static async getMyMinors(userID){
        const myMinorsResponse = await Axios.post("http://localhost:8000/myMinors", {
          params: {
            userID: userID
          }
        })
        return myMinorsResponse.data
      }


      static async getAllUsers(){
        const userResponse = await Axios.get("http://localhost:8000/allUsers")
        return userResponse.data
      }
      static async getUser(userID){
        const userResponse = await Axios.post("http://localhost:8000/getUser", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }

      static async updateUser(newRow){
        const userResponse = await Axios.post("http://localhost:8000/updateUser", {
          params: {
            newRow: newRow
          }
        })
        return userResponse.data
      }
      static async updateLogin(newRow){
        const userResponse = await Axios.post("http://localhost:8000/updateLogin", {
          params: {
            newRow: newRow
          }
        })
        return userResponse.data
      }

      static async getStudent(userID){
        const userResponse = await Axios.post("http://localhost:8000/getStudent", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }

      static async getGrad(userID){
        const userResponse = await Axios.post("http://localhost:8000/getGrad", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }

      static async getFacRank(userID){
        const userResponse = await Axios.post("http://localhost:8000/getFacRank", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }
      static async updateFullPartFac(newRow){
        const userResponse = await Axios.post("http://localhost:8000/updateFullPartFac", {
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
        const userResponse = await Axios.post("http://localhost:8000/updateResearch", {
          params: {
           newRow: newRow
          }
        })
        return userResponse.data
      }

      static async updateStudent(newRow){
        const userResponse = await Axios.post("http://localhost:8000/updateStudent", {
          params: {
           newRow: newRow
          }
        })
        return userResponse.data
      }
      static async updateUndergrad(newRow){
        const userResponse = await Axios.post("http://localhost:8000/updateUndergrad", {
          params: {
           newRow: newRow
          }
        })
        return userResponse.data
      }
      static async updateGrad(newRow){
        const userResponse = await Axios.post("http://localhost:8000/updateGrad", {
          params: {
           newRow: newRow
          }
        })
        return userResponse.data
      }
      static async getMinMaxFac(newRow, facRank){
        const userResponse = await Axios.post("http://localhost:8000/getMinMax", {
          params: {
            userID: newRow.userID,
            fullpart: facRank
          }
        })
        return userResponse.data
      }
      
      static async getLoginInfo(userID){
        const userResponse = await Axios.post("http://localhost:8000/getLoginInfo", {
          params: {
            userID: userID
          }
        })
        return userResponse.data
      }
      



      static async getMajors(){
        const majorsResponse = await Axios.get("http://localhost:8000/majors")
        return majorsResponse.data      
      }
      static async getMajorRequirements(){
        const majorRequireResponse = await Axios.get("http://localhost:8000/majorRequirements")
        return majorRequireResponse.data      
      }

      static async deleteMajorReq(majorID, courseID){
        const majorRequireResponse = await Axios.post("http://localhost:8000/deleteMajorReq",
        {
          params:{
            majorID: majorID,
            courseID: courseID
          }
        })
        return majorRequireResponse.data      
      }
      static async deleteMinorReq(minorID, courseID){
        const majorRequireResponse = await Axios.post("http://localhost:8000/deleteMinorReq",{
          params:{
            minorID: minorID,
            courseID: courseID
          }
        })
        return majorRequireResponse.data      
      }
      static async deleteMajor(majorID){
        const majorRequireResponse = await Axios.post("http://localhost:8000/deleteMajor",{
          params:{
            majorID: majorID,
          }
        })
        return majorRequireResponse.data      
      }
      static async deleteMinor(minorID){
        const majorRequireResponse = await Axios.post("http://localhost:8000/deleteMinor",{
          params:{
            minorID: minorID,
          }
        })
        return majorRequireResponse.data      
      }
      static async getMinors(){
        const minorsResponse = await Axios.get("http://localhost:8000/minors")
        return minorsResponse.data
      }
      static async getMinorRequirements(){
        const minorRequireResponse = await Axios.get("http://localhost:8000/minorRequirements")
        return minorRequireResponse.data      
      }
      static async getCourses(){
        const courseResponse = await Axios.get("http://localhost:8000/courses")
        return courseResponse.data
      }
      static async getHolds(userID){
        const holdResponse = await Axios.post("http://localhost:8000/getHolds", {
        params: {
          userID: userID
        }
      })
        return holdResponse.data
    }
    static async dropHold(holdID, userID){
      const holdResponse = await Axios.post("http://localhost:8000/dropHold", {
      params: {
        holdID: holdID,
        userID: userID
      }
    })
      return holdResponse.data
  }
    static async assignHold(holdID, userID){
      const holdResponse = await Axios.post("http://localhost:8000/assignHold", {
      params: {
        userID: userID,
        holdID: holdID
      }
    })
      return holdResponse.data
  }

    static async createFullUndergrad(student){
      const response = await Axios.put("http://localhost:8000/createFullUndergrad",{
        params: {
          studentID: student.userID,
          minCredit: student.minCredit,
          maxCredit: student.maxCredit
        }        
      })
      return response.data
    }

    static async createFaculty(fac){
      const response = await Axios.put("http://localhost:8000/createFaculty",{
        params: {
          userID: fac.userID,
          rank: fac.rank
        }        
      })
      return response.data
    }

    static async createPartUndergrad(student){
      console.log(student)
      const response = await Axios.put("http://localhost:8000/createPartUndergrad",{
        params: {
          studentID: student.userID,
          minCredit: student.minCredit,
          maxCredit: student.maxCredit
        }        
      })
      return response.data
    }
    static async createPartGrad(student){
      const response = await Axios.put("http://localhost:8000/createPartGrad",{
        params: {
          studentID: student.userID,
          minCredit: student.minCredit,
          maxCredit: student.maxCredit
        }        
      })
      return response.data
    }
    static async createFullGrad(student){
      const response = await Axios.put("http://localhost:8000/createFullGrad",{
        params: {
          studentID: student.userID,
          minCredit: student.minCredit,
          maxCredit: student.maxCredit
        }        
      })
      return response.data
    }
    static async createFullPartFac(fac, fullPart){
      const response = await Axios.put("http://localhost:8000/createFullPartFac",{
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
      const response = await Axios.put("http://localhost:8000/createGrad",{
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
      const response = await Axios.put("http://localhost:8000/createUndergrad",{
        params: {
          studentID: user.userID,
          yearLevel: user.yearLevel
        }
      })
      return response.data
    }

    static async createStudent(user){
      const response = await Axios.put("http://localhost:8000/createStudent", {
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
      const response = await Axios.put("http://localhost:8000/createLogin", {
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
      const response = await Axios.put("http://localhost:8000/createAdmin" , {
        params: {
          userID: user.userID,
          status: user.status
        }
      })
      return response.data
    }
    static async createResearch(user){
      const response = await Axios.put("http://localhost:8000/createResearch" , {
        params: {
          userID: user.userID,
          status: user.status
        }
      })
      return response.data
    }
    
    
    static async createUser(user){
      const response = await Axios.put("http://localhost:8000/createUser", {
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
      const response = await Axios.put("http://localhost:8000/addUserOfType",{
      params: {
        userType: user.userType,
        userID: user.userID,

      }
      })
    }

    static async getGradCourses(){
      const gradResponse = await Axios.get("http://localhost:8000/getGradCourses")
      return gradResponse.data
    }
     
    static async dropMyMajor(majorID, userID){
      const dropResponse = await Axios.put("http://localhost:8000/dropMyMajor", {
        params: {
          majorID: majorID,
          userID: userID
        }
      })
      return dropResponse.data
    }

    static async dropMyMinor(minorID, userID){
      const dropResponse = await Axios.put("http://localhost:8000/dropMyMinor", {
        params: {
          minorID: minorID,
          userID: userID
        }
      })
      return dropResponse.data
    }

    static async dropMyClass(CRN, userID){
      const response = await Axios.post("http://localhost:8000/dropMyClass",{
        params: {
          CRN: CRN,
          userID: userID
        }
      })
      return response.data
    }



    static async declareMyMajor(majorID, userID){
      const addResponse = await Axios.put("http://localhost:8000/declareMyMajor" ,{
        params: {
          majorID: majorID,
          userID: userID
        }
      })
      return addResponse.data
    }
    static async declareMyMinor(minorID, userID){
      const addResponse = await Axios.put("http://localhost:8000/declareMyMinor" ,{
        params: {
          minorID: minorID,
          userID: userID
        }
      })
      return addResponse.data
    }
    static async getFacultyID(firstName, lastName){
      const getResponse = await Axios.post("http://localhost:8000/getFacultyID",{
        params: {
          firstName: firstName,
          lastName: lastName
        }
      })
      return getResponse.data
    }
    static async getFacRank(userID){
      const getResponse = await Axios.post("http://localhost:8000/getFacRank",{
        params: {
          userID: userID
        }
      })
      return getResponse.data
    }

    static async getTimeSlotID(startTime, endTime, day){
      const getResponse = await Axios.post("http://localhost:8000/getTimeSlotID",{
        params: {
          startTime: startTime,
          endTime: endTime,
          day: day
        }
      })
      return getResponse.data
    }

 
     
      
    }