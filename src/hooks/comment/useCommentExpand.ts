import { useEffect, useRef, useState } from 'react';

const useCommentExpand = () => {
  const [expand, setExpand] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflow(contentRef.current.scrollHeight > 60);
    }
  }, [contentRef]);

  const handleExpand = () => {
    setExpand((prev) => !prev);
  };
  return {
    expand,
    isOverflow,
    contentRef,
    handleExpand,
  };
};

export default useCommentExpand;
