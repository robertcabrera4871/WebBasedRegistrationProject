import schedule from '../assets/fakeSchedule.png';


function SchedSearch(){
    return (
         <div>
            <label>Chose a semester</label>
           <select>
           <option>Fall 2021</option>
           <option>Spring 2022</option>
           </select>
           <br/>
           <label>Sort Schedule by</label>
           <select>
            <option>Name</option>
            <option>Day</option>
            <option>Time</option>
            <option>Course Section</option>
            </select>

           <br/><br/>
           <button>Search</button><br/><br/>
           <img className="schedule" src={schedule}/>
         </div>
    );

}

export default SchedSearch