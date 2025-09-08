import Header from "../components/Header"
import Footer from "../components/Footer"

const Recommend = () => {
    

    return (
        <>
            <Header />
            <div className="container">
                <div id="home-page" className="page"></div>
                <div id="major-to-subject-page" className="page"></div>
                <div id="subject-to-major-page" className="page"></div>
                <div id="results-page" className="page"></div>
                <div id="info-page" className="page"></div>
            </div>
            <Footer />
        </>
    )
}

export default Recommend