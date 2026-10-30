// th strings for locales-billing-form. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale th
export default {
  "billing": {
    "header": {
      "title": "ข้อมูลการเรียกเก็บเงิน",
      "subtitle": "เราจะใส่ข้อมูลเหล่านี้ในใบแจ้งหนี้ หน้าชำระเงินถัดไปจะขอข้อมูลบัตรของคุณ"
    },
    "fields": {
      "firstName": {
        "label": "ชื่อ",
        "placeholder": "สมชาย"
      },
      "lastName": {
        "label": "นามสกุล",
        "placeholder": "สุขสวัสดิ์"
      },
      "email": {
        "label": "อีเมลสำหรับใบแจ้งหนี้",
        "placeholder": "jane.doe@company.com"
      },
      "phone": {
        "label": "หมายเลขโทรศัพท์",
        "placeholder": "+1 (555) 000-0000"
      },
      "country": {
        "label": "รหัสประเทศ",
        "placeholder": "TH"
      },
      "address": {
        "label": "ที่อยู่สำหรับเรียกเก็บเงิน",
        "placeholder": "123 Main Street"
      },
      "city": {
        "label": "เมือง",
        "placeholder": "กรุงเทพฯ"
      },
      "state": {
        "label": "รัฐหรือจังหวัด",
        "placeholder": "San Jose"
      },
      "zip": {
        "label": "รหัสไปรษณีย์",
        "placeholder": "10101"
      }
    },
    "hints": {
      "country": "ตัวอักษรสองตัว เช่น US, MX หรือ CR",
      "state": "ไม่บังคับ เว้นว่างไว้หากประเทศของคุณไม่ใช้",
      "zip": "ไม่บังคับ เว้นว่างไว้หากที่อยู่ของคุณไม่มีรหัสไปรษณีย์"
    },
    "errors": {
      "required": "กรอกช่องนี้เพื่อดำเนินการต่อ",
      "email": "กรอกอีเมล เช่น name@example.com",
      "country": "กรอกรหัสประเทศสองตัวอักษร เช่น US"
    },
    "optional": "ไม่บังคับ"
  }
};
