
const InputText = (props) => {

    return (
        <div className="form-group">
            <label>{props.label}:</label><br />
            <input type="text" className="form-control" value={props.value} onChange={props.changehandler}/>
        </div>
    )
}

export default InputText;