// ko strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale ko
export default {
  "billing": {
    "header": {
      "title": "결제 정보",
      "subtitle": "이 정보는 청구서에 표시됩니다. 다음 결제 페이지에서 카드 정보를 입력합니다."
    },
    "fields": {
      "firstName": {
        "label": "이름",
        "placeholder": "민수"
      },
      "lastName": {
        "label": "성",
        "placeholder": "김"
      },
      "email": {
        "label": "청구서를 받을 이메일",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "전화번호",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "국가 코드",
        "placeholder": "KR"
      },
      "address": {
        "label": "청구지 주소",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "도시",
        "placeholder": "서울"
      },
      "state": {
        "label": "주 또는 도",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "우편번호",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "두 글자로 입력하세요(예: US, MX, CR).",
      "state": "선택 사항입니다. 해당 국가에서 사용하지 않으면 비워 두세요.",
      "zip": "선택 사항입니다. 주소에 우편번호가 없으면 비워 두세요."
    },
    "errors": {
      "required": "계속하려면 이 항목을 입력하세요.",
      "email": "name@example.com과 같은 형식으로 이메일 주소를 입력하세요.",
      "country": "두 글자 국가 코드를 입력하세요(예: US)."
    },
    "optional": "선택 사항"
  }
};
