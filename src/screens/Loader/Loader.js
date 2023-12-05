import './Loader.css';

function Loader(props) {
    return (props.trigger) ? (

        <div className="popup">
            <div className="popup-inner">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden" style={{width:100, height:100}}>Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}

export default Loader;