import Dropdown from "react-bootstrap/Dropdown";

function ChoseSemester({semesterSelect, onClick}){

    return(
        <Dropdown className="text-align">
        <Dropdown.Toggle id="dropdown-basic ">
         Choose a Semester
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item> 
                <div onClick={() => onClick('Fall 2021')}>Fall 2021</div>
           </Dropdown.Item>
            <Dropdown.Item>
            <div onClick={() => onClick('Spring 2022')}>Spring 2022</div>
                </Dropdown.Item>
        </Dropdown.Menu>
        <br/><br/>Semester selected: {semesterSelect}
       </Dropdown>
    );
}

export default ChoseSemester