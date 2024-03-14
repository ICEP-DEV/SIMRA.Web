import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { api } from '../../Data/API';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend); 

function User_Sanitary_Survay_Logs_Reports() {
    const [Provinces, setProvinces] = useState([]);
    const [Report, setReport] = useState([]);
    const [Municipalities, setMunicipalities] = useState([]);
    const [StoredReport, setStoredReport] = useState([]);
    const [TotalRecord, setTotalRecord] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [FoundReport, setFoundReport] = useState(false);
    const [UserId, setUserId] = useState(0);
    const [IsTable, setIsTable] = useState(true)
    const [IsVisual, setIsVisual] = useState(false)
    const [iterations, setIterations] = useState(1); // State for number of iterations
    const [CurrentPage, setCurrentPage] = useState(1);
    const [monteCarloResults, setMonteCarloResults] = useState([]);
    const record_per_page = 5;
    const lastIndex = CurrentPage * record_per_page;
    const firdIndex = lastIndex - record_per_page;
    const record = Report.slice(firdIndex, lastIndex);
    const number_of_pages = Math.ceil(record.length / record_per_page);
    const number = [...Array(number_of_pages + 1).keys()].slice;
    const PagePerNumber = [];
    for (let i = 1; i <= Math.ceil(Report.length / record_per_page); i++) {
        PagePerNumber.push(i);
    }

    let user_info = useSelector((state) => state.user.value);

    useEffect(() => {
        var userId = user_info.userId;
        setUserId(userId);
        axios.get(api + 'get_userhistory_sanitory/' + userId).then((response) => {
            setFoundReport(response.data.success);
            if (response.data.success === true) {
                setStoredReport(response.data.result);
                setReport(response.data.result);
                setTotalRecord(response.data.result.length);
            }
        });

        axios.get(api + "get_provinces").then(response => {
            setProvinces(response.data.results);
        }, err => {
            console.log(err);
        });
    }, []);

    function display_search_report() {
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
        axios.get(api + 'get_user_survey_stats/' + startDate + '/' + endDate + '/' + UserId).then((response) => {
            setTotalRecord(0)
            setFoundReport(response.data.success)
            if (response.data.success === true) {
                setStoredReport(response.data.result)
                setReport(response.data.result)
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
        if (_muni === '') {
            setReport(StoredReport)
            return
        }

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

    function search_by_weekday(day) {
        var temp_array = StoredReport
        var count = 0
        if (day !== '') {
            setReport(temp_array.filter(value => {
                return value.weekday.toLocaleLowerCase().includes(day.toLocaleLowerCase())
            }))
            for (var k = 0; k < StoredReport.length; k++) {
                if (StoredReport[k].weekday.toLocaleLowerCase() === day.toLocaleLowerCase()) {
                    count++
                }
            }
            setTotalRecord(count)
        }
        else {
            setReport(StoredReport)
        }
    }

    function catchmentArea(catchment) {
        var temp_array = StoredReport
        console.log(temp_array)
        var count = 0
        if (catchment !== '') {
            setReport(temp_array.filter(value => {
                return value.type.toLocaleLowerCase().includes(catchment.toLocaleLowerCase())
            }))
            for (var k = 0; k < StoredReport.length; k++) {
                if (StoredReport[k].type.toLocaleLowerCase() === catchment.toLocaleLowerCase()) {
                    count++
                }
            }
            setTotalRecord(count)
        }
        else {
            setReport(StoredReport)
        }
    }


    function riskType(typeRisk) {
        var temp_array = StoredReport
        console.log(temp_array)
        var count = 0
        if (typeRisk !== '') {
            setReport(temp_array.filter(value => {
                return value.risk_type.toLocaleLowerCase().includes(typeRisk.toLocaleLowerCase())
            }))
            for (var k = 0; k < StoredReport.length; k++) {
                if (StoredReport[k].risk_type.toLocaleLowerCase() === typeRisk.toLocaleLowerCase()) {
                    count++
                }
            }
            setTotalRecord(count)
        }
        else {
            setReport(StoredReport)
        }
    }
    //change page 
    const paginate = (page_number) => setCurrentPage(page_number)
// Define the state for the number of iterations
const [numIterations, setNumIterations] = useState(1);
//risk colors
const risk_results = {
    labels: Report.map(value => { return value.risk_type }),
    datasets: [{
        data: Report.map(value => { return value.total_avarage }),
        backgroundColor: [ 'red', 'purple',"green", 'black', 'white']
    }]
};

function setTotable(){
    setIsTable(true)
    setIsVisual(false)
}

function setToVisual(){
    setIsTable(false)
    setIsVisual(true)
}
// Function to handle input change for number of iterations
const handleIterationsChange = (event) => {
    const newValue = parseInt(event.target.value);
    setNumIterations(newValue);
};

const runMonteCarloSimulation = () => {
    // Get the filtered reports
    const filteredReports = Report;

    // Map the risk types to their corresponding levels
    const riskLevels = {
        "Low Risk": 1 / 4,
        "Medium Risk": 2 / 4,
        "High Risk": 3 / 4,
        "Very High Risk": 4 / 4
    };

    // Array to store iteration results
    let monteCarloResultsArray = [];

    // Run simulation for specified number of iterations
    for (let i = 0; i < iterations; i++) {
        let totalRiskLevel = 0;

        filteredReports.forEach(report => {
            totalRiskLevel += riskLevels[report.risk_type];
        });

        const averageRiskLevel = totalRiskLevel / filteredReports.length;

        // Determine the risk type based on average risk level
        let riskType;
        if (averageRiskLevel <= 0.25) {
            riskType = "Low Risk";
        } else if (averageRiskLevel <= 0.5) {
            riskType = "Medium Risk";
        } else if (averageRiskLevel <= 0.75) {
            riskType = "High Risk";
        } else {
            riskType = "Very High Risk";
        }

        // Push the iteration result to the array
        monteCarloResultsArray.push({ iteration: i + 1, riskType: riskType, averageRiskLevel: averageRiskLevel.toFixed(2) * 100});
    }

    // Set the iteration results state
    setMonteCarloResults(monteCarloResultsArray);
            
}
    return (
        <div className='hero-all'>
            <Navbar />
            <div className='main-all'>
                <ToastContainer />
                <div className='content'>
                    <Header />
                    <h2 className='text-primary text-center'>Sanitary Inspections Logs</h2>
                    <div className='container-wrap'>

                        <div className='report-header  '>
                         
                            <div id='search_date ' >
                                <table className="table-logs table table-bordered w-75">
                                    <thead className='thead-dark'>
                                        <tr>

                                            <th scope="col " className='report-heading '>Start Date</th>
                                            <th scope="col" className='report-heading'>End Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr scope="row">

                                            <td>  <input type='date' className='control-from  start_date w-100 p-2' onChange={(event) => setStartDate(event.target.value)} /></td>
                                            <td> <input type='date' className='control-from end_date w-100 p-2' onChange={(event) => setEndDate(event.target.value)} /></td>

                                        </tr>


                                    </tbody>
                                </table>
                                <button onClick={display_search_report} className="btn btn-success btn-search-report w-25 mb-5">Show Results</button>
                            </div>

                            <table className="table-logs table table-bordered w-75">
                                <thead className='thead-dark'>
                                    <tr>

                                        <th scope="col " className='report-heading'>WeekDays</th>
                                        <th scope="col" className='report-heading'>Province</th>
                                        <th scope='col' className='report-heading'>Municipalities</th>
                                        <th scope='col' className='report-heading'>Catchment Area</th>
                                        <th scope='col' className='report-heading'>Risk Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr scope="row">

                                        <td className="w-25">
                                            <select onChange={(event) => search_by_weekday(event.target.value)} className="w-100 p-2">
                                                <option value=''>All Weekdays</option>
                                                <option value='Monday'>Monday</option>
                                                <option value='Tuesday'>Tuesday</option>
                                                <option value='Wednesday'>Wednesday</option>
                                                <option value='Thursday'>Thursday</option>
                                                <option value='Friday'>Friday</option>
                                                <option value='Saturday'>Saturday</option>
                                                <option value='Sunday'>Sunday</option>
                                            </select>
                                        </td>
                                        <td className="w-25">
                                            <select onChange={(e) => filter_by_province(e.target.value)} className="w-100 p-2">
                                                <option value=''>All Provinces</option>
                                                {Provinces.map((province, xid) => (
                                                    <option key={xid} value={province.province_id} >{province.province_name}</option>
                                                ))}
                                            </select>

                                        </td>
                                        <td className="w-25">
                                            <select onChange={(e) => filter_by_municipality(e.target.value)} className="w-100 p-2" >
                                                <option value=''>All Municipalities</option>
                                                {Municipalities.map((muni, xid) => (
                                                    <option key={xid} value={muni.muni_id} >{muni.muni_name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="w-25">
                                            <select onChange={(e) => catchmentArea(e.target.value)} className="w-100 p-2" >
                                                <option value='' className="control-form">Select Water Source</option>
                                                <option value='River' className="control-form">River</option>
                                                <option value='Dam' className="control-form">Dam</option>
                                                <option value='Spring' className="control-form">Spring</option>
                                                <option value='Borehole' className="control-form">Borehole</option>
                                                <option value='Dug Well' className="control-form">Dug Well</option>
                                                <option value='Household Tap Water' className="control-form">Household Tap Water</option>
                                                <option value='Housewater Stored Water' className="control-form">Housewater Stored Water</option>
                                                <option value='Wastewater Treatment Plant' className="control-form">Wastewater Treatment Plant</option>
                                                <option value='water Treatment Plant' className="control-form">water Treatment Plant</option>
                                            </select>
                                        </td>

                                        <td className="w-25">
                                            <select onChange={(e) => riskType(e.target.value)} className="w-100 p-2" >
                                                <option value='' className="control-form">Select Risk Type</option>
                                                <option value='Low Risk' className="control-form">Low Risk</option>
                                                <option value='Medium Risk' className="control-form">Medium Risk</option>
                                                <option value='High Risk' className="control-form">High Risk</option>
                                                <option value='Very High Risk' className="control-form">Very High Risk</option>
                                            </select>

                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                            <div id='stats_summary' className=' text-primary mt-5' >
                                <h3>Total Records: {TotalRecord}</h3>
                            </div>

                        </div>

                        <div className='reports'>
                            <button className='btn btn-success' disabled={IsTable} onClick={setTotable}>Table</button>
                            <button className='btn btn-primary' disabled={IsVisual} onClick={setToVisual}>Visual</button>

                            {IsTable && <>
                                {(FoundReport === true) && (
                                    <table className="table  table-bordered survay_table">
                                        <thead class="thead-dark">
                                            <tr className="survey_tr">
                                                <th className="survey_th _th">Municipalities</th>
                                                <th className="survey_th">Date</th>
                                                <th className="survey_th ">Catchment Area</th>
                                                <th className="survey_th ">Total Average</th>
                                                <th className="survey_th ">Risk Type</th>
                                            </tr>
                                        </thead>
                                        {record.map((report, xid) => (
                                            <tr key={xid} className="survey_tr">
                                                <td className="survey_td _td">{report.muni_name}</td>
                                                <td className="survey_td">{report.sample_date}</td>
                                                <td className="survey_td">{report.type}</td>
                                                <td className="survey_td">{report.total_avarage}</td>
                                                <td className="survey_td">{report.risk_type}</td>
                                            </tr>
                                        ))}
                                    </table>
                                )}

                                <div className='page_numbers' >
                                    {(FoundReport === true) && (
                                        <nav className='pagination'>
                                            <ul class="pagination justify-content-center">
                                                {PagePerNumber.map((number, xid) => (
                                                    <li key={xid} className='page-item'>
                                                        <button onClick={() => paginate(number)} className='page-link'>{number}</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    )}
                                </div>
                            </>}

                            {IsVisual&& <div>
                                <Pie data={risk_results} />

                            </div>}

                            {/* <input className='form-control w-25' type="number" value={numIterations} onChange={handleIterationsChange} /> */}
                            <button onClick={runMonteCarloSimulation} className="btn btn-primary w-25 mb-5">Run Monte Carlo Simulation</button>
                        </div>
                        <div className="monte-carlo-result">
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Simulation of Filtered Results</th>
                                        <th scope="col">Representative Risk Type</th>
                                        <th scope="col">Representative Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monteCarloResults.map((result, index) => (
                                        <tr key={index}>
                                            <td>{}</td>
                                            <td>{result.riskType}</td>
                                            <td>{result.averageRiskLevel + '%'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>

    );
}
export default User_Sanitary_Survay_Logs_Reports