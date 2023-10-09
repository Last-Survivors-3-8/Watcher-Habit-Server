# Watcher Habit: 습관 공유 플랫폼 🌱

## 💁‍♀️ 소개

**Watcher Habit**은 개인의 습관을 효과적으로 관리하고, 소규모 그룹과 습관을 공유하는 플랫폼입니다. 사용자들이 서로의 습관을 공유하며, 서로를 지켜보면서 동기부여를 얻을 수 있습니다. 이를 통해 습관의 지속성을 높이고, 그룹 내의 동료들과 함께 성장하는 경험을 할 수 있습니다.

> 📹 **소개 영상**: (영상 링크 업데이트 예정)

<br>

## 👀 목차

- [💡 프로젝트 동기](#-프로젝트-동기)
  - [1. 개인의 기술적 흥미와 학습 의지](#1-개인의-기술적-흥미와-학습-의지)
  - [2. 습관 기록 아이디어](#2-습관-기록-아이디어)
  - [3. 웹 애플리케이션 Watcher Habit](#3-웹-애플리케이션-watcher-habit)
- [🚧 도전 및 문제 해결](#-도전-및-문제-해결)
  - [1. 클라이언트 상태 관리](#1-클라이언트-상태-관리)
    - [1) 클라이언트 상태 관리의 중요성과 필요성](#1-클라이언트-상태-관리의-중요성과-필요성)
    - [2) props drilling 문제와 상태 관리 툴의 선택](#2-props-drilling-문제와-상태-관리-툴의-선택)
    - [3) 상태 관리 최적화 적용](#3-상태-관리-최적화-적용)
      - [(a) React 내장 Hook: useState](#a-react-내장-hook-usestate)
      - [(b) 전역 상태 관리: Redux와 Redux Toolkit](#b-전역-상태-관리-redux와-redux-toolkit)
      - [(c) 서버 데이터 관리: react-query](#c-서버-데이터-관리-react-query)
    - [4) 상태 관리의 효과와 향상된 결과](#4-상태-관리의-효과와-향상된-결과)
  - [2. 습관 히스토리 저장을 위한 테이블 설계](#2-습관-히스토리-저장을-위한-테이블-설계)
    - [1) 데이터 보관의 필요성](#1-데이터-보관의-필요성)
    - [2) 습관 히스토리 테이블 설계의 고려사항](#2-습관-히스토리-테이블-설계의-고려사항)
    - [3) 초기 진행 방향과 문제점, 해결 방법](#3-초기-진행-방향과-문제점-해결-방법)
    - [4) 설계 결과](#4-설계-결과)
  - [3. 실시간 알림](#3-실시간-알림)
    - [1) 실시간 알림의 중요성과 필요성](#1-실시간-알림의-중요성과-필요성)
    - [2) 알림 전송 방법의 선택과 SSE의 도입](#2-알림-전송-방법의-선택과-sse의-도입)
    - [3) 실시간 알림 구현 상세](#3-실시간-알림-구현-상세)
    - [4) 실시간 알림 기능 구현 결과](#4-실시간-알림-기능-구현-결과)
    - [5) SSE의 한계와 웹소켓을 사용하지 않아서 생긴 아쉬운 점](#5-sse의-한계와-웹소켓을-사용하지-않아서-생긴-아쉬운-점)
- [📅 일정](#-일정)
- [🛠️ 기술 스택](#-기술-스택)
- [🗝 세팅 방법](#-세팅-방법)
- [👥 팀 멤버](#-팀-멤버)
- [🔗 Repository 주소](#-repository-link)
- [📌 기타 사항](#-기타-사항)

<br>

## 💡 프로젝트 동기

### 1. 개인의 기술적 흥미와 학습 의지

프로젝트 기획 단계에서 Last-Survivors 3/8 팀원은 서로 다른 기술적 흥미와 학습 목표를 가지고 있었습니다.

<details>
  <summary><b>지현</b></summary>

- 리액트 활용 및 상태 관리 툴 도입
- 반응형 웹 앱 구현
- 사용자 중심의 UI/UX 설계
- 초기 기획 단계에서의 방향성 명확화

</details>

<details>
  <summary><b>시환</b></summary>

- 실시간 서버 처리 경험
- 자바스크립트 중심의 서버 작업방식 깊은 탐구

</details>

<details>
  <summary><b>지은</b></summary>

- 신규 기술과 라이브러리 도입 경험
- 안정적인 기술 스택 활용 및 프로젝트 효율성 향상

</details>

<br>

### 2. 습관 기록 아이디어

시환님은 평소 노션으로 스스로의 습관 형성을 기록하고 있었는데, 혼자만의 기록은 동기 부여에 한계가 있었습니다. 이러한 문제점을 해결하기 위해 습관 기록을 서로 공유하고 확인할 수 있는 소규모 그룹을 형성하는 아이디어가 제시되었습니다. 이 아이디어는 그동안 공부해온 리액트로도 충분히 구현 가능하면서, 관리할 상태가 많을 것으로 예상되었기 때문에 상태 관리 툴의 필요성이 높다고 생각되었습니다. 또, 이전 프로젝트와는 다르게 서버와 클라이언트를 분리하여 작업하는 등 다양한 기술적 도전을 포함하고 있었습니다.

<br>

### 3. 웹 애플리케이션 'Watcher Habit'

모든 팀원의 기술적 흥미와 시환님의 습관 기록 아이디어가 합쳐져, 사용자들이 서로의 습관을 지켜보며 서로를 도와주는 웹 애플리케이션 'Watcher Habit'이 탄생하게 되었습니다. 사용자들에게 서로의 습관을 모니터링하며 동기를 부여하는 서비스입니다.

<br>

## 🚧 도전 및 문제 해결

3주 동안 개발을 진행하면서 겪었던 서버와 클라이언트에서 발생한 핵심적인 문제들을 정리해 보았습니다.

## 1. 클라이언트 상태 관리

### 1) 클라이언트 상태 관리의 중요성과 필요성

프론트엔드 개발 중 상태 관리의 중요성을 깨달았습니다. 여러 컴포넌트에서 상태를 공유하고, 서버 데이터와의 동기화 및 상태 업데이트가 필요했습니다. 특히, 알림을 조회하거나 습관 정보를 조회, 수정, 추가할 때마다 실시간으로 유저에게 보여주는 부분에서 상태 관리를 통해 코드를 간결하게 만들어야 했습니다.

### 2) props drilling 문제와 상태 관리 툴의 선택

컴포넌트 분리 과정에서 props drilling 현상이 발생했습니다. 이를 해결하고 상태를 효율적으로 관리하기 위해 다양한 상태 관리 툴을 조사하고 적용할 필요가 있었습니다.

### 3) 상태 관리 최적화 적용

#### (a) React 내장 Hook: useState

React 내장 Hook 중 `useState`는 비교적 간단한 로컬 상태 관리에 적합하므로, 로딩 상태, 모달의 열림 및 닫힘, 그룹 목록의 표시 여부와 같은 간단한 UI 상태를 관리하는 데 사용되었습니다.

#### (b) 전역 상태 관리: Redux와 Redux Toolkit

전역 상태 관리에는 Redux와 Redux Toolkit을 사용하여 습관 정보, 알림 정보 등의 전역 상태를 중앙에서 관리하였습니다. 이를 통해 습관이나 알림 정보가 변경될 때마다 실시간으로 상태를 업데이트하고 사용자에게 반영할 수 있게 되었습니다.

#### (c) 서버 데이터 관리: react-query

서버와의 데이터 동기화를 위해 `react-query`를 사용하였습니다. 특히, 좌측 사이드바 컴포넌트에서 그룹을 생성하면 생성된 그룹의 페이지로 이동되면서 동시에 그룹 리스트에 실시간으로 새로운 그룹의 이름이 나타나야 했습니다. 이를 위해 아래의 커스텀 훅을 구현하여 서버에서 최신의 사용자 데이터를 가져오도록 했습니다. 또한 `react-query`의 데이터 캐싱 기능을 활용하여 성능을 향상시켰습니다.

<details>
<summary>react-query를 적용한 커스텀 훅 예시</summary>
이 커스텀 훅에서는 react-query 라이브러리의 useQuery 훅을 사용하여 유저 조회 API를 통해 사용자 데이터를 요청합니다. 이 때, useQuery의 enabled 옵션을 사용하여 조건에 따라 데이터 요청을 활성화하거나 비활성화할 수 있으므로 유저 ID가 유효한 경우에만 사용자 데이터를 요청하도록 설계하였습니다. useQuery는 요청한 데이터를 자동으로 캐시하므로 같은 데이터에 대한 재요청 시 불필요한 서버 호출을 줄여줍니다. 추가로 그룹이 생성될 때마다 최신의 그룹 리스트를 다시 가져오기 위해서 좌측 사이드바와 가입한 그룹 리스트 컴포넌트에서 refetch를 사용하였습니다.
</details>

```jsx
import { useQuery } from 'react-query';
import userGetAPI from '../services/api/userGet';

export const useFetchUserData = (userId) => {
  const fetchUserData = async () => {
    const response = await userGetAPI(userId, 'group', true);

    return response.groups.map((group) => ({
      groupId: group._id,
      groupName: group.groupName,
    }));
  };

  const {
    data: groupList,
    refetch,
    isLoading,
  } = useQuery(['userData', userId], fetchUserData, {
    enabled: !!userId,
  });

  return { groupList, refetch, isLoading };
};
```

### 4) 상태 관리의 효과와 향상된 결과

Redux Toolkit과 react-query를 효과적으로 조합하여 사용하려고 노력했습니다. 그리고 커스텀 훅의 도입으로 컴포넌트 내의 로직과 상태 관리 로직을 명확하게 분리함으로써 프로젝트 내의 상태 관리 복잡성을 크게 줄였습니다. 이러한 접근은 코드의 가독성, 유지 보수성을 향상시켰습니다. 또한 실시간 상태 업데이트와 데이터 캐싱 기능을 통해 사용자에게 더욱 빠르면서도 부드러운 응답을 제공할 수 있게 되었으므로 사용자 경험을 향상시켰습니다.

<br>

## 2. 습관 히스토리 저장을 위한 테이블 설계

### 1) 데이터 보관의 필요성

습관 공유 플랫폼을 개발하면서 발견한 한가지 문제점은 현재 날짜에 해당하는 습관들만 유저에게 보여지게 되어 있어 이전에 행했던 습관 기록을 확인하기 어렵다는 것이었습니다. 유저가 꾸준히 해온 습관을 확인하기 위해서 이전 기록 저장은 저희 프로젝트에 반드시 필요한 기능이었습니다.

### 2) 습관 히스토리 테이블 설계의 고려사항

따라서 이미 진행한 습관 내역을 저장하는 테이블이 필요했습니다. 다만 다른 작업에 영향을 주면 안되었기에 배치를 통해 처리할 필요가 있었습니다. 그리고 습관의 히스토리 데이터는 계속해서 쌓이게 되므로 데이터 조회 시 응답 속도 최적화에도 주의를 기울여야 했습니다.

### 3) 초기 진행 방향과 문제점, 해결 방법

초기에는 조회의 용이함을 위해 하루에 한번 날짜별, 유저별로 한번에 데이터를 모아서 저장하는 방식을 생각했습니다.

| 문제점                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. 날짜를 기준으로 유저 별로 저장하면 조회 시 빠르고 간편하게 조회할 수 있다는 장점이 있지만 mongodb document의 제약상 15mb 이하로만 저장할 수 있었습니다. 계산해 보니 하루 유저 1명이 평균 5개의 습관을 한다는 가정 하에 대략 3천명분만 저장할 수 있었습니다. 이는 많은 유저가 사용해야하는 어플리케이션에 악영향을 주기에 데이터를 하나로 묶기는 어려웠습니다. |
| 2. 습관들을 저장하려고 할때 아직 끝나지 않은 습관이 있다면 이 습관을 기록해두기가 어려웠습니다. 서버 성능에 영향을 주지 않기 위해 새벽에 하려고 해도 새벽에 수행하는 습관이 있는 경우 배치 시간보다 뒤에 종료될 우려가 있었습니다.                                                                                                                               |

| 해결 방법                                                                               |
| --------------------------------------------------------------------------------------- |
| 각각의 습관마다 날짜와 유저 id를 컬럼으로 갖는 document로 저장하는 방식을 사용했습니다. |

```jsx
const mongoose = require('mongoose');
const HabitSchema = require('./Habit').schema;

const HabitHistorySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /^(\d{4})-(\d{2})-(\d{2})$/.test(v);
        },
        message: 'Invalid date format',
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
    },
    habitDetails: HabitSchema,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('HabitHistory', HabitHistorySchema);
```

### 4) 설계 결과

그 결과 유저가 이전에 행했던 습관의 결과를 보여주는 주간 습관 페이지에서 유저의 이전 기록을 가져올 수 있게 되었습니다. 그리고 mongodb의 document 용량 제한 초과 문제 해결. 어떤 시간에 배치를 수행해도 정상적으로 데이터를 저장할 수 있었습니다. 조회 시의 성능 문제는 인덱스로 쿼리 튜닝을 하여 보완하였습니다.

<br>

## 3. 실시간 알림

### 1) 실시간 알림의 중요성과 필요성

프로젝트의 핵심 기능 중 하나는 사용자가 어플리케이션 내에서 발생하는 다양한 이벤트들에 대해 실시간으로 알림을 받는 것이었습니다. 이를 통해 사용자는 새로운 그룹 초대, 습관 확인 요청, 알림 승인 요청 등의 이벤트를 즉각적으로 인지하고 반응할 수 있어야 했습니다.

### 2) 알림 전송 방법의 선택과 SSE의 도입

실시간 알림을 구현하기 위한 여러 방법 중, Server-Sent Events (SSE)를 선택한 이유는 다음과 같습니다:

- **간단한 구현**: SSE는 웹 표준 기술로서 구현이 간단하며, 추가적인 라이브러리나 프레임워크 없이도 웹 서버와 브라우저에서 지원됩니다.
- **자동 재연결**: 만약 네트워크 문제로 연결이 끊어졌을 때, SSE는 자동으로 재연결하는 기능을 내장하고 있어, 별도의 재연결 로직을 구현할 필요가 없었습니다.
- **단방향 통신으로 충분히 구현 가능하다고 판단**: 프로젝트에서 필요한 알림은 받기만 하면 서버에서 다른 작업을 해주지 않아도 되는 것으로 기획했기 때문에, 단방향 전송 방법인 SSE로 충분히 구현이 가능했습니다.

### 3) 실시간 알림 구현 상세

프로젝트에서는 `initEventSource` 함수를 사용하여 SSE 연결을 초기화하였고, 연결이 성공적으로 이루어지면 서버에서 클라이언트로 알림 데이터를 전송합니다. 이를 수신한 클라이언트는 알림 메시지를 화면에 표시하며, 일정 시간 후에는 자동으로 알림을 화면에서 제거합니다.

### 4) 실시간 알림 기능 구현 결과

SSE를 도입함으로써 사용자는 어플리케이션에서 발생하는 중요한 이벤트들을 실시간으로 확인할 수 있게 되었습니다. 이를 통해 사용자는 필요한 정보나 요청을 즉시 확인하고 처리할 수 있게 되어 사용자 경험의 향상을 이룰 수 있었습니다.

또한, 서버에서 클라이언트로의 실시간 통신 구현으로 인해 프로젝트의 동적인 상호작용이 확대되었습니다.

### 5) SSE의 한계와 웹소켓을 사용하지 않아서 생긴 아쉬운 점

우리 프로젝트에서는 SSE를 사용하여 실시간 알림 기능을 구현하였습니다. SSE에는 다양한 장점이 있지만, 동시에 웹소켓에 비해 몇 가지 한계점이 있습니다.

SSE의 한계

- **단방향** 통신: SSE는 서버에서 클라이언트로의 단방향 통신만 지원합니다. 이로 인해 클라이언트에서의 동작이 서버에 실시간으로 반영되기 어렵습니다. 예를 들면, 알림에서의 특정 액션을 서버에 즉각적으로 반영하는 것이 어렵습니다.

- **지속적 연결 유지**: 많은 사용자가 동시에 SSE 연결을 유지할 경우 서버에 부하가 증가하게 됩니다. 현재 연결된 유저 id를 모두 connection으로 모아놓고 있는데 이 크기가 커지면 서버 내에서 메모리를 계속해서 많이 차지할 수 있기 때문에 부하가 증가하는 요인이 됩니다.

웹소켓의 장점 및 프로젝트에서의 아쉬움

- **양방향 통신**: 웹소켓은 서버와 클라이언트 간의 양방향 통신을 지원합니다. 이로 인해 알림창의 실시간 갱신과 같은 기능을 더 효율적으로 구현할 수 있습니다.

- **알림창 실시간 갱신**: 프로젝트에서는 리액트 쿼리를 사용하여 10초마다 알림을 조회하는 방식을 채택하였습니다. 웹소켓을 사용했다면, 서버에서 신규 알림 발생 시 클라이언트에 즉시 전송하여 알림창을 실시간으로 갱신하는 것이 가능했을 것입니다.

- **효율성 및 네트워크 최적화**: 웹소켓은 데이터를 전송할 때 헤더가 불필요하여, 네트워크의 오버헤드가 적습니다. 따라서, 실제로 알림이 발생했을 때만 데이터를 전송하게 되어 네트워크 리소스를 보다 효율적으로 사용할 수 있습니다.

- **확장성**: 웹소켓은 다양한 실시간 기능에 대한 확장성이 높습니다. 프로젝트의 발전에 따라 다양한 실시간 상호작용 기능을 추가할 때, 웹소켓의 양방향 통신 능력을 활용하면 보다 효과적으로 구현할 수 있었을 것입니다.

결론적으로, SSE는 현재 저희 프로젝트에서 필요한 기능을 빠르고 간편하게 구현하는 데에는 충분하였습니다. 하지만 미래의 프로젝트 확장성을 고려한다면, 웹소켓은 많은 기능을 보다 효과적으로 구현할 수 있는 강력한 도구로 작용할 것 같습니다. 따라서, 다음 단계의 개발에서는 웹소켓의 도입 및 활용을 고려해볼 필요가 있다고 생각됩니다. 이를 통해 사용자 경험을 더욱 향상시키고, 프로젝트의 기술적 한계를 넓힐 수 있을 것으로 기대됩니다.

<br>

## 📅 일정

<details>
  <summary><b>1주차</b></summary>

- 아이디어 회의
- 기술 스택 조사 및 선정
- Git 작업 플로우 결정
- 협업 규칙 정립
- Mockup 제작 및 디자인 설계
- DB 스키마 설계
- API Docs 작업
- 개발 일정 칸반 보드 작성
- 개발 초기 세팅
</details>

<details>
  <summary><b>2주차 ~</b></summary>

- 프론트엔드 웹 사이트 구현
- 백엔드 서버 구현
- 리팩토링 및 버그 픽스
- 테스트 코드 작성
- 팀 프로젝트 발표
- 리드미 작성
- 배포

</details>

<br>

## 🛠️ 기술 스택

**프론트엔드**

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=React)
![React Router Dom](https://img.shields.io/badge/React%20Router%20Dom-6.15.0-CA4245?logo=react-router)
![React Query](https://img.shields.io/badge/React%20Query-3.39.3-brightgreen)
![Redux](https://img.shields.io/badge/Redux-8.1.2-764ABC?logo=Redux)
![JWT Decode](https://img.shields.io/badge/JWT%20Decode-3.1.2-000000?logo=JSON%20web%20tokens)
![AWS SDK](https://img.shields.io/badge/AWS%20SDK-3.410.0-orange?logo=Amazon%20AWS)
![Axios](https://img.shields.io/badge/Axios-1.5.0-blueviolet)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-38B2AC?logo=Tailwind%20CSS)
![ESLint](https://img.shields.io/badge/ESLint-9.0.0-4B32C3?logo=ESLint)
![Prettier](https://img.shields.io/badge/Prettier-3.0.3-F7B93E?logo=Prettier)

<br>

**백엔드**

![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=Node.js)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=Express)
![Express Validator](https://img.shields.io/badge/Express%20Validator-7.0.1-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5.0-47A248?logo=MongoDB)
![AWS SDK](https://img.shields.io/badge/AWS%20SDK-2.1458.0-orange?logo=Amazon%20AWS)
![Cron](https://img.shields.io/badge/Cron-2.4.3-111111)
![jsonwebtoken Server](<https://img.shields.io/badge/JSON%20Web%20Tokens%20(Server)-9.0.2-000000?logo=JSON%20web%20tokens>)
![Http Errors](https://img.shields.io/badge/Http%20Errors-1.6.3-red)
![ESLint](https://img.shields.io/badge/ESLint-8.49.0-4B32C3?logo=ESLint)
![Prettier](https://img.shields.io/badge/Prettier-3.0.3-F7B93E?logo=Prettier)

<br>

## 🗝 세팅 방법

시작하기 전에, 루트 디렉토리에 .env 파일을 만들고 아래와 같이 설정해주세요.

```env
# 클라이언트
REACT_APP_SERVER_DOMAIN=                 # 백엔드 API 서버 주소
REACT_APP_GOOGLE_CLIENT_ID=              # Google OAuth 2.0 인증을 위한 값
REACT_APP_AWS_ACCESS_KEY_ID=             # AWS 서비스에 프로그래밍 방식으로 액세스하기 위한 값
REACT_APP_AWS_SECRET_ACCESS_KEY=         # AWS 서비스에 프로그래밍 방식으로 액세스하기 위한 값
REACT_APP_REDIRECT_URI=                  # OAuth 인증 과정 중 사용자를 리다이렉트시킬 URI

# 서버
MONGODB_URI=                             # MongoDB 데이터베이스 연결을 위한 URI
ACCESS_TOKEN_SECRET=                     # JWT 생성 및 검증을 위한 비밀 키
REFRESH_TOKEN_SECRET=                    # JWT 생성 및 검증을 위한 비밀 키
CLIENT_DOMAIN=                           # 프론트엔드 클라이언트의 도메인 주소나 IP 주소
AWS_ACCESS_KEY_ID=                       # AWS 서비스에 프로그래밍 방식으로 액세스하기 위한 값
AWS_SECRET_ACCESS_KEY=                   # AWS 서비스에 프로그래밍 방식으로 액세스하기 위한 값
```

<br>

## 👥 팀 멤버

문의 사항이 있으시다면, 아래의 이메일로 연락주세요.

- 조시환: [acforcompany@gmail.com](mailto:acforcompany@gmail.com)
- 손지은: [wkaqh24@gmail.com](mailto:wkaqh24@gmail.com)
- 우지현: [xhrrl003@gmail.com](mailto:xhrrl003@gmail.com)

<br>

## 🔗 Repository Link

- [Watcher-Habit 클라이언트 Repository](https://github.com/Last-Survivors-3-8/Watcher-Habit-Client)
- [Watcher-Habit 서버 Repository](https://github.com/Last-Survivors-3-8/Watcher-Habit-Server)

<br>

## 📌 기타 사항

- **라이센스**

  이 프로젝트는 [MIT 라이센스](LICENSE)를 따릅니다. 더 자세한 내용은 LICENSE 파일을 참고해주세요.
