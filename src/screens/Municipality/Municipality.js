import './Municipality.css'
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
import Header from '../Header/Header';
import drink from './girldrinking.png'
import { FaTooth } from 'react-icons/fa';
import tapwater from '../../assets/tapwater.jpg';
function Municipality() {

    return (
        <div className='hero-all' >
            <Admin_NavBar />
            <div className='content-municipalities'>
                <Header />
                <div className='container-wrapper mb-5'>
                    <div>
                       
                    </div>
                    <section>
                        {/* <img className='home-img d-flex justify-content-start'
                    src={tapwater} style={{width:'150px'}}/> */}
                        <p className='d-flex justify-content-start'>
                            "Promoting a clean environment, ensuring safe water, and fostering good health."
                        </p>
                    </section>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Municipality
