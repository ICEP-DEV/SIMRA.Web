import './Logs.css'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

function Logs() {

    return (
        <div className='hero-all' >
            <div className='sidenav'>
                <Sidebar />
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

export default Logs;