const WorkoutCard = ({workout}) => {
    return (
        <div className="workout-card">
            <div>День недели: {workout.day}</div>
            <div>Дата начала: {workout.start_date}</div>
            <div>Дата окончания: {workout.end_date}</div>
            <div>Категория: {workout.category_id.name}</div>
            <div>Группа: {workout.group_id.name}</div>
            <div>Количество людей: {workout.group_id.current_clients}</div>
            <div>Зал: {workout.hall_id.name}</div>
            <br/>
        </div>
    );
};

export default WorkoutCard;