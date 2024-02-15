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
  let [IsCustomizePathogen, setIsCustomizePathogen] = useState(false);
  let fib_mst_info = useSelector((state) => state.fib_mst.value);
  let sampling_info = useSelector((state) => state.sampling.value);
  let [ProbabilityOfInfection, setProbabilityOfInfection] = useState(0);
  let [PopupoResults, setPopupoResults] = useState(false);
  let [IsLikelihood, setIsLikelihood] = useState(false);
  let [IsLikelihoodTested, setIsLikelihoodTested] = useState(false);
  let [DurationType, setDurationType] = useState('');
  let [QmraId, setQmraId] = useState(0);
  let [LikelihoodMessage, setLikelihoodMessage] = useState('');
  let [BestFitModel, setBestFitModel] = useState('');
  let [Mst_Fib, setMst_fib] = useState({})
  useEffect(() => {
    setMst_fib(fib_mst_info)
    console.log(sampling_info)
    /*navigator.geolocation.getCurrentPosition(position => {
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
    })*/

  }, [])


  function sendQmra() {

    var qmra_data = {
      beta: fib_mst_info.beta,
      alpha: fib_mst_info.alpha,
      constant: fib_mst_info.constant,
      n50: fib_mst_info.n50,
      best_fit_model: fib_mst_info.best_fit_model,
      count_indicator: fib_mst_info.count,
      indicator: fib_mst_info.fib,
      estimated_count: fib_mst_info.estimated_count,
      ratio: fib_mst_info.ratio,
      is_customized_indicator: fib_mst_info.is_customized_mst,
      is_customize_Pathogen: false,
      pathogen: fib_mst_info.pathogen
    }

    var mst_data = {
      beta: fib_mst_info.beta,
      alpha: fib_mst_info.alpha,
      constant: fib_mst_info.constant,
      n50: fib_mst_info.n50,
      best_fit_model: fib_mst_info.best_fit_model,
      count: fib_mst_info.count,
      maker: fib_mst_info.mst,
      ratio: fib_mst_info.ratio,
      estimated_count: fib_mst_info.estimated_count,
      is_customized_mst: fib_mst_info.is_customized_mst,
      pathogen: fib_mst_info.pathogen
    }

    var reference_path = {
      beta: fib_mst_info.beta,
      alpha: fib_mst_info.alpha,
      constant: fib_mst_info.constant,
      n50: fib_mst_info.n50,
      best_fit_model: fib_mst_info.best_fit_model,
      count: Number(fib_mst_info.count),
      is_customize_Pathogen: fib_mst_info.is_customized_mst,
      pathogen: fib_mst_info.pathogen
    }

    console.log(reference_path)

    //Call in sampling data api
    axios.post("http://localhost:3001/api/sampling_data", sampling_info).then((response) => {
      qmra_data.samplingId = response.data.insertedId
      mst_data.samplingId = response.data.insertedId
      reference_path.samplingId = response.data.insertedId
      // Assign to Coordinates object
      var coordinates = {
        latitude: sampling_info.latitude,
        longitude: sampling_info.longitude,
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

      if (fib_mst_info.type === 'fib') {
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
      else if (fib_mst_info.type === 'mst') {
        axios.post("http://localhost:3001/api/mst", mst_data)
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

      else if (fib_mst_info.type === 'ref_path') {
        axios.post("http://localhost:3001/api/reference_pathogens_test", reference_path)
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

    }, (err) => {
      console.log(err)
    })
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
      setLikelihoodMessage('Could not get the likelihood of infections')
    }
  }

  let popalert = <div style={{ color: 'black' }}>
    probability of infection is {ProbabilityOfInfection}
    {Math.round(ProbabilityOfInfection) >= 1 && <label style={{ backgroundColor: 'red', width: '100%', height: '10px' }}></label>}
    {Math.round(ProbabilityOfInfection) <= 0 && <label style={{ backgroundColor: 'green', width: '100%', height: '10px' }}></label>}
    <label className='mt-2'>You would like to complete the likelihood test?</label>

    <div style={{ textAlign: 'center' }}>
      <button onClick={() => setIsLikelihood(true)} className='btn btn-primary' style={{ margin: '0 10px', width: '100px' }}>Yes</button>
      <button onClick={() => setPopupoResults(false)} className='btn btn-primary' style={{ margin: '0 10px', width: '100px' }}>Cancel</button>
    </div>
    {IsLikelihood === true && (
      <div className="mt-2" style={{ display: 'flex', flexDirection: 'column' }}>
        <select onChange={(event) => setDurationType(event.target.value)}>
          <option value=''>--- Select Duration Type ---</option>
          <option value='yearly'>Yearly</option>
          <option value='monthly'>Monthly</option>
          <option value='quartely'>Quartely</option>
          <option value='weekly'>Weekly</option>
          <option value='daily'>Daily</option>
        </select>
        <button onClick={likelihood} className='btn btn-primary mt-3'>Submit</button>
        {IsLikelihoodTested === true && (
          <label>{LikelihoodMessage}</label>
        )}
      </div>
    )}
  </div>
  return (
    <div className='hero-all' >

      <Navbar />
      <ToastContainer />
      <div className='content'>
        <Header />
        <h2 className='text-primary text-center'>Review Results</h2>
        <Popup trigger={PopupoResults} setTrigger={setPopupoResults}>
          {popalert}
        </Popup>
        <div className='container-wrapper'>
          <div style={styles.container}>
            <table>
              <tr>
                <th></th>
                <th></th>
              </tr>
              {Mst_Fib.type === 'mst' &&
                <tr>
                  <td>Marker</td>
                  <td>{Mst_Fib.mst}</td>
                </tr>
              }
              {Mst_Fib.type === 'fib' &&
                <tr>
                  <td>Indicator</td>
                  <td>{Mst_Fib.fib}</td>
                </tr>
              }
              <tr>
                <td>Pathogen</td>
                <td>{Mst_Fib.pathogen}</td>
              </tr>
              {Mst_Fib.type !== 'ref_path' &&
                <tr>
                  <td>Ratio</td>
                  <td>{Mst_Fib.ratio}</td>
                </tr>
              }

              <tr>
                <td>Best Fit Model</td>
                <td>{Mst_Fib.best_fit_model}</td>
              </tr>
              <tr>
                <td>Count</td>
                <td>{Mst_Fib.count}</td>
              </tr>
              {Mst_Fib.best_fit_model === 'exponential' && <tr>
                <td>Constant(K)</td>
                <td>{Mst_Fib.constant}</td>
              </tr>}
              {Mst_Fib.best_fit_model === 'beta-poisson' &&
                <tr>
                  <td>Alpha</td>
                  <td>{Mst_Fib.alpha}</td>
                </tr>}
              {(Mst_Fib.best_fit_model === 'beta-poisson' && Mst_Fib.beta) &&
                <tr>
                  <td>Beta</td>
                  <td>{Mst_Fib.beta}</td>
                </tr>}
              {(Mst_Fib.best_fit_model === 'beta-poisson' && !Mst_Fib.beta) &&
                <tr>
                  <td>N50</td>
                  <td>{Mst_Fib.n50}</td>
                </tr>}
              {Mst_Fib.type !== 'ref_path' &&
                <tr>
                  <td>Estimated Count</td>
                  <td>{Mst_Fib.estimated_count}</td>
                </tr>
              }

              {/* {Mst_Fib.type === 'mst' &&
                <tr>
                  <td>Customized MST</td>
                  <td>{Mst_Fib.is_customized_mst === true && <label>Yes</label>}
                    {Mst_Fib.is_customized_mst === false && <label>No</label>}
                  </td>
                </tr>} */}
              {/* {Mst_Fib.type === 'fib' && */}
              <tr>
                {Mst_Fib.type === 'mst' && <td>Customized Microbial Source Tracking</td>}
                {Mst_Fib.type === 'fib' && <td>Customized Fical Indicator Bacteria</td>}
                {Mst_Fib.type === 'ref_path' && <td>Customized Reference Pathogen</td>}
                <td>{Mst_Fib.is_customized_mst === true && <label>Yes</label>}
                  {Mst_Fib.is_customized_mst === false && <label>No</label>}
                </td>
              </tr>
              {/* } */}
            </table>
            <button className='btn btn-success w-25 mt-5' onClick={sendQmra}>Submit</button>
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