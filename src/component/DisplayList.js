const DisplayList = (props) => {
    let index = props.index + 1;
    let skills = props.user.skills.map(({
        value
    }) => value).join(', ');

    function removeEmp(empId, event) {
        event.preventDefault();
        props.onRemove(empId)
    }

    function edit(empId, event) {
        event.preventDefault();
        props.onEdit(empId)
    }
    return (
        <tr>
            <td style={{width:"4%"}}>{index}</td>
            <td style={{width:"15%"}}>{props.user.name}</td>
            <td style={{width:"10%"}}>{props.user.mobile}</td>
            <td style={{width:"10%"}}>{props.user.email}</td>
            <td style={{width:"5%"}}>{props.user.gender}</td>
            <td style={{width:"15%"}}>{skills} </td>
            <td style={{width:"15%"}}>{props.user.aboutme}</td>
            <td style={{width:"20%"}}>
                <button type="button" className="btn btn-primary" onClick={e => edit(props.user.id, e)}>Edit</button>
                <button type="button" className="btn btn-danger" style={{ marginLeft: "5px" }} onClick={e => removeEmp(props.user.id, e)}>Delete</button>
            </td>
        </tr>
    );
}

export default DisplayList;