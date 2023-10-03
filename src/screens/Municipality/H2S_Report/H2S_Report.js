import AdminSideBar from '../Admin_Side_Bar/Admin_Side_Bar'
import Header from '../../User/Header/Header';

function H2S_Report(){
    return(
        <div className='hero-all' >
            <div className='sidenav'>
                <AdminSideBar />
            </div>
            <div className='main-all'>
                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default H2S_Report