# 🎥 FILM - Fall In Love with Movie
![noname](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/bccd41af-dac3-44ed-9ab3-d3465baa1fac)

<h3 align="center">🎬 영화 별점 평가 및 코멘트 서비스 🎬</h3>
<h5 align="center">배포 링크: <a href="https://fall-in-love-with-movie.site">FILM - Fall In Love with Movie</a></h5>
<br/>

## ⚒️ Tech stack
|Language|User Interface|Client State<br>Management|Server State<br>Management|
|:---:|:---:|:---:|:---:|
|![typescript](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/c08c5cfd-51c2-4ba7-8e72-3d45a2c7463d)|![react](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/88482791-9a28-4a79-8a78-2e9a8e0788aa)&nbsp;&nbsp;&nbsp;&nbsp;![mui](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/bb9ed19b-d242-4363-a13e-64be34a9d312)|![redux](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/90e3c6c5-e7ae-4fbb-a87e-a0a60f8d50d0)|![react-query](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/f3ae2ebe-a4ce-4109-825e-de5006dd147e)|
|TypeScript|React + MUI|Redux Toolkit|React Query|

|Database|Deployment|Test|Build Tool|
|:---:|:---:|:---:|:---:|
|![firebase](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/8056df3a-380a-4b18-a45b-7c8a1403efd6)|![s3](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/b49c207d-431d-417f-952e-9faa3ba25ef8)&nbsp;&nbsp;&nbsp;&nbsp;![cloud-front](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/27e70884-9c1e-4805-b100-a227375549ba)|![vitest](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/9eb460f6-253a-4e33-98f7-1047b25c3d30)|![vite](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/b515fdc3-b21b-447a-973e-1f8dc30dffec)|
|Cloud Firestore|AWS S3 + CloudFront|Vitest|Vite|
<br/>

## 🏛️ Architecture
![Architecture](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/9c1c203e-5f5e-440c-96b0-f2ecb05e3ddd)

<br/>

## ✨ Features
### ✅ 로그인
|Google 로그인|Github 로그인|
|:---:|:---:|
|![signin-google](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/e845057b-b56b-4024-ba91-f9e93eda96ef)|![signin-github](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/aee8ba0c-cc6a-4039-bc5f-83c4ca11ef30)|

**Firebase Authentication**을 이용해 **Google**과 **Github** 계정으로 소셜 로그인을 할 수 있습니다.

로그인 성공 시 응답으로 받은 `User` 객체는 **Redux**로 관리됩니다. 

<br/>

### 🔎 검색
|검색|검색 결과 더 보기|
|:---:|:---:|
|![search](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/516b519e-e0b6-4731-a25b-d464dd882904)|![search-view-more](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/5814479c-1781-4dfc-8403-af8b930fe71f)|

**TMDB API**를 활용하여 사용자가 영화 제목을 통해 영화를 검색할 수 있는 기능을 제공합니다.

검색 결과 표시에는 **React Query**의 `useInfiniteQuery`를 사용하여 **더 보기** 기능을 구현했습니다.

한 번에 과도한 양의 데이터를 로드하는 것을 방지하고, 필요에 따라 점진적으로 데이터를 로드하는 것으로 성능을 최적화합니다.

<br/>

### ⭐ 별점 평가
|별점 등록|별점 등록 취소|
|:---:|:---:|
|![rating](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/fdc0f775-b747-4567-a2d6-aaa7f6e71f61)|![rating-cancel](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/1ec5e8f9-a7aa-4a57-a9cc-77f9962317da)|

로그인한 사용자는 영화에 별점 평가를 남길 수 있습니다.

사용자가 남긴 별점 평가는 **Cloud Firestore**에 저장됩니다.

저장된 별점 데이터의 분포를 **Chart.js**로 시각화하여 보여줍니다.

<br/>

### ✏️ 코멘트
|코멘트 작성|코멘트 수정 및 삭제|
|:---:|:---:|
|![comment-post](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/9db676b3-09cf-429b-9b26-08c5b66d93c4)|![comment-edit-delete](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/c7d5a73b-5a2b-4454-9df7-201b26be1026)|

로그인한 사용자는 영화에 코멘트를 남길 수 있습니다.

사용자가 남긴 코멘트는 **Cloud Firestore**에 저장됩니다.

|Like|정렬|
|:---:|:---:|
|![comments-like](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/29eef57f-2ecd-4b0d-9c59-59cbe44d7983)|![comments-sort](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/de86fcc1-1f4d-4664-89bb-1d53ba5176d6)|

다른 사용자들이 남긴 코멘트를 볼 수 있으며, 마음에 드는 코멘트에는 **Like**를 추가할 수 있습니다.

Like 기능에는 **Optimistic update** 기법을 적용해 즉각적인 UI 반응을 제공하여 사용자 경험을 향상시켰습니다.

<br/>

### 👤 마이 페이지
|내 활동|계정 삭제|
|:---:|:---:|
|![mypage-activities](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/0e274669-3ba5-4fea-9779-65a6394328aa)|![mypage-delete-account](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/f1c12ca6-c8dc-4918-a67a-8c8d7ce17826)|

**『내 별점 분포』, 『선호하는 장르』, 『평가한 영화』, 『내가 작성한 코멘트』** 섹션을 통해 사용자가 자신의 활동을 한눈에 확인할 수 있습니다.

**Firebase Authentication**에 등록된 계정을 삭제할 수 있습니다.

<br/>

### 💄 UI
|다크/라이트 모드|반응형 디자인|
|:---:|:---:|
|![dark-light-mode](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/cba19f4f-95e7-4806-b1e0-b832bec0a7ca)|![responsive](https://github.com/donghun-k/fall-in-love-with-movie/assets/60064471/584c8251-0f59-4604-8119-4025e2154ec1)|

**MUI**의 `theme`을 이용해 **『다크/라이트 모드』** 를 구현했습니다.

**Grid**와 **Flex**를 활용한 반응형 디자인으로 다양한 크기를 가진 디바이스에서 최적화된 레이아웃을 제공합니다.
