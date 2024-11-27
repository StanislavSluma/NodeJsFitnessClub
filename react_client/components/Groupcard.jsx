import {useNavigate} from "react-router-dom";

const GroupCard = ({group, role}) => {
    const navigate = useNavigate();
    return (
        <div className="group-card">
            <div>Название: {group.name}</div>
            <div>Максимальное число занятий: {group.max_workouts}</div>
            <div>Максимальное кол-во записей: {group.max_clients}</div>
            <div>Текущее кол-во записей: {group.current_clients}</div>
            <div>Цена: {group.price}</div>
            <button onClick={() => navigate(`/group/${group._id}/workouts`)}>Занятия</button>
            {role === 'client' && (<button>Вступить</button>)}
        </div>
    );
};

export default GroupCard;