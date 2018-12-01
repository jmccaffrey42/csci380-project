import React from "react";
import {Link} from "react-router-dom";

const IndexScreen = () => (
    <div className="indexScreen">
        <section className="jumbotron">
            <h1>LionTracks</h1>
            <span className="subTitle">Keep track of your projects with pride!</span>

            <Link to="/board">Start organizing now</Link>
            <Link to="/register">Sign me up!</Link>
        </section>

        <section>
            <h2>Organize your tasks into lists on the board</h2>
            <p>Create lists for every stage in your workflow, drag and drop tasks believe them.</p>
            <img src="/images/ss_01.PNG" width="900"/>
        </section>

        <section>
            <h2>Comment on cards to share your thoughts</h2>
            <p></p>
            <img src="/images/ss_02.png" width="700"/>
        </section>

        <section>
            <h2>Contact us for enterprise support</h2>
            <p>We're here to help you get tracking 24/7/365</p>
            <img src="/images/Lion-Tracking.jpg" width="900"/>
        </section>

        <footer>
            LionTracks is a fictional product created for a final project in a course at <a href="http://www.tamuc.edu" target="_">Texas A&M University Commerce</a>.<br/>
            Source code available on <a href="https://github.com/jmccaffrey42/csci380-project" target="_">GitHub</a>
        </footer>

    </div>
);

export default IndexScreen;