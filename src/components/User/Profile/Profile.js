import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './Profile.css';
import MyPost from './MyPost';
import MyActivity from './MyActivity';
import TextField from '../TextField';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import userService from '../../../services/user';
import useFetch from '../../../hooks/useFetch';

import Button from '../../Shared/Button';

function Profile() {

  const [userData, setUserData] = useContext(AuthContext);
  const [user, setUser] = useFetch(userService.getUser, userData._id, {});
  const [isInChangeInfoMode, setIsInChangeInfoMode] = useState(false);

  function toggleInfoChangeMode() {
    setIsInChangeInfoMode(oldState => !oldState);
  }

  const arr = [1, 2, 3];

  const yupSchema = Yup.object({
    username: Yup.string()
      .required('Username is required!')
      .max(20, 'Username should be less than 20 characters!'),
    email: Yup.string()
      .required('Email is required!')
      .email('Email is incorrect!'),
    avatar: Yup.string()
      .required('Avatar is required!')
      .url('Avatar should be valid URL!')
  })


  return (
    <section className="profile-wrapper">
      <article className="profile-my-posts">
        <h2 className="my-posts-heading">
          My Posts
        </h2>

        {user.posts && user.posts.map(post => <MyPost
          key={post._id}
          _id={post._id}
          content={post.content}
          avatar={user.avatar}
          username={user.username}
        />)}

      </article>
      <article className="profile-user">
        <h2 className="profile-username">
          {user.username}
        </h2>
        <div className="profile-image-wrapper">
          <img src={user.avatar} alt="" />
        </div>
        <p className="profile-email">
          {user.email}
        </p>
        <div className="profile-change-info-wrapper">
          {!isInChangeInfoMode && <Button view="round blue" onClick={toggleInfoChangeMode}>Change personal info</Button>}
          {isInChangeInfoMode &&
            <Formik
              initialValues={{
                username: user.username,
                email: user.email,
                avatar: user.avatar
              }}

              validationSchema={yupSchema}

              onSubmit={(formData, methods) => {
                userService.editUser(user._id, formData)
                  .then(updatedUser => {
                    console.log('updatedUser: ', updatedUser);
                    if (updatedUser.hasOwnProperty('errorMessage')) {
                      methods.setFieldError('email', updatedUser.errorMessage);
                      return;
                    }
                    setUser(updatedUser);
                    setUserData(updatedUser);
                  })
                  .catch(e => console.log('Error from onSubmit register user: ', e.message))
              }}
            >
              {formik => (
                <article className="profile-form-wrapper">
                  <h1 className="profile-form-heading">Change personal info</h1>
                  <Form>
                    <TextField label="Avatar" name="avatar" type="text" />
                    <TextField label="Username" name="username" type="text" />
                    <TextField label="Email" name="email" type="email" />
                    <div className="profile-form-btn-wrapper">
                      <Button view="round orange" type="submit">Change</Button>
                      <Button view="round gray" type="button" onClick={toggleInfoChangeMode}>Cancel</Button>
                    </div>
                  </Form>
                </article>
              )}
            </Formik>
          }
        </div>
      </article>
      <article className="profile-latest-activity">
        <h2 className="my-activity-heading">
          Latest Activity
        </h2>
        {user.lastActivity && user.lastActivity.map((activity, i) => <MyActivity key={activity._id} {...activity} />)}
      </article>
    </section>
  )
}

export default Profile;