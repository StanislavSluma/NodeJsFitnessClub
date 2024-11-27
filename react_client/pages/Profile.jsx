import {useAuthorization} from "../context/AuthorizationContext.jsx";
import CommonProfileInfo from "../components/CommonProfileInfo.jsx"
import ClientActionsBar from "../components/ClientActionsBar.jsx";
import AdminActionsBar from "../components/AdminActionsBar.jsx";
import InstructorActionsBar from "../components/InstructorActionsBar.jsx";


const ProfilePage = () => {
    const {profile, userRole} = useAuthorization();
    return (
        <div>
            { userRole !== 'admin' && <CommonProfileInfo profile={profile} role={userRole} /> }
            { userRole === 'admin' && <AdminActionsBar profile={profile} /> }
            { userRole === 'instructor' && <InstructorActionsBar profile={profile} /> }
            { profile && userRole === 'client' && <ClientActionsBar profile={profile} /> }
        </div>
    );
};

export default ProfilePage;