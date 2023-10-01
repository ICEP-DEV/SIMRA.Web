

import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Level1.css'
function Level1() {
    const navigate = useNavigate()

    function sanitary_survay() {
        navigate('/sanitaryInpection')
    }
    function h2s() {
        navigate('/h2s_testing')
    }
    return (
        <div className='hero-level1'>
            <div className='sidenav'>
                <Sidebar />
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