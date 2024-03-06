import React, { useEffect, useState } from 'react';
import './User_Sanitary_Survay_Logs_Reports.css';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { api } from '../../Data/API'

import { CChart } from '@coreui/react-chartjs'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function User_Sanitary_Survay_Logs_Reports() {

    const [Provinces, setProvinces] = useState([])
    const [Report, setReport] = useState([])
    const [Municipalities, setMunicipalities] = useState([])
    const [StoredReport, setStoredReport] = useState([])
    let [TotalRecord, setTotalRecord] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [FoundReport, setFoundReport] = useState(false)
    const [UserId, setUserId] = useState(0)
    const [IsTable, setIsTable] = useState(true)
    const [IsVisual, setIsVisual] = useState(false)


    const [TotalVisualRiskCount, setTotalVisualRiskCount] = useState([])
    const [VisualColor, setVisualColor] = useState([])
    const [VisualRiskType, setVisualRiskType] = useState([])
    const [VisualRiskCount, setVisualRiskCount] = useState([])
    const [IsVisualPie, setIsVisualPie] = useState(true)
    const [IsVisualBar, setIsVisualBar] = useState(false)

    // Pagination
    const [CurrentPage, setCurrentPage] = useState(1)
    const record_per_page = 5
    const lastIndex = CurrentPage * record_per_page
    const firdIndex = lastIndex - record_per_page
    const record = Report.slice(firdIndex, lastIndex)
    // const number_of_pages = Math.ceil(record.length / record_per_page)
    // const number = [...Array(number_of_pages + 1).keys()].slice
    const PagePerNumber = []
    for (let i = 1; i <= Math.ceil(Report.length / record_per_page); i++) {
        PagePerNumber.push(i)
    }

    let user_info = useSelector((state) => state.user.value)

    useEffect(() => {
        var userId = user_info.userId
        setUserId(userId)
        axios.get(api + 'get_userhistory_sanitory/' + userId).then((response) => {
            setFoundReport(response.data.success)
            if (response.data.success === true) {
                setStoredReport(response.data.result)
                setReport(response.data.result)
                setTotalRecord(response.data.result.length)
                searchforcollection(response.data.result)
            }
        })
        /*
                axios.get(api + 'get_user_survey_stats_visual_byId/' + userId).then((response) => {
                    if (response.data.success) {
                        //Total Visualization
                        setTotalVisualColor(response.data.color)
                        setTotalVisualRiskType(response.data.risk_type)
                        setTotalVisualRiskCount(response.data.risk_count)
        
                        //Assigned for displaying Visualization
                        setVisualColor(response.data.color)
                        setVisualRiskType(response.data.risk_type)
                        setVisualRiskCount(response.data.risk_count)
                    }
                })
        */
        axios.get(api + "get_provinces").then(response => {
            setProvinces(response.data.results)

        }, err => {
            console.log(err)
        })
    }, [user_info.userId]);


    const permVisualColor = ["rgba(216, 0, 0, 0.986)", "rgb(201, 199, 105)", "rgba(255, 255, 0, 0.733)", "rgba(0, 128, 0, 0.719)"]
    const permVisualRiskType = ["Very High Risk", "High Risk", "Medium Risk", "Low Risk"]
    function searchforcollection(collection) {
        var veryHighCount = 0
        var highCount = 0
        var mediumCount = 0
        var lowCount = 0
        for (var k = 0; k < collection.length; k++) {
            if (collection[k].risk_type.toLocaleLowerCase() === "Very High Risk".toLocaleLowerCase()) {
                veryHighCount++;
            }
            else if (collection[k].risk_type.toLocaleLowerCase() === "High Risk".toLocaleLowerCase()) {
                highCount++;
            }
            else if (collection[k].risk_type.toLocaleLowerCase() === "Medium Risk".toLocaleLowerCase()) {
                mediumCount++;
            }
            else if (collection[k].risk_type.toLocaleLowerCase() === "Low Risk".toLocaleLowerCase()) {
                lowCount++;
            }
        }
        var tempCounts = []
        tempCounts.push(veryHighCount)
        tempCounts.push(highCount)
        tempCounts.push(mediumCount)
        tempCounts.push(lowCount)
        setTotalVisualRiskCount(tempCounts)
        setVisualRiskCount(tempCounts)
        setVisualColor(permVisualColor)
        setVisualRiskType(permVisualRiskType)
    }

    function selectAll() {
        setReport(StoredReport)
        setTotalRecord(StoredReport.length)
        setVisualColor(permVisualColor)
        setVisualRiskType(permVisualRiskType)
        setVisualRiskCount(TotalVisualRiskCount)
        console.log(TotalVisualRiskCount)
    }

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

        // Visualization
        axios.get(api + 'get_user_survey_stats_visual/' + startDate + '/' + endDate + '/' + UserId).then((response) => {
            console.log("second", response.data)

            if (response.data.success === true) {
                setVisualColor(response.data.color)
                setVisualRiskType(response.data.risk_type)
                setVisualRiskCount(response.data.risk_count)
            }
        })
    }


    function filter_by_province(_province) {
        var count = 0
        var temp_array = StoredReport
        if (_province !== '') {
            axios.get(api + "get_municipalities/" + _province).then(response => {
                setMunicipalities(response.data.results)

            }, err => {
                console.log(err)
            })
            setReport(temp_array.filter(value => {
                return value.province_id.toLocaleLowerCase().includes(_province.toLocaleLowerCase())
            }))
            searchforcollection(temp_array.filter(value => { return value.province_id.toLocaleLowerCase().includes(_province.toLocaleLowerCase()) }))
            for (var k = 0; k < StoredReport.length; k++) {
                if (StoredReport[k].province_id.toLocaleLowerCase() === _province.toLocaleLowerCase()) {
                    count++
                }
            }

            setTotalRecord(count)
        }
        else {
            selectAll()
        }

    }

    function filter_by_municipality(_muni) {
        var temp_array = StoredReport
        var count = 0

        if (_muni !== '') {
            setReport(temp_array.filter(value => {
                return value.muni_id.toLocaleLowerCase().includes(_muni.toLocaleLowerCase())
            }))

            searchforcollection(temp_array.filter(value => { return value.muni_id.toLocaleLowerCase().includes(_muni.toLocaleLowerCase()) }))

            for (var k = 0; k < Report.length; k++) {
                if (Report[k].muni_id.toLocaleLowerCase() === _muni.toLocaleLowerCase()) {
                    count++
                }
            }
            setTotalRecord(count)
        }
        else {
            selectAll()
        }

    }

    function search_by_weekday(day) {
        var temp_array = StoredReport
        var count = 0
        if (day !== '') {
            setReport(temp_array.filter(value => {
                return value.weekday.toLocaleLowerCase().includes(day.toLocaleLowerCase())
            }))

            searchforcollection(temp_array.filter(value => { return value.weekday.toLocaleLowerCase().includes(day.toLocaleLowerCase()) }))

            for (var k = 0; k < StoredReport.length; k++) {
                if (StoredReport[k].weekday.toLocaleLowerCase() === day.toLocaleLowerCase()) {
                    count++
                }
            }

            setTotalRecord(count)
        }

        else {
            selectAll()
        }
    }

    function catchmentArea(catchment) {
        var temp_array = StoredReport
        var count = 0
        if (catchment !== '') {
            setReport(temp_array.filter(value => {
                return value.type.toLocaleLowerCase().includes(catchment.toLocaleLowerCase())
            }))
            searchforcollection(temp_array.filter(value => { return value.type.toLocaleLowerCase().includes(catchment.toLocaleLowerCase()) }))

            for (var k = 0; k < StoredReport.length; k++) {
                if (StoredReport[k].type.toLocaleLowerCase() === catchment.toLocaleLowerCase()) {
                    count++
                }
            }

            setTotalRecord(count)
        }
        else {
            selectAll()
        }
    }

    function riskType(typeRisk) {
        var temp_array = StoredReport
        console.log(temp_array)
        var count = 0
        if (typeRisk !== '') {
            setReport(temp_array.filter(value => {
                return value.risk_type.toLocaleLowerCase() === typeRisk.toLocaleLowerCase()
            }))
            searchforcollection(temp_array.filter(value => { return value.risk_type.toLocaleLowerCase() === typeRisk.toLocaleLowerCase() }))

            for (var k = 0; k < StoredReport.length; k++) {
                if (StoredReport[k].risk_type.toLocaleLowerCase() === typeRisk.toLocaleLowerCase()) {
                    count++
                }
            }
            setTotalRecord(count)
        }
        else {
            selectAll()
        }
    }

    function setTotable() {
        setIsTable(true)
        setIsVisual(false)
    }

    function setToVisual() {
        setIsTable(false)
        setIsVisual(true)
    }

    function setToVisualPie() {
        setIsVisualBar(false)
        setIsVisualPie(true)
    }

    function setToVisualBar() {
        setIsVisualBar(true)
        setIsVisualPie(false)
    }

    //change page 
    const paginate = (page_number) => setCurrentPage(page_number)

    const risk_results = {
        labels: VisualRiskType,
        datasets: [{
            data: VisualRiskCount,
            backgroundColor: VisualColor
        }]
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
                                        <tr>

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
                                    <tr>

                                        <td className="w-25">
                                            <select onChange={(event) => search_by_weekday(event.target.value)} className="w-100 p-2">
                                                <option value='' disabled selected>All Weekdays</option>
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
                                                <option value='' disabled selected>All Provinces</option>
                                                {Provinces.map((province, xid) => (
                                                    <option key={xid} value={province.province_id} >{province.province_name}</option>
                                                ))}
                                            </select>

                                        </td>
                                        <td className="w-25">
                                            <select onChange={(e) => filter_by_municipality(e.target.value)} className="w-100 p-2" >
                                                <option value='' disabled selected>All Municipalities</option>
                                                {Municipalities.map((muni, xid) => (
                                                    <option key={xid} value={muni.muni_id} >{muni.muni_name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="w-25">
                                            <select onChange={(e) => catchmentArea(e.target.value)} className="w-100 p-2" >
                                                <option value='' disabled selected className="control-form">Select Water Source</option>
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
                                                <option value='' disabled selected  className="control-form">Select Risk Type</option>
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
                            <button className='btn btn-success btn-option' disabled={IsTable} onClick={setTotable}>Table</button>
                            <button className='btn btn-primary btn-option' disabled={IsVisual} onClick={setToVisual}>Visual</button>

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

                            {IsVisual &&
                                < div className='visuals'>
                                    <br />
                                    <button className='btn btn-success btn-option' disabled={IsVisualPie} onClick={setToVisualPie}>Pie Chart</button>
                                    <button className='btn btn-primary btn-option' disabled={IsVisualBar} onClick={setToVisualBar}>Graph Bar</button>
                                    <div className='visual'>
                                        <div className='display-graph'>
                                            {IsVisualPie && <Pie data={risk_results} />}
                                            {IsVisualBar && <CChart
                                                type="bar"
                                                data={{
                                                    labels: VisualRiskType,
                                                    datasets: [
                                                        {
                                                            label: 'Risk Results',
                                                            backgroundColor: VisualColor,
                                                            data: VisualRiskCount,
                                                        },
                                                    ],
                                                }}
                                                labels="Risk Results"
                                            />}
                                        </div>
                                        <div className='info-display'>
                                            {VisualRiskCount.map((visual, xid) => (
                                                <div className='results-info' key={xid}>
                                                    <tr >
                                                        <td id='color_circle' style={{ backgroundColor: VisualColor[xid] }}></td>&nbsp;
                                                        <td>{VisualRiskType[xid]}</td>
                                                        <td>{visual}</td>
                                                    </tr>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
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