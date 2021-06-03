import './App.css';
import AddUser from './component/AddUser';
import React, { useState, useRef } from 'react';
import UserList from './component/UserList';
import SearchUser from './component/SearchUser';

function App() {
  const [userList, setUsersList] = useState(() => {
    const list = JSON.parse(localStorage.getItem('userList'));
    if (list != null) {
      return list;
    } else {
      return [];
    }
  });
  const ref = useRef();

  /**
   * Function for to save employee record
   * @param Object userData 
   */
  const addUserHandler = (userData) => {
    setUsersList(
      (prevUserList) => {
        localStorage.setItem('userList',
          JSON.stringify(
            [...prevUserList,
              userData]
          )
        );
        return [...prevUserList,
          userData]
      }
    );
  };

  /**
   * Function to delete employee record from list
   * @param {*} id 
   */
  const deleteEmp = (id) => {
    const newList = userList.filter((item) => item.id !== id);
    setUsersList(newList);
    localStorage.setItem('userList', JSON.stringify(newList));
  }

  /**
   * Function for set employee details to edit
   *  @param int id 
   */
  const setEmployeeDetailsForEdit = (id) => {
    const editUserDetails = userList.filter((item) => item.id === id);
    ref.current.setUserDetails(editUserDetails[0]);
  }

  /**
   * Function for to update the  employee details
   * @param Object user
   */
  const editUserHandler = (user) => {
    let users = getUserList();
    let index = users.findIndex(function (item) {
      return item.id === user.id;
    });
    let data = [...users];
    data[index] = user;
    setUsersList(data);
    localStorage.setItem('userList', JSON.stringify(data));
  };

  /**
   * Function for to search user by employee name
   * @param string userName 
   * @returns void
   */
  const searchUser = (userName) => {
    let searchUserList = getUserList();
    //If user name is empty then retrun all employee
    if (userName == '') {
      setUsersList(searchUserList);
      return;
    }

    let searchStringSplit = userName.split(/(\s+)/).filter(function (e) { return e.trim().length >= 0; })
    let regx = new RegExp(searchStringSplit.join("|"))
    const searchUsersList = getUserList().filter((item) =>
      regx.test(item.name)
    );
    setUsersList(searchUsersList);
  }

  /**
   * Function for to return Employee list from local storage
   * @returns array
   */
  const getUserList = () => {
    return JSON.parse(localStorage.getItem('userList'));
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <AddUser onAddUserHandler={addUserHandler} ref={ref} onEditUserHandler={editUserHandler}></AddUser>
      </div>
      <div className="col-md-8">
        <SearchUser onSearchUser={searchUser}></SearchUser>
        <UserList users={userList} _handleDelete={deleteEmp} _handleEdit={setEmployeeDetailsForEdit}></UserList>
      </div>
    </div>
  );
}

export default App;
