export const generatePosterImgSrc = ({
  path,
  size,
}: {
  path: string;
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
}) => {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
};

export const generateBackdropImgSrc = ({
  path,
  size,
}: {
  path: string;
  size: 'w300' | 'w780' | 'w1280' | 'original';
}) => {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
};
