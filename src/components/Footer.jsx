import "./Footer.css"
import Google from "../assets/icons8-구글-로고-48.png"
import Instar from "../assets/free-icon-instagram-4494488.png"
import Git from "../assets/free-icon-github-logo-25231.png"

const Footer = () => {
    return(
        <div className="Footer">
            <p>Copyright. 2025 Aarsan. All rights reserved</p>

            <ul className="logoImgWrapper">
                <li><img src={Instar} alt="" /></li>
                <li><img src={Google} alt="" /></li>
                <li><img src={Git} alt="" /></li>
            </ul>

        </div>
    )
}

export default Footer