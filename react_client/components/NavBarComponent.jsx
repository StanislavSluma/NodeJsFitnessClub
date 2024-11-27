import {Link} from "react-router-dom";
import {useAuthorization} from "../context/AuthorizationContext.jsx";

const NavBarComponent = () => {
    const {profile, setProfile} = useAuthorization();
    return (
        <div className="nav-bar">
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/instructors">Instructors</Link>
                <Link to="/catalog">Workout Groups</Link>
                {profile ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <Link onClick={() => setProfile(null)} to="/home">Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </div>
    );
};

export default NavBarComponent;