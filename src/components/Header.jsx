import "./Header.css"
import logo from "../assets/logo-removebg-preview.png"


const Header = () => {
    return(
        <div>
            <header>
                <img src={logo} alt="" />

                <ul>
                    <li>학교 학과 정보 조회</li>
                    <li>학과 정보 조회</li>
                    <li>맞춤형 대학 조회</li>
                </ul>
                
            </header>
        </div>
    )
}

export default Header