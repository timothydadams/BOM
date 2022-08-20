import React from "react";
import {Link} from 'react-router-dom';

const dashboardList = [
  { id: 1, name: 'Events', icon:'icon-calendar py-5', url: './events', class:'bg-primary text-white', desc:'View and manage events and attendees' },
  { id: 2, name: 'Users', icon:'icon-user py-5', url: './users', class:'bg-primary text-white', desc:'View and manage users'   },
  { id: 3, name: 'Finances', icon:'icon-wallet py-5', url: './finances', class:'bg-primary text-white', desc:'View and manage orders that were placed'   },
  { id: 4, name: 'Certifications', icon:'icon-star py-5', url: './certifications', class:'bg-primary text-white', desc:'Update and add certifications to users'   },
  { id: 5, name: 'Reporting', icon:'icon-edit py-5', url: './reporting', class:'bg-primary text-white', desc:'Print users badges'   },
  { id: 6, name: 'Checkin', icon:'icon-checkin py-5', url: './checkin', class:'bg-primary text-white', desc:'Use this to check users into specific events'   },
  { id: 7, name: 'Roles', icon:'icon-roles py-5', url: './roles', class:'bg-primary text-white', desc:'Use this to check users into specific events'   },
  { id: 8, name: 'Settings', icon:'icon-settings py-5', url: './settings', class:'bg-primary text-white', desc:'Use this to check users into specific events'   },
];



const DashboardTile = (props) => {
  return(
      <div className="post-card col-md-4 mb-4">
          <Link to={props.url}>
            <div className="card text-center"> <i className={props.icon}></i>
              <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
              </div>
            </div>
          </Link> 
    </div>
  )
}


const Dashboard = () => {
            
  return (
    <div className="row">
        {dashboardList.map(dashitem => 
          <DashboardTile 
            key={dashitem.id} 
            name={dashitem.name} 
            url={dashitem.url} 
            icon={dashitem.icon}
          />
        )}
      </div>
  );
}

export default Dashboard;