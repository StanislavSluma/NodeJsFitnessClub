import GroupCard from "../components/GroupCard.jsx";
import {useEffect, useState} from "react";
import {useAuthorization} from "../context/AuthorizationContext.jsx";

const GroupsPage = () => {
    const [groups, setGroups] = useState([]);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState(1);
    const {userRole} = useAuthorization();

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('http://localhost:5000/group/all', {
                method: "GET"
            });

            const data = await response.json();
            if(data) setGroups(data.groups);
        };

        fetchGroups();
    }, []);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    }
    const handleSortChange = () => {
        setSort(-1 * sort);
    }

    let filteredGroups = groups.filter(group => group.name.toLowerCase().includes(query.toLowerCase()));
    filteredGroups.sort((a, b) => sort * (a.price - b.price));
    return (
        <div>
            <div>
                <label>Поиск: </label>
                <input onChange={handleSearchChange}></input>
                <button onClick={handleSortChange}>{sort === 1 ? "Цена↑" : "Цена↓"}</button>
            </div>
            <div className="groups-container">
                {filteredGroups && filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => {
                        return (<GroupCard key={group._id} group={group} role={userRole}/>);
                    })
                ) : (<div className="groups-container-empty">Групп пока нет :(</div>)}
            </div>
        </div>
    );
};

export default GroupsPage;