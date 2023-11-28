import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Video.css";

function VideoScreen(){
    return(
<div className='hero-all' >

<div className='sidenav'>
    <Sidebar />
</div>

<div className='main-all'>
    <div className='content'>
        <div className='container-wrapper'>
<iframe
 width="560" 
 height="315" 
 src="https://www.youtube.com/embed/zlxFkfVO8E0" 
 title="YouTube video player" 
 frameborder="0" 
 allow="accelerometer; 
 autoplay; 
 clipboard-write; 
 encrypted-media; 
 gyroscope; 
 picture-in-picture; 
 web-share" allowfullscreen>
    
</iframe>

<iframe
width="560" 
height="315" 
src="https://www.youtube.com/embed/WTxRxQsVXsY" 
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; 
autoplay; 
clipboard-write; 
encrypted-media; 
gyroscope; 
picture-in-picture; 
web-share" allowfullscreen
>

</iframe>


            </div>
            </div>
            </div>
            </div>
    )
}
export default VideoScreen;