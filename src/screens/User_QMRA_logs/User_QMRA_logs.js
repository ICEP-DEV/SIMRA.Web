import './User_QMRA_logs.css'
import axios from 'axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

function User_QMRA_logs() {
    const api = "http://localhost:3001/api/"

    let user_info = useSelector((state) => state.user.value)

    const [Provinces, setProvinces] = useState([])
    const [Report, setReport] = useState([])
    const [Municipalities, setMunicipalities] = useState([])
    const [StoredReport, setStoredReport] = useState([])
    let [TotalRecord, setTotalRecord] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [FoundReport, setFoundReport] = useState(false)
    const [UserId, setUserId] = useState('')

    const [CurrentPage, setCurrentPage] = useState(1)
    const record_per_page = 5
    const lastIndex = CurrentPage * record_per_page
    const firdIndex = lastIndex - record_per_page
    const record = Report.slice(firdIndex, lastIndex)
    const number_of_pages = Math.ceil(record.length / record_per_page)
    const number = [...Array(number_of_pages + 1).keys()].slice
    const PagePerNumber = []
    for (let i = 1; i <= Math.ceil(Report.length / record_per_page); i++) {
        PagePerNumber.push(i)
    }


    useEffect(() => {
        var userId = user_info.userId
        setUserId(userId)
        axios.get(api + 'user_qmra_results/' + userId).then((response) => {
            setFoundReport(response.data.success)
            if (response.data.success === true) {
                setStoredReport(response.data.results)
                setReport(response.data.results)
                setTotalRecord(response.data.results.length)
            }
        })

        axios.get(api + "get_provinces").then(response => {
            setProvinces(response.data.results)

        }, err => {
            console.log(err)
        })


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
        console.log(api + 'user_qmra_results/' + startDate + '/' + endDate + '/' + UserId)

        axios.get(api + 'user_qmra_results/' + startDate + '/' + endDate + '/' + UserId).then((response) => {
            setTotalRecord(0)
            setFoundReport(response.data.success)
            if (response.data.success === true) {
                setStoredReport(response.data.results)
                setReport(response.data.results)
                setTotalRecord(response.data.results.length)
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


    const paginate = (page_number) => setCurrentPage(page_number)
    return (
        <div className='hero-all'>
            <Navbar />
            <div className='main-all'>
                <ToastContainer />
                <div className='content'>
                    <Header />
                    <h2 className='text-primary text-center'>QMRA Logs</h2>
                    <div className='container-wrap'>
                   
                        <div className='report-header'>
                            <div id='search_date'>
                                <span className='survey_date'>
                                    <label className='survey_date_label ' >From: </label>
                                    <input type='date' className='control-from  start_date' onChange={(event) => setStartDate(event.target.value)} />
                                </span>
                                <span className='survey_date'>
                                    <label className='survey_date_label'>To: </label>
                                    <input type='date' className='control-from end_date' onChange={(event) => setEndDate(event.target.value)} />
                                </span>

                                <button onClick={display_search_report} className="btn btn-success btn-search-report mb-3 w-25">Show Results</button>

                            </div>
                            <div className=''>
                                <span className='survey_province '>
                                    {/* <label>WeekDays</label> */}
                                    <select className='bs-success-border-subtle select-province' onChange={(event) => search_by_weekday(event.target.value)}>
                                        <option value=''>All Weekdays</option>
                                        <option value='Monday'>Monday</option>
                                        <option value='Tuesday'>Tuesday</option>
                                        <option value='Wednesday'>Wednesday</option>
                                        <option value='Thursday'>Thursday</option>
                                        <option value='Friday'>Friday</option>
                                        <option value='Saturday'>Saturday</option>
                                        <option value='Sunday'>Sunday</option>
                                    </select></span>
                                {/* <input type='checkbox' onChange={(event) => checkForUserInfo(event.target.checked)} /> */}
                            </div>
                            <div className=' mb-3'>
                            <div id='filter_by_province '>
                                <span className='survey_province mt-2'>
                                    {/* <label>Province</label> */}
                                    <select onChange={(e) => filter_by_province(e.target.value)}>
                                        <option value=''>All Provinces</option>
                                        {Provinces.map((province, xid) => (
                                            <option key={xid} value={province.province_id} >{province.province_name}</option>
                                        ))}
                                    </select>
                                </span>
                                <span className='survey_province '>
                                    {/* <label>Municipalities</label> */}
                                    <select onChange={(e) => filter_by_municipality(e.target.value)}>
                                        <option value=''>All Municipalities</option>
                                        {Municipalities.map((muni, xid) => (
                                            <option key={xid} value={muni.muni_id} >{muni.muni_name}</option>
                                        ))}
                                    </select>
                                </span>
                            </div>
                            <div id='stats_summary' >
                                <h3 className='text-primary'>Total Records: {TotalRecord}</h3>
                            </div>

                        </div>
                        </div>
                        
                        <div className='reports'>
                            {(FoundReport === true) && (
                                <table className="table survay_table ">
                                    <tr className="survey_tr">
                                        <th scope="col"className="survey_th _th">Municipalities</th>
                                        <th  scope="col" className="survey_th">Date</th>
                                        <th   scope="col" className="survey_th ">Indicator</th>
                                        <th  scope="col" className="survey_th ">Pathogen</th>
                                        <th  scope="col" className="survey_th ">Estimated Count</th>
                                        <th  scope="col" className="survey_th ">probability</th>
                                        <th   scope="col" className="survey_th ">Likelihood</th>
                                    </tr>

                                    {record.map((report, xid) => (
                                        <tr key={xid} className="survey_tr" scope="row">
                                            <td className="survey_td _td">{report.muni_name}</td>
                                            <td className="survey_td">{report.sample_date}</td>
                                            <td className="survey_td">{report.indicator}</td>
                                            <td className="survey_td">{report.estimated_count}</td>
                                            <td className="survey_td">{report.pathogen}</td>
                                            <td className="survey_td">{report.probability_of_infection}</td>
                                            <td className="survey_td">{report.likelihood_of_infection}</td>
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


                            {/* {(FoundReport.success === false) && (<div >
                <label>{FoundReport.message}</label>

              </div>)} */}
                       
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

export default User_QMRA_logs;