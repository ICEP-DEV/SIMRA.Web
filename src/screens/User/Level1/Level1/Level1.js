import Sidebar from '../Sidebar/Sidebar';
import './Level1.css'
import Header from '../../../Header/Header';
import { Link } from 'react-router-dom';

function Level1() {
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
                            <h2>Level 1 (Basic Level)</h2>
                            <div className='main-level1'>
                                <div className='table3'>
                                    <Link to='/sanitaryInpection' class="btn btn-primary btn-sanitary">Sanitary Survey</Link>
                                    <Link to='/h2s_testing' className='btn btn-primary btn-sanitary'>H2S</Link>
                                </div>
                            </div>
                            <div className='level1-desccription'>
                                <p>
                                This level is suitable for situations where limited resources are available. 
                                </p>
                                <p>
                                The H2S test can provide a simple indication of potential faecal contamination based on the presence of the gas. 
                                </p>
                                <p>
                                The sanitary survey involves assessing the sanitation practices and conditions in the area, providing insights into potential sources of contamination. 
                                </p>
                                <p>
                                This level is helpful in conducting a preliminary assessment of microbial risks and identifying areas that require further investigation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )

}
export default Level1