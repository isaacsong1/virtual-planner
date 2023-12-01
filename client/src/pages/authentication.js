import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
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
            <div id="register-switch">
                <h2>Please Log in or Sign up!</h2>
                <h3>{signUp ? 'Already a member?' : 'Not a member?'}</h3>
                <button onClick={handleClick}>{signUp ? 'Log In!' : 'Register now!'}</button>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.email && formik.touched.email ? <div className="error-message show">{formik.errors.email}</div> : null}
                {signUp &&(
                    <>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.username}</div> : null}
                    </>
                )}
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.errors.password && formik.touched.password ? <div className="error-message show">{formik.errors.password}</div> : null}
                <input type='submit' value={signUp ? 'Sign Up!' : 'Log In!'} />
            </form>
        </div>
    )
}

export default Authentication
