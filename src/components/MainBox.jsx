import "./MainBox.css"
import MainBar from "../assets/mianbar.png"
const MainBox = () => {
    return(
        <div className="MainBox">
            <img src={MainBar} alt="" />
            <button>시작하기</button>
        </div>
    )
}

export default MainBox