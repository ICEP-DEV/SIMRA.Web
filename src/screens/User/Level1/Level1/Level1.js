import Sidebar from '../Sidebar/Sidebar';
import './Level1.css'
import Header from '../../../Header/Header';
import { Link } from 'react-router-dom';
import Navbar from '../../../Navbar/Navbar';
import blackstrip from '../../../../assets/blackstrip.png';
import whitestrip from '../../../../assets/whitestrip.png';
import ml from '../../../../assets/100ml.png';
import sample from '../../../../assets/sample.png';
import Footer from '../../../Footer/Footer';
import borehole from'../../../../assets/borehole.jpg';
import tube from'../../../../assets/tube.jpg';
import tests from'../../../../assets/tests.jpg'

function Level1() {
    return (
        <div className='hero-all' >
            <Navbar/>
           

                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>
                        <div className='lvl1'>
                        <h2>Household Tests</h2>
                            <div className='main-level1'>
                                <div className='table3'>
                                    <Link to='/sanitaryInpection' class="btn btn-dark btn-sanitary">Sanitary Survey</Link>
                                    <Link to='/h2s_testing' className='btn btn-dark btn-sanitary'>H2S</Link>
                                </div>
                            </div>
                            <div className='level1-desccription'>
                           
                            <label> How can I do H2S test?</label>
                            <div className='row align-items-start justify-content-around'>
                            <div className='card-h2s'>
                                <img className='img-h2s'src={borehole}/>
                            <h5>Step 1</h5>
                            <p>	Collect 100 mL of water sample to be tested. (e.i. water from tap, stage container, spring, borehole, dam)</p>
                            </div>
                            <div className='card-h2s'>
                                <img className='img-h2s'src={tests}/>
                            <h5>Step 2</h5>
                            <p>	Add 20 drop (1 mL) into tubes containing growth solution.</p>
                            </div>
                            <div className='card-h2s'>
                                <img className='img-h2s'src={tube}/>
                            <h5>Step 3</h5>
                            <p>	Insert H2S paper strip into the tube and secured by a cotton wool so that it remains at the top centre of the tube. </p>
                            </div>
                            <div className='card-h2s'>
                                <img className='img-h2s'src={borehole}/>
                            <h5>Step 4</h5>
                            <p>	Then place it in a container covered with cloth and place it in warm place for 24-36 hours.</p>
                            </div>
                            <div className='card-h2s'>
                                <img className='img-h2s'src={borehole}/>
                            <h5>Step 5</h5>
                            <p>	Check the colour change of paper strip.If colour change to black it means water is faecal contaminated.</p> 
                            </div>
                            
                          
                           

                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    )

}
export default Level1