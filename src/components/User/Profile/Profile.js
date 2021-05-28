import './Profile.css';
import MyPost from './MyPost';
import MyActivity from './MyActivity';

function Profile() {

    const arr = [1, 2, 3];

    return (
        <section className="profile-wrapper">
            <article className="profile-my-posts">
                <h2 className="my-posts-heading">
                    My Posts
                </h2>
                {arr.map(num => <MyPost key={num} />)}
            </article>
            <article className="profile-user">
                <h2 className="profile-username">
                    Evgeni Dimitrov
                </h2>
                <div className="profile-image-wrapper">
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                </div>
                <p className="profile-email">
                    obietrice@abv.bg
                </p>
            </article>
            <article className="profile-latest-activity">
                <h2 className="my-activity-heading">
                    Latest Activity
                </h2>
                    {arr.map(num => <MyActivity key={num}/>)}
            </article>
        </section>
    )
}

export default Profile;