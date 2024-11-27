import {useNavigate} from "react-router-dom";

const CreateClubCard = async (profile) => {
    const response = await fetch("http://localhost:5000/club_card/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            client_id: profile._id,
        })
    });

    const data = await response.json();
    if (response.ok) {
        alert(`Карта успешно получена: Карта - ${data.club_card.category}, Действует до - ${data.club_card.card.end_date}`);
    } else {
        alert(`Ошибка: ${data.message}`);
    }
}

function ClientActionsBar(props) {
    const profile = props.profile;
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={async () => await CreateClubCard(profile)}>Получить карту</button>
            <button onClick={() => navigate('/client/groups')}>Мои группы</button>
        </div>
    );
}

export default ClientActionsBar;