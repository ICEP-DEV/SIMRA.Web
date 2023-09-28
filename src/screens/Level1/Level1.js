import axios from 'axios'
import React ,{useEffect,useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar  from '../Sidebar/Sidebar';
import {PiCookingPotDuotone,PiCookingPotFill} from 'react-icons/pi';
import {GiCookingPot} from 'react-icons/gi';

import './Level1.css' 
function Level1() {
    const navigate = useNavigate()
    const [posts ,setPosts] =useState([]);
    const tempdata = useLocation();
    const samplingData = useState(tempdata)

    function sanitary_survay(){
        var temp = samplingData[0].state.temp
        navigate('/sanitaryInpection', {state:{temp}})
    }
    function h2s(){
        var temp = samplingData[0].state.temp
        navigate('/h2s_testing', {state:{temp}})
    }
    
useEffect(() =>{
    axios 
    .get("http://localhost:3001/api/login")
    .then((result) => {
        console.log(result.data);
        setPosts(result.data);
    })
    .catch((error) => console.log(error ));
},[] );
    return(
        <div className='hero-all'>
            <div className='sidenav'>
<Sidebar/>
            </div>
        
            <div className='main-all'>
            <div className='content'>
            <div className='container-wrapper'>

           <div className='btn-level1'>
           <button onClick={sanitary_survay} className='btn1'>Sanitary Survey</button>
            <button onClick={h2s} className='btn2'>H2S</button>
           </div>

           {/* <div className='icon-level1'>
           <GiCookingPot size='100'/>
           <PiCookingPotFill size='100'/>
           
           </div> */}
          
            </div>
            </div>
          </div>
        </div>
    )

}
export default Level1