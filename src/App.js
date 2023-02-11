import logo from './logo.svg';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Padding}>
        <Switch>
          <Route exact path='/' render={() => <h1>Home</h1>}/>
          <Route exact path='/signin' render={() => <h2> SignIn</h2>}/>
          <Route exact path='/signup' render={() => <h2> SignUp</h2>}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
