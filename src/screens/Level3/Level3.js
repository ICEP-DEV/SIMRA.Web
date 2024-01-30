import './Level3.css'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Slider from "react-slick";
import Footer from '../Footer/Footer';
import Molecular from '../../assets/Molecular.png';
import qpcr from '../../assets/qpcr.jpg';
import sample_collection from '../../assets/sample_collection.PNG';
function Level3() {
    const settings = {
        dots: true,
        centerMode: true,
    centerPadding: '10px',
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
      speed: 2000,
      autoplaySpeed: 6000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
          },
        },
      ],
    
      };
    return (
        <div className='hero-all' >
            <Navbar />
            <div className='content'>
                <Header />
                <h2 className='text-primary text-center'>Expert</h2>
                <div className='container-wrapper'>
                    <div className='lvl1'>

                        <div className='main-level1'>
                            <div className='table3'>
                                <Link to='/reference_pathogen' class="btn btn-success btn-sanitary">Reference Pathogen</Link>
                                <Link to='/mst' className='btn btn-success btn-sanitary'>MST</Link>
                            </div>
                        </div>
                    </div>
                    <h3 className='text-primary text-center' >How do we select reference pathogens</h3>
                    <p>To assess water contamination risks, it's crucial to find certain bacteria indicators and tracking genes in water when harmful germs are present. <br/>
                        These indicators can act as substitutes to gauge the risk of specific waterborne diseases. <br/>
                         Choosing reference germs should consider local conditions and be based on comprehensive data, including disease surveillance and outbreak investigations.  <br/>
                         These reference germs serve as benchmarks for setting health-related targets. <br/>
                         It's essential to ensure there's enough data on exposure and disease relationships before using these indicators or genes in risk assessments.</p>
                    {/* <h3 className='text-primary'>What is a microbial source tracking?</h3>
                    <p>Microbial source tracking (MST) is a term used for the process of identifying the source of faecal contamination in the environment.</p>
                    <h6> </h6>
                    <h3 className='text-primary'>What is a pathogen?</h3>
                    <p> A pathogen is defined as an organism causing disease to its host, with the severity of the disease symptoms referred to as virulence.
                         Pathogens are taxonomically widely diverse and comprise viruses and bacteria as well as unicellular and multicellular eukaryotes.</p> */}
                </div>
                <section className='section-lvl3'>
                <h2 className='text-primary text-center'  >How do we calculate the ratio </h2>
                <Slider {...settings}>
          <div className='card-lvl3' style="width: 18rem;">
            <div className="header-lvl3"><h3>1. Sample Collection:</h3></div>
           <div>
            <li>Collect samples in triplicate from each water source to enhance the reliability of the data.</li>
           <li>Consider spatial heterogeneity by capturing variability within the sampling area.</li>
<img src={sample_collection} className='image-lvl3 w-75 '/>
           </div>
          </div>
          <div className='card-lvl3'>
          <div className="header-lvl3"><h3>2. Enumeration of Microorganisms:</h3></div>
            <div>
                <li>Utilize membrane filtration to concentrate of microorganisms in the collected water samples.</li>
                    <li>Employ standardized protocols for consistent and accurate results. For example:</li>
                </div>
          </div>
          <div className='card-lvl3'>
          <div className="header-lvl3"><h3>2 a. Culture-based method:</h3></div>
            <div>
                <li> Conduct simultaneous enumeration of Faecal Indicator Bacteria (FIB), Microbial Source Tracking (MST), and specific pathogens on designated media (e.g., E. coli, Enterococci).</li>
           <li>Maintain uniform sample volumes for FIB, MST, and pathogen analyses. </li>
           <li>Follow standardized protocols for sample processing, culture, and colony counting.</li>
      <li>Express concentrations as colony-forming units per unit volume (CFU/mL).</li>


                </div>
          </div>
          <div  className='card-lvl3'>
          <div className="header-lvl3"><h3>2 b. Microscopic examination:</h3></div>
          <div>
            <li>For protozoa, enumerate cysts or oocysts using a microscope.</li>
            <img src={Molecular}  className='image-sani w-75 '/>
          </div>
          </div>
          <div className='card-lvl3'>
          <div className="header-lvl3"><h3> 2 c. Molecular Analysis (virus, bacteria, protozoan):</h3>
           </div>
            <div>
                <li>Utilize quantitative polymerase chain reaction (qPCR) or other molecular techniques to amplify and quantify microbes associated with fecal contamination.</li>
            <img src={qpcr}  className='image-sani w-75 '/>
            </div>
          </div>
          <div className='card-lvl3'>
          <div className="header-lvl3"><h3>3.Establishing the Relationship:</h3>
         </div>
          <div> 
            <li>Calculate the ratio of FIB/qMST marker gene concentration to the concentration of reference pathogens in related sources.</li>
            <li>This may involve comparing the FIB/qMST marker gene concentrations to the concentrations of specific reference pathogens detected in the same samples.</li>
            <li>Employ statistical methods to analyze the data and determine the significance of the observed ratio variations.</li>
            <li>Evaluate whether the ratio is consistent across different samples or if there are trends related to environmental parameters.</li>
            </div>
          </div>
        </Slider>
                </section>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}


export default Level3;