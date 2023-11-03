import './Report.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
ChartJS.register(ArcElement, Tooltip, Legend);


function Report() {

    let [SurveyValues, setSurveyValues] = useState([])
    const [SurveyRisktype, setSurveyRisktype] = useState([])
    const [SurveyColours, setSurveyColours] = useState([])
    const [IsFoundSurvey, setIsFoundSurvey] = useState(false)


    let [H2SValues, setH2SValues] = useState([])
    const [H2SRisktype, setH2SRisktype] = useState([])
    const [H2SColours, setH2SColours] = useState([])
    const [IsFoundH2S, setIsFoundH2S] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3001/api/get_survey_summary_report/ZA-GP/Oct-2023").then(response => {
            
            setSurveyValues(response.data.countValues)
            setSurveyRisktype(response.data.risk_type)
            setSurveyColours(response.data.colours)
            setIsFoundSurvey(response.data.success)
        }, err => console.log(err))
        axios.get("http://localhost:3001/api/get_h2s_report/ZA-GP/Oct-2023").then(response => {
            console.log(response.data)
            setH2SValues(response.data.countValues)
            setH2SRisktype(response.data.risk_type)
            setH2SColours(response.data.colours)
            setIsFoundH2S(response.data.success)
        }, err => console.log(err))
    }, [])



    const survay = {
        labels: SurveyRisktype,
        datasets: [{
            data: SurveyValues,
            backgroundColor: SurveyColours
        }]
    }

    const h2s = {
        labels: H2SRisktype,
        datasets: [{
            data: H2SValues,
            backgroundColor: H2SColours
        }]
    }

    return (
        <div className='hero-all' >
            <Admin_NavBar />

            <div className='content'>
                <Header />
                <div className='container-wrapper'>


                    <div className='summary_report'>
                        <h2>Report Summary</h2>
                        <div className='inner_summary_report'>
                            <h2>Sanitary Survey</h2>
                            {IsFoundSurvey === true && (
                                <div className="summary_sanitary_report">
                                    <div className='pie_chart' >
                                        <Pie data={survay}
                                        />
                                    </div>
                                    <div className='decript_summary'>
                                        {SurveyRisktype.map((risk, xid)=>(
                                             <div key={xid} className='stats_summary'>
                                                <label><span className='color_report' style={{backgroundColor:SurveyColours[xid], width:'20px', height:'20px'}}></span>{risk}</label>
                                            </div>
                                        ))}
                                        {/* <img src={sanitary_data} alt="summary" /> */}
                                    </div>
                                    <div className='view_summary'>
                                        <Link to='/sanitary_report'>View</Link>
                                    </div>
                                </div>
                            )}
                            {IsFoundSurvey === false && (<div>No Data Found</div>)}
                            <h2>H2S</h2>
                            {IsFoundH2S === true && (
                                <div className="summary_h2s_report">

                                    <div className='pie_chart'>
                                        <Pie data={h2s}
                                        />
                                    </div>
                                    <div className='decript_summary'>
                                    {H2SRisktype.map((risk, xid)=>(
                                            <div key={xid} className='stats_summary'>
                                                <label><span className='color_report' style={{backgroundColor:H2SColours[xid]}}></span>{risk}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='view_summary'>
                                        <Link to='/h2s_report'>View</Link>
                                    </div>
                                </div>
                            )}
                            {IsFoundH2S === false && (<div>No Data Found</div>)}
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

export default Report