import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '..//Navbar/Navbar';
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Popup from '../Pop_Up/Pop_Up';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function QMRAApp() {
  const [selectedOrganism, setSelectedOrganism] = useState('Campylobacter jejun');
  const [count, setCount] = useState('');
  const [alpha, setAlpha] = useState(null);
  const [beta, setBeta] = useState(null);
  const [n50, setN50] = useState(null);
  const [Constant, setConstant] = useState(null);
  const [Parameters, setParameters] = useState([]);
  const [result, setResult] = useState('');
  const [Pathogen, setPathogen] = useState([]);
  const [TempPathogen, setTempPathogen] = useState([]);
  const [IsfoundPath, setIsfoundPath] = useState(false);
  const [bestFit, setBestFit] = useState('');
  const [Longitude, setLongitude] = useState('');
  const [Latitude, setLatitude] = useState('');
  let [IsCustomizePathogen, setIsCustomizePathogen] = useState(false);
  let fib_mst_info = useSelector((state) => state.fib_mst.value);
  let sampling_info = useSelector((state) => state.sampling.value);
  let [ProbabilityOfInfection, setProbabilityOfInfection] = useState(0);
  let [PopupoResults, setPopupoResults] = useState(false);
  let [Selectedathogen, setSelectedathogen] = useState('');
  let [IsLikelihood, setIsLikelihood] = useState(false);
  let [IsLikelihoodTested, setIsLikelihoodTested] = useState(false);
  let [DurationType, setDurationType] = useState('');
  let [QmraId, setQmraId] = useState(0);
  let [LikelihoodMessage, setLikelihoodMessage] = useState('');
  let [BestFitBodel, setBestFitBodel] = useState('');

  useEffect(() => {
    console.log(fib_mst_info)
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setLongitude(longitude)
      setLatitude(latitude)
    })
    axios.get("http://localhost:3001/api/reference_pathogens").then(respond => {
      //  console.log(respond.data.reference_pathogens)

      //setParameters(respond.data.reference_pathogens[0].parameter[0])
      setPathogen(respond.data.reference_pathogens)

      setIsfoundPath(respond.data.success)
      // const filteredParameters = response.Pathogen.filter(item => item.parameters === beta);
      // setAlpha(filteredParameters)
    }, error => {
      console.log(error)
    })

  }, [])

  const calculateResult = () => {
    console.log(selectedOrganism)

  };

  function selectPathogen(event) {
    var filtered = []
    setIsCustomizePathogen(false)
    if (event === 'other') {
      setIsCustomizePathogen(true)
    }

     console.log(event)
    setSelectedathogen(event)
    filtered.push(Pathogen.filter((value) => value.pathogen === event))
    setSelectedOrganism(filtered[0][0].pathogen)
    setTempPathogen(filtered[0][0])
    setParameters(filtered[0][0].parameter[0])
    if (filtered[0][0].best_fit_model === 'exponential') {
      setConstant(filtered[0][0].parameter[0].constant)
    }
    if (filtered[0][0].best_fit_model === 'beta-poisson') {
      setBeta(filtered[0][0].parameter[0].beta)
      setAlpha(filtered[0][0].parameter[0].alpha)
      setN50(filtered[0][0].parameter[0].n50)
    }


  }

  function sendQmra() {
    if (beta === undefined) { setBeta(null) }
    if (alpha === undefined) { setAlpha(null) }
    if (Constant === undefined) { setConstant(null) }
    if (n50 === undefined) { setN50(null) }
    console.log(Selectedathogen)
    var qmra_data = {
      beta: beta,
      alpha: alpha,
      constant: Constant,
      n50: n50,
      best_fit_model: BestFitBodel,
      count_indicator: fib_mst_info.count_indicator,
      indicator: fib_mst_info.indicator,
      estimated_count: fib_mst_info.estimatedCount,
      ratio: fib_mst_info.ratio,
      is_customized: fib_mst_info.is_customized,
      is_customize_Pathogen: IsCustomizePathogen,
      pathogen: Selectedathogen,
      samplingId: sampling_info.userId
    }
    console.log(qmra_data)

    var mst_data = {
      count: fib_mst_info.count,
      maker: fib_mst_info.maker,
      ratio: fib_mst_info.ratio
    }
    console.log(mst_data)
/*
    //Call in sampling data api
    axios.post("http://localhost:3001/api/sampling_data", sampling_info).then((response) => {
      qmra_data.samplingId = response.data.insertedId
      // Assign to Coordinates object
      var coordinates = {
        latitude: Latitude,
        longitude: Longitude,
        samplingId: response.data.insertedId
      }
      //Call in coordinates api
      axios.post("http://localhost:3001/api/coordinates", coordinates).then((result) => {
      }, err => {
        console.log(err)
      })
      // Assign to watersource object
      var watersource = {
        samplingId: response.data.insertedId,
        type: sampling_info.type,
        waterAccessability: sampling_info.waterAccessability
      }
      //Call in watersource api
      axios.post("http://localhost:3001/api/watersource", watersource).then((result) => {
      }, err => {
        console.log(err)
      })

      if (fib_mst_info.type === 'qmra') {
        axios.post("http://localhost:3001/api/add_indicator_qmra", qmra_data)
          .then((result) => {
            if (result.data.success === true) {
              toast.success("Successfully tested, the results will display on popup....", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setPopupoResults(true)
              setProbabilityOfInfection(parseFloat(result.data.totalQmra).toFixed(2))
              setQmraId(result.data.qmra_id)
            }

          }, err => {
            console.log(err)
          })
      }
      else if(fib_mst_info.type === 'mst'){
        console.log('in mst')
      }

    }, (err) => {
      console.log(err)
    })*/
  }

  async function likelihood() {
    var data = {
      probability_of_infection: ProbabilityOfInfection,
      duration_type: DurationType
    }

    var resultsOfLikelihood = await axios.put('http://localhost:3001/api/likelihood_test/' + QmraId, data)
    setIsLikelihoodTested(resultsOfLikelihood.data.success)
    console.log(resultsOfLikelihood.data.success)
    if (resultsOfLikelihood.data.success === true) {
      setLikelihoodMessage('Likelihood of infections is ' + resultsOfLikelihood.data.likelihood_of_infection)
    }
    else {
      setLikelihoodMessage('Could not get the likelihood of infection')
    }
  }

  let popalert = <div style={{ color: 'black' }}>
    The Probability of infection is: {ProbabilityOfInfection}
    <br />
     Would you like to complete the likelihood test?
    <div>
      <button onClick={() => setIsLikelihood(true)}>Yes</button>
      <button onClick={() => setPopupoResults(false)} className='btn btn-primary'>Cancel</button>
    </div>
    {IsLikelihood === true && (
      <div>
        <select onChange={(event) => setDurationType(event.target.value)}>
          <option value=''>--- Select The Duration ---</option>
          <option value='yearly'>Yearly</option>
          <option value='monthly'>Monthly</option>
          <option value='quartely'>Quartely</option>
          <option value='weekly'>Weekly</option>
          <option value='daily'>Daily</option>
        </select>
        <button onClick={likelihood}>Submit</button>
        {IsLikelihoodTested === true && (
          <label>{LikelihoodMessage}</label>
        )}

      </div>

    )}
  </div>
  return (
    <div className='hero-all' >
      {/* <div className='sidenav'>
        <Sidebar />
    </div> */}
      <Navbar />
      <ToastContainer />
      <div className='content'>
        <Header />
        <Popup trigger={PopupoResults} setTrigger={setPopupoResults}>
          {popalert}
        </Popup>
        <div className='container-wrapper'>
          <div style={styles.container}>
            <h1 style={styles.header}>QMRA Parameters</h1>
            <select
              // value={selectedOrganism}
              onChange={(e) => {
                selectPathogen(e.target.value);
                setResult('');
              }}
            >
              <option value='' disabled selected>Select an Indicator </option>
              {Pathogen.map((organism, xid) => (
                <option key={xid} value={organism.pathogen}>
                  {organism.pathogen}
                </option>
              ))}

            </select>
            <br></br>
            <button className='btn btn-dark w-25 mt-5 mb-4' onClick={calculateResult}>Calculate</button>
            {result !== '' && <p style={styles.result}>{result}</p>}
            <table id='table'>
              <th>
                Pathogen
              </th>
              <th>
                Best Fit model
              </th>
              <th>
                Parameters
              </th>
              <tbody>
                {(TempPathogen.best_fit_model !== '') && (<tr>

                  <td>{TempPathogen.pathogen} </td>
                  <td>{TempPathogen.best_fit_model}</td>
                  <td>{(TempPathogen.best_fit_model === 'exponential') && (<label>constant {Parameters.constant}</label>)}

                    {(TempPathogen.best_fit_model === 'beta-poisson') && (<label>alpha {Parameters.alpha},
                      <span>
                        {(Parameters.beta) && (<label>beta {Parameters.beta}</label>)}
                        {(!Parameters.beta) && (<label>N50 {Parameters.n50}</label>)}
                      </span>
                    </label>)}
                  </td>
                </tr>)}
                {(TempPathogen.best_fit_model === '') && (<tr>
                  <td><input type='text'></input></td>
                  <td><select onChange={(e) => {
                    setBestFit(e.target.value)
                  }} >
                    <option value='beta-poisson'>beta-poisson </option>
                    <option value='exponential'>exponential </option>
                  </select></td>
                  <td>
                    {(bestFit === 'beta-poisson') && (<span>
                      <input type='text' placeholder='alpha'></input>
                      <input type='text' placeholder='beta'></input>
                    </span>)}

                    {(bestFit === 'exponential') && (<span>
                      <input type='text' placeholder='constant'></input>

                    </span>)}

                  </td>
                </tr>)}

              </tbody>
            </table>
            <button className='btn btn-dark w-25 mt-5' onClick={sendQmra}>Submit</button>
          </div>
        </div>
      </div>
      <footer><Footer /></footer>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  input: {
    width: '200px',
    fontSize: '16px',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid blue',
  },
  result: {
    fontSize: '18px',
    marginTop: '20px',
  },
};