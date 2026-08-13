# 6주차 뽀모도로 챌린지

공부한 시간을 과목별로 기록하는 뽀모도로 앱. Flask 백엔드 + React(Vite) 프론트엔드.

노마드코더 AI 기초 6주차 과제. 진행 기록은 `docs/`의 회차별 HTML 문서에 있다 (git에는 올리지 않음).

---

## 폴더 구조

```
6week/
├── backend/
│   ├── main.py            # Flask 앱 (라우트 전부 여기)
│   ├── requirements.txt
│   └── venv/              # gitignore
├── frontend/
│   ├── src/
│   │   ├── main.jsx       # 라우터 표 (BrowserRouter > Routes > Route)
│   │   ├── components/
│   │   │   └── Layout.jsx # 공통 메뉴 + <Outlet />
│   │   └── pages/
│   │       ├── Timer.jsx      # 과목 목록·추가·삭제
│   │       ├── History.jsx    # 껍데기
│   │       └── Dashboard.jsx  # 껍데기
│   ├── vite.config.js
│   └── package.json
├── docs/                  # 회차별 학습 로그 (gitignore)
└── CLAUDE.md              # 튜터 모드 규칙
```

---

## 요구 버전

이 프로젝트가 실제로 돌아가고 있는 환경.

| | 버전 |
| --- | --- |
| macOS | 26.5.2 (arm64) |
| Python | 3.10.4 |
| pip | 22.0.4 |
| Node | 26.4.0 |
| npm | 11.17.0 |

### 백엔드 패키지

`backend/requirements.txt` 참고. 직접 설치한 건 둘뿐이고 나머지는 의존성이다.

| 패키지 | 버전 |
| --- | --- |
| Flask | 3.1.3 |
| flask-cors | 6.0.5 |

### 프론트엔드 패키지

| 패키지 | 버전 |
| --- | --- |
| react / react-dom | 19.2.8 |
| react-router-dom | 7.18.2 |
| vite | 8.2.0 |
| @vitejs/plugin-react | 6.0.4 |
| eslint | 10.8.0 |

---

## 실행

터미널 두 개가 필요하다. 백엔드와 프론트엔드를 동시에 띄워야 한다.

### 백엔드 (터미널 1)

```bash
cd backend
source venv/bin/activate      # 프롬프트 앞에 (venv) 가 붙으면 성공
pip install -r requirements.txt   # 처음 한 번만
python main.py
```

→ `http://127.0.0.1:5001`

### 프론트엔드 (터미널 2)

```bash
cd frontend
npm install                   # 처음 한 번만
npm run dev
```

→ `http://localhost:5173`

브라우저에서 열어야 하는 건 **5173** 쪽이다. 5001은 API 서버라 직접 열 일이 없다.

---

## 포트

| 포트 | 무엇 | 비고 |
| --- | --- | --- |
| 5001 | Flask API | **5000이 아니다.** macOS의 AirPlay Receiver가 5000을 점유하고 있어서 옮겼다 |
| 5173 | Vite 개발 서버 | Vite 기본값 |

`main.py` 마지막 줄의 `app.run(debug=True, port=5001)`에서 바꿀 수 있다. 바꾸면 `Timer.jsx`의 URL 세 곳도 같이 고쳐야 한다.

---

## 알아둘 것

### 데이터는 메모리에만 있다

`main.py`의 전역 리스트 `SUBJECTS_LIST`가 전부다. **Flask를 재시작하면 초기값 두 개(Work, Reading)로 돌아간다.** 추가·삭제한 게 사라져도 버그가 아니다.

4단계쯤 SQLite로 바꿀 예정이다 — streak와 주간 통계를 하려면 결국 영속성이 필요하다.

### CORS

`main.py`에서 `http://localhost:5173`만 허용하고 있다.

```python
CORS(app, origins=["http://localhost:5173"])
```

프론트 주소가 바뀌면 (포트 변경, 배포) 여기에 추가해야 한다. 안 하면 브라우저가 요청을 차단하고, 콘솔에 `blocked by CORS policy`가 뜬다.

### API 주소가 하드코딩돼 있다

`Timer.jsx` 안에 `http://127.0.0.1:5001`이 세 번 나온다. 배포하면 전부 바꿔야 하므로 그전에 환경변수로 뺄 것.

### Vite를 쓴다 (CRA 아님)

과제 명세는 CRA(`create-react-app`)지만 Node 26에서 `react-scripts` 5.0.1이 돌지 않아 Vite로 갔다. 실무에서도 CRA는 이미 지원이 끝났다.

차이가 배포 때 드러난다:

| | CRA | Vite |
| --- | --- | --- |
| 빌드 결과 폴더 | `build` | `dist` |
| 배포 명령 | `gh-pages -d build` | `gh-pages -d dist` |

GitHub Pages는 저장소 이름이 경로에 붙으므로 `vite.config.js`에 `base` 설정도 필요하다. 아직 안 했다.

---

## API

| Method | Endpoint | 동작 |
| --- | --- | --- |
| `GET` | `/subjects` | 과목 전체 조회 |
| `POST` | `/subjects` | 과목 추가 (body: `{"name": "..."}`) |
| `DELETE` | `/subjects/<int:id>` | 과목 삭제 |

`<int:id>`라서 숫자가 아닌 값(`/subjects/2s`)은 404다.

---

## 진행 상황

- [x] 0단계 — 폴더 구조, Flask/React 각각 띄우기
- [x] 1단계 — subjects CRUD 백엔드 → 프론트 연결
- [x] 2단계 — 라우팅, 화면 3개로 분리
- [ ] 3단계 — 타이머 (카운트다운)
- [ ] 4단계 — 세션 저장 + History
- [ ] 5단계 — Dashboard + Recharts
- [ ] 6단계 — 배포 (GitHub Pages + Railway)
