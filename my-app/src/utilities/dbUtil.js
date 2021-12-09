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
        const response = await Axios.post("http://localhost:8000/emailExist",{
          params: {
            email: email
          }
        })
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
        return response;
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

    static async getRooms(){
      const response = await Axios.get("http://localhost:8000/getRooms")
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

      static async getMajors(){
        const majorsResponse = await Axios.get("http://localhost:8000/majors")
        return majorsResponse.data      
      }
      static async getMajorRequirements(){
        const majorRequireResponse = await Axios.get("http://localhost:8000/majorRequirements")
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