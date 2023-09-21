
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar  from '../Sidebar/Sidebar';
import './Level1.css'
function Level1() {
    const navigate = useNavigate()
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
    return(
        <div className='hero-level1'>
            <div className='sidenav'>
<Sidebar/>
            </div>
            <div className='lvl1'>
            <div className='main-level1'>
                <div className='table3'>

           
            <button onClick={sanitary_survay} className='btn-sanitary'>Sanitary Survey</button>
            <button onClick={h2s} className='btn-sanitary'>H2S</button>
            </div>
            </div>
          </div>
        </div>
    )

}
export default Level1