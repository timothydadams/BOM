import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import RouteRequiresLogin from './RouteRequiresLogin';
import ProtectedRoute from './ProtectedRoute';

//backend routes
import Events from '../Admin/Pages/Events'
import EditEvent from "../Admin/Events/EditEvent"
import CreateEvent from "../Admin/Events/CreateEvent"
import Users from '../Admin/Pages/Users'
import CreateEditUser from '../Admin/Forms/BackEnd/UserEditForm'
import Dashboard from "../Admin/Dashboard/Dashboard"
import Settings from "../Admin/Pages/Settings"
import Finances from "../Admin/Pages/Finances"
import Roles from "../Admin/Pages/Roles"
import Certifications from "../Admin/Pages/Certifications"
import Reporting from "../Admin/Pages/Reporting"
import NotFound from "../Components/NotFound"


import RegistrationView from '../Admin/Events/Registration'
import GetAttendees from '../Admin/Events/GetAttendees'
import RegistrationForm from '../Admin/Forms/BackEnd/RegistrationForm'
import AddRegistrationForm from '../Admin/Forms/BackEnd/AddRegistrationForm'
import OptionalCosts from '../Admin/Events/OptionalCosts'
import Status from '../Admin/Events/Status'
import AdminLogin from '../Admin/Pages/Login'



//frontend routes
import EventCheckIn from '../Client/FrontEnd/Forms/Profile/EventCheckIn';
import EventsAndOpportunities from "../Client/Pages/Profile/EventsAndOpportunities"
import Register from "../Client/Pages/Profile/Register"
import EventDetails from "../Client/Pages/Profile/EventDetails"
import ProfileContainer from "../Client/Pages/Profile/ProfileContainer"
import Login from '../Client/Pages/Login'
import CreateAccount from "../Client/Pages/CreateAccount"
import MakePayment from "./MakePayment"
import Thanks from "./Thanks"
//import Profile from "./../Client/Pages/Profile/Profile"


const Routes = () => {
    return (

<Switch> {/* The Switch decides which component to show based on the current URL.*/}
      

        <ProtectedRoute exact path="/admin" component={Dashboard}/>
        {/*<ProtectedRoute exact path="/admin/login" component={AdminLogin}/>*/}
        <ProtectedRoute exact path="/admin/events" component={Events}/>
        <ProtectedRoute exact path="/admin/events/create" component={CreateEvent} />
        <ProtectedRoute exact path="/admin/events/:eventid" component={EditEvent}/>
        <ProtectedRoute exact path="/admin/events/general/:eventid" component={EditEvent}/>
        <ProtectedRoute exact path="/admin/events/attendees/:eventid" component={GetAttendees} />
        <ProtectedRoute exact path="/admin/events/registration/:eventid" component={RegistrationView}/>
        <ProtectedRoute exact path="/admin/events/registration/add/:eventid" component={AddRegistrationForm}/>
        <ProtectedRoute exact path="/admin/events/registration/:eventid/:registrationid" component={RegistrationForm}/>
        <ProtectedRoute exact path="/admin/events/optionalcosts/:eventid" component={OptionalCosts}/>
        <ProtectedRoute exact path="/admin/events/status/:eventid" component={Status}/>
        <ProtectedRoute exact path="/admin/users" component={Users}/>
        <ProtectedRoute exact path="/admin/users/edit/:userid" component={CreateEditUser}/>
        <ProtectedRoute exact path="/admin/finances" component={Finances}/>
        <ProtectedRoute exact path="/admin/roles" component={Roles}/>
        <ProtectedRoute exact path="/admin/certifications" component={Certifications}/>
        <ProtectedRoute exact path="/admin/reporting" component={Reporting}/>
        <ProtectedRoute exact path="/admin/settings" component={Settings}/>

        <RouteRequiresLogin exact path="/profile">
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab1'>
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab2'>
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab3'>
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab4'>
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab5'>
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab6'>
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab7'>
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab8'>
          <ProfileContainer/>
        </RouteRequiresLogin>
        <RouteRequiresLogin exact path='/profile#tab9'>
          <ProfileContainer/>
        </RouteRequiresLogin>

      <Route exact path='/admin/login'>
        <AdminLogin/>
      </Route>
      <Route exact path='/login'>
        <Login/>
      </Route>
      <Route exact path='/createaccount'>
          <CreateAccount/>
      </Route>
      <Route exact path='/'>
          
      </Route>
      <Route exact path='/events'>
          <EventsAndOpportunities/>
      </Route>
      <Route exact path='/events/details/:eventid'>
        <EventDetails/>
      </Route>
      <Route exact path='/events/register/:eventid' render={(props) => <Register {...props}/>}>
      </Route>
      <Route exact path='/events/register/thanks/:eventid' render={(props) => <Thanks {...props}/>}>
      </Route>

      <Route exact path='/makepayment'>
        <MakePayment/>
      </Route>
      
      <Route component={NotFound} />
    </Switch>

    )
}

export default Routes;