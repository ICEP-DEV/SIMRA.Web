import './AnalyseFIB.css'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import { fib_mst_details } from '../../Redux/fib_mst';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { api } from '../../Data/API'
import axios from 'axios';


const FibAnalysis = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedFIB, setSelectedFIB] = useState('Select a FIB');
  const [ReferencePath, setReferencePath] = useState([]);
  const [Ratio, setRatio] = useState(0);
  const [estimatedCount, setEstimatedCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [roundedEstimatedCount, setRoundedEstimatedCount] = useState(0);
  const [IsCustomized, setIsCustomized] = useState(false);
  const [FIB, setFIB] = useState('')
  const [FIBs, setFIBs] = useState([])

  useEffect(() => {

    axios.get(api + 'indicators').then(response => {
      console.log(response.data.indicators)
      setFIBs(response.data.indicators)
    }, error => {
      console.log(error)
    })
  }, [userCount, Ratio]);

  const handlemstselection = (makerno) => {
    setIsCustomized(false)
    console.log(FIBs[makerno].pathogen)
    setReferencePath(FIBs[makerno].pathogen)
    setFIB(FIBs[makerno].indicator)
    setRatio(FIBs[makerno].ratio)
    setSelectedFIB(FIBs[makerno]);
    if (FIBs[makerno].indicator.toLocaleLowerCase() === 'Other'.toLocaleLowerCase()) {
      setIsCustomized(true)

    }
  };

  function next_to_qmra() {

    if (setSelectedFIB.maker === 'other') {
      if (Ratio === 0 || FIB === '') {
        console.log(Ratio, FIB)
        return;
      }

    }
    if (userCount === 0) {

      return
    }

    var data = {
      maker: FIB,
      ratio: Ratio,
      count: userCount,
      type: 'mst',
      estimated_count: Ratio * userCount,
      is_customized_mst: IsCustomized
    }
    dispatch(fib_mst_details(data))
    //navigate('/qmra')
  }

  return (
    <div className='hero-all' >
      <Navbar />
      <div className='content'>
        <h2 className='text-primary text-center'>FIB</h2>
        <Header />
        <div>
          <div className='container-wrapper'>
            <ToastContainer />
            <div id='fib_section'>
              <div className='fib_selection'>
                <label className='fib_selection_label'> Select an FIB</label>
                <select
                  className='form-select-lg mb-3 mt-5'
                  onChange={(event) => handlemstselection(event.target.value)} >
                  <option value="">Select FIB</option>
                  {FIBs.map((fib, xid) => (
                    <option key={xid} value={xid}>
                      {fib.indicator}
                    </option>
                  ))}
                </select>
              </div>
              <div className='reference_selection'>
                <label className='reference_selection_label'>Reference Pathogen</label>
                {selectedFIB.indicator !== 'Other' && <select
                  className='form-select-lg mb-3 mt-5'
                  onChange={(event) => handlemstselection(event.target.value)} >
                  <option value="">Select FIB</option>
                  {ReferencePath.map((pathogen, xid) => (
                    <option key={xid} value={xid}>
                      {pathogen.path_name}
                    </option>
                  ))}
                </select>}
                {selectedFIB.indicator === 'Other' && <span>
                  <input type='text' placeholder='Refernce Pathogen' onChange={(event) => setFIB(event.target.value)} />
                  <input type='text' placeholder='' onChange={(event) => setFIB(event.target.value)} />
                </span>}
              </div>



              <div id='mst_content'>

              </div>
              <div><span></span>
                <label className='mst_label'>FIB</label>
                {selectedFIB.indicator !== 'Other' && <input className='mt-2' type='text' value={selectedFIB.maker} disabled />}
                {selectedFIB.indicator === 'Other' && <span><input type='text' onChange={(event) => setFIB(event.target.value)} /></span>}
              </div>
              <div>
                <label className='mst_label'>Ratio</label>
                {selectedFIB.indicator !== 'Other' && <input className='mt-2' type='text' value={selectedFIB.ratio} disabled />}
                {selectedFIB.indicator === 'Other' && <span><input className='mt-2' type='number' onChange={(event) => setRatio(event.target.value)} /></span>}
              </div>
              <br></br>
              <p>Enter The Count:</p>
              <input
                type="number"
                value={userCount}
                onChange={(event) => setUserCount(event.target.value)}
              />
            </div>
            <button className='btn btn-success w-25 mt-4' onClick={next_to_qmra}>Next</button>
          </div>
        </div>


      </div>
      <footer><Footer /></footer>
    </div>
  );
};

export default FibAnalysis;