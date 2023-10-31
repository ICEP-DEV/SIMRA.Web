import './MST.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fib_mst_details } from '../../Redux/fib_mst';

const FibAnalysis = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const api = 'http://localhost:3001/api/'
  //const api = 'maker_genes'
  const [SelectedMaker, setSelectedMaker] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [Makers, setmakers] = useState([])
  const [Ratio, setRatio] = useState(0)
  const [Maker, setmaker] = useState()
  useEffect(() => {
    axios.get(api + 'maker_genes').then(response => {
      setmakers(response.data.makers)
    }, err => { console.log(err) })
  }, [])

  // Function to calculate estimated count
  const calculateEstimatedCount = () => {

  };

  useEffect(() => {
    calculateEstimatedCount();
  }, []);

  const handlemstselection = (makerno) => {
    setmaker(Makers[makerno].maker)
    setRatio(Makers[makerno].ratio)
    setSelectedMaker(Makers[makerno]);
  };

  function next_to_mst() {
    
    if (SelectedMaker.maker === 'other') {
      if(Ratio === 0 || Maker === ''){
        console.log(Ratio, Maker)
        return;
      }
      
    }
    if (userCount === 0) {

      return
    }

    var data = {
      maker: Maker,
      ratio: Ratio,
      count: userCount,
      type: 'mst'
    }
    dispatch(fib_mst_details(data))
    navigate('/qmra')
  }

  return (
    <div className='hero-all' >
      <Navbar />
      <div className='content'>
        <Header />
        <div className='container-wrapper'>
          <ToastContainer />
          <div>
            <p>Select an Maker Gene:</p>
            <select
              onChange={(event) => handlemstselection(event.target.value)} >
              <option value="">Select A Marker</option>
              {Makers.map((maker, xid) => (
                <option key={xid} value={xid}>
                  {maker.maker}
                </option>
              ))}
            </select>

            {/* <table>
              <tbody>
                <tr>
                  <th>MST Marker</th>
                  <th>Ratio</th>
                </tr>
                {SelectedMaker.maker !== 'other' && <tr>
                  <td>{SelectedMaker.maker}</td>
                  <td>{SelectedMaker.ratio}</td>
                </tr>}
                {SelectedMaker.maker === 'other' && <tr>
                  <td><input type='text' onClick={(event) => setSelectedMaker(event.target.value)} /> </td>
                  <td><input type='number' onClick={(event) => setRatio(event.target.value)} /> </td>
                </tr>}
              </tbody>
            </table> */}
            <div id='mst_content'>

            </div>
            <div><span></span>
              <label className='mst_label'>MST Marker</label>
              {SelectedMaker.maker !== 'other' && <input type='text' value={SelectedMaker.maker} disabled />}
              {SelectedMaker.maker === 'other' && <span><input type='text' onChange={(event) => setmaker(event.target.value)} /></span>}
            </div>
            <div>
              <label className='mst_label'>Ratio</label>
              {SelectedMaker.maker !== 'other' && <input type='text' value={SelectedMaker.ratio} disabled />}
              {SelectedMaker.maker === 'other' &&  <span><input type='number' onChange={(event) => setRatio(event.target.value)} /></span>}
            </div>
            <br></br>
            <p>Enter The Count:</p>
            <input
              type="number"
              value={userCount}
              onChange={(event) => setUserCount(event.target.value)}
            />
          </div>
          <button onClick={next_to_mst}>Next</button>
        </div>
      </div>
    </div>

  );
};

export default FibAnalysis;