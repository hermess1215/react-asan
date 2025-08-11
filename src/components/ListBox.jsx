import "./ListBox.css"
const ListBox = ({content, title}) => {
    return(
        <div>
            <div className="ListBox">
                <div className="TitleBox">{title}</div>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default ListBox