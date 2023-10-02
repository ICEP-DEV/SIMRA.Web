import React, { useEffect, useState } from 'react';
import './Report.css';
import axios from 'axios';
import AdminSideBar from '../../Admin_Side_Bar/Admin_Side_Bar'

function ReportTable() {

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

    axios.get("http://localhost:3001/api/get_provinces").then(response => {
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
    var report_results = await axios.post('http://localhost:3001/api/get_monthly_reports', search_report)
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
          <div className='container-wrapper'>
            <div className='date'>
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
            </div>

            <div className='province'>
              <select onChange={(e) => setProvince(e.target.value)}>
                {Provinces.map((province, xid) => (
                  <option key={xid} value={province.province_id} >{province.province_name}</option>
                ))}
              </select>
            </div>
            <div><button onClick={display_search_report} className="btn btn-primary">Search</button></div>


            <div className='reports'>
              {(FoundReport.success === true) && (<div >
                {Report.map((report, xid) => (
                  <div className='card' key={xid}>
                    <div className='card-body'>
                      {/* Display colour based on average score % */}
                      {(report.total_avarage <= 25) && (
                      <div className='card-circle' style={{backgroundColor:"rgba(0, 128, 0, 0.719)"}}><label className='sanitary_score'>{report.total_avarage}%</label></div>)}
                      {(report.total_avarage >= 26 && report.total_avarage <= 50) && (
                      <div className='card-circle' style={{backgroundColor:"rgba(255, 255, 0, 0.733)"}}><label className='sanitary_score'>{report.total_avarage}%</label></div>)}
                      {(report.total_avarage >= 51 && report.total_avarage <= 75) && (
                      <div className='card-circle' style={{backgroundColor:"rgb(201, 199, 105)"}}><label className='sanitary_score'>{report.total_avarage}%</label></div>)}
                      {(report.total_avarage >= 76) && (
                      <div className='card-circle' style={{backgroundColor:"rgb(201, 199, 105)"}}><label className='sanitary_score'>{report.total_avarage}%</label></div>)}

                      {/* Municipality name */}
                      <div>
                        <label className='catchment'>Catchment and Source:</label><br/>
                        {report.muni_name}({report.type})
                        </div>
                      <div>
                        <label className='risk_type'>Risk Type:</label><br/>
                        {report.risk_type}</div>
                    </div>
                  </div>
                ))}
              </div>)}
              
              {(FoundReport.success === false) && (<div >
                <label>{FoundReport.message}</label>

              </div>)}


            </div>
            {/* <table className="report">
              <thead className='tableHead'>
                <tr>
                  <th className="thh">Municipality(Source)</th>
                  {Report.map((report, xid) => {
                    <th className="thh" key={xid}>{report.muni_name}</th>
                  })}
                </tr>
              </thead>

              <tbody className='tableData'>
                <tr>
                  <td>Sanitary Score</td>
                  {Report.map((report, xid) => {
                    // <td key={xid}>{report}</td>
                  })}
                </tr>
                <tr>
                  <td>Score Percentage</td>
                  {Report.map((report, xid) => {
                    <td key={xid}>{report.total_avarage}%</td>
                  })}
                </tr>
                <tr>
                  <td>Risk Rating</td>
                  {Report.map((report, xid) => {
                    <td key={xid}>{report.risk_type}</td>
                  })}
                </tr>
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default ReportTable;
