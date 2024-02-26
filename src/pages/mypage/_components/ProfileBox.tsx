import { Avatar, Box, Typography } from '@mui/material';
import { User } from 'firebase/auth';

interface Props {
  user: User;
}

const ProfileBox = ({ user }: Props) => {
  const { displayName, photoURL } = user;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      padding="20px"
      gap="10px"
    >
      <Avatar
        src={photoURL ?? ''}
        sx={{
          width: '100px',
          height: '100px',
        }}
      />
      <Typography fontSize="20px" fontWeight="bold">
        {displayName}
      </Typography>
    </Box>
  );
};

export default ProfileBox;
