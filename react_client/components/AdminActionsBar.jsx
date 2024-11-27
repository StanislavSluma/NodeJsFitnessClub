

function AdminActionsBar(props) {
    const profile = props.profile;
    return (
        <div>
            <div>Username: {profile.username}</div>
            <div>Email: {profile.email}</div>
        </div>
    );
}

export default AdminActionsBar;