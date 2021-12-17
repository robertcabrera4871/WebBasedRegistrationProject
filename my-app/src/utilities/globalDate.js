export default class globalDate {

   static setGlobalDate(date){
        sessionStorage.setItem("globalDate", date);
    }   

    static getGlobalDate(){
       return (sessionStorage.getItem('globalDate'))
    }
}