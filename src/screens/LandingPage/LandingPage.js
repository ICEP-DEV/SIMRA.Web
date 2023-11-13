import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar_Home/Navbarhome';
import image from '../../assets/borehole.jpg';
import image1 from '../../assets/flowingriver.jpg';
import image2 from '../../assets/dwater.avif';
import { Carousel } from 'react-responsive-carousel';
import glassofwater from'../../assets/glassofwater.jpg';
import './LandPage.css';
import { useSelector } from 'react-redux';
import MovingComponent from '../animations/component';
import Footer from '../Footer/Footer';

function LandingPage() {
  
  let navigate = useNavigate();
  let user_info = useSelector((state) => state.user.value)

  return (
    <div className='hero' >

      <div className=''>
        <Navbar />
      </div>



     
    <Carousel className='carousel'
      autoPlay={true}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
    >
     
      <div >
     
        <img src={image1} alt="Image 1" />   
      </div>
      <div> 
        <img src={image2} alt="Image 2" />
      </div>
      <div>
        <img src={image} alt="Image 3" />
      </div>
      {/* Add more images as needed */}
    </Carousel>


    <section className='section-2 '>
<h1 className='text-primary'>About Simra</h1>
       



 <MovingComponent
          type="glowing"
          duration="1000ms"
          delay="0.2s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
            
          <p className='para font_7 wixui-richtext_text text-center text-dark ' >
          SIMRA is a cutting-edge web tool revolutionizing water resource management. It evaluates and mitigates microbial risks in water sources,<br/>
providing a robust framework for addressing health hazards from contamination. With seamless data integration, advanced modeling, <br/>
and decision support, SIMRA empowers stakeholders to protect public health and ensure water system sustainability. <br/><br/>
Its ability to integrate diverse data sources, simulate contaminant behavior, and facilitate scenario analysis enables effective risk management strategies.<br/>
 User-friendly interfaces and interactive visualizations promote transparent communication, fostering informed discussions. <br/><br/>
 SIMRA's iterative approach supports continuous monitoring and adaptation, refining interventions and enhancing risk management practices over time.<br/>
  Overall, SIMRA marks a significant advancement in water resource management, <br/>
offering a comprehensive solution for assessing and managing microbial risks to promote long-term public health and water system vitality.</p>

        </MovingComponent> 

      
        <section className='section-h2s'> 
                  
        <h2 className='text-primary text-center'>Simra Levels</h2>
<div className='level1-desccription'>
                           
                            <div className='h2s-cards row align-items-start justify-content-around'>

                                <div className='card text-bg-primary p-3' style={{width:'18rem'}} >
                                <h5 className='text-center'>Household</h5>
                                    <div className='card-body  text-center '>
                                   <p className='text-light fw-light'> SIMRA makes risk assessment and management accessible to everyone, especially those with limited resources.<br/>
                                      It's designed to be simple, easy to use, and practical for a wide range of users, including households and individuals.</p>
                                    </div>
                                    
                                </div>
                                <div className='card text-bg-primary p-3' style={{width:'18rem'}}>
                                    <h5 className='text-center'>Intermidiate</h5>
                                    <div className='card-body text-center '>
                                    <p className='text-light fw-light'>This level of SIMRA goes beyond the basics, offering detailed water quality analysis and advanced microbial risk assessment tools. <br/>
                                      It's tailored for water treatment plant managers, government officials, researchers, and experts who need in-depth and comprehensive data.</p>
                                </div> </div>
                                <div className='card text-bg-primary p-3' style={{width:'18rem'}}>
                                    <h5 className='text-center'>Expert</h5>
                                    <div className='card-body  text-center '>
                                    <p className='text-light fw-light '>At the advanced level, SIMRA is designed for experts, microbiologists, 
        and researchers seeking in-depth microbial analysis and advanced risk assessment capabilities.<br></br>
         It provides molecular biology techniques and detailed reports to meet the specific needs of these professionals.</p>
                                </div> </div>
                                




                            </div>
                        </div>
</section>
 {/*** */}

<MovingComponent
          type="fadeInFromRight"
          duration="1000ms"
          delay="0.2s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
         
            <h4 className='text-primary text-center'>Is your water safe for drinking purposes? </h4>
            <p className='para font_7 wixui-richtext_text text-center text-dark ' >
          While water may appear clear,  <br></br>it may not necessarily be safe for drinking. <br></br>
           Such water can potentially lead to diarrheal and other waterborne diseases. <br></br>
           Hence, it is essential for you to regularly monitor the quality of your water. <br></br>
            </p>

        </MovingComponent>

      </section>
      
      <footer> 
          <Footer />
        </footer>
    </div>




  )
}
export default LandingPage;