import React from 'react';
import { useLocation } from 'react-router-dom';
//import { urlBannerList } from './urlBannerList';

const urlBannerList = [
    { id: 1, name: 'Dashboard', url: '/admin', bannerUrl: '/Images/eventBanner.jpg', desc:'View and manage all items in site' },
    { id: 1, name: 'Events', url: '/admin/events', bannerUrl: '/Images/eventBanner.jpg', desc:'View and manage events and attendees' },
    { id: 2, name: 'Users', url: '/admin/users', bannerUrl: '/Images/eventBanner.jpg', desc:'View and manage users'   },
    { id: 3, name: 'Finances', url: '/admin/finances', bannerUrl: '/Images/eventBanner.jpg', desc:'View and manage orders that were placed'   },
    { id: 4, name: 'Certifications', url: '/admin/certifications', bannerUrl: '/Images/eventBanner.jpg', desc:'Update and add certifications to users'   },
    { id: 5, name: 'Reporting', url: '/admin/reporting', bannerUrl: '/Images/eventBanner.jpg', desc:'Print users badges'   },
    { id: 6, name: 'Checkin', url: '/admin/checkin', bannerUrl: '/Images/eventBanner.jpg', desc:'Use this to check users into specific events'   },
    { id: 7, name: 'Roles', url: '/admin/roles', bannerUrl: '/Images/eventBanner.jpg', desc:'Use this to check users into specific events'   },
    { id: 8, name: 'Settings', url: '/admin/settings', bannerUrl: '/Images/eventBanner.jpg', desc:'Use this to check users into specific events'   },

    { id: 9, name: 'Events', url: '/events', bannerUrl: '/Images/eventBanner.jpg', desc:'View Current Events and Register'   },
    { id: 10, name: 'Reserved', url: '/myreserved', bannerUrl: '/Images/eventBanner.jpg', desc:'Use this to check users into specific events'   },
    { id: 11, name: 'Certifications', url: '/mycertifications', bannerUrl: '/Images/eventBanner.jpg', desc:'Use this to check users into specific events'   },
    { id: 12, name: 'Account Information', url: '/myprofile', bannerUrl: '/Images/eventBanner.jpg', desc:'Use this to check users into specific events'   },
];


const Banner = (props) => {
    const urlObj = useLocation();
    console.log('my url path', urlObj);
    const currentBanner = urlBannerList.find( ({url}) => url === urlObj.pathname );

    console.log('current banner', currentBanner);


    const bgImageStyle = {
        background: `url(${currentBanner?.bannerUrl}) no-repeat center center`,
        backgroundSize: 'cover'
    }

    return (
     currentBanner ? (
    <div id="banner" className="full-row" style={currentBanner?.bannerUrl ? bgImageStyle : {}}>
        <div className="overlay"></div>
        <div className="banner-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-white">
                        <h1 className="text-uppercase">{currentBanner?.name}</h1>
                        <p>{currentBanner?.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>) : ''
)
}
export default Banner;