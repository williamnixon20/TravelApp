const router = require('express').Router();
const Pin = require('../models/Pin')

//Create a pin
router.post("/", async (req, res) => {
    const newPin = new Pin(req.body)
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin)
    } catch (err) {
        res.status(500).json("Title, Review, and Rating is required. Try harder!")
    }
})

//Get all pins
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find().limit(25)
        res.status(200).json(pins)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/", async (req, res) => {
    const deletedPinId = req.body;
    try {
        const deletedPin = await Pin.deleteOne({ _id: deletedPinId })
        res.status(200).json("Success!")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router