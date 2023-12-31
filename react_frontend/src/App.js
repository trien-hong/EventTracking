import './App.css';
import { Routes, Route } from 'react-router-dom';
import UserAuthContextProvider from './contexts/UserAuthContextProvider';
import ProfilePictureContextProvider from './contexts/ProfilePictureContextProvider';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import Events from './pages/Events';
import Search from './pages/Search';
import Profile from './pages/Profile';
import EventDetails from './pages/EventDetails';
import PageNotFound from './pages/PageNotFound';
import PrivateRoute from './utils/PrivateRouteUtil';

function App() {
  return(
    <div>
      <UserAuthContextProvider>
        <ProfilePictureContextProvider>
          <Header>
          </Header>
          <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Events/>}/>
            </Route>
            <Route path="/login/" element={<Login/>}/>
            <Route path="/signup/" element={<Signup/>}/>
            <Route path="/reset/password/" element={<ResetPassword/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/events/" element={<Events/>}/>
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/search/" element={<Search/>}/>
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/profile/" element={<Profile/>}/>
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/events/details/id/:id/" element={<EventDetails/>}/>
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="*" element={<PageNotFound/>}/>
            </Route>
          </Routes>
        </ProfilePictureContextProvider>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
