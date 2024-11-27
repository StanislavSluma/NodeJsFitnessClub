import {createContext, useContext, useEffect, useState} from "react";

export const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const fetchUserData = async () => {
        const response = await fetch("http://localhost:5000/auth/profile", {
            credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setProfile(data.profile);
            setUserRole(data.role);
            console.log("role_response_success");
        } else {
            setUserRole(null);
            setUserRole(null);
            console.log("role_response_fail");
        }

    };

    useEffect(() => {
        fetchUserData();
    }, []);


    return <AuthorizationContext.Provider
        value={{
            profile,
            userRole,
            setUserRole,
            setProfile
        }}>
        {children}
    </AuthorizationContext.Provider>;
};

export const useAuthorization = () => useContext(AuthorizationContext);