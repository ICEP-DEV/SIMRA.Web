import React, { useEffect, useState } from 'react';
import './Report.css';
import axios from 'axios';
import AdminSideBar from '../../Admin_Side_Bar/Admin_Side_Bar'

function ReportTable() {

  const [Provinces, setProvinces] = useState([])
  let [Reports, setReports] = useState([])
  const [GetMonths, setGetMonths] = useState([])
  const [GetYears, setGetYears] = useState([])
  const [CurrentMonth, setCurrentMonth] = useState('')
  const [CurrentYear, setCurrentYear] = useState('')
  const [Province, setProvince] = useState('')

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
    console.log(search_report)
    var report_results = await axios.post('http://localhost:3001/api/get_monthly_reports', search_report)
    setReports(report_results.data.results)
    console.log(Reports)
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
            <div><button onClick={display_search_report}>Search</button></div>


            <div className='reports'>
              <div className='cards'>
                {Reports.map((report, xid) => (
                  <div key={xid}>
                    <label>jhdsjhdjhd</label>
                    <div>muni {report.muni_name}</div>
                  </div>
                ))}
              </div>
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
