import './User_MST_Logs.css'
import axios from 'axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { api } from '../../Data/API';

import { CChart } from '@coreui/react-chartjs'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function User_MST_Logs() {
  let user_info = useSelector((state) => state.user.value)

  const [Provinces, setProvinces] = useState([])
  const [Report, setReport] = useState([])
  const [Municipalities, setMunicipalities] = useState([])
  const [Markers, setMarkers] = useState([])
  const [StoredReport, setStoredReport] = useState([])
  let [TotalRecord, setTotalRecord] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [FoundReport, setFoundReport] = useState(false)
  const [UserId, setUserId] = useState('')
  const [IsTable, setIsTable] = useState(true)
  const [IsVisual, setIsVisual] = useState(false)
  const [TotalVisualColor, setTotalVisualColor] = useState([])
  const [TotalVisualRiskType, setTotalVisualRiskType] = useState([])
  const [TotalVisualRiskCount, setTotalVisualRiskCount] = useState([])
  const [VisualColor, setVisualColor] = useState([])
  const [VisualRiskType, setVisualRiskType] = useState([])
  const [VisualMarkerType, setMarkerRiskType] = useState([])
  const [VisualRiskCount, setVisualRiskCount] = useState([])
  const [IsVisualPie, setIsVisualPie] = useState(true)
  const [IsVisualBar, setIsVisualBar] = useState(false)
  const [VisualColors, setVisualColors] = useState([])
  const [VisualRiskTypes, setVisualRiskTypes] = useState([])
  const [VisualRiskCounts, setVisualRiskCounts] = useState([])

  // Pagination
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
    axios.get(api + 'mst_results/' + userId).then((response) => {

      if (response.data.success === true) {
        setFoundReport(response.data.success)
        setStoredReport(response.data.results)
        setReport(response.data.results)
        setTotalRecord(response.data.results.length)

        searchforcollection(response.data.results)
      }
    })

    axios.get(api + 'get_provinces').then(response => {//store provinces
      setProvinces(response.data.results)

    }, err => {
      console.log(err)
    })

    axios.get(api + 'maker_genes').then(response => {//store markers
      setMarkers(response.data.makers)



    }, err => {
      console.log(err)
    })


  }, []);

  ///pop up toast
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
    console.log(startDate, endDate)
    axios.get(api + 'mst_results/' + startDate + '/' + endDate + '/' + UserId).then((response) => {
      setTotalRecord(0)
      setFoundReport(response.data.success)
      if (response.data.success === true) {
        setStoredReport(response.data.results)
        setReport(response.data.results)
        setTotalRecord(response.data.results.length)
      }
    })
  }

  ///vsiuals
  const permVisualColors = ["red", "green"]
  const permVisualRiskTypes = ["Risk", "Low Risk"]
  const permVisualColor = ["black", "white", "red", "green", "yellow", "orange"]
  const permVisualRiskType = ["BacCow(Cow)", "CyTB(Chicken)", "Pig-2-Bac(Pig)", "BacCan(Dog)", "BacHum(Human)", "Other"]
  function searchforcollection(collection) {
    var riskCount = 0;
    var noRiskCount = 0;
    var totalPerc = [];
    var Count = 0;
    var BacCowCount = 0;
    var otherCount = 0;
    var CyTBCount = 0;
    var Pig_2_BacCount = 0;
    var BacCanCount = 0;
    var BacHumCount = 0;
    for (var k = 0; k < collection.length; k++) {
      if (collection[k].maker.toLocaleLowerCase() === "BacCow".toLocaleLowerCase()) {
        BacCowCount++;
      }
      else if (collection[k].maker.toLocaleLowerCase() === "CyTB".toLocaleLowerCase()) {
        CyTBCount++;
      }
      else if (collection[k].maker.toLocaleLowerCase() === "Pig-2-Bac".toLocaleLowerCase()) {
        Pig_2_BacCount++;
      }
      else if (collection[k].maker.toLocaleLowerCase() === "BacCan".toLocaleLowerCase()) {
        BacCanCount++;
      }
      else if (collection[k].maker.toLocaleLowerCase() === "BacHum".toLocaleLowerCase()) {
        BacHumCount++;
      }
      else {
        otherCount++;
      }

    }

    for (var k = 0; k < collection.length; k++) {
      if (Math.round(collection[k].probability_of_infection) < 1) {
        noRiskCount++;
      }
      else {
        riskCount++;
      }

    }
    //for risk
    var tempRiskCounts = []
    tempRiskCounts.push(riskCount)
    tempRiskCounts.push(noRiskCount)
    setVisualRiskCounts(tempRiskCounts)
    setVisualColors(permVisualColors)
    setVisualRiskTypes(permVisualRiskTypes)

    //for marker

    var total = BacCowCount + CyTBCount + Pig_2_BacCount + BacCanCount + BacHumCount + otherCount;
    var tempCounts = []
    tempCounts.push(BacCowCount)
    tempCounts.push(CyTBCount)
    tempCounts.push(Pig_2_BacCount)
    tempCounts.push(BacCanCount)
    tempCounts.push(BacHumCount)
    tempCounts.push(otherCount)

    totalPerc.push((BacCowCount / total) * 100)
    totalPerc.push((CyTBCount / total) * 100)
    totalPerc.push((Pig_2_BacCount / total) * 100)
    totalPerc.push((BacCanCount / total) * 100)
    totalPerc.push((BacHumCount / total) * 100)
    totalPerc.push((otherCount / total) * 100)




    setMarkerRiskType(totalPerc)
    setVisualRiskCount(tempCounts)
    setVisualColor(permVisualColor)
    setVisualRiskType(permVisualRiskType)
  }

  function selectAll() {
    setReport(StoredReport)
    setTotalRecord(StoredReport.length)
    setVisualColor(TotalVisualColor)
    setVisualRiskType(TotalVisualRiskType)
    setVisualRiskCount(TotalVisualRiskCount)
  }
  //filter by province
  function filter_by_province(_province) {
    var count = 0
    var temp_array = StoredReport
    if (_province !== '') {
      axios.get(api + 'get_municipalities/' + _province).then(response => {//get municipality
        setMunicipalities(response.data.results)

      }, err => {
        console.log(err)
      })
      setReport(temp_array.filter(value => {
        return value.province_id.toLocaleLowerCase().includes(_province.toLocaleLowerCase())//filter with province selected
      }))

      searchforcollection(temp_array.filter(value => {
        return value.province_id?.toLocaleLowerCase().includes(_province?.toLocaleLowerCase())
      }))
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
  //filter by municipal
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
  //filter by weekday
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
  //filter by marker
  function search_by_marker(marker) {
    var temp_array = StoredReport
    var count = 0
    if (marker !== '') {
      setReport(temp_array.filter(value => {
        return value.maker.toLocaleLowerCase().includes(marker.toLocaleLowerCase())
      }))
      for (var k = 0; k < StoredReport.length; k++) {
        if (StoredReport[k].maker.toLocaleLowerCase() === marker.toLocaleLowerCase()) {
          count++
        }
      }
      setTotalRecord(count)
    }
    else {
      setReport(StoredReport)
    }
  }

  const risk_results = {
    labels: VisualRiskType,
    datasets: [{
      data: VisualMarkerType,
      backgroundColor: VisualColor
    }]
  }

  const risk_result = {
    labels: VisualRiskTypes,
    datasets: [{
      data: VisualRiskCounts,
      backgroundColor: VisualColors
    }]
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

  const paginate = (page_number) => setCurrentPage(page_number)
  return (
    <div className='hero-all'>
      <Navbar />
      <div className='main-all'>
        <ToastContainer />
        <div className='content text-center'>
          <Header />
          <h2 className='text-primary text-center'>MICROBIAL SOURCE TRACKING(MST) Logs</h2>


          <div className='report-header  '>
            <div id='search_date ' >
              <table className="table-logs table table-bordered w-75">
                <thead className='thead-dark'>
                  <tr>

                    <th scope="col " className='report-heading'>Start Date</th>
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

            <table className="table-logs table table-bordered w-75 ">
              <thead className='thead-dark'>
                <tr>

                  <th scope="col " className='report-heading'>WeekDays</th>
                  <th scope="col" className='report-heading'>Province</th>
                  <th scope='col' className='report-heading'>Municipalities</th>
                  <th scope='col' className='report-heading'>Marker Gene</th>

                </tr>
              </thead>
              <tbody>
                <tr scope="row">

                  <td className="w-25">  {/*set data in dropdown to filter by weekdays */}
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
                  </td>      {/*set data in dropdown to filter by province */}
                  <td className="w-25">
                    <select onChange={(e) => filter_by_province(e.target.value)} className="w-100 p-2">
                      <option value='' disabled selected>All Provinces</option>
                      {Provinces.map((province, xid) => (
                        <option key={xid} value={province.province_id} >{province.province_name}</option>
                      ))}
                    </select>

                  </td>
                  <td className="w-25"> {/*set data in dropdown to filter by municipal */}
                    <select onChange={(e) => filter_by_municipality(e.target.value)} className="w-100 p-2" >
                      <option value='' disabled selected>All Municipalities</option>
                      {Municipalities.map((muni, xid) => (
                        <option key={xid} value={muni.muni_id} >{muni.muni_name}</option>
                      ))}
                    </select>
                  </td>

                  {/*set data in dropdown to filter by maker */}

                  <td className="w-25">
                    <select onChange={(e) => search_by_marker(e.target.value)} className="w-100 p-2" >
                      <option value='' disabled selected>All Markers</option>
                      {Markers.map((maker, xid) => (
                        <option key={xid} value={maker.mst_id} >{maker.maker}</option>
                      ))}
                    </select>
                  </td>
                </tr>


              </tbody>
            </table>
            <div id='stats_summary' className=' text-primary mt-5' >
              <h3>Total Records: {TotalRecord}</h3>
            </div>

          </div>

          <div className='reports'>     {/* table head*/}
            <button className='btn btn-success btn-option' disabled={IsTable} onClick={setTotable}>Table</button>
            <button className='btn btn-primary btn-option' disabled={IsVisual} onClick={setToVisual}>Visual</button>
            {IsTable && <>
              {(FoundReport === true) && (
                <table className="table survay_table">
                  <tr className="survey_tr">
                    <th className="survey_th _th">Municipalities</th>
                    <th className="survey_th">Date</th>
                    <th className="survey_th ">Marker gene</th>
                    <th className="survey_th ">Estimated Count</th>
                    <th className="survey_th ">Pathogen</th>
                    <th className="survey_th ">probability</th>
                    <th className="survey_th ">Likelihood</th>
                  </tr>
                  {/* display results */}
                  {record.map((report, xid) => (
                    <tr key={xid} className="survey_tr" scope="row">
                      <td className="survey_td _td">{report.muni_name}</td>
                      <td className="survey_td">{report.sample_date}</td>
                      <td className="survey_td">{report.maker}</td>
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
              {(FoundReport.success === false) && (<div >
                <label>{FoundReport.message}</label>

              </div>)}
            </>}
            {IsVisual &&
              < div className='visuals'>
                <br />
                <button className='btn btn-success btn-option' disabled={IsVisualPie} onClick={setToVisualPie}>Pie Chart</button>
                <button className='btn btn-primary btn-option' disabled={IsVisualBar} onClick={setToVisualBar}>Graph Bar</button>
                <div className='visual'>
                  <div className='display-graph'>
                    {IsVisualPie && <Pie data={risk_results} />}
                    <br></br>
                    {IsVisualPie && <Pie data={risk_result} />}

                    {IsVisualBar && <CChart
                      type="bar"
                      data={{
                        labels: VisualRiskType,
                        datasets: [
                          {
                            label: 'Marker Results',
                            backgroundColor: VisualColor,
                            data: VisualRiskCount,
                          },
                        ],
                      }}
                      labels="Marker Results"
                    //style={{ height: '800px' }}
                    />}
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    {IsVisualBar && <CChart
                      type="bar"
                      data={{
                        labels: VisualRiskTypes,
                        datasets: [
                          {
                            label: 'RiskResults',
                            backgroundColor: VisualColors,
                            data: VisualRiskCounts,
                          },
                        ],
                      }}
                      labels="Risk Results"
                    //style={{ height: '800px' }}
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
                    <br></br>
                    <br></br>




                    {VisualRiskCounts.map((visuals, xid) => (
                      <div className='Risk results-info' key={xid}>
                        <tr >
                          <td id='color_circle' style={{ backgroundColor: VisualColors[xid] }}></td>&nbsp;
                          <td>{VisualRiskTypes[xid]}</td>
                          <td>{visuals}</td>

                        </tr>
                      </div>

                    ))}
                    <br></br>
                    <br></br>

                  </div>

                </div>
              </div>
            }

          </div>

        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default User_MST_Logs;