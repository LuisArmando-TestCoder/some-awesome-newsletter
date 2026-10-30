// pt (Portuguese (Brazil)) strings for locales-newflow. GENERATED from en.ts by scripts/i18n-generate.mjs.
// Do not edit by hand: change en.ts and run npm run i18n:generate. Missing items fall back to English.
export default {
  "onboarding": {
    "progress": "Etapa {current} de {total}",
    "progressLabel": "Progresso da configuração",
    "back": "Voltar",
    "skip": "Pular esta etapa",
    "continue": "Continuar",
    "whyLabel": "Por que perguntamos",
    "skipLabel": "Se você pular",
    "working": "Processando...",
    "start": {
      "title": "Crie sua newsletter",
      "opening": "Abrindo a configuração. Se nada acontecer,",
      "continueHere": "continue aqui"
    },
    "tryAgain": "Tentar novamente",
    "website": {
      "title": "Qual é o seu site?",
      "why": "Lemos seu site para encontrar os artigos que vão formar sua newsletter e para deduzir quem são seus leitores.",
      "skipNote": "Se você ainda não tem um site, escolha um tema e usaremos um site de notícias sobre ele.",
      "label": "Endereço do site",
      "hint": "Por exemplo suaempresa.com ou suaempresa.com/blog",
      "placeholder": "suaempresa.com",
      "submit": "Continuar",
      "checking": "Lendo seu site...",
      "noWebsite": "Não tenho site",
      "haveWebsite": "Tenho um site",
      "topicTitle": "Escolha um tema",
      "topicHint": "Usaremos um site de notícias sobre este tema como sua primeira fonte. Você pode mudar depois.",
      "errors": {
        "empty": "Digite o endereço do seu site para continuar.",
        "invalid": "Isso não parece um endereço web. Verifique a grafia, por exemplo suaempresa.com.",
        "unreachable": "Não encontramos artigos nesta página. Tente seu blog ou sua página de notícias, por exemplo suaempresa.com/blog.",
        "network": "Não foi possível conectar aos nossos servidores. Verifique sua conexão e tente novamente."
      }
    },
    "readers": {
      "title": "Quem lê sua newsletter?",
      "why": "Escrevemos cada edição para este leitor e neste idioma. Assinantes que falam outro idioma recebem a própria cópia traduzida.",
      "skipNote": "Preenchemos estes campos a partir do seu site. Altere o que estiver errado.",
      "languageLabel": "Idioma principal",
      "languageHint": "Pegamos isto das configurações do seu navegador.",
      "readerLabel": "Seu leitor ideal",
      "readerHint": "Uma frase basta. Por exemplo: donos de pequenos restaurantes em Lisboa.",
      "readerPlaceholder": "Para quem é esta newsletter?",
      "errors": {
        "reader": "Descreva seu leitor em poucas palavras para sabermos para quem escrever."
      }
    },
    "preview": {
      "title": "Esta é sua primeira edição",
      "why": "Este é o e-mail que seus assinantes vão receber, escrito a partir do seu artigo mais recente. Nada foi enviado ainda.",
      "generating": "Escrevendo sua primeira edição a partir do seu artigo mais recente. Isso costuma levar menos de um minuto.",
      "inboxFrom": "De",
      "inboxTo": "Para",
      "inboxSubject": "Assunto",
      "defaultSubject": "Sua primeira edição",
      "sendTest": "Enviar um teste para mim",
      "sendingTest": "Enviando...",
      "testSent": "Teste enviado para {email}. Confira sua caixa de entrada e a pasta de spam.",
      "regenerate": "Escrever de novo",
      "looksGood": "Está bom, continuar",
      "skipPreview": "Continuar sem prévia",
      "howTitle": "Como encontramos seus artigos",
      "howBody": "Salvamos uma regra curta que indica onde estão os links dos artigos na sua página, para ignorar menus e anúncios. Você só precisa mudá-la se a prévia pegou o conteúdo errado.",
      "ruleLabel": "Regra de artigos",
      "findAgain": "Encontrar artigos de novo",
      "errors": {
        "generate": "Não foi possível escrever a edição. A página pode bloquear a leitura automática. Tente novamente ou volte e use a página do seu blog.",
        "test": "O e-mail de teste não foi enviado. Tente novamente em instantes."
      }
    },
    "senderName": {
      "title": "Como seu nome deve aparecer na caixa de entrada?",
      "why": "Os assinantes veem este nome ao lado de cada edição, assim eles reconhecem e abrem.",
      "skipNote": "Se você pular, o remetente aparece como AIBAN. Você pode mudar o nome depois em Configurações.",
      "label": "Nome do remetente",
      "hint": "Seu nome, sua empresa ou o nome da newsletter. Até 60 caracteres.",
      "placeholder": "Estúdio Silva",
      "previewLabel": "Como aparece em uma caixa de entrada",
      "previewBody": "Sua edição aparece com este nome de remetente. Ela é enviada do endereço de envio do AIBAN.",
      "save": "Salvar e continuar",
      "errors": {
        "empty": "Digite um nome de remetente com pelo menos 2 caracteres.",
        "long": "O nome do remetente deve ter no máximo 60 caracteres.",
        "save": "Não foi possível salvar o nome. Tente novamente em instantes."
      }
    },
    "signature": {
      "title": "Assinatura de e-mail",
      "why": "Sua assinatura vai no fim de cada edição, para que os leitores saibam quem escreveu e como falar com você.",
      "skipNote": "Se você pular, as edições terminam só com o nome da sua newsletter.",
      "nameLabel": "Seu nome",
      "namePlaceholder": "Ana Silva",
      "roleLabel": "Cargo ou empresa",
      "rolePlaceholder": "Fundadora, Estúdio Silva",
      "linkLabel": "Link",
      "linkHint": "Seu site ou um perfil em rede social. Opcional.",
      "linkPlaceholder": "suaempresa.com",
      "previewLabel": "Como aparece no fim de um e-mail",
      "previewBody": "Obrigado pela leitura. Até a próxima edição.",
      "save": "Salvar assinatura",
      "existingNote": "Você já tem uma assinatura. Salvar aqui vai substituí-la."
    },
    "schedule": {
      "title": "Quando as novas edições devem ser enviadas?",
      "why": "Verificamos seu site antes de cada envio e escrevemos uma nova edição com os artigos mais recentes.",
      "skipNote": "Você pode mudar o dia e o horário, ou pausar os envios, quando quiser no painel.",
      "scheduleLabel": "Horário de envio",
      "frequencyLabel": "Frequência",
      "daily": "Todos os dias",
      "weekly": "Toda semana",
      "monthly": "Todo mês, no dia 1",
      "dayLabel": "Dia",
      "timeLabel": "Horário",
      "timeHint": "No seu horário local.",
      "summaryDaily": "Todos os dias às {time}, no seu horário ({zone}).",
      "summaryWeekly": "Toda {day} às {time}, no seu horário ({zone}).",
      "summaryMonthly": "No dia 1 de cada mês às {time}, no seu horário ({zone}).",
      "recipeTitle": "Enviar novas edições automaticamente",
      "recipeBody": "Na frequência acima, escolhemos seu melhor artigo novo, escrevemos com a sua voz, traduzimos para cada leitor e enviamos por e-mail.",
      "recipeOn": "Ativado",
      "recipeOff": "Desativado. As edições só são enviadas quando você clica em Enviar.",
      "save": "Salvar e continuar",
      "saving": "Salvando sua newsletter...",
      "errors": {
        "create": "Não foi possível salvar sua newsletter. Tente novamente em instantes.",
        "limit": "O seu plano não permite outra fonte. Para adicionar uma, escreva para nós e mudaremos o seu plano."
      }
    },
    "send": {
      "title": "Envie sua primeira edição",
      "why": "Enviar agora mostra o caminho completo: sua edição chega a uma caixa de entrada real, no idioma do leitor.",
      "skipNote": "Se você pular, a primeira edição é enviada no horário programado.",
      "youAreSubscribed": "Você já está inscrito como {email}.",
      "othersLabel": "Convidar pessoas (opcional)",
      "othersHint": "Cole endereços de e-mail separados por vírgulas ou quebras de linha. Cada pessoa recebe um convite pessoal seu. Elas só recebem edições se aceitarem, e excluímos os convites não aceitos após 30 dias.",
      "othersPlaceholder": "ana@exemplo.com, li@exemplo.com",
      "sendNow": "Enviar agora",
      "sending": "Enviando sua primeira edição...",
      "sentTitle": "Sua primeira edição está a caminho",
      "sentBody": "Ela vai para todas as pessoas da sua lista que confirmaram a inscrição. Pode levar alguns minutos para chegar.",
      "invited": "Convites enviados para {count} pessoas. Elas entram na sua lista quando aceitarem.",
      "invitesUnavailable": "Os convites ainda não estão disponíveis, então não salvamos estes endereços. Na próxima etapa, copie seu link de inscrição e envie você mesmo.",
      "continue": "Continuar",
      "errors": {
        "invalidEmails": "Estes endereços parecem errados: {list}. Corrija ou remova.",
        "add": "Não foi possível convidar: {list}. Tente de novo mais tarde em Assinantes.",
        "send": "A edição não foi enviada. Tente novamente em instantes."
      }
    },
    "share": {
      "title": "Conquiste seus primeiros assinantes",
      "why": "Quem se inscreve aqui recebe cada edição no próprio idioma.",
      "skipNote": "Você encontra este link e o código de incorporação depois em Assinantes, em Formulário de inscrição.",
      "linkLabel": "Página de inscrição",
      "linkHint": "Compartilhe nas redes sociais, no rodapé dos seus e-mails ou em um QR code.",
      "embedLabel": "Formulário de inscrição para seu site",
      "embedHint": "Cole este código onde você quer que o formulário apareça no seu site.",
      "copy": "Copiar",
      "copied": "Copiado",
      "open": "Abrir a página de inscrição"
    },
    "done": {
      "title": "Sua newsletter está configurada",
      "why": "Veja o que acontece agora e o que ainda falta fazer.",
      "planLine": "Plano atual: {plan}",
      "changePlan": "Ver planos",
      "toDashboard": "Ir para o painel",
      "summarySource": "Fonte: {url}",
      "summarySchedule": "Frequência: {schedule}",
      "summaryAutomation": "Envio automático: {state}",
      "on": "ativado",
      "off": "desativado"
    }
  },
  "tutorial": {
    "checklistTitle": "Primeiros passos",
    "checklistProgress": "{done} de {total} concluídos",
    "checklistDone": "Tudo pronto. Sua newsletter agora funciona sozinha.",
    "dismiss": "Ocultar lista",
    "doneLabel": "concluído",
    "todoLabel": "pendente",
    "show": "Mostrar primeiros passos",
    "items": {
      "source": {
        "title": "Adicione de onde vem seu conteúdo",
        "body": "Um site ou blog que verificamos em busca de artigos novos."
      },
      "sender": {
        "title": "Escolha seu nome de remetente",
        "body": "O nome que os assinantes veem ao lado de cada edição."
      },
      "subscriber": {
        "title": "Conquiste seu primeiro assinante",
        "body": "Alguém além de você se inscreve ou é adicionado."
      },
      "send": {
        "title": "Envie sua primeira edição",
        "body": "Uma edição real chega às pessoas da sua lista."
      },
      "automation": {
        "title": "Ative o envio automático",
        "body": "As novas edições são enviadas na sua programação."
      },
      "widget": {
        "title": "Adicione o formulário de inscrição ao seu site",
        "body": "Os visitantes podem se inscrever sem sair do seu site."
      }
    },
    "open": "Abrir",
    "tour": {
      "start": "Fazer um tour rápido",
      "next": "Próximo",
      "back": "Voltar",
      "skip": "Pular tour",
      "finish": "Concluir",
      "stepOf": "{current} de {total}"
    },
    "help": {
      "whatIsThis": "O que é isto?",
      "whyItMatters": "Por que é importante",
      "close": "Fechar"
    }
  },
  "auth": {
    "emailLabel": "Endereço de e-mail",
    "emailHint": "Enviamos um código de 6 dígitos para este endereço. Você não precisa de senha.",
    "codeTitle": "Confira seu e-mail",
    "codeSentTo": "Enviamos um código de 6 dígitos para {email}.",
    "codeHint": "O código pode levar um minuto para chegar. Confira também a pasta de spam.",
    "changeEmail": "Usar outro e-mail",
    "resend": "Enviar um novo código",
    "resendIn": "Você pode pedir um novo código em {seconds} s",
    "resendLimit": "Se o código ainda não chegou, escreva para nós pela página de Ajuda e resolveremos.",
    "resent": "Enviamos um novo código.",
    "verifying": "Verificando seu código...",
    "errors": {
      "email": "Digite um e-mail completo, por exemplo voce@empresa.com.",
      "send": "Não foi possível enviar o código. Verifique sua conexão e tente novamente.",
      "busy": "O login está pausado por um tempo porque o AIBAN atingiu seu limite diário do banco de dados. Tente novamente em algumas horas.",
      "tooMany": "Você solicitou vários códigos seguidos. Aguarde alguns minutos e tente novamente.",
      "code": "Esse código não funcionou. Confira os 6 dígitos ou peça um novo código."
    }
  }
};
