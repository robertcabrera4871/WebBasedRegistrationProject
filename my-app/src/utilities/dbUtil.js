import Axios from 'axios';

    export default class dbUtil {
        
     static async login(email, password) {
        const existResponse = await Axios.get("http://localhost:8000/emailExist", {
          params: {
            email: email
          }
        })
        
        const existResponseData = existResponse.data[0]
        const doesExist = (existResponseData["EXISTS (SELECT 1 FROM LoginInfo WHERE email = '" + email + "')"])
      
        if (!doesExist) {
          return doesExist;
        } else {
          const loginResponse = await Axios.post("http://localhost:8000/login", {
            email: email,
            password: password
          })
          return loginResponse.data
        }
      }

      static async editMS(row, oldCRN){
    
        const editResponse = await Axios.put("http://localhost:8000/editMS", {
          params: {
            OldCRN: oldCRN,
            CRN: row.CRN,
            Capacity: row.Capacity,
            CourseID: row.CourseID,
            CourseSection: row.CourseSection,
            Day: row.Day,
            Department: row.Department,
            EndTime: row.EndTime,
            ProfFirstName: row.ProfFirstName,
            ProfLastName: row.ProfLastName,
            RoomNumber: row.RoomNumber,
            Seats: row.Seats,
            Semester: row.Semester,
            StartTime: row.StartTime,
            Year: row.Year
          }
        })
        return editResponse.data
      }

      static async deleteMS(row){
        const deleteResponse = await Axios.put("http://localhost:8000/deleteMS", {
          params: {
            CRN: row.CRN
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

      static async getMasterSchedule(){
          const mSchedResponse = await Axios.get("http://localhost:8000/masterSchedule")
          return mSchedResponse.data
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
      
    }