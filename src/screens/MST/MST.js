import './MST.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fib_mst_details } from '../../Redux/fib_mst';
import { api } from '../../Data/API'
import axios from 'axios';

const MST = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedMST, setselectedMST] = useState('Select a Maker');
  const [ReferencePath, setReferencePath] = useState([]);
  const [Pathogens, setPathogens] = useState([])
  const [Pathogen, setPathogen] = useState('')
  const [Ratio, setRatio] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [IsCustomized, setIsCustomized] = useState(false);
  const [Maker, setMaker] = useState('')
  const [BestFitModel, setBestFitModel] = useState('')
  const [MakerRatio, setMakerRatio] = useState('')
  const [PathogenRatio, setPathogenRatio] = useState('')
  const [BetaParameter, seBetaParameter] = useState(true)
  const [N50Parameter, setN50Parameter] = useState(true)
  const [alpha, setAlpha] = useState(null);
  const [beta, setBeta] = useState(null);
  const [n50, setN50] = useState(null);
  const [Constant, setConstant] = useState(null);
  const [Makers, setMakers] = useState([])


  useEffect(() => {

    axios.get(api + 'maker_genes').then(response => {
      setMakers(response.data.makers)
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
    console.log(Makers[makerno].pathogen)
    setReferencePath(Makers[makerno].pathogen)
    setMaker(Makers[makerno].maker)
    setRatio(Makers[makerno].ratio)
    setselectedMST(Makers[makerno]);
    if (Makers[makerno].maker.toLocaleLowerCase() === 'Other'.toLocaleLowerCase()) {
      setIsCustomized(true)
    }
  };

  const handlePathogenRatio = (path) => {
    var temp_pathogen = {}
    if (path === "") {
      return
    }
    setPathogen(ReferencePath[path].path_name)
    var path_name = ReferencePath[path].path_name
    setRatio(ReferencePath[path].ratio)
    setMakerRatio(ReferencePath[path].ratio.slice(0, ReferencePath[path].ratio.indexOf(':')))
    setPathogenRatio(ReferencePath[path].ratio.slice(ReferencePath[path].ratio.indexOf(':') + 1))

    for (var k = 0; k < Pathogens.length; k++) {
      if (Pathogens[k].pathogen.toLocaleLowerCase().includes(path_name.toLocaleLowerCase())) {
        temp_pathogen = Pathogens[k]
        console.log('hdjhd',temp_pathogen)
      }
    }
    setAlpha(null)
    setN50(null)
    setBeta(null)
    setConstant(null)
    setBestFitModel(temp_pathogen.best_fit_model)
    setPathogen(temp_pathogen.pathogen)
    //console.log(temp_pathogen)
 
    if (temp_pathogen.best_fit_model === 'exponential') {
      setConstant(temp_pathogen.parameter[0].constant)
    }
    else {
      setBeta(temp_pathogen.parameter[0].beta)
      setAlpha(temp_pathogen.parameter[0].alpha)
      setN50(temp_pathogen.parameter[0].n50)
    }
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

    if (Maker.toLocaleLowerCase() === 'Other'.toLocaleLowerCase()) {
      if (Maker === '') {
        console.log('Enter Maker')
      }
      if (MakerRatio === '' || PathogenRatio === '') {
        return;
      }
      ratio = MakerRatio + ':' + PathogenRatio
    }
    else {
      ratio = MakerRatio + ':' + PathogenRatio
    }

    if (userCount === 0) {
      return
    }
    estimated_count = (Number(userCount) * Number(PathogenRatio)) / Number(MakerRatio)

    var data = {
      mst: Maker,
      ratio: Ratio,
      count: userCount,
      type: 'mst',
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
        <h2 className='text-primary text-center'>Microbial Source Tracking</h2>
        <div>
          <div className='container-wrapper'>
            <ToastContainer />
            <div id='fib_section'>
              <div className='fib_selection'>
                <label className='fib_selection_label'> Select an Maker</label>
                <select
                  className='form-select-lg mb-3 mt-5'
                  onChange={(event) => handlemstselection(event.target.value)} >
                  <option value="">Select Maker</option>
                  {Makers.map((mst, xid) => (
                    <option key={xid} value={xid}>
                      {mst.maker}
                    </option>
                  ))}
                </select>
              </div>
              <div className='reference_selection'>
                <label className='reference_selection_label'>Reference Pathogen</label>
                {selectedMST.maker !== 'Other' && <select
                  className='form-select-lg mb-3 mt-5'
                  onChange={(event) => handlePathogenRatio(event.target.value)} >
                  <option value="">Select Pathogen</option>
                  {ReferencePath.map((pathogen, xid) => (
                    <option key={xid} value={xid}>
                      {pathogen.path_name}
                    </option>
                  ))}
                </select>}
                {selectedMST.maker === 'Other' && <span>
                  <div className='form-group'>
                    <label>Maker</label>
                    <input type='text' placeholder='Maker' onChange={(event) => setMaker(event.target.value)} />
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
                      <input type='text' placeholder='Maker Ratio' onChange={(event) => setMakerRatio(event.target.value)} max="4" />
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


              {selectedMST.maker !== 'Other' &&
                <div id='fib_content' style={{ width: '25%' }}>


                      <div className='group ' style={{ display: 'flex'}}>
                      <div className='' style={{ margin: '20px' }}>
                      <label className='mst_label'>Maker</label>
                    <input className='mt-2' type='text' value={Maker} disabled />
                      </div>
                      <div className='' style={{ margin: '20px' }}>
                      <label className='mst_label'>Ratio</label>
                    <input className='mt-2' type='text' value={Ratio} disabled />
                      </div>
                      <div className='' style={{ margin: '20px' }}>
                      <label className='mst_label'>Pathogen</label>
                    <input className='mt-2' type='text' value={Pathogen} disabled />
                      </div>
                      <div className='' style={{ margin: '20px' }}>
                      <label className='mst_label'>Best Fit Model</label>
                    <input className='mt-2' type='text' value={BestFitModel} disabled />
                      </div>

                      </div>
                 
                
                  <div>
                    {(BestFitModel === 'exponential') && (<span className='form-group'>
                      <label className='mst_label'>constant</label>
                      <input className='mt-2' type='text' value={Constant} disabled />
                    </span>)}
                  </div>
                  <div  className='group' style={{ display: 'flex'}}>
                    {(BestFitModel === 'beta-poisson') && (<span className='form-group'>
                      <label className='mst_label'>Alpha</label>
                      <input className='mt-2' type='text' value={alpha} disabled />
                    </span>)}
                    <div >
                      {(BestFitModel === 'beta-poisson') && (<span >
                        {beta && <span className='form-group'>
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

              <br></br>
              <p>Enter The Count:</p>
              <input
                type="number"
                onChange={(event) => setUserCount(event.target.value)}
              />
            </div>
            <button className='btn btn-dark w-25 mt-4' onClick={next_to_qmra}>Next</button>
          </div>
        </div>


      </div>
      <footer><Footer /></footer>
    </div>
  );
};


export default MST;