// ko strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ko
export default {
  "welcome": {
    "title": "뉴스레터에 오신 것을 환영합니다",
    "invitedBy": "{configuratorId}님이 구독에 초대했습니다."
  },
  "email": {
    "title": "각 호를 어디로 보내 드릴까요?",
    "placeholder": "이메일 주소"
  },
  "name": {
    "title": "이름이 무엇인가요?",
    "placeholder": "성함"
  },
  "language": {
    "title": "어떤 언어로 읽고 싶으신가요?"
  },
  "subscribed": {
    "title": "구독되었습니다",
    "subtitle": "받은편지함에서 확인 이메일을 확인하세요.",
    "continueTo": "다음으로 계속",
    "finishingUp": "이 페이지를 닫으셔도 됩니다."
  },
  "form": {
    "heading": "{title} 구독하기",
    "headingFallback": "이 뉴스레터 구독하기",
    "intro": "새 호가 선택한 언어로 작성되어 이메일로 도착합니다.",
    "from": "보낸 사람: {sender}",
    "emailLabel": "이메일 주소",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "이름",
    "optional": "선택 사항",
    "nameHint": "인사할 때 사용합니다. 비워 두면 이메일 주소의 앞부분을 사용합니다.",
    "languageLabel": "호를 받을 언어",
    "languageSummary": "{language}로 받습니다.",
    "languageChange": "변경",
    "languageHint": "브라우저 설정을 바탕으로 골랐습니다.",
    "submit": "구독하기",
    "submitting": "구독하는 중...",
    "consent": "구독하면 {sender}의 이메일을 받는 데 동의하게 됩니다. 모든 이메일에는 구독 취소 링크가 있습니다.",
    "privacy": "개인정보 처리방침",
    "loadingInfo": "뉴스레터 정보를 불러오는 중"
  },
  "success": {
    "title": "받은편지함을 확인하세요",
    "body": "{email}(으)로 확인 이메일을 보냈습니다. 이메일을 열고 구독 확인을 선택하세요.",
    "next": "확인하면 {language}로 작성된 첫 호가 도착합니다.",
    "spam": "몇 분 안에 아무것도 오지 않으면 스팸함이나 프로모션 폴더를 확인하세요.",
    "changeEmail": "다른 이메일 사용",
    "continueTo": "{host}(으)로 계속"
  },
  "errors": {
    "emailRequired": "이메일 주소를 입력하세요.",
    "emailInvalid": "이메일 주소가 완전하지 않은 것 같습니다. 확인하고 다시 시도해 주세요.",
    "missingLink": "이 가입 링크에 정보가 빠져 있습니다. 보낸 사람에게 새 링크를 요청하세요.",
    "notFound": "이 가입 링크는 더 이상 작동하지 않습니다. 보낸 사람에게 새 링크를 요청하세요.",
    "limit": "이 뉴스레터는 지금 새 구독자를 받을 수 없습니다. 나중에 다시 시도해 주세요.",
    "invalid": "이 주소를 받을 수 없습니다. 확인하고 다시 시도해 주세요.",
    "server": "구독을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    "network": "서버에 연결하지 못했습니다. 연결 상태를 확인하고 다시 시도해 주세요."
  },
  "confirm": {
    "title": "구독을 확인해 주세요",
    "body": "버튼을 선택하면 {email}(으)로 호를 받기 시작합니다.",
    "button": "구독 확인",
    "confirming": "확인하는 중...",
    "consent": "확인하면 이 뉴스레터를 이메일로 받는 데 동의하게 됩니다. 어느 호에서든 구독을 취소할 수 있습니다.",
    "successTitle": "구독되었습니다",
    "successBody": "새 호가 {email}(으)로 도착합니다.",
    "successTip": "스팸함으로 가지 않도록 보낸 사람을 연락처에 추가하세요.",
    "invalidTitle": "이 링크는 불완전합니다",
    "invalidBody": "확인 이메일을 다시 열고 그 안의 버튼을 선택하세요. 이메일을 찾을 수 없으면 보낸 사람의 페이지에서 다시 가입하세요.",
    "notFoundBody": "이 주소의 가입 정보를 찾지 못했습니다. 보낸 사람의 페이지에서 다시 가입하세요.",
    "errorBody": "구독을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    "retry": "다시 시도",
    "home": "홈페이지로 이동"
  },
  "embed": {
    "title": "사이트에 가입 양식 추가",
    "intro": "아래 코드 중 하나를 웹사이트에 붙여 넣으세요. 가입한 사람은 확인 이메일을 받은 뒤 자신의 언어로 호를 받습니다.",
    "linkLabel": "가입 페이지 링크",
    "linkHint": "소셜 프로필 소개, 이메일 서명, QR 코드 등으로 공유하세요.",
    "scriptLabel": "스크립트 태그(권장)",
    "scriptHint": "양식이 표시될 위치에 붙여 넣으세요. 양식 크기는 자동으로 맞춰집니다.",
    "iframeLabel": "Iframe",
    "iframeHint": "사이트에서 스크립트를 허용하지 않는 경우 사용하세요.",
    "copy": "복사",
    "copied": "복사됨",
    "copyFailed": "텍스트를 선택해 직접 복사하세요.",
    "options": "양식 옵션",
    "accent": "버튼 색상",
    "accentHint": "브랜드 색상을 사용하려면 그대로 두세요.",
    "theme": "테마",
    "themeAuto": "방문자 설정에 맞춤",
    "themeLight": "라이트",
    "themeDark": "다크",
    "layout": "레이아웃",
    "layoutFull": "전체(제목, 이름, 언어)",
    "layoutCompact": "간단히(이메일과 버튼)",
    "preview": "미리 보기",
    "previewNote": "미리 보기는 실제로 작동합니다. 여기에서 가입하면 실제 구독자가 생성됩니다.",
    "missing": "먼저 뉴스레터를 만드세요. 뉴스레터가 생기면 이곳에 가입 양식이 표시됩니다."
  },
  "page": {
    "poweredBy": "AIBAN으로 운영",
    "title": "구독하기"
  },
  "signature": {
    "title": "이메일 서명",
    "intro": "독자는 모든 호의 끝에서 이것을 봅니다. 미리 보기의 아무 부분이나 클릭해 수정하세요.",
    "show": "모든 호에 내 서명 표시",
    "showHint": "끄면 호가 글이 끝난 뒤 바로 끝납니다.",
    "preview": "미리 보기",
    "previewEmpty": "서명이 비어 있습니다. 이름을 추가해 시작하세요.",
    "articleEnd": "글의 끝",
    "tabContent": "내용",
    "tabStyle": "스타일",
    "blocks": "포함할 항목",
    "blocksHint": "태그를 선택해 해당 부분을 표시하거나 숨기세요. 숨긴 부분의 텍스트는 유지됩니다.",
    "layout": "레이아웃",
    "layouts": {
      "bar": "색상 막대",
      "photo": "사진",
      "stacked": "세로 배치",
      "centered": "가운데 정렬",
      "minimal": "텍스트만"
    },
    "fields": {
      "name": "이름",
      "role": "직함",
      "company": "회사",
      "phone": "전화",
      "email": "이메일",
      "website": "웹사이트",
      "address": "주소",
      "photoUrl": "사진",
      "logoUrl": "로고",
      "socials": "소셜 링크",
      "cta": "버튼",
      "disclaimer": "법적 고지"
    },
    "groups": {
      "about": "내 정보",
      "contact": "연락처",
      "images": "이미지",
      "socials": "소셜 링크",
      "cta": "버튼",
      "disclaimer": "법적 고지"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "창업자",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "120 Main Street, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "상담 예약하기",
      "ctaUrl": "https://"
    },
    "ctaText": "버튼 텍스트",
    "ctaLink": "버튼 링크",
    "hints": {
      "photoUrl": "144x144픽셀 이상, 200KB 미만의 정사각형 PNG 또는 JPG 링크입니다. 이름 옆에 72x72픽셀로 표시됩니다.",
      "logoUrl": "배경이 투명하거나 흰색이고 높이가 64픽셀 이상인 PNG 또는 JPG 링크입니다. 높이 32픽셀로 표시됩니다.",
      "website": "https://를 빼고 입력하면 자동으로 추가합니다.",
      "cta": "버튼이 표시되려면 텍스트와 링크가 모두 필요합니다.",
      "disclaimer": "하단의 작은 글씨입니다(예: 기밀 유지 안내). 필요 없으면 비워 두세요."
    },
    "style": {
      "accent": "강조 색상",
      "accentHint": "막대, 링크, 버튼에 사용됩니다. 처음에는 브랜드 색상으로 설정됩니다.",
      "font": "글꼴",
      "fontSans": "산세리프",
      "fontSerif": "세리프",
      "size": "글자 크기",
      "sizeMd": "보통",
      "sizeSm": "작게",
      "shape": "사진 모양",
      "shapeRound": "원형",
      "shapeSquare": "정사각형"
    },
    "hidden": "숨김",
    "reset": "처음부터 다시",
    "resetConfirm": "모든 항목을 지우려면 한 번 더 선택하세요"
  }
};
