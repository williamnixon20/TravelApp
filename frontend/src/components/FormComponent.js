import axios from 'axios';
import React, { useState } from 'react'
import { Popup } from 'react-map-gl';

const FormComponent = (props) => {
    const { newPlace, currentUser, title, desc, rating, pins, setNewPlace, setTitle, setDesc, setRating, setPins } = props;
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
            username: currentUser,
            title,
            desc,
            rating,
            lat: newPlace.lat,
            long: newPlace.long
        }

        try {
            const res = await axios.post("/pins", newPin);
            setPins([...pins, res.data]);
            resetState();
        } catch (err) {
            if (err.response.status === 500) {
                setError(err.response.data)
            }
        }
    }

    const resetState = () => {
        setTitle(null)
        setRating(1)
        setDesc(null)
        setError(null)
        setNewPlace(null)
    }
    return (
        <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => resetState()}
        >
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input placeholder="What's this place?"
                        onChange={(e) => setTitle(e.target.value)}></input>
                    <label>Review</label>
                    <textarea placeholder="How was it?" onChange={(e) => setDesc(e.target.value)}></textarea>
                    <label>Rating</label>
                    <select onChange={(e) => setRating(e.target.value)}>
                        <option value="1">1, Stay out!</option>
                        <option value="2">2, Meh</option>
                        <option value="3">3, So so</option>
                        <option value="4">4, It's great!</option>
                        <option value="5">5, A hidden gem</option>
                    </select>
                    {error && <label className="error">{error}</label>}
                    <button className="submitButton" type="submit">Add Pin</button>
                </form>
            </div>
        </Popup>
    )
}
export default FormComponent
