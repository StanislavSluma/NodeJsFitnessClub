import {useEffect, useState} from "react";
import GroupCRUD from "../components/GroupCRUD.jsx";

const AdminGroupsPage = () => {
    const [groups, setGroups] = useState([]);

    const fetchGroups = async () => {
        const response = await fetch(`http://localhost:5000/group/all`, {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();
        if(data) setGroups(data.groups);
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleOnCreate = async () => {
        const response = await fetch(`http://localhost:5000/group/create/default`, {
            method: "POST",
            credentials: "include",
        });

        if (response.ok) {
            await fetchGroups();
        } else {
            alert((await response.json()).message);
        }
    }

    return (
        <div className="admin-group-pages">
            <button onClick={async () => await handleOnCreate()}>Создать</button>
            <div className="group-container">
                {groups && groups.length > 0 ? (
                    groups.map((group) => {
                        return (<GroupCRUD key={group._id} group={group} refetch={fetchGroups} />);
                    })
                ) : (<div>Not found</div>)}
            </div>
        </div>
    );
};

export default AdminGroupsPage;