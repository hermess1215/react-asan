import "./ListBox.css"
const ListBox = ({content, title}) => {
    return(
        <>
            <div className="ListBox">
                <div className="TitleBox">{title}</div>
                <p>{content}</p>
            </div>
        </>
    )
}

export default ListBox