import './Load_Waves.css'
function Load_Waves(props) {

  return (props.trigger) ? (
    <div className='waves'>
      <div class="center">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>

  ) : "";
}

export default Load_Waves;

