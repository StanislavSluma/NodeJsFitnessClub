import {useEffect, useState} from "react";

const ClubCardComponent = (props) => {
    const [card, setCard] = useState(null);
    useEffect(() => {

        const fetchCard = async () => {
            console.log(`http://localhost:5000/club_card/client/${props.profile._id}`);
            const response = await fetch(`http://localhost:5000/club_card/client/${props.profile._id}`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();
            if(data) setCard(data);
        };

        fetchCard();
    }, []);

    return (
        <div>
            { card && card.club_card && card.club_card.end_date ? (
                <div>
                    <div>Категория: {card.category?.name}</div>
                    <div>Скидка: {card.category?.discount * 100}%</div>
                    <div>Действует до: {new Date(card.club_card.end_date).toISOString().slice(0, 10)}</div>
                    <div>Общие траты: {card?.expenses}</div>
                </div>
            ) : (
                <div>У вас пока нет клубной карты :(</div>
            )}
        </div>
    );
}

export default ClubCardComponent;