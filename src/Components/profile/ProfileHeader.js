import React from "react";
import { render } from "react-dom";
import useData  from '../../Hooks/useData';

const ProfileHeader = () => {
    const { auth } = useData();
    
    const createDate = auth?.User?.UserCreated || 'N/A';
    const id = auth?.User?.UserID;
    const lastName = auth?.User?.LastName;
    const firstName = auth?.User?.FirstName;

    return auth?.User ? (
        <div className="full-row light-blue">
        <div className="container-fluid">
          <div id="account-profile" className="row text-white pt-3 ">
            <div className="col-md-12 text-white text-center mb-3">
              <div className="profile-img-lg" data-initials={firstName.charAt(0) + lastName.charAt(0)}></div>
              <h4>{firstName} {lastName}</h4>
              <p>Member Since: {createDate} <span className="spacer"></span> {id}</p>
            </div>
          </div>
        </div>
      </div>
    ):(
      <div></div>
    )
}

export default ProfileHeader;