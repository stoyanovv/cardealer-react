import { Route, Switch } from "react-router-dom";
import AboutUsPage from "../../Components/Pages/AboutUsPage/AboutUsPage";
import LogIn from "../../Containers/Auth/LogIn/LogIn";
import Logout from "../../Containers/Auth/Logout/Logout";
import Signup from "../../Containers/Auth/Signup/Signup";
import ContactsPage from "../../Components/Pages/ContactsPage/ContactsPage";
import HomePage from "../../Components/Pages/HomePage/HomePage";
import MyProfilePage from "../../Components/Pages/MyProfilePage/MyProfilePage";
import NoSuchPage from "../../Components/Pages/NoSuchPage/NoSuchPage";
import Cart from "../../Components/Pages/CartPage/Cart";
import Shop from "../../Components/Pages/Shop/Shop";
import CarInfo from "../../Components/UI/Car/CarInfo";

const Routes = (props) => {
   console.log(props.isAuth)
   if (props.isAuth) {
      return (
         <Switch>
            <Route path="/about" render={(p) => <AboutUsPage {...p} />} />
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/myProfile" component={MyProfilePage} />
            <Route path="/logout" component={Logout} />
            <Route path="/cart" component={Cart} />
            <Route path="/shop" component={Shop} />
            <Route path="/carinfo/:id" render={(p) => <CarInfo {...p} />} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={Signup} />
            <Route path="/" exact component={HomePage} />
            <Route component={NoSuchPage} />
         </Switch>
      )
   }
   else {
      return (
         <Switch>
            <Route path="/about" render={(p) => <AboutUsPage {...p} />} />
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={Signup} />
            <Route path="/" exact component={HomePage} />
            <Route component={NoSuchPage} />
         </Switch>);
   }
}

export default Routes;
