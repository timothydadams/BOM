import React, {Component} from "react"

import DashboardList from "./DashboardList"
import DashboardTile from "./DashboardTile"

class Dashboard extends Component {
        render(){
            
        return(
            DashboardList.map(dashitem => 
                <DashboardTile 
                  key={dashitem.id} 
                  name={dashitem.name} 
                  url={dashitem.url} 
                  icon={dashitem.icon}
                />)
        )
    }
}

export default Dashboard