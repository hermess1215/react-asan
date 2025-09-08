import { useState, useEffect } from "react";
import "./SchoolList.css";

const SchoolList = () => {
  const [allSchools, setAllSchools] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "76d8d68ac47a5b247d639275276adf76";
  const majorSeqList = Array.from({ length: 56 }, (_, i) => i + 1);

  useEffect(() => {
    async function loadSchools() {
      setLoading(true);
      try {
        const urls = [
          `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&region=100260&sch1=100363&perPage=250`,
          `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&region=100260&sch1=100364&perPage=250`,
        ];
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const dataList = await Promise.all(responses.map((res) => res.json()));
        const schools = dataList.flatMap((data) => data.dataSearch?.content || []);
        setAllSchools(schools.filter((s) => s.adres?.includes("서울특별시")));
      } catch (e) {
        console.error("데이터 불러오기 실패:", e);
      } finally {
        setLoading(false);
      }
    }
    loadSchools();
  }, []);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredSchools = allSchools.filter((s) =>
    s.schoolName.includes(searchKeyword)
  );

  const handleSchoolClick = async (school) => {
    setSelectedSchool(school.schoolName);
    setMajors([]); // 초기화
    let foundMajors = [];
    for (const majorSeq of majorSeqList) {
      try {
        const url = `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=MAJOR_VIEW&contentType=json&gubun=high_list&majorSeq=${majorSeq}`;
        const response = await fetch(url);
        const data = await response.json();
        const setshl = data.dataSearch?.content?.[0]?.setshl || [];
        const matched = setshl.filter(
          (item) =>
            item.schoolName?.includes(school.schoolName) &&
            item.area === "서울특별시"
        );
        if (matched.length > 0) {
          foundMajors.push({
            majorName: data.dataSearch?.content?.[0]?.major,
            department: data.dataSearch?.content?.[0]?.department,
            summary: data.dataSearch?.content?.[0]?.summary,
            schools: matched,
          });
        }
      } catch {
        // 무시
      }
    }
    setMajors(foundMajors);
  };

  return (
    <div>
      <div className="search-wrap">
        <input
          type="text"
          id="searchInput"
          placeholder="학교 이름을 입력하세요"
          value={searchKeyword}
          onChange={handleSearch}
        />
      </div>

      {loading && <p>불러오는 중...</p>}

      <div id="list">
        {filteredSchools.length === 0 ? (
          <p className="no-data">검색 결과가 없습니다.</p>
        ) : (
          filteredSchools.map((school) => (
            <div
              key={school.seq}
              className="school"
              onClick={() => handleSchoolClick(school)}
            >
              <strong>{school.schoolName}</strong>
              <div className="meta">주소: {school.adres}</div>
              <div className="meta">
                홈페이지:{" "}
                {school.link ? (
                  <a href={school.link} target="_blank" rel="noreferrer">
                    {school.link}
                  </a>
                ) : (
                  "없음"
                )}
              </div>
              <div className="meta">학교구분: {school.schoolGubun}</div>

              {selectedSchool === school.schoolName && (
                <div className="departments">
                  {majors.length === 0 ? (
                    <div className="no-data">학과 정보를 불러오는 중...</div>
                  ) : (
                    majors.map((m, idx) => (
                      <div key={idx} className="department">
                        <div className="major-title">{m.majorName}</div>
                        <div className="major-detail">
                          <div className="desc">{m.summary}</div>
                          <div className="desc">세부학과: {m.department}</div>
                          <div className="schools">
                            {m.schools.map((s, i) => (
                              <div key={i}>
                                {s.schoolName} ({s.majorName})
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SchoolList;
