import './Report.css'
import AdminSideBar from '../Admin_Side_Bar/Admin_Side_Bar'
import Header from '../../User/Header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';

function Report() {

    let [SummaryValues, setSummaryValues] = useState([])
    const [SummaryQuestions, setSummaryQuestions] = useState([])
    const [SummaryColours, setSummaryColours] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/api/report_summary/ZA-GP/Oct-2023").then(response => {
            console.log(response.data.results)
            setSummaryValues(response.data.results)
        })
    }, [])


    return (
        <div className='hero-all' >
            <div className='sidenav'>
                <AdminSideBar />
            </div>
            <div className='main-all'>
                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>
                        <div className='summary_report'>
                            <h2>Report Summary</h2>
                            <div className='inner_summary_report'>
                                <h2>Sanitary Survey</h2>
                                <div className="summary_sanitary_report">
                                    <div className='pie_chart'>
                                        jhjhjhjjhjhjh
                                    </div>
                                    <div className='decript_summary'>
                                        fdghhhfgggnngnng
                                    </div>
                                    <div className='view_summary'>
                                        <Link to='/sanitary_report'>View</Link>
                                    </div>
                                </div>
                                <h2>H2S</h2>
                                <div className="summary_h2s_report">
                                    <div className='pie_chart'>
                                        jhjhjhjjhjhjh
                                    </div>
                                    <div className='decript_summary'>
                                        fdghhhfgggnngnng
                                    </div>
                                    <div className='view_summary'>
                                        <Link to='/sanitary_report'>View</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report