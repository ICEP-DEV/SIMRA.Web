import React, { useEffect, useState } from 'react';
import './Survay_Report.css';
import axios from 'axios';
import AdminSideBar from '../Admin_Side_Bar/Admin_Side_Bar'
import { api } from "../../../Data/API";

function Survay_Report() {

  const [Provinces, setProvinces] = useState([])
  const [Report, setReport] = useState([])
  const [GetMonths, setGetMonths] = useState([])
  const [GetYears, setGetYears] = useState([])
  const [CurrentMonth, setCurrentMonth] = useState('')
  const [CurrentYear, setCurrentYear] = useState('')
  const [Province, setProvince] = useState('')
  const [FoundReport, setFoundReport] = useState(false)

  useEffect(() => {
    var date = new Date();
    function getDates() {
      var getMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      var getYears = []
      var year = date.getFullYear()
      // get months from 1 - 12
      // for (let k = 0; k < 12; k++) {

      //   getMonths.push((k + 1).toString().padStart(2, '0'))
      // }
      // get year from 2010 to current year
      for (let k = 2009; k < year; k++) {
        getYears.push(k + 1)
      }
      // set year and months to the states
      setGetYears(getYears)
      setGetMonths(getMonths)
      // set current year and month to the states
      setCurrentYear(year)
      setCurrentMonth(getMonths[date.getMonth()])
      //setCurrentMonth((date.getMonth()+1).toString().padStart(2, '0'))


    }

    axios.get(api+"get_provinces").then(response => {
      setProvinces(response.data.results)

    }, err => {
      console.log(err)
    })
    getDates()
  }, []);

  async function display_search_report() {
    var search_report = {
      province_id: Province,
      date: CurrentMonth + '/' + CurrentYear
    }
    var report_results = await axios.post(api+'get_monthly_reports', search_report)
    setReport(report_results.data.results)
    setFoundReport(report_results.data)
    console.log(report_results.data)
  }

  return (
    <div className='hero-all'>
      <div className='sidenav'>
        <AdminSideBar />
      </div>
      <div className='main-all'>
        <div className='content'>
          <div className='container-wrap'>
            <h2>Sanitary risk core (percentage and risk characterization rating)</h2>
            <div className='report-header'>
              <select value={CurrentYear} onChange={(e) => setCurrentYear(e.target.value)}>
                {GetYears.map((years, xid) => (
                  <option key={xid}>{years}</option>
                ))}
              </select>

              <select value={CurrentMonth} onChange={(e) => setCurrentMonth(e.target.value)}>
                {GetMonths.map((months, xid) => (
                  <option key={xid} value={months} >{months}</option>
                ))}
              </select>

                <select onChange={(e) => setProvince(e.target.value)}>
                  <option value=''>Province</option>
                  {Provinces.map((province, xid) => (
                    <option key={xid} value={province.province_id} >{province.province_name}</option>
                  ))}
                </select>
              <button onClick={display_search_report} className="btn btn-primary btn-search-report">Search</button>

            </div>



            <div className='reports'>
              {(FoundReport.success === true) && (<div >
                {Report.map((report, xid) => (
                  <div className='card-rows' key={xid}>
                    <div className='card'>
                      <div className='card-body'>
                        {/* Display colour based on average score % */}
                        {(report.total_avarage <= 25) && (
                          <div className='card-circle' style={{ backgroundColor: "rgba(0, 128, 0, 0.719)" }}><label className='sanitary_score'></label></div>)}
                        {(report.total_avarage >= 26 && report.total_avarage <= 50) && (
                          <div className='card-circle' style={{ backgroundColor: "rgba(255,255,0,1)" }}><label className='sanitary_score'></label></div>)}
                        {(report.total_avarage >= 51 && report.total_avarage <= 75) && (
                          <div className='card-circle' style={{ backgroundColor: "rgb(255,192,0,1)" }}><label className='sanitary_score'></label></div>)}
                        {(report.total_avarage >= 76) && (
                          <div className='card-circle' style={{ backgroundColor: "rgb(255,0,0,1)" }}><label className='sanitary_score'></label></div>)}

                        {/* Municipality name */}
                        <div className='municipal-name'>
                          {report.muni_name}<br/>({report.type})
                        </div>
                        <div>
                          <table>
                            <tr>
                              <td>Sanitary score</td>
                              <td>&nbsp; : {report.totalYes}</td>
                            </tr>
                            <tr>
                              <td>Sanitary score (%)</td>
                              <td>&nbsp; : {report.total_avarage}%</td>

                            </tr>
                            <tr>
                            <td>Risk Score Rating</td>
                              <td>&nbsp; : {report.risk_type}</td>
                            </tr>
                          </table>
                          
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>)}

              {(FoundReport.success === false) && (<div >
                <label>{FoundReport.message}</label>

              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Survay_Report;