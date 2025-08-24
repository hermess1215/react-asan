import './SchoolList.css'

const SchoolList = () => {


    return (
        <>
            <div className="search-wrap">
                <input type="text" id="searchInput" placeholder="학교 이름을 입력하세요" onChange="filterMajors()" />
            </div>
            <div id="list"></div>
        </>
    )
}

export default SchoolList