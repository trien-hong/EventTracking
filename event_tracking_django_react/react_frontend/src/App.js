import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Events from './pages/Events';
import Profile from './pages/Profile';
import EventDetails from './pages/EventDetails';
import Search from './pages/Search';

function App() {
  return(
    <div>
      <Header>
      </Header>
      <Routes>
        <Route path="/events/" element={ <Events/> }/>
        <Route path="/profile/" element={ <Profile/> }/>
        <Route path="/search/" element={ <Search/> }/>
        <Route path="/eventDetails/id/:id/" element={ <EventDetails/> }/>
      </Routes>
    </div>
  );
}

export default App;
