import { Box, Button, CircularProgress } from '@mui/material';

interface Props {
  isFetching: boolean;
  hasNextPage: boolean;
  handleViewMore: () => void;
}

const ViewMore = ({ isFetching, hasNextPage, handleViewMore }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="10px"
      paddingBottom="40px"
    >
      {isFetching && <CircularProgress />}
      {!isFetching && hasNextPage && (
        <Button fullWidth size="large" onClick={handleViewMore}>
          더 보기
        </Button>
      )}
    </Box>
  );
};

export default ViewMore;
