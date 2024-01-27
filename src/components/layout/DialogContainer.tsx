import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SearchDialog from './dialogs/SearchDialog';
import EditCommentDialog from './dialogs/EditCommentDialog';

export type DialogType = 'search' | 'editComment';

const DIALOG_COMPONENTS: Record<DialogType, JSX.ElementType> = {
  search: SearchDialog,
  editComment: EditCommentDialog,
};

const DialogContainer = () => {
  const { type, props } = useSelector((state: RootState) => state.dialog);

  if (!type) return null;

  const Dialog = DIALOG_COMPONENTS[type];

  return <Dialog {...props} />;
};

export default DialogContainer;
