export default {
  step01: {
    title: "사람처럼 들리는 AI가 구독자를 위해 자동으로 뉴스레터를 작성합니다",
    subtitle: "얼마나 자주, <u>매월</u> 또는 <u>매주</u> 또는 <u>매일</u> 또는 <u>몇 시</u> 중에서 선택하세요"
  },
  step02: {
    title: "뉴스레터의 언어",
    subtitle: "“구독자의 언어가 다를 경우, 뉴스레터는 각 사용자의 특정 언어로도 발송됩니다”"
  },
  step03: {
    title: "리디렉션 (선택 사항)",
    subtitle: "사용자를 귀하의 페이지로 리디렉션하시겠습니까?",
    description: "여기에 귀하의 페이지 링크를 붙여넣을 수 있으며, AI가 생성한 이메일에서 얼마나 많은 사람이 들어오는지 집계합니다",
    placeholder: "https://your-page.com"
  },
  step04: {
    title: "AI가 선택하기를 원하는 뉴스의 종류",
    subtitle: "어떤 대화 주제 또는 토픽 (리디렉션 링크가 설정된 경우 그곳에서 유추, 그렇지 않으면 비워둠)",
    placeholder: "예: 인공지능, 마케팅, 건강..."
  },
  step05: {
    title: "서명 사용자 정의",
    subtitle: "시각적으로 디자인하거나 코드를 직접 편집하세요",
    visualEditor: "비주얼 에디터",
    htmlSource: "HTML 소스",
    livePreview: "실시간 미리보기",
    yourName: "당신의 이름",
    yourTitle: "당신의 직함",
    facebookProfile: "페이스북 프로필",
    instagramProfile: "인스타그램 프로필",
    editHtml: "HTML 직접 편집...",
    warning: "⚠️ 여기서 편집한 내용은 비주얼 에디터로 돌아가서 변경하면 덮어쓰여집니다."
  },
  step06: {
    title: "뉴스 소스",
    subtitle: "어떤 뉴스 웹사이트를 사용하시겠습니까?",
    description: "URL을 입력하거나 주제에 따라 저희가 선택해 드립니다.",
    descriptionSmall: "최고의 콘텐츠를 찾기 위해 웹사이트를 분석합니다. 몇 초 정도 걸릴 수 있습니다.",
    placeholder: "https://example.com",
    analyzing: "분석 중...",
    next: "다음",
    errors: {
      failedToGenerate: "선택기를 생성하지 못했습니다. 다시 시도하거나 URL을 확인하세요.",
      errorGenerating: "선택기를 생성하는 중 오류가 발생했습니다.",
      invalidUrl: "유효한 URL을 입력하거나 소스를 선택하세요."
    }
  },
  step07: {
    title: "콘텐츠 선택기",
    subtitle: "모든 웹사이트를 <strong>고유한 레이아웃을 가진 도서관</strong>으로 생각하세요.",
    explanation1: "이 <strong>'선택기'</strong>는 이 웹사이트를 위해 저희가 만든 특정 지도입니다. 메뉴 버튼과 광고를 무시하고 원하는 기사를 수집하기 위해 어디를 찾아야 하는지 시스템에 정확히 알려줍니다.",
    explanation2: "<strong>저희가 자동으로 이 지도를 채워 드렸습니다.</strong>",
    placeholder: "선택기 문자열...",
    regenerate: "선택기 재생성",
    regenerating: "재생성 중...",
    errors: {
      noUrl: "뉴스 소스 URL을 찾을 수 없습니다.",
      failedRegenerate: "선택기를 재생성하지 못했습니다.",
      errorRegenerate: "선택기를 재생성하는 중 오류가 발생했습니다."
    }
  },
  step08: {
    title: "미리보기",
    placeholder: "첫 번째 뉴스레터를 생성할 준비가 되셨나요?",
    generateBtn: "뉴스레터 이메일 생성",
    sentBtn: "전송되었습니다! 이메일을 확인하세요",
    sendTestBtn: "테스트 이메일 전송",
    regenerateBtn: "재생성",
    loading: {
      initializing: "초기화 중...",
      starting: "생성 시작...",
      scraping: "콘텐츠 스크래핑 중...",
      translating: "기사 번역 중...",
      formatting: "이메일 서식 지정 중...",
      sending: "이메일 제공업체에 연결 중...",
      authenticating: "인증 중...",
      sendingArticle: "기사 전송 중...",
      creating: "뉴스 소스 생성 중...",
      saving: "구성 저장 중...",
      finalizing: "설정 완료 중..."
    },
    errors: {
      generationFailed: "생성 실패: ",
      createFailed: "뉴스 소스를 생성하지 못했습니다. 다시 시도하세요.",
      errorCreating: "뉴스 소스 생성 오류: ",
      sendFailed: "이메일 전송 실패: "
    },
    defaultSubject: "생성된 뉴스레터 미리보기"
  },
  step09: {
    title: "귀하의 이메일에서 기사를 보내려면",
    subtitle: "앱 비밀번호 (선택 사항)",
    description: "(Gmail 서비스를 사용하는 경우 여기에 앱 비밀번호를 입력하세요)",
    label: "앱 비밀번호",
    placeholder: "귀하의 앱 비밀번호"
  },
  step10: {
    title: "Gmail 주소 (선택 사항)",
    subtitle: "Gmail 이메일 주소",
    description: "특정 Gmail 주소에서 보내고 싶은 경우",
    placeholder: "your-email@gmail.com"
  },
  step11: {
    title: "테스트 이메일 전송",
    subtitle: "구성을 확인하기 위해 자신에게 테스트 이메일을 보냅니다.",
    sendNow: "지금 전송",
    sent: "전송되었습니다! 이메일을 확인하세요",
    loading: {
      connecting: "이메일 제공업체에 연결 중...",
      authenticating: "인증 중...",
      sending: "기사 전송 중..."
    }
  },
  step12: {
    title: "이 뉴스레터를 팔로워와 공유하세요",
    subtitle: "구독 퍼널 링크 (이메일을 받기 시작하기 전에 귀하의 초대를 수락해야 합니다)",
    copy: "복사",
    copied: "링크가 복사되었습니다!"
  },
  step13: {
    title: "요금제 및 제한",
    currentPlan: "현재 요금제:",
    limits: "제한:",
    unknown: "알 수 없음",
    changePlan: "요금제 변경",
    advancedFeatures: "더 고급 기능이 필요하신가요?",
    developerText: "이 뉴스레터 구독 퍼널을 서버에 통합하고, 생성된 모든 기사의 블로그를 만들고, API 키를 사용하여 코드베이스에서 사용자를 구독시키려면 개발자 섹션을 확인하세요.",
    dashboardBtn: "대시보드로 이동",
    usage: "사용량:",
    limitDetails: {
      free: "사용자 100명 제한",
      starter: "소스 5개, 사용자 10만 명",
      growth: "소스 17개, 사용자 25만 명",
      pro: "소스 25개, 사용자 50만 명",
      master: "소스 50개, 사용자 무제한",
      vipfree: "VIP 무료"
    }
  }
};
