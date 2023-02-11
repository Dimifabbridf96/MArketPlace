import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/products/ProductCreateForm';

function App() {

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Padding}>
        <Switch>
          <Route exact path='/' render={() => <h1>Home</h1>}/>
          <Route exact path='/signin' render={() => <SignInForm/>}/>
          <Route exact path='/signup' render={() => <SignUpForm/>}/>
          <Route exact path='/product/create' render={() => <PostCreateForm/>} />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;
