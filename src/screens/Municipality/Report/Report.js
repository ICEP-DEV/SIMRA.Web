import './Report.css'
import AdminSideBar from '../Admin_Side_Bar/Admin_Side_Bar'
import Header from '../../Header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import sanitary from './sanitary.PNG';
import sanitary_data from './sanitary_data.PNG';
import H2S from './H2S.PNG';
import H2S_data from './H2S_data.PNG';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { api } from "../../../Data/API";

ChartJS.register(ArcElement, Tooltip, Legend);


function Report() {

    let [SurveyValues, setSurveyValues] = useState([])
    const [SurveyRisktype, setSurveyRisktype] = useState([])
    const [SurveyColours, setSurveyColours] = useState([])
    useEffect(() => {
        axios.get(api+"get_survey_summary_report/ZA-GP/Oct-2023").then(response => {
            console.log(response.data)
            setSurveyValues(response.data.countValues)
            setSurveyRisktype(response.data.risk_type)
            setSurveyColours(response.data.colours)
        })
    }, [])



    const survay = {
        labels: SurveyRisktype,
        datasets: [{
            data: SurveyValues,
            backgroundColor: SurveyColours
        }]
    }

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
                                        <Pie data={survay}
                                        />
                                    </div>
                                    <div className='decript_summary'>
                                        <img src={sanitary_data} alt="summary" />
                                    </div>
                                    <div className='view_summary'>
                                        <Link to='/sanitary_report'>View</Link>
                                    </div>
                                </div>
                                <h2>H2S</h2>
                                <div className="summary_h2s_report">
                                    <div className='pie_chart'>
                                        <img src={H2S} alt="h2s" />
                                    </div>
                                    <div className='decript_summary'>
                                        <img src={H2S_data} alt="summary" />
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