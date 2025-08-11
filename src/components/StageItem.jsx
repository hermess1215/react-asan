import "./StageItem.css"

const StageItem = ({titleOwn, titleTwo, titleThree}) => {
    return(
        <div className="StageItem">
            <h2>{titleOwn}</h2>
            <h1>{titleTwo}</h1>
            <h3>{titleThree}</h3>
        </div>
    )
}

export default StageItem