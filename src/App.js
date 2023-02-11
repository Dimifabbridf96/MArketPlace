import logo from './logo.svg';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';

function App() {
  return (
    
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Padding}>
        <Switch>
          <Route exact path='/' render={() => <h1>Home</h1>}/>
          <Route exact path='/signin' render={() => <h2> SignIn</h2>}/>
          <Route exact path='/signup' render={() => <SignUpForm/>}/>
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
