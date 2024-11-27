import {useNavigate} from "react-router-dom";


function AdminActionsBar(props) {
    const profile = props.profile;
    const navigate = useNavigate();
    return (
        <div>
            <div>
                <div>Username: {profile.username}</div>
                <div>Email: {profile.email}</div>
            </div>
            <button onClick={() => navigate('/admin/groups')}>Группы</button>
            <button onClick={() => navigate('/admin/workouts')}>Занятия</button>
        </div>
    );
}

export default AdminActionsBar;