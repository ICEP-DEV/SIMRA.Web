import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../Header/Header';
import SideBar_l2 from '../SideBar_l2/SideBar_l2';
import { fib_details } from '../../../Redux/fib';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../Navbar2/Navbar2';
import Footer from '../../Footer/Footer';

const FibAnalysis = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedFIB, setSelectedFIB] = useState('Select a FIB');
  const [referencePath, setReferencePath] = useState('');
  const [ratio, setRatio] = useState(0);
  const [estimatedCount, setEstimatedCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [roundedEstimatedCount, setRoundedEstimatedCount] = useState(0);


  const fibData = {
    'E.coli': { referencePath: 'Campylobacter', ratio: 0.66, estimatedCount: 0 },
    'Coliform': { referencePath: 'Cryptosporidium', ratio: 1, estimatedCount: 0 },
    'Enterococcus': { referencePath: 'Campylobacter', ratio: 0.01, estimatedCount: 0 },
    'Clostridium': { referencePath: 'Giardia', ratio: 0.8, estimatedCount: 0 },
  };

  // Function to calculate estimated count
  const calculateEstimatedCount = () => {
    const count = parseInt(userCount, 10);
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

    var fib_info = {
      estimatedCount: roundedEstimatedCount
    }
    dispatch(fib_details(fib_info))
    navigate('/qmra')

  };

  useEffect(() => {
    calculateEstimatedCount();
  }, [userCount, ratio]);

  const handleFibData = (fib) => {
    setSelectedFIB(fib);
    if (fibData[fib]) {
      setReferencePath(fibData[fib].referencePath);
      setRatio(fibData[fib].ratio);
      // Calculate estimated count based on user input
      calculateEstimatedCount();
    } else {
      setReferencePath('');
      setRatio(0);
      setEstimatedCount(0);
    }
  };

  return (
    <div className='hero-all' >
      <Navbar2/>

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


                <table className=' w-100'>
                  <tbody>
                    <tr>
                      <th scope='col'>Indicator</th>
                      <th scope='col'>Ratio</th>
                    </tr>
                    <tr>
                      <td >{referencePath}</td>
                      <td >{ratio}</td>
                    </tr>
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
      <footer><Footer/></footer>
    </div>
  );
};

export default FibAnalysis;