import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RouteRequiresLogin';

//components used in admin routes
import Events from './components/admin/pages/Events';
import EditEvent from "./components/admin/events/EditEvent";
import CreateEvent from "./components/admin/events/CreateEvent";
import Users from './components/admin/pages/Users';
import CreateEditUser from './components/admin/forms/UserEditForm';
import Dashboard from "./components/admin/Dashboard";
import Settings from "./components/admin/pages/Settings";
import Finances from "./components/admin/pages/Finances"
import Roles from "./components/admin/pages/Roles";
import Certifications from "./components/admin/pages/Certifications";
import Reporting from "./components/admin/pages/Reporting";

import RegistrationView from './components/admin/events/Registration';
import GetAttendees from './components/admin/events/GetAttendees';
import RegistrationForm from './components/admin/forms/RegistrationForm';
import AddRegistrationForm from './components/admin/forms/AddRegistrationForm';
import OptionalCosts from './components/admin/events/OptionalCosts';
import Status from './components/admin/events/Status';

//profile forms
//import ChurchForm from './components/profile/ProfileSectionForms/Church';
//import EducationForm from './components/profile/ProfileSectionForms/Education';
//import EmergencyContactForm from './components/profile/ProfileSectionForms/EmergencyContact';
//import GeneralForm from './components/profile/ProfileSectionForms/General';
//import HealthForm from './components/profile/ProfileSectionForms/Health';
//import InsuranceForm from './components/profile/ProfileSectionForms/Insurance';
//import PassportForm from './components/profile/ProfileSectionForms/Passport';
import ReferencesForm from './components/profile/ProfileSectionForms/References';
import SkillsForm from './components/profile/ProfileSectionForms/Skills';

//unprotected routes
import EventCheckIn from './components/profile/EventCheckIn';
import EventsAndOpportunities from "./components/profile/EventsAndOpportunities";
import Register from "./components/profile/Register";
import EventDetails from "./components/EventDetails";
import ProfileContainer from "./components/profile/ProfileContainer";
import Login from './components/Login';
import CreateAccount from "./components/CreateAccount";
import MakePayment from "./components/MakePayment";
import { NotFound, NotAuthorized, NoResults, Thanks } from "./components/Generic";

//import Profile from "./../Client/Pages/Profile/Profile"

import Layout from './components/Layout';


const AppRoutes = () => (

  <Routes>
        <Route element={<Layout />} >

          {/* PUBLIC ROUTES */}
          {/*<Route path='/admin/login' element={<Login/>} />*/}
          <Route path='/login' element={<Login/>} />
          <Route path='/createaccount' element={<CreateAccount/>} />
          <Route path='/events' element={<EventsAndOpportunities/>} />  
          <Route path='/events/details/:eventid' element={<EventDetails/>} />
          <Route path='/makepayment' element={<MakePayment/>} />
          <Route path='/unauthorized' element={<NotAuthorized />} />

          {/* PRIVATE ROUTES WITH SPECIFIC ROLE ACCESS */}
          <Route element={<RequireAuth allowedRoles={[8,33,32]}/>} >
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />}/>
            <Route path="/admin/users/edit/:userid" element={<CreateEditUser />}/>
            <Route path="/admin/finances" element={<Finances />}/>
            <Route path="/admin/roles" element={<Roles />}/>
            <Route path="/admin/certifications" element={<Certifications />}/>
            <Route path="/admin/reporting" element={<Reporting />}/>
            <Route path="/admin/settings" element={<Settings />}/>
          </Route>
          <Route element={<RequireAuth allowedRoles={[8,33,32,35]}/>} >
            <Route path="/admin/events" element={<Events />}/>
            <Route path="/admin/events/create" element={<CreateEvent />} />
            <Route path="/admin/events/:eventid" element={<EditEvent />}/>
            <Route path="/admin/events/general/:eventid" element={<EditEvent />}/>
            <Route path="/admin/events/attendees/:eventid" element={<GetAttendees />} />
            <Route path="/admin/events/registration/:eventid" element={<RegistrationView />}/>
            <Route path="/admin/events/registration/add/:eventid" element={<AddRegistrationForm />}/>
            <Route path="/admin/events/registration/:eventid/:registrationid" element={<RegistrationForm />}/>
            <Route path="/admin/events/optionalcosts/:eventid" element={<OptionalCosts />}/>
            <Route path="/admin/events/status/:eventid" element={<Status />}/>
          </Route>


          {/* Not Sure about the 38 role, /admin/checkin route
          <Route element={<RequireAuth allowedRoles={[8,33,32,38]}/>} >

          </Route>
          */}


          {/* PRIVATE ROUTES, ONLY SIGNED IN USERS */}
          <Route element={<RequireAuth allowedRoles={[]} />} >
            <Route path="/profile" element={<ProfileContainer />} />
            <Route path='/events/register/:eventid' render={props => <Register {...props}/>} />
            <Route path='/events/register/thanks/:eventid' render={props => <Thanks {...props}/>} />
          </Route>


          {/* CATCH ALL */}
          <Route path="*" element={<NotFound />} />

        </Route>
 
  </Routes>
)


export default AppRoutes;


        {/* NOT SURE BOUT THESE 

<ProtectedRoute exact path="/admin/login" component={AdminLogin}/>

      <Route exact path='/events/register/thanks/:eventid' render={(props) => <Thanks {...props}/>}>
      </Route>

      <Route element={<NotFound />} />


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



      */}