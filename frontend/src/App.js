import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './app.css'
import axios from "axios"
import MarkerComponent from "./components/MarkerComponent"
import PopupComponent from "./components/PopupComponent"
import FormComponent from "./components/FormComponent"
import RegisterComponent from './components/Register/RegisterComponent';
import LoginComponent from './components/Login/LoginComponent';
import TutorialComponent from './components/Tutorial/TutorialComponent';

function App() {
  // @ts-ignore
  // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
  mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"))
  const [pins, setPins] = useState([])
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(1);

  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)

  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)

  const [viewport, setViewport] = useState({
    latitude: -6.2,
    longitude: 106.8,
    zoom: 6
  });

  useEffect(() => {
    const getPins = async () => {
      const res = await axios.get("/pins")
        .catch(err => console.log(err));
      setPins(res.data);
    }
    getPins()
  }, [])

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }

  const handleAddClick = (event) => {
    if (currentUser === null) {
      return;
    }
    const [longitude, latitude] = event.lngLat
    setNewPlace({
      long: longitude,
      lat: latitude,
    })
  }

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        width="100vw"
        height="100vh"
        onViewportChange={newView => setViewport(newView)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {pins.map(pin => {
          return <>
            <MarkerComponent key={pin._id} pin={pin} currentUser={currentUser} handleMarkerClick={handleMarkerClick}></MarkerComponent>
            {pin._id === currentPlaceId &&
              <PopupComponent key={pin._id + "popup"} pin={pin} setCurrentPlaceId={setCurrentPlaceId} style={{ zIndex: 1 }} currentUser={currentUser} pins={pins} setPins={setPins}></PopupComponent>
            }
          </>
        })}
        {newPlace && <FormComponent newPlace={newPlace} setNewPlace={setNewPlace} setTitle={setTitle} setDesc={setDesc} setRating={setRating} setPins={setPins} title={title} desc={desc} rating={rating} currentUser={currentUser} pins={pins}></FormComponent>}
        {currentUser ?
          (<button className="adminbutton logout" onClick={handleLogout}>Logout</button>)
          : (<div className="buttonscontainer">
            <button className="adminbutton login" onClick={() => { setShowLogin(true); setShowRegister(false) }}>Login</button>
            <button className="adminbutton register" onClick={() => { setShowRegister(true); setShowLogin(false) }}>Register</button>
          </div>)}
        {showRegister && <RegisterComponent setShowRegister={setShowRegister}></RegisterComponent>}
        {showLogin && <LoginComponent setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} setShowTutorial={setShowTutorial}></LoginComponent>}
        {showTutorial && <TutorialComponent setShowTutorial={setShowTutorial} showTutorial={showTutorial}></TutorialComponent>}
      </ReactMapGL>
    </div >
  );
}

export default App;
