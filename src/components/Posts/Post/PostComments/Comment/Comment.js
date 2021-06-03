import './Comment.css';

function Comment(params) {
    return (
        <article className="comment">
            <article className="comment-header">
                <h4 className="comment-header-username">Evgeni Dimitrov</h4>
                <p className="comment-header-date">01.06.2021 16:34</p>
            </article>
            <article className="comment-content-image-wrapper">
                <article className="comment-image-wrapper">
                    <img src="https://consento.bg/wp-content/uploads/2018/03/Evgeni-Mekov1.jpg" alt="" />
                </article>
                <p className="comment-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus pariatur nobis rem exercitationem at perspiciatis quidem voluptatum aliquam nam ex!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus pariatur nobis rem exercitationem at perspiciatis quidem voluptatum aliquam nam ex!                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus pariatur nobis rem exercitationem at perspiciatis quidem voluptatum aliquam nam ex!

                </p>
            </article>
        </article>
    );
}

export default Comment;