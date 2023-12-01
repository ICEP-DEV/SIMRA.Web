import './Municipality.css'
import AdminSideBar from '../Admin_Side_Bar/Admin_Side_Bar'
import Header from '../../Header/Header';
import drink from './girldrinking.png'
function Municipality() {

    return (
        <div className='hero-all' >
            <div className='sidenav'>
                <AdminSideBar />
            </div>
            <div className='main-all'>
             
                <div className='content'>
                    <Header />
                    <div className='container-wrapper '>
                        <div>
                        {/* <img src={drink} className='home-img'/> */}
                        </div>
                        <div>
                          
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Municipality
