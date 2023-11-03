import React, { useEffect, useState } from 'react';
import './Report.css';
import axios from 'axios';
import Admin_Side_Bar from '../Admin_Side_Bar/Admin_Side_Bar'

function ReportTable() {

  const [Province, setProvince] = useState([])
  const [ReportData, setReportData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/api/get_provinces").then(response => {
      setProvince(response.data.results)

    }, err => {
      console.log(err)
    })
  }, [Province]);

  return (
    <div className="body">
      <div className="content">
        <div className="left">
          <Admin_Side_Bar />
        </div>
        <div className="container">


          <div>
            <div>
              <div className=''>
                <label>year</label>
                <label>month</label>
              </div>
              <div>
                <select >
                  {Province.map((report, xid) => (
                    <option key={xid} value={report.province_id}>{report.province_name}</option>
                  ))}
                </select>
              </div>

            </div>
            <table className="report">
              <thead className='tableHead'>
                <tr>
                  {/*  */}
                  <th className="thh">Municipality(Source)</th>
                  <th className="thh">Thembisile Hani (Vlaaglagte Dam)</th>
                  <th className="thh">Dr JS Moroka (Witbank Dam)</th>
                  <th className="thh">Dr ND Zuma (Tugela Fury River)</th>
                  <th className="thh">Tshidzini (Ngwedi River)</th>
                  <th className="thh">Maniini (Livuvhu)</th>
                  <th className="thh">King Dalinyebo (Kwageza River)</th>
                </tr>
              </thead>
              <tbody className='tableData'>
                <tr>
                  <td>Sanitary Score</td>
                  <td>2</td>
                  <td>3</td>
                  <td>1</td>
                  <td>2</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>Score Percentage</td>
                  <td>42%</td>
                  <td>70%</td>
                  <td>10%</td>
                  <td>42%</td>
                  <td>75%</td>
                  <td>90%</td>
                </tr>
                <tr>
                  <td>Risk Rating</td>
                  <td>Medium Risk</td>
                  <td>High Risk</td>
                  <td>Low Risk</td>
                  <td>Medium Risk</td>
                  <td>High Risk</td>
                  <td>Very High Risk</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>



  );
}

export default ReportTable;
