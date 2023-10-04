import { Box } from '@mui/material';
import BackdropSection from '../../components/movie/BackdropSection';
import MovieDetail from '../../types/MovieDetail';
// import InfoSection from '../../components/movie/InfoSection';
// import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
  // const { movieId } = useParams<{ movieId: string }>();

  const MOVIE_DETAIL = {
    adult: false,
    backdrop_path: '/1aABIiqBY7yoQESE8qWvR0w9bJZ.jpg',
    belongs_to_collection: {
      id: 728776,
      name: '도라에몽: 스탠바이미 시리즈',
      poster_path: '/lGcBVGVuhtdq4Ow0eC6zQBxuHOM.jpg',
      backdrop_path: '/lQXolNuZN2g5ws2ywyKEo38XnxJ.jpg',
    },
    budget: 35000000,
    genres: [
      {
        id: 16,
        name: '애니메이션',
      },
      {
        id: 10751,
        name: '가족',
      },
      {
        id: 878,
        name: 'SF',
      },
      {
        id: 14,
        name: '판타지',
      },
    ],
    homepage: '',
    id: 265712,
    imdb_id: 'tt3331846',
    original_language: 'ja',
    original_title: 'STAND BY ME ドラえもん',
    overview:
      '공부도 꽝, 운동도 꽝, 무얼해도 덜렁대고 소심한 소년 진구.  그런 진구에게 행복한 꿈과 미래를 선물하는 임무를 받고 22세기에서 날아온 최고의 친구, 도라에몽!  대나무 헬리콥터, 어디로든 문, 투명망토, 암기빵, 그리고 타임머신까지!  도라에몽은 온갖 미래의 비밀도구로 오직 진구만을 위한 노력에 나선다.  마지못해 임무를 부여 받고 미래에서 끌려온 도라에몽은 누구보다 착한 마음씨를 지닌 진구와 점차 특별한 우정을 나누게 되지만,  언제까지나 함께할 것 같던 두 단짝에게도 이별의 순간이 찾아오는데..  과연 도라에몽은 진구의 꿈과 행복을 이뤄줄 수 있을까?  우리가 몰랐던 도라에몽의 처음, 그리고 마지막 이야기가 펼쳐진다!',
    popularity: 70.941,
    poster_path: '/q7YdWMCizuWCXsJkP7dQ7ASW7DJ.jpg',
    production_companies: [
      {
        id: 882,
        logo_path: '/iDw9Xxok1d9WAM2zFicI8p3khTH.png',
        name: 'TOHO',
        origin_country: 'JP',
      },
      {
        id: 11327,
        logo_path: '/gJM4ZwaQEKz9zsus8MNGWbm4maV.png',
        name: 'Shirogumi',
        origin_country: 'JP',
      },
      {
        id: 12386,
        logo_path: '/oxvw2Mrq3GcTxFc2mlT7E5tpek7.png',
        name: 'Robot Communications',
        origin_country: 'JP',
      },
      {
        id: 5141,
        logo_path: '/fK2QKfHdSdw42Xx4MiD7KhDufBV.png',
        name: 'Shin-Ei Animation',
        origin_country: 'JP',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'JP',
        name: 'Japan',
      },
    ],
    release_date: '2014-08-08',
    revenue: 83061158,
    runtime: 95,
    spoken_languages: [
      {
        english_name: 'Japanese',
        iso_639_1: 'ja',
        name: '日本語',
      },
    ],
    status: 'Released',
    tagline:
      '5주 연속 박스오피스 1위! 600만 관객 동원 흥행 신기록에 빛나는 도라에몽이 한국에 상륙했다!',
    title: '도라에몽: 스탠바이미',
    video: false,
    vote_average: 7.305,
    vote_count: 471,
  };

  const props = {
    movieDetail: MOVIE_DETAIL,
  };

  return <MovieDetailPageView {...props} />;
};

interface ViewProps {
  movieDetail: MovieDetail;
}

const MovieDetailPageView = ({ movieDetail }: ViewProps) => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BackdropSection movieDetail={movieDetail} />
      {/* <InfoSection movieDetail={movieDetail} /> */}
    </Box>
  );
};
export default MovieDetailPage;
