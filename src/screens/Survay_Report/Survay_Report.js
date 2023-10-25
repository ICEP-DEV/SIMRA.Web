import React, { useEffect, useState } from 'react';
import './Survay_Report.css';
import axios from 'axios';
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';


function Survay_Report() {

  const [Provinces, setProvinces] = useState([])
  const [Report, setReport] = useState([])
  const [StoredReport, setStoredReport] = useState([])
  let [TotalRecord, setTotalRecord] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [FoundReport, setFoundReport] = useState(false)

  const api = "http://localhost:3001/api/"
  useEffect(() => {

    axios.get(api + 'get_survey_stats/2023-06-30/2023-10-25').then((response) => {
      setStoredReport(response.data.result)
      setReport(response.data.result)
      setFoundReport(response.data.success)
      setTotalRecord(response.data.result.length)
      console.log(response.data)
    })

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
    axios.get(api + 'get_survey_stats/' + startDate + '/' + endDate).then((response) => {
      setReport(response.data.result)
      setStoredReport(response.data.result)
      setFoundReport(response.data.success)
      setTotalRecord(response.data.result.length)
      console.log(response.data)
    })
  }

  function filter_by_province(_province) {
    console.log(_province)
    var temp_array = StoredReport
    var k = 0
    setReport(temp_array.filter(value => {
      k++
      return value.province_id.toLocaleLowerCase().includes(_province.toLocaleLowerCase())
    }))
    setTotalRecord(Report.length)
    console.log(k)
  }
  return (
    <div className='hero-all'>
      <Admin_NavBar />
      <div className='main-all'>
        <ToastContainer />
        <div className='content'>
          <Header />
          <div className='container-wrap'>
            <h2>Sanitary risk core (percentage and risk characterization rating)</h2>
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
              </div>
              <div id='stats_summary' style={{color:'black'}}>
                <h3>Total Records: {TotalRecord}</h3>
              </div>

            </div>



            <div className='reports'>
              {(FoundReport === true) && (<div >
                <table className="table survay_table">
                  <tr className="survey_tr">
                    <th className="survey_th">Municipalities</th>
                    <th className="survey_th">Date</th>
                    <th className="survey_th">Catchment Area</th>
                    <th className="survey_th">Total Average</th>
                    <th className="survey_th">Risk Type</th>
                  </tr>

                  {Report.map((report, xid) => (
                    <tr key={xid} className="survey_tr">
                      <td className="survey_td">{report.muni_name}</td>
                      <td className="survey_td">{report.created_date}</td>
                      <td className="survey_td">{report.type}</td>
                      <td className="survey_td">{report.total_avarage}</td>
                      <td className="survey_td">{report.risk_type}</td>
                    </tr>
                  ))}

                </table>
              </div>)}

              {(FoundReport.success === false) && (<div >
                <label>{FoundReport.message}</label>

              </div>)}
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

export default Survay_Report;