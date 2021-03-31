import "./Loader.css"

function Loader({ visible = false }) {
    return (
        <div>{visible === true ? <div class="lds-dual-ring"></div> : null}</div>

    )
}

export default Loader;