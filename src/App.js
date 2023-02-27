import styles from './App.module.css';
import NavBar from './components/NavBar';
import  Container  from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import ProductCreateForm from './pages/products/ProductCreateForm';
import ProductPage from './pages/products/ProductPage';
import Products from './pages/products/Products';
import { useCurrentUser } from './contexts/CurrentUserContext';
import ProductsPage from './pages/products/ProductsList';
import ProductEditForm from './pages/products/ProductEditForm';
import CommentEditForm from './pages/comments/CommentEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from './components/NotFound';
import CategoryFilter from './pages/filters/CategoryFilter';
import ReviewsEditForm from './pages/reviews/ReviewsEditForm';

function App() {
const currentUser = useCurrentUser();
const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Padding}>
        <Switch>
          <Route exact path='/' render={() => <ProductsPage message="No result found, please try other search keyboard 🤔"/>}/>
          <Route exact path='/followed' render={() => <ProductsPage message="No result found, please try other search keyboard or follow a profile 🤔" filter={`owner__followed__owner__profile=${profile_id}&`}/>}/>
          <Route exact path='/liked' render={() => <ProductsPage message="No result found, please try other search keyboard or like a post 🤔" filter={`liked__owner__profile=${profile_id}&ordering=-likes__created_at&`}/>}/>
          <Route exact path='/signin' render={() => <SignInForm/>}/>
          <Route exact path='/signup' render={() => <SignUpForm/>}/>
          <Route exact path='/product/create' render={() => <ProductCreateForm/>} />
          <Route exact path='/product/:id/edit' render={() => <ProductEditForm/>} />
          <Route exact path='/comments/:id/edit' render={() => <CommentEditForm/>} />
          <Route exact path='/reviews/:id/edit' render={() => <ReviewsEditForm/>} />
          <Route exact path='/product' render={() => <Products/>} />
          <Route exact path='/product/:id' render={() => <ProductPage/>} />
          <Route exact path='/profiles/:id' render={() => <ProfilePage/>} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />}/>
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route exact path="/category" render={() => <CategoryFilter />} />
          <Route render={() => <NotFound/>} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;
