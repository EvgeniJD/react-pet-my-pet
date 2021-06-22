import './About.css';

function About() {
    return (
        <article className="about">
            <h1>Welcome to my React Social Network</h1>
            <h3>Guest users:</h3>
            <ul>
                <li>Access only to Register, Login and About pages</li>
                <li>Register with email, username and password</li>
                <li>Login for existing users with email and password</li>
            </ul>
            <h3>Registered users:</h3>
            <h4>In header section they have links to profile page, home page, create new post, about page and logout</h4>
            <ul>
            <li>Home page</li>
                <ul>
                    <li>Click on 'AmicA' link to go there</li>
                    <li>There users can see all posts and comments</li>
                    <li>Create post or comment</li>
                    <li>Like and dislike posts and comments</li>
                    <li>Edit and delete their own posts and comments</li>
                </ul>
                <br />
                <li>Profile page</li>
                <ul>
                    <li>There users can change their username, email and avatar</li>
                    <li>See list of all their posts</li>
                    <li>See list of all their latest activity</li>
                    <li>Posts and latest activity items in profile page are links and redirects to current post detail page</li>
                </ul>
                <br />
                <li>Post Details Page</li>
                <ul>
                    <li>Users can view current post with all the accompanying comments</li>
                    <li>Like and dislike post and comments</li>
                    <li>Edit and delete their own comments or the whole post</li>
                </ul>
            </ul>
            <h3>All of user inputs has front-end and back-end validations</h3>
        </article>
    );
}

export default About;