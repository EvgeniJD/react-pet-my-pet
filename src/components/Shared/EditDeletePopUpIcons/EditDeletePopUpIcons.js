import './EditDeletePopUpIcons.css';

function EditDeletePopUpIcons({deleteHandler, toggleEditMode}) {
    return (
        <article className="edit-delete">
            <span
                title="Delete Comment"
                onClick={deleteHandler}
            >
                <i className="comment-icon far fa-trash-alt"></i>
            </span>
            <span
                title="Edit Comment"
                onClick={toggleEditMode}
            >
                <i className="comment-icon fas fa-pencil-alt"></i>
            </span>
        </article>
    );
}

export default EditDeletePopUpIcons;