import React from 'react'
import { Popup } from 'react-map-gl';
import { Star } from "@material-ui/icons"
import { format } from "timeago.js"
import axios from 'axios';

const PopupComponent = (props) => {
    const { pin, setCurrentPlaceId, currentUser, pins, setPins } = props;

    const handleDelete = async (e) => {
        try {
            await axios.delete('/pins', { data: pin })
            let newPins = pins.filter((checkpin) => checkpin._id !== pin._id);
            setPins(newPins)
            setCurrentPlaceId(null)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Popup
            latitude={pin.lat}
            longitude={pin.long}
            offsetLeft={15}
            offsetTop={-25}
            closeButton={true}
            closeOnClick={true}
            anchor="left"
            onClose={() => setCurrentPlaceId(null)}
            className="priority"
        >
            <div className="card">
                <label>Place</label>
                <h4 className="place">{pin.title}</h4>
                <label>Review</label>
                <p className="review">{pin.desc}</p>
                <label>Rating</label>
                <div>
                    {Array(pin.rating).fill(1).map((el, i) => <Star className="star-gold" key={i + 100} />)}
                    {Array(5 - pin.rating).fill(1).map((el, i) => <Star className="star-gray" key={i + 5} />)}
                </div>
                <label>Information</label>
                <span className="username">Created by {pin.username}</span>
                <span className="date">{format(pin.createdAt)}</span>
                {pin.username === currentUser && <button className="delete" onClick={handleDelete}>Delete</button>}
            </div>
        </Popup >
    )
}

export default PopupComponent
