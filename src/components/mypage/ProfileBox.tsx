import { Avatar, Box, Typography } from '@mui/material';

interface Props {}

const ProfileBox = ({}: Props) => {
  const props = {};
  return <ProfileBoxView {...props} />;
};

interface ViewProps {}

const ProfileBoxView = ({}: ViewProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        gap: '10px',
      }}
    >
      <Avatar
        sx={{
          width: '100px',
          height: '100px',
        }}
      />
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        유저 이름
      </Typography>
    </Box>
  );
};

export default ProfileBox;
