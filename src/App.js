// Organic
// Hex Codes: #e6d3a3, #d8d174, #f2f4f3, #b6c454, #91972a
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './components/Theme';
import Header from "./components/Header";
import Home from './components/Home';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <Header/>
      <Switch>
       <Route exact path='/'><Home/></Route>
       <Route exact path='/menu'><Menu/></Route>
       <Route exact path='/reservation' component={() => <div>Reservation</div>}></Route>
       <Route exact path='/contact'><Contact/></Route>
       <Route exact path='/register' component={() => <div>Sign In</div>}></Route>
        <Route exact path='/cart' component={() => <div>Cart</div>}></Route>
      </Switch>
    </Router>
    <Footer/> 
    </ThemeProvider>
  );
}

export default App;
