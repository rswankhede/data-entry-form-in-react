import React, { useState } from 'react';
import { useImperativeHandle, forwardRef } from 'react'
import ErrorModal from './Error/ErrorModal';
import InputEmail from './Input/InputEmail';
import InputText from './Input/InputText';
import InputTextArea from './Input/InputTextArea';

const AddUser = (props, ref) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [aboutme, setAboutMe] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [fields, setFields] = useState([]);
    const [isNewUser, setIsNewUser] = useState(true);
    const [error, setError] = useState();
    const [empId, setEmpId] = useState(() => {
        let userList = JSON.parse(localStorage.getItem('userList'));
        if (userList !== null && userList.length > 0) {
            let id = userList[userList.length - 1].id;
            if (id !== null) {
                return id + 1;
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    });

    useImperativeHandle(ref, () => ({
        setUserDetails(userData) {
            setEmail(userData.email);
            setGender(userData.gender);
            setMobile(userData.mobile);
            setName(userData.name);
            setFields(userData.skills);
            setAboutMe(userData.aboutme);
            setEmpId(userData.id);
            setIsNewUser(false);
        }
    }), []);

    /**
     * Function for to set employee details
     * @param Object event 
     */
    const saveData = (event) => {
        event.preventDefault();
        if(!validate()) {
            return;
        }
        let user = {
            'id': empId,
            'name': name,
            'mobile': mobile,
            'gender': gender,
            'email': email,
            'aboutme': aboutme,
            'skills': fields
        };
        if (isNewUser) {
            props.onAddUserHandler(user);
            setEmpId(empId + 1);
        } else {
            props.onEditUserHandler(user);
        }
        setIsNewUser(true);
    }

    const nameChangehandler = (event) => {
        setName(event.target.value);
    };

    const mobileChangehandler = (event) => {
        setMobile(event.target.value);
    };

    const emailChangehandler = (event) => {
        setEmail(event.target.value);
    };

    const aboutmeChangehandler = (event) => {
        setAboutMe(event.target.value);
    };

    const genderHandler = (event) => {
        setGender(event.target.value);
    }

    const handleAdd = () => {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    const handleChange = (i, event) => {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    const handleRemove = (i) => {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    /**
     * Function for to reset form
     */
    const reset = () => {
        setEmail('');
        setGender('');
        setMobile('');
        setName('');
        setFields([]);
        setAboutMe('');
        setEmpId('');
        setIsNewUser(false);
    }

    const errorHandler = () => {
        setError(null);
    }

    const validate = () => {
        if (name.length === 0) {
            setError({
                'title': 'Invalid input',
                'message': 'Please enter name'
            });
            return false;
        }

        if (mobile.length === 0) {
            setError({
                'title': 'Invalid input',
                'message': 'Please enter mobile number'
            });
            return false;
        }

        if (email.length === 0) {
            setError({
                'title': 'Invalid input',
                'message': 'Please enter email'
            });
            return false;
        }
        return true;
    }

    return (
        <div>
            {error && (
                <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>
            )}
            <div className="registration-box">
                <h3>Employee Form:</h3>
                <form onSubmit={saveData}>
                    <InputText value={name} changehandler={nameChangehandler} label={'Name'}></InputText>
                    <InputText value={mobile} changehandler={mobileChangehandler} label={'Mobile'}></InputText>
                    <InputEmail value={email} changehandler={emailChangehandler} label={'Email'}></InputEmail>
                    <InputTextArea value={aboutme} changehandler={aboutmeChangehandler} label={'Aboutme'}></InputTextArea>
                    <div className="form-group" onChange={genderHandler}>
                        <label>Gender:</label><br />
                        <input type="radio" value="Male" name="gender" checked={gender === "Male"} required={true} />&nbsp;Male &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" value="Female" name="gender" checked={gender === "Female"} required={true} />&nbsp;Female&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" value="Other" checked={gender === "Other"} name="gender" required={true} />&nbsp;Other
                </div>
                    <div>
                        <button type="button" className="btn btn-success" onClick={() => handleAdd()}>Add Skills</button>
                        {fields.map((field, idx) => {
                            return (
                                <div key={`${field}-${idx}`}>
                                    <p><input
                                        type="text"
                                        placeholder="Enter Skills"
                                        onChange={e => handleChange(idx, e)}
                                        value={field.value}
                                        className="form-control"
                                        style={{ width: '88%', float: 'left', marginBottom: "10px" }}
                                        required
                                    />
                                        <button type="button" style={{ float: "right", marginBottom: "10px" }} className="btn btn-danger" onClick={() => handleRemove(idx)}>X</button></p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="clearfix" style={{ marginTop: "15px" }}>
                        {isNewUser && <button className="btn btn-success" type='submit'>Save</button>}
                        {!isNewUser && <button className="btn btn-success" type='submit'>Update</button>}
                        <button className="btn btn-warning" type='button' onClick={reset} style={{ marginLeft: '15px' }}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default forwardRef(AddUser);
