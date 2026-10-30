// pt strings for locales. English (en.ts) is the source. Key order and shape follow en.ts.
// Maintained by WS9; check with: node --experimental-strip-types --no-warnings scripts/i18n-check.mjs --locale pt
export default {
  "auth": {
    "logo": "/icons/logo.png",
    "login": {
      "pageTitle": "Entrar",
      "title": "Entre no AIBAN",
      "subtitle": "Conecte-se para continuar de onde parou.",
      "google": "Continuar com Google",
      "or": "ou",
      "emailPlaceholder": "voce@exemplo.com",
      "continueWithEmail": "Continuar com e-mail",
      "switchText": "Ainda não tem uma conta?",
      "switchLink": "Criar conta",
      "switchHref": "/signup"
    },
    "signup": {
      "pageTitle": "Criar conta",
      "title": "Crie sua conta",
      "subtitle": "Você não precisa de cartão de crédito.",
      "google": "Continuar com Google",
      "or": "ou",
      "emailPlaceholder": "voce@exemplo.com",
      "continueWithEmail": "Continuar com e-mail",
      "switchText": "Já tem uma conta?",
      "switchLink": "Entrar",
      "switchHref": "/login"
    }
  },
  "landing": {
    "seo": {
      "title": "AIBAN | Seu site transformado em newsletter no idioma de cada leitor",
      "description": "O AIBAN lê o que você já publica, escreve uma edição da newsletter com a sua voz e a envia com o seu nome. Cada assinante recebe no próprio idioma.",
      "ogImageAlt": "Logo do AIBAN"
    },
    "skipLink": "Pular para o conteúdo principal",
    "hero": {
      "eyebrow": "Newsletters para empresas de serviços",
      "title": "Seu site vira uma newsletter semanal, no idioma de cada leitor",
      "lead": "O AIBAN lê o conteúdo que você já publica, escreve uma edição com a sua voz e a envia com o seu nome. Cada assinante recebe no idioma em que lê. Você configura uma vez e ele continua funcionando.",
      "formLabel": "Seu site",
      "formPlaceholder": "suaempresa.com",
      "formHint": "Criamos uma edição de exemplo a partir do endereço que você digitar. Começar é grátis e você não precisa de cartão.",
      "formSubmit": "Ver minha newsletter",
      "formError": "Digite um endereço web, como suaempresa.com.",
      "secondaryCta": "Ver como funciona"
    },
    "preview": {
      "badge": "Prévia de exemplo",
      "note": "Este é um layout de exemplo com texto provisório. Quando você começa, o AIBAN escreve a edição real a partir do seu artigo mais recente.",
      "fromLabel": "De",
      "toLabel": "Para",
      "subjectLabel": "Assunto",
      "languageLabel": "Idioma do leitor",
      "readOnBlog": "Ler no blog",
      "startCta": "Comece grátis com {site}",
      "startCtaGeneric": "Comece grátis",
      "liveRegion": "Prévia de exemplo atualizada para {site}."
    },
    "chain": {
      "eyebrow": "Como funciona",
      "title": "Você configura uma vez e depois ele funciona sozinho",
      "lead": "Você informa seu site ao AIBAN uma única vez. Depois disso, cada etapa abaixo acontece sozinha, na frequência que você escolher.",
      "triggerLabel": "Quando",
      "actionLabel": "Então",
      "trigger": {
        "title": "É segunda-feira, 9:00",
        "body": "Ou a frequência que você escolher: diária, semanal ou mensal."
      },
      "steps": [
        {
          "title": "O AIBAN encontra seu artigo mais recente",
          "body": "Ele verifica seu site e escolhe o conteúdo que mais vai interessar ao seu leitor ideal."
        },
        {
          "title": "Ele escreve a edição com a sua voz",
          "body": "O texto é reescrito para soar como você, com base em como seu site é escrito."
        },
        {
          "title": "Ele traduz a edição para cada leitor",
          "body": "Cada assinante recebe no idioma que escolheu ao se inscrever."
        },
        {
          "title": "Ele envia com o seu nome",
          "body": "Os leitores veem seu nome, e as respostas chegam à sua caixa de entrada."
        },
        {
          "title": "Ele publica a edição no seu blog",
          "body": "Cada edição também ganha uma página pública de artigo com link próprio."
        },
        {
          "title": "Ele mostra o que aconteceu",
          "body": "Seu painel mostra quem se inscreveu e em quais links os leitores clicaram."
        }
      ],
      "alsoTitle": "Ele também funciona quando",
      "also": [
        {
          "title": "Alguém se inscreve no seu site",
          "body": "A pessoa confirma por e-mail e começa a receber suas edições."
        },
        {
          "title": "Você cola um link ou um texto",
          "body": "O AIBAN escreve e envia uma edição sobre o assunto, seguindo as mesmas etapas."
        },
        {
          "title": "Você envia uma lista de contatos",
          "body": "O AIBAN limpa a lista, remove duplicados e deduz o idioma de cada contato."
        }
      ]
    },
    "languages": {
      "eyebrow": "Todos os idiomas",
      "title": "Cada leitor recebe a edição no próprio idioma",
      "body": "Você não precisa escrever versões separadas. O AIBAN traduz cada edição para todos os idiomas que seus assinantes leem e mantém seu tom em cada um. A lista inclui espanhol, português, francês, alemão, hindi, árabe, japonês e muitos outros.",
      "sampleNote": "A mesma edição de exemplo, como três leitores a receberiam."
    },
    "sender": {
      "eyebrow": "Seu endereço",
      "title": "Enviado com o seu nome",
      "body": "As edições chegam com o seu nome e a sua assinatura de e-mail. O AIBAN envia de um endereço próprio e verificado, então você nunca compartilha a senha do seu e-mail conosco. Quando um leitor responde, a resposta vai para a sua caixa de entrada.",
      "inboxLabel": "Como aparece na caixa de entrada de um leitor",
      "inboxFrom": "Você",
      "inboxSubject": "Esta semana em {site}",
      "inboxSnippet": "Um resumo curto do seu artigo mais recente, escrito com a sua voz.",
      "inboxTime": "9:00"
    },
    "grow": {
      "eyebrow": "Aumente sua lista",
      "title": "Um formulário de inscrição para seu site e um blog que se preenche sozinho",
      "items": [
        {
          "title": "Formulário de inscrição",
          "body": "Adicione o formulário do AIBAN ao seu site. Novos leitores escolhem o idioma e confirmam por e-mail."
        },
        {
          "title": "Blog automático",
          "body": "Cada edição vira uma página pública de artigo que as pessoas encontram em buscadores e compartilham com um link."
        },
        {
          "title": "Importação de contatos",
          "body": "Traga os clientes que você já tem a partir de um arquivo CSV ou Excel, ou cole uma lista."
        }
      ]
    },
    "useCases": {
      "eyebrow": "Para quem é",
      "title": "Feito para empresas que crescem por meio de relacionamentos",
      "lead": "Se seus clientes chegam por indicação e confiança, um recado seu com regularidade faz com que lembrem de você. O AIBAN escreve esse recado por você.",
      "items": [
        {
          "title": "Agências e web designers",
          "body": "Envie toda semana seus trabalhos e artigos mais recentes para clientes e potenciais clientes, e use a mesma configuração para os sites dos clientes."
        },
        {
          "title": "Empresas de TI e software",
          "body": "Transforme notas de versão e posts do blog em uma atualização curta que cada cliente lê no próprio idioma."
        },
        {
          "title": "Imobiliárias",
          "body": "Compartilhe novos imóveis e artigos sobre o mercado com compradores e vendedores que falam idiomas diferentes."
        },
        {
          "title": "Advogados e contadores",
          "body": "Mantenha seus clientes informados sobre os temas sobre os quais você já escreve, em um formato tranquilo e constante."
        },
        {
          "title": "Coaches e instrutores",
          "body": "Envie sua aula ou artigo mais recente para sua comunidade em um dia fixo, sem precisar escrever de novo."
        }
      ]
    },
    "pricingIntro": {
      "eyebrow": "Preços",
      "title": "Comece grátis e mude de plano quando sua lista crescer",
      "lead": "O plano gratuito inclui 1 fonte e até 100 assinantes. Os planos pagos adicionam mais fontes e mais assinantes."
    },
    "faqTitle": "Perguntas frequentes antes de começar",
    "faq": [
      {
        "id": "what-do-i-need",
        "q": "Do que eu preciso para começar?",
        "a": "O endereço do seu site e um endereço de e-mail. O AIBAN lê seu site para conhecer seus temas e seu jeito de escrever."
      },
      {
        "id": "do-i-write",
        "q": "Eu preciso escrever alguma coisa?",
        "a": "Não precisa. O AIBAN escreve cada edição a partir do seu conteúdo. Quando quiser uma edição sobre algo específico, você pode colar um link ou um texto."
      },
      {
        "id": "languages",
        "q": "Em quais idiomas meus leitores podem receber?",
        "a": "O AIBAN traduz cada edição para o idioma que cada assinante lê. Você vê a lista completa de idiomas ao configurar sua newsletter."
      },
      {
        "id": "sender",
        "q": "De quem os e-mails são enviados?",
        "a": "Do endereço de envio do AIBAN, com o seu nome como remetente. As respostas vão direto para a sua caixa de entrada. Você nunca nos passa a senha do seu e-mail."
      },
      {
        "id": "contacts",
        "q": "Posso trazer meus contatos atuais?",
        "a": "Sim. Envie um arquivo CSV ou Excel, ou cole uma lista. O AIBAN limpa a lista, remove duplicados e deduz o idioma de cada contato."
      },
      {
        "id": "schedule",
        "q": "Com que frequência as edições são enviadas?",
        "a": "Você escolhe a frequência na configuração e pode mudá-la quando quiser no seu painel."
      },
      {
        "id": "free-plan",
        "q": "Existe um plano gratuito?",
        "a": "Sim. O plano gratuito inclui 1 fonte e até 100 assinantes. Os planos pagos adicionam mais fontes e assinantes."
      },
      {
        "id": "cancel",
        "q": "Posso cancelar?",
        "a": "Sim. Escreva para info@aiban.news quando quiser e cancelaremos o seu plano pago ou voltaremos você para o plano gratuito."
      }
    ],
    "finalCta": {
      "title": "Comece com seu site",
      "body": "Informe seu site ao AIBAN, confira sua primeira edição e ative quando estiver pronto.",
      "cta": "Comece grátis",
      "secondary": "Ler a central de ajuda"
    },
    "footer": {
      "tagline": "Newsletters escritas a partir do seu próprio conteúdo e enviadas no idioma de cada leitor.",
      "product": "Produto",
      "company": "Empresa",
      "legal": "Jurídico",
      "links": {
        "howItWorks": "Como funciona",
        "pricing": "Preços",
        "demo": "Demonstração",
        "help": "Central de ajuda",
        "about": "Sobre",
        "careers": "Carreiras",
        "privacy": "Política de privacidade",
        "terms": "Termos de serviço",
        "cookies": "Política de cookies"
      },
      "contactLabel": "Contato",
      "rights": "Todos os direitos reservados."
    }
  },
  "help": {
    "title": "Solicitar limites maiores",
    "subtitle": "Conte quais limites você precisa e responderemos por e-mail.",
    "contact": {
      "cta": "Enviar solicitação",
      "successTitle": "Solicitação pronta para enviar",
      "successBody": "Seu aplicativo de e-mail abriu com a sua solicitação. Envie por lá e responderemos por e-mail.",
      "learnMore": "/plans"
    },
    "questions": {
      "desiredLimitsHelp": "Informe os limites de que você precisa, por exemplo quantos assinantes e fontes.",
      "useCaseHelp": "Descreva o que você envia, para quem e com que frequência.",
      "expectedSpendHelp": "Uma estimativa aproximada nos ajuda a sugerir um plano. Você pode deixar como desconhecido."
    },
    "form": {
      "nameLabel": "Nome",
      "emailLabel": "E-mail",
      "companyLabel": "Empresa",
      "optional": "(opcional)",
      "limitsLabel": "Limites de que você precisa",
      "useCaseLabel": "Como você usa o AIBAN",
      "spendLabel": "Gasto mensal previsto",
      "spend": {
        "lt500": "Menos de US$ 500",
        "500_2k": "De US$ 500 a US$ 2.000",
        "2k_10k": "De US$ 2.000 a US$ 10.000",
        "gt10k": "Mais de US$ 10.000",
        "unknown": "Ainda não sei"
      },
      "urgencyLabel": "Urgência",
      "urgency": {
        "low": "Baixa",
        "normal": "Normal",
        "high": "Alta"
      },
      "replyLabel": "Como devemos responder?",
      "reply": {
        "email": "Por e-mail",
        "call": "Por telefone"
      },
      "payAsYouGo": "Tenho interesse em pagar conforme o uso",
      "sending": "Enviando...",
      "sentTitle": "Solicitação enviada",
      "sentBody": "Recebemos a sua solicitação e vamos responder no e-mail que você informou.",
      "retryBefore": "Se o seu app de e-mail não abriu,",
      "retryLink": "abra a solicitação de novo",
      "retryAfter": "ou escreva para",
      "errors": {
        "name": "Informe o seu nome (pelo menos 2 caracteres).",
        "email": "Informe um e-mail para o qual possamos responder, como nome@exemplo.com.",
        "company": "Digite pelo menos 2 caracteres ou deixe em branco.",
        "desiredLimits": "Descreva os limites de que você precisa em pelo menos 10 caracteres.",
        "useCase": "Descreva o seu uso em pelo menos 20 caracteres."
      }
    },
    "faqs": [
      {
        "id": "limits-how",
        "q": "Como funcionam os limites maiores?",
        "a": "Envie uma solicitação com os limites de que você precisa. Respondemos por e-mail com as opções para sua conta."
      }
    ],
    "links": {
      "docs": "/plans",
      "community": "/help"
    }
  },
  "faq": [
    {
      "q": "O que o AIBAN faz?",
      "a": "O AIBAN lê conteúdo que você já publica, como o seu site, o seu blog ou sites de notícias que você escolher. Ele escreve novas edições com a sua voz e as envia como newsletter. Cada assinante recebe no idioma que escolheu, com o seu nome como remetente."
    },
    {
      "q": "Existe um plano gratuito?",
      "a": "Sim. O plano gratuito inclui 1 fonte e até 100 assinantes. Se precisar de mais, escreva para nós e mudaremos o seu plano."
    },
    {
      "q": "Como os assinantes recebem a newsletter no idioma deles?",
      "a": "Cada assinante escolhe um idioma preferido ao se inscrever. O AIBAN traduz cada edição para esse idioma antes de enviar."
    },
    {
      "q": "As edições podem sair do meu próprio e-mail?",
      "a": "As edições saem do endereço de envio do AIBAN com o seu nome e a sua assinatura de e-mail, e as respostas vão para a sua caixa de entrada. Não pedimos a senha do seu e-mail, então não há nada seu que possa vazar."
    },
    {
      "q": "Como as pessoas se inscrevem?",
      "a": "Você recebe uma página de inscrição e um widget de inscrição para colocar no seu site. Você também pode adicionar pessoas manualmente ou enviar uma lista."
    },
    {
      "q": "Posso cancelar a qualquer momento?",
      "a": "Sim. Escreva para info@aiban.news quando quiser e cancelaremos o seu plano pago ou voltaremos você para o plano gratuito."
    }
  ],
  "plans": {
    "currency": "USD",
    "billingIntervals": [
      "mensal",
      "anual"
    ],
    "currentPlan": "free",
    "plans": [
      {
        "id": "free",
        "name": "Gratuito",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Experimente o AIBAN com uma fonte",
        "featuresBase": [
          "1 fonte",
          "Até 100 assinantes"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": 1,
          "users": 100
        },
        "ctaLabel": "Plano atual",
        "tier": 0
      },
      {
        "id": "starter",
        "name": "Starter",
        "monthly": 17,
        "yearly": 132,
        "tagline": "Para newsletters em crescimento",
        "featuresBase": [
          "5 fontes",
          "Até 100 mil assinantes"
        ],
        "featuresDelta": [
          "Suporte por e-mail",
          "Tradução básica"
        ],
        "limits": {
          "newsSources": 5,
          "users": 100000
        },
        "ctaLabel": "Escolher Starter",
        "productId": "prod_starter_id",
        "tier": 1
      },
      {
        "id": "growth",
        "name": "Growth",
        "monthly": 35,
        "yearly": 273,
        "tagline": "Para newsletters já estabelecidas",
        "featuresBase": [
          "17 fontes",
          "Até 250 mil assinantes"
        ],
        "featuresDelta": [
          "Branding personalizado",
          "Analytics avançado"
        ],
        "limits": {
          "newsSources": 17,
          "users": 250000
        },
        "ctaLabel": "Escolher Growth",
        "productId": "prod_growth_id",
        "tier": 2
      },
      {
        "id": "pro",
        "name": "Pro",
        "monthly": 80,
        "yearly": 624,
        "tagline": "Para profissionais de marketing",
        "featuresBase": [
          "25 fontes",
          "Até 500 mil assinantes"
        ],
        "featuresDelta": [
          "Acesso à API",
          "Processamento prioritário"
        ],
        "limits": {
          "newsSources": 25,
          "users": 500000
        },
        "ctaLabel": "Escolher Pro",
        "productId": "prod_pro_id",
        "tier": 3
      },
      {
        "id": "master",
        "name": "Master",
        "monthly": 150,
        "yearly": 1170,
        "tagline": "Para públicos grandes",
        "featuresBase": [
          "50 fontes",
          "Assinantes ilimitados"
        ],
        "featuresDelta": [
          "Suporte VIP",
          "Webhooks personalizados"
        ],
        "limits": {
          "newsSources": 50,
          "users": -1
        },
        "ctaLabel": "Escolher Master",
        "productId": "prod_master_id",
        "tier": 4
      },
      {
        "id": "vipfree",
        "name": "VIP Grátis",
        "monthly": 0,
        "yearly": 0,
        "tagline": "Acesso total para parceiros",
        "featuresBase": [
          "Fontes ilimitadas",
          "Assinantes ilimitados"
        ],
        "featuresDelta": [],
        "limits": {
          "newsSources": -1,
          "users": -1
        },
        "ctaLabel": "Plano atual",
        "internalOnly": true,
        "tier": 5
      }
    ],
    "contact": {
      "text": "Precisa de uma solução personalizada?",
      "cta": "Fale conosco",
      "href": "/help"
    }
  },
  "article": {
    "notFound": "Artigo não encontrado.",
    "errorFetching": "Não conseguimos carregar este artigo. Recarregue a página daqui a um minuto para tentar de novo.",
    "noArticleSpecified": "Nenhum artigo especificado.",
    "goBack": "Voltar",
    "loading": "Carregando..."
  },
  "pricing": {
    "eyebrow": "Preços",
    "title": "Planos e preços",
    "currentPlan": "Plano atual:",
    "monthly": "Mensal",
    "yearly": "Anual",
    "yearlySave": "Economize 35%",
    "intervalLabel": "Período de cobrança",
    "billedYearly": "cobrado anualmente",
    "perMonthShort": "/mo",
    "perYearShort": "/yr",
    "freeCta": "Comece grátis",
    "processing": "Abrindo o pagamento...",
    "askMore": "Toda conta começa no plano Gratuito. Se precisar de mais, escreva para {email} e mudaremos o seu plano.",
    "askFor": "Pedir o {planName}",
    "askAction": "Escreva para nós",
    "checkoutError": "Não foi possível abrir o pagamento. Tente novamente em instantes.",
    "networkError": "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
    "includes": "Inclui",
    "pageMetaTitle": "Preços | AIBAN",
    "pageMetaDescription": "Planos e preços do AIBAN. Comece grátis com 1 fonte e até 100 assinantes e passe para um plano mensal ou anual quando precisar de mais.",
    "pageTitle": "Preços",
    "pageLead": "Comece no plano gratuito com 1 fonte e até 100 assinantes. Quando precisar de mais fontes ou mais assinantes, escreva para nós e passaremos você para um plano pago, com cobrança mensal ou anual.",
    "faqTitle": "Perguntas sobre cobrança",
    "contactText": "Precisa de limites maiores ou de uma configuração personalizada?",
    "contactCta": "Fale conosco",
    "everythingIn": "Tudo do plano anterior, mais:",
    "isCurrentPlan": "Este é seu plano atual",
    "downgradeTo": "Mudar para {planName}",
    "upgradeTo": "Escolher {planName}",
    "mockMode": "Modo de teste",
    "mostPopular": "Mais popular",
    "perMonth": "por mês",
    "perYear": "por ano",
    "youSave": "Você economiza"
  },
  "confirmSubscription": {
    "title": "Confirme sua inscrição",
    "goBack": "Voltar",
    "pleaseAccept": "Por favor, aceite os termos para concluir sua assinatura.",
    "iAccept": "Eu aceito os",
    "termsAndConditions": "Termos e condições",
    "and": "e",
    "privacyPolicy": "Política de privacidade",
    "confirm": "Confirmar inscrição",
    "mustAccept": "Você deve aceitar os termos para assinar.",
    "invalidLink": "Este link de confirmação está incompleto. Abra o último e-mail que enviamos e use o link que está nele."
  },
  "articles": {
    "title": "Artigos mais recentes",
    "subtitle": "Artigos que o AIBAN escreveu para as newsletters que envia.",
    "producedIn": "Idiomas em que estes artigos estão disponíveis",
    "searchPlaceholder": "Buscar artigos...",
    "noArticlesFound": "Nenhum artigo encontrado.",
    "created": "Criado em:",
    "language": "Idioma:",
    "rightsReserved": "Todos os direitos reservados.",
    "errorFetching": "Não conseguimos carregar os artigos. Recarregue a página daqui a um minuto para tentar de novo."
  },
  "blog": {
    "metaTitle": "Blog de {name}",
    "metaDescription": "Artigos de {name}. Inscreva-se para receber os novos por e-mail.",
    "eyebrow": "Blog da newsletter",
    "heroFrom": "Artigos de {name}",
    "heroDescription": "Estes são os artigos que esta newsletter publicou. Inscreva-se para receber os novos por e-mail.",
    "subscribe": "Inscrever-se",
    "home": "Início do blog",
    "featured": "Artigo mais recente",
    "latest": "Artigos mais recentes",
    "latestHint": "Os mais recentes primeiro. Alguns artigos não têm imagem e aparecem só como texto.",
    "articleCount": "{count} artigos em {language}",
    "articleCountOne": "1 artigo em {language}",
    "languages": "Escolha um idioma",
    "minRead": "{n} min de leitura",
    "readArticle": "Ler artigo",
    "page": "Página {page}",
    "newer": "Artigos mais novos",
    "older": "Artigos mais antigos",
    "pagination": "Páginas de artigos",
    "emptyTitle": "Ainda não há artigos",
    "emptyBody": "Esta newsletter ainda não publicou artigos aqui. Inscreva-se para receber o primeiro por e-mail.",
    "endTitle": "Não há artigos mais antigos",
    "endBody": "Você chegou ao fim da lista.",
    "backToNewest": "Ir para os artigos mais recentes",
    "errorTitle": "Não foi possível carregar estes artigos",
    "errorBody": "O servidor de artigos não respondeu a tempo. Recarregue a página daqui a um minuto para tentar de novo.",
    "reload": "Recarregar a página",
    "missingHolder": "Este link do blog está incompleto porque não indica de quem é o blog. Peça o link completo ao dono da newsletter.",
    "redirecting": "Abrindo o blog...",
    "publishedWith": "Publicado com AIBAN",
    "cta": {
      "title": "Receba o próximo artigo por e-mail",
      "body": "Inscreva-se em {name} e os novos artigos chegarão à sua caixa de entrada. Você pode cancelar a inscrição quando quiser.",
      "button": "Inscrever-se"
    },
    "search": {
      "label": "Buscar artigos",
      "placeholder": "Busque por palavra ou frase",
      "button": "Buscar",
      "suggestions": "Sugestões",
      "recent": "Buscas recentes",
      "clearRecent": "Limpar buscas recentes",
      "title": "Resultados da busca",
      "resultsFor": "Resultados para \"{q}\"",
      "count": "{count} artigos encontrados",
      "countOne": "1 artigo encontrado",
      "searching": "Buscando artigos",
      "emptyTitle": "Nenhum artigo corresponde a \"{q}\"",
      "emptyBody": "Verifique a ortografia ou tente uma palavra mais curta. Você também pode ver todos os artigos do blog.",
      "browseAll": "Ver todos os artigos",
      "noQuery": "Digite uma palavra ou frase acima para buscar neste blog.",
      "error": "A busca parou porque o servidor de artigos não respondeu. Tente novamente daqui a um minuto.",
      "tryAgain": "Tentar novamente",
      "limitNote": "Mostrando as primeiras {count} correspondências. Use uma frase mais específica para refinar a lista."
    },
    "article": {
      "back": "Todos os artigos",
      "published": "Publicado em {date}",
      "by": "Por {name}",
      "otherLanguages": "Leia mais em outros idiomas",
      "otherLanguagesHint": "Esta newsletter também publica nestes idiomas. Cada link abre o blog nesse idioma.",
      "share": "Compartilhar este artigo",
      "copyLink": "Copiar link",
      "copied": "Link copiado. Você pode colar onde quiser.",
      "copyFailed": "Não foi possível copiar o link. Copie da barra de endereços do navegador.",
      "notFoundTitle": "Artigo não encontrado",
      "notFoundBody": "Este artigo pode ter sido removido, ou o link está incompleto. Abra o blog para ver os outros artigos.",
      "errorTitle": "Não foi possível carregar este artigo",
      "errorBody": "O servidor de artigos não respondeu a tempo. Recarregue a página daqui a um minuto para tentar de novo.",
      "goToBlog": "Ir para o blog"
    }
  },
  "nav": {
    "mainLabel": "Principal",
    "legalLabel": "Jurídico",
    "home": "Início do AIBAN",
    "menu": "Menu",
    "openMenu": "Abrir menu",
    "closeMenu": "Fechar menu",
    "howItWorks": "Como funciona",
    "pricing": "Preços",
    "help": "Ajuda",
    "about": "Sobre",
    "privacy": "Privacidade",
    "terms": "Termos",
    "cookies": "Cookies",
    "signOut": "Sair",
    "chooseLanguage": "Escolha um idioma",
    "currentLanguage": "Idioma: {name}"
  },
  "about": {
    "metaTitle": "Sobre | AIBAN",
    "metaDescription": "O AIBAN transforma o conteúdo que uma empresa já publica em uma newsletter que sai sozinha, no idioma de cada assinante e com o nome do dono.",
    "eyebrow": "Sobre",
    "title": "Sobre o AIBAN",
    "lead": "O AIBAN transforma o conteúdo que uma empresa já publica em uma newsletter que sai sozinha. Cada assinante lê no próprio idioma, e ela chega com o nome do dono.",
    "whatTitle": "O que o AIBAN faz",
    "whatBody": [
      "Você diz ao AIBAN onde está seu conteúdo: seu site, seu blog ou sites de notícias que você acompanha. Quando aparece algo novo, o AIBAN escreve uma edição a partir disso com a voz que você descreveu e envia aos seus assinantes na frequência que você escolheu.",
      "Cada assinante escolhe um idioma ao se inscrever, e cada edição é traduzida para esse idioma antes de ser enviada. Os artigos também são publicados como páginas web, e você pode enviá-los para o seu próprio site."
    ],
    "whoTitle": "Quem faz",
    "whoBody": [
      "O AIBAN é desenvolvido por Luis Murillo Baltodano, seu fundador. Luis é um engenheiro criativo com experiência em computação gráfica e automação.",
      "Parte do trabalho de código aberto dele está listada abaixo."
    ],
    "projectsTitle": "Trabalho de código aberto do fundador",
    "projects": [
      {
        "name": "Scene Preset",
        "url": "https://github.com/LuisArmando-TestCoder/scene-preset",
        "desc": "Uma biblioteca que elimina código repetitivo ao trabalhar com Three.js e APIs web de 3D."
      },
      {
        "name": "Canvas Preset",
        "url": "https://github.com/LuisArmando-TestCoder/canvas-preset",
        "desc": "Utilitários para tarefas comuns com a API Canvas."
      },
      {
        "name": "Template Atomic Gatsby",
        "url": "https://github.com/LuisArmando-TestCoder/atomic-gatsby-typescript-recoiljs",
        "desc": "Um template inicial organizado com design atômico."
      }
    ],
    "githubLabel": "Luis no GitHub",
    "newTab": "(abre em uma nova aba)",
    "contactTitle": "Entre em contato",
    "contactBody": "Para dúvidas, comentários ou ideias de parceria, escreva para info@aiban.news.",
    "emailCta": "Escrever para info@aiban.news",
    "startCta": "Comece grátis",
    "helpCta": "Ler a central de ajuda"
  },
  "careers": {
    "metaTitle": "Carreiras | AIBAN",
    "metaDescription": "O AIBAN não tem vagas abertas no momento. Mesmo assim, você pode escrever para info@aiban.news.",
    "eyebrow": "Carreiras",
    "title": "Carreiras no AIBAN",
    "lead": "O AIBAN não tem vagas abertas no momento.",
    "body": "Quando uma vaga abrir, ela será listada nesta página. Se quiser trabalhar no AIBAN mais adiante, envie um recado curto sobre você e o que gostaria de construir.",
    "emailCta": "Escrever para info@aiban.news",
    "emailSubject": "Trabalhar no AIBAN",
    "aboutCta": "Ler sobre o AIBAN"
  },
  "legal": {
    "navLabel": "Documentos legais",
    "lastUpdated": "Última atualização: {date}",
    "privacy": {
      "title": "Política de privacidade",
      "metaTitle": "Política de privacidade | AIBAN",
      "metaDescription": "Como o AIBAN coleta, usa e protege os seus dados, e como exercer os seus direitos sobre eles."
    },
    "terms": {
      "title": "Termos de serviço",
      "metaTitle": "Termos de serviço | AIBAN",
      "metaDescription": "Os termos que se aplicam quando você cria uma conta e usa o AIBAN."
    },
    "cookies": {
      "title": "Política de cookies",
      "metaTitle": "Política de cookies | AIBAN",
      "metaDescription": "Quais cookies o AIBAN usa, para que servem, quanto tempo duram e como você pode controlá-los."
    }
  },
  "demoPage": {
    "metaTitle": "Demonstração | AIBAN",
    "metaDescription": "Assista a um tour pelo AIBAN e veja o que acontece depois do cadastro, desde adicionar seu site até enviar sua primeira edição.",
    "eyebrow": "Demonstração",
    "title": "Veja como o AIBAN funciona",
    "lead": "Assista ao tour e depois leia o que acontece após o cadastro.",
    "videoTitle": "Vídeo do tour pelo AIBAN",
    "playLabel": "Reproduzir o vídeo do tour",
    "videoNote": "O vídeo é reproduzido pelo YouTube.",
    "stepsTitle": "O que acontece depois do cadastro",
    "steps": [
      {
        "title": "Adicione seu site",
        "body": "Digite o endereço do seu site, do seu blog ou de um site de notícias que você acompanha. O AIBAN o lê em busca de conteúdo novo."
      },
      {
        "title": "Descreva seus leitores e sua voz",
        "body": "Conte ao AIBAN quem lê sua newsletter e como ela deve soar. Você também pode deixar que ele sugira uma descrição a partir do seu site."
      },
      {
        "title": "Escolha uma frequência",
        "body": "Escolha com que frequência as edições são enviadas. Você pode mudar isso depois no painel."
      },
      {
        "title": "Adicione assinantes",
        "body": "Envie uma lista, adicione pessoas uma a uma ou compartilhe sua página e seu widget de inscrição. Cada assinante escolhe um idioma."
      },
      {
        "title": "Adicione o seu nome de remetente e a sua assinatura",
        "body": "Adicione o nome e a assinatura de e-mail que os leitores vão ver. O AIBAN envia cada edição do endereço verificado dele com o seu nome, e as respostas vão para a sua caixa de entrada."
      }
    ],
    "ctaTitle": "Experimente com seu próprio site",
    "ctaBody": "O plano gratuito inclui 1 fonte e até 100 assinantes.",
    "primaryCta": "Comece grátis",
    "secondaryCta": "Ver preços"
  },
  "helpCenter": {
    "metaTitle": "Ajuda | AIBAN",
    "metaDescription": "Respostas sobre como configurar o AIBAN: fontes, idiomas, envio com o seu nome, assinantes, o widget de inscrição, o blog e a cobrança.",
    "eyebrow": "Central de ajuda",
    "title": "Como podemos ajudar?",
    "lead": "Encontre respostas sobre como configurar e manter sua newsletter. Se não encontrar o que precisa, escreva para nós.",
    "searchLabel": "Buscar na central de ajuda",
    "searchPlaceholder": "Tente idioma, widget ou cancelar",
    "clearSearch": "Limpar busca",
    "resultsCount": "{count} respostas correspondem à sua busca.",
    "noResults": "Nenhuma resposta corresponde à sua busca. Tente outra palavra ou escreva para info@aiban.news.",
    "topicsLabel": "Tópicos",
    "copyLink": "Copiar link",
    "linkCopied": "Link copiado",
    "contactTitle": "Ainda precisa de ajuda?",
    "contactBody": "Escreva para info@aiban.news e informe o e-mail com que você se cadastrou.",
    "emailCta": "Escrever para info@aiban.news",
    "limitsTitle": "Solicitar limites maiores",
    "limitsBody": "Conte quais limites você precisa e responderemos por e-mail. Se não for possível enviar a solicitação por esta página, o seu app de e-mail abre com ela preenchida para você enviar para nós.",
    "faqFilterLabel": "Filtrar perguntas",
    "faqNoMatch": "Nenhuma pergunta corresponde ao seu filtro.",
    "groups": [
      {
        "id": "getting-started",
        "title": "Primeiros passos",
        "items": [
          {
            "id": "what-is-aiban",
            "q": "O que é o AIBAN?",
            "a": "O AIBAN transforma o conteúdo que você já publica em uma newsletter recorrente. Ele lê seu site, seu blog ou sites de notícias que você escolher, escreve novas edições com a sua voz e envia aos seus assinantes. Cada assinante lê no idioma que escolheu."
          },
          {
            "id": "how-to-start",
            "q": "Como eu começo?",
            "a": "Crie uma conta na página de cadastro. A configuração pede o endereço do seu site e alguns detalhes sobre seus leitores. Depois disso, você pode adicionar assinantes e gerenciar tudo pelo painel."
          },
          {
            "id": "change-settings",
            "q": "Posso mudar a configuração depois?",
            "a": "Sim. Você pode mudar as fontes, a programação, os dados do remetente e os assinantes depois, no seu painel. Para mudar de plano, escreva para info@aiban.news."
          }
        ]
      },
      {
        "id": "sources",
        "title": "Fontes e conteúdo",
        "items": [
          {
            "id": "what-is-a-source",
            "q": "O que posso usar como fonte?",
            "a": "Uma fonte é um endereço web que o AIBAN lê em busca de conteúdo novo, como seu site, seu blog ou um site de notícias que você acompanha. Você adiciona fontes no painel. Quantas você pode adicionar depende do seu plano."
          },
          {
            "id": "how-often",
            "q": "Com que frequência minha newsletter é enviada?",
            "a": "Você escolhe a frequência de publicação ao configurar uma fonte. Pode mudar a frequência depois no painel."
          },
          {
            "id": "your-voice",
            "q": "Como o AIBAN escreve com a minha voz?",
            "a": "Você descreve a personalidade da sua newsletter ou deixa que o AIBAN gere uma descrição. As edições são escritas com essa descrição. Você pode editá-la quando quiser no painel."
          }
        ]
      },
      {
        "id": "languages",
        "title": "Idiomas",
        "items": [
          {
            "id": "subscriber-language",
            "q": "Como os assinantes recebem a newsletter no idioma deles?",
            "a": "Cada assinante escolhe um idioma preferido ao se inscrever. O AIBAN traduz cada edição para esse idioma antes de enviar."
          },
          {
            "id": "site-language",
            "q": "Posso usar o site no meu idioma?",
            "a": "Sim. Use o botão de idioma no canto inferior direito da tela para mudar o idioma do site e do painel."
          }
        ]
      },
      {
        "id": "sending",
        "title": "Envio com o seu nome",
        "items": [
          {
            "id": "own-address",
            "q": "As edições podem sair do meu próprio e-mail?",
            "a": "As edições saem do endereço de envio do AIBAN com o seu nome de remetente e a sua assinatura de e-mail, e as respostas vão para a sua caixa de entrada. Não pedimos a senha do seu e-mail, então não há nada seu que possa vazar."
          },
          {
            "id": "app-password",
            "q": "Preciso passar a senha do meu e-mail para o AIBAN?",
            "a": "Não. O AIBAN nunca pede a senha do seu e-mail nem uma senha de app. As edições são enviadas do endereço do AIBAN com o seu nome, e as respostas chegam a você."
          }
        ]
      },
      {
        "id": "subscribers",
        "title": "Assinantes e widget de inscrição",
        "items": [
          {
            "id": "add-subscribers",
            "q": "Como adiciono assinantes?",
            "a": "Você pode adicionar pessoas uma a uma no painel ou enviar um arquivo com sua lista. As pessoas também podem entrar pela sua página de inscrição ou pelo widget de inscrição."
          },
          {
            "id": "signup-widget",
            "q": "O que é o widget de inscrição?",
            "a": "O widget é um formulário de inscrição que você pode colocar no seu próprio site. Os visitantes digitam o e-mail, escolhem o idioma e entram na sua lista."
          },
          {
            "id": "subscriber-limit",
            "q": "Existe um limite de assinantes?",
            "a": "Cada plano tem seu próprio limite de assinantes. O plano gratuito inclui até 100 assinantes. A página de preços mostra os limites dos outros planos."
          }
        ]
      },
      {
        "id": "blog",
        "title": "Blog",
        "items": [
          {
            "id": "blog-pages",
            "q": "Os artigos da minha newsletter são publicados na web?",
            "a": "Sim. Os artigos que o AIBAN escreve para sua newsletter também são publicados como páginas web, para que as pessoas possam lê-los fora da caixa de entrada."
          },
          {
            "id": "post-to-site",
            "q": "Posso publicar os artigos no meu próprio site?",
            "a": "Sim. No painel, você pode configurar um webhook que envia cada artigo da newsletter para o seu site como post. Funciona com WordPress e com qualquer plataforma que aceite conteúdo REST padrão."
          }
        ]
      },
      {
        "id": "billing",
        "title": "Cobrança",
        "items": [
          {
            "id": "free-plan",
            "q": "Existe um plano gratuito?",
            "a": "Sim. O plano gratuito inclui 1 fonte e até 100 assinantes. Você pode passar para um plano pago quando precisar de mais."
          },
          {
            "id": "monthly-yearly",
            "q": "Posso pagar mensal ou anualmente?",
            "a": "Sim. Os planos pagos são cobrados mensal ou anualmente. O preço anual é 35% menor do que pagar mensalmente por 12 meses. Escreva para info@aiban.news para escolher um plano."
          },
          {
            "id": "cancel",
            "q": "Posso cancelar a qualquer momento?",
            "a": "Sim. Escreva para info@aiban.news quando quiser e cancelaremos o seu plano pago ou voltaremos você para o plano gratuito."
          },
          {
            "id": "higher-limits",
            "q": "E se eu precisar de mais do que o maior plano oferece?",
            "a": "Use o formulário de solicitação na página de ajuda para informar os limites de que você precisa. Respondemos por e-mail."
          }
        ]
      }
    ]
  },
  "mainPage": {
    "skipToMainContent": "Pular para o conteúdo principal",
    "dismissAnnouncement": "Fechar anúncio",
    "problem": "Problema:",
    "outcome": "Resultado:",
    "disclaimer": "A economia de 35% aplica-se apenas ao faturamento anual."
  },
  "authForm": {
    "emailValidation": "Informe um e-mail como nome@exemplo.com.",
    "failedToSendCode": "Não conseguimos enviar o código. Confira o e-mail e tente de novo daqui a um minuto.",
    "sending": "Enviando...",
    "codeSent": "Enviamos um código para o seu e-mail.",
    "invalidCode": "Esse código não está correto. Confira o último e-mail que enviamos ou peça o código de novo.",
    "regenerateCode": "Reenviar código",
    "back": "Voltar",
    "byProceeding": "Ao continuar, você concorda com os",
    "termsOfService": "Termos de serviço",
    "and": "e",
    "privacyPolicy": "Política de privacidade",
    "appName": "IA Newsletter"
  },
  "welcome": {
    "title": "Gerador automático de newsletters",
    "setItOnce": "Configure uma vez.",
    "useItForever": "Depois ele continua funcionando."
  },
  "lead": {
    "title": "Transforme inscritos em visitantes",
    "recommendation": "Ajude nossa IA a entender sua marca conectando seu site.",
    "question": "Você tem um site? (opcional, você pode adicionar depois)",
    "placeholder": "https://seu-site.com.br"
  },
  "newsSource": {
    "title": "Conecte sua fonte de conteúdo",
    "subtitle": "Buscaremos seu feed para que você não precise começar do zero.",
    "placeholder": "Seu blog ou link RSS"
  },
  "subscribe": {
    "welcome": {
      "title": "Boas-vindas à newsletter.",
      "invitedBy": "Você foi convidado por {configuratorId}."
    }
  },
  "header": {
    "goToWorkspace": "Abrir painel",
    "inBilling": "Preços",
    "vip": "VIP",
    "plan": "Plano {planName}",
    "logIn": "Entrar",
    "getStarted": "Comece grátis"
  },
  "fileInput": {
    "chooseFile": "Escolher arquivo",
    "dropFile": "Solte aqui",
    "release": "Solte para enviar"
  },
  "billing": {
    "title": "Cobrança e assinatura",
    "currentPlanTitle": "Seu plano atual",
    "upgradePlanTitle": "Mude seu plano",
    "manageSubscription": "Gerenciar assinatura",
    "vipPlanName": "Parceiro VIP",
    "vipPlanDescription": "Acesso ilimitado, cortesia do AIBAN.",
    "perMonth": "por mês",
    "perYear": "por ano",
    "monthAbbreviation": "mês",
    "equivalentTo": "equivalente a",
    "mostPopular": "Mais escolhido",
    "upgradeTo": "Fazer upgrade para",
    "downgradeTo": "Mudar para",
    "currentPlanButton": "Seu plano",
    "youSave": "Você economiza",
    "users": "usuários",
    "newsSources": "fontes de notícias",
    "monthly": "Mensal",
    "yearly": "Anual",
    "loadingPlan": "Carregando dados do plano..."
  },
  "languages": [
    {
      "code": "ab",
      "name": "Abkhaziano"
    },
    {
      "code": "aa",
      "name": "Afar"
    },
    {
      "code": "af",
      "name": "Africâner"
    },
    {
      "code": "ak",
      "name": "Akan"
    },
    {
      "code": "sq",
      "name": "Albanês"
    },
    {
      "code": "am",
      "name": "Amárico"
    },
    {
      "code": "ar",
      "name": "Árabe"
    },
    {
      "code": "an",
      "name": "Aragonês"
    },
    {
      "code": "hy",
      "name": "Armênio"
    },
    {
      "code": "as",
      "name": "Assamês"
    },
    {
      "code": "av",
      "name": "Avaro"
    },
    {
      "code": "ae",
      "name": "Avéstico"
    },
    {
      "code": "ay",
      "name": "Aimará"
    },
    {
      "code": "az",
      "name": "Azerbaijano"
    },
    {
      "code": "bm",
      "name": "Bambara"
    },
    {
      "code": "ba",
      "name": "Bashkir"
    },
    {
      "code": "eu",
      "name": "Basco"
    },
    {
      "code": "be",
      "name": "Bielorrusso"
    },
    {
      "code": "bn",
      "name": "Bengali"
    },
    {
      "code": "bi",
      "name": "Bislama"
    },
    {
      "code": "bs",
      "name": "Bósnio"
    },
    {
      "code": "br",
      "name": "Bretão"
    },
    {
      "code": "bg",
      "name": "Búlgaro"
    },
    {
      "code": "my",
      "name": "Birmanês"
    },
    {
      "code": "ca",
      "name": "Catalão"
    },
    {
      "code": "ch",
      "name": "Chamorro"
    },
    {
      "code": "ce",
      "name": "Checheno"
    },
    {
      "code": "ny",
      "name": "Nianja"
    },
    {
      "code": "zh",
      "name": "Chinês"
    },
    {
      "code": "cu",
      "name": "Elavo Eclesiástico"
    },
    {
      "code": "cv",
      "name": "Chuvache"
    },
    {
      "code": "kw",
      "name": "Córnico"
    },
    {
      "code": "co",
      "name": "Corso"
    },
    {
      "code": "cr",
      "name": "Cree"
    },
    {
      "code": "hr",
      "name": "Croata"
    },
    {
      "code": "cs",
      "name": "Tcheco"
    },
    {
      "code": "da",
      "name": "Dinamarquês"
    },
    {
      "code": "dv",
      "name": "Divehi"
    },
    {
      "code": "nl",
      "name": "Holandês"
    },
    {
      "code": "dz",
      "name": "Dzongkha"
    },
    {
      "code": "en",
      "name": "Inglês"
    },
    {
      "code": "eo",
      "name": "Esperanto"
    },
    {
      "code": "et",
      "name": "Estoniano"
    },
    {
      "code": "ee",
      "name": "Ewe"
    },
    {
      "code": "fo",
      "name": "Feroês"
    },
    {
      "code": "fj",
      "name": "Fijiano"
    },
    {
      "code": "fi",
      "name": "Finlandês"
    },
    {
      "code": "fr",
      "name": "Francês"
    },
    {
      "code": "fy",
      "name": "Frísio Ocidental"
    },
    {
      "code": "ff",
      "name": "Fula"
    },
    {
      "code": "gd",
      "name": "Gaélico Escocês"
    },
    {
      "code": "gl",
      "name": "Galego"
    },
    {
      "code": "lg",
      "name": "Ganda"
    },
    {
      "code": "ka",
      "name": "Georgiano"
    },
    {
      "code": "de",
      "name": "Alemão"
    },
    {
      "code": "el",
      "name": "Grego"
    },
    {
      "code": "kl",
      "name": "Groenlandês"
    },
    {
      "code": "gn",
      "name": "Guarani"
    },
    {
      "code": "gu",
      "name": "Gujarati"
    },
    {
      "code": "ht",
      "name": "Crioulo Haitiano"
    },
    {
      "code": "ha",
      "name": "Haúça"
    },
    {
      "code": "he",
      "name": "Hebraico"
    },
    {
      "code": "hz",
      "name": "Herero"
    },
    {
      "code": "hi",
      "name": "Híndi"
    },
    {
      "code": "ho",
      "name": "Hiri motu"
    },
    {
      "code": "hu",
      "name": "Húngaro"
    },
    {
      "code": "is",
      "name": "Islandês"
    },
    {
      "code": "io",
      "name": "Ido"
    },
    {
      "code": "ig",
      "name": "Ibo"
    },
    {
      "code": "id",
      "name": "Indonésio"
    },
    {
      "code": "ia",
      "name": "Interlíngua"
    },
    {
      "code": "ie",
      "name": "Interlíngue"
    },
    {
      "code": "iu",
      "name": "Inuktitut"
    },
    {
      "code": "ik",
      "name": "Inupiaq"
    },
    {
      "code": "ga",
      "name": "Irlandês"
    },
    {
      "code": "it",
      "name": "Italiano"
    },
    {
      "code": "ja",
      "name": "Japonês"
    },
    {
      "code": "jv",
      "name": "Javanês"
    },
    {
      "code": "kn",
      "name": "Canarês"
    },
    {
      "code": "kr",
      "name": "Canúri"
    },
    {
      "code": "ks",
      "name": "Caxemira"
    },
    {
      "code": "kk",
      "name": "Cazaque"
    },
    {
      "code": "km",
      "name": "Khmer"
    },
    {
      "code": "ki",
      "name": "Cicuio"
    },
    {
      "code": "rw",
      "name": "Quiniaruanda"
    },
    {
      "code": "ky",
      "name": "Quirguiz"
    },
    {
      "code": "kv",
      "name": "Komi"
    },
    {
      "code": "kg",
      "name": "Congolês"
    },
    {
      "code": "ko",
      "name": "Coreano"
    },
    {
      "code": "kj",
      "name": "Cuanhama"
    },
    {
      "code": "ku",
      "name": "Curdo"
    },
    {
      "code": "lo",
      "name": "Laociano"
    },
    {
      "code": "la",
      "name": "Latim"
    },
    {
      "code": "lv",
      "name": "Letão"
    },
    {
      "code": "li",
      "name": "Limburguês"
    },
    {
      "code": "ln",
      "name": "Lingala"
    },
    {
      "code": "lt",
      "name": "Lituano"
    },
    {
      "code": "lu",
      "name": "Luba-Catanga"
    },
    {
      "code": "lb",
      "name": "Luxemburguês"
    },
    {
      "code": "mk",
      "name": "Macedônio"
    },
    {
      "code": "mg",
      "name": "Malgaxe"
    },
    {
      "code": "ms",
      "name": "Malaio"
    },
    {
      "code": "ml",
      "name": "Malaiala"
    },
    {
      "code": "mt",
      "name": "Maltês"
    },
    {
      "code": "gv",
      "name": "Manx"
    },
    {
      "code": "mi",
      "name": "Maori"
    },
    {
      "code": "mr",
      "name": "Marata"
    },
    {
      "code": "mh",
      "name": "Marshallês"
    },
    {
      "code": "mn",
      "name": "Mongol"
    },
    {
      "code": "na",
      "name": "瑙루ano"
    },
    {
      "code": "nv",
      "name": "Navajo"
    },
    {
      "code": "nd",
      "name": "Ndebele do Norte"
    },
    {
      "code": "nr",
      "name": "Ndebele do Sul"
    },
    {
      "code": "ng",
      "name": "Ndonga"
    },
    {
      "code": "ne",
      "name": "Nepalês"
    },
    {
      "code": "no",
      "name": "Norueguês"
    },
    {
      "code": "nb",
      "name": "Bokmål Norueguês"
    },
    {
      "code": "nn",
      "name": "Nynorsk Norueguês"
    },
    {
      "code": "oc",
      "name": "Occitano"
    },
    {
      "code": "oj",
      "name": "Ojíbua"
    },
    {
      "code": "or",
      "name": "Oriya"
    },
    {
      "code": "om",
      "name": "Oromo"
    },
    {
      "code": "os",
      "name": "Osseto"
    },
    {
      "code": "pi",
      "name": "Pali"
    },
    {
      "code": "ps",
      "name": "Pashto"
    },
    {
      "code": "fa",
      "name": "Persa"
    },
    {
      "code": "pl",
      "name": "Polonês"
    },
    {
      "code": "pt",
      "name": "Português"
    },
    {
      "code": "pa",
      "name": "Punjabi"
    },
    {
      "code": "qu",
      "name": "Quíchua"
    },
    {
      "code": "ro",
      "name": "Romeno"
    },
    {
      "code": "rm",
      "name": "Romanche"
    },
    {
      "code": "rn",
      "name": "Rundi"
    },
    {
      "code": "ru",
      "name": "Russo"
    },
    {
      "code": "se",
      "name": "Sami do Norte"
    },
    {
      "code": "sm",
      "name": "Samoano"
    },
    {
      "code": "sg",
      "name": "Sango"
    },
    {
      "code": "sa",
      "name": "Sânscrito"
    },
    {
      "code": "sc",
      "name": "Sardo"
    },
    {
      "code": "sr",
      "name": "Sérvio"
    },
    {
      "code": "sn",
      "name": "Shona"
    },
    {
      "code": "ii",
      "name": "Sichuan Yi"
    },
    {
      "code": "sd",
      "name": "Sindi"
    },
    {
      "code": "si",
      "name": "Cingalês"
    },
    {
      "code": "sk",
      "name": "Eslovaco"
    },
    {
      "code": "sl",
      "name": "Esloveno"
    },
    {
      "code": "so",
      "name": "Somali"
    },
    {
      "code": "st",
      "name": "Soto do Sul"
    },
    {
      "code": "es",
      "name": "Espanhol"
    },
    {
      "code": "su",
      "name": "Sundanês"
    },
    {
      "code": "sw",
      "name": "Suaíli"
    },
    {
      "code": "ss",
      "name": "Suázi"
    },
    {
      "code": "sv",
      "name": "Sueco"
    },
    {
      "code": "tl",
      "name": "Tagalo"
    },
    {
      "code": "ty",
      "name": "Taitiano"
    },
    {
      "code": "tg",
      "name": "Tajique"
    },
    {
      "code": "ta",
      "name": "Tâmil"
    },
    {
      "code": "tt",
      "name": "Tártaro"
    },
    {
      "code": "te",
      "name": "Telugu"
    },
    {
      "code": "th",
      "name": "Tailandês"
    },
    {
      "code": "bo",
      "name": "Tibetano"
    },
    {
      "code": "ti",
      "name": "Tigrínia"
    },
    {
      "code": "to",
      "name": "Tonganês"
    },
    {
      "code": "ts",
      "name": "Tsonga"
    },
    {
      "code": "tn",
      "name": "Tsuana"
    },
    {
      "code": "tr",
      "name": "Turco"
    },
    {
      "code": "tk",
      "name": "Turcomano"
    },
    {
      "code": "tw",
      "name": "Twi"
    },
    {
      "code": "ug",
      "name": "Uigur"
    },
    {
      "code": "uk",
      "name": "Ucraniano"
    },
    {
      "code": "ur",
      "name": "Urdu"
    },
    {
      "code": "uz",
      "name": "Uzbeque"
    },
    {
      "code": "ve",
      "name": "Venda"
    },
    {
      "code": "vi",
      "name": "Vietnamita"
    },
    {
      "code": "vo",
      "name": "Volapuque"
    },
    {
      "code": "wa",
      "name": "Valão"
    },
    {
      "code": "cy",
      "name": "Galês"
    },
    {
      "code": "wo",
      "name": "Wolof"
    },
    {
      "code": "xh",
      "name": "Xhosa"
    },
    {
      "code": "yi",
      "name": "Iídiche"
    },
    {
      "code": "yo",
      "name": "Iorubá"
    },
    {
      "code": "za",
      "name": "Zhuang"
    },
    {
      "code": "zu",
      "name": "Zulu"
    }
  ],
  "countries": [
    {
      "code": "AF",
      "name": "Afeganistão"
    },
    {
      "code": "AL",
      "name": "Albânia"
    },
    {
      "code": "DZ",
      "name": "Argélia"
    },
    {
      "code": "AS",
      "name": "Samoa Americana"
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
      "name": "Antártida"
    },
    {
      "code": "AG",
      "name": "Antígua e Barbuda"
    },
    {
      "code": "AR",
      "name": "Argentina"
    },
    {
      "code": "AM",
      "name": "Armênia"
    },
    {
      "code": "AW",
      "name": "Aruba"
    },
    {
      "code": "AU",
      "name": "Austrália"
    },
    {
      "code": "AT",
      "name": "Áustria"
    },
    {
      "code": "AZ",
      "name": "Azerbaijão"
    },
    {
      "code": "BS",
      "name": "Bahamas"
    },
    {
      "code": "BH",
      "name": "Bahrein"
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
      "name": "Bielorrússia"
    },
    {
      "code": "BE",
      "name": "Bélgica"
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
      "name": "Bermudas"
    },
    {
      "code": "BT",
      "name": "Butão"
    },
    {
      "code": "BO",
      "name": "Bolívia"
    },
    {
      "code": "BA",
      "name": "Bósnia e Herzegovina"
    },
    {
      "code": "BW",
      "name": "Botsuana"
    },
    {
      "code": "BR",
      "name": "Brasil"
    },
    {
      "code": "IO",
      "name": "Território Britânico do Oceano Índico"
    },
    {
      "code": "VG",
      "name": "Ilhas Virgens Britânicas"
    },
    {
      "code": "BN",
      "name": "Brunei"
    },
    {
      "code": "BG",
      "name": "Bulgária"
    },
    {
      "code": "BF",
      "name": "Burquina Faso"
    },
    {
      "code": "BI",
      "name": "Burundi"
    },
    {
      "code": "KH",
      "name": "Camboja"
    },
    {
      "code": "CM",
      "name": "Camarões"
    },
    {
      "code": "CA",
      "name": "Canadá"
    },
    {
      "code": "CV",
      "name": "Cabo Verde"
    },
    {
      "code": "KY",
      "name": "Ilhas Cayman"
    },
    {
      "code": "CF",
      "name": "República Centro-Africana"
    },
    {
      "code": "TD",
      "name": "Chade"
    },
    {
      "code": "CL",
      "name": "Chile"
    },
    {
      "code": "CN",
      "name": "China"
    },
    {
      "code": "CX",
      "name": "Ilha Christmas"
    },
    {
      "code": "CC",
      "name": "Ilhas Cocos (Keeling)"
    },
    {
      "code": "CO",
      "name": "Colômbia"
    },
    {
      "code": "KM",
      "name": "Comores"
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
      "name": "Ilhas Cook"
    },
    {
      "code": "CR",
      "name": "Costa Rica"
    },
    {
      "code": "CI",
      "name": "Costa do Marfim"
    },
    {
      "code": "HR",
      "name": "Croácia"
    },
    {
      "code": "CU",
      "name": "Cuba"
    },
    {
      "code": "CY",
      "name": "Chipre"
    },
    {
      "code": "CZ",
      "name": "Tchéquia"
    },
    {
      "code": "DK",
      "name": "Dinamarca"
    },
    {
      "code": "DJ",
      "name": "Djibuti"
    },
    {
      "code": "DM",
      "name": "Dominica"
    },
    {
      "code": "DO",
      "name": "República Dominicana"
    },
    {
      "code": "EC",
      "name": "Equador"
    },
    {
      "code": "EG",
      "name": "Egito"
    },
    {
      "code": "SV",
      "name": "El Salvador"
    },
    {
      "code": "GQ",
      "name": "Guiné Equatorial"
    },
    {
      "code": "ER",
      "name": "Eritreia"
    },
    {
      "code": "EE",
      "name": "Estônia"
    },
    {
      "code": "SZ",
      "name": "Essuatíni"
    },
    {
      "code": "ET",
      "name": "Etiópia"
    },
    {
      "code": "FJ",
      "name": "Fiji"
    },
    {
      "code": "FI",
      "name": "Finlândia"
    },
    {
      "code": "FR",
      "name": "França"
    },
    {
      "code": "GA",
      "name": "Gabão"
    },
    {
      "code": "GM",
      "name": "Gâmbia"
    },
    {
      "code": "GE",
      "name": "Geórgia"
    },
    {
      "code": "DE",
      "name": "Alemanha"
    },
    {
      "code": "GH",
      "name": "Gana"
    },
    {
      "code": "GR",
      "name": "Grécia"
    },
    {
      "code": "GT",
      "name": "Guatemala"
    },
    {
      "code": "GN",
      "name": "Guiné"
    },
    {
      "code": "GY",
      "name": "Guiana"
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
      "name": "Hong Kong"
    },
    {
      "code": "HU",
      "name": "Hungria"
    },
    {
      "code": "IS",
      "name": "Islândia"
    },
    {
      "code": "IN",
      "name": "Índia"
    },
    {
      "code": "ID",
      "name": "Indonésia"
    },
    {
      "code": "IR",
      "name": "Irã"
    },
    {
      "code": "IQ",
      "name": "Iraque"
    },
    {
      "code": "IE",
      "name": "Irlanda"
    },
    {
      "code": "IL",
      "name": "Israel"
    },
    {
      "code": "IT",
      "name": "Itália"
    },
    {
      "code": "JM",
      "name": "Jamaica"
    },
    {
      "code": "JP",
      "name": "Japão"
    },
    {
      "code": "JO",
      "name": "Jordânia"
    },
    {
      "code": "KZ",
      "name": "Cazaquistão"
    },
    {
      "code": "KE",
      "name": "Quênia"
    },
    {
      "code": "KR",
      "name": "Coreia do Sul"
    },
    {
      "code": "KW",
      "name": "Kuwait"
    },
    {
      "code": "KG",
      "name": "Quirguistão"
    },
    {
      "code": "LA",
      "name": "Laos"
    },
    {
      "code": "LV",
      "name": "Letônia"
    },
    {
      "code": "LB",
      "name": "Líbano"
    },
    {
      "code": "LS",
      "name": "Lesoto"
    },
    {
      "code": "LR",
      "name": "Libéria"
    },
    {
      "code": "LY",
      "name": "Líbia"
    },
    {
      "code": "LI",
      "name": "Liechtenstein"
    },
    {
      "code": "LT",
      "name": "Lituânia"
    },
    {
      "code": "LU",
      "name": "Luxemburgo"
    },
    {
      "code": "MG",
      "name": "Madagascar"
    },
    {
      "code": "MW",
      "name": "Malaui"
    },
    {
      "code": "MY",
      "name": "Malásia"
    },
    {
      "code": "MV",
      "name": "Maldivas"
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
      "name": "México"
    },
    {
      "code": "MD",
      "name": "Moldávia"
    },
    {
      "code": "MC",
      "name": "Mônaco"
    },
    {
      "code": "MN",
      "name": "Mongólia"
    },
    {
      "code": "ME",
      "name": "Montenegro"
    },
    {
      "code": "MA",
      "name": "Marrocos"
    },
    {
      "code": "MZ",
      "name": "Moçambique"
    },
    {
      "code": "MM",
      "name": "Mianmar"
    },
    {
      "code": "NA",
      "name": "Namíbia"
    },
    {
      "code": "NP",
      "name": "Nepal"
    },
    {
      "code": "NL",
      "name": "Países Baixos"
    },
    {
      "code": "NZ",
      "name": "Nova Zelândia"
    },
    {
      "code": "NI",
      "name": "Nicarágua"
    },
    {
      "code": "NE",
      "name": "Níger"
    },
    {
      "code": "NG",
      "name": "Nigéria"
    },
    {
      "code": "MK",
      "name": "Macedônia do Norte"
    },
    {
      "code": "NO",
      "name": "Noruega"
    },
    {
      "code": "OM",
      "name": "Omã"
    },
    {
      "code": "PK",
      "name": "Paquistão"
    },
    {
      "code": "PA",
      "name": "Panamá"
    },
    {
      "code": "PG",
      "name": "Papua-Nova Guiné"
    },
    {
      "code": "PY",
      "name": "Paraguai"
    },
    {
      "code": "PE",
      "name": "Peru"
    },
    {
      "code": "PH",
      "name": "Filipinas"
    },
    {
      "code": "PL",
      "name": "Polônia"
    },
    {
      "code": "PT",
      "name": "Portugal"
    },
    {
      "code": "QA",
      "name": "Catar"
    },
    {
      "code": "RO",
      "name": "Romênia"
    },
    {
      "code": "RU",
      "name": "Rússia"
    },
    {
      "code": "RW",
      "name": "Ruanda"
    },
    {
      "code": "SA",
      "name": "Arábia Saudita"
    },
    {
      "code": "SN",
      "name": "Senegal"
    },
    {
      "code": "RS",
      "name": "Sérvia"
    },
    {
      "code": "SG",
      "name": "Singapura"
    },
    {
      "code": "SK",
      "name": "Eslováquia"
    },
    {
      "code": "SI",
      "name": "Eslovênia"
    },
    {
      "code": "ZA",
      "name": "África do Sul"
    },
    {
      "code": "ES",
      "name": "Espanha"
    },
    {
      "code": "LK",
      "name": "Sri Lanka"
    },
    {
      "code": "SE",
      "name": "Suécia"
    },
    {
      "code": "CH",
      "name": "Suíça"
    },
    {
      "code": "TW",
      "name": "Taiwan"
    },
    {
      "code": "TH",
      "name": "Tailândia"
    },
    {
      "code": "TR",
      "name": "Turquia"
    },
    {
      "code": "UG",
      "name": "Uganda"
    },
    {
      "code": "UA",
      "name": "Ucrânia"
    },
    {
      "code": "AE",
      "name": "Emirados Árabes Unidos"
    },
    {
      "code": "GB",
      "name": "Reino Unido"
    },
    {
      "code": "US",
      "name": "Estados Unidos"
    },
    {
      "code": "UY",
      "name": "Uruguai"
    },
    {
      "code": "UZ",
      "name": "Uzbequistão"
    },
    {
      "code": "VE",
      "name": "Venezuela"
    },
    {
      "code": "VN",
      "name": "Vietnã"
    },
    {
      "code": "YE",
      "name": "Iêmen"
    },
    {
      "code": "ZM",
      "name": "Zâmbia"
    },
    {
      "code": "ZW",
      "name": "Zimbábue"
    }
  ]
};
