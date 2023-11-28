
import './Reference_pathogen.css'
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

function Reference_pathogen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [Pathogens, setPathogens] = useState([])
    const [Pathogen, setPathogen] = useState('')
    const [BestFitModel, setBestFitModel] = useState('')
    const [alpha, setAlpha] = useState(null);
    const [beta, setBeta] = useState(null);
    const [n50, setN50] = useState(null);
    const [Constant, setConstant] = useState(null);
    const [userCount, setUserCount] = useState(0);
    const [TempPathogen, setTempPathogen] = useState('')
    const [BetaParameter, seBetaParameter] = useState(true)
    const [IsCustomized, setIsCustomized] = useState(false);

    const [N50Parameter, setN50Parameter] = useState(true)
    useEffect(() => {
        axios.get(api + 'reference_pathogens').then(response => {
            setPathogens(response.data.reference_pathogens)
            console.log(response.data.reference_pathogens)
        }, error => {
            console.log(error)
        })
    }, [])

    function handlePathogen(eventId) {
        setAlpha(null)
        setN50(null)
        setBeta(null)
        setConstant(null)
        setIsCustomized(false)

        setPathogen(Pathogens[eventId].pathogen)
        console.log(Pathogens[eventId])
        setBestFitModel(Pathogens[eventId].best_fit_model)
        setTempPathogen(Pathogens[eventId])
        if (Pathogens[eventId].pathogen.toLocaleLowerCase() !== "Other".toLocaleLowerCase()) {

            if (Pathogens[eventId].best_fit_model === 'exponential') {
                setConstant(Pathogens[eventId].parameter[0].constant)

            }
            else {
                setBeta(Pathogens[eventId].parameter[0].beta)
                setAlpha(Pathogens[eventId].parameter[0].alpha)
                setN50(Pathogens[eventId].parameter[0].n50)
            }
        }
        else {
            setIsCustomized(true)
        }
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


    function next_to_qmra() {
        var data = {
            count: userCount,
            type: 'ref_path',
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


    return (
        <div className='hero-all' >
            <Navbar />
            <div className='content'>
                <Header />
                <h2 className='text-primary text-center'>Reference Pathogen</h2>
                <div className='container-wrapper' style={{ textAlign: 'center' }}>
                <div id='fib_section' className='mt-3' >
                        <div className='form-group'>
                            <label style={{ textAlign: 'left' }}>Reference Pathogen</label>
                            <select
                                onChange={(event) => handlePathogen(event.target.value)} className='selection-fib  form-select-lg '>
                                <option value="" disabled selected>Select Pathogen</option>
                                {Pathogens.map((pathogen, xid) => (
                                    <option key={xid} value={xid}>
                                        {pathogen.pathogen}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {TempPathogen.pathogen !== "Other" && 
                        <div   className='group'>
                            <div className='form-group'>
                                <label className='label-fib' >Pathogen</label>
                                <input   className='input_fib mt-2' type='text' value={Pathogen} disabled />
                            </div>
                            <div className='form-group'>
                                <label className='label-fib' >Best Fit Model</label>
                                <input className='input_fib mt-2' type='text' value={BestFitModel} disabled />
                            </div >
                            {BestFitModel === 'exponential' &&
                                <div className='form-group'>
                                    <label className='label-fib' >Constant</label>
                                    <input  className='input_fib mt-2' type='text' value={Constant} disabled />
                                </div>}

                            {(BestFitModel === 'beta-poisson') && (<span className='form-group'>
                                <label >Alpha</label>
                                <input  className='input_fib mt-2' type='text' value={alpha} disabled />
                            </span>)}

                            {(BestFitModel === 'beta-poisson') && (<span >
                                {beta && <span className='form-group'>
                                    <label >Beta</label>
                                    <input   className='input_fib mt-2' type='text' value={beta} disabled />
                                </span>
                                }
                            </span>)}


                            {(BestFitModel === 'beta-poisson') && (<span>
                                {!beta && <span className='form-group'>
                                    <label >N50</label>
                                    <input className='form-input' type='text' value={n50} disabled />
                                </span>
                                }
                            </span>)}
                        </div>}
                        {TempPathogen.pathogen === "Other" && <div className='form-group'  >
                            <div className='form-group'>
                                <label className='mst_label'>Reference Pathogen</label>
                                <input  className=' mst_label ' type='text' placeholder='Reference Pathogen' onChange={(event) => setPathogen(event.target.value)} />
                            </div >
                            <div className='form-group'>
                                <label className='mst_label'>Best Fit Model</label>
                                <select onChange={(event) => setBestFitModel(event.target.value)}   className='selection-fib form-select-sm p-2 '>
                                    <option value='' disabled selected>Select Best Fit Model</option>
                                    <option value='exponential'>Exponential</option>
                                    <option value='beta-poisson'>Beta-Poisson</option>
                                </select>
                            </div >
                           
                            <div className='form-group'>
                            <label className='text-center'>Parameter</label>
                            
                                {BestFitModel === 'exponential' && <span>
                                <input type='text' placeholder='Constant' onChange={(event) => setConstant(event.target.value)} max="4" />
                                </span>}
                                {BestFitModel === 'beta-poisson' && <span >
                                
                             
                             
                                    <label><input  className='input_fib mt-2 w-75'  type='text' placeholder='Alpha' onChange={(event) => setAlpha(event.target.value)} /></label>
                                  
                                    
                                    <label> Beta
                                        <input className='radio-path'
                                        type='radio' name='parameter' value='beta' onChange={handleRadio} />
                                        <input type='text' placeholder='Beta' disabled={BetaParameter} onChange={(event) => setBeta(event.target.value)} />
                                    </label>
                                 
                                   
                                    <label> N50
                                        <input className='radio-path' type='radio' name='parameter' value='n50' onChange={handleRadio} />
                                        <input type='text' placeholder='N50' disabled={N50Parameter} onChange={(event) => setN50(event.target.value)} />
                                    </label>
                                   
                              
                                </span>}
                            </div>
                           
                         
                        </div>}
                        <div className='form-group'>
             <p>Enter The Count:</p>
              <input  className='form-input'
                type="number"
                onChange={(event) => setUserCount(event.target.value)}
              />
             </div>
                        
                       
                    </div>

                    <button className='btn btn-success w-25 mt-4 mb-5' onClick={next_to_qmra}>Next</button>
                </div>

            </div><div className='mb-5'></div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}


export default Reference_pathogen;