import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faSignOutAlt, faThLarge} from "@fortawesome/free-solid-svg-icons";
import authProvider from "./auth_provider";
import history from "./history";
import React from "react";

class TopNav extends React.Component {
    renderIdentity() {
        console.log(authProvider);

        if (!authProvider.isAuthenticated) {
            return (
                <Link className="button buttonGray" to="/login">Login</Link>
            );
        }

        const [first_name, last_name] = authProvider.user.name.split(' ');
        let initials;
        if (last_name !== undefined) {
            initials = (first_name[0] + last_name[0]).toUpperCase();
        } else {
            initials = authProvider.user.name.substr(0, 2).toUpperCase();
        }

        return (
            <React.Fragment>
                {authProvider.user.name}
                <span className="dot">{initials}</span>
                <button className="button buttonGray buttonIcon" onClick={ () => { authProvider.signout(); history.push('/'); } }>
                <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </React.Fragment>
        );
    }

    render() {
        return (
            <nav className="topNav">
                <div className="navLeft">
                    <Link className="button buttonGray buttonIcon" to="/"><FontAwesomeIcon icon={faHome} /></Link>
                    <Link className="button buttonGray buttonIcon" to="/board/"><FontAwesomeIcon icon={faThLarge} /></Link>
                </div>

                <div className="navCenter">

                </div>

                <Link className="navCenterLogo" to="/">
                    <img src="/images/brand_logo.png" /> LionTracks
                </Link>

                <div className="navRight">
                    { this.renderIdentity() }
                </div>
            </nav>
        );
    }

}

export default TopNav;