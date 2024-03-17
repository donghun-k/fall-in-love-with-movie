import { useDispatch } from 'react-redux';

import { closeDialog, openDialog } from '../store/dialogSlice';
import { DialogInfo } from '../components/Layout/DialogContainer';

const useDialog = () => {
  const dispatch = useDispatch();

  const handleOpenDialog = (dialogInfo: DialogInfo) => {
    dispatch(openDialog(dialogInfo));
  };
  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  return { openDialog: handleOpenDialog, closeDialog: handleCloseDialog };
};

export default useDialog;
