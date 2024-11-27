import {useEffect, useState} from "react";
import WorkoutCard from "../components/WorkoutCard.jsx";
import {useParams} from "react-router-dom";

const GroupWorkoutsPage = () => {
    const {group_id} = useParams();
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`http://localhost:5000/workout/by-group/${group_id}`, {
                method: "GET"
            });

            const data = await response.json();
            if(data) setWorkouts(data.workouts);
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="workout-container">
            {workouts && workouts.length > 0 ? (
                workouts.map((workout) => {
                    return (<WorkoutCard key={workout._id} workout={workout}/>);
                })
            ) : (<div>Not found</div>)}
        </div>
    );
};

export default GroupWorkoutsPage;