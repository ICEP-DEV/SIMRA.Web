import React from 'react';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Level1/Sidebar/Sidebar';
import Header from '../../Header/Header';
import { useSelector } from 'react-redux';
function Home() {
    let navigate = useNavigate();
    let user_info = useSelector((state) => state.user.value)
    return (
        <div className='hero-all' >
            <div className='sidenav'>
                <Sidebar />
            </div>

            <div className='main-all'>

                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>
<div className='home-background'>


                       
<div className='mb-5 text-center display-6 ml-5'>
<label className='mt-5'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
</div>

        <div className='home-body text-center mb-5'>
        SIMRA, tool integrates the current water and sanitation risk assessment and management methods into one harmonised tool
            </div>           
            <div className='text-center'>
                            <button className='btn-home' onClick={() => navigate("/sampling_data")}> Sampling Data</button>
                        </div> 
                    </div>




                </div>
            </div>
        </div>
        </div>
    )
}
export default Home;