// ko strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ko
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "로그인",
      "title": "AIBAN에 로그인",
      "subtitle": "로그인하여 중단한 부분부터 다시 시작하세요.",
      "google": "Google 계정으로 계속하기",
      "or": "또는",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "이메일로 계속하기",
      "switchText": "계정이 없으신가요?",
      "switchLink": "회원가입",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "가입하기",
      "title": "계정 만들기",
      "subtitle": "신용카드가 필요하지 않습니다.",
      "google": "Google 계정으로 계속하기",
      "or": "또는",
      "emailPlaceholder": "you@example.com",
      "continueWithEmail": "이메일로 계속하기",
      "switchText": "이미 계정이 있으신가요?",
      "switchLink": "로그인",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | 웹사이트를 독자마다 자신의 언어로 받는 뉴스레터로",
      "description": "AIBAN은 이미 게시한 콘텐츠를 읽고, 내 말투로 뉴스레터 한 호를 써서 내 이름으로 보냅니다. 구독자는 각자 자기 언어로 받습니다.",
      "ogImageAlt": "AIBAN 로고"
    },
    "skipLink": "본문으로 건너뛰기",
    "hero": {
      "eyebrow": "서비스 업종을 위한 뉴스레터",
      "title": "내 웹사이트가 독자마다 자신의 언어로 받는 주간 뉴스레터가 됩니다",
      "lead": "AIBAN은 이미 게시한 콘텐츠를 읽고, 내 말투로 한 호를 써서 내 이름으로 보냅니다. 모든 구독자는 자신이 읽는 언어로 받습니다. 한 번 설정하면 그다음부터는 알아서 계속 돌아갑니다.",
      "formLabel": "내 웹사이트",
      "formPlaceholder": "yourcompany.com",
      "formHint": "입력한 주소로 샘플 호를 만들어 드립니다. 무료로 시작할 수 있고 카드는 필요하지 않습니다.",
      "formSubmit": "내 뉴스레터 미리 보기",
      "formError": "yourcompany.com과 같은 웹 주소를 입력해 주세요.",
      "secondaryCta": "작동 방식 보기"
    },
    "preview": {
      "badge": "샘플 미리 보기",
      "note": "임시 텍스트로 만든 샘플 레이아웃입니다. 시작하면 AIBAN이 최신 글로 실제 호를 작성합니다.",
      "fromLabel": "보낸 사람",
      "toLabel": "받는 사람",
      "subjectLabel": "제목",
      "languageLabel": "독자 언어",
      "readOnBlog": "블로그에서 읽기",
      "startCta": "{site}(으)로 무료 시작",
      "startCtaGeneric": "무료로 시작하기",
      "liveRegion": "{site}의 샘플 미리 보기를 업데이트했습니다."
    },
    "chain": {
      "eyebrow": "작동 방식",
      "title": "한 번 입력하면 나머지는 자동으로 진행됩니다",
      "lead": "웹사이트를 AIBAN에 한 번만 알려 주세요. 그다음부터는 선택한 일정에 따라 아래 단계가 자동으로 진행됩니다.",
      "triggerLabel": "언제",
      "actionLabel": "그러면",
      "trigger": {
        "title": "월요일 9:00가 되면",
        "body": "매일, 매주, 매월 등 원하는 일정을 선택할 수 있습니다."
      },
      "steps": [
        {
          "title": "AIBAN이 최신 글을 찾습니다",
          "body": "웹사이트를 확인하고 이상적인 독자가 가장 관심을 가질 글을 고릅니다."
        },
        {
          "title": "내 문체로 호를 작성합니다",
          "body": "사이트의 글쓰기 방식을 바탕으로 나처럼 들리도록 다시 씁니다."
        },
        {
          "title": "독자마다 호를 번역합니다",
          "body": "모든 구독자는 가입할 때 선택한 언어로 받습니다."
        },
        {
          "title": "내 이름으로 발송",
          "body": "독자에게는 내 이름이 보이고, 답장은 내 받은편지함으로 옵니다."
        },
        {
          "title": "호를 블로그에 게시합니다",
          "body": "각 호에는 고유 링크가 있는 공개 글 페이지도 만들어집니다."
        },
        {
          "title": "결과를 보여 드립니다",
          "body": "대시보드에서 새로 가입한 사람과 독자가 클릭한 링크를 확인할 수 있습니다."
        }
      ],
      "alsoTitle": "다음과 같은 경우에도 작동합니다",
      "also": [
        {
          "title": "누군가 내 사이트에서 가입할 때",
          "body": "이메일로 확인하면 호를 받기 시작합니다."
        },
        {
          "title": "링크나 텍스트를 붙여 넣을 때",
          "body": "AIBAN이 같은 단계를 거쳐 그 내용으로 호를 작성해 보냅니다."
        },
        {
          "title": "연락처 목록을 업로드할 때",
          "body": "AIBAN이 목록을 정리하고 중복을 없애며 연락처마다 언어를 추정합니다."
        }
      ]
    },
    "languages": {
      "eyebrow": "모든 언어",
      "title": "독자는 각자 자신의 언어로 호를 받습니다",
      "body": "언어별로 따로 쓸 필요가 없습니다. AIBAN은 각 호를 구독자가 읽는 모든 언어로 번역하고, 언어마다 내 어조를 유지합니다. 스페인어, 포르투갈어, 프랑스어, 독일어, 힌디어, 아랍어, 일본어 등 많은 언어를 지원합니다.",
      "sampleNote": "같은 샘플 호를 세 명의 독자가 받는 모습입니다."
    },
    "sender": {
      "eyebrow": "내 주소",
      "title": "내 이름으로 발송",
      "body": "각 호는 내 이름과 이메일 서명을 달고 도착합니다. AIBAN은 자체 인증 주소에서 발송하므로 이메일 비밀번호를 저희에게 알려 줄 필요가 없습니다. 독자가 답장하면 답장은 내 받은편지함으로 옵니다.",
      "inboxLabel": "독자의 받은편지함에서 보이는 모습",
      "inboxFrom": "나",
      "inboxSubject": "이번 주 {site} 소식",
      "inboxSnippet": "내 문체로 쓴 최신 글의 짧은 요약입니다.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "구독자 늘리기",
      "title": "사이트용 가입 양식과 저절로 채워지는 블로그",
      "items": [
        {
          "title": "가입 양식",
          "body": "AIBAN 양식을 웹사이트에 추가하세요. 새 독자는 언어를 고르고 이메일로 가입을 확인합니다."
        },
        {
          "title": "자동 블로그",
          "body": "모든 호가 공개 글 페이지가 되어 검색으로 찾거나 링크로 공유할 수 있습니다."
        },
        {
          "title": "연락처 가져오기",
          "body": "기존 고객을 CSV나 Excel 파일로 가져오거나 목록을 붙여 넣으세요."
        }
      ]
    },
    "useCases": {
      "eyebrow": "이런 분께 맞습니다",
      "title": "관계로 성장하는 비즈니스를 위해 만들었습니다",
      "lead": "고객이 소개와 신뢰로 찾아온다면, 정기적으로 보내는 소식이 나를 기억하게 해 줍니다. AIBAN이 그 소식을 대신 써 드립니다.",
      "items": [
        {
          "title": "에이전시와 웹 디자이너",
          "body": "최신 작업과 글을 매주 고객과 잠재 고객에게 보내고, 고객 사이트에도 같은 설정을 사용하세요."
        },
        {
          "title": "IT 및 소프트웨어 기업",
          "body": "릴리스 노트와 블로그 글을 고객마다 자신의 언어로 읽는 짧은 소식으로 바꿔 줍니다."
        },
        {
          "title": "부동산",
          "body": "새 매물과 시장 관련 글을 서로 다른 언어를 쓰는 구매자와 판매자에게 공유하세요."
        },
        {
          "title": "변호사와 회계사",
          "body": "이미 다루고 있는 주제를 차분하고 일관된 형식으로 고객에게 알려 드립니다."
        },
        {
          "title": "코치와 트레이너",
          "body": "최신 강의나 글을 다시 쓰지 않고 정해진 요일에 커뮤니티로 보내세요."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "요금",
      "title": "무료로 시작하고 구독자가 늘면 업그레이드하세요",
      "lead": "무료 요금제에는 소스 1개와 최대 100명의 구독자가 포함됩니다. 유료 요금제는 소스와 구독자를 더 늘려 줍니다."
    },
    "faqTitle": "시작하기 전에 자주 묻는 질문",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "시작하려면 무엇이 필요한가요?",
        "a": "웹사이트 주소와 이메일 주소입니다. AIBAN은 사이트를 읽고 다루는 주제와 글쓰기 방식을 파악합니다."
      },
      {
        "id": "do-i-write",
        "q": "제가 직접 글을 써야 하나요?",
        "a": "그럴 필요는 없습니다. AIBAN이 내 콘텐츠로 각 호를 작성합니다. 특정 주제로 호를 만들고 싶을 때는 링크나 텍스트를 붙여 넣으면 됩니다."
      },
      {
        "id": "languages",
        "q": "독자는 어떤 언어로 받을 수 있나요?",
        "a": "AIBAN은 각 호를 구독자마다 읽는 언어로 번역합니다. 전체 언어 목록은 뉴스레터를 설정할 때 확인할 수 있습니다."
      },
      {
        "id": "sender",
        "q": "이메일은 누구 이름으로 발송되나요?",
        "a": "AIBAN의 발송 주소에서 보내며, 보낸 사람은 내 이름으로 표시됩니다. 답장은 바로 내 받은편지함으로 옵니다. 이메일 비밀번호는 절대 알려 줄 필요가 없습니다."
      },
      {
        "id": "contacts",
        "q": "기존 연락처를 가져올 수 있나요?",
        "a": "네. CSV나 Excel 파일을 업로드하거나 목록을 붙여 넣으세요. AIBAN이 정리하고 중복을 없애며 연락처마다 언어를 추정합니다."
      },
      {
        "id": "schedule",
        "q": "호는 얼마나 자주 발송되나요?",
        "a": "설정할 때 일정을 선택하며, 대시보드에서 언제든지 바꿀 수 있습니다."
      },
      {
        "id": "free-plan",
        "q": "무료 요금제가 있나요?",
        "a": "네. 무료 요금제에는 소스 1개와 최대 100명의 구독자가 포함됩니다. 유료 요금제는 소스와 구독자를 더 늘려 줍니다."
      },
      {
        "id": "cancel",
        "q": "해지할 수 있나요?",
        "a": "네. 언제든 info@aiban.news로 연락하시면 유료 요금제를 해지하거나 무료 요금제로 되돌려 드립니다."
      }
    ],
    "finalCta": {
      "title": "내 웹사이트로 시작하세요",
      "body": "웹사이트를 AIBAN에 알려 주고 첫 호를 확인한 다음, 준비되면 켜세요.",
      "cta": "무료로 시작하기",
      "secondary": "도움말 센터 읽기"
    },
    "footer": {
      "tagline": "내 콘텐츠로 작성해 독자마다 자신의 언어로 보내는 뉴스레터.",
      "product": "제품",
      "company": "회사",
      "legal": "법적 고지",
      "links": {
        "howItWorks": "작동 방식",
        "pricing": "요금",
        "demo": "데모",
        "help": "도움말 센터",
        "about": "소개",
        "careers": "채용",
        "privacy": "개인정보 처리방침",
        "terms": "서비스 약관",
        "cookies": "쿠키 정책"
      },
      "contactLabel": "문의",
      "rights": "All rights reserved."
    }
  },
  "help": {
    "title": "제한도 상향 요청",
    "subtitle": "필요한 한도를 알려 주시면 이메일로 답변해 드립니다.",
    "contact": {
      "cta": "상향 요청 제출",
      "successTitle": "요청을 보낼 준비가 되었습니다",
      "successBody": "요청 내용이 담긴 이메일 앱이 열렸습니다. 그곳에서 보내 주시면 이메일로 답변해 드립니다.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "구독자 수와 소스 수 등 필요한 한도를 알려 주세요.",
      "useCaseHelp": "무엇을, 누구에게, 얼마나 자주 보내는지 설명해 주세요.",
      "expectedSpendHelp": "대략적인 금액을 알려 주시면 요금제를 추천하는 데 도움이 됩니다. 모름으로 두셔도 됩니다."
    },
    "form": {
      "nameLabel": "이름",
      "emailLabel": "이메일",
      "companyLabel": "회사",
      "optional": "(선택)",
      "limitsLabel": "필요한 한도",
      "useCaseLabel": "AIBAN 사용 방식",
      "spendLabel": "예상 월 지출",
      "spend": {
        "lt500": "$500 미만",
        "500_2k": "$500~$2,000",
        "2k_10k": "$2,000~$10,000",
        "gt10k": "$10,000 초과",
        "unknown": "아직 모르겠습니다"
      },
      "urgencyLabel": "긴급도",
      "urgency": {
        "low": "낮음",
        "normal": "보통",
        "high": "높음"
      },
      "replyLabel": "어떻게 답변해 드릴까요?",
      "reply": {
        "email": "이메일로",
        "call": "전화로"
      },
      "payAsYouGo": "사용한 만큼 결제하는 방식에 관심이 있습니다",
      "sending": "보내는 중...",
      "sentTitle": "요청을 보냈습니다",
      "sentBody": "요청을 받았습니다. 입력하신 이메일 주소로 답변드리겠습니다.",
      "retryBefore": "이메일 앱이 열리지 않았다면",
      "retryLink": "요청을 다시 열거나",
      "retryAfter": "다음 주소로 연락해 주세요:",
      "errors": {
        "name": "이름을 입력하세요(2자 이상).",
        "email": "답변받을 이메일 주소를 입력하세요(예: name@example.com).",
        "company": "2자 이상 입력하거나 비워 두세요.",
        "desiredLimits": "필요한 한도를 10자 이상으로 적어 주세요.",
        "useCase": "사용 방식을 20자 이상으로 적어 주세요."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "제한도 상향은 어떻게 진행되나요?",
        "a": "필요한 한도를 적어 요청을 보내 주세요. 계정에 맞는 옵션을 이메일로 안내해 드립니다."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "AIBAN은 무엇을 하나요?",
      "a": "AIBAN은 웹사이트, 블로그, 직접 고른 뉴스 사이트 등 이미 게시한 콘텐츠를 읽습니다. 그리고 내 말투로 새 호를 써서 뉴스레터로 보냅니다. 구독자는 각자 고른 언어로 받고, 보낸 사람에는 내 이름이 표시됩니다."
    },
    {
      "q": "무료 요금제가 있나요?",
      "a": "네. 무료 요금제에는 소스 1개와 최대 100명의 구독자가 포함됩니다. 더 필요하면 저희에게 연락해 주세요. 요금제를 변경해 드립니다."
    },
    {
      "q": "구독자는 어떻게 자신의 언어로 뉴스레터를 받나요?",
      "a": "구독자는 가입할 때 원하는 언어를 선택합니다. AIBAN은 보내기 전에 모든 호를 그 언어로 번역합니다."
    },
    {
      "q": "내 이메일 주소로 호를 보낼 수 있나요?",
      "a": "각 호는 AIBAN의 발송 주소에서 내 이름과 이메일 서명을 달고 나가며, 답장은 내 받은편지함으로 옵니다. 이메일 비밀번호를 요청하지 않으므로 유출될 내 정보도 없습니다."
    },
    {
      "q": "사람들은 어떻게 구독하나요?",
      "a": "가입 페이지와 웹사이트에 넣을 수 있는 가입 위젯이 제공됩니다. 직접 사람을 추가하거나 목록을 업로드할 수도 있습니다."
    },
    {
      "q": "언제든지 해지할 수 있나요?",
      "a": "네. 언제든 info@aiban.news로 연락하시면 유료 요금제를 해지하거나 무료 요금제로 되돌려 드립니다."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "월간",
      "연간"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Free",
        "monthly": 0,
        "yearly": 0,
        "tagline": "소스 1개로 AIBAN 써 보기",
        "featuresBase": [
          "소스 1개",
          "구독자 최대 100명"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "현재 요금제",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "성장 중인 뉴스레터 대상",
        "featuresBase": [
          "소스 5개",
          "구독자 최대 10만 명"
        ],
        "featuresDelta": [
          "이메일 지원",
          "기본 번역"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Starter 선택",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "자리 잡은 뉴스레터용",
        "featuresBase": [
          "소스 17개",
          "구독자 최대 25만 명"
        ],
        "featuresDelta": [
          "커스텀 브랜딩",
          "고급 분석"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Growth 선택",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "전문 마케터용",
        "featuresBase": [
          "소스 25개",
          "구독자 최대 50만 명"
        ],
        "featuresDelta": [
          "API 액세스",
          "우선 처리 지원"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Pro 선택",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "대규모 독자층용",
        "featuresBase": [
          "소스 50개",
          "구독자 무제한"
        ],
        "featuresDelta": [
          "밀착형 케어 서비스",
          "커스텀 웹훅"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Master 선택",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP 무료",
        "monthly": 0,
        "yearly": 0,
        "tagline": "파트너 전용 전체 액세스",
        "featuresBase": [
          "뉴스 소스 무제한",
          "구독자 무제한"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "현재 요금제",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "커스텀 솔루션이 필요하신가요?",
      "cta": "문의하기",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "기사를 찾을 수 없습니다.",
    "errorFetching": "이 기사를 불러오지 못했습니다. 1분 뒤 페이지를 새로고침해 다시 시도하세요.",
    "noArticleSpecified": "지정된 기사가 없습니다.",
    "goBack": "돌아가기",
    "loading": "로딩 중..."
  },
  "pricing": {
    "eyebrow": "요금제",
    "title": "요금제 및 가격",
    "currentPlan": "현재 요금제:",
    "monthly": "월간",
    "yearly": "연간",
    "yearlySave": "35% 할인",
    "intervalLabel": "결제 주기",
    "billedYearly": "연간 청구",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "무료로 시작하기",
    "processing": "결제 페이지를 여는 중...",
    "askMore": "모든 계정은 무료 요금제로 시작합니다. 더 필요하면 {email}로 연락해 주세요. 요금제를 변경해 드립니다.",
    "askFor": "{planName} 요청하기",
    "askAction": "문의하기",
    "checkoutError": "결제 페이지를 열지 못했습니다. 잠시 후 다시 시도해 주세요.",
    "networkError": "서버에 연결하지 못했습니다. 연결 상태를 확인하고 다시 시도해 주세요.",
    "includes": "포함 사항",
    "pageMetaTitle": "요금 | AIBAN",
    "pageMetaDescription": "AIBAN 요금제와 가격. 소스 1개와 구독자 최대 100명으로 무료로 시작하고, 더 필요해지면 월간 또는 연간 요금제로 옮기세요.",
    "pageTitle": "요금",
    "pageLead": "소스 1개와 구독자 최대 100명을 제공하는 무료 요금제로 시작하세요. 소스나 구독자가 더 필요해지면 연락해 주세요. 월간 또는 연간 결제 유료 요금제로 옮겨 드립니다.",
    "faqTitle": "결제 관련 질문",
    "contactText": "더 높은 한도나 맞춤 설정이 필요하신가요?",
    "contactCta": "문의하기",
    "everythingIn": "이전 요금제 모든 기능 포함:",
    "isCurrentPlan": "현재 이용 중인 요금제입니다",
    "downgradeTo": "{planName}(으)로 변경",
    "upgradeTo": "{planName} 선택",
    "mockMode": "테스트 모드",
    "mostPopular": "가장 인기",
    "perMonth": "/월",
    "perYear": "/연",
    "youSave": "절약 금액"
  },
  "confirmSubscription": {
    "title": "구독을 확인해 주세요",
    "goBack": "돌아가기",
    "pleaseAccept": "구독을 완료하려면 약관에 동의해 주세요.",
    "iAccept": "동의함:",
    "termsAndConditions": "이용 약관",
    "and": "및",
    "privacyPolicy": "개인정보 처리방침",
    "confirm": "구독 확인",
    "mustAccept": "구독을 위해서는 약관 동의가 필요합니다.",
    "invalidLink": "이 확인 링크는 완전하지 않습니다. 가장 최근에 보내 드린 이메일을 열어 그 안의 링크를 사용하세요."
  },
  "articles": {
    "title": "최신 글",
    "subtitle": "AIBAN이 발송하는 뉴스레터를 위해 쓴 기사입니다.",
    "producedIn": "이 기사들을 볼 수 있는 언어",
    "searchPlaceholder": "기사 검색...",
    "noArticlesFound": "기사가 없습니다.",
    "created": "작성일:",
    "language": "언어:",
    "rightsReserved": "모든 권리 보유.",
    "errorFetching": "기사를 불러오지 못했습니다. 1분 뒤 페이지를 새로고침해 다시 시도하세요."
  },
  "blog": {
    "metaTitle": "{name} 블로그",
    "metaDescription": "{name}의 글입니다. 구독하면 새 글을 이메일로 받을 수 있습니다.",
    "eyebrow": "뉴스레터 블로그",
    "heroFrom": "{name}의 글",
    "heroDescription": "이 뉴스레터가 게시한 글입니다. 구독하면 새 글을 이메일로 받을 수 있습니다.",
    "subscribe": "구독하기",
    "home": "블로그 홈",
    "featured": "최신 글",
    "latest": "최신 글",
    "latestHint": "최신순으로 표시합니다. 이미지가 없는 글은 텍스트로만 표시됩니다.",
    "articleCount": "{language} 글 {count}개",
    "articleCountOne": "{language} 글 1개",
    "languages": "언어 선택",
    "minRead": "{n}분 분량",
    "readArticle": "글 읽기",
    "page": "{page}페이지",
    "newer": "최근 글",
    "older": "이전 글",
    "pagination": "글 페이지",
    "emptyTitle": "아직 글이 없습니다",
    "emptyBody": "이 뉴스레터는 아직 이곳에 글을 게시하지 않았습니다. 구독하면 첫 글을 이메일로 받을 수 있습니다.",
    "endTitle": "더 이전 글이 없습니다",
    "endBody": "목록의 끝에 도달했습니다.",
    "backToNewest": "최신 글로 이동",
    "errorTitle": "글을 불러오지 못했습니다",
    "errorBody": "글 서버가 제시간에 응답하지 않았습니다. 1분 후 페이지를 새로고침해 다시 시도해 주세요.",
    "reload": "페이지 새로고침",
    "missingHolder": "어느 블로그를 열지 정보가 없어 이 블로그 링크가 불완전합니다. 뉴스레터 운영자에게 전체 링크를 요청해 주세요.",
    "redirecting": "블로그를 여는 중...",
    "publishedWith": "AIBAN으로 게시",
    "cta": {
      "title": "다음 글을 이메일로 받기",
      "body": "{name}을(를) 구독하면 새 글이 받은편지함으로 옵니다. 언제든지 구독을 취소할 수 있습니다.",
      "button": "구독하기"
    },
    "search": {
      "label": "글 검색",
      "placeholder": "단어나 문구로 검색",
      "button": "검색",
      "suggestions": "추천 검색어",
      "recent": "최근 검색",
      "clearRecent": "최근 검색 지우기",
      "title": "검색 결과",
      "resultsFor": "\"{q}\" 검색 결과",
      "count": "글 {count}개를 찾았습니다",
      "countOne": "글 1개를 찾았습니다",
      "searching": "글을 검색하는 중",
      "emptyTitle": "\"{q}\"와(과) 일치하는 글이 없습니다",
      "emptyBody": "맞춤법을 확인하거나 더 짧은 단어로 검색해 보세요. 블로그의 모든 글을 둘러볼 수도 있습니다.",
      "browseAll": "모든 글 둘러보기",
      "noQuery": "이 블로그를 검색하려면 위에 단어나 문구를 입력하세요.",
      "error": "글 서버가 응답하지 않아 검색이 중단되었습니다. 1분 후 다시 시도해 주세요.",
      "tryAgain": "다시 시도",
      "limitNote": "처음 {count}개의 결과를 표시합니다. 결과를 좁히려면 더 구체적인 문구를 사용하세요."
    },
    "article": {
      "back": "모든 글",
      "published": "{date} 게시",
      "by": "작성자: {name}",
      "otherLanguages": "다른 언어로 더 읽기",
      "otherLanguagesHint": "이 뉴스레터는 다음 언어로도 게시합니다. 각 링크를 누르면 해당 언어의 블로그가 열립니다.",
      "share": "이 글 공유하기",
      "copyLink": "링크 복사",
      "copied": "링크를 복사했습니다. 원하는 곳에 붙여 넣으세요.",
      "copyFailed": "링크를 복사하지 못했습니다. 브라우저 주소창에서 복사해 주세요.",
      "notFoundTitle": "글을 찾을 수 없습니다",
      "notFoundBody": "이 글이 삭제되었거나 링크가 불완전할 수 있습니다. 블로그를 열어 다른 글을 확인해 보세요.",
      "errorTitle": "이 글을 불러오지 못했습니다",
      "errorBody": "글 서버가 제시간에 응답하지 않았습니다. 1분 후 페이지를 새로고침해 다시 시도해 주세요.",
      "goToBlog": "블로그로 이동"
    }
  },
  "nav": {
    "mainLabel": "메인",
    "legalLabel": "법적 고지",
    "home": "AIBAN 홈",
    "menu": "메뉴",
    "openMenu": "메뉴 열기",
    "closeMenu": "메뉴 닫기",
    "howItWorks": "작동 방식",
    "pricing": "요금",
    "help": "도움말",
    "about": "소개",
    "privacy": "개인정보",
    "terms": "약관",
    "cookies": "쿠키",
    "signOut": "로그아웃",
    "chooseLanguage": "언어 선택",
    "currentLanguage": "언어: {name}"
  },
  "about": {
    "metaTitle": "소개 | AIBAN",
    "metaDescription": "AIBAN은 비즈니스가 이미 게시한 콘텐츠를 자동으로 발송되는 뉴스레터로 바꿉니다. 각 구독자의 언어로, 운영자의 이름으로 도착합니다.",
    "eyebrow": "소개",
    "title": "AIBAN 소개",
    "lead": "AIBAN은 비즈니스가 이미 게시한 콘텐츠를 자동으로 발송되는 뉴스레터로 바꿉니다. 구독자는 각자 자기 언어로 읽고, 뉴스레터는 운영자의 이름으로 도착합니다.",
    "whatTitle": "AIBAN이 하는 일",
    "whatBody": [
      "웹사이트, 블로그, 팔로우하는 뉴스 사이트 등 콘텐츠가 있는 곳을 AIBAN에 알려 주세요. 그곳에 새 글이 올라오면 AIBAN이 설명한 문체로 호를 작성해 선택한 일정에 따라 구독자에게 보냅니다.",
      "모든 구독자는 가입할 때 언어를 선택하고, 각 호는 발송 전에 그 언어로 번역됩니다. 글은 웹 페이지로도 게시되며, 내 사이트로 보낼 수도 있습니다."
    ],
    "whoTitle": "만든 사람",
    "whoBody": [
      "AIBAN은 창업자 Luis Murillo Baltodano가 만들고 있습니다. Luis는 컴퓨터 그래픽스와 자동화 분야의 경험을 갖춘 크리에이티브 엔지니어입니다.",
      "그의 오픈 소스 작업 일부를 아래에 소개합니다."
    ],
    "projectsTitle": "창업자의 오픈 소스 작업",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Three.js와 3D 웹 API로 작업할 때 반복되는 상용구 코드를 줄여 주는 라이브러리입니다."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "자주 하는 Canvas API 작업을 위한 도우미 모음입니다."
      },
      {
        "name": "Atomic Gatsby 템플릿",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "아토믹 디자인으로 구성한 스타터 템플릿입니다."
      }
    ],
    "githubLabel": "GitHub의 Luis",
    "newTab": "(새 탭에서 열림)",
    "contactTitle": "문의하기",
    "contactBody": "질문, 의견, 제휴 제안은 info@aiban.news로 보내 주세요.",
    "emailCta": "info@aiban.news로 이메일 보내기",
    "startCta": "무료로 시작하기",
    "helpCta": "도움말 센터 읽기"
  },
  "careers": {
    "metaTitle": "채용 | AIBAN",
    "metaDescription": "AIBAN은 현재 채용 중인 직무가 없습니다. 그래도 info@aiban.news로 연락하실 수 있습니다.",
    "eyebrow": "채용",
    "title": "AIBAN 채용",
    "lead": "AIBAN은 현재 채용 중인 직무가 없습니다.",
    "body": "채용이 시작되면 이 페이지에 공고를 올립니다. 나중에 AIBAN에서 일하고 싶다면 자기소개와 만들고 싶은 것을 짧게 적어 보내 주세요.",
    "emailCta": "info@aiban.news로 이메일 보내기",
    "emailSubject": "AIBAN에서 일하기",
    "aboutCta": "AIBAN 소개 읽기"
  },
  "legal": {
    "navLabel": "법적 문서",
    "lastUpdated": "최종 업데이트: {date}",
    "privacy": {
      "title": "개인정보처리방침",
      "metaTitle": "개인정보처리방침 | AIBAN",
      "metaDescription": "AIBAN이 데이터를 수집, 이용, 보호하는 방법과 데이터 관련 권리를 행사하는 방법입니다."
    },
    "terms": {
      "title": "서비스 약관",
      "metaTitle": "서비스 약관 | AIBAN",
      "metaDescription": "계정을 만들고 AIBAN을 사용할 때 적용되는 약관입니다."
    },
    "cookies": {
      "title": "쿠키 정책",
      "metaTitle": "쿠키 정책 | AIBAN",
      "metaDescription": "AIBAN이 사용하는 쿠키의 종류, 역할, 보관 기간, 그리고 쿠키를 관리하는 방법입니다."
    }
  },
  "demoPage": {
    "metaTitle": "데모 | AIBAN",
    "metaDescription": "AIBAN 안내 영상을 보고, 웹사이트 추가부터 첫 호 발송까지 가입 후 어떤 일이 일어나는지 확인하세요.",
    "eyebrow": "데모",
    "title": "AIBAN 작동 방식 보기",
    "lead": "안내 영상을 본 다음, 가입 후 진행되는 과정을 읽어 보세요.",
    "videoTitle": "AIBAN 안내 영상",
    "playLabel": "안내 영상 재생",
    "videoNote": "영상은 YouTube에서 재생됩니다.",
    "stepsTitle": "가입 후 진행되는 과정",
    "steps": [
      {
        "title": "웹사이트 추가",
        "body": "내 사이트, 블로그 또는 팔로우하는 뉴스 사이트의 주소를 입력하세요. AIBAN이 그곳에서 새 콘텐츠를 읽습니다."
      },
      {
        "title": "독자와 문체 설명",
        "body": "누가 뉴스레터를 읽는지, 어떤 어조여야 하는지 AIBAN에 알려 주세요. 사이트를 바탕으로 설명을 제안하게 할 수도 있습니다."
      },
      {
        "title": "일정 선택",
        "body": "호를 얼마나 자주 보낼지 고르세요. 나중에 대시보드에서 바꿀 수 있습니다."
      },
      {
        "title": "구독자 추가",
        "body": "목록을 업로드하거나, 한 명씩 추가하거나, 가입 페이지와 위젯을 공유하세요. 구독자는 각자 언어를 선택합니다."
      },
      {
        "title": "보낸 사람 이름과 서명 추가",
        "body": "독자에게 보일 이름과 이메일 서명을 추가하세요. AIBAN은 인증된 주소에서 내 이름으로 각 호를 보내고, 답장은 내 받은편지함으로 옵니다."
      }
    ],
    "ctaTitle": "내 웹사이트로 직접 써 보세요",
    "ctaBody": "무료 요금제에는 소스 1개와 최대 100명의 구독자가 포함됩니다.",
    "primaryCta": "무료로 시작하기",
    "secondaryCta": "요금 보기"
  },
  "helpCenter": {
    "metaTitle": "도움말 | AIBAN",
    "metaDescription": "AIBAN 설정에 관한 답변: 소스, 언어, 내 이름으로 발송, 구독자, 가입 위젯, 블로그, 결제.",
    "eyebrow": "도움말 센터",
    "title": "무엇을 도와드릴까요?",
    "lead": "뉴스레터 설정과 운영에 관한 답변을 찾아보세요. 원하는 내용이 없으면 문의해 주세요.",
    "searchLabel": "도움말 센터 검색",
    "searchPlaceholder": "예: 언어, 위젯, 해지",
    "clearSearch": "검색 지우기",
    "resultsCount": "검색과 일치하는 답변이 {count}개 있습니다.",
    "noResults": "검색과 일치하는 답변이 없습니다. 다른 단어로 검색하거나 info@aiban.news로 이메일을 보내 주세요.",
    "topicsLabel": "주제",
    "copyLink": "링크 복사",
    "linkCopied": "링크를 복사했습니다",
    "contactTitle": "도움이 더 필요하신가요?",
    "contactBody": "가입할 때 사용한 이메일 주소를 적어 info@aiban.news로 보내 주세요.",
    "emailCta": "info@aiban.news로 이메일 보내기",
    "limitsTitle": "한도 상향 요청",
    "limitsBody": "필요한 한도를 알려 주시면 이메일로 답변드립니다. 이 페이지에서 요청을 보낼 수 없으면 내용이 채워진 이메일 앱이 열리니 그대로 보내 주세요.",
    "faqFilterLabel": "질문 필터",
    "faqNoMatch": "필터와 일치하는 질문이 없습니다.",
    "groups": [
      {
        "id": "getting-started",
        "title": "시작하기",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "AIBAN은 무엇인가요?",
            "a": "AIBAN은 이미 게시한 콘텐츠를 정기 뉴스레터로 바꿉니다. 웹사이트, 블로그 또는 선택한 뉴스 사이트를 읽고, 내 문체로 새 호를 작성해 구독자에게 보냅니다. 구독자는 각자 선택한 언어로 읽습니다."
          },
          {
            "id": "how-to-start",
            "q": "어떻게 시작하나요?",
            "a": "가입 페이지에서 계정을 만드세요. 설정 과정에서 사이트 주소와 독자에 관한 몇 가지 정보를 묻습니다. 그다음 구독자를 추가하고 대시보드에서 모든 것을 관리할 수 있습니다."
          },
          {
            "id": "change-settings",
            "q": "나중에 설정을 바꿀 수 있나요?",
            "a": "네. 소스, 일정, 보낸 사람 정보, 구독자는 나중에 대시보드에서 바꿀 수 있습니다. 요금제를 바꾸려면 info@aiban.news로 연락해 주세요."
          }
        ]
      },
      {
        "id": "sources",
        "title": "소스와 콘텐츠",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "무엇을 소스로 사용할 수 있나요?",
            "a": "소스는 AIBAN이 새 콘텐츠를 읽는 웹 주소로, 내 웹사이트, 블로그 또는 팔로우하는 뉴스 사이트 등이 있습니다. 소스는 대시보드에서 추가합니다. 추가할 수 있는 개수는 요금제에 따라 다릅니다."
          },
          {
            "id": "how-often",
            "q": "뉴스레터는 얼마나 자주 발송되나요?",
            "a": "소스를 설정할 때 게시 빈도를 선택합니다. 일정은 나중에 대시보드에서 바꿀 수 있습니다."
          },
          {
            "id": "your-voice",
            "q": "AIBAN은 어떻게 내 문체로 글을 쓰나요?",
            "a": "뉴스레터의 개성을 직접 설명하거나 AIBAN이 설명을 생성하게 하세요. 호는 그 설명에 따라 작성됩니다. 설명은 대시보드에서 언제든지 수정할 수 있습니다."
          }
        ]
      },
      {
        "id": "languages",
        "title": "언어",
        "items": [
          {
            "id": "subscriber-language",
            "q": "구독자는 어떻게 자신의 언어로 뉴스레터를 받나요?",
            "a": "구독자는 가입할 때 원하는 언어를 선택합니다. AIBAN은 보내기 전에 모든 호를 그 언어로 번역합니다."
          },
          {
            "id": "site-language",
            "q": "사이트를 내 언어로 사용할 수 있나요?",
            "a": "네. 화면 오른쪽 아래의 언어 버튼으로 사이트와 대시보드의 언어를 바꿀 수 있습니다."
          }
        ]
      },
      {
        "id": "sending",
        "title": "내 이름으로 발송",
        "items": [
          {
            "id": "own-address",
            "q": "내 이메일 주소로 호를 보낼 수 있나요?",
            "a": "각 호는 AIBAN의 발송 주소에서 내 보낸 사람 이름과 이메일 서명을 달고 나가며, 답장은 내 받은편지함으로 옵니다. 이메일 비밀번호를 요청하지 않으므로 유출될 내 정보도 없습니다."
          },
          {
            "id": "app-password",
            "q": "AIBAN에 이메일 비밀번호를 알려 줘야 하나요?",
            "a": "아니요. AIBAN은 이메일 비밀번호나 앱 비밀번호를 절대 요청하지 않습니다. 각 호는 AIBAN의 주소에서 내 이름으로 발송되고, 답장은 나에게 옵니다."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "구독자와 가입 위젯",
        "items": [
          {
            "id": "add-subscribers",
            "q": "구독자는 어떻게 추가하나요?",
            "a": "대시보드에서 한 명씩 추가하거나 목록 파일을 업로드할 수 있습니다. 사람들이 가입 페이지나 가입 위젯으로 직접 가입할 수도 있습니다."
          },
          {
            "id": "signup-widget",
            "q": "가입 위젯이란 무엇인가요?",
            "a": "위젯은 내 웹사이트에 넣을 수 있는 가입 양식입니다. 방문자가 이메일 주소를 입력하고 언어를 고르면 내 목록에 추가됩니다."
          },
          {
            "id": "subscriber-limit",
            "q": "구독자 수에 제한이 있나요?",
            "a": "요금제마다 구독자 한도가 있습니다. 무료 요금제는 최대 100명입니다. 다른 요금제의 한도는 요금 페이지에서 확인하세요."
          }
        ]
      },
      {
        "id": "blog",
        "title": "블로그",
        "items": [
          {
            "id": "blog-pages",
            "q": "뉴스레터 글이 웹에 게시되나요?",
            "a": "네. AIBAN이 뉴스레터용으로 작성한 글은 웹 페이지로도 게시되어, 받은편지함 밖에서도 읽을 수 있습니다."
          },
          {
            "id": "post-to-site",
            "q": "글을 내 웹사이트에 게시할 수 있나요?",
            "a": "네. 대시보드에서 웹훅을 설정하면 뉴스레터의 각 글을 게시물로 내 웹사이트에 보낼 수 있습니다. WordPress는 물론 표준 REST 콘텐츠를 받는 모든 플랫폼에서 작동합니다."
          }
        ]
      },
      {
        "id": "billing",
        "title": "결제",
        "items": [
          {
            "id": "free-plan",
            "q": "무료 요금제가 있나요?",
            "a": "네. 무료 요금제에는 소스 1개와 최대 100명의 구독자가 포함됩니다. 더 필요해지면 유료 요금제로 바꿀 수 있습니다."
          },
          {
            "id": "monthly-yearly",
            "q": "월간 또는 연간으로 결제할 수 있나요?",
            "a": "네. 유료 요금제는 월간 또는 연간으로 결제됩니다. 연간 요금은 12개월 동안 월간으로 내는 것보다 35% 저렴합니다. 요금제를 고르려면 info@aiban.news로 연락해 주세요."
          },
          {
            "id": "cancel",
            "q": "언제든지 해지할 수 있나요?",
            "a": "네. 언제든 info@aiban.news로 연락하시면 유료 요금제를 해지하거나 무료 요금제로 되돌려 드립니다."
          },
          {
            "id": "higher-limits",
            "q": "가장 큰 요금제보다 더 필요하면 어떻게 하나요?",
            "a": "도움말 페이지의 요청 양식으로 필요한 한도를 알려 주세요. 이메일로 답변해 드립니다."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "본문으로 건너뛰기",
    "dismissAnnouncement": "공지 닫기",
    "problem": "문제점:",
    "outcome": "해결 결과:",
    "disclaimer": "35% 할인은 연간 결제 시에만 적용됩니다."
  },
  "authForm": {
    "emailValidation": "이메일 주소를 입력하세요(예: name@example.com).",
    "failedToSendCode": "코드를 보내지 못했습니다. 이메일 주소를 확인하고 1분 뒤 다시 시도하세요.",
    "sending": "전송 중...",
    "codeSent": "이메일로 코드를 보냈습니다.",
    "invalidCode": "코드가 올바르지 않습니다. 가장 최근에 보내 드린 이메일을 확인하거나 코드를 다시 보내세요.",
    "regenerateCode": "코드 재전송",
    "back": "뒤로",
    "byProceeding": "계속 진행하면 다음에 동의하게 됩니다:",
    "termsOfService": "서비스 이용 약관",
    "and": "및",
    "privacyPolicy": "개인정보 처리방침",
    "appName": "AI 뉴스레터"
  },
  "welcome": {
    "title": "자동 뉴스레터 생성기",
    "setItOnce": "한 번만 설정하세요.",
    "useItForever": "그다음부터는 계속 알아서 돌아갑니다."
  },
  "lead": {
    "title": "구독자를 방문자로 전환하세요",
    "recommendation": "웹사이트를 연결하여 AI가 귀하의 브랜드를 더 잘 이해하도록 도와주세요.",
    "question": "웹사이트가 있나요? (선택, 나중에 추가할 수 있습니다)",
    "placeholder": "https://your-site.com"
  },
  "newsSource": {
    "title": "콘텐츠 소스 연결",
    "subtitle": "피드를 가져오므로 처음부터 작성할 필요가 없습니다.",
    "placeholder": "블로그 또는 RSS 링크"
  },
  "subscribe": {
    "welcome": {
      "title": "뉴스레터 구독을 환영합니다.",
      "invitedBy": "{configuratorId} 님으로부터 초대받으셨습니다."
    }
  },
  "header": {
    "goToWorkspace": "대시보드 열기",
    "inBilling": "요금",
    "vip": "VIP",
    "plan": "{planName} 요금제",
    "logIn": "로그인",
    "getStarted": "무료로 시작하기"
  },
  "fileInput": {
    "chooseFile": "파일 선택",
    "dropFile": "여기에 놓기",
    "release": "업로드를 위해 놓기"
  },
  "billing": {
    "title": "결제 및 구독",
    "currentPlanTitle": "현재 요금제",
    "upgradePlanTitle": "요금제 변경",
    "manageSubscription": "구독 관리",
    "vipPlanName": "VIP 파트너",
    "vipPlanDescription": "AIBAN이 제공하는 무제한 이용 권한입니다.",
    "perMonth": "월간 요금",
    "perYear": "연간 요금",
    "monthAbbreviation": "월",
    "equivalentTo": "에 해당",
    "mostPopular": "가장 인기",
    "upgradeTo": "업그레이드:",
    "downgradeTo": "변경:",
    "currentPlanButton": "내 요금제",
    "youSave": "절약 금액",
    "users": "명 사용자",
    "newsSources": "개 뉴스 소스",
    "monthly": "월간 결제",
    "yearly": "연간 결제",
    "loadingPlan": "요금제 데이터를 불러오는 중..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "압하스어"
    },
    {
      "code": "aa",
      "name": "아파르어"
    },
    {
      "code": "af",
      "name": "아프리칸스어"
    },
    {
      "code": "ak",
      "name": "아칸어"
    },
    {
      "code": "sq",
      "name": "알바니아어"
    },
    {
      "code": "am",
      "name": "암하라어"
    },
    {
      "code": "ar",
      "name": "아랍어"
    },
    {
      "code": "an",
      "name": "아라곤어"
    },
    {
      "code": "hy",
      "name": "아르메니아어"
    },
    {
      "code": "as",
      "name": "아삼어"
    },
    {
      "code": "av",
      "name": "아바르어"
    },
    {
      "code": "ae",
      "name": "아베스타어"
    },
    {
      "code": "ay",
      "name": "아이마라어"
    },
    {
      "code": "az",
      "name": "아제르바이잔어"
    },
    {
      "code": "bm",
      "name": "밤바라어"
    },
    {
      "code": "ba",
      "name": "바시키르어"
    },
    {
      "code": "eu",
      "name": "바스크어"
    },
    {
      "code": "be",
      "name": "벨라루스어"
    },
    {
      "code": "bn",
      "name": "뱅골어"
    },
    {
      "code": "bi",
      "name": "비스라마어"
    },
    {
      "code": "bs",
      "name": "보스니아어"
    },
    {
      "code": "br",
      "name": "브르타뉴어"
    },
    {
      "code": "bg",
      "name": "불가리아어"
    },
    {
      "code": "my",
      "name": "미얀마어"
    },
    {
      "code": "ca",
      "name": "카탈루냐어"
    },
    {
      "code": "ch",
      "name": "차모로어"
    },
    {
      "code": "ce",
      "name": "체첸어"
    },
    {
      "code": "ny",
      "name": "치체와어"
    },
    {
      "code": "zh",
      "name": "중국어"
    },
    {
      "code": "cu",
      "name": "교회 슬라브어"
    },
    {
      "code": "cv",
      "name": "추바시어"
    },
    {
      "code": "kw",
      "name": "콘월어"
    },
    {
      "code": "co",
      "name": "코르시카어"
    },
    {
      "code": "cr",
      "name": "크리어"
    },
    {
      "code": "hr",
      "name": "크로아티아어"
    },
    {
      "code": "cs",
      "name": "체코어"
    },
    {
      "code": "da",
      "name": "덴마크어"
    },
    {
      "code": "dv",
      "name": "디베히어"
    },
    {
      "code": "nl",
      "name": "네덜란드어"
    },
    {
      "code": "dz",
      "name": "종카어"
    },
    {
      "code": "en",
      "name": "영어"
    },
    {
      "code": "eo",
      "name": "에스페란토어"
    },
    {
      "code": "et",
      "name": "에스토니아어"
    },
    {
      "code": "ee",
      "name": "에웨어"
    },
    {
      "code": "fo",
      "name": "페로어"
    },
    {
      "code": "fj",
      "name": "피지어"
    },
    {
      "code": "fi",
      "name": "핀란드어"
    },
    {
      "code": "fr",
      "name": "프랑스어"
    },
    {
      "code": "fy",
      "name": "서프리슬란드어"
    },
    {
      "code": "ff",
      "name": "풀라어"
    },
    {
      "code": "gd",
      "name": "스코트 게일어"
    },
    {
      "code": "gl",
      "name": "갈리시아어"
    },
    {
      "code": "lg",
      "name": "간다어"
    },
    {
      "code": "ka",
      "name": "조지아어"
    },
    {
      "code": "de",
      "name": "독일어"
    },
    {
      "code": "el",
      "name": "그리스어"
    },
    {
      "code": "kl",
      "name": "그린란드어"
    },
    {
      "code": "gn",
      "name": "과라니어"
    },
    {
      "code": "gu",
      "name": "구자라트어"
    },
    {
      "code": "ht",
      "name": "아이티 크리올어"
    },
    {
      "code": "ha",
      "name": "하우사어"
    },
    {
      "code": "he",
      "name": "히브리어"
    },
    {
      "code": "hz",
      "name": "헤레로어"
    },
    {
      "code": "hi",
      "name": "힌디어"
    },
    {
      "code": "ho",
      "name": "히리 모투어"
    },
    {
      "code": "hu",
      "name": "헝가리어"
    },
    {
      "code": "is",
      "name": "아이슬란드어"
    },
    {
      "code": "io",
      "name": "이도어"
    },
    {
      "code": "ig",
      "name": "이보어"
    },
    {
      "code": "id",
      "name": "인도네시아어"
    },
    {
      "code": "ia",
      "name": "인테르링구아"
    },
    {
      "code": "ie",
      "name": "인테르링구에"
    },
    {
      "code": "iu",
      "name": "이누이트어"
    },
    {
      "code": "ik",
      "name": "이누피아크어"
    },
    {
      "code": "ga",
      "name": "아일랜드어"
    },
    {
      "code": "it",
      "name": "이탈리아어"
    },
    {
      "code": "ja",
      "name": "일본어"
    },
    {
      "code": "jv",
      "name": "자바어"
    },
    {
      "code": "kn",
      "name": "칸나다어"
    },
    {
      "code": "kr",
      "name": "카누리어"
    },
    {
      "code": "ks",
      "name": "카슈미르어"
    },
    {
      "code": "kk",
      "name": "카자흐어"
    },
    {
      "code": "km",
      "name": "크메르어"
    },
    {
      "code": "ki",
      "name": "키쿠유어"
    },
    {
      "code": "rw",
      "name": "키냐르완다어"
    },
    {
      "code": "ky",
      "name": "키르기스어"
    },
    {
      "code": "kv",
      "name": "코미어"
    },
    {
      "code": "kg",
      "name": "콩고어"
    },
    {
      "code": "ko",
      "name": "한국어"
    },
    {
      "code": "kj",
      "name": "쿠아냐마어"
    },
    {
      "code": "ku",
      "name": "쿠르드어"
    },
    {
      "code": "lo",
      "name": "라오어"
    },
    {
      "code": "la",
      "name": "라틴어"
    },
    {
      "code": "lv",
      "name": "라트비아어"
    },
    {
      "code": "li",
      "name": "림뷔르흐어"
    },
    {
      "code": "ln",
      "name": "링갈라어"
    },
    {
      "code": "lt",
      "name": "리투아니아어"
    },
    {
      "code": "lu",
      "name": "루바카탕가어"
    },
    {
      "code": "lb",
      "name": "룩셈부르크어"
    },
    {
      "code": "mk",
      "name": "마케도니아어"
    },
    {
      "code": "mg",
      "name": "마다가스카르어"
    },
    {
      "code": "ms",
      "name": "말레이어"
    },
    {
      "code": "ml",
      "name": "말라얄람어"
    },
    {
      "code": "mt",
      "name": "몰타어"
    },
    {
      "code": "gv",
      "name": "맨섬어"
    },
    {
      "code": "mi",
      "name": "마오리어"
    },
    {
      "code": "mr",
      "name": "마라티어"
    },
    {
      "code": "mh",
      "name": "마셜어"
    },
    {
      "code": "mn",
      "name": "몽골어"
    },
    {
      "code": "na",
      "name": "나우루어"
    },
    {
      "code": "nv",
      "name": "나바호어"
    },
    {
      "code": "nd",
      "name": "북부 은데벨레어"
    },
    {
      "code": "nr",
      "name": "남부 은데벨레어"
    },
    {
      "code": "ng",
      "name": "은동가어"
    },
    {
      "code": "ne",
      "name": "네팔어"
    },
    {
      "code": "no",
      "name": "노르웨이어"
    },
    {
      "code": "nb",
      "name": "노르웨이 보크몰"
    },
    {
      "code": "nn",
      "name": "노르웨이 니노르스크"
    },
    {
      "code": "oc",
      "name": "옥시탄어"
    },
    {
      "code": "oj",
      "name": "오지브웨이어"
    },
    {
      "code": "or",
      "name": "오리야어"
    },
    {
      "code": "om",
      "name": "오로모어"
    },
    {
      "code": "os",
      "name": "오세트어"
    },
    {
      "code": "pi",
      "name": "팔리어"
    },
    {
      "code": "ps",
      "name": "파슈토어"
    },
    {
      "code": "fa",
      "name": "페르시아어"
    },
    {
      "code": "pl",
      "name": "폴란드어"
    },
    {
      "code": "pt",
      "name": "포르투갈어"
    },
    {
      "code": "pa",
      "name": "펀자브어"
    },
    {
      "code": "qu",
      "name": "케추아어"
    },
    {
      "code": "ro",
      "name": "루마니아어"
    },
    {
      "code": "rm",
      "name": "로만슈어"
    },
    {
      "code": "rn",
      "name": "룬디어"
    },
    {
      "code": "ru",
      "name": "러시아어"
    },
    {
      "code": "se",
      "name": "북부 사미어"
    },
    {
      "code": "sm",
      "name": "사모아어"
    },
    {
      "code": "sg",
      "name": "상고어"
    },
    {
      "code": "sa",
      "name": "산스크리트어"
    },
    {
      "code": "sc",
      "name": "사르데냐어"
    },
    {
      "code": "sr",
      "name": "세르비아어"
    },
    {
      "code": "sn",
      "name": "쇼나어"
    },
    {
      "code": "ii",
      "name": "쓰촨 이어"
    },
    {
      "code": "sd",
      "name": "신디어"
    },
    {
      "code": "si",
      "name": "싱할라어"
    },
    {
      "code": "sk",
      "name": "슬로바키아어"
    },
    {
      "code": "sl",
      "name": "슬로베니아어"
    },
    {
      "code": "so",
      "name": "소말리어"
    },
    {
      "code": "st",
      "name": "남부 소토어"
    },
    {
      "code": "es",
      "name": "스페인어"
    },
    {
      "code": "su",
      "name": "순다어"
    },
    {
      "code": "sw",
      "name": "스와힐리어"
    },
    {
      "code": "ss",
      "name": "스와티어"
    },
    {
      "code": "sv",
      "name": "스웨덴어"
    },
    {
      "code": "tl",
      "name": "타갈로그어"
    },
    {
      "code": "ty",
      "name": "타히티어"
    },
    {
      "code": "tg",
      "name": "타지크어"
    },
    {
      "code": "ta",
      "name": "타밀어"
    },
    {
      "code": "tt",
      "name": "타타르어"
    },
    {
      "code": "te",
      "name": "텔루구어"
    },
    {
      "code": "th",
      "name": "태국어"
    },
    {
      "code": "bo",
      "name": "티베트어"
    },
    {
      "code": "ti",
      "name": "티그리냐어"
    },
    {
      "code": "to",
      "name": "통가어"
    },
    {
      "code": "ts",
      "name": "총가어"
    },
    {
      "code": "tn",
      "name": "츠와나어"
    },
    {
      "code": "tr",
      "name": "터키어"
    },
    {
      "code": "tk",
      "name": "투르크멘어"
    },
    {
      "code": "tw",
      "name": "트위어"
    },
    {
      "code": "ug",
      "name": "위구르어"
    },
    {
      "code": "uk",
      "name": "우크라이나어"
    },
    {
      "code": "ur",
      "name": "우르두어"
    },
    {
      "code": "uz",
      "name": "우즈베크어"
    },
    {
      "code": "ve",
      "name": "벤다어"
    },
    {
      "code": "vi",
      "name": "베트남어"
    },
    {
      "code": "vo",
      "name": "볼라퓌크어"
    },
    {
      "code": "wa",
      "name": "왈롱어"
    },
    {
      "code": "cy",
      "name": "웨일스어"
    },
    {
      "code": "wo",
      "name": "월로프어"
    },
    {
      "code": "xh",
      "name": "코사어"
    },
    {
      "code": "yi",
      "name": "이디시어"
    },
    {
      "code": "yo",
      "name": "요루바어"
    },
    {
      "code": "za",
      "name": "좡어"
    },
    {
      "code": "zu",
      "name": "줄루어"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "아프가니스탄"
    },
    {
      "code": "AL",
      "name": "알바니아"
    },
    {
      "code": "DZ",
      "name": "알제리"
    },
    {
      "code": "AS",
      "name": "아메리칸사모아"
    },
    {
      "code": "AD",
      "name": "안도라"
    },
    {
      "code": "AO",
      "name": "앙골라"
    },
    {
      "code": "AI",
      "name": "앵귈라"
    },
    {
      "code": "AQ",
      "name": "남극대륙"
    },
    {
      "code": "AG",
      "name": "안티구아 바부다"
    },
    {
      "code": "AR",
      "name": "아르헨티나"
    },
    {
      "code": "AM",
      "name": "아르메니아"
    },
    {
      "code": "AW",
      "name": "아루바"
    },
    {
      "code": "AU",
      "name": "호주"
    },
    {
      "code": "AT",
      "name": "오스트리아"
    },
    {
      "code": "AZ",
      "name": "아제르바이잔"
    },
    {
      "code": "BS",
      "name": "바하마"
    },
    {
      "code": "BH",
      "name": "바레인"
    },
    {
      "code": "BD",
      "name": "방글라데시"
    },
    {
      "code": "BB",
      "name": "바베이도스"
    },
    {
      "code": "BY",
      "name": "벨라루스"
    },
    {
      "code": "BE",
      "name": "벨기에"
    },
    {
      "code": "BZ",
      "name": "벨리즈"
    },
    {
      "code": "BJ",
      "name": "베냉"
    },
    {
      "code": "BM",
      "name": "버뮤다"
    },
    {
      "code": "BT",
      "name": "부탄"
    },
    {
      "code": "BO",
      "name": "볼리비아"
    },
    {
      "code": "BA",
      "name": "보스니아 헤르체고비나"
    },
    {
      "code": "BW",
      "name": "보츠와나"
    },
    {
      "code": "BR",
      "name": "브라질"
    },
    {
      "code": "IO",
      "name": "영국령 인도양 지역"
    },
    {
      "code": "VG",
      "name": "영국령 버진아일랜드"
    },
    {
      "code": "BN",
      "name": "브루나이"
    },
    {
      "code": "BG",
      "name": "불가리아"
    },
    {
      "code": "BF",
      "name": "부르키나파소"
    },
    {
      "code": "BI",
      "name": "부룬디"
    },
    {
      "code": "KH",
      "name": "캄보디아"
    },
    {
      "code": "CM",
      "name": "카메룬"
    },
    {
      "code": "CA",
      "name": "캐나다"
    },
    {
      "code": "CV",
      "name": "카보베르데"
    },
    {
      "code": "KY",
      "name": "케이맨 제도"
    },
    {
      "code": "CF",
      "name": "중앙아프리카 공화국"
    },
    {
      "code": "TD",
      "name": "차드"
    },
    {
      "code": "CL",
      "name": "칠레"
    },
    {
      "code": "CN",
      "name": "중국"
    },
    {
      "code": "CX",
      "name": "크리스마스섬"
    },
    {
      "code": "CC",
      "name": "코코스 제도"
    },
    {
      "code": "CO",
      "name": "콜롬비아"
    },
    {
      "code": "KM",
      "name": "코모로"
    },
    {
      "code": "CG",
      "name": "콩고 - 브라자빌"
    },
    {
      "code": "CD",
      "name": "콩고 - 킨샤사"
    },
    {
      "code": "CK",
      "name": "쿡 제도"
    },
    {
      "code": "CR",
      "name": "코스타리카"
    },
    {
      "code": "CI",
      "name": "코트디부아르"
    },
    {
      "code": "HR",
      "name": "크로아티아"
    },
    {
      "code": "CU",
      "name": "쿠바"
    },
    {
      "code": "CY",
      "name": "사이프러스"
    },
    {
      "code": "CZ",
      "name": "체코"
    },
    {
      "code": "DK",
      "name": "덴마크"
    },
    {
      "code": "DJ",
      "name": "지부티"
    },
    {
      "code": "DM",
      "name": "도미니카"
    },
    {
      "code": "DO",
      "name": "도미니카 공화국"
    },
    {
      "code": "EC",
      "name": "에콰도르"
    },
    {
      "code": "EG",
      "name": "이집트"
    },
    {
      "code": "SV",
      "name": "엘살바도르"
    },
    {
      "code": "GQ",
      "name": "적도 기니"
    },
    {
      "code": "ER",
      "name": "에리트레아"
    },
    {
      "code": "EE",
      "name": "에스토니아"
    },
    {
      "code": "SZ",
      "name": "에스와티니"
    },
    {
      "code": "ET",
      "name": "에티오피아"
    },
    {
      "code": "FJ",
      "name": "피지"
    },
    {
      "code": "FI",
      "name": "핀란드"
    },
    {
      "code": "FR",
      "name": "프랑스"
    },
    {
      "code": "GA",
      "name": "가봉"
    },
    {
      "code": "GM",
      "name": "감비아"
    },
    {
      "code": "GE",
      "name": "조지아"
    },
    {
      "code": "DE",
      "name": "독일"
    },
    {
      "code": "GH",
      "name": "가나"
    },
    {
      "code": "GR",
      "name": "그리스"
    },
    {
      "code": "GT",
      "name": "과테말라"
    },
    {
      "code": "GN",
      "name": "기니"
    },
    {
      "code": "GY",
      "name": "가이아나"
    },
    {
      "code": "HT",
      "name": "아이티"
    },
    {
      "code": "HN",
      "name": "온두라스"
    },
    {
      "code": "HK",
      "name": "홍콩"
    },
    {
      "code": "HU",
      "name": "헝가리"
    },
    {
      "code": "IS",
      "name": "아이슬란드"
    },
    {
      "code": "IN",
      "name": "인도"
    },
    {
      "code": "ID",
      "name": "인도네시아"
    },
    {
      "code": "IR",
      "name": "이란"
    },
    {
      "code": "IQ",
      "name": "이라크"
    },
    {
      "code": "IE",
      "name": "아일랜드"
    },
    {
      "code": "IL",
      "name": "이스라엘"
    },
    {
      "code": "IT",
      "name": "이탈리아"
    },
    {
      "code": "JM",
      "name": "자메이카"
    },
    {
      "code": "JP",
      "name": "일본"
    },
    {
      "code": "JO",
      "name": "요르단"
    },
    {
      "code": "KZ",
      "name": "카자흐스탄"
    },
    {
      "code": "KE",
      "name": "케냐"
    },
    {
      "code": "KR",
      "name": "대한민국"
    },
    {
      "code": "KW",
      "name": "쿠웨이트"
    },
    {
      "code": "KG",
      "name": "키르기스스탄"
    },
    {
      "code": "LA",
      "name": "라오스"
    },
    {
      "code": "LV",
      "name": "라트비아"
    },
    {
      "code": "LB",
      "name": "레바논"
    },
    {
      "code": "LS",
      "name": "레소토"
    },
    {
      "code": "LR",
      "name": "라이베리아"
    },
    {
      "code": "LY",
      "name": "리비아"
    },
    {
      "code": "LI",
      "name": "리히텐슈타인"
    },
    {
      "code": "LT",
      "name": "리투아니아"
    },
    {
      "code": "LU",
      "name": "룩셈부르크"
    },
    {
      "code": "MG",
      "name": "마다가스카르"
    },
    {
      "code": "MW",
      "name": "말라위"
    },
    {
      "code": "MY",
      "name": "말레이시아"
    },
    {
      "code": "MV",
      "name": "몰디브"
    },
    {
      "code": "ML",
      "name": "말리"
    },
    {
      "code": "MT",
      "name": "몰타"
    },
    {
      "code": "MX",
      "name": "멕시코"
    },
    {
      "code": "MD",
      "name": "몰도바"
    },
    {
      "code": "MC",
      "name": "모나코"
    },
    {
      "code": "MN",
      "name": "몽골"
    },
    {
      "code": "ME",
      "name": "몬테네그로"
    },
    {
      "code": "MA",
      "name": "모로코"
    },
    {
      "code": "MZ",
      "name": "모잠비크"
    },
    {
      "code": "MM",
      "name": "미얀마"
    },
    {
      "code": "NA",
      "name": "나미비아"
    },
    {
      "code": "NP",
      "name": "네팔"
    },
    {
      "code": "NL",
      "name": "네덜란드"
    },
    {
      "code": "NZ",
      "name": "뉴질랜드"
    },
    {
      "code": "NI",
      "name": "니카라과"
    },
    {
      "code": "NE",
      "name": "니제르"
    },
    {
      "code": "NG",
      "name": "나이지리아"
    },
    {
      "code": "MK",
      "name": "북마케도니아"
    },
    {
      "code": "NO",
      "name": "노르웨이"
    },
    {
      "code": "OM",
      "name": "오만"
    },
    {
      "code": "PK",
      "name": "파키스탄"
    },
    {
      "code": "PA",
      "name": "파나마"
    },
    {
      "code": "PG",
      "name": "파푸아뉴기니"
    },
    {
      "code": "PY",
      "name": "파라과이"
    },
    {
      "code": "PE",
      "name": "페루"
    },
    {
      "code": "PH",
      "name": "필리핀"
    },
    {
      "code": "PL",
      "name": "폴란드"
    },
    {
      "code": "PT",
      "name": "포르투갈"
    },
    {
      "code": "QA",
      "name": "카타르"
    },
    {
      "code": "RO",
      "name": "루마니아"
    },
    {
      "code": "RU",
      "name": "러시아"
    },
    {
      "code": "RW",
      "name": "르완다"
    },
    {
      "code": "SA",
      "name": "사우디아라비아"
    },
    {
      "code": "SN",
      "name": "세네갈"
    },
    {
      "code": "RS",
      "name": "세르비아"
    },
    {
      "code": "SG",
      "name": "싱가포르"
    },
    {
      "code": "SK",
      "name": "슬로바키아"
    },
    {
      "code": "SI",
      "name": "슬로베니아"
    },
    {
      "code": "ZA",
      "name": "남아프리카 공화국"
    },
    {
      "code": "ES",
      "name": "스페인"
    },
    {
      "code": "LK",
      "name": "스리랑카"
    },
    {
      "code": "SE",
      "name": "스웨덴"
    },
    {
      "code": "CH",
      "name": "스위스"
    },
    {
      "code": "TW",
      "name": "대만"
    },
    {
      "code": "TH",
      "name": "태국"
    },
    {
      "code": "TR",
      "name": "튀르키예"
    },
    {
      "code": "UG",
      "name": "우간다"
    },
    {
      "code": "UA",
      "name": "우크라이나"
    },
    {
      "code": "AE",
      "name": "아랍에미리트"
    },
    {
      "code": "GB",
      "name": "영국"
    },
    {
      "code": "US",
      "name": "미국"
    },
    {
      "code": "UY",
      "name": "우루과이"
    },
    {
      "code": "UZ",
      "name": "우즈베키스탄"
    },
    {
      "code": "VE",
      "name": "베네수엘라"
    },
    {
      "code": "VN",
      "name": "베트남"
    },
    {
      "code": "YE",
      "name": "예멘"
    },
    {
      "code": "ZM",
      "name": "잠비아"
    },
    {
      "code": "ZW",
      "name": "짐바브웨"
    }
  ]
};
