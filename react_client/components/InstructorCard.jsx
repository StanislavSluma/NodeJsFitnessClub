const InstructorCard = ({instructor}) => {
    return (
        <div className="instructor-card">
            <img src={'../public/instructor.webp'} alt={'Фото отсутствует'}></img>
            <div>ФИО {instructor.surname} {instructor.name} {instructor.patronymic}</div>
            <div>Возраст: {instructor.age}</div>
            <div>Номер телефона: {instructor.phone_number}</div>
            <div>О себе: {instructor.about}</div>
        </div>
    );
};

export default InstructorCard;