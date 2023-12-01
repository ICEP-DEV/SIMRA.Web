import './Municipality.css'
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
import Header from '../Header/Header';
import drink from './girldrinking.png'
import { FaTooth } from 'react-icons/fa';
import tapwater from '../../assets/tapwater.jpg';
import { useState } from 'react';
function Municipality() {

    const [Collapse, setCollapse] = useState(false)
    const [ExpandSelectedProvince, setExpandSelectedProvince] = useState([])

    function collapse(province_id) {
        var newId = {
            province_id: province_id
        }
        setExpandSelectedProvince(newId)
    }
    return (
        <div className='hero-all' >
            <Admin_NavBar />
            <div className='content-municipalities'>
                <Header />
                <div className='container-wrapper mb-5'>
                    <h2>Simra Reports</h2>
                    <div className="section-reports">
                        <div id='today_report' className='section-report'>
                            <h5>Todays Report</h5>
                            <h6>0 &nbsp;Reported</h6>
                        </div>

                        <div className='section-report'>
                            <h5>Total Reports For Every province</h5>
                            <button className='collapsible' onClick={() => collapse('gau')}>Gauteng</button>
                            {/* <button className='collapsible' data-bs-toggle='collapse' data-bs-target="#collapse1" aria-expanded='false' aria-controls='collapse1'>Gauteng</button> */}

                            {ExpandSelectedProvince.province_id === 'gau' &&
                                <div className='drop-province' id='collapse1'>
                                    <div className='province-content'>
                                        <table>
                                            <th>Municipality</th>
                                            <th>results</th>
                                            <tr>
                                                <td>Thswane </td>
                                                <td>10 </td>
                                            </tr>
                                            <tr>
                                                <td>Metropo </td>
                                                <td>30 </td>
                                            </tr> <tr>
                                                <td>Jozi </td>
                                                <td>500 </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            }

                            <button className='collapsible' onClick={() => collapse('lim')}>Limpopo</button>
                            {/* <button className='collapsible' data-bs-toggle='collapse' data-bs-target="#collapse2" aria-expanded='false' aria-controls='collapse2'>Limpopo</button> */}
                            {ExpandSelectedProvince.province_id === 'lim' &&
                                <div className='drop-province' id='collapse2'>
                                    <div className='province-content'>
                                        <table>
                                            <th>Municipality</th>
                                            <th>results</th>
                                            <tr>
                                                <td>Vembe </td>
                                                <td>100 </td>
                                            </tr>
                                            <tr>
                                                <td>Musina </td>
                                                <td>300 </td>
                                            </tr> <tr>
                                                <td>Lethabo </td>
                                                <td>50 </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            }

                        </div>

                        <div className='section-report'>
                            <h5>Total Reports</h5>
                            <h6>0 &nbsp;Reportednjhvjhuhdshbgudibugeuwg89gew</h6>
                        </div>

                        <div className='section-report'>
                            <h5>Todays Report</h5>
                            <h6>0 &nbsp;Reported</h6>
                        </div>

                        <div className='section-report'>
                            <h5>Todays Report</h5>
                            <h6>0 &nbsp;Reported</h6>
                        </div>

                        <div className='section-report'>
                            <h5>Todays Report</h5>
                            <h6>0 &nbsp;Reported</h6>
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

export default Municipality
