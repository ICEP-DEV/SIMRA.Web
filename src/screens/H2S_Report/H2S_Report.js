
import Header from '../Header/Header';
import './H2S_Report.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../../Data/API";

function H2S_Report() {
    const [Provinces, setProvinces] = useState([])
    const [Report, setReport] = useState([])
    const [Municipalities, setMunicipalities] = useState([])
    const [StoredReport, setStoredReport] = useState([])
    let [TotalRecord, setTotalRecord] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [FoundReport, setFoundReport] = useState(false)

    // const api = "http://localhost:3001/api/"
    useEffect(() => {
        var date = new Date()
        var current_date = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
        axios.get(api + "get_h2s_stats/2023-06-01/" + current_date.toString()).then((response) => {
            setFoundReport(response.data.success)
            if (response.data.success === true) {
                setStoredReport(response.data.result)
                setReport(response.data.result)
                setTotalRecord(response.data.result.length)
            }

        })
        console.log(TotalRecord)
        console.log(StoredReport)
        console.log(Report)


        axios.get(api + "get_provinces").then(response => {
            setProvinces(response.data.results)

        }, err => {
            console.log(err)
        })
    }, []);

    function display_search_report() {
        console.log(startDate, endDate)
        if (startDate === '' || endDate === '') {
            toast.warn("All date should be selected!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (Date.parse(startDate) > Date.parse(endDate)) {
            toast.warn("End date cannot be before start date!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        axios.get(api + 'get_h2s_stats/' + startDate + '/' + endDate).then((response) => {
            setTotalRecord(0)
            setFoundReport(response.data.success)
            if (response.data.success === true) {
                setReport(response.data.result)
                setStoredReport(response.data.result)
                setTotalRecord(response.data.result.length)
            }
        })
    }

    function filter_by_province(_province) {
        var count = 0
        var temp_array = StoredReport

        axios.get(api + "get_municipalities/" + _province).then(response => {
            setMunicipalities(response.data.results)

        }, err => {
            console.log(err)
        })
        setReport(temp_array.filter(value => {
            return value.province_id.toLocaleLowerCase().includes(_province.toLocaleLowerCase())
        }))

        for (var k = 0; k < StoredReport.length; k++) {
            if (StoredReport[k].province_id.toLocaleLowerCase() === _province.toLocaleLowerCase()) {
                count++
            }
        }
        setTotalRecord(count)
    }

    function filter_by_municipality(_muni) {
        var temp_array = StoredReport
        var count = 0

        setReport(temp_array.filter(value => {
            return value.muni_id.toLocaleLowerCase().includes(_muni.toLocaleLowerCase())
        }))
        for (var k = 0; k < Report.length; k++) {
            if (Report[k].muni_id.toLocaleLowerCase() === _muni.toLocaleLowerCase()) {
                count++
            }
        }
        setTotalRecord(count)
    }

    return (
        <div className='hero-all' >
            <Admin_NavBar />
            <div className='main-all'>
                <ToastContainer />
                <div className='content'>
                    <Header />
                    <h2 className='text-primary text-center'>H2S Risk Characterization rating</h2>
                    
                    <div className='container-wrapper'>
                       
                        <div className='report-header'>
                            <div id='search_date'>
                                <span className='survey_date'>
                                    <label className='survey_date_label'>From</label>
                                    <input type='date' className='control-from  start_date' onChange={(event) => setStartDate(event.target.value)} />
                                </span>
                                <span className='survey_date'>
                                    <label className='survey_date_label'>To</label>
                                    <input type='date' className='control-from end_date' onChange={(event) => setEndDate(event.target.value)} />
                                </span>

                                <button onClick={display_search_report} className="btn btn-primary btn-search-report">Show Results</button>

                            </div>
                            <div id='filter_by_province'>
                                <span className='survey_province'>
                                    <label>Province</label>
                                    <select onChange={(e) => filter_by_province(e.target.value)}>
                                        <option value=''>Province</option>
                                        {Provinces.map((province, xid) => (
                                            <option key={xid} value={province.province_id} >{province.province_name}</option>
                                        ))}
                                    </select>
                                </span>
                                <span className='survey_province'>
                                    <label>Municipalities</label>
                                    <select onChange={(e) => filter_by_municipality(e.target.value)}>
                                        <option value=''>Province</option>
                                        {Municipalities.map((muni, xid) => (
                                            <option key={xid} value={muni.muni_id} >{muni.muni_name}</option>
                                        ))}
                                    </select>
                                </span>
                            </div>

                            <div id='stats_summary' style={{ color: 'black' }}>
                                <h3>Total Records: {TotalRecord}</h3>
                            </div>

                        </div>
                        {(FoundReport === true) && (
                            <table>
                                <tr className="survey_tr">
                                    <th className="survey_th _th">Municipalities</th>
                                    <th className="survey_th">Date</th>
                                    <th className="survey_th ">Catchment Area</th>
                                    <th className="survey_th ">Total Average</th>
                                    <th className="survey_th ">Risk Type</th>
                                </tr>
                                {Report.map((report, xid) => (
                                    <tr key={xid}>
                                        <td className="survey_td _td">{report.muni_name}</td>
                                        <td className="survey_td">{report.created_date}</td>
                                        <td className="survey_td">{report.type}</td>
                                        <td className="survey_td">{report.total_avarage}</td>
                                        <td className="survey_td">{report.risk_type}</td>
                                    </tr>
                                ))}

                            </table>)}

                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default H2S_Report