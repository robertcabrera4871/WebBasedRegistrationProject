import React from 'react';
import './Homepage.css';

function Homepage(){
    return (
         <div>
           <ul>
          <li><a href="default.asp">Home</a></li>
          <li><a href="news.asp">News</a></li>
          <li><a href="contact.asp">Contact</a></li>
          <li><a href="about.asp">About</a></li>
          <li><img src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/original/products/88365/91138/Harry-Potter-Hogwarts-Crest-Official-wall-mounted-cardboard-cutout-buy-now-at-star__49592.1507641303.jpg?c=2" class="logo"/></li>
        </ul>
             <header>SUNY Hogwarts</header>
           <img src="http://wagner.edu/about/wp-content/blogs.dir/54/files/2005/11/10675scr.jpg"/>
             <h1>Academic Calendar</h1>
             <img src="https://i.etsystatic.com/10950629/r/il/1081ac/2535486844/il_794xN.2535486844_dzuf.jpg"/>
           <h1>Schedule Search</h1>
           <label>Chose a semester</label>
           <select>
           <option>Fall 2021</option>
           <option>Spring 2022</option>
           </select> <br/><br/>
           <button>Search</button>
             </div>
    );

}

export default Homepage