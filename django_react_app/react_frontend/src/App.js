import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import Search from './pages/Search';
import Profile from './pages/Profile';
import EventDetails from './pages/EventDetails';
import PrivateRoute from './utils/PrivateRouteUtil';
import UserAuthContextProvider from './contexts/UserAuthContextProvider';

function App() {
  return(
    <div>
      <UserAuthContextProvider>
        <Header>
        </Header>
        <Routes>
          <Route path="/" element={ <Login/> }/>
          <Route path="/login/" element={ <Login/> }/>
          <Route path="/signup/" element={ <Signup/> }/>
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
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
