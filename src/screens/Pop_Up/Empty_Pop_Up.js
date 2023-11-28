import './Pop_Up_Level2.css';

function Empty_Pop_Up(props) {
    return (props.trigger) ? (
        <div className="register-popup">
            <div className="register-popup-inner">
                <div className="popup-inner-header">
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Empty_Pop_Up;