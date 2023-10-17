import { Box, Divider, Skeleton } from '@mui/material';

const CommentItemSkeleton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'fit-content',
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: { xs: '10px', sm: '20px' },
        backgroundColor: 'transparent',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          width: '50px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '10px',
        }}
      >
        <Skeleton variant="circular" animation="wave" width={50} height={50} />
      </Box>
      <Box
        sx={{
          width: 'calc(100% - 70px)',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Skeleton variant="text" animation="wave" width="25%" height={25} />
        <Skeleton
          variant="text"
          animation="wave"
          width="100%"
          height={40}
          sx={{
            margin: '5px 0',
          }}
        />
        <Divider sx={{ width: '100%' }} />
        <Skeleton variant="text" animation="wave" width="10%" height={25} />
      </Box>
    </Box>
  );
};

export default CommentItemSkeleton;
