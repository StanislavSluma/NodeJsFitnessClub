import ClubCardComponent from "./ClubCardComponent.jsx";

const CommonProfileInfo = (props) => {
    const profile = props.profile;
    return (
        <div className="common-profile-info">
            <div className="profile-info">
                <div>Имя: {profile.name}</div>
                <div>Фамилия: {profile.surname}</div>
                <div>Отчество: {profile.patronymic}</div>
                <div>Возраст: {profile.age}</div>
                <div>Номер Телефона: {profile.phone_number}</div>
            </div>
            { props.role === 'client' ?
                (<div className="club-card-container">
                    <ClubCardComponent profile={profile}/>
                </div>) : null
            }
        </div>
    );
}

export default CommonProfileInfo;