import {useNavigate} from "react-router-dom";

function InstructorActionsBar(/*props*/) {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/instructor/workouts') }>Мои занатия</button>
        </div>
    );
}

export default InstructorActionsBar;