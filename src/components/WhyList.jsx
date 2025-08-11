import "./WhyList.css"
import ListBox from "./ListBox"
import { ListData } from "../util/ListData"



const WhyList = () => {
    return (
        <div className="WhyList">
            <h1>고교학점제, 왜 필요할까요?</h1>

            <div className="ListBoxWrapper">
                {ListData.map(({id, title, content}) => <ListBox key={id} title={title} content={content} />)}
            </div>
        </div>
    )
}

export default WhyList