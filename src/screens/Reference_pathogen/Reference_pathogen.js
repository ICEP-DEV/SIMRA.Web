
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

        console.log(Pathogens[eventId])
        setPathogen(Pathogens[eventId].pathogen)
        setBestFitModel(Pathogens[eventId].best_fit_model)

        if (Pathogens[eventId].best_fit_model === 'exponential') {
            setConstant(Pathogens[eventId].parameter[0].constant)
        }
        else {
            setBeta(Pathogens[eventId].parameter[0].beta)
            setAlpha(Pathogens[eventId].parameter[0].alpha)
            setN50(Pathogens[eventId].parameter[0].n50)
        }
    }

    function next_to_qmra() {
        var data = {
            count: userCount,
            type: 'ref_path',
            is_customized_mst: false,
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
                <div id='fib_section'>
                        <div className='form-group' >
                            <label style={{ textAlign: 'left' }}>Reference Pathogen</label>
                            <select
                                onChange={(event) => handlePathogen(event.target.value)}  className='selection-fib form-select-lg mb-3 mt-5'>
                                <option value="" disabled selected>Select Pathogen</option>
                                {Pathogens.map((pathogen, xid) => (
                                    <option key={xid} value={xid}>
                                        {pathogen.pathogen}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='group ' >
                       
                            <div className='form-group'>
                                <label className='mst_label'>Pathogen</label>
                                <input className='mt-2' type='text' value={Pathogen} disabled />
                            </div>
                            <div className='form-group'>
                                <label className='mst_label'>Best Fit Model</label>
                                <input className='mt-2' type='text' value={BestFitModel} disabled />
                            </div >
                            {BestFitModel === 'exponential' &&
                                <div className='form-group'>
                                    <label className='mst_label'>Constant</label>
                                    <input className='mt-2' type='text' value={Constant} disabled />
                                </div>}

                            {(BestFitModel === 'beta-poisson') && (<span className='form-group'>
                                <label className='mst_label'>Alpha</label>
                                <input className='mt-2' type='text' value={alpha} disabled />
                            </span>)}

                            {(BestFitModel === 'beta-poisson') && (<span >
                                {beta && <span className='form-group'>
                                    <label className='mst_label'>Beta</label>
                                    <input className='mt-2' type='text' value={beta} disabled />
                                </span>
                                }
                            </span>)}


                            {(BestFitModel === 'beta-poisson') && (<span>
                                {!beta && <span className='form-group'>
                                    <label className='mst_label'>N50</label>
                                    <input className='mt-2' type='text' value={n50} disabled />
                                </span>
                                }
                            </span>)}
                        </div>
                        <div className='count-fib'>
                        <p>Enter The Count:</p>
                        <input
                            type="number"
                            onChange={(event) => setUserCount(event.target.value)} 
                        />
                        </div>
                        
                    </div>
                    <div>
                            <button className='btn btn-success w-25 mt-4' onClick={next_to_qmra}>Next</button>

                        </div>

                </div>

            </div><div className='mt-5'></div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}


export default Reference_pathogen;