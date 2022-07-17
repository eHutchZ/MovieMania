import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

const PlotModal = () => {
  const { openModal, summary, setOpenModal, setSummary } = useAppContext();
  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setSummary('');
      }}
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 2, margin: 'auto' }}>
          {summary.length > 0 ? (
            <Typography>{summary}</Typography>
          ) : (
            <CircularProgress sx={{ textAlign: 'center' }} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PlotModal;
