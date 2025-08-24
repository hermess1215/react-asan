import "./Footer.css"
import Google from "../assets/icons8-구글-로고-48.png"
import Instar from "../assets/free-icon-instagram-4494488.png"
import Git from "../assets/free-icon-github-logo-25231.png"

const Footer = () => {
    return(
        <div className="Footer">
            <p>&copy;Copyright. 2025 Asan. All rights reserved.</p>

            <ul className="logoImgWrapper">
                <li><img src={Instar} alt="Insta" /></li>
                <li><img src={Google} alt="Google" /></li>
                <li><img src={Git} alt="Github" /></li>
            </ul>

        </div>
    )
}

export default Footer