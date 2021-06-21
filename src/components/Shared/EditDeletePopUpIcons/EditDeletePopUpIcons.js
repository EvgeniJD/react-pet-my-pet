import './EditDeletePopUpIcons.css';

function EditDeletePopUpIcons({deleteHandler, toggleEditMode}) {
    return (
        <>
            <span
                title="Delete"
                onClick={deleteHandler}
            >
                <i className="comment-icon far fa-trash-alt"></i>
            </span>
            <span
                title="Edit"
                onClick={toggleEditMode}
            >
                <i className="comment-icon fas fa-pencil-alt"></i>
            </span>
        </>
    );
}

export default EditDeletePopUpIcons;