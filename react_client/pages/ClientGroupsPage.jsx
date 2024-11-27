import {useEffect, useState} from "react";
import GroupCard from "../components/GroupCard.jsx";
import {useAuthorization} from "../context/AuthorizationContext.jsx";

const ClientGroupsPage = () => {
    const {profile} = useAuthorization();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch(`http://localhost:5000/group/by-client/${profile._id}`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();
            if(data) setGroups(data.groups);
        };

        fetchGroups();
    }, []);

    return (
        <div className="groups-container">
            {groups && groups.length > 0 ? (
                groups.map((group) => {
                    return (<GroupCard key={group._id} group={group} role={null}/>);
                })
            ) : (<div>Not found</div>)}
        </div>
    );
};

export default ClientGroupsPage;