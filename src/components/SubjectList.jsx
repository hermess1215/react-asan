import { useState, useEffect } from "react";
import "./SubjectList.css";

const SubjectList = () => {
  const [majors, setMajors] = useState([]);
  const [filteredMajors, setFilteredMajors] = useState([]);
  const [expandedMajor, setExpandedMajor] = useState(null);
  const [schools, setSchools] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "76d8d68ac47a5b247d639275276adf76";
  const majorSeqList = Array.from({ length: 56 }, (_, i) => i + 1);

  // 전공 불러오기
  useEffect(() => {
    async function loadMajors() {
      setLoading(true);
      try {
        const majorPromises = majorSeqList.map(async (majorSeq) => {
          const url = `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=MAJOR_VIEW&contentType=json&gubun=high_list&majorSeq=${majorSeq}`;
          const response = await fetch(url);
          const data = await response.json();
          return data.dataSearch?.content?.[0] || null;
        });

        const majorsData = await Promise.all(majorPromises);
        const validMajors = majorsData.filter((m) => m !== null);
        setMajors(validMajors);
        setFilteredMajors(validMajors);
      } catch (e) {
        console.error("전공 불러오기 실패:", e);
      } finally {
        setLoading(false);
      }
    }
    loadMajors();
  }, []);

  // 검색 필터링
  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredMajors(majors);
    } else {
      const filtered = majors.filter(
        (m) =>
          m.major.includes(searchKeyword) ||
          (m.department && m.department.includes(searchKeyword))
      );
      setFilteredMajors(filtered);
    }
  }, [searchKeyword, majors]);

  // 전공 클릭 → 해당 전공 학교 정보 불러오기
  const handleMajorClick = async (major) => {
    if (expandedMajor === major.major) {
      setExpandedMajor(null); // 이미 열려 있으면 닫기
      return;
    }
    setExpandedMajor(major.major);

    if (schools[major.major]) return; // 이미 불러온 경우 캐시 사용

    try {
      const seoulSchools = major.setshl?.filter(
        (school) => school.area === "서울특별시"
      );
      if (!seoulSchools || seoulSchools.length === 0) {
        setSchools((prev) => ({ ...prev, [major.major]: [] }));
        return;
      }

      const schoolUrls = [
        `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&region=100260&sch1=100362&perPage=250`,
        `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&region=100260&sch1=100363&perPage=250`,
        `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&region=100260&sch1=100364&perPage=250`,
        `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=high_list&region=100260&sch1=100365&perPage=250`,
      ];

      const responses = await Promise.all(schoolUrls.map((url) => fetch(url)));
      const dataList = await Promise.all(responses.map((res) => res.json()));
      const allSchools = dataList.flatMap((d) => d.dataSearch?.content || []);

      const schoolDetails = seoulSchools.map((school) => {
        const info = allSchools.find((s) => s.schoolName === school.schoolName);
        return {
          schoolName: school.schoolName,
          majorName: school.majorName,
          adres: info?.adres || "정보 없음",
          homepage: info?.link || null,
          schoolGubun: info?.schoolGubun || "정보 없음",
        };
      });

      setSchools((prev) => ({ ...prev, [major.major]: schoolDetails }));
    } catch (e) {
      console.error("학교 불러오기 실패:", e);
    }
  };

  return (
    <div>
      <div className="search-wrap">
        <input
          type="text"
          id="searchInput"
          placeholder="학과명을 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {loading && <p>불러오는 중...</p>}

      <div id="list">
        {filteredMajors.length === 0 ? (
          <p className="no-data">검색 결과가 없습니다.</p>
        ) : (
          filteredMajors.map((major) => (
            <div
              key={major.major}
              className="major"
              onClick={() => handleMajorClick(major)}
            >
              <strong>{major.major}</strong>
              <div className="meta">세부학과: {major.department || "없음"}</div>
              <div className="meta">학과 설명: {major.summary || "없음"}</div>

              {expandedMajor === major.major && (
                <div className="schools">
                  {schools[major.major] === undefined ? (
                    <p className="no-data">학교 정보를 불러오는 중...</p>
                  ) : schools[major.major].length === 0 ? (
                    <p className="no-data">서울 지역 학교 정보가 없습니다.</p>
                  ) : (
                    schools[major.major].map((s, i) => (
                      <div
                        key={i}
                        className="school"
                        onClick={() =>
                          s.homepage && window.open(s.homepage, "_blank")
                        }
                      >
                        <strong>{s.schoolName}</strong>
                        <div className="meta">주소: {s.adres}</div>
                        <div className="desc">학과명: {s.majorName}</div>
                        <div className="desc">
                          홈페이지:{" "}
                          {s.homepage ? (
                            <a
                              href={s.homepage}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {s.homepage}
                            </a>
                          ) : (
                            "없음"
                          )}
                        </div>
                        <div className="desc">학교구분: {s.schoolGubun}</div>
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

export default SubjectList;
