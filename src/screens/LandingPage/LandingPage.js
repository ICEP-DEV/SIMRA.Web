import React from "react";
import MovingComponent from '../animations/component';
import { Link,useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import background from'../../assets/backgrround.jpg';
import hands from '../../assets/hands.avif'
import dwater from '../../assets/dwater.avif';
import dirtywater from '../../assets/dirtywater.jpeg';
import { HiOutlineMail } from 'react-icons/hi';
import glassofwater from'../../assets/glassofwater.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logo from '../../assets/logo2.png'
import image from '../../assets/borehole.jpg';
import image1 from '../../assets/flowingriver.jpg';
import image2 from '../../assets/dwater.avif';
function LandingPage (){
  const navigate = useNavigate();
  function login() {
    navigate("/login")
}
return(
    <div className="landingPage_class ">

<div className="topnav">
            
            <div className="navbar-subs" onClick={login} ><span className="nav-label">Login</span></div>
            <div className="navbar-subs" ><span className='nav-label'>Events</span></div>
            <div className="navbar-subs "><div className="wrapper"></div>
                <Link to={"/home"}> <img className="rounded-img" src={logo} /></Link></div>
            <div className="navbar-subs" ><span className="nav-label">Report</span></div>
            <div className="navbar-subs split" ><span className="nav-label">Signout</span></div>


        </div>
<div className="landing-content">
<Carousel
      autoPlay={true}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
    >
      <div>
        <img src={image1} alt="Image 1" style={{height:'800px'}}  />
       
      </div>
      <div> 
        <img src={image2} alt="Image 2" style={{height:'800px'}}/>
      </div>
      <div>
        <img src={image} alt="Image 3" style={{height:'800px'}} />
      </div>
      {/* Add more images as needed */}
    </Carousel>
<section className='section-2 px-5'>
<h1>Information</h1>
        <div className='row gx-5 align-items-center'>

 
<div className='col-lg-6 order-lg-2'>
<MovingComponent
          type="fadeInFromLeft"
          duration="1000ms"
          delay="0.2s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
            
          <p className='para ' >
          	<h4 >What are the households water treatment methods?</h4>
            <li>Boiling: Bring the water to a rolling boil and maintain it for at least one minute. Allow the water to cool before use. </li>
            <li>SODIS (Solar Water Disinfection): Fill clear, plastic bottles with water and leave them in direct sunlight for at least six hours (or longer if it cloudy). disinfect the water. </li>
            <li> Chemical Disinfection: Add a cap full of bleach in 25L of water. Allow the treated water to sit for a specific contact time before consuming.</li>
            <li>Filtration: Choose a water filter certified for the removal of specific contaminants (e.g., use a cloth folded 8 times/ clay pots/ceramic filters). </li>
            <br></br>
            “Everyone has the right to have access to sufficient food and water.” </p>

        </MovingComponent>
</div>
       <div className='col-lg-6 order-lg-2'>
        <div className='p-5'>
        {/* <img className='img-fluid ' style={{width:'600px' ,height:'300px'}} src={dwater}/> */}
        </div>
     
       </div>
       </div>
       <div className='row gx-5 align-items-center'>
       <div className='col-lg-6 order-lg-2'>
        <div className='p-5'>
        <img className='img-fluid ' style={{width:'400px' ,height:'300px'}} src={glassofwater}/>
        </div>
     
       </div>
 {/*** */}
<div className='col-lg-6 order-lg-2'>
<MovingComponent
          type="fadeInFromRight"
          duration="1000ms"
          delay="0.2s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
          <p className='para ' >
            <h4>Is your water safe for drinking purposes? </h4>
          While water may appear clear,  <br></br>it may not necessarily be safe for drinking. <br></br>
           Such water can potentially lead to diarrheal and other waterborne diseases. <br></br>
           Hence, it is essential for you to regularly monitor the quality of your water. <br></br>
            </p>

        </MovingComponent>
</div>
       
       </div>
      </section>
</div>
<footer>
    <Footer/>
</footer>
    </div>
)
}

 export default LandingPage;