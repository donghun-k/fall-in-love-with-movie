import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import Rating from '../../models/Rating';
import { GENRE_IDS, getGenreNameById } from '../../utils/genre';

interface Props {
  myRatings: Rating[];
}

const PreferredGenreAccordian = ({ myRatings }: Props) => {
  const [genreData, setGenreData] = useState<
    { genreName: string; averageRating: number; count: number }[]
  >([]);
  useEffect(() => {
    const genreDataObject: Record<number, { sum: number; count: number }> = {};
    GENRE_IDS.forEach((genreId) => {
      genreDataObject[genreId] = { sum: 0, count: 0 };
    });
    myRatings.forEach((rating) => {
      const { movieGenreIds } = rating;
      movieGenreIds.forEach((genreId) => {
        genreDataObject[genreId].sum += rating.rating;
        genreDataObject[genreId].count++;
      });
    });
    const genreData = Object.entries(genreDataObject)
      .map(([genreId, data]) => {
        const averageRating =
          data.count !== 0 ? Number((data.sum / data.count).toFixed(1)) : 0;
        return {
          genreName: getGenreNameById(Number(genreId)),
          averageRating,
          count: data.count,
        };
      })
      .sort((a, b) => b.averageRating - a.averageRating);
    setGenreData(genreData);
  }, [myRatings]);

  const props = {
    genreData,
  };
  return <PreferredGenreAccordianView {...props} />;
};

interface ViewProps {
  genreData: {
    genreName: string;
    averageRating: number;
    count: number;
  }[];
}

const PreferredGenreAccordianView = ({ genreData }: ViewProps) => {
  return (
    <Accordion
      sx={{
        width: '100%',
        borderRadius: '5px',
        fontSize: { xs: '1rem', sm: '1.2rem' },
        fontWeight: 'bold',
      }}
    >
      <AccordionSummary>선호하는 장르</AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          {[...genreData].splice(0, 3).map((data) => (
            <Box
              key={data.genreName}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.5rem' },
                }}
              >
                {data.genreName}
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '.8rem', sm: '1rem' },
                }}
              >
                평균 {data.averageRating}점
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '.7rem', sm: '.8rem' },
                }}
              ></Typography>
            </Box>
          ))}
        </Box>
        <Divider
          sx={{
            margin: { xs: '10px', sm: '20px 0' },
          }}
        />
        <Box
          sx={{
            padding: '0 10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xx: '10%', sm: '20%' },
          }}
        >
          {genreData.map((data, i) => {
            if (i < 3) return null;
            return (
              <Box
                key={data.genreName}
                sx={{
                  padding: { xs: '5px', sm: '10px' },
                  width: { xs: '40%', sm: '30%' },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '.8rem', sm: '1rem' },
                  }}
                >
                  {data.genreName}
                </Typography>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '.8rem', sm: '1rem' },
                  }}
                >
                  {data.averageRating}점
                </Typography>
              </Box>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PreferredGenreAccordian;
