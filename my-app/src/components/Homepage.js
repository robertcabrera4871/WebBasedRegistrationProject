import React from 'react';
import './Homepage.css';
import schedule from '../assets/fakeSchedule.png';
import groupLog from '../assets/groupLog.png'

function Homepage(){
    return (
         <div>
           <ul>
          <li><a href="default.asp">Home</a></li>
          <li><a href="news.asp">News</a></li>
          <li><a href="contact.asp">Contact</a></li>
          <li><a href="about.asp">About</a></li>
          <li><a href="about.asp">Login</a></li>
          <li><img src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88365/91138/Harry-Potter-Hogwarts-Crest-Official-wall-mounted-cardboard-cutout-buy-now-at-star__49592.1507641303.jpg?c=2" class="logo"/></li>
        </ul>
             <header class="bar">SUNY Hogwarts</header>
           <img class="schoolImg" src="http://wagner.edu/about/wp-content/blogs.dir/54/files/2005/11/10675scr.jpg"/>
             <h1 class="bar">Academic Calendar</h1>
             <img src="https://www.academycollege.edu/wp-content/uploads/2020/10/2021-Academic-Calendar.png"/>
           <h1 class="bar">Schedule Search</h1>
           <label>Chose a semester</label>
           <select>
           <option>Fall 2021</option>
           <option>Spring 2022</option>
           </select> <br/><br/>
           <button>Search</button><br/><br/>
           <img class="schedule" src={schedule}/>
           <h1 class="bar">Group Log</h1>
           <img class="schedule" src={groupLog}/>
            </div>
    );

}

export default Homepage