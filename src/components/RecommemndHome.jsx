import './RecommendHome.css'

const RecommendHome = () => {


    return (
        <div className="container">
            <div id="home-page" className="page">
                <div className="text-center pt-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">당신의 진로, 여기서 설계해보세요!</h1>
                    <p className="text-lg text-textSecondary mb-12 max-w-2xl mx-auto">
                        고교학점제, 더 이상 복잡하게 생각하지 마세요. <br />
                        나에게 맞는 학과를 찾고, 필요한 과목 선택까지 한 번에!
                    </p>
                    <div className="grid md-grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="card">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-secondary mb-4">🎯 학과 기준 추천</h2>
                                <p className="text-textSecondary mb-6">
                                    가고 싶은 대학이나 학과가 있나요? <br /> 해당 학과 진학에 유리한 고등학교 과목들을 추천해 드립니다.
                                </p>
                                <button id="navigateToMajorToSubject" className="btn btn-secondary btn-lg w-full">추천 과목 찾기</button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-accent mb-4">📚 과목 기준 추천</h2>
                                <p className="text-textSecondary mb-6">
                                    이미 선택했거나 관심 있는 과목들이 있나요? <br /> 이 과목들로 진학하기 좋은 학과들을 추천해 드립니다.
                                </p>
                                <button id="navigateToSubjectToMajor" className="btn btn-accent btn-lg w-full">추천 학과 찾기</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 p-8 bg-blue-50 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-primary mb-4">✨ 고교학점제 완전 정복!</h3>
                        <p className="text-textSecondary mb-6">
                            고교학점제가 무엇인지, 어떻게 활용해야 하는지 궁금하다면? <br />
                            자세한 정보와 졸업 요건 시뮬레이션(간단) 기능을 확인해보세요.
                        </p>
                        <button id="navigateToInfo" className="btn btn-outline btn-lg">고교학점제 알아보기</button>
                    </div>
                </div>
            </div>
            <div id="major-to-subject-page" className="page"></div>
            <div id="subject-to-major-page" className="page"></div>
            <div id="results-page" className="page"></div>
            <div id="info-page" className="page"></div>
        </div>
    )
}

export default RecommendHome