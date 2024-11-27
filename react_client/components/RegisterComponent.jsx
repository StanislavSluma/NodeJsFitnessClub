import {Component} from "react";
import {Navigate} from "react-router-dom";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Client3',
            email: 'client3@gmail.com',
            password: '1234',
            password_repeat: '1234',
            name: 'Client3',
            surname: '',
            patronymic: '',
            age: 18,
            phone_number: '+375 44 333-33-33',

            usernameValid: true,
            emailValid: true,
            passwordValid: true,
            passwordRepeatValid: true,
            nameValid: true,
            surnameValid: true,
            patronymicValid: true,
            ageValid: true,
            phoneNumberValid: true,

            redirectToLogin: false
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordRepeatChange = this.onPasswordRepeatChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onPatronymicChange = this.onPatronymicChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    validateUsername(username){
        return username.length > 2;
    }
    validateEmail(email){
        var regex = /.+@(gmail.com|yandex.ru)$/;
        return regex.test(email);
    }
    validatePassword(password){
        return password.length > 3;
    }
    validatePasswordRepeat(password_repeat){
        return password_repeat === this.state.password;
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

    onUsernameChange(e) {
        var val = e.target.value;
        var valid = this.validateUsername(val);
        this.setState({username: val, usernameValid: valid});
    }
    onEmailChange(e) {
        var val = e.target.value;
        var valid = this.validateEmail(val);
        this.setState({email: val, emailValid: valid});
    }
    onPasswordChange(e) {
        var val = e.target.value;
        var valid = this.validatePassword(val);
        var valid_repeat_password = this.state.password_repeat === val;
        this.setState({password: val, passwordValid: valid, passwordRepeatValid: valid_repeat_password});
    }
    onPasswordRepeatChange(e) {
        var val = e.target.value;
        var valid = this.validatePasswordRepeat(val);
        this.setState({password_repeat: val, passwordRepeatValid: valid});
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
        if (this.state.usernameValid &&
            this.state.emailValid &&
            this.state.passwordValid &&
            this.state.passwordRepeatValid &&
            this.state.nameValid &&
            this.state.ageValid &&
            this.state.phoneNumberValid){

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    password_repeat: this.state.password_repeat,
                    name: this.state.name,
                    surname: this.state.surname,
                    patronymic: this.state.patronymic,
                    age: this.state.age,
                    phone_number: this.state.phone_number
                })
            });
            const data = await response.json();
            if (response.ok) {
                this.setState({redirectToLogin: true});
            } else {
                alert(`Ошибка: ${data.message}`);
            }
        } else {
            alert(`Ошибка: некоторые поля заполнены неверно!`);
        }
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Navigate to="/login" />;
        }

        var usernameColor = this.state.usernameValid===true?"green":"red";
        var emailColor = this.state.emailValid===true?"green":"red";
        var passwordColor = this.state.passwordValid===true?"green":"red";
        var passwordRepeatColor = this.state.passwordRepeatValid===true?"green":"red";
        var nameColor = this.state.nameValid===true?"green":"red";
        var surnameColor = this.state.surnameValid===true?"green":"red";
        var patronymicColor = this.state.patronymicValid===true?"green":"red";
        var ageColor = this.state.ageValid===true?"green":"red";
        var phoneNumberColor = this.state.phoneNumberValid===true?"green":"red";

        return (
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>Username:</label><br/>
                    <input type="text" value={this.state.username}
                           onChange={this.onUsernameChange} style={{borderColor: usernameColor}}/>
                </p>
                <p>
                    <label>Email:</label><br/>
                    <input type="text" value={this.state.email}
                           onChange={this.onEmailChange} style={{borderColor: emailColor}}/>
                </p>
                <p>
                    <label>Password:</label><br/>
                    <input type="password" value={this.state.password}
                           onChange={this.onPasswordChange} style={{borderColor: passwordColor}}/>
                </p>
                <p>
                    <label>PasswordRepeat:</label><br/>
                    <input type="password" value={this.state.password_repeat}
                           onChange={this.onPasswordRepeatChange} style={{borderColor: passwordRepeatColor}}/>
                </p>
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
            </form>
        );
    }
}

export default RegisterForm;