import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/system';

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

// Custom styled backdrop with blur effect
const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
  backdropFilter: 'blur(10px)', // Apply blur effect
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: semi-transparent background
}));

export default function ModalConfirm({ buttonRef, title, message, okHandler }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    buttonRef.current.forEach((btn) => {
      btn.addEventListener('click', handleOpen);
    });

    // Clean up event listeners on component unmount
    return () => {
      buttonRef.current.forEach((btn) => {
        btn?.removeEventListener('click', handleOpen);
      });
    };
  }, [buttonRef]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={CustomBackdrop}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={okHandler}>Yes</Button>
            <Button variant="outlined" onClick={handleClose}>No</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
