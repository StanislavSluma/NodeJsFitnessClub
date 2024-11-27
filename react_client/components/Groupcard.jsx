import {useNavigate} from "react-router-dom";
import {useAuthorization} from "../context/AuthorizationContext.jsx";

const GroupCard = ({group, role}) => {
    const {profile} = useAuthorization();
    const navigate = useNavigate();

    const handleAddClientToGroup = async () => {
        const response = await fetch(`http://localhost:5000/client/${profile._id}/addToGroup/${group._id}`, {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json();
        alert(data.message);
    }

    return (
        <div className="group-card">
            <div>Название: {group.name}</div>
            <div>Максимальное число занятий: {group.max_workouts}</div>
            <div>Максимальное кол-во записей: {group.max_clients}</div>
            <div>Текущее кол-во записей: {group.current_clients}</div>
            <div>Цена: {group.price}</div>
            <button onClick={() => navigate(`/group/${group._id}/workouts`)}>Занятия</button>
            {role === 'client' && (<button onClick={async () => await handleAddClientToGroup()}>Вступить</button>)}
        </div>
    );
};

export default GroupCard;