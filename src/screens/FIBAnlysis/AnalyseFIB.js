import './AnalyseFIB.css'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import { fib_mst_details } from '../../Redux/fib_mst';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { api } from '../../Data/API'
import axios from 'axios';


const FibAnalysis = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedFIB, setSelectedFIB] = useState('Select a FIB');
  const [ReferencePath, setReferencePath] = useState([]);
  const [Pathogens, setPathogens] = useState([])
  const [Pathogen, setPathogen] = useState('')
  const [Ratio, setRatio] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [IsCustomized, setIsCustomized] = useState(false);
  const [FIB, setFIB] = useState('')
  const [BestFitModel, setBestFitModel] = useState('')
  const [IndicatorRatio, setIndicatorRatio] = useState('')
  const [PathogenRatio, setPathogenRatio] = useState('')
  const [BetaParameter, seBetaParameter] = useState(true)
  const [N50Parameter, setN50Parameter] = useState(true)
  const [alpha, setAlpha] = useState(null);
  const [beta, setBeta] = useState(null);
  const [n50, setN50] = useState(null);
  const [Constant, setConstant] = useState(null);
  const [FIBs, setFIBs] = useState([])

  useEffect(() => {

    axios.get(api + 'indicators').then(response => {
      setFIBs(response.data.indicators)
    }, error => {
      console.log(error)
    })
    axios.get(api + 'reference_pathogens').then(response => {
      setPathogens(response.data.reference_pathogens)
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

  const handlePathogenRatio = (path) => {
    var temp_pathogen = {}
    if (path === "") {
      return
    }
    console.log(ReferencePath[path].path_name)
    setPathogen(ReferencePath[path].path_name)
    var path_name = ReferencePath[path].path_name
    setRatio(ReferencePath[path].ratio)
    setIndicatorRatio(ReferencePath[path].ratio.slice(0, ReferencePath[path].ratio.indexOf(':')))
    setPathogenRatio(ReferencePath[path].ratio.slice(ReferencePath[path].ratio.indexOf(':') + 1))

    for (var k = 0; k < Pathogens.length; k++) {
      if (Pathogens[k].pathogen.toLocaleLowerCase().includes(path_name.toLocaleLowerCase())) {
        temp_pathogen = Pathogens[k]
      }
    }
    setAlpha(null)
    setN50(null)
    setBeta(null)
    setConstant(null)
    setBestFitModel(temp_pathogen.best_fit_model)
    setPathogen(temp_pathogen.pathogen)

    if (temp_pathogen.best_fit_model === 'exponential') {
      setConstant(temp_pathogen.parameter[0].constant)
    }
    else {
      setBeta(temp_pathogen.parameter[0].beta)
      setAlpha(temp_pathogen.parameter[0].alpha)
      setN50(temp_pathogen.parameter[0].n50)
    }
    console.log(Pathogen)
    console.log('n50', n50)
    console.log('alpha', alpha)
    console.log('beta', beta)
    console.log('constant', Constant)




  }

  function handlebestFitModel(event) {
    setBestFitModel(event)
    if (event === 'exponential') {
      setAlpha(null)
      setN50(null)
      setBeta(null)
    }
    else {
      setConstant(null)
    }
  }

  function next_to_qmra() {
    var ratio = 0
    var estimated_count = 0

    if (FIB.toLocaleLowerCase() === 'Other'.toLocaleLowerCase()) {
      if (FIB === '') {
        console.log('Enter FIB')
      }
      if (IndicatorRatio === '' || PathogenRatio === '') {
        return;
      }
      ratio = IndicatorRatio + ':' + PathogenRatio
    }
    else {
      ratio = IndicatorRatio + ':' + PathogenRatio
    }

    if (userCount === 0) {
      return
    }
    estimated_count = (Number(userCount) * Number(PathogenRatio)) / Number(IndicatorRatio)

    var data = {
      fib: FIB,
      ratio: Ratio,
      count: userCount,
      type: 'fib',
      estimated_count: estimated_count,
      is_customized_mst: IsCustomized,
      pathogen: Pathogen,
      best_fit_model: BestFitModel,
      alpha: alpha,
      beta: beta,
      constant: Constant,
      n50: n50
    }
    console.log(data)
    dispatch(fib_mst_details(data))
    navigate('/qmra')
  }

  function handleRadio(event) {
    console.log(event.target.value)
    setConstant(null)
    setN50(null)
    setBeta(null)

    if (event.target.value === 'beta') {
      seBetaParameter(false)
      setN50Parameter(true)
    }
    else {
      seBetaParameter(true)
      setN50Parameter(false)
    }
  }

  return (
    <div className='hero-all' >
      <Navbar />
      <div className='content'>
       
        <Header />
        <h2 className='text-primary text-center'>faecal indicator bacteria (fib)</h2>
        <div>
          <div className='container-wrapper'>
            <ToastContainer />
            <div id='fib_section'>
            <div className='group '>
              <div className='fib_selection'>
                {/* <label className='fib_selection_label text-center'> Select an FIB</label> */}
                <select
                  className='selection-fib form-select-lg mb-3 mt-5  '
                  onChange={(event) => handlemstselection(event.target.value)} >
                  <option value="" disabled selected>Select An Indicator</option>
                  {FIBs.map((fib, xid) => (
                    <option key={xid} value={xid} >
                      {fib.indicator}
                    </option>
                  ))}
                </select>
              </div>
              <div className='reference_selection'>
                {/* <label className='reference_selection_label  text-center'>Reference Pathogen</label> */}
                {selectedFIB.indicator !== 'Other' && <select
                  className='selection-fib  form-select-lg mb-3 mt-5 '
                  onChange={(event) => handlePathogenRatio(event.target.value)} >
                  <option value="" disabled selected>Select A Pathogen</option>
                  {ReferencePath.map((pathogen, xid) => (
                    <option key={xid} value={xid} >
                      {pathogen.path_name}
                    </option>
                  ))}
                </select>}
                {selectedFIB.indicator === 'Other' && <span>

                  <div className='form-group'>
                    <label>Indicator</label>
                    <input type='text' placeholder='Indicator' onChange={(event) => setFIB(event.target.value)} />
                  </div>
                  <div className='form-group'>
                    <label>Reference Pathogen</label>
                    <input type='text' placeholder='Reference Pathogen' onChange={(event) => setPathogen(event.target.value)} />
                  </div>
                  <div className='form-group'>
                    <label>Best-Fit Model</label>
                    <select onChange={(event) => handlebestFitModel(event.target.value)}>
                      <option value=''>--- Select Best Fit Model ---</option>
                      <option value='exponential'>Exponential</option>
                      <option value='beta-poisson'>Beta Poisson</option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <label>Ratio</label>
                    <div>
                      <input type='text' placeholder='Indicator Ratio' onChange={(event) => setIndicatorRatio(event.target.value)} max="4" />
                      <label style={{ fontWeight: '600', fontSize: '1.2em', margin: '0 5px' }}>:</label>
                      <input type='text' placeholder='Pathogen Ratio' onChange={(event) => setPathogenRatio(event.target.value)} />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Parameter</label>
                    {BestFitModel === 'exponential' && <input type='text' placeholder='Constant' onChange={(event) => setConstant(event.target.value)} max="4" />}
                    {BestFitModel === 'beta-poisson' && <span>
                      <label><input type='text' placeholder='Alpha' onChange={(event) => setAlpha(event.target.value)} /></label>
                      <label> Beta
                        <input type='radio' name='parameter' value='beta' onChange={handleRadio} />
                        <input type='text' placeholder='Beta' disabled={BetaParameter} onChange={(event) => setBeta(event.target.value)} />
                      </label>

                      <label> N50
                        <input type='radio' name='parameter' value='n50' onChange={handleRadio} />
                        <input type='text' placeholder='N50' disabled={N50Parameter} onChange={(event) => setN50(event.target.value)} />
                      </label>

                    </span>}

                  </div>
                </span>}
              </div>
          </div>
              <div className='container-fib'>
                {selectedFIB.indicator !== 'Other' &&
                  <div className='fib_content' id='fib_content' >
             
                    <div className='group ' >
                      <div className='form-group'>
                        <label className='mst_label'>FIB</label>
                        <input className='input_fib mt-2' type='text' value={FIB} disabled />
                      </div>
                      <div className='form-group' >
                        <label className='mst_label'>Ratio</label>
                        <input className='input_fib mt-2' type='text' value={Ratio} disabled />
                      </div>
                      <div className='form-group' >
                        <label className='mst_label'>Pathogen</label>
                        <input className='input_fib mt-2' type='text' value={Pathogen} disabled />
                      </div>
                      <div className='form-group'  >
                      <label className='mst_label'>Best Fit Model</label>
                      <input className='input_fib mt-2' type='text' value={BestFitModel} disabled />
                      </div>
                    </div>
                    
                    <div>
                      {(BestFitModel === 'exponential') && (<span className='form-group'>
                        <label className='mst_label'>constant</label>
                        <input className='mt-2' type='text' value={Constant} disabled />
                      </span>)}
                    </div>
                    <div  className='group' style={{ display: 'flex'}}>
                      {(BestFitModel === 'beta-poisson') && 
                      (<span className='form-group' >
                        <label className='mst_label'>Alpha</label>
                        <input className='mt-2' type='text' value={alpha} disabled />
                      </span>)}
                      <div >
                        {(BestFitModel === 'beta-poisson') && (<span >
                          {beta && <span className='form-group' >
                            <label className='mst_label'>Beta</label>
                            <input className='mt-2' type='text' value={beta} disabled />
                          </span>
                          }
                        </span>)}
                      </div>
                      <div className='form-group'>
                        {(BestFitModel === 'beta-poisson') && (<span>
                          {!beta && <span className='form-group'>
                            <label className='mst_label'>N50</label>
                            <input className='mt-2' type='text' value={n50} disabled />
                          </span>
                          }
                        </span>)}
                      </div>
                    </div>
                  </div>}
              </div>

              <div className='count-fib'>
              <p>Enter The Count:</p>
              <input
                type="number"
                onChange={(event) => setUserCount(event.target.value)}
              />
              </div>
              
             </div>
               <button className='btn btn-success w-25 mt-4 btn-next' onClick={next_to_qmra}>Next</button>
           </div>
       </div>


      </div><div className='mt-5'></div>
      <footer><Footer /></footer>
    </div>
  );
};

export default FibAnalysis;