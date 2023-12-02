import React, { useState } from "react";
import { useOutletContext, useParams  } from 'react-router-dom';
import { useFormik } from "formik"
import * as yup from "yup"
import "../styles/profile.css";
import Box from '@mui/system/Box';
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
  const [isEditting, setIsEditting] = useState(false);
  const { user, updateUser, handleNewAlert } = useOutletContext();
  const { id } = useParams();

  const handleEdit = () => {
    setIsEditting(!isEditting)
  }

  const profileSchema = yup.object().shape({
    username: yup.string()
    .required("Please enter a username")
    .min(3, "Username is too short - should be 3 characters minimum")
    .max(20, "Username is too long - should be 20 characters maximum"),
    location: yup.string()
    .min(2, "Location is too short - should be 2 characters minimum")
    .max(15, "Location is too long - should be 15 characters maximum"),
    bio: yup.string()
    .min(5, "Bio is too short - should be 5 characters minimum")
    .max(100, "Bio is too long - should be 100 characters maximum")
  })

  const url = `/users/${user.id}`

  const formik = useFormik({
    initialValues: {
      username: user.username,
      location: user.location,
      bio: user.bio
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      fetch(url, {
        method: "PATCH",
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
    <Box className="profileGrid" sx={{ mx: 10 }}>
      <h1 className="profileHead">{`${user.username}'s Profile`}</h1>
        <div className="profile-container" >
          {isEditting ?
              <form className="profile-info" onSubmit={formik.handleSubmit}>
                <div class='inputs'>
                  <label htmlFor='username'>Username: </label>
                  <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {formik.errors.username && formik.touched.username ? <div className="error-message show">{formik.errors.username}</div> : null}
                </div>
                <div class='inputs'>
                  <label htmlFor='location'>Location: </label>
                  <input type='text' name='location' value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {formik.errors.location && formik.touched.location ? <div className="error-message show">{formik.errors.location}</div> : null}
                </div>
                <div class='inputs'>
                  <label htmlFor='bio'>Bio: </label>
                  <input type='text' name='bio' value={formik.values.bio} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {formik.errors.bio && formik.touched.bio ? <div className="error-message show">{formik.errors.bio}</div> : null}
                </div>
                <input className='edit-save-btn' type='submit' value={'Save Profile'} />
              </form>
          :
            <div className="profile-info">
            <div className="info-icon">
                <FaRegUserCircle id="mem-avatar" />
                <div>
                  <p><b>Username:</b> {user.username}</p>
                  <p><b>Email:</b> {user.email}</p>
                  <p><b>Location:</b> {user.location}</p>
                  <p><b>Bio:</b> {user.bio}</p>
                </div>
            </div>
              <div className="profile-button">
                {user.id === parseInt(id) ? (isEditting ? null :  <button className='edit-save-btn' onClick={handleEdit} >Edit Profile</button>) : null}
              </div>
            </div>
          }
        </div>
    </Box>
  );
};

export default Profile;
