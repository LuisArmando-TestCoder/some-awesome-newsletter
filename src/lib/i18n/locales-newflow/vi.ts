// vi strings for locales-newflow. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale vi
export default {
  "onboarding": {
    "progress": "Bước {current}/{total}",
    "progressLabel": "Tiến độ thiết lập",
    "back": "Quay lại",
    "skip": "Bỏ qua bước này",
    "continue": "Tiếp tục",
    "whyLabel": "Vì sao chúng tôi hỏi",
    "skipLabel": "Nếu bạn bỏ qua",
    "working": "Đang xử lý...",
    "start": {
      "title": "Bắt đầu bản tin của bạn",
      "opening": "Đang mở phần thiết lập. Nếu không có gì xảy ra,",
      "continueHere": "hãy tiếp tục tại đây"
    },
    "tryAgain": "Thử lại",
    "website": {
      "title": "Website của bạn là gì?",
      "why": "Chúng tôi đọc website của bạn để tìm các bài viết làm nền cho bản tin, và để đoán người đọc của bạn là ai.",
      "skipNote": "Nếu bạn chưa có website, hãy chọn một chủ đề và chúng tôi sẽ dùng một trang tin về chủ đề đó.",
      "label": "Địa chỉ website",
      "hint": "Ví dụ congtycuaban.com hoặc congtycuaban.com/blog",
      "placeholder": "congtycuaban.com",
      "submit": "Tiếp tục",
      "checking": "Đang đọc website của bạn...",
      "noWebsite": "Tôi chưa có website",
      "haveWebsite": "Tôi có website",
      "topicTitle": "Chọn một chủ đề",
      "topicHint": "Chúng tôi sẽ dùng một trang tin về chủ đề này làm nguồn đầu tiên của bạn. Bạn có thể đổi sau.",
      "errors": {
        "empty": "Nhập địa chỉ website để tiếp tục.",
        "invalid": "Đây không giống địa chỉ web. Kiểm tra chính tả, ví dụ congtycuaban.com.",
        "unreachable": "Chúng tôi không tìm thấy bài viết trên trang này. Thử trang blog hoặc trang tin tức của bạn, ví dụ congtycuaban.com/blog.",
        "network": "Chúng tôi không kết nối được máy chủ. Kiểm tra kết nối và thử lại."
      }
    },
    "readers": {
      "title": "Ai đọc bản tin của bạn?",
      "why": "Chúng tôi viết mỗi số cho người đọc này, bằng ngôn ngữ này. Người đăng ký nói ngôn ngữ khác sẽ nhận bản dịch riêng.",
      "skipNote": "Chúng tôi đã điền sẵn từ website của bạn. Hãy sửa bất cứ điều gì chưa đúng.",
      "languageLabel": "Ngôn ngữ chính",
      "languageHint": "Chúng tôi chọn theo cài đặt trình duyệt của bạn.",
      "readerLabel": "Người đọc lý tưởng của bạn",
      "readerHint": "Một câu là đủ. Ví dụ: chủ nhà hàng nhỏ ở Lisbon.",
      "readerPlaceholder": "Bản tin này dành cho ai?",
      "errors": {
        "reader": "Mô tả người đọc bằng vài từ để chúng tôi biết viết cho ai."
      }
    },
    "preview": {
      "title": "Đây là số bản tin đầu tiên của bạn",
      "why": "Đây là email người đăng ký sẽ nhận, được viết từ bài viết mới nhất của bạn. Chưa có gì được gửi.",
      "generating": "Đang viết số đầu tiên từ bài viết mới nhất của bạn. Thường mất chưa đến một phút.",
      "inboxFrom": "Từ",
      "inboxTo": "Đến",
      "inboxSubject": "Tiêu đề",
      "defaultSubject": "Số bản tin đầu tiên của bạn",
      "sendTest": "Gửi thử cho tôi",
      "sendingTest": "Đang gửi...",
      "testSent": "Đã gửi email thử đến {email}. Hãy kiểm tra hộp thư đến và thư mục spam.",
      "regenerate": "Viết lại",
      "looksGood": "Ổn rồi, tiếp tục",
      "skipPreview": "Tiếp tục mà không xem trước",
      "howTitle": "Cách chúng tôi tìm bài viết của bạn",
      "howBody": "Chúng tôi đã lưu một quy tắc ngắn cho biết vị trí các liên kết bài viết trên trang của bạn, để bỏ qua menu và quảng cáo. Bạn chỉ cần đổi nó nếu bản xem trước lấy sai nội dung.",
      "ruleLabel": "Quy tắc bài viết",
      "findAgain": "Tìm lại bài viết",
      "errors": {
        "generate": "Chúng tôi không viết được số này. Trang có thể chặn việc đọc tự động. Thử lại, hoặc quay lại và dùng trang blog của bạn.",
        "test": "Email thử chưa được gửi. Thử lại sau ít phút."
      }
    },
    "senderName": {
      "title": "Tên của bạn nên hiển thị thế nào trong hộp thư?",
      "why": "Người đăng ký thấy tên này cạnh mỗi số, nên họ nhận ra và mở thư.",
      "skipNote": "Nếu bạn bỏ qua, người gửi sẽ hiển thị là AIBAN. Bạn có thể đổi tên sau trong Cài đặt.",
      "label": "Tên người gửi",
      "hint": "Tên bạn, tên công ty hoặc tên bản tin. Tối đa 60 ký tự.",
      "placeholder": "Silva Studio",
      "previewLabel": "Hiển thị trong hộp thư",
      "previewBody": "Số bản tin của bạn hiển thị với tên người gửi này. Thư được gửi từ địa chỉ gửi của AIBAN.",
      "save": "Lưu và tiếp tục",
      "errors": {
        "empty": "Nhập tên người gửi có ít nhất 2 ký tự.",
        "long": "Tên người gửi tối đa 60 ký tự.",
        "save": "Chúng tôi không lưu được tên. Thử lại sau ít phút."
      }
    },
    "signature": {
      "title": "Chữ ký email",
      "why": "Chữ ký nằm ở cuối mỗi số, để người đọc biết ai viết và cách liên hệ với bạn.",
      "skipNote": "Nếu bạn bỏ qua, các số chỉ kết thúc bằng tên bản tin.",
      "nameLabel": "Tên của bạn",
      "namePlaceholder": "Ana Silva",
      "roleLabel": "Chức danh hoặc công ty",
      "rolePlaceholder": "Nhà sáng lập, Silva Studio",
      "linkLabel": "Liên kết",
      "linkHint": "Website hoặc trang mạng xã hội của bạn. Không bắt buộc.",
      "linkPlaceholder": "congtycuaban.com",
      "previewLabel": "Hiển thị ở cuối email",
      "previewBody": "Cảm ơn bạn đã đọc. Hẹn gặp lại ở số tiếp theo.",
      "save": "Lưu chữ ký",
      "existingNote": "Bạn đã có chữ ký. Lưu ở đây sẽ thay thế chữ ký đó."
    },
    "schedule": {
      "title": "Khi nào gửi các số mới?",
      "why": "Chúng tôi kiểm tra website của bạn trước mỗi lần gửi và viết số mới từ các bài mới nhất.",
      "skipNote": "Bạn có thể đổi ngày giờ hoặc tạm dừng gửi bất cứ lúc nào trong bảng điều khiển.",
      "scheduleLabel": "Thời gian gửi",
      "frequencyLabel": "Tần suất",
      "daily": "Hằng ngày",
      "weekly": "Hằng tuần",
      "monthly": "Hằng tháng, vào ngày 1",
      "dayLabel": "Ngày",
      "timeLabel": "Giờ",
      "timeHint": "Theo giờ địa phương của bạn.",
      "recipeTitle": "Tự động gửi các số mới",
      "recipeBody": "Theo lịch ở trên, chúng tôi chọn bài mới tốt nhất của bạn, viết theo giọng văn của bạn, dịch cho từng người đọc và gửi qua email.",
      "recipeOn": "Bật",
      "recipeOff": "Tắt. Các số chỉ được gửi khi bạn nhấn Gửi.",
      "save": "Lưu và tiếp tục",
      "saving": "Đang lưu bản tin của bạn...",
      "errors": {
        "create": "Chúng tôi không lưu được bản tin. Thử lại sau ít phút.",
        "limit": "Gói của bạn không cho phép thêm nguồn. Để thêm nguồn, hãy viết cho chúng tôi và chúng tôi sẽ đổi gói cho bạn."
      }
    },
    "send": {
      "title": "Gửi số bản tin đầu tiên",
      "why": "Gửi ngay cho bạn thấy toàn bộ quy trình: số bản tin đến một hộp thư thật, bằng ngôn ngữ của người đọc.",
      "skipNote": "Nếu bạn bỏ qua, số đầu tiên sẽ được gửi vào giờ đã lên lịch.",
      "youAreSubscribed": "Bạn đã đăng ký với địa chỉ {email}.",
      "othersLabel": "Mời người khác (không bắt buộc)",
      "othersHint": "Dán các địa chỉ email, phân tách bằng dấu phẩy hoặc xuống dòng. Mỗi người nhận một lời mời riêng từ bạn. Họ chỉ nhận các số nếu chấp nhận, và chúng tôi xóa những lời mời không ai chấp nhận sau 30 ngày.",
      "othersPlaceholder": "ana@example.com, li@example.com",
      "sendNow": "Gửi ngay",
      "sending": "Đang gửi số đầu tiên...",
      "sentTitle": "Số đầu tiên của bạn đang được gửi",
      "sentBody": "Số này được gửi đến mọi người trong danh sách đã xác nhận đăng ký. Có thể mất vài phút để đến nơi.",
      "invited": "Đã gửi lời mời đến {count} người. Họ vào danh sách của bạn khi chấp nhận.",
      "invitesUnavailable": "Tính năng mời chưa khả dụng, nên chúng tôi chưa lưu các địa chỉ này. Ở bước tiếp theo, hãy sao chép liên kết đăng ký và tự gửi cho họ.",
      "continue": "Tiếp tục",
      "errors": {
        "invalidEmails": "Các địa chỉ sau có vẻ sai: {list}. Hãy sửa hoặc xóa.",
        "add": "Chúng tôi không mời được: {list}. Thử lại sau từ mục Người đăng ký.",
        "send": "Số bản tin chưa được gửi. Thử lại sau ít phút."
      }
    },
    "share": {
      "title": "Có những người đăng ký đầu tiên",
      "why": "Người đăng ký tại đây sẽ nhận mọi số bằng ngôn ngữ của họ.",
      "skipNote": "Bạn có thể tìm lại liên kết này và mã nhúng sau trong mục Người đăng ký, phần Biểu mẫu đăng ký.",
      "linkLabel": "Trang đăng ký",
      "linkHint": "Chia sẻ trên mạng xã hội, ở chân email hoặc bằng mã QR.",
      "embedLabel": "Biểu mẫu đăng ký cho website của bạn",
      "embedHint": "Dán mã này vào nơi bạn muốn biểu mẫu xuất hiện trên website.",
      "copy": "Sao chép",
      "copied": "Đã sao chép",
      "open": "Mở trang đăng ký"
    },
    "done": {
      "title": "Bản tin của bạn đã được thiết lập",
      "why": "Đây là những gì diễn ra tiếp theo và những việc còn lại.",
      "planLine": "Gói hiện tại: {plan}",
      "changePlan": "Xem các gói",
      "toDashboard": "Đến bảng điều khiển",
      "summarySource": "Nguồn: {url}",
      "summarySchedule": "Lịch gửi: {schedule}",
      "summaryAutomation": "Gửi tự động: {state}",
      "on": "bật",
      "off": "tắt"
    }
  },
  "tutorial": {
    "checklistTitle": "Bắt đầu",
    "checklistProgress": "Đã xong {done}/{total}",
    "checklistDone": "Đã xong. Bản tin của bạn giờ tự chạy.",
    "dismiss": "Ẩn danh sách việc cần làm",
    "doneLabel": "đã xong",
    "todoLabel": "cần làm",
    "show": "Hiện hướng dẫn bắt đầu",
    "items": {
      "source": {
        "title": "Thêm nơi lấy nội dung",
        "body": "Website hoặc blog chúng tôi kiểm tra để tìm bài mới."
      },
      "sender": {
        "title": "Chọn tên người gửi",
        "body": "Tên người đăng ký thấy cạnh mỗi số."
      },
      "subscriber": {
        "title": "Có người đăng ký đầu tiên",
        "body": "Một người khác ngoài bạn đăng ký hoặc được thêm vào."
      },
      "send": {
        "title": "Gửi số bản tin đầu tiên",
        "body": "Một số bản tin thật đến tay những người trong danh sách của bạn."
      },
      "automation": {
        "title": "Bật gửi tự động",
        "body": "Các số mới được gửi theo lịch của bạn."
      },
      "widget": {
        "title": "Thêm biểu mẫu đăng ký vào website",
        "body": "Khách truy cập có thể đăng ký mà không rời website của bạn."
      }
    },
    "open": "Mở",
    "tour": {
      "start": "Xem hướng dẫn nhanh",
      "next": "Tiếp",
      "back": "Quay lại",
      "skip": "Bỏ qua hướng dẫn",
      "finish": "Hoàn tất",
      "stepOf": "{current}/{total}"
    },
    "help": {
      "whatIsThis": "Đây là gì?",
      "whyItMatters": "Vì sao điều này quan trọng",
      "close": "Đóng"
    }
  },
  "auth": {
    "emailLabel": "Địa chỉ email",
    "emailHint": "Chúng tôi gửi mã 6 chữ số đến địa chỉ này. Bạn không cần mật khẩu.",
    "codeTitle": "Kiểm tra email của bạn",
    "codeSentTo": "Chúng tôi đã gửi mã 6 chữ số đến {email}.",
    "codeHint": "Mã có thể mất một phút để đến. Hãy kiểm tra cả thư mục spam.",
    "changeEmail": "Dùng email khác",
    "resend": "Gửi mã mới",
    "resendIn": "Bạn có thể yêu cầu mã mới sau {seconds} giây",
    "resendLimit": "Nếu vẫn chưa nhận được mã, hãy viết cho chúng tôi từ trang Trợ giúp và chúng tôi sẽ xử lý.",
    "resent": "Chúng tôi đã gửi mã mới.",
    "verifying": "Đang kiểm tra mã...",
    "errors": {
      "email": "Nhập địa chỉ email đầy đủ, ví dụ ban@congty.com.",
      "send": "Chúng tôi không gửi được mã. Kiểm tra kết nối và thử lại.",
      "code": "Mã này không đúng. Kiểm tra 6 chữ số hoặc yêu cầu mã mới."
    }
  }
};
