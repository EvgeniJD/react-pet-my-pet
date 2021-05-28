import './MyPost.css';

function MyPost() {
    return (
        <article className="my-post">
            <div className="my-post-img-wrapper">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            </div>
            <div className="my-post-username-content-wrapper">
                <h4 className="my-post-username">
                    Evgeni Dimitrov
                </h4>
                <p className="my-post-content">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea incidunt praesentium veniam esse fugit ratione at perferendis, earum ullam cupiditate.dipisicing elit. Ea incidunt praesentium veniam esse fugit ratione at perferendis, earum ullam cupiditate.ferendis, earum ullam cupiditate.dipisicing elit. Ea incidunt praesentium veniam esse fugit ratione at perferendis, earum ullam cupiditate.
                </p>
            </div>
        </article>
    )
}

export default MyPost;

