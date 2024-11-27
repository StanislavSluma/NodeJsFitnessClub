import InstructorCard from "../components/InstructorCard.jsx";
import {useEffect, useState} from "react";

const InstructorsPage = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchInstructors = async () => {
            const response = await fetch('http://localhost:5000/instructor/all', {
                method: "GET"
            });

            const data = await response.json();
            if(data) setInstructors(data.instructors);
        };

        fetchInstructors();
    }, []);

    return (
        <div className="instructors-container">
            {instructors && instructors.length > 0 ? (
                instructors.map((instructor) => {
                    return (<InstructorCard key={instructor._id} instructor={instructor}/>);
                })
            ) : (<div className="instructors-container-empty">Всех уволили :(</div>)}
        </div>
    );
};

export default InstructorsPage;