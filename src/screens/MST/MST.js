import axios from 'axios';
import React, { useState, useEffect } from 'react';

const FibAnalysis = () => {
    const api = 'http://localhost:3001/api/'
    //const api = 'maker_genes'
    const [selectedFIB, setSelectedFIB] = useState('Select a FIB');
    const [referencePath, setReferencePath] = useState('');
    const [ratio, setRatio] = useState(0);
    const [estimatedCount, setEstimatedCount] = useState(0); 
    const [userCount, setUserCount] = useState(0);
    const [roundedEstimatedCount, setRoundedEstimatedCount] = useState(0);
    const [Makers, setmakers] = useState([])
 
    useEffect(()=>{
        axios.get(api+'maker_genes').then(response =>{
            console.log(response.data)
            setmakers(response.data.makers)
        }, err=>{console.log(err)})
    },[])

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

  useEffect(() => {
    calculateEstimatedCount();
  }, [userCount, ratio]);

  const handlemstselection = (fib) => {
    setSelectedFIB(fib);
   /* if (fibData[fib]) {
      setReferencePath(fibData[fib].referencePath);
      setRatio(fibData[fib].ratio);
      // Calculate estimated count based on user input
      calculateEstimatedCount();
    } else {
      setReferencePath('');
      setRatio(0);
      setEstimatedCount(0);
    }*/
  };

  return (
    <div>
      <p>Select an Maker Gene:</p>
      <select
        onChange={(event) => handlemstselection(event.target.value)}
      >
        <option value="Other">Select A Marker</option>
        {Makers.map((maker, xid) => (
          <option key={xid} value={xid}>
            {maker.maker}
          </option>
        ))}
      </select>
      
      <table>
        <tbody>
          <tr>
            <th>MST Marker</th>
            <th>Ratio</th>
          </tr>
          <tr>
            <td>{referencePath}</td>
            <td>{ratio}</td>
          </tr>
        </tbody>
      </table>

      <br></br>
      <p>Enter The Count:</p>
      <input
        type="number"
        value={userCount}
        onChange={(event) => setUserCount(event.target.value)}
      />
      <p> Count: {estimatedCount} </p>
      <p>Estimated Count: {roundedEstimatedCount} </p>
    </div>
  );
};

export default FibAnalysis;