export default {
  billing: {
    header: {
      title: "Billing details",
      subtitle: "We put these details on your invoice. The payment page asks for your card next."
    },
    fields: {
      firstName: {
        label: "First name",
        placeholder: "Jane"
      },
      lastName: {
        label: "Last name",
        placeholder: "Doe"
      },
      email: {
        label: "Email for invoices",
        placeholder: "jane.doe@company.com"
      },
      phone: {
        label: "Phone number",
        placeholder: "+1 555 000 0000"
      },
      country: {
        label: "Country code",
        placeholder: "CR"
      },
      address: {
        label: "Billing address",
        placeholder: "123 Main Street"
      },
      city: {
        label: "City",
        placeholder: "San Jose"
      },
      state: {
        label: "State or province",
        placeholder: "San Jose"
      },
      zip: {
        label: "Postal or ZIP code",
        placeholder: "10101"
      }
    },
    hints: {
      country: "Two letters, for example US, MX or CR.",
      state: "Optional. Leave it empty if your country does not use one.",
      zip: "Optional. Leave it empty if your address has no postal code."
    },
    errors: {
      required: "Fill in this field to continue.",
      email: "Enter an email address like name@example.com.",
      country: "Enter the two letter country code, for example US."
    },
    optional: "Optional"
  }
};
