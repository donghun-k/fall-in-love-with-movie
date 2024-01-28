import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import SearchDialog from './dialogs/SearchDialog';
import EditCommentDialog, {
  Props as EditCommentDialogProps,
} from './dialogs/EditCommentDialog';

interface SeachDialogInfo {
  type: 'search';
  props: null;
}

interface EditCommentDialogInfo {
  type: 'editComment';
  props: EditCommentDialogProps;
}

interface NoneDialogInfo {
  type: null;
  props: null;
}

export type DialogInfo =
  | SeachDialogInfo
  | EditCommentDialogInfo
  | NoneDialogInfo;

export type DialogType = Exclude<DialogInfo['type'], null>;

const DIALOG_COMPONENTS: Record<DialogType, JSX.ElementType> = {
  search: SearchDialog,
  editComment: EditCommentDialog,
};

const DialogContainer = () => {
  const {
    dialogInfo: { type, props },
  } = useSelector((state: RootState) => state.dialog);

  if (!type) return null;

  const Dialog = DIALOG_COMPONENTS[type];

  return <Dialog {...props} />;
};

export default DialogContainer;