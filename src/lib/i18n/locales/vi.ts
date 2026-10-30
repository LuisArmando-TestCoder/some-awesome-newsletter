// vi strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale vi
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Đăng nhập",
      "title": "Đăng nhập vào AIBAN",
      "subtitle": "Kết nối để tiếp tục công việc của bạn.",
      "google": "Tiếp tục với Google",
      "or": "hoặc",
      "emailPlaceholder": "ban@example.com",
      "continueWithEmail": "Tiếp tục với email",
      "switchText": "Chưa có tài khoản?",
      "switchLink": "Đăng ký",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Đăng ký",
      "title": "Tạo tài khoản của bạn",
      "subtitle": "Bạn không cần thẻ tín dụng.",
      "google": "Tiếp tục với Google",
      "or": "hoặc",
      "emailPlaceholder": "ban@example.com",
      "continueWithEmail": "Tiếp tục với email",
      "switchText": "Đã có tài khoản?",
      "switchLink": "Đăng nhập",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Website của bạn thành bản tin bằng ngôn ngữ của từng người đọc",
      "description": "AIBAN đọc nội dung bạn đã đăng, viết một số bản tin theo giọng văn của bạn và gửi đi dưới tên bạn. Mỗi người đăng ký nhận bản tin bằng ngôn ngữ của chính họ.",
      "ogImageAlt": "Logo AIBAN"
    },
    "skipLink": "Chuyển đến nội dung chính",
    "hero": {
      "eyebrow": "Bản tin cho doanh nghiệp dịch vụ",
      "title": "Website của bạn thành bản tin hằng tuần, bằng ngôn ngữ của từng người đọc",
      "lead": "AIBAN đọc nội dung bạn đã đăng, viết một số bản tin theo giọng văn của bạn và gửi đi dưới tên bạn. Mỗi người đăng ký nhận bản tin bằng ngôn ngữ họ đọc. Bạn thiết lập một lần và bản tin cứ thế chạy tiếp.",
      "formLabel": "Website của bạn",
      "formPlaceholder": "congtycuaban.com",
      "formHint": "Chúng tôi tạo một số bản tin mẫu từ địa chỉ bạn nhập. Bắt đầu miễn phí và bạn không cần thẻ.",
      "formSubmit": "Xem trước bản tin của tôi",
      "formError": "Nhập địa chỉ web, ví dụ congtycuaban.com.",
      "secondaryCta": "Xem cách hoạt động"
    },
    "preview": {
      "badge": "Bản xem trước mẫu",
      "note": "Đây là bố cục mẫu với văn bản tạm. Khi bạn bắt đầu, AIBAN viết số bản tin thật từ bài viết mới nhất của bạn.",
      "fromLabel": "Từ",
      "toLabel": "Đến",
      "subjectLabel": "Tiêu đề",
      "languageLabel": "Ngôn ngữ người đọc",
      "readOnBlog": "Đọc trên blog",
      "startCta": "Bắt đầu miễn phí với {site}",
      "startCtaGeneric": "Bắt đầu miễn phí",
      "liveRegion": "Bản xem trước mẫu đã cập nhật cho {site}."
    },
    "chain": {
      "eyebrow": "Cách hoạt động",
      "title": "Nhập một lần, sau đó tự chạy",
      "lead": "Bạn chỉ cần đưa website cho AIBAN một lần. Sau đó, từng bước dưới đây tự diễn ra theo lịch bạn chọn.",
      "triggerLabel": "Khi",
      "actionLabel": "Thì",
      "trigger": {
        "title": "Đến 9:00 sáng thứ Hai",
        "body": "Hoặc bất kỳ lịch nào bạn chọn: hằng ngày, hằng tuần hoặc hằng tháng."
      },
      "steps": [
        {
          "title": "AIBAN tìm bài viết mới nhất của bạn",
          "body": "AIBAN kiểm tra website và chọn bài mà người đọc lý tưởng của bạn quan tâm nhất."
        },
        {
          "title": "Viết số bản tin theo giọng văn của bạn",
          "body": "Văn bản được viết lại cho giống cách bạn nói, dựa trên cách website của bạn được viết."
        },
        {
          "title": "Dịch số bản tin cho từng người đọc",
          "body": "Mỗi người đăng ký nhận bản tin bằng ngôn ngữ họ chọn khi đăng ký."
        },
        {
          "title": "Gửi đi dưới tên bạn",
          "body": "Người đọc thấy tên bạn, và thư trả lời của họ về hộp thư của bạn."
        },
        {
          "title": "Đăng số bản tin lên blog của bạn",
          "body": "Mỗi số cũng có một trang bài viết công khai với đường liên kết riêng."
        },
        {
          "title": "Cho bạn biết điều gì đã xảy ra",
          "body": "Bảng điều khiển liệt kê ai đã tham gia và người đọc nhấp vào liên kết nào."
        }
      ],
      "alsoTitle": "AIBAN cũng chạy khi",
      "also": [
        {
          "title": "Có người đăng ký trên website của bạn",
          "body": "Họ xác nhận qua email và bắt đầu nhận các số bản tin của bạn."
        },
        {
          "title": "Bạn dán một liên kết hoặc một đoạn văn bản",
          "body": "AIBAN viết và gửi một số bản tin về nội dung đó qua cùng các bước."
        },
        {
          "title": "Bạn tải lên danh sách liên hệ",
          "body": "AIBAN làm sạch danh sách, xóa trùng lặp và đoán ngôn ngữ của từng liên hệ."
        }
      ]
    },
    "languages": {
      "eyebrow": "Mọi ngôn ngữ",
      "title": "Mỗi người đọc nhận số bản tin bằng ngôn ngữ của mình",
      "body": "Bạn không cần viết các phiên bản riêng. AIBAN dịch mỗi số sang mọi ngôn ngữ mà người đăng ký của bạn đọc và giữ giọng văn của bạn trong từng ngôn ngữ. Danh sách gồm tiếng Tây Ban Nha, Bồ Đào Nha, Pháp, Đức, Hindi, Ả Rập, Nhật và nhiều ngôn ngữ khác.",
      "sampleNote": "Cùng một số bản tin mẫu, như ba người đọc sẽ nhận được."
    },
    "sender": {
      "eyebrow": "Địa chỉ của bạn",
      "title": "Gửi dưới tên bạn",
      "body": "Các số bản tin đến với tên và chữ ký email của bạn. AIBAN gửi chúng từ địa chỉ đã xác minh của mình, nên bạn không bao giờ phải chia sẻ mật khẩu email với chúng tôi. Khi người đọc trả lời, thư trả lời sẽ về hộp thư của bạn.",
      "inboxLabel": "Hiển thị trong hộp thư người đọc",
      "inboxFrom": "Bạn",
      "inboxSubject": "Tuần này từ {site}",
      "inboxSnippet": "Tóm tắt ngắn bài viết mới nhất của bạn, viết theo giọng văn của bạn.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Mở rộng danh sách",
      "title": "Biểu mẫu đăng ký cho website và một blog tự cập nhật",
      "items": [
        {
          "title": "Biểu mẫu đăng ký",
          "body": "Thêm biểu mẫu AIBAN vào website của bạn. Người đọc mới chọn ngôn ngữ và xác nhận qua email."
        },
        {
          "title": "Blog tự động",
          "body": "Mỗi số trở thành một trang bài viết công khai mà mọi người có thể tìm thấy qua tìm kiếm và chia sẻ bằng liên kết."
        },
        {
          "title": "Nhập danh bạ",
          "body": "Đưa khách hàng hiện có vào từ tệp CSV hoặc Excel, hoặc dán một danh sách."
        }
      ]
    },
    "useCases": {
      "eyebrow": "Dành cho ai",
      "title": "Dành cho doanh nghiệp phát triển nhờ các mối quan hệ",
      "lead": "Nếu khách hàng đến với bạn qua giới thiệu và sự tin tưởng, một lá thư đều đặn từ bạn giúp họ luôn nhớ đến bạn. AIBAN viết lá thư đó cho bạn.",
      "items": [
        {
          "title": "Agency và nhà thiết kế web",
          "body": "Gửi cho khách hàng và khách hàng tiềm năng các dự án và bài viết mới nhất mỗi tuần, và dùng cùng thiết lập cho website của khách hàng."
        },
        {
          "title": "Công ty IT và phần mềm",
          "body": "Biến ghi chú phát hành và bài blog thành bản cập nhật ngắn mà mỗi khách hàng đọc bằng ngôn ngữ của họ."
        },
        {
          "title": "Bất động sản",
          "body": "Chia sẻ tin đăng mới và bài viết về thị trường với người mua và người bán nói các ngôn ngữ khác nhau."
        },
        {
          "title": "Luật sư và kế toán",
          "body": "Cập nhật cho khách hàng về những chủ đề bạn đã viết, theo định dạng điềm tĩnh và nhất quán."
        },
        {
          "title": "Coach và huấn luyện viên",
          "body": "Gửi bài học hoặc bài viết mới nhất đến cộng đồng của bạn vào một ngày cố định, mà không phải viết lại."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Bảng giá",
      "title": "Bắt đầu miễn phí, nâng cấp khi danh sách lớn lên",
      "lead": "Gói miễn phí gồm 1 nguồn và tối đa 100 người đăng ký. Các gói trả phí có thêm nguồn và người đăng ký."
    },
    "faqTitle": "Câu hỏi thường gặp trước khi bắt đầu",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "Tôi cần gì để bắt đầu?",
        "a": "Địa chỉ website và một địa chỉ email. AIBAN đọc website của bạn để nắm các chủ đề và cách bạn viết."
      },
      {
        "id": "do-i-write",
        "q": "Tôi có phải viết gì không?",
        "a": "Bạn không cần viết. AIBAN viết mỗi số từ nội dung của bạn. Khi muốn một số về chủ đề cụ thể, bạn có thể dán liên kết hoặc văn bản."
      },
      {
        "id": "languages",
        "q": "Người đọc của tôi có thể nhận bằng những ngôn ngữ nào?",
        "a": "AIBAN dịch mỗi số sang ngôn ngữ mà từng người đăng ký đọc. Bạn có thể xem danh sách đầy đủ khi thiết lập bản tin."
      },
      {
        "id": "sender",
        "q": "Email được gửi từ ai?",
        "a": "Từ địa chỉ gửi của AIBAN, với tên bạn là người gửi. Thư trả lời về thẳng hộp thư của bạn. Bạn không bao giờ phải đưa mật khẩu email cho chúng tôi."
      },
      {
        "id": "contacts",
        "q": "Tôi có thể đưa danh bạ hiện có vào không?",
        "a": "Có. Tải lên tệp CSV hoặc Excel, hoặc dán danh sách. AIBAN làm sạch, xóa trùng lặp và đoán ngôn ngữ của từng liên hệ."
      },
      {
        "id": "schedule",
        "q": "Các số được gửi bao lâu một lần?",
        "a": "Bạn chọn lịch khi thiết lập và có thể thay đổi bất cứ lúc nào trong bảng điều khiển."
      },
      {
        "id": "free-plan",
        "q": "Có gói miễn phí không?",
        "a": "Có. Gói miễn phí gồm 1 nguồn và tối đa 100 người đăng ký. Các gói trả phí có thêm nguồn và người đăng ký."
      },
      {
        "id": "cancel",
        "q": "Tôi có thể hủy không?",
        "a": "Có. Hãy viết tới info@aiban.news bất cứ lúc nào, chúng tôi sẽ hủy gói trả phí hoặc chuyển bạn về gói Miễn phí."
      }
    ],
    "finalCta": {
      "title": "Bắt đầu với website của bạn",
      "body": "Đưa website cho AIBAN, xem số bản tin đầu tiên, rồi bật lên khi bạn sẵn sàng.",
      "cta": "Bắt đầu miễn phí",
      "secondary": "Đọc trung tâm trợ giúp"
    },
    "footer": {
      "tagline": "Bản tin được viết từ nội dung của chính bạn và gửi bằng ngôn ngữ của từng người đọc.",
      "product": "Sản phẩm",
      "company": "Công ty",
      "legal": "Pháp lý",
      "links": {
        "howItWorks": "Cách hoạt động",
        "pricing": "Bảng giá",
        "demo": "Demo",
        "help": "Trung tâm trợ giúp",
        "about": "Giới thiệu",
        "careers": "Tuyển dụng",
        "privacy": "Chính sách quyền riêng tư",
        "terms": "Điều khoản dịch vụ",
        "cookies": "Chính sách cookie"
      },
      "contactLabel": "Liên hệ",
      "rights": "Mọi quyền được bảo lưu."
    }
  },
  "help": {
    "title": "Yêu cầu nâng hạn mức",
    "subtitle": "Cho chúng tôi biết hạn mức bạn cần và chúng tôi sẽ trả lời qua email.",
    "contact": {
      "cta": "Gửi yêu cầu",
      "successTitle": "Yêu cầu đã sẵn sàng để gửi",
      "successBody": "Ứng dụng email của bạn đã mở kèm yêu cầu. Hãy gửi từ đó và chúng tôi sẽ trả lời qua email.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "Cho biết hạn mức bạn cần, ví dụ bao nhiêu người đăng ký và bao nhiêu nguồn.",
      "useCaseHelp": "Mô tả bạn gửi gì, cho ai và bao lâu một lần.",
      "expectedSpendHelp": "Ước tính sơ bộ giúp chúng tôi gợi ý gói phù hợp. Bạn có thể để là chưa rõ."
    },
    "form": {
      "nameLabel": "Tên",
      "emailLabel": "Email",
      "companyLabel": "Công ty",
      "optional": "(không bắt buộc)",
      "limitsLabel": "Giới hạn bạn cần",
      "useCaseLabel": "Bạn dùng AIBAN như thế nào",
      "spendLabel": "Chi phí dự kiến mỗi tháng",
      "spend": {
        "lt500": "Dưới 500 USD",
        "500_2k": "Từ 500 đến 2.000 USD",
        "2k_10k": "Từ 2.000 đến 10.000 USD",
        "gt10k": "Trên 10.000 USD",
        "unknown": "Tôi chưa biết"
      },
      "urgencyLabel": "Mức độ khẩn",
      "urgency": {
        "low": "Thấp",
        "normal": "Bình thường",
        "high": "Cao"
      },
      "replyLabel": "Chúng tôi nên trả lời bạn bằng cách nào?",
      "reply": {
        "email": "Qua email",
        "call": "Qua điện thoại"
      },
      "payAsYouGo": "Tôi muốn trả theo mức sử dụng",
      "sending": "Đang gửi...",
      "sentTitle": "Đã gửi yêu cầu",
      "sentBody": "Chúng tôi đã nhận được yêu cầu của bạn và sẽ trả lời qua địa chỉ email bạn cung cấp.",
      "retryBefore": "Nếu ứng dụng email của bạn không mở,",
      "retryLink": "hãy mở lại yêu cầu",
      "retryAfter": "hoặc viết tới",
      "errors": {
        "name": "Nhập tên của bạn (ít nhất 2 ký tự).",
        "email": "Nhập địa chỉ email để chúng tôi trả lời, ví dụ ten@example.com.",
        "company": "Nhập ít nhất 2 ký tự, hoặc để trống ô này.",
        "desiredLimits": "Mô tả giới hạn bạn cần, ít nhất 10 ký tự.",
        "useCase": "Mô tả cách bạn sử dụng, ít nhất 20 ký tự."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "Hạn mức cao hơn hoạt động như thế nào?",
        "a": "Gửi yêu cầu kèm hạn mức bạn cần. Chúng tôi trả lời qua email với các lựa chọn cho tài khoản của bạn."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "AIBAN làm gì?",
      "a": "AIBAN đọc nội dung bạn đã đăng, chẳng hạn website, blog của bạn hoặc các trang tin bạn chọn. AIBAN viết các số bản tin mới theo giọng văn của bạn và gửi đi dưới dạng bản tin. Mỗi người đăng ký nhận bản tin bằng ngôn ngữ họ đã chọn, với tên bạn là người gửi."
    },
    {
      "q": "Có gói miễn phí không?",
      "a": "Có. Gói Miễn phí gồm 1 nguồn và tối đa 100 người đăng ký. Nếu cần nhiều hơn, hãy viết cho chúng tôi và chúng tôi sẽ đổi gói cho bạn."
    },
    {
      "q": "Người đăng ký nhận bản tin bằng ngôn ngữ của họ như thế nào?",
      "a": "Mỗi người đăng ký chọn ngôn ngữ ưa thích khi đăng ký. AIBAN dịch mọi số sang ngôn ngữ đó trước khi gửi."
    },
    {
      "q": "Các số có thể gửi từ địa chỉ email của tôi không?",
      "a": "Các số bản tin được gửi từ địa chỉ gửi của AIBAN với tên và chữ ký email của bạn, còn thư trả lời về hộp thư của bạn. Chúng tôi không hỏi mật khẩu email của bạn, nên không có thông tin nào của bạn có thể bị lộ."
    },
    {
      "q": "Mọi người đăng ký bằng cách nào?",
      "a": "Bạn có một trang đăng ký và một widget đăng ký để đặt trên website. Bạn cũng có thể tự thêm người hoặc tải lên danh sách."
    },
    {
      "q": "Tôi có thể hủy bất cứ lúc nào không?",
      "a": "Có. Hãy viết tới info@aiban.news bất cứ lúc nào, chúng tôi sẽ hủy gói trả phí hoặc chuyển bạn về gói Miễn phí."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "hàng tháng",
      "hàng năm"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Miễn phí",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Dùng thử AIBAN với một nguồn",
        "featuresBase": [
          "1 nguồn",
          "Tối đa 100 người đăng ký"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Gói hiện tại",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Khởi đầu",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Cho các bản tin đang phát triển",
        "featuresBase": [
          "5 nguồn",
          "Tối đa 100 nghìn người đăng ký"
        ],
        "featuresDelta": [
          "Hỗ trợ qua email",
          "Dịch thuật cơ bản"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Chọn gói Khởi đầu",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Tăng trưởng",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Cho các bản tin đã có chỗ đứng",
        "featuresBase": [
          "17 nguồn",
          "Tối đa 250 nghìn người đăng ký"
        ],
        "featuresDelta": [
          "Tùy chỉnh thương hiệu",
          "Phân tích nâng cao"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Chọn gói Tăng trưởng",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Chuyên nghiệp",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Cho các chuyên gia marketing",
        "featuresBase": [
          "25 nguồn",
          "Tối đa 500 nghìn người đăng ký"
        ],
        "featuresDelta": [
          "Truy cập API",
          "Ưu tiên xử lý"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Chọn gói Chuyên nghiệp",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Bậc thầy",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Cho lượng độc giả lớn",
        "featuresBase": [
          "50 nguồn",
          "Không giới hạn người đăng ký"
        ],
        "featuresDelta": [
          "Hỗ trợ đặc biệt",
          "Webhooks tùy chỉnh"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Chọn gói Bậc thầy",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP Miễn phí",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Toàn quyền truy cập cho đối tác",
        "featuresBase": [
          "Không giới hạn nguồn",
          "Không giới hạn người đăng ký"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Gói hiện tại",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "Cần giải pháp tùy chỉnh?",
      "cta": "Liên hệ với chúng tôi",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Không tìm thấy bài viết.",
    "errorFetching": "Chúng tôi không tải được bài viết này. Hãy tải lại trang sau một phút để thử lại.",
    "noArticleSpecified": "Không có bài viết nào được chỉ định.",
    "goBack": "Quay lại",
    "loading": "Đang tải..."
  },
  "pricing": {
    "eyebrow": "Bảng giá",
    "title": "Gói và giá",
    "currentPlan": "Gói hiện tại:",
    "monthly": "Hàng tháng",
    "yearly": "Hằng năm",
    "yearlySave": "Tiết kiệm 35%",
    "intervalLabel": "Chu kỳ thanh toán",
    "billedYearly": "thanh toán hằng năm",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Bắt đầu miễn phí",
    "processing": "Đang mở trang thanh toán...",
    "askMore": "Mọi tài khoản đều bắt đầu với gói Miễn phí. Nếu cần nhiều hơn, hãy viết cho chúng tôi tại {email} và chúng tôi sẽ đổi gói cho bạn.",
    "askFor": "Yêu cầu gói {planName}",
    "askAction": "Viết cho chúng tôi",
    "checkoutError": "Chúng tôi không mở được trang thanh toán. Vui lòng thử lại sau ít phút.",
    "networkError": "Chúng tôi không kết nối được máy chủ. Kiểm tra kết nối và thử lại.",
    "includes": "Bao gồm",
    "pageMetaTitle": "Bảng giá | AIBAN",
    "pageMetaDescription": "Các gói và giá của AIBAN. Bắt đầu miễn phí với 1 nguồn và tối đa 100 người đăng ký, rồi chuyển sang gói tháng hoặc gói năm khi bạn cần nhiều hơn.",
    "pageTitle": "Bảng giá",
    "pageLead": "Bắt đầu với gói Miễn phí gồm 1 nguồn và tối đa 100 người đăng ký. Khi bạn cần thêm nguồn hoặc thêm người đăng ký, hãy viết cho chúng tôi và chúng tôi sẽ chuyển bạn sang gói trả phí, thanh toán theo tháng hoặc theo năm.",
    "faqTitle": "Câu hỏi về thanh toán",
    "contactText": "Cần hạn mức cao hơn hoặc thiết lập riêng?",
    "contactCta": "Liên hệ với chúng tôi",
    "everythingIn": "Tất cả tính năng của gói trước, cộng thêm:",
    "isCurrentPlan": "Đây là gói hiện tại của bạn",
    "downgradeTo": "Chuyển sang {planName}",
    "upgradeTo": "Chọn {planName}",
    "mockMode": "Chế độ thử nghiệm",
    "mostPopular": "Phổ biến nhất",
    "perMonth": "mỗi tháng",
    "perYear": "mỗi năm",
    "youSave": "Bạn tiết kiệm được"
  },
  "confirmSubscription": {
    "title": "Xác nhận đăng ký của bạn",
    "goBack": "Quay lại",
    "pleaseAccept": "Vui lòng chấp nhận các điều khoản để hoàn tất đăng ký.",
    "iAccept": "Tôi chấp nhận",
    "termsAndConditions": "Điều khoản & Điều kiện",
    "and": "và",
    "privacyPolicy": "Chính sách bảo mật",
    "confirm": "Xác nhận đăng ký",
    "mustAccept": "Bạn phải chấp nhận điều khoản để đăng ký.",
    "invalidLink": "Liên kết xác nhận này không đầy đủ. Hãy mở email mới nhất chúng tôi gửi và dùng liên kết trong đó."
  },
  "articles": {
    "title": "Bài viết mới nhất",
    "subtitle": "Các bài viết AIBAN đã viết cho những bản tin mà AIBAN gửi đi.",
    "producedIn": "Các ngôn ngữ có sẵn của những bài viết này",
    "searchPlaceholder": "Tìm kiếm bài viết...",
    "noArticlesFound": "Không tìm thấy bài viết nào.",
    "created": "Đã tạo:",
    "language": "Ngôn ngữ:",
    "rightsReserved": "Bảo lưu mọi quyền.",
    "errorFetching": "Chúng tôi không tải được các bài viết. Hãy tải lại trang sau một phút để thử lại."
  },
  "blog": {
    "metaTitle": "Blog của {name}",
    "metaDescription": "Bài viết từ {name}. Đăng ký để nhận bài mới qua email.",
    "eyebrow": "Blog bản tin",
    "heroFrom": "Bài viết từ {name}",
    "heroDescription": "Đây là các bài viết mà bản tin này đã đăng. Đăng ký để nhận bài mới qua email.",
    "subscribe": "Đăng ký",
    "home": "Trang chủ blog",
    "featured": "Bài viết mới nhất",
    "latest": "Bài viết mới nhất",
    "latestHint": "Mới nhất trước. Một số bài không có ảnh nên chỉ hiển thị văn bản.",
    "articleCount": "{count} bài viết bằng {language}",
    "articleCountOne": "1 bài viết bằng {language}",
    "languages": "Chọn ngôn ngữ",
    "minRead": "{n} phút đọc",
    "readArticle": "Đọc bài viết",
    "page": "Trang {page}",
    "newer": "Bài mới hơn",
    "older": "Bài cũ hơn",
    "pagination": "Các trang bài viết",
    "emptyTitle": "Chưa có bài viết",
    "emptyBody": "Bản tin này chưa đăng bài viết nào ở đây. Đăng ký để nhận bài đầu tiên qua email.",
    "endTitle": "Không còn bài cũ hơn",
    "endBody": "Bạn đã đến cuối danh sách.",
    "backToNewest": "Đến các bài mới nhất",
    "errorTitle": "Chúng tôi không tải được các bài viết này",
    "errorBody": "Máy chủ bài viết không phản hồi kịp. Tải lại trang sau một phút để thử lại.",
    "reload": "Tải lại trang",
    "missingHolder": "Liên kết blog này chưa đầy đủ vì không cho biết mở blog của ai. Hãy xin chủ bản tin liên kết đầy đủ.",
    "redirecting": "Đang mở blog...",
    "publishedWith": "Đăng bằng AIBAN",
    "cta": {
      "title": "Nhận bài tiếp theo qua email",
      "body": "Đăng ký {name} và bài mới sẽ đến hộp thư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.",
      "button": "Đăng ký"
    },
    "search": {
      "label": "Tìm bài viết",
      "placeholder": "Tìm theo từ hoặc cụm từ",
      "button": "Tìm",
      "suggestions": "Gợi ý",
      "recent": "Tìm kiếm gần đây",
      "clearRecent": "Xóa tìm kiếm gần đây",
      "title": "Kết quả tìm kiếm",
      "resultsFor": "Kết quả cho \"{q}\"",
      "count": "Tìm thấy {count} bài viết",
      "countOne": "Tìm thấy 1 bài viết",
      "searching": "Đang tìm bài viết",
      "emptyTitle": "Không có bài viết nào khớp với \"{q}\"",
      "emptyBody": "Kiểm tra chính tả hoặc thử từ ngắn hơn. Bạn cũng có thể xem mọi bài viết trên blog.",
      "browseAll": "Xem tất cả bài viết",
      "noQuery": "Nhập từ hoặc cụm từ ở trên để tìm trong blog này.",
      "error": "Tìm kiếm đã dừng vì máy chủ bài viết không phản hồi. Thử lại sau một phút.",
      "tryAgain": "Thử lại",
      "limitNote": "Đang hiển thị {count} kết quả đầu tiên. Dùng cụm từ cụ thể hơn để thu hẹp danh sách."
    },
    "article": {
      "back": "Tất cả bài viết",
      "published": "Đăng ngày {date}",
      "by": "Bởi {name}",
      "otherLanguages": "Đọc bằng ngôn ngữ khác",
      "otherLanguagesHint": "Bản tin này cũng đăng bằng các ngôn ngữ sau. Mỗi liên kết mở blog bằng ngôn ngữ đó.",
      "share": "Chia sẻ bài viết này",
      "copyLink": "Sao chép liên kết",
      "copied": "Đã sao chép liên kết. Bạn có thể dán ở bất cứ đâu.",
      "copyFailed": "Không sao chép được liên kết. Hãy sao chép từ thanh địa chỉ của trình duyệt.",
      "notFoundTitle": "Không tìm thấy bài viết",
      "notFoundBody": "Bài viết này có thể đã bị xóa, hoặc liên kết chưa đầy đủ. Mở blog để xem các bài khác.",
      "errorTitle": "Chúng tôi không tải được bài viết này",
      "errorBody": "Máy chủ bài viết không phản hồi kịp. Tải lại trang sau một phút để thử lại.",
      "goToBlog": "Đến blog"
    }
  },
  "nav": {
    "mainLabel": "Chính",
    "legalLabel": "Pháp lý",
    "home": "Trang chủ AIBAN",
    "menu": "Menu",
    "openMenu": "Mở menu",
    "closeMenu": "Đóng menu",
    "howItWorks": "Cách hoạt động",
    "pricing": "Bảng giá",
    "help": "Trợ giúp",
    "about": "Giới thiệu",
    "privacy": "Quyền riêng tư",
    "terms": "Điều khoản",
    "cookies": "Cookie",
    "signOut": "Đăng xuất",
    "chooseLanguage": "Chọn ngôn ngữ",
    "currentLanguage": "Ngôn ngữ: {name}"
  },
  "about": {
    "metaTitle": "Giới thiệu | AIBAN",
    "metaDescription": "AIBAN biến nội dung mà một doanh nghiệp đã đăng thành bản tin tự động gửi đi, bằng ngôn ngữ của từng người đăng ký, dưới tên chủ doanh nghiệp.",
    "eyebrow": "Giới thiệu",
    "title": "Về AIBAN",
    "lead": "AIBAN biến nội dung mà một doanh nghiệp đã đăng thành bản tin tự động gửi đi. Mỗi người đăng ký đọc bản tin bằng ngôn ngữ của mình, và bản tin đến dưới tên chủ doanh nghiệp.",
    "whatTitle": "AIBAN làm gì",
    "whatBody": [
      "Bạn cho AIBAN biết nội dung của bạn ở đâu: website, blog hoặc các trang tin bạn theo dõi. Khi có nội dung mới ở đó, AIBAN viết một số bản tin theo giọng văn bạn mô tả và gửi đến người đăng ký theo lịch bạn chọn.",
      "Mỗi người đăng ký chọn một ngôn ngữ khi đăng ký, và mỗi số được dịch sang ngôn ngữ đó trước khi gửi. Các bài viết cũng được đăng thành trang web, và bạn có thể gửi chúng đến website của mình."
    ],
    "whoTitle": "Ai làm ra AIBAN",
    "whoBody": [
      "AIBAN do nhà sáng lập Luis Murillo Baltodano xây dựng. Luis là một kỹ sư sáng tạo có nền tảng về đồ họa máy tính và tự động hóa.",
      "Một số dự án mã nguồn mở của anh được liệt kê bên dưới."
    ],
    "projectsTitle": "Dự án mã nguồn mở của nhà sáng lập",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Thư viện giúp bỏ bớt mã lặp lại khi làm việc với Three.js và các API web 3D."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Các hàm hỗ trợ cho những tác vụ Canvas API thường gặp."
      },
      {
        "name": "Mẫu Atomic Gatsby",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Mẫu khởi đầu được tổ chức theo atomic design."
      }
    ],
    "githubLabel": "Luis trên GitHub",
    "newTab": "(mở trong thẻ mới)",
    "contactTitle": "Liên hệ",
    "contactBody": "Nếu có câu hỏi, góp ý hoặc ý tưởng hợp tác, hãy viết đến info@aiban.news.",
    "emailCta": "Gửi email đến info@aiban.news",
    "startCta": "Bắt đầu miễn phí",
    "helpCta": "Đọc trung tâm trợ giúp"
  },
  "careers": {
    "metaTitle": "Tuyển dụng | AIBAN",
    "metaDescription": "Hiện AIBAN chưa có vị trí tuyển dụng. Bạn vẫn có thể viết cho chúng tôi tại info@aiban.news.",
    "eyebrow": "Tuyển dụng",
    "title": "Làm việc tại AIBAN",
    "lead": "Hiện AIBAN chưa có vị trí tuyển dụng.",
    "body": "Khi có vị trí mới, vị trí đó sẽ được liệt kê trên trang này. Nếu bạn muốn làm việc với AIBAN sau này, hãy gửi một ghi chú ngắn về bản thân và điều bạn muốn xây dựng.",
    "emailCta": "Gửi email đến info@aiban.news",
    "emailSubject": "Làm việc với AIBAN",
    "aboutCta": "Đọc về AIBAN"
  },
  "legal": {
    "navLabel": "Văn bản pháp lý",
    "lastUpdated": "Cập nhật lần cuối: {date}",
    "privacy": {
      "title": "Chính sách quyền riêng tư",
      "metaTitle": "Chính sách quyền riêng tư | AIBAN",
      "metaDescription": "Cách AIBAN thu thập, sử dụng và bảo vệ dữ liệu của bạn, và cách bạn thực hiện các quyền về dữ liệu."
    },
    "terms": {
      "title": "Điều khoản dịch vụ",
      "metaTitle": "Điều khoản dịch vụ | AIBAN",
      "metaDescription": "Các điều khoản áp dụng khi bạn tạo tài khoản và sử dụng AIBAN."
    },
    "cookies": {
      "title": "Chính sách cookie",
      "metaTitle": "Chính sách cookie | AIBAN",
      "metaDescription": "AIBAN dùng những cookie nào, chúng làm gì, tồn tại bao lâu và bạn có thể kiểm soát chúng ra sao."
    }
  },
  "demoPage": {
    "metaTitle": "Demo | AIBAN",
    "metaDescription": "Xem video hướng dẫn AIBAN và những gì diễn ra sau khi bạn đăng ký, từ việc thêm website đến gửi số bản tin đầu tiên.",
    "eyebrow": "Demo",
    "title": "Xem AIBAN hoạt động như thế nào",
    "lead": "Xem video hướng dẫn, rồi đọc những gì diễn ra sau khi bạn đăng ký.",
    "videoTitle": "Video hướng dẫn AIBAN",
    "playLabel": "Phát video hướng dẫn",
    "videoNote": "Video được phát từ YouTube.",
    "stepsTitle": "Điều gì diễn ra sau khi bạn đăng ký",
    "steps": [
      {
        "title": "Thêm website của bạn",
        "body": "Nhập địa chỉ website, blog hoặc trang tin bạn theo dõi. AIBAN đọc trang đó để tìm nội dung mới."
      },
      {
        "title": "Mô tả người đọc và giọng văn của bạn",
        "body": "Cho AIBAN biết ai đọc bản tin của bạn và bản tin nên có giọng như thế nào. Bạn cũng có thể để AIBAN gợi ý mô tả từ website của bạn."
      },
      {
        "title": "Chọn lịch gửi",
        "body": "Chọn tần suất gửi các số. Bạn có thể thay đổi sau trong bảng điều khiển."
      },
      {
        "title": "Thêm người đăng ký",
        "body": "Tải lên danh sách, thêm từng người hoặc chia sẻ trang và widget đăng ký. Mỗi người đăng ký chọn một ngôn ngữ."
      },
      {
        "title": "Thêm tên người gửi và chữ ký",
        "body": "Thêm tên và chữ ký email mà người đọc sẽ thấy. AIBAN gửi từng số bản tin từ địa chỉ đã xác minh của mình dưới tên bạn, và thư trả lời về hộp thư của bạn."
      }
    ],
    "ctaTitle": "Thử với website của chính bạn",
    "ctaBody": "Gói miễn phí gồm 1 nguồn và tối đa 100 người đăng ký.",
    "primaryCta": "Bắt đầu miễn phí",
    "secondaryCta": "Xem bảng giá"
  },
  "helpCenter": {
    "metaTitle": "Trợ giúp | AIBAN",
    "metaDescription": "Giải đáp về việc thiết lập AIBAN: nguồn, ngôn ngữ, gửi dưới tên bạn, người đăng ký, widget đăng ký, blog và thanh toán.",
    "eyebrow": "Trung tâm trợ giúp",
    "title": "Chúng tôi có thể giúp gì?",
    "lead": "Tìm câu trả lời về cách thiết lập và vận hành bản tin. Nếu không tìm thấy điều bạn cần, hãy viết cho chúng tôi.",
    "searchLabel": "Tìm trong trung tâm trợ giúp",
    "searchPlaceholder": "Thử ngôn ngữ, widget hoặc hủy",
    "clearSearch": "Xóa tìm kiếm",
    "resultsCount": "{count} câu trả lời khớp với tìm kiếm của bạn.",
    "noResults": "Không có câu trả lời nào khớp. Thử từ khác hoặc gửi email đến info@aiban.news.",
    "topicsLabel": "Chủ đề",
    "copyLink": "Sao chép liên kết",
    "linkCopied": "Đã sao chép liên kết",
    "contactTitle": "Vẫn cần trợ giúp?",
    "contactBody": "Viết đến info@aiban.news và ghi kèm địa chỉ email bạn đã dùng để đăng ký.",
    "emailCta": "Gửi email đến info@aiban.news",
    "limitsTitle": "Yêu cầu hạn mức cao hơn",
    "limitsBody": "Hãy cho chúng tôi biết giới hạn bạn cần và chúng tôi sẽ trả lời qua email. Nếu yêu cầu không gửi được từ trang này, ứng dụng email của bạn sẽ mở ra với nội dung đã điền sẵn để bạn gửi cho chúng tôi.",
    "faqFilterLabel": "Lọc câu hỏi",
    "faqNoMatch": "Không có câu hỏi nào khớp với bộ lọc của bạn.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Bắt đầu",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "AIBAN là gì?",
            "a": "AIBAN biến nội dung bạn đã đăng thành bản tin định kỳ. AIBAN đọc website, blog hoặc các trang tin bạn chọn, viết các số mới theo giọng văn của bạn và gửi đến người đăng ký. Mỗi người đăng ký đọc bằng ngôn ngữ họ đã chọn."
          },
          {
            "id": "how-to-start",
            "q": "Tôi bắt đầu như thế nào?",
            "a": "Tạo tài khoản trên trang đăng ký. Phần thiết lập sẽ hỏi địa chỉ website và một vài thông tin về người đọc của bạn. Sau đó bạn có thể thêm người đăng ký và quản lý mọi thứ từ bảng điều khiển."
          },
          {
            "id": "change-settings",
            "q": "Tôi có thể thay đổi thiết lập sau không?",
            "a": "Có. Bạn có thể đổi nguồn, lịch gửi, thông tin người gửi và người đăng ký sau trong bảng điều khiển. Để đổi gói, hãy viết tới info@aiban.news."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Nguồn và nội dung",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "Tôi có thể dùng gì làm nguồn?",
            "a": "Nguồn là một địa chỉ web mà AIBAN đọc để tìm nội dung mới, như website, blog hoặc trang tin bạn theo dõi. Bạn thêm nguồn trong bảng điều khiển. Số nguồn bạn có thể thêm tùy theo gói của bạn."
          },
          {
            "id": "how-often",
            "q": "Bản tin của tôi được gửi bao lâu một lần?",
            "a": "Bạn chọn tần suất đăng khi thiết lập nguồn. Bạn có thể thay đổi lịch sau trong bảng điều khiển."
          },
          {
            "id": "your-voice",
            "q": "AIBAN viết theo giọng văn của tôi bằng cách nào?",
            "a": "Bạn mô tả tính cách của bản tin, hoặc để AIBAN tạo mô tả cho bạn. Các số được viết theo mô tả đó. Bạn có thể sửa mô tả bất cứ lúc nào trong bảng điều khiển."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Ngôn ngữ",
        "items": [
          {
            "id": "subscriber-language",
            "q": "Người đăng ký nhận bản tin bằng ngôn ngữ của họ như thế nào?",
            "a": "Mỗi người đăng ký chọn ngôn ngữ ưa thích khi đăng ký. AIBAN dịch mọi số sang ngôn ngữ đó trước khi gửi."
          },
          {
            "id": "site-language",
            "q": "Tôi có thể dùng trang web bằng ngôn ngữ của mình không?",
            "a": "Có. Dùng nút ngôn ngữ ở góc dưới bên phải màn hình để đổi ngôn ngữ của trang web và bảng điều khiển."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Gửi dưới tên bạn",
        "items": [
          {
            "id": "own-address",
            "q": "Các số có thể gửi từ địa chỉ email của tôi không?",
            "a": "Các số bản tin được gửi từ địa chỉ gửi của AIBAN với tên người gửi và chữ ký email của bạn, còn thư trả lời về hộp thư của bạn. Chúng tôi không hỏi mật khẩu email của bạn, nên không có thông tin nào của bạn có thể bị lộ."
          },
          {
            "id": "app-password",
            "q": "Tôi có cần đưa mật khẩu email cho AIBAN không?",
            "a": "Không. AIBAN không bao giờ hỏi mật khẩu email hay mật khẩu ứng dụng của bạn. Các số bản tin được gửi từ địa chỉ của AIBAN dưới tên bạn, và thư trả lời về cho bạn."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Người đăng ký và widget đăng ký",
        "items": [
          {
            "id": "add-subscribers",
            "q": "Tôi thêm người đăng ký như thế nào?",
            "a": "Bạn có thể thêm từng người trong bảng điều khiển hoặc tải lên tệp chứa danh sách. Mọi người cũng có thể tham gia qua trang đăng ký hoặc widget đăng ký."
          },
          {
            "id": "signup-widget",
            "q": "Widget đăng ký là gì?",
            "a": "Widget là một biểu mẫu đăng ký mà bạn có thể đặt trên website của mình. Khách truy cập nhập địa chỉ email, chọn ngôn ngữ và tham gia danh sách của bạn."
          },
          {
            "id": "subscriber-limit",
            "q": "Có giới hạn số người đăng ký không?",
            "a": "Mỗi gói có giới hạn người đăng ký riêng. Gói miễn phí gồm tối đa 100 người đăng ký. Trang bảng giá liệt kê giới hạn của các gói khác."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "Bài viết trong bản tin của tôi có được đăng lên web không?",
            "a": "Có. Các bài AIBAN viết cho bản tin của bạn cũng được đăng thành trang web, để mọi người có thể đọc ngoài hộp thư."
          },
          {
            "id": "post-to-site",
            "q": "Tôi có thể đăng bài lên website của mình không?",
            "a": "Có. Trong bảng điều khiển, bạn có thể thiết lập một webhook gửi từng bài viết của bản tin lên website của bạn dưới dạng bài đăng. Tính năng này hoạt động với WordPress và với mọi nền tảng nhận nội dung REST chuẩn."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Thanh toán",
        "items": [
          {
            "id": "free-plan",
            "q": "Có gói miễn phí không?",
            "a": "Có. Gói miễn phí gồm 1 nguồn và tối đa 100 người đăng ký. Bạn có thể chuyển sang gói trả phí khi cần nhiều hơn."
          },
          {
            "id": "monthly-yearly",
            "q": "Tôi có thể trả theo tháng hoặc theo năm không?",
            "a": "Có. Các gói trả phí được tính theo tháng hoặc theo năm. Giá năm thấp hơn 35% so với trả theo tháng trong 12 tháng. Hãy viết tới info@aiban.news để chọn gói."
          },
          {
            "id": "cancel",
            "q": "Tôi có thể hủy bất cứ lúc nào không?",
            "a": "Có. Hãy viết tới info@aiban.news bất cứ lúc nào, chúng tôi sẽ hủy gói trả phí hoặc chuyển bạn về gói Miễn phí."
          },
          {
            "id": "higher-limits",
            "q": "Nếu tôi cần nhiều hơn gói lớn nhất thì sao?",
            "a": "Dùng biểu mẫu yêu cầu trên trang trợ giúp để cho chúng tôi biết hạn mức bạn cần. Chúng tôi sẽ trả lời qua email."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Chuyển đến nội dung chính",
    "dismissAnnouncement": "Đóng thông báo",
    "problem": "Vấn đề:",
    "outcome": "Kết quả:",
    "disclaimer": "Mức tiết kiệm 35% chỉ áp dụng cho hình thức thanh toán hàng năm."
  },
  "authForm": {
    "emailValidation": "Nhập địa chỉ email, ví dụ ten@example.com.",
    "failedToSendCode": "Chúng tôi không gửi được mã. Hãy kiểm tra địa chỉ email và thử lại sau một phút.",
    "sending": "Đang gửi...",
    "codeSent": "Chúng tôi đã gửi mã tới email của bạn.",
    "invalidCode": "Mã đó không đúng. Hãy xem email mới nhất chúng tôi gửi, hoặc gửi lại mã.",
    "regenerateCode": "Gửi lại mã",
    "back": "Quay lại",
    "byProceeding": "Bằng cách tiếp tục, bạn đồng ý với",
    "termsOfService": "Điều khoản dịch vụ",
    "and": "và",
    "privacyPolicy": "Chính sách bảo mật",
    "appName": "AI Newsletter"
  },
  "welcome": {
    "title": "Trình tạo bản tin tự động",
    "setItOnce": "Thiết lập một lần.",
    "useItForever": "Sau đó bản tin cứ thế chạy tiếp."
  },
  "lead": {
    "title": "Biến người đăng ký thành khách truy cập",
    "recommendation": "Giúp AI hiểu thương hiệu của bạn bằng cách kết nối trang web.",
    "question": "Bạn có website không? (không bắt buộc, bạn có thể thêm sau)",
    "placeholder": "https://trang-web-cua-ban.com"
  },
  "newsSource": {
    "title": "Kết nối nguồn nội dung",
    "subtitle": "Chúng tôi sẽ lấy dữ liệu nguồn để bạn không phải bắt đầu từ con số không.",
    "placeholder": "Link Blog hoặc RSS của bạn"
  },
  "subscribe": {
    "welcome": {
      "title": "Chào mừng bạn đến với bản tin.",
      "invitedBy": "Bạn đã được mời bởi {configuratorId}."
    }
  },
  "header": {
    "goToWorkspace": "Mở bảng điều khiển",
    "inBilling": "Bảng giá",
    "vip": "VIP",
    "plan": "Gói {planName}",
    "logIn": "Đăng nhập",
    "getStarted": "Bắt đầu miễn phí"
  },
  "fileInput": {
    "chooseFile": "Chọn tệp",
    "dropFile": "Thả tệp vào đây",
    "release": "Thả để tải lên"
  },
  "billing": {
    "title": "Thanh toán và gói đăng ký",
    "currentPlanTitle": "Gói hiện tại của bạn",
    "upgradePlanTitle": "Đổi gói",
    "manageSubscription": "Quản lý gói đăng ký",
    "vipPlanName": "VIP Partner",
    "vipPlanDescription": "Quyền truy cập không giới hạn do AIBAN tặng.",
    "perMonth": "mỗi tháng",
    "perYear": "mỗi năm",
    "monthAbbreviation": "tháng",
    "equivalentTo": "tương đương với",
    "mostPopular": "Phổ biến nhất",
    "upgradeTo": "Nâng cấp lên",
    "downgradeTo": "Chuyển xuống",
    "currentPlanButton": "Gói của bạn",
    "youSave": "Bạn tiết kiệm được",
    "users": "người dùng",
    "newsSources": "nguồn tin",
    "monthly": "Hàng tháng",
    "yearly": "Hàng năm",
    "loadingPlan": "Đang tải dữ liệu gói..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Tiếng Abkhaz"
    },
    {
      "code": "aa",
      "name": "Tiếng Afar"
    },
    {
      "code": "af",
      "name": "Tiếng Afrikaans"
    },
    {
      "code": "ak",
      "name": "Tiếng Akan"
    },
    {
      "code": "sq",
      "name": "Tiếng Albania"
    },
    {
      "code": "am",
      "name": "Tiếng Amharic"
    },
    {
      "code": "ar",
      "name": "Tiếng Ả Rập"
    },
    {
      "code": "an",
      "name": "Tiếng Aragonese"
    },
    {
      "code": "hy",
      "name": "Tiếng Armenia"
    },
    {
      "code": "as",
      "name": "Tiếng Assamese"
    },
    {
      "code": "av",
      "name": "Tiếng Avaric"
    },
    {
      "code": "ae",
      "name": "Tiếng Avestan"
    },
    {
      "code": "ay",
      "name": "Tiếng Aymara"
    },
    {
      "code": "az",
      "name": "Tiếng Azerbaijani"
    },
    {
      "code": "bm",
      "name": "Tiếng Bambara"
    },
    {
      "code": "ba",
      "name": "Tiếng Bashkir"
    },
    {
      "code": "eu",
      "name": "Tiếng Basque"
    },
    {
      "code": "be",
      "name": "Tiếng Belarus"
    },
    {
      "code": "bn",
      "name": "Tiếng Bengali"
    },
    {
      "code": "bi",
      "name": "Tiếng Bislama"
    },
    {
      "code": "bs",
      "name": "Tiếng Bosnia"
    },
    {
      "code": "br",
      "name": "Tiếng Breton"
    },
    {
      "code": "bg",
      "name": "Tiếng Bulgaria"
    },
    {
      "code": "my",
      "name": "Tiếng Miến Điện"
    },
    {
      "code": "ca",
      "name": "Tiếng Catalan"
    },
    {
      "code": "ch",
      "name": "Tiếng Chamorro"
    },
    {
      "code": "ce",
      "name": "Tiếng Chechen"
    },
    {
      "code": "ny",
      "name": "Tiếng Chichewa"
    },
    {
      "code": "zh",
      "name": "Tiếng Trung"
    },
    {
      "code": "cu",
      "name": "Tiếng Slavonic nhà thờ"
    },
    {
      "code": "cv",
      "name": "Tiếng Chuvash"
    },
    {
      "code": "kw",
      "name": "Tiếng Cornish"
    },
    {
      "code": "co",
      "name": "Tiếng Corsican"
    },
    {
      "code": "cr",
      "name": "Tiếng Cree"
    },
    {
      "code": "hr",
      "name": "Tiếng Croatia"
    },
    {
      "code": "cs",
      "name": "Tiếng Séc"
    },
    {
      "code": "da",
      "name": "Tiếng Đan Mạch"
    },
    {
      "code": "dv",
      "name": "Tiếng Divehi"
    },
    {
      "code": "nl",
      "name": "Tiếng Hà Lan"
    },
    {
      "code": "dz",
      "name": "Tiếng Dzongkha"
    },
    {
      "code": "en",
      "name": "Tiếng Anh"
    },
    {
      "code": "eo",
      "name": "Tiếng Esperanto"
    },
    {
      "code": "et",
      "name": "Tiếng Estonia"
    },
    {
      "code": "ee",
      "name": "Tiếng Ewe"
    },
    {
      "code": "fo",
      "name": "Tiếng Faroe"
    },
    {
      "code": "fj",
      "name": "Tiếng Fiji"
    },
    {
      "code": "fi",
      "name": "Tiếng Phần Lan"
    },
    {
      "code": "fr",
      "name": "Tiếng Pháp"
    },
    {
      "code": "fy",
      "name": "Tiếng Frisian phương Tây"
    },
    {
      "code": "ff",
      "name": "Tiếng Fulah"
    },
    {
      "code": "gd",
      "name": "Tiếng Gaelic Scotland"
    },
    {
      "code": "gl",
      "name": "Tiếng Galicia"
    },
    {
      "code": "lg",
      "name": "Tiếng Ganda"
    },
    {
      "code": "ka",
      "name": "Tiếng Gruzia"
    },
    {
      "code": "de",
      "name": "Tiếng Đức"
    },
    {
      "code": "el",
      "name": "Tiếng Hy Lạp"
    },
    {
      "code": "kl",
      "name": "Tiếng Kalaallisut (Greenlandic)"
    },
    {
      "code": "gn",
      "name": "Tiếng Guarani"
    },
    {
      "code": "gu",
      "name": "Tiếng Gujarati"
    },
    {
      "code": "ht",
      "name": "Tiếng Creole Haiti"
    },
    {
      "code": "ha",
      "name": "Tiếng Hausa"
    },
    {
      "code": "he",
      "name": "Tiếng Do Thái"
    },
    {
      "code": "hz",
      "name": "Tiếng Herero"
    },
    {
      "code": "hi",
      "name": "Tiếng Hindi"
    },
    {
      "code": "ho",
      "name": "Hiri Motu"
    },
    {
      "code": "hu",
      "name": "Tiếng Hungary"
    },
    {
      "code": "is",
      "name": "Tiếng Iceland"
    },
    {
      "code": "io",
      "name": "Tiếng Ido"
    },
    {
      "code": "ig",
      "name": "Tiếng Igbo"
    },
    {
      "code": "id",
      "name": "Tiếng Indonesia"
    },
    {
      "code": "ia",
      "name": "Tiếng Interlingua"
    },
    {
      "code": "ie",
      "name": "Tiếng Interlingue"
    },
    {
      "code": "iu",
      "name": "Tiếng Inuktitut"
    },
    {
      "code": "ik",
      "name": "Tiếng Inupiaq"
    },
    {
      "code": "ga",
      "name": "Tiếng Ireland"
    },
    {
      "code": "it",
      "name": "Tiếng Ý"
    },
    {
      "code": "ja",
      "name": "Tiếng Nhật"
    },
    {
      "code": "jv",
      "name": "Tiếng Java"
    },
    {
      "code": "kn",
      "name": "Tiếng Kannada"
    },
    {
      "code": "kr",
      "name": "Tiếng Kanuri"
    },
    {
      "code": "ks",
      "name": "Tiếng Kashmiri"
    },
    {
      "code": "kk",
      "name": "Tiếng Kazakh"
    },
    {
      "code": "km",
      "name": "Tiếng Khmer"
    },
    {
      "code": "ki",
      "name": "Tiếng Kikuyu"
    },
    {
      "code": "rw",
      "name": "Tiếng Kinyarwanda"
    },
    {
      "code": "ky",
      "name": "Tiếng Kyrgyz"
    },
    {
      "code": "kv",
      "name": "Tiếng Komi"
    },
    {
      "code": "kg",
      "name": "Tiếng Kongo"
    },
    {
      "code": "ko",
      "name": "Tiếng Hàn"
    },
    {
      "code": "kj",
      "name": "Tiếng Kuanyama"
    },
    {
      "code": "ku",
      "name": "Tiếng Kurd"
    },
    {
      "code": "lo",
      "name": "Tiếng Lào"
    },
    {
      "code": "la",
      "name": "Tiếng Latinh"
    },
    {
      "code": "lv",
      "name": "Tiếng Latvia"
    },
    {
      "code": "li",
      "name": "Tiếng Limburgish"
    },
    {
      "code": "ln",
      "name": "Tiếng Lingala"
    },
    {
      "code": "lt",
      "name": "Tiếng Litva"
    },
    {
      "code": "lu",
      "name": "Tiếng Luba-Katanga"
    },
    {
      "code": "lb",
      "name": "Tiếng Luxembourg"
    },
    {
      "code": "mk",
      "name": "Tiếng Macedonia"
    },
    {
      "code": "mg",
      "name": "Tiếng Malagasy"
    },
    {
      "code": "ms",
      "name": "Tiếng Mã Lai"
    },
    {
      "code": "ml",
      "name": "Tiếng Malayalam"
    },
    {
      "code": "mt",
      "name": "Tiếng Malta"
    },
    {
      "code": "gv",
      "name": "Tiếng Manx"
    },
    {
      "code": "mi",
      "name": "Tiếng Maori"
    },
    {
      "code": "mr",
      "name": "Tiếng Marathi"
    },
    {
      "code": "mh",
      "name": "Tiếng Marshallese"
    },
    {
      "code": "mn",
      "name": "Tiếng Mông Cổ"
    },
    {
      "code": "na",
      "name": "Tiếng Nauru"
    },
    {
      "code": "nv",
      "name": "Tiếng Navajo"
    },
    {
      "code": "nd",
      "name": "Tiếng Ndebele Bắc"
    },
    {
      "code": "nr",
      "name": "Tiếng Ndebele Nam"
    },
    {
      "code": "ng",
      "name": "Tiếng Ndonga"
    },
    {
      "code": "ne",
      "name": "Tiếng Nepal"
    },
    {
      "code": "no",
      "name": "Tiếng Na Uy"
    },
    {
      "code": "nb",
      "name": "Tiếng Na Uy Bokmål"
    },
    {
      "code": "nn",
      "name": "Tiếng Na Uy Nynorsk"
    },
    {
      "code": "oc",
      "name": "Tiếng Occitan"
    },
    {
      "code": "oj",
      "name": "Tiếng Ojibwa"
    },
    {
      "code": "or",
      "name": "Tiếng Oriya"
    },
    {
      "code": "om",
      "name": "Tiếng Oromo"
    },
    {
      "code": "os",
      "name": "Tiếng Ossetian"
    },
    {
      "code": "pi",
      "name": "Tiếng Pali"
    },
    {
      "code": "ps",
      "name": "Tiếng Pashto"
    },
    {
      "code": "fa",
      "name": "Tiếng Ba Tư (Farsi)"
    },
    {
      "code": "pl",
      "name": "Tiếng Ba Lan"
    },
    {
      "code": "pt",
      "name": "Tiếng Bồ Đào Nha"
    },
    {
      "code": "pa",
      "name": "Tiếng Punjabi"
    },
    {
      "code": "qu",
      "name": "Tiếng Quechua"
    },
    {
      "code": "ro",
      "name": "Tiếng Romania"
    },
    {
      "code": "rm",
      "name": "Tiếng Romansh"
    },
    {
      "code": "rn",
      "name": "Tiếng Rundi"
    },
    {
      "code": "ru",
      "name": "Tiếng Nga"
    },
    {
      "code": "se",
      "name": "Tiếng Sami Bắc"
    },
    {
      "code": "sm",
      "name": "Tiếng Samoa"
    },
    {
      "code": "sg",
      "name": "Tiếng Sango"
    },
    {
      "code": "sa",
      "name": "Tiếng Phạn"
    },
    {
      "code": "sc",
      "name": "Tiếng Sardinia"
    },
    {
      "code": "sr",
      "name": "Tiếng Serbia"
    },
    {
      "code": "sn",
      "name": "Tiếng Shona"
    },
    {
      "code": "ii",
      "name": "Tiếng Di Tứ Xuyên"
    },
    {
      "code": "sd",
      "name": "Tiếng Sindhi"
    },
    {
      "code": "si",
      "name": "Tiếng Sinhala"
    },
    {
      "code": "sk",
      "name": "Tiếng Slovak"
    },
    {
      "code": "sl",
      "name": "Tiếng Slovenia"
    },
    {
      "code": "so",
      "name": "Tiếng Somali"
    },
    {
      "code": "st",
      "name": "Tiếng Sotho Nam"
    },
    {
      "code": "es",
      "name": "Tiếng Tây Ban Nha"
    },
    {
      "code": "su",
      "name": "Tiếng Sundanese"
    },
    {
      "code": "sw",
      "name": "Tiếng Swahili"
    },
    {
      "code": "ss",
      "name": "Tiếng Swati"
    },
    {
      "code": "sv",
      "name": "Tiếng Thụy Điển"
    },
    {
      "code": "tl",
      "name": "Tiếng Tagalog (Filipino)"
    },
    {
      "code": "ty",
      "name": "Tiếng Tahiti"
    },
    {
      "code": "tg",
      "name": "Tiếng Tajik"
    },
    {
      "code": "ta",
      "name": "Tiếng Tamil"
    },
    {
      "code": "tt",
      "name": "Tiếng Tatar"
    },
    {
      "code": "te",
      "name": "Tiếng Telugu"
    },
    {
      "code": "th",
      "name": "Tiếng Thái"
    },
    {
      "code": "bo",
      "name": "Tiếng Tây Tạng"
    },
    {
      "code": "ti",
      "name": "Tiếng Tigrinya"
    },
    {
      "code": "to",
      "name": "Tiếng Tonga"
    },
    {
      "code": "ts",
      "name": "Tiếng Tsonga"
    },
    {
      "code": "tn",
      "name": "Tiếng Tswana"
    },
    {
      "code": "tr",
      "name": "Tiếng Thổ Nhĩ Kỳ"
    },
    {
      "code": "tk",
      "name": "Tiếng Turkmen"
    },
    {
      "code": "tw",
      "name": "Tiếng Twi"
    },
    {
      "code": "ug",
      "name": "Tiếng Duy Ngô Nhĩ"
    },
    {
      "code": "uk",
      "name": "Tiếng Ukraina"
    },
    {
      "code": "ur",
      "name": "Tiếng Urdu"
    },
    {
      "code": "uz",
      "name": "Tiếng Uzbek"
    },
    {
      "code": "ve",
      "name": "Tiếng Venda"
    },
    {
      "code": "vi",
      "name": "Tiếng Việt"
    },
    {
      "code": "vo",
      "name": "Tiếng Volapük"
    },
    {
      "code": "wa",
      "name": "Tiếng Walloon"
    },
    {
      "code": "cy",
      "name": "Tiếng Wales"
    },
    {
      "code": "wo",
      "name": "Tiếng Wolof"
    },
    {
      "code": "xh",
      "name": "Tiếng Xhosa"
    },
    {
      "code": "yi",
      "name": "Tiếng Yiddish"
    },
    {
      "code": "yo",
      "name": "Tiếng Yoruba"
    },
    {
      "code": "za",
      "name": "Tiếng Zhuang"
    },
    {
      "code": "zu",
      "name": "Tiếng Zulu"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "Afghanistan"
    },
    {
      "code": "AL",
      "name": "Albania"
    },
    {
      "code": "DZ",
      "name": "Algeria"
    },
    {
      "code": "AS",
      "name": "Samoa thuộc Mỹ"
    },
    {
      "code": "AD",
      "name": "Andorra"
    },
    {
      "code": "AO",
      "name": "Angola"
    },
    {
      "code": "AI",
      "name": "Anguilla"
    },
    {
      "code": "AQ",
      "name": "Nam Cực"
    },
    {
      "code": "AG",
      "name": "Antigua và Barbuda"
    },
    {
      "code": "AR",
      "name": "Argentina"
    },
    {
      "code": "AM",
      "name": "Armenia"
    },
    {
      "code": "AW",
      "name": "Aruba"
    },
    {
      "code": "AU",
      "name": "Úc"
    },
    {
      "code": "AT",
      "name": "Áo"
    },
    {
      "code": "AZ",
      "name": "Azerbaijan"
    },
    {
      "code": "BS",
      "name": "Bahamas"
    },
    {
      "code": "BH",
      "name": "Bahrain"
    },
    {
      "code": "BD",
      "name": "Bangladesh"
    },
    {
      "code": "BB",
      "name": "Barbados"
    },
    {
      "code": "BY",
      "name": "Belarus"
    },
    {
      "code": "BE",
      "name": "Bỉ"
    },
    {
      "code": "BZ",
      "name": "Belize"
    },
    {
      "code": "BJ",
      "name": "Benin"
    },
    {
      "code": "BM",
      "name": "Bermuda"
    },
    {
      "code": "BT",
      "name": "Bhutan"
    },
    {
      "code": "BO",
      "name": "Bolivia"
    },
    {
      "code": "BA",
      "name": "Bosnia và Herzegovina"
    },
    {
      "code": "BW",
      "name": "Botswana"
    },
    {
      "code": "BR",
      "name": "Brazil"
    },
    {
      "code": "IO",
      "name": "Lãnh thổ Ấn Độ Dương thuộc Anh"
    },
    {
      "code": "VG",
      "name": "Quần đảo Virgin thuộc Anh"
    },
    {
      "code": "BN",
      "name": "Brunei"
    },
    {
      "code": "BG",
      "name": "Bulgaria"
    },
    {
      "code": "BF",
      "name": "Burkina Faso"
    },
    {
      "code": "BI",
      "name": "Burundi"
    },
    {
      "code": "KH",
      "name": "Campuchia"
    },
    {
      "code": "CM",
      "name": "Cameroon"
    },
    {
      "code": "CA",
      "name": "Canada"
    },
    {
      "code": "CV",
      "name": "Cabo Verde"
    },
    {
      "code": "KY",
      "name": "Quần đảo Cayman"
    },
    {
      "code": "CF",
      "name": "Cộng hòa Trung Phi"
    },
    {
      "code": "TD",
      "name": "Chad"
    },
    {
      "code": "CL",
      "name": "Chile"
    },
    {
      "code": "CN",
      "name": "Trung Quốc"
    },
    {
      "code": "CX",
      "name": "Đảo Giáng sinh"
    },
    {
      "code": "CC",
      "name": "Quần đảo Cocos (Keeling)"
    },
    {
      "code": "CO",
      "name": "Colombia"
    },
    {
      "code": "KM",
      "name": "Comoros"
    },
    {
      "code": "CG",
      "name": "Congo - Brazzaville"
    },
    {
      "code": "CD",
      "name": "Congo - Kinshasa"
    },
    {
      "code": "CK",
      "name": "Quần đảo Cook"
    },
    {
      "code": "CR",
      "name": "Costa Rica"
    },
    {
      "code": "CI",
      "name": "Bờ Biển Ngà"
    },
    {
      "code": "HR",
      "name": "Croatia"
    },
    {
      "code": "CU",
      "name": "Cuba"
    },
    {
      "code": "CY",
      "name": "Síp"
    },
    {
      "code": "CZ",
      "name": "Séc"
    },
    {
      "code": "DK",
      "name": "Đan Mạch"
    },
    {
      "code": "DJ",
      "name": "Djibouti"
    },
    {
      "code": "DM",
      "name": "Dominica"
    },
    {
      "code": "DO",
      "name": "Cộng hòa Dominica"
    },
    {
      "code": "EC",
      "name": "Ecuador"
    },
    {
      "code": "EG",
      "name": "Ai Cập"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Guinea Xích đạo"
    },
    {
      "code": "ER",
      "name": "Eritrea"
    },
    {
      "code": "EE",
      "name": "Estonia"
    },
    {
      "code": "SZ",
      "name": "Eswatini"
    },
    {
      "code": "ET",
      "name": "Ethiopia"
    },
    {
      "code": "FJ",
      "name": "Fiji"
    },
    {
      "code": "FI",
      "name": "Phần Lan"
    },
    {
      "code": "FR",
      "name": "Pháp"
    },
    {
      "code": "GA",
      "name": "Gabon"
    },
    {
      "code": "GM",
      "name": "Gambia"
    },
    {
      "code": "GE",
      "name": "Gruzia"
    },
    {
      "code": "DE",
      "name": "Đức"
    },
    {
      "code": "GH",
      "name": "Ghana"
    },
    {
      "code": "GR",
      "name": "Hy Lạp"
    },
    {
      "code": "GT",
      "name": "Guatemala"
    },
    {
      "code": "GN",
      "name": "Guinea"
    },
    {
      "code": "GY",
      "name": "Guyana"
    },
    {
      "code": "HT",
      "name": "Haiti"
    },
    {
      "code": "HN",
      "name": "Honduras"
    },
    {
      "code": "HK",
      "name": "Hồng Kông"
    },
    {
      "code": "HU",
      "name": "Hungary"
    },
    {
      "code": "IS",
      "name": "Iceland"
    },
    {
      "code": "IN",
      "name": "Ấn Độ"
    },
    {
      "code": "ID",
      "name": "Indonesia"
    },
    {
      "code": "IR",
      "name": "Iran"
    },
    {
      "code": "IQ",
      "name": "Iraq"
    },
    {
      "code": "IE",
      "name": "Ireland"
    },
    {
      "code": "IL",
      "name": "Israel"
    },
    {
      "code": "IT",
      "name": "Ý"
    },
    {
      "code": "JM",
      "name": "Jamaica"
    },
    {
      "code": "JP",
      "name": "Nhật Bản"
    },
    {
      "code": "JO",
      "name": "Jordan"
    },
    {
      "code": "KZ",
      "name": "Kazakhstan"
    },
    {
      "code": "KE",
      "name": "Kenya"
    },
    {
      "code": "KR",
      "name": "Hàn Quốc"
    },
    {
      "code": "KW",
      "name": "Kuwait"
    },
    {
      "code": "KG",
      "name": "Kyrgyzstan"
    },
    {
      "code": "LA",
      "name": "Lào"
    },
    {
      "code": "LV",
      "name": "Latvia"
    },
    {
      "code": "LB",
      "name": "Lebanon"
    },
    {
      "code": "LS",
      "name": "Lesotho"
    },
    {
      "code": "LR",
      "name": "Liberia"
    },
    {
      "code": "LY",
      "name": "Libya"
    },
    {
      "code": "LI",
      "name": "Liechtenstein"
    },
    {
      "code": "LT",
      "name": "Litva"
    },
    {
      "code": "LU",
      "name": "Luxembourg"
    },
    {
      "code": "MG",
      "name": "Madagascar"
    },
    {
      "code": "MW",
      "name": "Malawi"
    },
    {
      "code": "MY",
      "name": "Malaysia"
    },
    {
      "code": "MV",
      "name": "Maldives"
    },
    {
      "code": "ML",
      "name": "Mali"
    },
    {
      "code": "MT",
      "name": "Malta"
    },
    {
      "code": "MX",
      "name": "Mexico"
    },
    {
      "code": "MD",
      "name": "Moldova"
    },
    {
      "code": "MC",
      "name": "Monaco"
    },
    {
      "code": "MN",
      "name": "Mông Cổ"
    },
    {
      "code": "ME",
      "name": "Montenegro"
    },
    {
      "code": "MA",
      "name": "Ma-rốc"
    },
    {
      "code": "MZ",
      "name": "Mozambique"
    },
    {
      "code": "MM",
      "name": "Myanmar"
    },
    {
      "code": "NA",
      "name": "Namibia"
    },
    {
      "code": "NP",
      "name": "Nepal"
    },
    {
      "code": "NL",
      "name": "Hà Lan"
    },
    {
      "code": "NZ",
      "name": "New Zealand"
    },
    {
      "code": "NI",
      "name": "Nicaragua"
    },
    {
      "code": "NE",
      "name": "Niger"
    },
    {
      "code": "NG",
      "name": "Nigeria"
    },
    {
      "code": "MK",
      "name": "Bắc Macedonia"
    },
    {
      "code": "NO",
      "name": "Na Uy"
    },
    {
      "code": "OM",
      "name": "Oman"
    },
    {
      "code": "PK",
      "name": "Pakistan"
    },
    {
      "code": "PA",
      "name": "Panama"
    },
    {
      "code": "PG",
      "name": "Papua New Guinea"
    },
    {
      "code": "PY",
      "name": "Paraguay"
    },
    {
      "code": "PE",
      "name": "Peru"
    },
    {
      "code": "PH",
      "name": "Philippines"
    },
    {
      "code": "PL",
      "name": "Ba Lan"
    },
    {
      "code": "PT",
      "name": "Bồ Đào Nha"
    },
    {
      "code": "QA",
      "name": "Qatar"
    },
    {
      "code": "RO",
      "name": "Romania"
    },
    {
      "code": "RU",
      "name": "Nga"
    },
    {
      "code": "RW",
      "name": "Rwanda"
    },
    {
      "code": "SA",
      "name": "Ả Rập Saudi"
    },
    {
      "code": "SN",
      "name": "Senegal"
    },
    {
      "code": "RS",
      "name": "Serbia"
    },
    {
      "code": "SG",
      "name": "Singapore"
    },
    {
      "code": "SK",
      "name": "Slovakia"
    },
    {
      "code": "SI",
      "name": "Slovenia"
    },
    {
      "code": "ZA",
      "name": "Nam Phi"
    },
    {
      "code": "ES",
      "name": "Tây Ban Nha"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "Thụy Điển"
    },
    {
      "code": "CH",
      "name": "Thụy Sĩ"
    },
    {
      "code": "TW",
      "name": "Đài Loan"
    },
    {
      "code": "TH",
      "name": "Thái Lan"
    },
    {
      "code": "TR",
      "name": "Thổ Nhĩ Kỳ"
    },
    {
      "code": "UG",
      "name": "Uganda"
    },
    {
      "code": "UA",
      "name": "Ukraina"
    },
    {
      "code": "AE",
      "name": "Các Tiểu vương quốc Ả Rập Thống nhất"
    },
    {
      "code": "GB",
      "name": "Vương quốc Anh"
    },
    {
      "code": "US",
      "name": "Hoa Kỳ"
    },
    {
      "code": "UY",
      "name": "Uruguay"
    },
    {
      "code": "UZ",
      "name": "Uzbekistan"
    },
    {
      "code": "VE",
      "name": "Venezuela"
    },
    {
      "code": "VN",
      "name": "Việt Nam"
    },
    {
      "code": "YE",
      "name": "Yemen"
    },
    {
      "code": "ZM",
      "name": "Zambia"
    },
    {
      "code": "ZW",
      "name": "Zimbabwe"
    }
  ]
};
