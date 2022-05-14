import './App.css';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import LoadingSpinnerPage from './components/LoadingSpinnerPage';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';

function App() {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const isLoading = useSelector(state => state.user.loggedLoading)

  console.log(loggedIn)

  return (
    <div className="App">
      {isLoading ? <LoadingSpinnerPage /> : 
        (loggedIn ?
          <div>
          <Navbar/>   
          <MainPage style={{backgroundColor: 'black'}}/> </div> : 
          <LoginPage />)}
    </div>
  );
}

export default App;
