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
    }