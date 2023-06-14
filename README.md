# 싸커 퀵 : Soccer quick

이미지

### 페르소나

<hr>

이미지

### 프로젝트 주제

<hr>

- 목적: 다분화된 풋살 매칭 플랫폼에서 주관하는 경기들을 한 곳에 모아 위치, 시간, 가격 등을 비교할 수 있는 플랫폼 구축 `<br>`
- 목표:
  - 사용자 경험 향상을 위해 메인페이지를 단순한 구성
  - 소셜 로그인 기능 및 채팅 기능을 제공
  - 위치 기반 경기장 검색을 지도에 나타냄으로 편리성을 제공
  - 각 플랫폼 및 경기장에 관한 리뷰 기능
  - 크롤링을 통해 수집한 대량의 데이터를 가공하여 사용자에게 양질의 정보 제공

### ////////////////////////

### 서비스 소개(기능 명세서)

#### 공통 기능

- [x] (민우) 상단 바 아래 카테고리에서 페이지 간 이동이 가능(하위 페이지에도 일괄 적용)

#### 메인 페이지 관련 기능

[경기장 리스트]

- [x] (성경) 메인 페이지에서 지역명을 검색하여 경기장 페이지에서 해당 지역의 구장 목록을 확인할 수 있음.
- [x] (민우) 전체보기 클릭 시 경기장 페이지로 이동
- [x] (민우) 특정 지역 경기 모아보기 클릭 시 해당 지역 필터가 적용된 채 경기장 페이지로 이동

[리뷰 리스트]

- [x] (민우) 전체보기 클릭 시 리뷰 페이지로 이동

#### 회원가입/사용자 관련 기능

[로그인 페이지 (modal)]

- [x] (승섭) 사용자의 회원가입한 아이디와 비밀번호를 통해 로그인 가능
- [x] (승섭) 사용자의 로그인, 비밀번호가 일치하지 않으면 로그인 되지 않음
- [x] (승섭) 사용자가 로그인을 하면 로그인 정보 및 토큰이 저장됨
- [x] (승섭) 로그인 후에는 로그아웃이 활성화됨.
- [x] (승섭) 마이페이지를 통하여 정보 수정, 내글 검색, 즐겨찾는 경기장으로 이동 가능
- [x] (승섭) 로그인한 사용자는 회원탈퇴 가능

[회원가입 페이지 (modal)]

- [x] (승섭) 아이디, 비밀번호, 이름, 닉네임, 이메일, 핸드폰 번호, 성별을 기입과 약관 체크 후에 회원가입이 진행됨.
- [x] (승섭) 아이디, 이메일, 닉네임은 중복 검사가 가능
- [x] (승섭) 이름은 2글자 이상, 비밀번호 8~16자리+영소문자1개이상+숫자1개이상, 닉네임 2글자 이상, 이메일은 이메일 형식, 전화번호는 시작이 010인지 유효성 검사를 진행

[마이 페이지]

- [x] (승섭) 사용자는 로그인한 상태에서만 마이페이지를 이용 가능.
- [x] (승섭) 사용자는 비밀번호를 입력해야만 정보 수정 페이지로 이동
- [x] (승섭) 사용자는 자신의 사용자 정보를 조회가능
- [x] (승섭) 사용자는 프로필 이미지, 이메일, 닉네임, 전화번호를 수정 가능
- [x] (승섭) 사용자는 새 비밀번호로 변경 가능
- [x] (승섭) 변경되는 이메일, 닉네임, 전화번호, 비밀번호는 회원가입과 동일한 유효성 검사를 진행
- [x] (승섭) 사용자는 자신이 작성한 글 (팀 모집글/리뷰)를 조회할 수 있음
- [x] (승섭) 마이페이지에서 자신의 작성 글 클릭 시 해당 글의 상세 페이지로 이동
- [x] (승섭) 사용자는 자신이 즐겨찾기한 경기장을 조회 가능
- [x] (승섭) 즐겨찾기 목록을 클릭 할 시 경기장 상세 페이지로 이동
- [x] (승섭) 마이페이지의 글 목록은 페이지네이션이 적용되어 제공됨

#### 경기장 관련 기능

[경기장 검색결과 페이지]

- [x] (도원) 메인/헤더 페이지에서 입력한 키워드로 검색한 결과를 출력한다.
- [ ] (도원) 검색결과 페이지에서 추가로 좌측 바의 필터링 옵션을 클릭하여 필터링 조건에 맞는 결과를 출력한다.
- [x] (성경) 경기장 목록에서 체크박스를 클릭하여 장바구니에 상품을 담듯이 구장 비교 목록에 추가/삭제 할 수 있음
- [x] (성경) 체크한 구장이 있을 경우 화면 하단에 모달이 표시되어 비교 목록을 확인 할 수 있음.
- [x] (성경) 비교 목록 모달 내에서에서 비교할 구장을 선택/전체 삭제 할 수 있음.
- [x] (성경) 비교 목록 모달에서 구장 비교 버튼을 클릭하여 최종 선택한 구장에 대한 비교 정보를 확인할 수 있음

[경기장 상세정보 페이지]

- [x] (성경) 구장 이미지, 구장명, 위치 등 각종 정보 확인 가능
- [x] (성경) 구장 정보 출처(ex. 플랩) 으로 이동 가능
- [x] (성경) 세부 경기장 목록이 제공되며 돋보기를 클릭하여 특정 경기장의 더 많은 이미지들을 확인할 수 있음
- [x] (성경) 주소 복사 버튼을 클릭하여 복사할 수 있음
- [ ] (성경) 찜 버튼을 클릭하여 구장 찜하기를 할 수 있음(찜한 구장은 마이페이지에서 확인 가능)
- [x] (민우) 각 경기장에 해당하는 리뷰 모두 조회 가능
- [x] (민우) 로그인 한 유저에 한해 리뷰 작성, 수정, 삭제 가능
- [x] (민우) 리뷰 본문에 placeholder로 리뷰 게시판 유의사항 고지
- [x] (민우) 본문 내용에 빈 칸이 존재 할 경우 작성 완료 불가
- [x] (민우) 로그인 한 유저에 한해 각 리뷰 댓글 좋아요/취소 가능

[추가기능]

- [ ] (민우) 각 리뷰를 좋아요 순/최신 순으로 정렬 가능

#### 관리자 관련 기능

- [x] (도원) 등록된 전체 유저의 목록과 상세정보를 조회할 수 있다(비밀번호 제외)
- [ ] (도원) 등록된 유저정보를 삭제할 수 있다
- [x] (도원) 등록된 유저의 로그인을 정지시킬 수 있다
- [x] (도원) 등록된 유저의 글쓰기 권한을 정지시킬 수 있다
- [x] (도원) admin 계정은 등록된 유저의 권한을 manager로 변경할 수 있다

#### 리뷰 페이지 관련 기능

- [x] (민우) 배너 이미지를 carousel으로 제공
- [ ] (민우) 리뷰 리스트를 지역별, 구장별 필터를 적용하여 조회 가능
- [x] (민우) 지역 혹은 구장 관련 키워드로 리뷰 검색 가능
- [ ] (민우) 각 리뷰 게시글의 내용을 클릭하면 해당 경기장 상세 페이지로 이동/조회 가능
- [x] (민우) 페이지 최 상단으로 이동 가능

[추가기능]

- [ ] (민우) 우수 리뷰 등에 대해 추천을 할 수 있고, 추천수가 높은 글을 월간 hot글? 등으로 상단에 노출시킴.
- [ ] (민우) 리뷰 댓글에 이미지 첨부 가능

#### 팀 페이지 관련 기능

[공통사항]

- [x] (도원) 팀페이지로 이동 시 카테고리(팀원 구해요/팀 구해요)를 선택하여 해당 게시판으로 이동할 수 있다

[조회]

- [x] (도원) 각 게시판에서는 원하는 조건별로 필터를 적용하여 조건에 맞는 글만 조회할 수 있다.
- [x] (도원) 각 게시글의 제목(title)을 클릭하여 상세정보를 조회할 수 있다.

[팀원 모집 게시판]

- [x] (도원) 팀원 모집 게시판에서는 새 모집글을 작성할 수 있다
- [x] (도원) 새 글 작성 시 모집글 작성 카테고리를 선택하면 적절한 입력 양식이 자동으로 제시된다
- [x] (도원) 모집글 작성 시 HTML태그를 활용하여 글을 작성할 수 있다.
- [x] (도원) 입력 정보가 부정확하거나 부족할 경우 글이 작성되지 않는다
- [x] (도원) 글 작성자는 상세정보 페이지에서 모집글 내용 수정을 할 수 있다.
- [x] (도원) 글을 수정할 수 있다. (글 작성자만 가능, 권한이 없는 경우 버튼이 보이지 않음.)
- [x] (도원) 글을 삭제할 수 있다. (글 작성자 혹은 관리자만 가능, 권한이 없는 경우 버튼이 보이지 않음.)
- [x] (도원) 로그인한 회원은 작성된 팀원 모집글 상세 페이지에서 팀 가입 신청을 할 수 있다.
- [x] (도원) 자신이 작성한 글에는 가입신청을 할 수 없다.
- [x] (도원) 모집글 작성자는 팀 가입신청자 목록을 확인할 수 있다.
- [x] (도원) 모집글 작성자는 신청자를 수락하거나 거절할 수 있다.
- [x] (도원) 모집글 작성자는 수락된 인원 목록을 확인할 수 있다.(현재는 콘솔로 확인가능. 데이터 형식 고민중)

~~[개인 홍보 게시판] - API없음. 삭제 고려중.~~

- [x] ~~(도원) 개인 홍보 게시판에서는 별도의 신청/수락 기능 없이 게시글 작성 및 댓글 작성이 가능하다.~~
- [x] ~~(도원) 개인 홍보 카테고리를 선택하면 적절한 입력 양식이 자동으로 제시된다.~~
- [x] ~~(도원) 회원은 작성된 개인 홍보글에 댓글을 달 수 있다. (작성자명, 팀 모집글 주소, 메모를 제출할 수 있다.)~~

---

### API 명세서

#### 유저

#### 커뮤니티

#### 경기장

#### 팀게시판

#### 관리자

---

### 팀 구성

|  이름  |   파트    | 담당 업무      |
| :----: | :-------: | -------------- |
| 최도원 | Front-End | 👑팀장, 🔊발표 |
| 김승섭 | Front-End | ?              |
| 권성경 | Front-End | ?              |
| 이민우 | Front-End | ?              |
| 안동현 | Back-End  | ?              |
| 신성민 | Back-End  | ?              |

---

### 기술 스택

##### FrontEnd

- React.js
- TypeScript
- Styled Component
  ...

##### BackEnd

- Node.js + Express
  ...

##### Deploy

- GCP VM (pm2)

##### Collaboration Tools

- Figma
- Discord
- Gather

---

### .env 설정

---

### Git Branch 관리

##### FrontEnd branch

```
master
├── dev
│   ├── feature
│   │   ├── feature_dw
│   │   ├── feature_ss
│   │   ├── feature_sk
│___│___└── feature_mw
```

##### BackEnd branch

---

### 팀 컨벤션

##### [Commit 컨벤션](https://velog.io/@shin6403/Git-git-%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)

`태그 : 제목`의 형태이며, `:뒤에만 space`가 있음에 유의

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서(README.md) 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor : 코드 리펙토링
- delete : 기능/코드 삭제
- test : 테스트 코드, 리펙토링 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정

##### 코드 컨벤션

- 파일명, export 함수명: PascalCase
- 주석:
  - 함수의 기능과 특징 설명 / 함수 위
  - 함수 내 코드 설명 / 코드 오른쪽

##### Copyright

...
