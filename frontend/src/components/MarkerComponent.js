import React from 'react'
import { Marker } from 'react-map-gl';
import { Room } from "@material-ui/icons"

const MarkerComponent = (props) => {
    const { size = 50, pin, currentUser, handleMarkerClick } = props;

    return (
        <Marker
            latitude={pin.lat}
            longitude={pin.long}
        >
            <div style={{ transform: `translate(${-size / 2}px,${-size}px)` }}>
                <Room
                    style={{ fontSize: `${size}`, color: pin.username === currentUser ? "tomato" : "slateblue", cursor: "pointer" }}
                    onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
                ></Room>
            </div>
        </Marker>
    )
}

export default MarkerComponent
