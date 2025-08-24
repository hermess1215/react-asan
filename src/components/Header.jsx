import "./Header.css"
import logo from "../assets/logo-removebg-preview.png"
import { Link } from "react-router-dom"

const Header = () => {
    return(
        <>
            <header>
                <Link to='/' className='logo'><img src={logo} alt="logo" className="img" /></Link>

                <ul>
                    <li><Link to='/schools' className='menuLink'>학교 학과 정보 조회</Link></li>
                    <li><Link to='/subjects' className='menuLink'>학과 정보 조회</Link></li>
                    <li><Link to='/recommend' className='menuLink'>맞춤형 대학 조회</Link></li>
                </ul>
                
            </header>
        </>
    )
}

export default Header