import NavBar from './components/NavBar';
import HeaderBar from './components/HeaderBar';
import SchedSearch from './components/SchedSearch';
import groupLog from './assets/groupLog.png'

function App() {
  return (
    <div>
       <NavBar />
       <HeaderBar title = "SUNY Hogwarts" />
       <img className="schoolImg" src="http://wagner.edu/about/wp-content/blogs.dir/54/files/2005/11/10675scr.jpg"/>
       <HeaderBar title = "Academic Calendar" />
       <img src="https://www.academycollege.edu/wp-content/uploads/2020/10/2021-Academic-Calendar.png"/>
       <HeaderBar title = "Schedule Search" />
       <SchedSearch />
       <HeaderBar title = "Group Log" />
       <img class="schedule" src={groupLog}/>
    </div>
  )
}

export default App;
