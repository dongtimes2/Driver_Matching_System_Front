# 프로젝트명

drinder

# 기획 의도

실제 유저의 위치를 기반으로 대리기사 호출 서비스를 제공하고자 하였습니다.

# 서비스 사용 방법

1. 로그인 수행  
   사이트 접속화면은 아래와 같습니다. '로그인 하기' 버튼을 눌러 google 로그인을 수행합니다.

   <img width="271" alt="로그인" src="https://github.com/dongtimes2/Driver_Matching_System_Front/assets/98700888/be8e7a9e-8149-49d7-8c5a-cb247799035f">

2. 회원유형 선택  
   최초로 가입하는 계정인 경우, 사진과 같이 회원유형을 선택할 수 있습니다.  
   회원은 기사회원과 승객회원으로 구분되며, 한 번 선택하면 유형을 변경할 수 없습니다.  
   유형을 선택하였다면 '가입하기' 버튼을 눌러주세요.

   <img width="271" alt="회원유형선택" src="https://github.com/dongtimes2/Driver_Matching_System_Front/assets/98700888/b9e1e484-0162-4094-b5a7-0afae5aa0e17">

3. 서비스 이용

   - 기사회원인 경우  
      아래와 같이 유저의 현재 위치가 지도 위에 아이콘으로 표시됩니다.  
      승객회원이 호출을 요청한 경우 다음과 같이 화면에 표시되며, 클릭을 통해 호출을 선택할 수 있습니다.  
      호출을 선택한 경우 하단의 버튼은 '요청 선택하기'로 전환됩니다.
     '요청 선택하기' 버튼을 클릭한 경우, 지도에는 매칭된 승객회원과 현재 유저의 위치만 표시됩니다.  
     만약 매칭이 이루어진 이후에도 승객회원은 호출을 취소할 수 있으며, 이때 승객회원의 위치를 나타내는 핀은 사라지게 됩니다.

     <img width="271" alt="기사" src="https://github.com/dongtimes2/Driver_Matching_System_Front/assets/98700888/91966b51-23c0-40b7-898e-430a05ce18a0">

   - 승객회원인 경우  
      아래와 같이 호출위치를 선택할 수 있는 핀이 지도 위에 아이콘으로 표시됩니다.  
      지도를 클릭하면, 클릭한 위치로 핀이 이동하며, 기사회원을 부를 위치를 핀을 통해 지정하면 됩니다.  
      원하는 위치로 핀을 이동시킨 뒤, 하단의 '호출하기' 버튼을 누르면 핀의 색상이 전환됨과 동시에 하단의 버튼이 '호출취소'로 전환되어, 호출이 진행되었음을 확인할 수 있습니다.  
      기사회원은 유저의 호출을 확인할 수 있으며, 매칭이 진행될 때까지 대기하면 됩니다.  
      중간에 호출을 취소하고 싶은 경우, 하단의 '호출취소' 버튼을 누르면 호출이 취소됩니다.  
      기사회원이 호출요청을 수락하여 매칭이 이루어진 경우, 지도에는 기사회원의 실시간 현재위치와 핀이 함께 표시됩니다.  
      매칭이 이루어진 이후에도 언제든지 호출을 취소할 수 있습니다.

     <img width="271" alt="승객" src="https://github.com/dongtimes2/Driver_Matching_System_Front/assets/98700888/f4a0828e-cc3b-4694-af82-dd7ac43f3bfb">

4. 로그아웃  
   상단 헤더 우측의 로그아웃 아이콘을 클릭하면 로그아웃 됩니다.

   <img width="271" alt="승객" src="https://github.com/dongtimes2/Driver_Matching_System_Front/assets/98700888/c8bf54b8-8beb-45e0-99ad-244f3e65db76">

# 사용한 기술

## Frontend

- typescript
- React
- styled-components
- socket.io-client
- firebase
- webpack 직접 설정 (cra 사용하지 않음)
- recoil

## Backend

- typescript
- express
- mongodb
- jwt (access token, refresh token을 이용한 로그인 로직 채택)
- firebase-admin
- socket.io

# 환경변수

## Frontend

### Google Firebase API Key

firebase에서 직접 발급

- API_KEY
- AUTH_DOMAIN
- PROJECT_ID
- STORAGE_BUCKET
- MESSAGING_SENDER_ID
- APP_ID

### Kakao API Key

Kakao developers에서 직접 발급

- JAVASCRIPT_KEY

### Backend Server URL

- SERVER_URL

## Backend

### Google Firebase API Key

firebase admin에서 직접 발급
(JSON을 string으로 형변환하여 삽입해야 됨)

- SERVICE_SECRET_KEY

### URL 정보

- MONGO_DB_URL
- FRONT_URL

### PORT 번호 정보

- PORT

### Token Secret Key

보안성이 높은 임의의 문자열을 삽입

- TOKEN_SECRET_KEY
