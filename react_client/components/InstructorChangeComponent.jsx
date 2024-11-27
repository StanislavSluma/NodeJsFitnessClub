import {Component} from "react";

class InstructorChangeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.profile.name,
            surname: props.profile.surname,
            patronymic: props.profile.patronymic,
            age: props.profile.age,
            phone_number: props.profile.phone_number,

            nameValid: true,
            surnameValid: true,
            patronymicValid: true,
            ageValid: true,
            phoneNumberValid: true,
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onPatronymicChange = this.onPatronymicChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateName(name) {
        return name.length > 1;
    }
    validateAge(age) {
        return age >= 18;
    }
    validatePhoneNumber(phone) {
        var regex = /(\+375 |80)\d{2} \d{3}-\d{2}-\d{2}$/;
        return regex.test(phone);
    }

    onNameChange(e) {
        var val = e.target.value;
        var valid = this.validateName(val);
        this.setState({name: val, nameValid: valid});
    }
    onSurnameChange(e) {
        var val = e.target.value;
        this.setState({surname: val});
    }
    onPatronymicChange(e) {
        var val = e.target.value;
        this.setState({patronymic: val});
    }
    onAgeChange(e) {
        var val = e.target.value;
        var valid = this.validateAge(val);
        this.setState({age: val, ageValid: valid});
    }
    onPhoneNumberChange(e) {
        var val = e.target.value;
        var valid = this.validatePhoneNumber(val);
        this.setState({phone_number: val, phoneNumberValid: valid});
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.nameValid &&
            this.state.ageValid &&
            this.state.phoneNumberValid){

            const response = await fetch(`http://localhost:5000/instructor/${this.props.profile._id}/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: this.state.name,
                    surname: this.state.surname,
                    patronymic: this.state.patronymic,
                    age: this.state.age,
                    phone_number: this.state.phone_number
                })
            });
            const data = await response.json();
            if (response.ok) {
                const {setEditingProfile, setProfile} = this.props;
                setEditingProfile(false);
                setProfile(data.instructor);
            } else {
                alert(`Ошибка: ${data.message}`);
            }
        } else {
            alert(`Ошибка: некоторые поля заполнены неверно!`);
        }
    }

    handleCancel() {
        const {setEditingProfile} = this.props;
        setEditingProfile(false);
    }

    render() {

        let nameColor = this.state.nameValid===true?"green":"red";
        let surnameColor = this.state.surnameValid===true?"green":"red";
        let patronymicColor = this.state.patronymicValid===true?"green":"red";
        let ageColor = this.state.ageValid===true?"green":"red";
        let phoneNumberColor = this.state.phoneNumberValid===true?"green":"red";

        return (
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>Имя:</label><br/>
                    <input type="text" value={this.state.name}
                           onChange={this.onNameChange} style={{borderColor: nameColor}}/>
                </p>
                <p>
                    <label>Фамилия:</label><br/>
                    <input type="text" value={this.state.surname}
                           onChange={this.onSurnameChange} style={{borderColor: surnameColor}}/>
                </p>
                <p>
                    <label>Отчество:</label><br/>
                    <input type="text" value={this.state.patronymic}
                           onChange={this.onPatronymicChange} style={{borderColor: patronymicColor}}/>
                </p>
                <p>
                    <label>Возраст:</label><br/>
                    <input type="number" value={this.state.age}
                           onChange={this.onAgeChange} style={{borderColor: ageColor}}/>
                </p>
                <p>
                    <label>Телефон:</label><br/>
                    <input type="text" value={this.state.phone_number}
                           onChange={this.onPhoneNumberChange} style={{borderColor: phoneNumberColor}}/>
                </p>

                <input type="submit" value="Отправить"/>
                <button onClick={(e) => this.handleCancel(e)}>Отмена</button>
            </form>
        );
    }
}

export default InstructorChangeComponent;