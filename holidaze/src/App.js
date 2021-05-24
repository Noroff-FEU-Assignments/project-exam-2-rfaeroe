import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Container from '@material-ui/core/Container';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Establishments from './pages/Establishments';
import EstablishmentDetail from './pages/Details';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AddEstablishment from './pages/AddEstablishment';
import EditEstablishment from './pages/EditEstablishment';
import ContactEnquiries from './pages/ContactEnquiries';
import BookingEnquiries from './pages/BookingEnquiries';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/establishments' component={Establishments} />
          <Route path='/est/:id' component={EstablishmentDetail} />
          <Route path='/contact' component={Contact} />
          <Route path='/admin' component={Admin} />
          <Route path='/add' component={AddEstablishment} />
          <Route path='/edit/:id' component={EditEstablishment} />
          <Route path='/contacts/:id' component={ContactEnquiries} />
          <Route path='/enquiries/:id' component={BookingEnquiries} />
          <Route path='/login' component={Login} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;