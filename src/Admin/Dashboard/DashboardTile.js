import React from "react"
import {Link} from "react-router-dom"

function DashboardTile(props){
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

export default DashboardTile