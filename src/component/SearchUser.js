const SearchUser = (props) => {

    const SearchUser = (event) => {
        let userName = event.target.value;
        props.onSearchUser(userName);
    }
    return (
        <div>
            <div>
                <h3>Employee List</h3>
                <hr />
            </div>
            <div style={{ width: "30%", marginTop: "15px" }}>
                <input type="text" className="form-control" onChange={SearchUser} placeholder="Search user by name" />
            </div>
        </div>
    )
}


export default SearchUser;