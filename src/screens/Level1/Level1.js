
import './Level1.css'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import Footer from '../Footer/Footer';


function Level1() {
    return (
        <div className='hero-all' >
            <Navbar />
            <div className='content'>
                <Header />
                <div className='container-wrapper'>
                    <div className='lvl1'>
                        <h2 className='text-primary'>Household Tests</h2>
                        <div className='main-level1'>
                            <div className='table3'>
                                <Link to='/sanitaryInpection' class="btn btn-success btn-sanitary">Sanitary Survey</Link>
                                <Link to='/h2s_testing' className='btn btn-success btn-sanitary'>H2S</Link>
                            </div>
                        </div>
                       
                        
                    </div>
                    <h3>What is sanitary inspection?</h3>
                                <p className='lh-sm'>Sanitary inspection serves as a vital tool in water quality monitoring, assessing the cleanliness, safety, and overall hygiene of water resources and environments. Its primary role is to
                                    identify potential routes of microbial contamination in diverse water sources.</p><br />
                                    <h3>What is H2S (Hydrogen Sulphide) testing?</h3>
                                <p>Hydrogen Sulfide (H2S) test is a critical process for assessing water quality and safety. It detects the presence of this potentially harmful gas, helping to identify faecal contamination in water sources. If water is faecally contaminated the paper strip will
                                    change to brown-black colour. Indicating that water is not safe for drinking purposes. </p>
                </div>

                {/* <div id='level_descption'>
                             <div id='level_description font_7 wixui-richtext_text' >
                               
                               
                            </div> 
                        </div> */}
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )

}
export default Level1