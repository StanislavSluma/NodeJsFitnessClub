import LoginForm from "../components/LoginComponent.jsx";
import {useAuthorization} from "../context/AuthorizationContext.jsx";

const LoginPage = () => {
    const {setProfile, setUserRole } = useAuthorization();
    return (
        <div className="login">
            <LoginForm setProfile={setProfile} setRole={setUserRole} />
        </div>
    );
};

export default LoginPage;