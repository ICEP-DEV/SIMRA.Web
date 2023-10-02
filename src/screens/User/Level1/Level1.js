import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Level1.css'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Level1() {
    const navigate = useNavigate()

    function sanitary_survay() {
        navigate('/sanitaryInpection')
    }
    function h2s() {
        navigate('/h2s_testing')
    }
    return (
        <div className='hero-all' >
            <div className='sidenav'>
                <Sidebar />
            </div>

            <div className='main-all'>

                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>
                        <div className='lvl1'>
                            <div className='main-level1'>
                                <div className='table3'>
                                    <Link to='' className='btn btn-primary btn-sanitary'>Sanitary Survey</Link>
                                    <Link to='' className='btn btn-success btn-sanitary'>H2S</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )

}
export default Level1