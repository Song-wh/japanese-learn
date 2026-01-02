# 📱 Google Play Store 배포 가이드

## 1단계: Google Play Console 가입

1. https://play.google.com/console 접속
2. **$25 결제** (일회성)
3. 개발자 계정 생성

## 2단계: 서명 키 생성

터미널에서 실행:

```bash
keytool -genkey -v -keystore japanese-learn.keystore -alias japanese-learn -keyalg RSA -keysize 2048 -validity 10000
```

**중요**: 입력한 비밀번호를 꼭 기억하세요!

## 3단계: GitHub Secrets 설정

GitHub 저장소 → Settings → Secrets and variables → Actions

다음 시크릿 추가:

| 시크릿 이름 | 값 |
|------------|-----|
| `KEYSTORE_BASE64` | `base64 -i japanese-learn.keystore` 결과 |
| `KEYSTORE_PASSWORD` | 키스토어 비밀번호 |
| `KEY_ALIAS` | `japanese-learn` |
| `KEY_PASSWORD` | 키 비밀번호 |

### Keystore를 Base64로 변환

```bash
# Mac/Linux
base64 -i japanese-learn.keystore

# Windows (Git Bash)
base64 japanese-learn.keystore
```

## 4단계: AAB 빌드

1. GitHub Actions → "Build Release AAB for Play Store" 실행
2. Artifacts에서 `release-aab` 다운로드

## 5단계: Play Store에 앱 등록

### 앱 만들기
1. Play Console → **앱 만들기**
2. 앱 이름: `일본어 학습`
3. 기본 언어: 한국어
4. 앱 또는 게임: 앱
5. 무료 또는 유료: 무료

### 앱 설정 (대시보드)
- **앱 액세스**: 특별한 액세스 없음
- **광고**: 광고 없음
- **콘텐츠 등급**: 설문 작성 (교육 앱)
- **타겟층**: 13세 이상
- **뉴스 앱**: 아니오
- **코로나19 앱**: 아니오

### 스토어 등록정보
- **앱 이름**: 일본어 학습 - 히라가나 가타카나 마스터
- **간단한 설명**: 매일 10분! 히라가나, 가타카나, 기초 단어를 재미있게 학습하세요.
- **자세한 설명**:
```
🇯🇵 일본어 학습을 시작하는 가장 쉬운 방법!

✨ 주요 기능:
• 히라가나 46자 + 탁음/반탁음/요음
• 가타카나 46자 + 탁음/반탁음/요음
• 기초 단어 500개+
• JLPT N5 필수 단어
• 기초 문법 패턴
• 일상 회화 (식당, 쇼핑, 길찾기)

🎮 재미있는 학습:
• 퀴즈 모드
• 듣기 퀴즈
• 플래시카드
• 매칭 게임
• 타임어택 60초 챌린지
• 손글씨 연습

🏆 성취 시스템:
• 일일 목표 설정
• 학습 스트릭
• 10종 배지 수집

📱 오프라인 지원으로 언제 어디서나 학습!
```

### 스크린샷 (필수)
- 휴대전화: 2장 이상 (1080x1920 이상)
- 태블릿 7인치: 선택사항
- 태블릿 10인치: 선택사항

### 앱 아이콘
- 512x512 PNG (`public/icons/icon-512x512.png` 사용)

## 6단계: 프로덕션 출시

1. **프로덕션** → **새 버전 만들기**
2. AAB 파일 업로드
3. 출시 노트 작성
4. **검토 시작**

## 심사 기간

- 첫 앱: 1-7일 (길면 2주)
- 업데이트: 1-3일

## 개인정보처리방침 (필수)

아래 파일을 GitHub Pages로 호스팅:

```
https://song-wh.github.io/japanese-learn/privacy-policy.html
```

---

## 🔄 자동 배포 설정 (선택)

매번 수동으로 올리지 않고 자동 배포하려면:

1. [Google Play Developer API 활성화](https://console.developers.google.com/)
2. 서비스 계정 생성
3. Play Console에서 서비스 계정에 권한 부여
4. GitHub Secret에 서비스 계정 JSON 추가
5. GitHub Actions에 자동 업로드 스텝 추가

도움이 필요하면 말씀하세요! 🚀


