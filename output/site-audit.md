# finewave.kr 사이트 감사 리포트 (T1)

- 감사 일시: 2026-07-18 (읽기 전용 — GET 요청만 사용)
- 측정 환경: 헤드리스 Chromium, 뷰포트 **1920×1080** (FRCCS 잘림 보고 해상도와 동일)
- 기술 스택 확인: WordPress + Astra 4.13.4 + Elementor 4.1.2 + Sticky Header Effects for Elementor 2.2.0(로드됨) + WPForms Lite 1.10.1.1
- **구조 핵심**: 사이트는 **원페이지**(page id 173)이다. 메뉴의 2.45GHz/FINECOOL™/FRCCS/FAQ는 별도 페이지가 아니라 **메인 페이지 내 앵커 섹션**(`#technology`, `#finecool`, `#frccs`, `#faq`)이다. 별도 서브 페이지 없음(사이트맵 404).

## 섹션 맵 (1920×1080 실측)

| 앵커 id | Elementor 요소 | 문서상 top(px) | 높이(px) | 배경 |
|---|---|---|---|---|
| `#intro` | `.elementor-element-0ee10bb` | 99 | 1080 | 히어로 합성 이미지 |
| `#technology` (2.45GHz) | `.elementor-element-d3a73f9` | 1,179 | 903 | `BG11-1.png` (웨이브) |
| `#finecool` | `.elementor-element-d23a8e8` | 2,082 | 1,081 | 그라디언트(284deg, `#1e293b`→`#000`) |
| `#frccs` | `.elementor-element-c4a8ebf` | 3,398 | **380** | `#040D19` |
| `#faq` | `.elementor-element-8654c47` | 3,778 | 754 | `#111111` |
| `#contact` | `.elementor-element-40bb2d8` | 4,552 | 896 | `#000000` |

> ⚠️ 마크업 이슈: `id="faq"`가 3개 요소(섹션·헤딩·아코디언), `id="contact"`가 3개 요소(섹션·폼·플로팅 컨테이너)에 중복 선언되어 있다. 브라우저는 문서상 첫 번째 요소(섹션)로 이동하므로 앵커 동작은 되지만, 유효하지 않은 HTML이며 추후 스크립트 타겟팅 시 오동작 소지가 있다. (수정은 운영자 판단)

## 1. 폰트 기준 (전 페이지 통일 기준값)

**Elementor 전역 Kit(post-127)**: primary/text `Roboto`, secondary `Roboto Slab`(미사용 추정), accent `Roboto`. 전역 색: 텍스트 `#FFFFFF`, 악센트 `#53EFFF`.

메인 페이지(=전체 사이트) 실측 폰트 체계 — **통일 기준값**:

| 용도 | font-family | size / weight | 비고 |
|---|---|---|---|
| 섹션 대제목 (2.45GHz / FINECOOL™ / FRCCS) | Roboto | **45px / 300** | 기준 |
| 섹션 영문 서브라벨 (- MICROWAVE TECHNOLOGY 등) | **Belanosima** | 16~17px / 300 | ⚠️ technology만 16px, finecool·frccs는 17px → **17px로 통일 권장** |
| 본문 리드 문단 | Roboto | 18px / 300 | 기준 |
| 특장점 카드 라벨 (적은 통증 등) | Roboto | 16px / 300, 색 `#81F0FF` | 기준 |
| FRCCS 카드 제목 (NO CONTACT / CONTACT) | Roboto | 20px / 400 | 기준 |
| FAQ 대제목 | Roboto | **73px / 400** | ⚠️ 다른 섹션 제목(45px)과 큰 격차 → 45px 계열로 축소 검토 |
| FAQ 아코디언 타이틀 | Roboto | 23px / 400 | 기준 |
| FAQ 답변/푸터 텍스트 | Roboto | 20px / 400 | 기준 |
| **GNB 메뉴** | ⚠️ **시스템 폰트 스택**(-apple-system, …) | 16px / 400 | **Roboto 미적용** — Astra 기본값. 통일 대상 1순위 |
| body 기본값(Astra) | 시스템 폰트 스택 | 16px / 400 / lh 1.65 | Elementor 위젯 외 영역에 적용됨 |

**통일 방법(운영자)**: Elementor 사이트 설정 → 전역 폰트는 이미 Roboto. 불일치는 (1) Astra 쪽 body/메뉴 폰트(외모→사용자 정의하기→글로벌→타이포그래피)를 Roboto로 지정, (2) Belanosima 서브라벨 16→17px 통일, (3) FAQ 73px 조정. 상세는 `apply-guide.md` 참조.

## 2. 고정 헤더

| 항목 | 값 |
|---|---|
| 컨테이너 | `header.site-header` (Astra 빌더 헤더) |
| **동작 방식** | `position: sticky; top: 0; z-index: 9999` — 스크롤 내내 상단 고정 |
| **높이** | **99px** (1920×1080 실측, 스크롤 후에도 99px 유지 — 축소 효과 없음) |
| 배경 | `.main-header-bar` `#111111`, border-bottom 1px |
| 로고 | `cropped-finewave_logo_White-scaled-2-200x67.png` (표시 200×67) |
| Sticky Header Effects 플러그인 | CSS/JS 로드는 되나 Astra 네이티브 헤더에는 효과 미적용 상태(투명 헤더 미설정). 투명 헤더 작업 시 Elementor 헤더 템플릿 필요 여부 확인 요망 |

→ **T4 오프셋 근거: 헤더 99px + 여유 16px = `scroll-margin-top: 115px`**

## 3. FRCCS 앵커 — 잘림 원인 확정

- 메뉴 'FRCCS' → 같은 페이지 앵커 `#frccs` = `.elementor-element-c4a8ebf` (별도 페이지 아님)
- 1920×1080에서 `#frccs` 점프 실측: 섹션 상단이 뷰포트 y=0에 정렬됨(scrollY 3,398) → **sticky 헤더(99px)가 섹션 상단 99px를 가림**
- 섹션 높이 380px(카드 350px) 중 99px가 가려져 카드 이미지 상단이 절단됨 — **보고된 증상과 정확히 일치, 스크린샷으로 재현 완료**
- 결론: 100vh 문제 아님. **1차 가설(고정 헤더 오프셋 미반영) 확정** → `scroll-margin-top` 픽스 유효 (T4)

## 4. 빔 이미지 (FINECOOL 핸드피스)

| 항목 | 값 |
|---|---|
| URL | `https://finewave.kr/wp-content/uploads/2026/06/HP_GG.png` |
| 원본 해상도 | **1536×1024 (RGBA, 투명배경)** — 흰색 핸드피스 + 오렌지 빔 글로우 + 시안 팁 |
| 페이지 표시 크기 | 979×653 (1920 뷰포트) |
| 감싸는 요소 | `#finecool` 내 이미지 위젯 — 셀렉터 `#finecool img[src*="HP_GG"]` (클래스 `e-image-base`) |
| 비고 | 투명배경 PNG라 프레임 겹치기(크로스페이드)에 최적. srcset 없음(단일 소스) |

## 5. 히어로 구조

- `#intro`(0ee10bb) 안의 **단일 이미지 위젯**(`.elementor-element-aa31174`) — `01-4-scaled.png` **2560×1440 단일 합성 이미지**(장비+로고+웨이브 배경 일체). 배경/장비 분리 레이어 아님.
- 원본 `01-4.png`(scaled 전) 존재 추정, srcset 300/768/1024/1536/2048/2560w.
- **PSD 확인 결과(클라이언트 드라이브 `화인웨이브 장비사진.psd`, 2500×5040 RGBA)**: 그룹 `F`(정면, 표시됨)/`R`(우측)/`L`(좌측) 3개 뷰의 **장비 누끼(투명배경) 레이어가 이미 분리되어 있음** → **T6 방식 A(배경/장비 2-레이어) 적용 가능**. 본 작업에서 F 뷰 누끼 PNG와 장비 제거 배경 이미지를 산출물로 제공(output/hero-layers/).

## 6. 우측 플로팅 버튼 (현행 '문의사항')

| 항목 | 값 |
|---|---|
| 컨테이너 | `.elementor-element-1e355fd` (fixed, top 600px, z-index 999, radius 10px 0 10px 0) > `.elementor-element-978b1ba` (fixed, top 716px — 데스크톱에서 우측 가장자리에 표시) |
| 구성 | ① 반투명 흰색 라운드 카드(`square.png` 100×90, rgba(255,255,255,0.2~0.3)) ② comment-dots SVG 아이콘 **흰색 30px**(`.elementor-element-ff3a166`) ③ '문의사항' 라벨 Roboto 16px `#FFFFFF` |
| 링크 | `#contact` (스무스 스크롤) |
| 실측 위치 | 아이콘 우측 가장자리 x≈1864, y≈731 (뷰포트) |
| ⚠️ 비고 1 | 음수 마진(-69px 등)과 fixed 중첩 컨테이너로 구현되어 취약 — T5는 독립 HTML 위젯으로 대체 |
| ⚠️ 비고 2 | **Astra 기본 'scroll to top' 버튼(파란색)이 이미 존재** (스크롤 후 우하단 노출). T5 적용 시 톤 불일치·중복 방지를 위해 Astra 기본 버튼 비활성화 필요(외모→사용자 정의하기→상단 이동 버튼 off) |

→ T5 톤 매칭 기준: 반투명 화이트 카드(rgba(255,255,255,0.2), radius 10px) + 흰 아이콘/라벨 16px. (지시서의 '다크 카드' 표현과 달리 실제 현행은 반투명 화이트 카드임 — T5는 현행 톤을 따름)

## 7. 배경 웨이브 이미지 (교체 대상)

| 항목 | 값 |
|---|---|
| URL | `https://finewave.kr/wp-content/uploads/2026/06/BG11-1.png` |
| 적용 위치 | `#technology`(d3a73f9) CSS background, `center center / cover, no-repeat` |
| 해상도 | **1920×1080** (783KB PNG) |
| 톤 | 베이스 다크 네이비 `#05090F` ~ `#10161E` (모서리 `#080D13`/`#060A10`), 라인 색 ≈ `#3A4252` (저채도 스틸블루) |
| 깨짐 원인 분석 | 섹션이 1920 폭 × 903px에 cover로 확대되며, 1px 두께 파인라인이 리샘플링 과정에서 계단 현상·모아레 발생. 레티나(DPR 2) 화면에서는 1920px 원본이 2배 확대되어 열화 가중 |
| 교체 방침 (T2) | 라인 불투명도 0.15–0.35의 벡터(SVG) 원본 + 3840px급 PNG 내보내기로 재제작 → wave-patterns/ 3종 |

## 8. NO CONTACT 카드

- FRCCS 섹션(`#frccs` = c4a8ebf) 내 좌측 카드: **`.elementor-element-008bdc5`** (350px, border 1px `#A6F6FF`, box-shadow 1px 1px `#00D8FF`, padding 30px)
- 내부: 카드 이미지 `KakaoTalk_20260507_092109594_08.png`(1500×1000) + 제목 컨테이너 `.elementor-element-c496060` > `h2.e-00acb97-f59a837` "NO CONTACT" (20px/400)
- 우측 대비 카드(CONTACT): `.elementor-element-5853348` + `KakaoTalk_..._07.png`
- → T7 오버레이 타겟 셀렉터: `.elementor-element-008bdc5` (또는 이미지에만 적용 시 `.elementor-element-008bdc5 img`)

## 부록 — 주요 색상 팔레트 (실측)

| 용도 | 값 |
|---|---|
| 다크 네이비 베이스 | `#040D19` (FRCCS 섹션), `#05090F`~`#10161E` (웨이브 BG) |
| 헤더/FAQ 배경 | `#111111` |
| 시안 악센트 | `#53EFFF` (전역), `#81F0FF` (특장점 라벨), `#A6F6FF` (카드 보더), `#00D8FF` (카드 섀도) |
| 그라디언트 | 284deg `#1e293b` → `#000000` (FINECOOL) |
| 웨이브 라인(현행) | `#3A4252` |
