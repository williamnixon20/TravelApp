import React from 'react'
import { Modal, Box, Typography } from '@material-ui/core'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TutorialComponent = (props) => {
    const { showTutorial, setShowTutorial } = props;

    return (
        <Modal
            open={showTutorial}
            onClose={() => setShowTutorial(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Hey, let's get this started.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                    Share your reviews by double tapping the map.
                    See locations visited by others by clicking on available markers.
                    Have fun!
                </Typography>
            </Box>
        </Modal>
    )
}

export default TutorialComponent
