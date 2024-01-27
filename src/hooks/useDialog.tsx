import { useDispatch } from 'react-redux';
import { DialogState, closeDialog, openDialog } from '../store/dialogSlice';

const useDialog = () => {
  const dispatch = useDispatch();

  const handleOpenDialog = ({ type, props }: DialogState) => {
    dispatch(openDialog({ type, props }));
  };
  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  return { openDialog: handleOpenDialog, closeDialog: handleCloseDialog };
};

export default useDialog;
