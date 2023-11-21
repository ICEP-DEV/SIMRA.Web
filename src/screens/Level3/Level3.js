import './Level3.css'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import Footer from '../Footer/Footer';

function Level3() {

    return (
        <div className='hero-all' >
            <Navbar />
            <div className='content'>
                <Header />
                <h2 className='text-primary text-center'>Expert</h2>
                <div className='container-wrapper'>
                    <div className='lvl1'>

                        <div className='main-level1'>
                            <div className='table3'>
                                <Link to='/reference_pathogen' class="btn btn-success btn-sanitary">Reference Pathogen</Link>
                                <Link to='/mst' className='btn btn-success btn-sanitary'>MST</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}


export default Level3;