import React from "react";
import { useUser } from '../../../Components/Hooks/useUser'

const ProfileHeader = () => {

    let user = useUser();
    return(
        <div className="full-row light-blue">
        <div className="container-fluid">
          <div id="account-profile" class="row text-white pt-3 ">
            <div className="col-md-12 text-white text-center mb-3">
              <div className="profile-img-lg" data-initials="RB"></div>
              <h4>{user.FirstName} {user.LastName}</h4>
              <p>Member Since: 5/29/2015 <span class="spacer"></span> {user.UserID}</p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProfileHeader;