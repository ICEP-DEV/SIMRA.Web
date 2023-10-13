import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar_l2 from '../SideBar_l2/SideBar_l2'
import Header from '../../Header/Header';
import { useSelector } from 'react-redux';
function Level2() {
    let navigate = useNavigate();
    let user_info = useSelector((state) => state.user.value)

    return (
        <div className='hero-all' >
          
     <div className='sidenav border-secondary rounded'>
            <SideBar_l2/>
        </div>
            <div className='main-all'>

                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>

                    <div className='home-background'>


                       
<div className='mb-5 text-center display-6 ml-5'>
<label className='mt-5'>Hi {user_info.user_firstname} {user_info.user_lastname}, Welcome To Simra</label>
</div>

<div className=''>

{/* 
<div class="card" >
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
<div class="card" >
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */}
{/* <div className='card' >
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div>  */}

</div>       
          
                    </div>

                    </div>

                   


                </div>
            </div>
        </div>
    )
}
export default Level2;