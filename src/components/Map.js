import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { Button, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './Map.css'
 

const useStyles = makeStyles((theme) => ({
  curLocButton: {
    marginBottom: 10,
  },
}));

const markerStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)'
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const Marker = ({ lat, lng, clickedMarker }) =>
    <HtmlTooltip title={
      <React.Fragment>
        <Typography color="inherit">{clickedMarker?"Clicked Location" : "My Location"}</Typography>
        <em><b>{`Lat: ${lat}`}</b></em><br/>
        <em><b>{`Long: ${lng}`}</b></em>
      </React.Fragment>
      } interactive>
      <PersonPinCircleIcon className="mapMarker" style={markerStyle} color={clickedMarker?"secondary" :"primary"}></PersonPinCircleIcon>
    </HtmlTooltip>
  ;
 
export default function SimpleMap({ coord, setChosenCoord }) {

    const [zoom, setZoom] = useState(6)

    const [center, setCenter] = useState(coord)
    const [myLocation, setMyLocation] = useState(coord)
    const [clickedLocation, setClickedLocation] = useState(null)
    
    React.useEffect(() => {

    })

    const handleClick = (e) => {
      setClickedLocation({lat: e.lat, lng: e.lng})
      setCenter({lat: e.lat, lng: e.lng})
      setChosenCoord({lat: e.lat, lng: e.lng})
    }
    
    // const handleDrag = (map) => {
    //   console.log(map)
    // }

    const handleChange = (e) => {
      setCenter(e.center)
    }

    // const handleMarkerHover = (e, marker) => {
    //   console.log(e)
    //   console.log(marker)
    // }
    
    const handleMarkerClick = (e, marker) => {
      setChosenCoord({lat: marker.lat, lng: marker.lng})
    }

    const handleCurLocButton = (e) => {
      if (navigator.geolocation) {
        navigator?.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            setMyLocation(pos)
            setCenter(pos)
            setZoom(12)
            setChosenCoord(pos)
          },
          (e) => {
            console.log(e)
            alert("Error: The Geolocation service failed.")
          }, {
            maximumAge:10000, 
            timeout:5000,
            enableHighAccuracy: true
          }
        );
      } else {
        console.log("error")
        alert("Error: Your browser doesn't support geolocation.")
      }
    }

    const classes = useStyles();

    return (
      // Important! Always set the container height explicitly
      <>
        <Button size="small" variant="contained" color="primary" className={classes.curLocButton} onClick={handleCurLocButton}>
          Pan To Current Location
        </Button>
        <div style={{ height: '300px', width: '100%' }}>
          {/* <button>Pan To Current Location</button> */}
          <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              options={{fullscreenControl: false}}
              center={center}
              zoom={zoom}
              onClick={handleClick}
              // onDragEnd={handleDrag}
              onChange={handleChange}
              // onChildMouseEnter={handleMarkerHover}
              onChildClick={handleMarkerClick}
          >
              <Marker
                lat={myLocation.lat}
                lng={myLocation.lng}
              />
              {clickedLocation ?
              <Marker
                lat={clickedLocation.lat}
                lng={clickedLocation.lng}
                clickedMarker={true}
              />
              :
              <></>}
          </GoogleMapReact>
        </div>
      </>
    );
}