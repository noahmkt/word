# 파인웨이브 홈페이지 수정 — 운영자 적용 가이드 (T9)

> 작성: 2026-07-18 · 대상: finewave.kr 운영자
> 반영 시간대: **평일 09:00–18:00**, 스테이징 없음 → **반영 전 전체 백업 필수**
> 산출물 검증: 전 스니펫은 1920×1080 헤드리스 브라우저에서 실제 페이지에 주입해 동작 확인 완료

## 0. 공통 사전 조건 (모든 반영 전)

1. **전체 백업**: 호스팅(가비아) 파일 + DB 백업, 또는 백업 플러그인으로 풀 백업 1회. 백업 완료 전에는 어떤 반영도 하지 않는다.
2. Elementor 편집은 페이지 173(메인 원페이지) 기준. 사이트는 원페이지 구조로, 2.45GHz/FINECOOL/FRCCS/FAQ는 모두 메인 페이지 내 섹션이다 (site-audit.md 참조).
3. CSS 삽입 위치는 통일해서 **Elementor → 사이트 설정(Site Settings) → 사용자 정의 CSS(Custom CSS)** 를 기본으로 한다. (Astra의 '추가 CSS'에 넣어도 동작하지만, 한 곳에서만 관리할 것 — 중복 삽입 금지)
4. 각 스니펫은 서로 독립적이다. 하나씩 넣고 확인 후 다음으로 진행.
5. **롤백 공통**: 삽입한 스니펫(CSS 블록/HTML 위젯)을 삭제하면 즉시 원복된다. 이미지 교체 롤백은 미디어 라이브러리에서 기존 이미지로 되돌리면 된다.

## 1. 산출물 ↔ 적용 위치 매핑 (전체 요약)

| # | 산출물 | 적용 위치 | 적용 시점(일정) |
|---|---|---|---|
| 1 | `site-audit.md` | (문서 — 적용 없음, 기준값 참조용) | 상시 |
| 2 | `wave-patterns/wave-a·b·c.(svg·png)` | 미디어 업로드 → `#technology` 섹션 배경 이미지 교체 | 7/22–23 (시안 컨펌 후) |
| 3 | `beam-blink/` (프레임 2장 + CSS + preview) | 미디어 업로드 + 사이트 설정 CSS + FINECOOL HTML 위젯 | 7/22–23 (시안 컨펌 후) |
| 4 | `snippets/frccs-anchor-fix.css` | 사이트 설정 → 사용자 정의 CSS | 7/20 |
| 5 | `snippets/floating-buttons.html` | 페이지 최하단 HTML 위젯 1개 | 7/20 |
| 6 | `snippets/hero-bg-motion.css` + `hero-layers/` | 사이트 설정 CSS + `#intro` 구조 변경(A안) 또는 오버레이(B안) | 7/22–23 |
| 7 | `snippets/no-contact-overlay.css` | 사이트 설정 → 사용자 정의 CSS | 7/21 |
| 8 | `snippets/fade-in-fallback.css` | 사이트 설정 CSS (+ 요소별 CSS 클래스 지정) | 7/20 |
| 9 | `equipment-photos/side-245ghz-upscaled-4k.(png·webp)` | 미디어 업로드 → `#technology` 장비 이미지 교체(확대 품질 개선) | 7/21 |

추가 제공 지원 자산 (지시서 외, AI 보정/추출 제작):
- `hero-layers/hero-equipment-cutout.png|webp` — PSD에서 추출한 정면 장비 누끼 (T6 A안용)
- `hero-layers/hero-bg-clean.webp` (2560×1440) / `hero-bg-clean-4k.webp` — 히어로에서 장비·텍스트를 제거한 배경 (T6 A안용, AI 보정 제작 → **클라이언트 시안 컨펌 필요**)
- `equipment-photos/` — 2.45GHz 측면 장비 사진 4K 업스케일(2032×4096, 투명배경 복원본)

---

## 2. 태스크별 적용 절차

### T4. FRCCS 앵커 잘림 픽스 — `snippets/frccs-anchor-fix.css`

- **원인(확정)**: sticky 헤더(높이 99px)가 앵커 이동 시 섹션 상단을 덮음. 검증: 주입 테스트에서 섹션 상단이 헤더 아래 115px에 정렬됨.
- **적용 전 조건**: 전체 백업 완료.
- **절차**
  1. WP 관리자 → Elementor 아무 페이지 편집 → 좌측 상단 햄버거 → **사이트 설정 → 사용자 정의 CSS**
  2. `frccs-anchor-fix.css` 내용 전체 붙여넣기 → **업데이트**
- **QA 체크**
  - [ ] 1920×1080 데스크톱에서 메뉴 FRCCS 클릭 → NO CONTACT/CONTACT 카드 상단 보더까지 완전 표시
  - [ ] 다른 메뉴(2.45GHz, FINECOOL, FAQ)도 제목이 헤더에 가리지 않는지
  - [ ] 모바일에서 앵커 이동 확인 (모바일 헤더 높이가 달라도 115px 오프셋이 과하지 않은지)
  - [ ] Chrome / Edge / Safari
  - [ ] 클라이언트 잘림 캡처 수신 시 동일 증상인지 재확인
- **주의**: 이후 투명 헤더/헤더 높이 변경 시 CSS 상단 `--fw-header-offset` 값을 "새 헤더 높이 + 16px"로 갱신.
- **롤백**: 해당 CSS 블록 삭제.

### T5. 플로팅 버튼(문의사항 + TOP) — `snippets/floating-buttons.html`

- **적용 전 조건**: ① 전체 백업 ② **기존 플로팅 요소 비활성화 준비** (아래 3단계) — 안 하면 버튼이 이중으로 보임.
- **절차**
  1. 파일을 열어 `{{INQUIRY_URL}}` 을 실제 문의 링크로 치환 (현행 동작 유지 = `#contact`)
  2. Elementor로 페이지 173 편집 → 페이지 맨 아래에 **HTML 위젯** 추가 → 치환한 파일 전체 붙여넣기
  3. 기존 요소 정리:
     - 기존 문의사항 플로팅 컨테이너(요소 ID `1e355fd`, 내부 `978b1ba`) **삭제 또는 숨김** (우클릭 → 삭제. 롤백 대비로 먼저 '레이아웃 복제 후 비활성' 방식도 가능)
     - Astra 기본 '상단 이동' 버튼 끄기: 외모 → 사용자 정의하기(Customizer) → **Scroll To Top** → 비활성화 (파란 사각형 버튼)
  4. 업데이트
- **QA 체크**
  - [ ] 데스크톱: 스크롤 300px 이후 TOP 버튼 페이드인, 클릭 시 부드럽게 최상단 이동, 최상단에서 다시 사라짐 (주입 테스트 검증 완료)
  - [ ] 문의사항 버튼 → 문의 폼 정상 이동
  - [ ] 모바일(≤768px): 우하단 축소 배치, 폼 입력 시 가리지 않는지
  - [ ] 이전 버튼/Astra 버튼이 더 이상 보이지 않는지
  - [ ] Chrome / Edge / Safari
- **롤백**: HTML 위젯 삭제 + 기존 요소 복원(Elementor 히스토리/백업).

### T2. 웨이브 배경 교체 — `wave-patterns/`

- **적용 전 조건**: 클라이언트 시안 컨펌(a/b/c 중 택1). 7/21 발송 → 7/22 반영.
- 시안: `wave-a-fineline`(현행 유사 파인라인) / `wave-b-loose`(성근 대곡률) / `wave-c-glow`(시안 글로우 믹스). 각 SVG 원본 + 2560×1440 PNG(≤500KB).
- **절차**
  1. 컨펌된 PNG를 미디어 라이브러리 업로드 (**SVG는 WP 기본 차단이므로 PNG 사용 권장**. SVG를 쓰려면 SVG 허용 플러그인 필요 — 권장하지 않음)
  2. 페이지 173 편집 → `#technology` 섹션(2.45GHz, 요소 `d3a73f9`) 선택 → 스타일 → 배경 이미지 `BG11-1.png` → 새 이미지로 교체 (위치 center center / 크기 cover / 반복 없음 그대로)
  3. 업데이트
- **QA 체크**
  - [ ] 1920×1080에서 라인 계단 현상/모아레 없는지 (교체 사유)
  - [ ] 레티나(맥/스마트폰)에서 선명도
  - [ ] 텍스트 가독성 (라인 불투명도 0.15–0.35 설계)
  - [ ] 모바일 크롭 상태
- **롤백**: 배경 이미지를 `BG11-1.png`로 되돌림.

### T3. 빔 깜빡임 — `beam-blink/`

- **적용 전 조건**: `preview.html`(로컬 브라우저에서 열면 바로 재생)로 클라이언트 시안 컨펌 완료.
- **절차**
  1. `beam-off.webp`, `beam-on.webp` 업로드 (고품질 원본 필요 시 png 사용, 동작 동일)
  2. 사이트 설정 → 사용자 정의 CSS에 `beam-blink.css` 내용 추가
  3. 페이지 173 → `#finecool` 섹션의 기존 핸드피스 이미지 위젯(HP_GG.png) 자리에 **HTML 위젯**으로 교체:
     ```html
     <figure class="fw-beam">
       <img src="[업로드경로]/beam-off.webp" alt="FINECOOL 핸드피스">
       <img class="fw-beam__on" src="[업로드경로]/beam-on.webp" alt="" aria-hidden="true">
     </figure>
     ```
     `[업로드경로]`는 업로드 후 미디어 라이브러리에서 URL 복사. (기존 이미지 위젯은 삭제하지 말고 비활성/보관 후 확인되면 정리)
  4. 업데이트
- **QA 체크**
  - [ ] 2.8초 주기로 은은히 점등/소등 (과한 점멸 아님)
  - [ ] 표시 크기가 기존(979×653)과 동일한지
  - [ ] OS '모션 줄이기' 설정 시 정지 화면 유지
  - [ ] 모바일 배치
- **롤백**: HTML 위젯 삭제 → 기존 이미지 위젯 복원, CSS 블록 삭제.

### T6. 히어로 배경 모션 — `snippets/hero-bg-motion.css` + `hero-layers/`

- **방식 선택 기준**
  - **A안(권장)**: 배경/장비 레이어 분리 적용. 필요한 두 레이어 모두 제공됨 — `hero-equipment-cutout.webp`(PSD 추출 누끼), `hero-bg-clean.webp`(장비·텍스트 제거 배경, **AI 보정 제작이므로 반드시 시안 컨펌 후 사용**). 장비 고정 + 배경만 26s 드리프트(xerf.kr 감성).
  - **B안(보조)**: 페이지 구조를 바꾸지 않고 현행 합성 이미지 위에 웨이브 오버레이(`wave-patterns` PNG 재사용)만 흐르게. A안 컨펌 전 임시 적용이나 간소화 필요 시.
- **적용 전 조건**: 전체 백업, (A안) 클라이언트가 히어로 배경/레이어 교체 시안 컨펌, 텍스트(로고·카피)를 Elementor 헤딩으로 다시 올릴지 결정.
- **절차(A안)**
  1. `hero-bg-clean.webp`, `hero-equipment-cutout.webp` 업로드
  2. 사이트 설정 CSS에 `hero-bg-motion.css` 내용 추가
  3. `#intro` 컨테이너 안의 기존 이미지 위젯을 비활성(보관)하고 HTML 위젯 추가:
     ```html
     <div class="fw-hero">
       <div class="fw-hero__bg"><img src="[업로드]/hero-bg-clean.webp" alt=""></div>
       <img class="fw-hero__device" src="[업로드]/hero-equipment-cutout.webp" alt="FINEWAVE 장비">
     </div>
     ```
     로고/카피 텍스트는 기존 히어로 이미지에 포함되어 있었으므로, 필요 시 헤딩 위젯으로 재구성(`fw-hero__copy` 참조)
  4. 업데이트
- **절차(B안)**: CSS만 추가 후 `#intro`에 HTML 위젯으로 오버레이 마크업 삽입(파일 내 주석 참조).
- **QA 체크**
  - [ ] 장비는 미동 없음, 배경만 천천히 표류(20–30s 주기)
  - [ ] 스크롤 성능(60fps, transform/opacity만 사용)
  - [ ] '모션 줄이기'에서 정지
  - [ ] 모바일 표시
- **롤백**: HTML 위젯 삭제 → 기존 이미지 위젯 복원, CSS 블록 삭제.

### T7. NO CONTACT 오버레이 — `snippets/no-contact-overlay.css`

- **절차**: 사이트 설정 → 사용자 정의 CSS에 파일 내용 추가. 기본 강도 60%(`--fw-nc-brightness: 0.6`).
- 클라이언트 톤 컨펌: 0.7(약) / 0.6(중) / 0.5(강) 세 값 중 택1로 변수만 수정.
- **QA 체크**
  - [ ] NO CONTACT 카드 이미지만 어두워지고 CONTACT 카드는 원본 유지
  - [ ] 'NO CONTACT' 텍스트·보더 가독성 유지
- **롤백**: CSS 블록 삭제.

### T8. 페이드인 — Elementor 기본 + `snippets/fade-in-fallback.css`

- **1순위(권장)**: Elementor 기본 모션 — 요소 선택 → **고급 → 모션 효과 → 진입 애니메이션 = Fade In Up**, 지속 Slow, 형제 요소 간 지연 150–200ms 스텝.
- **보조 CSS**: Elementor 모션이 부자연스러운 구간만. 사이트 설정 CSS에 파일 추가 후, 대상 요소 고급 → CSS 클래스에 `fw-fade`(+`fw-delay-1`~`5`) 지정.
  - ⚠️ CSS 전용(IntersectionObserver 없음)이라 **페이지 로드 시 1회** 재생 — 첫 화면(히어로) 요소에만 사용. 스크롤 진입 연출은 Elementor 기본 모션 사용.
- **QA**: '모션 줄이기'에서 즉시 표시되는지, 로드 순차감(0.15s 스텝).
- **롤백**: 클래스 제거 + CSS 블록 삭제.

### 폰트 통일 (운영자 직접 설정 — 스니펫 없음)

site-audit.md §1 기준값 적용:
1. 외모 → 사용자 정의하기 → 글로벌 → 타이포그래피: **기본(body)·메뉴 폰트를 Roboto**로 변경 (현재 시스템 폰트 스택 → 메뉴가 타 요소와 이질적)
2. Elementor 섹션 서브라벨(Belanosima) 16px/17px 혼용 → 17px 통일
3. FAQ 대제목 73px → 45px 계열 축소 검토(클라이언트 확인)

## 3. 최종 QA 체크리스트 (7/24)

- [ ] 1920×1080 데스크톱: FRCCS 앵커 재현 테스트(잘림 없음), 전 섹션 표시
- [ ] 모바일(가로 375/768): 플로팅 버튼, 히어로, 웨이브 배경
- [ ] Chrome / Edge / Safari 각 1회 전체 스크롤
- [ ] OS '모션 줄이기' 켠 상태에서 애니메이션 정지 확인
- [ ] Lighthouse 성능(이미지 총량: webp 산출물 기준 증가분 약 +650KB 수준)
- [ ] 문의 폼 제출 테스트 1회
- [ ] 완료 후 관리자 비밀번호 변경

## 4. 남은 의존 항목

- 클라이언트: 웨이브 3종 중 택1, 빔 시안 컨펌, NO CONTACT 강도(70/60/50) 컨펌, 히어로 A안(배경 AI 보정본) 컨펌
- 미수령: FRCCS 잘림 실캡처(수신 시 T4 재검증), 2.45GHz 고해상도 원본(수신 전까지는 `equipment-photos/` 업스케일본 사용)
