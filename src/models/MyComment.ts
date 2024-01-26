import { DocumentReference } from 'firebase/firestore';

import Comment from './Comment';

export default interface MyComment extends Comment {
  commentRef: DocumentReference;
}
