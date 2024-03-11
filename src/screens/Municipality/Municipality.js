import './Municipality.css'
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
import Header from '../Header/Header';

import Total_Report_Per_Province from './Total_Report_Per_Province/Total_Report_Per_Province';
import H2S_Report_per_Province from './H2S_Report_per_Province/H2S_Report_per_Province';
import Survey_Report_Per_Province from './Survey_Report_Per_Province/Survey_Report_Per_Province';
import FIB_Report_Per_Province from './FIB_Report_Per_Province/FIB_Report_Per_Province';
import MST_Report_Per_Province from './MST_Report_Per_Province/MST_Report_per_Province';



import axios from 'axios'
import { useEffect, useState } from 'react';
import { api } from '../../Data/API';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Municipality() {

    // H2S reports
    const [H2SPovinces, setH2SPovinces] = useState([])
    const [H2SMunicipalities, setH2SMunicipalities] = useState([])
    const [H2SMunicipalitiesRisk, setH2SMunicipalitiesRisk] = useState([])
    const [H2SPovincesFound, setH2SPovincesFound] = useState(false)
    const [isFoundH2SPovinces, setisFoundH2SPovinces] = useState(false)

    useEffect(() => {

        //get_h2s_by_province
        axios.get(api + 'get_h2s_by_province').then(respond => {
            setH2SPovincesFound(respond.data.success)
            setisFoundH2SPovinces(respond.data.success)
            setH2SPovinces(respond.data.rows)
            setH2SMunicipalitiesRisk(respond.data.results)
            setH2SMunicipalities(respond.data.result)
        }, err => {
            console.log(err)
        })
    }, [])




    return (
        <div className='hero-all' >
            <Admin_NavBar />
            <div className='content-municipalities'>
                <Header />
                <div className='container-wrapper mb-5'>
                    <h2>Simra Reports</h2>
                    <div className='reports' >
                        <div id='today_report' className='section-report'>
                            <h5>Todays Report</h5>
                            <h6>0 &nbsp;Reported</h6>
                        </div>


                        <div className='section-report' id='report_per_prov'>
                            <h5>Total Reports For Every province</h5>
                            <Total_Report_Per_Province />
                        </div>

                        <div className='section-report' id='report_per_prov'>
                            <h5>Total H2S Reports For Every province</h5>
                            <H2S_Report_per_Province />
                        </div>
                        <div className="section-report" id='report_per_prov'>
                            <h5>Total Survey Reports For Every province</h5>
                            <Survey_Report_Per_Province />
                        </div>
                        <div className="section-report" id='report_per_prov'>
                            <h5>Total fib Reports For Every province</h5>
                            <FIB_Report_Per_Province/>
                        </div>
                        <div className="section-report" id='report_per_prov'>
                            <h5>Total MST Reports For Every province</h5>
                            <MST_Report_Per_Province/>
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
