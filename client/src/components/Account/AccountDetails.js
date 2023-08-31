import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';

function AccountDetails({ user, setUser }) {
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup.string(),
        password: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((user) => setUser(user));
                  }
            }).then(navigate(`/`))
            alert("Account Details Changed")

        }
    })

    const handleLogOut = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(null) )
        .then(navigate(`/`))
    }
    
    return (
        <div>
            <h1 className='container flex-c text-center'>Account Details</h1>
                <div className='account-details' >
                <form onSubmit={formik.handleSubmit}>
                    <h3>Username Information</h3>
                        <span className='text-italic'>Current Username:&nbsp;&nbsp;&nbsp;{user.username}</span>
                        <br />
                        <span>New Username: </span>
                        <input name="username" value={formik.values.username}
                            onChange={formik.handleChange}
                            style={{color: '#70a7ff'}} />
                        <p style={{ color: "red" }}> {formik.errors.username}</p>
                        <button className='btn-save' type="submit">Save</button>
                    <h3>Password Information</h3>
                        <span>New Password: </span>
                        <input name="password" value={formik.values.password}
                            onChange={formik.handleChange}
                            style={{color: '#70a7ff'}} />
                        <p style={{ color: "red" }}> {formik.errors.password}</p>
                        <button className='btn-save' type="submit">Save</button>
                    <h3>In Cart:</h3>

                    <button className='btn-logout' onClick={handleLogOut}>Logout</button>
                </form>    
                </div>
        </div>
    )
}
export default AccountDetails;