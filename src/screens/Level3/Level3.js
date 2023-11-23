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
                    <h6></h6>
                    <h3 className='text-primary'>What is a microbial source tracking?</h3>
                    <p>Microbial source tracking (MST) is a term used for the process of identifying the source of faecal contamination in the environment.</p>
                    <h6> </h6>
                    <h3 className='text-primary'>What is a pathogen?</h3>
                    <p> A pathogen is defined as an organism causing disease to its host, with the severity of the disease symptoms referred to as virulence.
                         Pathogens are taxonomically widely diverse and comprise viruses and bacteria as well as unicellular and multicellular eukaryotes.</p>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}


export default Level3;