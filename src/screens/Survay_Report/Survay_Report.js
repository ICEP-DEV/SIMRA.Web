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
  const [Municipalities, setMunicipalities] = useState([])
  const [StoredReport, setStoredReport] = useState([])
  let [TotalRecord, setTotalRecord] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [FoundReport, setFoundReport] = useState(false)

  const api = "http://localhost:3001/api/"
  useEffect(() => {
    var date = new Date()
    var current_date = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    axios.get(api + 'get_survey_stats/2023-06-30/' + current_date.toString()).then((response) => {
      setFoundReport(response.data.success)
      if (response.data.success === true) {
          setReport(response.data.result)
          setStoredReport(response.data.result)
          setTotalRecord(response.data.result.length)
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
    axios.get(api + 'get_survey_stats/' + startDate + '/' + endDate).then((response) => {
      setTotalRecord(0)
      if (response.data.success === true) {
        setStoredReport(response.data.result)
        setReport(response.data.result)
        setFoundReport(response.data.success)
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
    <div className='hero-all'>
      <Admin_NavBar />
      <div className='main-all'>
        <ToastContainer />
        <div className='content'>
          <Header />
          <h2>Sanitary risk core (percentage and risk characterization rating)</h2>
          <div className='container-wrap'>
           
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
                  {/* <label>Province</label> */}
                  <select onChange={(e) => filter_by_province(e.target.value)}>
                    <option value=''>Province</option>
                    {Provinces.map((province, xid) => (
                      <option key={xid} value={province.province_id} >{province.province_name}</option>
                    ))}
                  </select>
                </span>
                <span className='survey_province'>
                  {/* <label>Municipalities</label> */}
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
            
            <div className='reports'>
              {(FoundReport === true) && (
                <table className="table survay_table">
                  <thead class="thead-dark">
                  <tr className="survey_tr">
                    <th className="survey_th _th">Municipalities</th>
                    <th className="survey_th">Date</th>
                    <th className="survey_th ">Catchment Area</th>
                    <th className="survey_th ">Total Average</th>
                    <th className="survey_th ">Risk Type</th>
                  </tr>
                  </thead>
                  {Report.map((report, xid) => (
                    <tr key={xid} className="survey_tr" scope="row">
                      <td className="survey_td _td">{report.muni_name}</td>
                      <td className="survey_td">{report.created_date}</td>
                      <td className="survey_td">{report.type}</td>
                      <td className="survey_td">{report.total_avarage}</td>
                      <td className="survey_td">{report.risk_type}</td>
                    </tr>
                  ))}
                </table>
              )}

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

  );
}

export default Survay_Report;