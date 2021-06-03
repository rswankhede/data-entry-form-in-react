import DisplayList from "./DisplayList"

const UserList = (props) => {

    function empRemoveHandler(id) {
        props._handleDelete(id)
    }

    function empEditHandler(id) {
        props._handleEdit(id)
    }

    return (
        <div className="table-box">
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <td><b>No.</b></td>
                        <td><b>Name</b></td>
                        <td><b>Mobile</b></td>
                        <td><b>Email</b></td>
                        <td><b>Gender</b></td>
                        <td><b>Skills</b></td>
                        <td><b>Aboutme</b></td>
                        <td><b>Actions</b></td>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, index) => (
                        <DisplayList key={user.id} user={user} index={index} onRemove={empRemoveHandler} onEdit={empEditHandler}></DisplayList>
                    ))}
                </tbody>
            </table>
        </div >
    )

};

export default UserList;