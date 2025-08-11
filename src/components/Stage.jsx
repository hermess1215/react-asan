import StageItem from "./StageItem"
import "./Stage.css"
import Back from "../assets/b77c9b6c6b36bfb8be99df409fab3d34c82616fa.jpg";
import { TitleList } from "../util/TitleList";

const Stage = () => {
    return (
      <div className="Stage">
        <img src={Back} alt="" />
        <h1>과목추천? 어떻게 이루어지나요?</h1>
        <h2>저희는 다음단계를 통해 과목을 추천 해드립니다</h2>
        <div className="StageWrapper">
            {TitleList.map(({idx, titleOwn, titleTwo, titleThree}) =>
            <StageItem key={idx}
            titleOwn={titleOwn} 
            titleTwo={titleTwo} 
            titleThree={titleThree} 
            />)}
        </div>
      </div>
    );
}

export default Stage