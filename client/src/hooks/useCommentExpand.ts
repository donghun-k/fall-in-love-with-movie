// useCommentExpand.ts
import { useEffect, useState } from 'react';

interface Params {
  calculateIsOverflow: () => boolean;
}

const useCommentExpand = ({ calculateIsOverflow }: Params) => {
  const [expand, setExpand] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    setIsOverflow(calculateIsOverflow());
  }, [calculateIsOverflow]);

  const handleExpand = () => {
    setExpand((prev) => !prev);
  };
  return {
    expand,
    isOverflow,
    handleExpand,
  };
};

export default useCommentExpand;
