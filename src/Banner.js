import React from 'react'
import { useLocation } from 'react-router-dom'
import urlBannerList from './urlBannerList'

const Banner = (props) =>{
const location = useLocation();
const currentBanner = urlBannerList.find(({url}) => 
    url === location.pathname
);

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