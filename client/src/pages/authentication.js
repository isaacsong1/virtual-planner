import React, { useState } from "react";
// import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik"
import * as yup from "yup"
// import * as snackbar from "snackbar";
import "../styles/authentication.css";

function Authentication({updateUser, handleNewAlert}) {
    const [signUp, setSignUp] = useState(false);
    // const history = useHistory();

    const handleClick = () => setSignUp((signUp) => !signUp)

    const signUpSchema = yup.object().shape({
        username: yup.string()
            .required("Please enter a username"),
        email: yup.string()
            .email("Must be a valid email")
            .required("Please enter a user email"),
        password: yup.string()
            .required('Please enter a user password') 
            .min(12, 'Password is too short - should be 12 characters minimum.')
    })

    const logInSchema = yup.object().shape({
        email: yup.string()
            .email("Must be a valid email")
            .required("Please enter a user email"),
        password: yup.string()
            .required('Please enter a password') 
    })

    const url = signUp ? "/register" : "/login"

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: signUp ? signUpSchema : logInSchema,
        onSubmit: (values) => {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(resp => {
                if (resp.ok) { 
                    resp.json().then(updateUser)
                } else {
                    resp.json().then(errorObj => handleNewAlert(errorObj.error))
                }
            })
            .catch(handleNewAlert)
        }
    })

    return (
        <div id="account-form">
            <div id='content'>
                <h1>Welcome to Virtual Planner</h1>
                <div id="register-switch">
                    {/* {signUp ? <h2>Create your free account</h2> : <h2>Log in here</h2>} */}
                    {/* <h3>{signUp ? 'Already a member?' : 'Not a member?'}</h3>
                    <button onClick={handleClick}>{signUp ? 'Log In!' : 'Register now!'}</button> */}
                    {signUp ? <button class='signup' onClick={() => handleClick(true)} >Login</button> : <button id='underline' class='signup' >Login</button>}
                    {signUp ? <button id='underline' class='signup' >Register</button> : <button class='signup' onClick={() => handleClick(false)} >Register</button>}
                    {/* <button class='signup'>Register</button> */}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div class='inputs'>
                        <label htmlFor='email'>Email</label>
                        <input class='box' id='email' type='text' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? <div className="error-message show">{formik.errors.email}</div> : null}
                    </div>
                    {signUp &&(
                        <div class='inputs'>
                            <label htmlFor='username'>Username</label>
                            <input class='box' type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.username}</div> : null}
                        </div>
                    )}
                    <div class='inputs'>
                        <label htmlFor='password'>Password</label>
                        <input class='box' type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.password && formik.touched.password ? <div className="error-message show">{formik.errors.password}</div> : null}
                    </div>
                    <input id='login' type='submit' value={signUp ? 'Sign Up' : 'Log In'} />
                </form>
            </div>
        </div>
    )
}

export default Authentication
