import React from 'react';
import axios from 'axios';
import './Home.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
function Home(){
    let navigate = useNavigate();
    
return(
    <div className='hero-all' >
    <div className='sidenav'>
        <Sidebar />
    </div>

    <div className='main-all'>
     
        <div className='content'>
        <Header/>
            <div className='container-wrapper'>
       
                <div>
                   <button className='btn-home' onClick={() => navigate("/sampling_data")}> Sampling Data</button> 
                </div>
    
            </div>

            <h1 className='h1-home'>Recommended methods</h1>
<div className='home-p'>
   
    <h4>Boiling:</h4>
  
1. Bring Water to a rolling boil.<br></br>
2. Maintain  it for at least 1 min (3min at higher altitude).<br></br>
3. Allow the water to cool before use.<br></br>
</div>
<div className='home-p'>
<h4>Filtration:</h4>
1. Choose a water filter certified for the removal of specific contaminants<br></br>
(e.g, use a cloth folded 8 times, clay pots, ceramic filters).
</div>


            
            </div>
            </div></div>
)
}
export default Home;