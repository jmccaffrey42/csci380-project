import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faList, faPhone} from "@fortawesome/free-solid-svg-icons";

const IndexScreen = () => (
    <div className="indexScreen">
        <section className="jumbotron">
            <h1>LionTracks</h1>
            <h2>Keep track of your projects with pride!</h2>

            <ul className="links">
                <li><Link to="/board"><button className="button">Start Organizing</button></Link></li>
                <li><Link to="/register"><button className="button">Sign Up</button></Link></li>
            </ul>
        </section>

        <section className="feature left">
            <figure>
                <img src="/images/ss_01.PNG" width="900"/>
            </figure>
            <header>
                <h2><FontAwesomeIcon icon={faList} className="icon" />Organize your tasks into lists on the board</h2>
                <p>Create lists for every stage in your workflow, drag and drop tasks to keep them in line.</p>
            </header>
        </section>

        <section className="feature right">
            <header>
                <h2><FontAwesomeIcon icon={faComments} className="icon" /> Collaborate with your team through comments</h2>
                <p>Discuss tasks in-depth and trade ideas in the comment section of each card. Express your ideas and be heard through the easy-to-use interface.</p>
            </header>
            <figure>
                <img src="/images/ss_02.png" width="700"/>
            </figure>
        </section>

        <section className="feature left">
            <figure>
                <img src="/images/Lion-Tracking.jpg" width="900"/>
            </figure>
            <header>
                <h2><FontAwesomeIcon icon={faPhone} className="icon" />Contact us for enterprise support</h2>
                <p>We're here to help you get tracking 24/7/365</p>
            </header>
        </section>

        <footer>
            LionTracks is a fictional product created for a final project in a course at <a href="http://www.tamuc.edu" target="_">Texas A&M University Commerce</a>.<br/>
            Source code available on <a href="https://github.com/jmccaffrey42/csci380-project" target="_">GitHub</a>
        </footer>

    </div>
);

export default IndexScreen;