import './AddPost.css';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../../Shared/Button';
import TextArea from './TextArea';

import postsService from '../../../services/posts';

export default function AddPost({
    history
}) {

    function onCancelButtonClick() {
        history.push('/');
    }

    const validate = Yup.object({
        content: Yup.string()
            .required('Post content is required!')
    })

    return (
        <Formik
            initialValues={{
                content: '',
            }}

            validationSchema={validate}

            onSubmit={({ content }) => {
                const post = {
                    content,
                    likes: 0,
                    dislikes: 0,
                    comments: {}
                }

                postsService.create(post)
                    .then((createdPost) => {
                        console.log(createdPost);
                        // history.push("/")
                    })
                    .catch(e => console.log(e.message))
            }}
        >
            {formik => (
                <Form>
                    <article className="post-wraper">
                        <header className="post-header">
                            <div className="post-header-image">
                                <img src="http://firstcutlab.eu/wp-content/uploads/2020/07/ivan.png" alt="" />
                            </div>
                            <h3 className="post-header-username">Evgeni Dimitrov</h3>
                            <TextArea name="content" />
                        </header>
                        <footer className="post-footer">
                            <Button type="submit" view="success" newClassName="add-post-btn" >Add Post</Button>
                            <Button type="button" onClick={onCancelButtonClick} view="negative" newClassName="cancel-btn" >Cancel</Button>
                        </footer>
                    </article>
                </Form>
            )}
        </Formik>
    )
}


