import './AddEditComment.css';
import { useState, useContext } from 'react';
import AuthContext from '../../../../../contexts/AuthContext';
import commentsService from '../../../../../services/comments';

import Button from '../../../../Shared/Button';
import TextArea from '../../../../Shared/TextArea';

function AddEditComment({
  onCancelBtnClick,
  id,
  setComments,
  mode,
  initialContent,
  // setPost,
  editComment
}) {

  const [userData] = useContext(AuthContext);

  const [content, setContent] = useState(mode === 'add' ? '' : initialContent);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function isEmpty(content) {
    if (!content) {
      setShowErrorMessage(true);
      return true;
    }
    setShowErrorMessage(false);
    return false;
  }

  function onContentChangeHandler(e) {
    isEmpty(e.target.value);
    setContent(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (isEmpty(content)) return;
    if (content === initialContent) return;

    if (mode === 'add') {
      const comment = {
        content,
        likes: [],
        dislikes: [],
        owner: userData._id,
        parentPost: id
      }

      commentsService.createComment(comment)
        .then((createdComment) => {
          console.log('Comment Is Created', createdComment);
          setComments((comments) => {
            comments.unshift(createdComment);
            return comments;
          })

          // setPost((post) => {
          //   const updatedComments = post.comments.slice();
          //   updatedComments.push(createdComment._id);
          //   return {...post, comments: updatedComments};
          // })

          setContent('');
          onCancelBtnClick();
        })
    } else if (mode === 'edit') {
      editComment(id, { content });
      onCancelBtnClick();
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className="add-comment-wrapper">
      <header className="add-comment-header">
        <article className="add-comment-image-wrapper">
          <img src={userData.avatar} alt="" />
        </article>
        <TextArea
          name="commentContent"
          onContentChangeHandlerFromParent={onContentChangeHandler}
          value={content}
          errorMessage="Comment should not be empty!"
          showErrorMessage={showErrorMessage}
          isEmpty={isEmpty}
        />
      </header>
      <footer className="add-comment-footer">
        <Button view="success" type="submit">{mode === 'add' ? 'Add Comment' : 'Edit Comment' }</Button>
        <Button view="negative" type="button" onClick={onCancelBtnClick}>Cancel</Button>
      </footer>
    </form>
  )

}

export default AddEditComment;