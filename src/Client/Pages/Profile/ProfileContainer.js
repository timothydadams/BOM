import react from "react"
import ProfileHeader from "./ProfileHeader"
import ProfileTabs from "./ProfileTabs"
import Profile from "./Profile"
import { useLocation } from "react-router-dom"
import Tab1 from "./Tabs/Tab1"
import Tab2 from "./Tabs/Tab2"
import Tab3 from "./Tabs/Tab3"
import Tab4 from "./Tabs/Tab4"
import Tab5 from "./Tabs/Tab5"
import Tab6 from "./Tabs/Tab6"
import Tab7 from "./Tabs/Tab7"
import Tab8 from "./Tabs/Tab8"
import Tab9 from "./Tabs/Tab9"

const ProfileContainer = () =>{

    const loc = useLocation();
    console.log(loc.hash);

    return(
        <div>
            <ProfileHeader/>
            <ProfileTabs/>
            {/* need to have conditional load for the pieces*/}
            { loc.hash === '' ? <Tab1/> : ''}
            { loc.hash === '#tab1' ? <Tab1/> : ''}
            { loc.hash === '#tab2' ? <Tab2/> : ''}
            { loc.hash === '#tab3' ? <Tab3/> : ''}
            { loc.hash === '#tab4' ? <Tab4/> : ''}
            { loc.hash === '#tab5' ? <Tab5/> : ''}
            { loc.hash === '#tab6' ? <Tab6/> : ''}
            { loc.hash === '#tab7' ? <Tab7/> : ''}
            { loc.hash === '#tab8' ? <Tab8/> : ''}
            { loc.hash === '#tab9' ? <Tab9/> : ''}
        </div>
    )
}

export default ProfileContainer