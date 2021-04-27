import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Nav from './components/Nav';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Establishments from './pages/Establishments';
import EstablishmentDetail from './pages/EstablishmentDetail';
import Contact from './pages/Contact';

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
          <Route path='/login' component={Login} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;