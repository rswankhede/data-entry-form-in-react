const InputEmail = (props) => {

    return (
        <div className="form-group">
            <label>{props.label}:</label><br />
            <input type="email" className="form-control" onChange={props.changehandler} value={props.value} />
        </div>
    )
}

export default InputEmail;