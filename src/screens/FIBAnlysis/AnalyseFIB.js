import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import { fib_mst_details } from '../../Redux/fib_mst';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const FibAnalysis = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedFIB, setSelectedFIB] = useState('Select a FIB');
  const [referencePath, setReferencePath] = useState('');
  const [ratio, setRatio] = useState(0);
  const [estimatedCount, setEstimatedCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [roundedEstimatedCount, setRoundedEstimatedCount] = useState(0);
  const [IsCustomized, setIsCustomized] = useState(false);

  const fibData = {
    'E.coli': { referencePath: 'Campylobacter', ratio: 0.66, estimatedCount: 0 },
    'Coliform': { referencePath: 'Cryptosporidium', ratio: 1, estimatedCount: 0 },
    'Enterococcus': { referencePath: 'Campylobacter', ratio: 0.01, estimatedCount: 0 },
    'Clostridium': { referencePath: 'Giardia', ratio: 0.8, estimatedCount: 0 },
    'other': { referencePath: 'other', ratio: 0, estimatedCount: 0 }
  };

  useEffect(() => {
    calculateEstimatedCount();
  }, [userCount, ratio]);

  // Function to calculate estimated count
  const calculateEstimatedCount = () => {
    setIsCustomized(false)
    const count = parseInt(userCount, 10);
    if (referencePath === 'other') {
      setIsCustomized(true)
    }
    if (!isNaN(count)) {
      const estimated = count * ratio;
      setEstimatedCount(estimated);
      setRoundedEstimatedCount(Math.round(estimated)); // Round the estimated count
    } else {
      setEstimatedCount(0);
      setRoundedEstimatedCount(0);
    }
  };

  const sendValue = () => {

    if (referencePath === '') {
      return
    }
    if (referencePath === 'other') {
      if (referencePath === '' || ratio === 0) {
        return
      }
    }

    if (userCount === 0) {

      return
    }
    var fib_info = {
      indicator: referencePath,
      count_indicator: userCount,
      estimatedCount: roundedEstimatedCount,
      ratio: ratio,
      is_customized: IsCustomized,
      type:'fib'
    }
    dispatch(fib_mst_details(fib_info))
    navigate('/qmra')

  };

  const handleFibData = (fib) => {
    setSelectedFIB(fib);
    if (fibData[fib]) {
      setReferencePath(fibData[fib].referencePath);
      setRatio(fibData[fib].ratio);
      calculateEstimatedCount();
    } else {
      setReferencePath('');
      setRatio(0);
      setEstimatedCount(0);
    }
  };

  return (
    <div className='hero-all' >
      <Navbar2 />
      <div className='main-all'>
        <div className='content'>
          <Header />
          <div className='container-wrapper'>
            <div>
              <select
                className='form-select-lg mb-3'
                value={selectedFIB}
                onChange={(event) => handleFibData(event.target.value)}
              >
                <option value="" selected>Select an FIB Indicator</option>

                {Object.keys(fibData).map((fib) => (
                  <option key={fib} value={fib}>
                    {fib}
                  </option>
                ))}
              </select>
              <div className='table-responsive-lg d-flex justify-content-center'>


                <table className=' w-75'>
                  <tbody>
                    <tr>
                      <th scope='col'>Indicator</th>
                      <th scope='col'>Ratio</th>
                    </tr>
                    {referencePath !== 'other' && <tr>
                      <td >{referencePath}</td>
                      <td >{ratio}</td>
                    </tr>}
                    {referencePath === 'other' && <tr>
                      <td ><input type='text' placeholder='Indicator' onChange={(e) => setReferencePath(e.target.value)} style={{backgroundColor:"white"}} /></td>
                      <td ><input type='text' placeholder='Ratio' onChange={(e) => setRatio(e.target.value)} style={{backgroundColor:"white"}}/></td>
                    </tr>}
                  </tbody>
                </table>
              </div>
              <br></br>
              <p>Enter The Count:</p>
              <input
                className='sr-only'
                type="number"
                value={userCount}
                onChange={(event) => setUserCount(event.target.value)}
              />
              <p> Count: {estimatedCount} </p>
              <p>Estimated Count: {roundedEstimatedCount} </p>
            </div>
            <button onClick={sendValue}>Save Value</button>
          </div>
        </div>
      </div>
      <footer><Footer /></footer>
    </div>
  );
};

export default FibAnalysis;