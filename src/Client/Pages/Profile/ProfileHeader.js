import React from "react";
import { render } from "react-dom";
import { useUser } from '../../../Components/Hooks/useUser'

const ProfileHeader = () => {

    let user = useUser();
    console.log('User Info From User Hook: ', user.User)
    return(
        <div className="full-row light-blue">
        <div className="container-fluid">
          <div id="account-profile" className="row text-white pt-3 ">
            <div className="col-md-12 text-white text-center mb-3">
              <div className="profile-img-lg" data-initials={user.User.FirstName?.charAt(0) + user.User.LastName?.charAt(0)}></div>
              <h4>{user.User.FirstName} {user.User.LastName}</h4>
              <p>Member Since: {user.User.UserCreated} <span className="spacer"></span> {user.User.UserID}</p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProfileHeader;