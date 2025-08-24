import './SubjectList.css'

const SubjectList = () => {
    return(
        <>
            <div className="search-wrap">
                <input type="text" id="searchInput" placeholder="학과명을 입력하세요" onChange="filterMajors()" />
            </div>
            <div id="list"></div>
        </>
    )
}

export default SubjectList