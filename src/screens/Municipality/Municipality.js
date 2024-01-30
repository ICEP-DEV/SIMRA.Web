import './Municipality.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
import Header from '../Header/Header';
import {Bar} from 'react-chartjs-2';
import { api } from "../../Data/API";
import MovingComponent from '../animations/component';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
function Municipality() {
    const [data,setData]=useState([{}]);
    const [datafound,setDataFound]=useState({});
    let user_info = useSelector((state) => state.user.value);
    
    useEffect(() => {
       
        axios.get(api + 'get_users/').then((response) => {
            setDataFound(response.data.success)
            if (response.data.success === true) {
                setData(response.data.results)
             
              }
            
        })

    }, []);

    return (
        <div className='hero-all' >
            <Admin_NavBar />
            <div className='content-municipalities bg-dark text-white' >
              
                    <section className=''>
                 
                  <MovingComponent
          type="popOut"
          duration="1000ms"
          delay="0.3s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
            <h2 className='text-center'>Welcome To simra </h2> <br></br>
 <h1 className='text-center'>
    {user_info.user_firstname} {user_info.user_lastname} .</h1>
        
        </MovingComponent>
                    </section>
               <section className='bg-white text-dark'>
         
               </section>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Municipality