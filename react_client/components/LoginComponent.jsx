import {Component} from "react";
import {Navigate} from "react-router-dom";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        let username = "";
        let usernameIsValid = this.validateUsername(username);
        let password = "";
        let passwordIsValid = this.validatePassword(password);
        this.state = {
            username: username,
            password: password,
            usernameValid: usernameIsValid,
            passwordValid: passwordIsValid,

            redirectToProfile: false,
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    }
    validatePassword(password){
        return password.length > 3;
    }
    validateUsername(username){
        return username.length > 2;
    }
    onPasswordChange(e) {
        const val = e.target.value;
        const valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid});
    }
    onNameChange(e) {
        const val = e.target.value;
        const valid = this.validateUsername(val);
        this.setState({username: val, usernameValid: valid});
    }

    handleGoogleLogin() {
        window.location.href = 'http://localhost:5000/auth/google';
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.usernameValid ===true && this.state.passwordValid===true){
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            });
            const data = await response.json();
            if (response.ok) {
                const { setRole, setProfile } = this.props;
                setProfile(data.profile);
                setRole(data.role);
                this.setState({redirectToProfile: true});
            } else {
                alert(`Ошибка: ${data.message}`);
            }
        } else {
            alert(`Ошибка: Поля заполнены неверно`);
        }
    }

    render() {
        if (this.state.redirectToProfile) {
            return <Navigate to="/profile" />;
        }

        let nameColor = this.state.usernameValid===true?"green":"red";
        let passwordColor = this.state.passwordValid===true?"green":"red";

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Username:</label><br/>
                        <input type="text" value={this.state.username}
                               onChange={this.onNameChange} style={{borderColor: nameColor}}/>
                    </p>
                    <p>
                        <label>Password:</label><br/>
                        <input type="password" value={this.state.password}
                               onChange={this.onPasswordChange} style={{borderColor: passwordColor}}/>
                    </p>
                    <input type="submit" value="Отправить"/>
                </form>
                <div className="social-login">
                    <button
                        onClick={this.handleGoogleLogin}
                        className="gsi-material-button">
                        <div className="gsi-material-button-state"></div>
                        <div className="gsi-material-button-content-wrapper">
                            <div className="gsi-material-button-icon">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                                     xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: "block"}}>
                                    <path fill="#EA4335"
                                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                    <path fill="#4285F4"
                                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                    <path fill="#FBBC05"
                                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                    <path fill="#34A853"
                                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                            </div>
                            <span className="gsi-material-button-contents">Продолжить с аккаунтом Google</span>
                            <span style={{display: "none"}}>Продолжить с аккаунтом Google</span>
                        </div>
                    </button>
                </div>
            </div>
        );
    }
}

export default LoginForm;