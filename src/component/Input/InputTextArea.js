
const InputTextArea = (props) => {

    return (
        <div className="form-group">
            <label>{props.label}:</label><br />
            <textarea className="form-control" onChange={props.changehandler} rows='6' cols='50' value={props.value} required></textarea>
        </div>
    )
}

export default InputTextArea;