import { Box, Typography } from '@mui/material';
import Movie from '../../types/Movie';
import MovieCard from '../common/MovieCard';
import TheatersIcon from '@mui/icons-material/Theaters';

interface Props {
  movieId: number;
}

const SIMILAR_MOVIES: Movie[] = [
  {
    adult: false,
    backdrop_path: '/bOtdLAnUxX3Hxn6LV5zFi15KW6S.jpg',
    genre_ids: [16, 28, 12, 14],
    id: 492999,
    original_language: 'ja',
    original_title: '劇場版 進撃の巨人 覚醒の咆哮',
    overview:
      '거대 장벽 속에서 발견된 거인의 존재 이후, 마침내 하나씩 밝혀지는 충격적인 진실! 그리고 모두를 혼란에 빠뜨린 짐승 거인의 출현까지! 월교가 감시하는 ‘크리스타’에게 숨겨진 비밀은 무엇인가? 한편, 거인의 손에 납치된 ‘엘런’을 구하기 위해 인간과 거인이 뒤섞인 초대형 전투가 펼쳐지는데! ‘엘런’의 손에 들어온 ‘좌표’는 희망의 열쇠일까? 인류의 빼앗긴 자유를 되찾기 위해 심장을 바쳐라!',
    popularity: 35.216,
    poster_path: '/1qzSByhW3dRQVqjnI7g1zyj6S3S.jpg',
    release_date: '2018-01-13',
    title: '진격의 거인: 각성의 포효',
    video: true,
    vote_average: 8.378,
    vote_count: 267,
  },
  {
    adult: false,
    backdrop_path: '/yU6oCgM4xGF7ZokINvCKjkMo8ex.jpg',
    genre_ids: [16, 80, 9648, 28, 18],
    id: 493006,
    original_language: 'ja',
    original_title: '名探偵コナン ゼロの執行人',
    overview:
      '국제 정상회담 개최지 ‘엣지 오브 오션’에서 발생한 대규모 폭발 사건! 사건 현장에서 발견된 지문으로 유력한 용의자가 된 모리 코고로는 긴급 체포된다! 하지만, 이후에도 도심 곳곳에서는 원인을 알 수 없는 폭발 사건이 이어지고, 극도로 은밀히 움직이는 아무로 토오루의 기묘한 행동에 코난은 의문을 품기 시작하는데…',
    popularity: 8.038,
    poster_path: '/49OsBvY2hvWBZgFr0YjbFScOvFe.jpg',
    release_date: '2018-04-13',
    title: '명탐정 코난: 제로의 집행인',
    video: false,
    vote_average: 6.1,
    vote_count: 142,
  },
  {
    adult: false,
    backdrop_path: '/2Q8mcFZSGl5WVOVojxSWXhYKBGc.jpg',
    genre_ids: [16, 18, 10749],
    id: 198375,
    original_language: 'ja',
    original_title: '言の葉の庭',
    overview:
      '구두 디자이너를 꿈꾸는 고등학생 다카오는 비오는 날 오전에는 학교 수업을 빼먹고 도심의 정원으로 구두 스케치를 하러 간다. 어느 날 그는 우연히 유키노라는 여인과 정원에서 만나게 된다. 그녀는 그보다 연상으로 보이지만 세상과 동떨어진 듯한 삶을 살고 있는 여인. 나이 차이가 나는 그들의 예상치 못한 우연한 만남은 비가 오는 날이면 그 정원에서 계속 이어진다. 이름도 나이도 알지 못하지만 걷는 법을 잊어버린 그녀를 위해 다카오는 구두를 만들어 주기로 결심한다. 하지만 장마가 끝나갈 무렵 그들 사이에는 뭔가 말하지 못한 것들이 남아 있는데...  과연 다카오는 그의 감정을 행동이나 말로 옮길 수 있을까?',
    popularity: 21.296,
    poster_path: '/pj3R74pW77zd3sKG56auJXsBMPk.jpg',
    release_date: '2013-05-31',
    title: '언어의 정원',
    video: false,
    vote_average: 7.6,
    vote_count: 1835,
  },
  {
    adult: false,
    backdrop_path: '/gGHjHezkPk6iY8fuGf2JsM7H4OL.jpg',
    genre_ids: [12, 35, 10749, 16, 878],
    id: 198102,
    original_language: 'ja',
    original_title: 'キューティーハニーＦ（ﾌﾗｯｼｭ）',
    overview: '시리즈 최초의 극장판',
    popularity: 2.793,
    poster_path: '/rJNbiQX9fXaQLj4q2Irp3yrXTum.jpg',
    release_date: '1997-07-11',
    title: '큐티하니 플래쉬 극장판',
    video: false,
    vote_average: 7.2,
    vote_count: 4,
  },
  {
    adult: false,
    backdrop_path: '/isM7fjukRUKR4OXLcVMbdPjMHtY.jpg',
    genre_ids: [16, 35, 9648],
    id: 919609,
    original_language: 'ja',
    original_title: '映画 オッドタクシー イン・ザ・ウッズ',
    overview:
      '2021년 4월부터 6월에 테레비 도쿄에서 방송되어 언뜻 따뜻한 동물 애니메이션처럼 보이지만 내용은 본격 미스터리라는 작풍으로 큰 화제를 모은 TV 애니메이션 「오드 택시」의 극장판. TV판을 재구축하면서도 새로운 시점으로 그려낸 최종회 이후도 밝혀진다. 개인 택시의 운전자로서 일하는 편굴하고 과묵한 남자 오도카와는, 가능한 한 타인과 관련되지 않도록 살아 왔다. 그러나 어떤 인물을 택시에 태운 것으로, 주변을 떠들석하게 한 「네리마구 여고생 실종 사건」에 휘말려 버린다. 사건에는 거액의 돈을 손에 넣은 남자나 한구레 집단, 잘 팔리는 아이돌, 카리스마화 된 대학생 등, 다양한 사람들의 운명이 복잡하게 얽혀 가고 있다. 그리고 어떤 계획의 실행을 계기로, 사태는 단번에 해결된 것처럼 보였다. 하지만 관계자들의 증언을 조합하는 것으로 사건의 새로운 윤곽이 그려진다.',
    popularity: 6.505,
    poster_path: '/vWtvRhnenl2g8qypSlOOlDIPLgP.jpg',
    release_date: '2022-04-01',
    title: '오드 택시 인 더 우즈',
    video: false,
    vote_average: 6.2,
    vote_count: 10,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [16, 18, 10751],
    id: 919659,
    original_language: 'ja',
    original_title: '象の背中 -旅立つ日-',
    overview: '',
    popularity: 0.6,
    poster_path: null,
    release_date: '2007-10-26',
    title: '象の背中 -旅立つ日-',
    video: false,
    vote_average: 6,
    vote_count: 1,
  },
  {
    adult: false,
    backdrop_path: '/ulVUa2MvnJAjAeRt7h23FFJVRKH.jpg',
    genre_ids: [12, 16, 14],
    id: 81,
    original_language: 'ja',
    original_title: '風の谷のナウシカ',
    overview:
      '천 년 전, 불의 7일간으로 불리는 전쟁이 끝난 후 지구는 죽음의 행성으로 변했다. 점점 커지는 곰팡이의 숲인 부해가 유독가스를 내뿜어 사람이 살 수 있는 땅도 얼마 남지 않았다. 자연과 대화를 나눌 수 있는 특별한 소녀 나우시카는 그 중 깨끗한 바람계곡에서 살고 있지만 부해는 이곳마저 먹어치울 듯 가깝게 다가온다. 그러나 위기는 인간들의 다툼에서 시작된다. 군사제국 토르메키아가 불의 7일간을 초래했던 병기 거신병을 부활시키려는 계획을 시작했기 때문. 바람계곡은 분쟁에 휘말리고 나우시카는 토르메키아와 맞서는 도시 국가 페지테의 인질이 된다. 그 와중에 나우시카는 부해가 지구를 정화하고 있었다는 사실을 깨닫는데...',
    popularity: 37.99,
    poster_path: '/jnw5Ab8104n4rTkTootpfZKYPiZ.jpg',
    release_date: '1984-03-11',
    title: '바람계곡의 나우시카',
    video: false,
    vote_average: 7.927,
    vote_count: 3179,
  },
  {
    adult: false,
    backdrop_path: '/gl0jzn4BupSbL2qMVeqrjKkF9Js.jpg',
    genre_ids: [12, 14, 16],
    id: 128,
    original_language: 'ja',
    original_title: 'もののけ姫',
    overview:
      '북쪽의 끝, 에미시족의 마을에 어느 날 갑자기 재앙신이 나타나 마을을 위협한다. 이에 강한 힘을 소유한 에미시족의 후계자인 아시타카는 결투 끝에 포악해진 재앙신을 쓰러트리지만 싸움 도중 오른팔에 저주의 상처를 받고 죽어야 할 운명에 처하게 된다. 결국 재앙신의 탄생 원인을 밝혀 자신의 저주를 없애기 위해 서쪽으로 길을 떠난 아시카타는 여행 중에 지코라는 미스테리한 수도승을 만나 재앙 신이 생겨나게 된 이유가 서쪽 끝에 있는 시시신의 숲과 관련이 깊다는 이야기를 듣게 되고 한시 바삐 서쪽으로 향한다.',
    popularity: 57.363,
    poster_path: '/kBlI1WEWbfYyrh5nuAH2whzWx9Y.jpg',
    release_date: '1997-07-12',
    title: '모노노케 히메',
    video: false,
    vote_average: 8.3,
    vote_count: 7244,
  },
  {
    adult: false,
    backdrop_path: '/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg',
    genre_ids: [16, 10751, 14],
    id: 129,
    original_language: 'ja',
    original_title: '千と千尋の神隠し',
    overview:
      '평범한 열 살 짜리 소녀 치히로 식구는 이사 가던 중 길을 잘못 들어 낡은 터널을 지나가게 된다. 터널 저편엔 폐허가 된 놀이공원이 있었고 그곳엔 이상한 기운이 흘렀다. 인기척 하나 없는 이 마을의 낯선 분위기에 불길한 기운을 느낀 치히로는 부모님에게 돌아가자고 조르지만 부모님은 호기심에 들떠 마을 곳곳을 돌아다니기 시작한다. 어느 음식점에 도착한 치히로의 부모님은 그 곳에 차려진 음식들을 보고 즐거워하며 허겁지겁 먹어대다가 돼지로 변해버린다. 겁에 질려 당황하는 치히로에게 낯선 소년 하쿠가 나타나 빨리 이곳을 나가라고 소리치는데...',
    popularity: 89.217,
    poster_path: '/5TJjXwERQGX9nUu21UaK9N4wECD.jpg',
    release_date: '2001-07-20',
    title: '센과 치히로의 행방불명',
    video: false,
    vote_average: 8.54,
    vote_count: 14941,
  },
  {
    adult: false,
    backdrop_path: '/fK40VGYIm7hmKrLJ26fgPQU0qRG.jpg',
    genre_ids: [16, 878, 28],
    id: 149,
    original_language: 'ja',
    original_title: 'AKIRA',
    overview:
      '알 수 없는 폭발로 도쿄가 폐허가 된 지 31년이 지난 2019년의 일본. 신도시 네오도쿄는 정치와 자본의 결탁으로 첨단의 경제적 풍요를 누리고 있지만 이면에서는 퇴폐, 약물, 폭력, 광신으로 몸살을 앓고 있으며 반정부 시위가 곳곳에서 일어나고 있다. 고아이자 직업학교 출신 폭주족인 카네다 패거리는 오토바이로 거리를 누비며 아슬아슬한 심야의 레이싱을 즐긴다. 그중 한명인 테츠오는 자신에게 통제할 수 없는 엄청난 힘이 내재해 있음을 알고는 세상에 복수하듯 그 힘을 남용하기 시작한다. 과학자들은 진화된 인간에 도달하기 위해 아이들을 대상으로 능력을 각성시킬 실험을 자행하고, 30년 전의 도쿄 폭발은 실험대상 중 아키라라는 미지의 아이와 연관되어 있는데...',
    popularity: 38.418,
    poster_path: '/a5zpBAMOlaScZC7b38Z2KVFr42V.jpg',
    release_date: '1988-07-16',
    title: '아키라',
    video: false,
    vote_average: 7.9,
    vote_count: 3733,
  },
  {
    adult: false,
    backdrop_path: '/jKGC5KoRza6IX5aKBnovBXH4Vey.jpg',
    genre_ids: [16, 10749],
    id: 196761,
    original_language: 'ja',
    original_title: 'ハル',
    overview:
      '그녀를 만나기 위해, 나는 인간이 되었습니다..!  2030년 근 미래 교토.  아름다운 소녀 ‘쿠루미’는 사랑했던 남자친구 ‘하루’를 불의의 사고로 잃고, 다락방에 틀어박힌 채 살아가고 있다. 그러던 어느 날, ‘하루’와 똑같이 닮은 안드로이드 로봇 ‘큐이치’가 ‘쿠루미’를 찾아오고, 마음의 문을 굳게 닫았던 ‘쿠루미’도 서서히 마음을 열기 시작한다. 하지만 행복한 날도 잠시, 새롭게 소중하고 아름다운 추억을 쌓아가던 두 사람 앞에 ‘하루’의 친구 ‘료’가 나타나고, 충격적인 사실을 알게되는데….',
    popularity: 10.349,
    poster_path: '/t2iMa0QM3f6CaXO2TaVQeh8wneS.jpg',
    release_date: '2013-06-08',
    title: '하루',
    video: false,
    vote_average: 6.681,
    vote_count: 91,
  },
  {
    adult: false,
    backdrop_path: '/gmPigAhU57VgrV0ucBOvQkRpoCG.jpg',
    genre_ids: [16, 878, 53],
    id: 823,
    original_language: 'ja',
    original_title: '人狼 JIN-ROH',
    overview:
      '제2차 세계대전 패전 후 일본, 초고속 경제성장을 이루며 극심한 빈부격차가 발생함과 동시에 무장 반정부세력 ‘섹트’의 세력이 더욱 커져가던 혼돈의 시기. ‘섹트’의 테러가 극렬해지자 이를 진압하기 위해 독자적인 권한과 군사력을 가진 수도권 치안 경찰기구 수도경 특기대를 창설한다. 그리고 비밀 첩보 암살팀 ‘인랑’에 대한 무성한 소문이 떠돌게 된다. 특기대 최정예요원 ‘후세 카즈키’는 임무 수행 중 ‘섹트’의 빨간 두건단(폭발물 운반하는 여자나 아이)을 맞닥뜨리지만, 제압하지 못하고 망설이던 찰나 소녀는 스스로 자폭한다. 그날의 트라우마와 죄책감으로 인해 찾아간 소녀의 납골당에서 그녀의 언니를 만나게 되는데… 운명을 거스르고, 사랑을 선택할 수 있겠는가?',
    popularity: 17.798,
    poster_path: '/vJmDFZnB4NxOjVJiJhBS2hPs1cl.jpg',
    release_date: '1999-11-17',
    title: '인랑',
    video: false,
    vote_average: 7.4,
    vote_count: 414,
  },
  {
    adult: false,
    backdrop_path: '/9npMbBg3W4l6NT0qjqBGALw8KT5.jpg',
    genre_ids: [16, 878],
    id: 918427,
    original_language: 'ja',
    original_title: '銀河英雄伝説 Die Neue These 激突 第⼀章',
    overview: '',
    popularity: 2.015,
    poster_path: '/uu0inpGyMY2VEucQTZZmupugvKJ.jpg',
    release_date: '2022-03-04',
    title: '은하영웅전설 Die Neue These 격돌 제1장',
    video: false,
    vote_average: 8.8,
    vote_count: 5,
  },
  {
    adult: false,
    backdrop_path: '/8xhgpYyNSX5sJi0P35hwL73QYOV.jpg',
    genre_ids: [16, 28, 12, 14, 878],
    id: 647,
    original_language: 'ja',
    original_title: 'Final Fantasy VII: Advent Children',
    overview:
      '라이프스트림의 무한한 생명 에너지를 바탕으로 세상을 지배하게 된 신라컴퍼니와 그에 맞선 솔져 세피로스 간의 전쟁으로 세상은 폐허가 되어버렸고, 사람들은 혼란을 극복하지 못하고 있었다. 그로부터 2년이 지난 지금에도 세상의 혼란은 더욱 심해져 가기만 하는데, 이 때 세피로스의 피를 이어받아 새로운 세상을 세우려는 무리가 나타나기 시작한다. 한때 신라컴퍼니에서 함께 몸을 담았던 솔져 카다쥬와 아쥬. 이들은 세피로스의 세포를 통해 새로운 몸으로 막강한 힘을 가짐으로써 신라와 맞서고, 세상의 모든 것을 없애고자 한다. 한편 이들과 같은 세포를 이어받았고 또 함께 솔져에 몸담았던 클라우드는 2년 전의 전쟁에서 자신이 지키지 못한 사람들에 대한 죄책감으로 자신의 우리 안에 자신을 가둔 채 주변의 친구들을 받아들이려 하지 않는다. 그러던 어느 날 카다쥬 무리가 세상의 재편을 위해 아이들을 끌어모으던 중 클라우드가 돌보던 덴젤에게까지 손을 내밀고...',
    popularity: 22.5,
    poster_path: '/h2UTjtK46Ax04YhDt2oWK6Q4YpB.jpg',
    release_date: '2005-07-14',
    title: '파이널 판타지 VII: 어드벤트 칠드런',
    video: false,
    vote_average: 7.129,
    vote_count: 1045,
  },
  {
    adult: false,
    backdrop_path: '/bpfkSkq4P4ZHpYSg3FWg6CT6Ebs.jpg',
    genre_ids: [16, 14],
    id: 1056894,
    original_language: 'ja',
    original_title: '女子高生と魔法のノート',
    overview: '',
    popularity: 0.884,
    poster_path: '/6DNn7OZqy6bP1Op7DWJ1npQGj.jpg',
    release_date: '2022-07-31',
    title: '女子高生と魔法のノート',
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: '/17s9ojb8j8QnBGCfqDUJraXLlFi.jpg',
    genre_ids: [16, 14, 27],
    id: 919,
    original_language: 'ja',
    original_title: 'Blood: The Last Vampire',
    overview:
      '베트남전 당시 요코다의 주일 미군기지에서 벌어지는 뱀파이어 사냥이야기를 그린다. 목숨을 건 혈투에서 상대방을 차례로 베어버린 주인공 소녀 사야. 초반부 달리는 지하철 위의 액션은 압도적이며, 할로윈 데이에 학교를 배경으로 유혈낭자한 결투가 벌어진다.',
    popularity: 13.416,
    poster_path: '/6LUmb63LSEqbPPcxjXyTbMFw3NG.jpg',
    release_date: '2000-11-18',
    title: '블러드: 더 라스트 뱀파이어',
    video: false,
    vote_average: 6.852,
    vote_count: 288,
  },
  {
    adult: false,
    backdrop_path: '/2doXQwy61pbXyeIz80DaPiUWPLN.jpg',
    genre_ids: [16, 14],
    id: 353932,
    original_language: 'en',
    original_title: 'Right Places その時、ぼくの居るべき場所',
    overview: '',
    popularity: 0.874,
    poster_path: '/9nznelIM83NgAJuOuEieOmlBLjj.jpg',
    release_date: '2013-10-25',
    title: 'Right Places その時、ぼくの居るべき場所',
    video: false,
    vote_average: 6,
    vote_count: 1,
  },
  {
    adult: false,
    backdrop_path: '/uHyg0pGMC6Ut0gJWfvVpPtKxHm9.jpg',
    genre_ids: [16, 18],
    id: 1056803,
    original_language: 'ja',
    original_title: '青春ブタ野郎はおでかけシスターの夢を見ない',
    overview:
      '고등학교 2학년 3학기를 맞이한 아즈사가와 사쿠타. 3학년 선배이자 연인인 사쿠라지마 마이와 미네가하라 고등학교에서 함께 지낼 수 있는 시간도 얼마 남지 않았다. 그러던 중 오랜 기간 집을 사랑했던 여동생 카에데는 누구에게도 밝힌 적 없는 속내를 사쿠타에게 털어놓는다. "나 오빠가 다니는 고등학교에 가고 싶어" 그것은 카에데의 큰 결의. 지극히 어려운 선택임을 알면서도 사쿠타는 상냥하게 카에데의 등을 밀어주기로 결정한다.',
    popularity: 5.868,
    poster_path: '/blGKfVulD8Na0JnOJeo9cKIoLcP.jpg',
    release_date: '2023-06-23',
    title: '청춘 돼지는 외출하는 여동생의 꿈을 꾸지 않는다',
    video: false,
    vote_average: 9.25,
    vote_count: 4,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [16, 12, 18, 28],
    id: 629188,
    original_language: 'ja',
    original_title: '花のあすか組！ 新歌舞伎町ストーリー',
    overview: '',
    popularity: 1.4,
    poster_path: '/n2oA4VvCzaTSjIE0ia7c6jzxGFO.jpg',
    release_date: '1987-06-12',
    title: '花のあすか組！ 新歌舞伎町ストーリー',
    video: false,
    vote_average: 5,
    vote_count: 2,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [18, 16, 12, 28],
    id: 629202,
    original_language: 'ja',
    original_title: '花のあすか組！２ ロンリーキャッツ・バトルロイヤル',
    overview: '',
    popularity: 1.4,
    poster_path: '/9gxbVEquaU7tdjp7tCzYduZ2rzL.jpg',
    release_date: '1990-03-23',
    title: '花のあすか組！２ ロンリーキャッツ・バトルロイヤル',
    video: false,
    vote_average: 8,
    vote_count: 1,
  },
];

const SimilarSection = ({ movieId }: Props) => {
  console.log(movieId);
  const similarMovies = SIMILAR_MOVIES;
  const props = {
    similarMovies,
  };
  return <SimilarSectionView {...props} />;
};

interface ViewProps {
  similarMovies: Movie[];
}

const SimilarSectionView = ({ similarMovies }: ViewProps) => {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: { xs: '0 10px', md: '0' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
          }}
        >
          <TheatersIcon />
          비슷한 영화
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            padding: '0 15px',
            paddingBottom: '15px',
            overflowX: 'scroll',
          }}
        >
          {similarMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
        <Box
          sx={{
            width: '20px',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            background:
              'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,7) 30% , rgba(0,0,0,0) 100%)',
          }}
        ></Box>
        <Box
          sx={{
            width: '20px',
            height: '100%',
            position: 'absolute',
            top: '0',
            right: '0',
            background:
              'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,7) 30% , rgba(0,0,0,0) 100%)',
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default SimilarSection;
