export default {
  step01: {
    title: "A IA com som humano escreve newsletters para seus assinantes no automático",
    subtitle: "Qual frequência, selecione <u>cada mês</u> ou <u>cada semana</u> ou <u>cada dia</u> ou <u>a que horas</u>"
  },
  step02: {
    title: "Idioma da newsletter",
    subtitle: "“sua newsletter também será enviada no idioma específico de cada usuário, se forem diferentes”"
  },
  step03: {
    title: "Redirecionamento (Opcional)",
    subtitle: "Você quer redirecionar o usuário para sua página?",
    description: "Você pode colar um link para sua página aqui, contaremos quantos entram pelos e-mails que a IA cria",
    placeholder: "https://sua-pagina.com"
  },
  step04: {
    title: "Tipo de notícias que você quer que a IA escolha",
    subtitle: "Qual tema de conversa ou tópico (inferido do link de redirecionamento se definido, caso contrário vazio)",
    placeholder: "ex. Inteligência Artificial, Marketing, Saúde..."
  },
  step05: {
    title: "Personalize sua Assinatura",
    subtitle: "Projete visualmente ou edite o código diretamente",
    visualEditor: "Editor Visual",
    htmlSource: "Fonte HTML",
    livePreview: "Visualização ao Vivo",
    yourName: "Seu Nome",
    yourTitle: "Seu Título",
    facebookProfile: "Perfil do Facebook",
    instagramProfile: "Perfil do Instagram",
    editHtml: "Editar HTML diretamente...",
    warning: "⚠️ As edições feitas aqui serão sobrescritas se você voltar para o Editor Visual e fizer alterações."
  },
  step06: {
    title: "Fonte de Notícias",
    subtitle: "Qual site de notícias você quer usar?",
    description: "Insira uma URL ou deixe-nos escolher uma para você com base no seu tópico.",
    descriptionSmall: "Analisaremos o site para encontrar o melhor conteúdo. Isso pode levar alguns segundos.",
    placeholder: "https://exemplo.com",
    analyzing: "Analisando...",
    next: "Próximo",
    errors: {
      failedToGenerate: "Falha ao gerar o seletor. Por favor, tente novamente ou verifique a URL.",
      errorGenerating: "Ocorreu um erro ao gerar o seletor.",
      invalidUrl: "Por favor, insira uma URL válida ou escolha uma fonte."
    }
  },
  step07: {
    title: "Seletor de Conteúdo",
    subtitle: "Pense em cada site como uma <strong>biblioteca com um layout único</strong>.",
    explanation1: "Este <strong>'Seletor'</strong> é o mapa específico que criamos para este site. Ele diz ao nosso sistema exatamente onde procurar para pegar os artigos que você deseja, ignorando botões de menu e anúncios.",
    explanation2: "<strong>Nós preenchemos este mapa para você automaticamente.</strong>",
    placeholder: "String do seletor...",
    regenerate: "Regenerar Seletor",
    regenerating: "Regenerando...",
    errors: {
      noUrl: "Nenhuma URL de fonte de notícias encontrada.",
      failedRegenerate: "Falha ao regenerar o seletor.",
      errorRegenerate: "Ocorreu um erro ao regenerar o seletor."
    }
  },
  step08: {
    title: "Visualização",
    placeholder: "Pronto para gerar sua primeira newsletter?",
    generateBtn: "Gerar E-mail da Newsletter",
    sentBtn: "Enviado! Verifique seu e-mail",
    sendTestBtn: "Enviar E-mail de Teste",
    regenerateBtn: "Regenerar",
    loading: {
      initializing: "Inicializando...",
      starting: "Iniciando geração...",
      scraping: "Extraindo conteúdo...",
      translating: "Traduzindo artigo...",
      formatting: "Formatando e-mail...",
      sending: "Conectando ao provedor de e-mail...",
      authenticating: "Autenticando...",
      sendingArticle: "Enviando artigo...",
      creating: "Criando fonte de notícias...",
      saving: "Salvando configuração...",
      finalizing: "Finalizando configuração..."
    },
    errors: {
      generationFailed: "Geração falhou: ",
      createFailed: "Falha ao criar fonte de notícias. Por favor, tente novamente.",
      errorCreating: "Erro ao criar fonte de notícias: ",
      sendFailed: "Falha ao enviar e-mail: "
    },
    defaultSubject: "Visualização da sua Newsletter Gerada"
  },
  step09: {
    title: "Para enviar o artigo do seu e-mail",
    subtitle: "Senha de App (Opcional)",
    description: "(Se você tem serviços gmail, coloque sua senha de app aqui)",
    label: "Senha de App",
    placeholder: "Sua Senha de App"
  },
  step10: {
    title: "Endereço Gmail (Opcional)",
    subtitle: "Endereço de E-mail Gmail",
    description: "Se você quiser enviar de um endereço Gmail específico",
    placeholder: "seu-email@gmail.com"
  },
  step11: {
    title: "Enviar E-mail de Teste",
    subtitle: "Envie um e-mail de teste para si mesmo para verificar a configuração.",
    sendNow: "Enviar Agora",
    sent: "Enviado! Verifique seu e-mail",
    loading: {
      connecting: "Conectando ao provedor de e-mail...",
      authenticating: "Autenticando...",
      sending: "Enviando artigo..."
    }
  },
  step12: {
    title: "Compartilhe esta newsletter com seus seguidores",
    subtitle: "Link para o funil de inscrição (antes de começarem a receber e-mails, eles teriam que aceitar seu convite)",
    copy: "Copiar",
    copied: "Link copiado!"
  },
  step13: {
    title: "Plano e Limites",
    currentPlan: "Plano Atual:",
    limits: "Limites:",
    unknown: "Desconhecido",
    changePlan: "Mudar Plano",
    advancedFeatures: "Precisa de recursos mais avançados?",
    developerText: "Confira nossa seção de desenvolvedores para integrar este funil de inscrição de newsletter em seu servidor, um blog de todos os seus artigos gerados e inscrever usuários de sua base de código com nossa chave de API.",
    dashboardBtn: "Ir para o Painel",
    usage: "Uso:",
    limitDetails: {
      free: "Limite de 100 usuários",
      starter: "5 fontes, 100k usuários",
      growth: "17 fontes, 250k usuários",
      pro: "25 fontes, 500k usuários",
      master: "50 fontes, usuários ilimitados",
      vipfree: "VIP Gratuito"
    }
  }
};
