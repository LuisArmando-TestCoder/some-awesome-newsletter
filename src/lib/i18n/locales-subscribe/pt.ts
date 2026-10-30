// pt strings for locales-subscribe. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale pt
export default {
  "welcome": {
    "title": "Boas-vindas à newsletter",
    "invitedBy": "{configuratorId} convidou você para se inscrever."
  },
  "email": {
    "title": "Para onde devemos enviar cada edição?",
    "placeholder": "Seu e-mail"
  },
  "name": {
    "title": "Qual é o seu nome?",
    "placeholder": "Seu nome"
  },
  "language": {
    "title": "Em qual idioma você quer ler?"
  },
  "subscribed": {
    "title": "Sua inscrição foi feita",
    "subtitle": "Confira sua caixa de entrada: enviamos um e-mail de confirmação.",
    "continueTo": "Continuar para",
    "finishingUp": "Você pode fechar esta página."
  },
  "form": {
    "heading": "Inscreva-se em {title}",
    "headingFallback": "Inscreva-se nesta newsletter",
    "intro": "As novas edições chegam por e-mail, escritas no idioma que você escolher.",
    "from": "De {sender}",
    "emailLabel": "Endereço de e-mail",
    "emailPlaceholder": "you@example.com",
    "nameLabel": "Nome",
    "optional": "opcional",
    "nameHint": "Usamos para cumprimentar você. Se deixar em branco, usamos o início do seu endereço de e-mail.",
    "languageLabel": "Idioma das suas edições",
    "languageSummary": "Edições em {language}.",
    "languageChange": "Alterar",
    "languageHint": "Pegamos isto das configurações do seu navegador.",
    "submit": "Inscrever-se",
    "submitting": "Inscrevendo...",
    "consent": "Ao se inscrever, você concorda em receber e-mails de {sender}. Todo e-mail tem um link para cancelar a inscrição.",
    "privacy": "Política de privacidade",
    "loadingInfo": "Carregando os dados da newsletter"
  },
  "success": {
    "title": "Confira sua caixa de entrada",
    "body": "Enviamos um e-mail de confirmação para {email}. Abra e selecione Confirmar inscrição.",
    "next": "Sua primeira edição chega depois que você confirmar, escrita em {language}.",
    "spam": "Se nada chegar em alguns minutos, procure na pasta de spam ou de Promoções.",
    "changeEmail": "Usar outro e-mail",
    "continueTo": "Continuar para {host}"
  },
  "errors": {
    "emailRequired": "Digite seu endereço de e-mail.",
    "emailInvalid": "Este endereço de e-mail parece incompleto. Verifique e tente novamente.",
    "missingLink": "Faltam informações neste link de inscrição. Peça um novo link ao remetente.",
    "notFound": "Este link de inscrição não funciona mais. Peça um novo link ao remetente.",
    "limit": "Esta newsletter não pode aceitar novos assinantes no momento. Tente novamente mais tarde.",
    "invalid": "Não foi possível aceitar este endereço. Verifique e tente novamente.",
    "server": "Não foi possível salvar sua inscrição. Tente novamente em instantes.",
    "network": "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
  },
  "confirm": {
    "title": "Confirme sua inscrição",
    "body": "Selecione o botão para começar a receber edições em {email}.",
    "button": "Confirmar inscrição",
    "confirming": "Confirmando...",
    "consent": "Ao confirmar, você concorda em receber esta newsletter por e-mail. Você pode cancelar a inscrição em qualquer edição.",
    "successTitle": "Sua inscrição foi feita",
    "successBody": "As novas edições vão chegar em {email}.",
    "successTip": "Para que não caiam no spam, adicione o remetente aos seus contatos.",
    "invalidTitle": "Este link está incompleto",
    "invalidBody": "Abra de novo o e-mail de confirmação e selecione o botão dele. Se não encontrar, inscreva-se de novo pela página do remetente.",
    "notFoundBody": "Não encontramos uma inscrição para este endereço. Inscreva-se de novo pela página do remetente.",
    "errorBody": "Não foi possível confirmar sua inscrição. Tente novamente em instantes.",
    "retry": "Tentar novamente",
    "home": "Ir para a página inicial"
  },
  "embed": {
    "title": "Adicione um formulário de inscrição ao seu site",
    "intro": "Cole um destes trechos no seu site. Quem se inscreve recebe um e-mail de confirmação e, depois, suas edições no próprio idioma.",
    "linkLabel": "Link da página de inscrição",
    "linkHint": "Compartilhe na bio de uma rede social, em uma assinatura de e-mail ou em um QR code.",
    "scriptLabel": "Tag script (recomendado)",
    "scriptHint": "Cole onde o formulário deve aparecer. O formulário ajusta o próprio tamanho.",
    "iframeLabel": "Iframe",
    "iframeHint": "Use esta opção se seu site não permite scripts.",
    "copy": "Copiar",
    "copied": "Copiado",
    "copyFailed": "Selecione o texto e copie manualmente.",
    "options": "Opções do formulário",
    "accent": "Cor do botão",
    "accentHint": "Deixe como está para usar a cor da sua marca.",
    "theme": "Tema",
    "themeAuto": "Seguir a configuração do visitante",
    "themeLight": "Claro",
    "themeDark": "Escuro",
    "layout": "Layout",
    "layoutFull": "Completo (título, nome e idioma)",
    "layoutCompact": "Compacto (e-mail e botão)",
    "preview": "Prévia",
    "previewNote": "A prévia é real. Uma inscrição aqui cria um assinante real.",
    "missing": "Crie uma newsletter primeiro. O formulário de inscrição aparece aqui quando ela existir."
  },
  "page": {
    "poweredBy": "Funciona com AIBAN",
    "title": "Inscrever-se"
  },
  "signature": {
    "title": "Assinatura de e-mail",
    "intro": "Os leitores veem isto no fim de cada edição. Clique em qualquer parte da prévia para editar.",
    "show": "Mostrar minha assinatura em cada edição",
    "showHint": "Se desativar, as edições terminam depois do artigo.",
    "preview": "Prévia",
    "previewEmpty": "Sua assinatura está vazia. Adicione seu nome para começar.",
    "articleEnd": "Fim do artigo",
    "tabContent": "Conteúdo",
    "tabStyle": "Estilo",
    "blocks": "O que incluir",
    "blocksHint": "Selecione uma etiqueta para mostrar ou ocultar essa parte. As partes ocultas mantêm o texto.",
    "layout": "Layout",
    "layouts": {
      "bar": "Barra colorida",
      "photo": "Foto",
      "stacked": "Empilhado",
      "centered": "Centralizado",
      "minimal": "Só texto"
    },
    "fields": {
      "name": "Nome",
      "role": "Cargo",
      "company": "Empresa",
      "phone": "Telefone",
      "email": "E-mail",
      "website": "Site",
      "address": "Endereço",
      "photoUrl": "Foto",
      "logoUrl": "Logo",
      "socials": "Redes sociais",
      "cta": "Botão",
      "disclaimer": "Aviso legal"
    },
    "groups": {
      "about": "Sobre você",
      "contact": "Contato",
      "images": "Imagens",
      "socials": "Redes sociais",
      "cta": "Botão",
      "disclaimer": "Aviso legal"
    },
    "placeholders": {
      "name": "Ana Ruiz",
      "role": "Fundadora",
      "company": "Estúdio Ribeira",
      "phone": "+1 555 010 2030",
      "email": "ana@example.com",
      "website": "example.com",
      "address": "Rua Principal, 120, Springfield",
      "imageUrl": "https://",
      "socialUrl": "https://",
      "ctaLabel": "Agende uma conversa",
      "ctaUrl": "https://"
    },
    "ctaText": "Texto do botão",
    "ctaLink": "Link do botão",
    "hints": {
      "photoUrl": "Link para um PNG ou JPG quadrado, com pelo menos 144 por 144 pixels e menos de 200 KB. Aparece com 72 por 72 pixels ao lado do seu nome.",
      "logoUrl": "Link para um PNG ou JPG com fundo transparente ou branco, com pelo menos 64 pixels de altura. Aparece com 32 pixels de altura.",
      "website": "Adicionamos https:// se você não incluir.",
      "cta": "O texto e o link são necessários para o botão aparecer.",
      "disclaimer": "Letras miúdas no final, por exemplo um aviso de confidencialidade. Deixe em branco se não precisar."
    },
    "style": {
      "accent": "Cor de destaque",
      "accentHint": "Usada na barra, nos links e no botão. Começa com a cor da sua marca.",
      "font": "Fonte",
      "fontSans": "Sem serifa",
      "fontSerif": "Serifada",
      "size": "Tamanho do texto",
      "sizeMd": "Normal",
      "sizeSm": "Pequeno",
      "shape": "Formato da foto",
      "shapeRound": "Redonda",
      "shapeSquare": "Quadrada"
    },
    "hidden": "oculto",
    "reset": "Começar de novo",
    "resetConfirm": "Selecione de novo para limpar todos os campos"
  }
};
