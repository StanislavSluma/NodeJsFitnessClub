import {useAuthorization} from "../context/AuthorizationContext.jsx";
import CommonProfileInfo from "../components/CommonProfileInfo.jsx"
import ClientActionsBar from "../components/ClientActionsBar.jsx";
import AdminActionsBar from "../components/AdminActionsBar.jsx";
import InstructorActionsBar from "../components/InstructorActionsBar.jsx";
import {useState} from "react";
import ClientChangeComponent from "../components/ClientChangeComponent.jsx";
import InstructorChangeComponent from "../components/InstructorChangeComponent.jsx";


const ProfilePage = () => {
    const [editingProfile, setEditingProfile] = useState(false);
    const {profile, setProfile, userRole} = useAuthorization();

    return (
        <div>
            {editingProfile ? (
                <div>
                    {
                        editingProfile && (
                            userRole === "client" ? (
                                <ClientChangeComponent setEditingProfile={setEditingProfile} setProfile={setProfile} profile={profile} />
                            ) : (
                                <InstructorChangeComponent setEditingProfile={setEditingProfile} setProfile={setProfile} profile={profile} />
                            )
                        )
                    }
                </div>
            ) : (
                <div>
                    <button onClick={() => setEditingProfile(true)}>Изменить профиль</button>
                    {userRole !== 'admin' && <CommonProfileInfo profile={profile} role={userRole}/>}
                    {userRole === 'admin' && <AdminActionsBar profile={profile}/>}
                    {userRole === 'instructor' && <InstructorActionsBar profile={profile}/>}
                    {profile && userRole === 'client' && <ClientActionsBar profile={profile}/>}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;