// pl strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale pl
export default {
  "welcome": {
    "title": "Witaj w newsletterze",
    "invitedBy": "{configuratorId} zaprasza cię do subskrypcji."
  },
  "email": {
    "title": "Gdzie mamy wysyłać kolejne wydania?",
    "placeholder": "Twój e-mail"
  },
  "name": {
    "title": "Jak masz na imię?",
    "placeholder": "Twoje imię"
  },
  "language": {
    "title": "W jakim języku chcesz czytać?"
  },
  "subscribed": {
    "title": "Subskrypcja zapisana",
    "subtitle": "Sprawdź skrzynkę, czeka tam e-mail z potwierdzeniem.",
    "continueTo": "Przejdź do",
    "finishingUp": "Możesz zamknąć tę stronę."
  },
  "form": {
    "heading": "Subskrybuj {title}",
    "headingFallback": "Subskrybuj ten newsletter",
    "intro": "Nowe wydania przychodzą e-mailem, w wybranym przez ciebie języku.",
    "from": "Od: {sender}",
    "emailLabel": "Adres e-mail",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Imię",
    "optional": "opcjonalnie",
    "nameHint": "Używamy go w powitaniu. Jeśli zostawisz to pole puste, użyjemy początku twojego adresu e-mail.",
    "languageLabel": "Język wydań",
    "languageSummary": "Wydania w języku: {language}.",
    "languageChange": "Zmień",
    "languageHint": "Wybraliśmy go na podstawie ustawień twojej przeglądarki.",
    "submit": "Subskrybuj",
    "submitting": "Zapisywanie...",
    "consent": "Subskrybując, zgadzasz się na otrzymywanie e-maili od {sender}. Każdy e-mail zawiera link do wypisania się.",
    "privacy": "Polityka prywatności",
    "loadingInfo": "Wczytywanie informacji o newsletterze"
  },
  "success": {
    "title": "Sprawdź skrzynkę",
    "body": "Wysłaliśmy e-mail z potwierdzeniem na adres {email}. Otwórz go i wybierz Potwierdź subskrypcję.",
    "next": "Pierwsze wydanie przyjdzie po potwierdzeniu, w języku: {language}.",
    "spam": "Jeśli w ciągu kilku minut nic nie przyjdzie, zajrzyj do folderu Spam lub Oferty.",
    "changeEmail": "Użyj innego adresu e-mail",
    "continueTo": "Przejdź do {host}"
  },
  "errors": {
    "emailRequired": "Wpisz swój adres e-mail.",
    "emailInvalid": "Ten adres e-mail wygląda na niepełny. Sprawdź go i spróbuj ponownie.",
    "missingLink": "W tym linku do zapisu brakuje informacji. Poproś nadawcę o nowy link.",
    "notFound": "Ten link do zapisu już nie działa. Poproś nadawcę o nowy link.",
    "limit": "Ten newsletter nie przyjmuje teraz nowych subskrybentów. Spróbuj później.",
    "invalid": "Nie mogliśmy przyjąć tego adresu. Sprawdź go i spróbuj ponownie.",
    "server": "Nie udało się zapisać subskrypcji. Spróbuj ponownie za chwilę.",
    "network": "Nie udało się połączyć z serwerem. Sprawdź połączenie i spróbuj ponownie."
  },
  "confirm": {
    "title": "Potwierdź subskrypcję",
    "body": "Wybierz przycisk, aby zacząć otrzymywać wydania na adres {email}.",
    "button": "Potwierdź subskrypcję",
    "confirming": "Potwierdzanie...",
    "consent": "Potwierdzając, zgadzasz się na otrzymywanie tego newslettera e-mailem. Z każdego wydania możesz się wypisać.",
    "successTitle": "Subskrypcja aktywna",
    "successBody": "Nowe wydania będą przychodzić na adres {email}.",
    "successTip": "Dodaj nadawcę do kontaktów, żeby wiadomości nie trafiały do spamu.",
    "invalidTitle": "Ten link jest niepełny",
    "invalidBody": "Otwórz ponownie e-mail z potwierdzeniem i wybierz przycisk w środku. Jeśli nie możesz go znaleźć, zapisz się jeszcze raz na stronie nadawcy.",
    "notFoundBody": "Nie znaleźliśmy zapisu dla tego adresu. Zapisz się jeszcze raz na stronie nadawcy.",
    "errorBody": "Nie udało się potwierdzić subskrypcji. Spróbuj ponownie za chwilę.",
    "retry": "Spróbuj ponownie",
    "home": "Przejdź na stronę główną"
  },
  "embed": {
    "title": "Dodaj formularz zapisu do swojej strony",
    "intro": "Wklej jeden z tych fragmentów kodu na swoją stronę. Osoby, które się zapiszą, dostaną e-mail z potwierdzeniem, a potem twoje wydania w swoim języku.",
    "linkLabel": "Link do strony zapisu",
    "linkHint": "Udostępnij go w opisie profilu w mediach społecznościowych, w podpisie e-mail lub w kodzie QR.",
    "scriptLabel": "Znacznik script (zalecany)",
    "scriptHint": "Wklej go tam, gdzie ma się pojawić formularz. Formularz sam dopasuje swój rozmiar.",
    "iframeLabel": "Iframe",
    "iframeHint": "Użyj tej opcji, jeśli twoja strona nie pozwala na skrypty.",
    "copy": "Kopiuj",
    "copied": "Skopiowano",
    "copyFailed": "Zaznacz tekst i skopiuj go ręcznie.",
    "options": "Opcje formularza",
    "accent": "Kolor przycisku",
    "accentHint": "Zostaw bez zmian, aby użyć koloru swojej marki.",
    "theme": "Motyw",
    "themeAuto": "Zgodnie z ustawieniem odwiedzającego",
    "themeLight": "Jasny",
    "themeDark": "Ciemny",
    "layout": "Układ",
    "layoutFull": "Pełny (tytuł, imię i język)",
    "layoutCompact": "Kompaktowy (e-mail i przycisk)",
    "preview": "Podgląd",
    "previewNote": "Podgląd działa naprawdę. Zapis w tym miejscu tworzy prawdziwego subskrybenta.",
    "missing": "Najpierw utwórz newsletter. Formularz zapisu pojawi się tutaj, gdy newsletter będzie gotowy."
  },
  "page": {
    "poweredBy": "Działa dzięki AIBAN",
    "title": "Subskrypcja"
  },
  "signature": {
    "title": "Podpis e-mail",
    "intro": "Czytelnicy widzą go na końcu każdego wydania. Kliknij dowolną część podglądu, aby ją edytować.",
    "show": "Pokazuj mój podpis w każdym wydaniu",
    "showHint": "Gdy go wyłączysz, wydania kończą się na artykule.",
    "preview": "Podgląd",
    "previewEmpty": "Twój podpis jest pusty. Zacznij od dodania imienia.",
    "articleEnd": "Koniec artykułu",
    "tabContent": "Treść",
    "tabStyle": "Styl",
    "blocks": "Co uwzględnić",
    "blocksHint": "Wybierz etykietę, aby pokazać lub ukryć daną część. Ukryte części zachowują swój tekst.",
    "layout": "Układ",
    "layouts": {
      "bar": "Kolorowy pasek",
      "photo": "Zdjęcie",
      "stacked": "Jeden pod drugim",
      "centered": "Wyśrodkowany",
      "minimal": "Tylko tekst"
    },
    "fields": {
      "name": "Imię i nazwisko",
      "role": "Stanowisko",
      "company": "Firma",
      "phone": "Telefon",
      "email": "E-mail",
      "website": "Strona internetowa",
      "address": "Adres",
      "photoUrl": "Zdjęcie",
      "logoUrl": "Logo",
      "socials": "Linki do mediów społecznościowych",
      "cta": "Przycisk",
      "disclaimer": "Nota prawna"
    },
    "groups": {
      "about": "O tobie",
      "contact": "Kontakt",
      "images": "Obrazy",
      "socials": "Media społecznościowe",
      "cta": "Przycisk",
      "disclaimer": "Nota prawna"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Założycielka",
      "company": "Riverside Studio",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "ul. Główna 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Umów rozmowę",
      "ctaUrl": "https://"
    },
    "ctaText": "Tekst przycisku",
    "ctaLink": "Link przycisku",
    "hints": {
      "photoUrl": "Link do kwadratowego pliku PNG lub JPG o wymiarach co najmniej 144 na 144 piksele i rozmiarze poniżej 200 KB. Wyświetlany w rozmiarze 72 na 72 piksele obok twojego imienia.",
      "logoUrl": "Link do pliku PNG lub JPG z przezroczystym lub białym tłem, o wysokości co najmniej 64 pikseli. Wyświetlany w wysokości 32 pikseli.",
      "website": "Dodamy https://, jeśli go pominiesz.",
      "cta": "Przycisk pojawi się tylko wtedy, gdy podasz tekst i link.",
      "disclaimer": "Drobny druk na dole, na przykład informacja o poufności. Zostaw puste, jeśli jej nie potrzebujesz."
    },
    "style": {
      "accent": "Kolor akcentu",
      "accentHint": "Używany dla paska, linków i przycisku. Na start to kolor twojej marki.",
      "font": "Czcionka",
      "fontSans": "Bezszeryfowa",
      "fontSerif": "Szeryfowa",
      "size": "Rozmiar tekstu",
      "sizeMd": "Normalny",
      "sizeSm": "Mały",
      "shape": "Kształt zdjęcia",
      "shapeRound": "Okrągły",
      "shapeSquare": "Kwadratowy"
    },
    "hidden": "ukryte",
    "reset": "Zacznij od nowa",
    "resetConfirm": "Wybierz ponownie, aby wyczyścić wszystkie pola"
  }
};
