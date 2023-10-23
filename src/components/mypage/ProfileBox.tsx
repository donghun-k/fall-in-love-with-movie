import { Avatar, Box, Typography } from '@mui/material';
import { User } from 'firebase/auth';

interface Props {
  user: User;
}

const ProfileBox = ({ user }: Props) => {
  const props = { user };
  return <ProfileBoxView {...props} />;
};

interface ViewProps {
  user: User;
}

const ProfileBoxView = ({ user }: ViewProps) => {
  const { displayName, photoURL } = user;
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
        src={photoURL ?? ''}
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
        {displayName}
      </Typography>
    </Box>
  );
};

export default ProfileBox;
