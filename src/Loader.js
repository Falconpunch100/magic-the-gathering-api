import "./Loader.css"

function Loader({ visible = false }) {
    return (
        <div>{visible === true ? <div className="lds-dual-ring"></div> : null}</div>

    )
}

export default Loader;