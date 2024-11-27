import './App.css'
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import {AuthorizationProvider, useAuthorization} from "../context/AuthorizationContext.jsx";
import Profile from "../pages/Profile.jsx";
import InstructorWorkoutsPage from "../pages/InstructorWorkoutsPage.jsx";
import NavBarComponent from "../components/NavBarComponent.jsx";
import InstructorsPage from "../pages/InstructorsPage.jsx";
import GroupsPage from "../pages/GroupsPage.jsx";
import GroupWorkoutsPage from "../pages/GroupsWorkoutsPage.jsx";
import ClientGroupsPage from "../pages/ClientGroupsPage.jsx";

function App() {
  return (
          <Router>
              <AuthorizationProvider>
              <NavBarComponent/>
              <Routes>
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route path="/home" element={<HomePage />} />
                  <Route path="/instructors" element={<InstructorsPage />} />
                  <Route path="/catalog" element={<GroupsPage />} />
                  <Route path="/group/:group_id/workouts" element={<GroupWorkoutsPage/>}/>
                  <Route path="/profile" element={
                      <RequireRole roles={['admin', 'client', 'instructor']}>
                          <Profile/>
                      </RequireRole>
                  }/>
                  <Route path="/client/groups" element={
                      <RequireRole roles={['client']}>
                          <ClientGroupsPage/>
                      </RequireRole>
                  }/>
                  <Route path="/instructor/workouts" element={
                      <RequireRole roles={['instructor']}>
                          <InstructorWorkoutsPage/>
                      </RequireRole>
                  } />
              </Routes>
              </AuthorizationProvider>
          </Router>
  );
}

const RequireRole = ({roles, children}) => {
    const {userRole} = useAuthorization();

    if (!userRole) return <div>Loading...</div>;
    console.log(userRole);
    if (roles.includes(userRole)) {
        return children;
    }
    return <Navigate to='/home'/>
}

export default App
