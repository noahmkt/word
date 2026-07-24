# 파인웨이브 — 기기별(PC/태블릿/모바일) 최적화 반영 가이드

> 대상: finewave.kr 운영자 · WordPress + Elementor 환경
> 에셋: `output/wp-assets/` (pc / tablet / mobile / common 폴더, 총 3.5MB)
> 반영 전 **전체 백업 필수**, 평일 09–18시 반영 원칙 동일

---

## 0. 기본 개념 (꼭 읽고 시작)

- Elementor의 기본 브레이크포인트: **데스크톱 > 1024px / 태블릿 768~1024px / 모바일 ≤ 767px**
  (확인·변경: Elementor 편집기 → 좌상단 햄버거 → 사이트 설정 → **레이아웃 → 브레이크포인트**)
- 편집기에서 기기별 설정 방법: 하단 가운데 **반응형 모드 아이콘**(모니터 모양) 클릭 → 상단에 데스크톱/태블릿/모바일 전환 탭이 생김. 이 상태에서 바꾼 값은 **그 기기에만 적용**됩니다.
- 설정 항목 옆에 **모니터 아이콘**이 보이면 그 항목은 기기별로 다른 값을 줄 수 있다는 뜻입니다(클릭해서 기기 전환).
- WordPress는 WebP를 지원합니다(5.8+). 업로드는 미디어 라이브러리에 그대로 하면 됩니다.

## 1. 에셋 ↔ 적용 위치 매핑

| 파일 (wp-assets/) | 용도 | 적용 위치 |
|---|---|---|
| pc/bg-wave-2560x1440.webp | 배경 (데스크톱) | 히어로·2.45GHz 섹션 배경 |
| tablet/bg-wave-1600x1200.webp | 배경 (태블릿) | 〃 |
| mobile/bg-wave-1080x1920.webp | 배경 (모바일 · 세로형 크롭) | 〃 |
| pc·tablet·mobile/device-quarter-*.webp | 반측면 장비 | 2.45GHz 섹션 이미지 |
| pc·tablet·mobile/device-side-*.webp | 측면 장비 (예비) | 필요 시 |
| pc·tablet·mobile/device-front-cutout-*.webp | 정면 누끼 | 히어로(T6 A안) |
| pc·tablet·mobile/beam-off·on-*.webp | 빔 깜빡임 프레임 | FINECOOL HTML 위젯 |
| pc/product-360-960.mp4·webm | 360° 영상 (PC/태블릿) | 360° HTML 위젯 |
| mobile/product-360-640.mp4 | 360° 영상 (모바일 경량) | 〃 |
| common/product-360-poster.webp | 영상 포스터 | 〃 |
| common/logo-finewave-1575w.webp | 로고 원본(무손실) | 히어로 로고 |
| common/logo-finewave-600w.webp | 헤더 로고 | 상단바 |
| common/logo-finemec-ci.webp | FineMEC CI | 푸터 |

전부 미디어 라이브러리에 업로드한 뒤, 업로드된 각 파일의 URL을 복사해 사용하세요.

## 2. 섹션 배경 — 기기별 다른 이미지 지정 (가장 중요)

Elementor는 **배경 이미지를 기기별로 따로** 지정할 수 있습니다.

1. 페이지 편집 → 해당 섹션(히어로 / 2.45GHz) 선택 → **스타일 → 배경**
2. '이미지' 항목 옆 **모니터 아이콘** 클릭 → 데스크톱 상태에서 `pc/bg-wave-2560x1440.webp` 선택
3. 아이콘으로 **태블릿** 전환 → `tablet/bg-wave-1600x1200.webp` 선택
4. **모바일** 전환 → `mobile/bg-wave-1080x1920.webp` 선택 (세로 화면에 맞게 크롭된 버전)
5. 위치 `center center` / 크기 `cover` / 반복 없음 — 세 기기 모두 동일하게
6. 업데이트 → 실제 휴대폰·태블릿에서 확인

> 모바일용은 세로(9:16) 크롭본이라, 데스크톱 이미지를 그대로 쓸 때 생기는 "라인이 확대되어 뭉개지는" 문제가 없습니다.

## 3. 이미지 위젯(장비 사진) — 두 가지 방법

**방법 A (권장 · 간단)**: `pc/device-quarter-1200w.webp` **하나만** 업로드해서 이미지 위젯에 넣습니다. WordPress가 자동으로 축소본(srcset)을 만들어 모바일에는 작은 파일을 내려보냅니다. 위젯의 **너비/정렬만 기기별로** 조정하세요:
- 이미지 위젯 선택 → 스타일 → 너비 옆 모니터 아이콘 → 데스크톱 100% / 태블릿 70% / 모바일 90% 식으로

**방법 B (기기별 완전히 다른 이미지가 필요할 때)**: 위젯을 3개 만들고 각각 pc/tablet/mobile 파일을 넣은 뒤, **고급 → 반응형 → 표시 설정**에서
- PC용 위젯: '태블릿에서 숨기기' + '모바일에서 숨기기' 켬
- 태블릿용 위젯: 데스크톱·모바일에서 숨기기 … (같은 방식)

> 주의: 방법 B는 숨겨진 이미지도 로드될 수 있어 성능상 방법 A가 우선입니다.

## 4. 빔 깜빡임 프레임 — 쌍 유지 주의

off/on 두 프레임은 **반드시 같은 픽셀 크기 쌍**으로 써야 겹침이 어긋나지 않습니다.
- 기본: `pc/beam-off-1536w.webp` + `pc/beam-on-1536w.webp` 만 사용해도 srcset으로 충분합니다.
- 굳이 기기별로 바꾸려면 방법 B(위젯 3벌)로 하되, 한 벌 안에서 off/on 폭을 섞지 마세요(1536+768 조합 금지).

## 5. 360° 영상 — 모바일 경량본 자동 선택

HTML 위젯의 비디오 마크업을 아래처럼 교체하면 모바일(≤767px)에서 640px 경량본을 로드합니다:

```html
<video id="fwTurn" muted playsinline preload="metadata"
       poster="[URL]/product-360-poster.webp" style="width:100%;height:auto">
</video>
<script>
(function(){
  var v = document.getElementById('fwTurn');
  var mobile = window.matchMedia('(max-width: 767px)').matches;
  var s = document.createElement('source');
  s.src = mobile ? '[URL]/product-360-640.mp4' : '[URL]/product-360-960.mp4';
  s.type = 'video/mp4';
  v.appendChild(s); v.load();
})();
</script>
```
`[URL]`은 미디어 라이브러리 업로드 후 URL로 치환. 등장 시 1회 재생 로직은 기존 `snippets/product-360-entrance.html` 그대로 사용 가능합니다(그 파일의 `<video>` 부분만 위 코드로 대체).

## 6. 타이포그래피 — 기기별 권장값

각 헤딩/텍스트 위젯 → 스타일 → 타이포그래피 → 크기 옆 **모니터 아이콘**으로 기기 전환 후 입력:

| 요소 | PC | 태블릿 | 모바일 |
|---|---|---|---|
| 섹션 대제목 | 45~52px | 38px | 30px |
| 고객 관점 태그라인 | 24px | 20px | 18px |
| 리드 문장 | 20~21px | 18px | 16px |
| 본문/서브리드 | 17px | 16px | 15px |
| GNB 메뉴 | 16px | 14px | (모바일 메뉴 기본) |
| 상단 로고 높이 | 55px | 44px | 36px |

## 7. 커스텀 CSS — 기기별 오버라이드 예시

사이트 설정 → 사용자 정의 CSS에 추가하는 기존 `fw-` 스니펫들은 이미 `@media (max-width: 768px)` 대응이 들어 있습니다. 추가 조정이 필요하면 아래 패턴으로:

```css
/* 태블릿 (768~1024px) */
@media (max-width: 1024px) and (min-width: 768px) {
  .fw-float { right: 16px; }
}
/* 모바일 (≤767px) */
@media (max-width: 767px) {
  .fw-hero__device { max-height: 60vh; }
}
```

## 8. 반영 순서 요약

1. 전체 백업
2. `wp-assets/` 전 파일 미디어 라이브러리 업로드 (폴더 구분은 파일명에 있으니 한꺼번에 올려도 됨)
3. 섹션 배경 기기별 지정 (§2) → 히어로, 2.45GHz
4. 장비 이미지 교체 (§3 방법 A) → 반측면 컷
5. 로고 교체: 헤더(외모→사용자 정의하기→헤더 로고, 600w 파일, 높이 55px 지정은 Elementor/추가 CSS `.custom-logo{height:55px;width:auto}`) / 푸터 FineMEC CI + 링크(https://finemecglobal.net/)
6. 빔/360 영상 스니펫 반영 (§4, §5)
7. 타이포 기기별 값 입력 (§6)

## 9. 기기별 QA 체크리스트

- [ ] **PC(1920×1080)**: 배경 라인 선명(깨짐 없음), FRCCS 앵커, 히어로 텍스트 가독성
- [ ] **태블릿(768·1024 세로/가로)**: 배경 크롭 어색하지 않은지, 메뉴 겹침 없는지, 장비 사진 크기
- [ ] **모바일(375·390·414)**: 세로형 배경 적용 확인, 플로팅 버튼이 폼 가리지 않는지, 영상 640본 로드(개발자도구 Network에서 product-360-640 확인), 로딩 속도
- [ ] 크롬 개발자도구(F12 → 기기 툴바)로 1차 확인 후, **실제 휴대폰·태블릿에서 최종 확인** (에뮬레이터와 실기기는 다를 수 있음)
- [ ] Lighthouse 모바일 성능 측정 (이미지 total이 크게 줄었는지)

## 10. 성능 팁

- WP는 2560px 초과 이미지를 자동으로 `-scaled`로 줄입니다 — 이 팩은 전부 2560 이하라 원본 그대로 저장됩니다.
- Elementor 이미지에는 기본 lazy-load가 적용됩니다. 히어로 배경만은 즉시 로드되도록 두세요(첫 화면).
- 영상은 `preload="metadata"` 유지 — 스크롤 전에 전체를 받지 않게 합니다.
