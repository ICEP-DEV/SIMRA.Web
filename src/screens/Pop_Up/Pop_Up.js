import './Pop_Up.css';

function Loader(props) {
    return (props.trigger) ? (
        <div className="register-popup">
            <div className="register-popup-inner">
                <div className="popup-inner-header">
                    <label  style={{color:'black', marginTop:"35px", fontSize:"1em"}} onClick={() => props.setTrigger(false)}><h2>X</h2></label>
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Loader;