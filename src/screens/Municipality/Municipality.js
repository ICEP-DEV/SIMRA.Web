import './Municipality.css'
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
import Header from '../Header/Header';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { api } from '../../Data/API';
function Municipality() {

    const [Provinces, setProvinces] = useState([])
    const [IsProvinces, setIsProvinces] = useState(false)
    const [ExpandSelectedProvince, setExpandSelectedProvince] = useState([])
    const [AllMunicipalities, setAllMunicipalities] = useState([])
    const [FiteredMunicipalities, setFiteredMunicipalities] = useState([])
    const [IsMunicipalities, setIsMunicipalities] = useState(false)
    const [Province_Id, setProvince_Id] = useState('')


    useEffect(() => {
        axios.get(api + 'get_results_per_province').then(respond => {
            setProvinces(respond.data.results)
            setIsProvinces(respond.data.success)
        }, err => {
            console.log(err)
        })

        axios.get(api + 'get_results_per_municipalities').then(respond => {
            console.log(respond.data.success)
            setIsMunicipalities(respond.data.success)
            setAllMunicipalities(respond.data.results)
        }, err => {
            console.log(err)
        })
    }, [])

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
                            {IsProvinces && <>
                            {Provinces.map((prov, xid)=>(
                                <button className='collapsible' onClick={() => collapse(prov.province_id)}>{prov.province_name}</button>
                            ))}
                                {IsMunicipalities && <>
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
                                </>}

                            </>}


                            <button className='collapsible' onClick={() => collapse('lim')}>Limpopo</button>
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
