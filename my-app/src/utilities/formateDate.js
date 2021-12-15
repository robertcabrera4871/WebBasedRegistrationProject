export default function formatDate(data, dateProp){
    for(const i in data){
        data[i][dateProp] = data[i][dateProp].substring(0,10)
    }
}