export type Kit = {
  id: string;
  name: string;
  bags: string;
  ideal: string;
  price: string;
  economy: string;
  badge: string;
  checkout: string;
  image: string;
  highlighted?: boolean;
  buttonText?: string;
  installments?: string;
  paymentPerk?: string;
  
  // Card layout customization fields
  imageBadge?: string;          // Pill abaixo da imagem (ex: "Kit Teste")
  imageCtaText?: string;        // Texto do botão flutuante sobre a imagem (ex: "Fale com nossa assistente!")
  imageCtaLink?: string;        // Link do botão flutuante
  treatmentAnimals?: string;    // Qtd de animais no bloco Trata (ex: "125 animais")
  treatmentDays?: string;       // Qtd de dias no bloco Trata (ex: "por 30 dias")
  estimatedProfit?: string;     // Texto do lucro estimado (ex: "R$ 24.525 a R$ 58.350")
  roiText?: string;             // Texto do ROI (ex: "ROI: 2.455% a 5.843% • Retorno em 3 dias")
  paymentInstallmentText?: string; // Detalhe parcelas (ex: "10x de R$ 99,88 no cartão sem juros")
  paymentCashText?: string;        // Detalhe à vista (ex: "ou R$ 998,80 à vista (PIX/Boleto)")
  features?: string[];          // Lista de características do card (com checkmark verde)
  buttonSubtext?: string;       // Texto abaixo do botão de compra (ex: "Economia de R$ 249,70 • Melhor custo-benefício")
  buttonIcon?: string;          // Ícone no botão ("none", "chart", "package", "shopping-cart")

  // Custom Sales Page Content
  customHeadline?: string;
  customSubheadline?: string;
  paymentDownPayment?: string;
  paymentFirstInstallmentDays?: string;
  paymentInstallmentsDetail?: string;
  paymentConditionBadge?: string;
  paymentConditionsList?: string[];
  bonusTitle?: string;
  bonusPercentage?: string;
  bonusExampleText?: string;
  bonusBenefits?: string[];
  guaranteeDays?: string;
  guaranteeDescription?: string;
  whatYouReceive?: string[];
  resultsExpected?: string[];
  kitWhatsApp?: string;
  usageInstructions?: string;
  usageConsumption?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
};

export type ClientVideo = {
  id: string;
  title: string;
  client: string;
  location: string;
  url: string;
  badge: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type SiteContent = {
  colors: {
    premiumBlue: string;
    gold: string;
    fieldGreen: string;
    ice: string;
    deepBlue: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    banner: string;
    productImage: string;
    whatsapp: string;
    whatsappText?: string;
    whatsappLink?: string;
    checkout: string;
    promo: string;
    logo?: string;
    favicon?: string;
  };
  product: {
    title: string;
    description: string;
    videoUrl: string;
    composition: string[];
    differentials: string[];
    beforeText?: string;
    beforeImage?: string;
    afterText?: string;
    afterImage?: string;
  };
  kits: Kit[];
  videos: ClientVideo[];
  testimonials: Testimonial[];
  faqs: Faq[];
  sections: Record<string, boolean>;
  footer: {
    logo?: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    youtube: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    copyright: string;
    linksCol1Title: string;
    linksCol1: string; // One link per line: Label | URL
    linksCol2Title: string;
    linksCol2: string; // One link per line: Label | URL
  };
  guarantee: {
    title: string;
    text: string;
    image: string;
  };
  integrations: {
    ga4: string;
    metaPixel: string;
    googleAds: string;
    tiktokPixel: string;
  };
};

export const defaultContent: SiteContent = {
  colors: {
    premiumBlue: "#0A3D91",
    gold: "#F2B705",
    fieldGreen: "#5E8C31",
    ice: "#F8F9FA",
    deepBlue: "#082B63"
  },
  hero: {
    headline: "FORTALEÇA. NUTRA. TRANSFORME.",
    subheadline: "O suplemento mineral que aumenta desempenho, saúde e produtividade do rebanho.",
    cta: "QUERO MELHORAR MEU REBANHO",
    banner:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2200&q=86",
    productImage:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=82",
    whatsapp: "5511999999999",
    whatsappText: "Falar com especialista",
    whatsappLink: "https://wa.me/5511999999999",
    checkout: "#kits",
    promo: "Safra Forte: condições especiais para pedidos fechados hoje",
    logo: "",
    favicon: ""
  },
  product: {
    title: "Mineralização premium para pecuária de alta performance",
    description:
      "Fortegado Premium combina minerais essenciais, macro e microminerais balanceados e tecnologia de mistura pensada para rotina de fazenda. É um suplemento criado para pecuaristas que querem mais conversão, mais sanidade e mais margem por cabeça.",
    videoUrl: "https://www.youtube.com/",
    composition: ["Cálcio", "Fósforo", "Sódio", "Zinco", "Cobre", "Selênio", "Cobalto", "Manganês"],
    differentials: [
      "Formulação voltada a ganho de peso e eficiência alimentar",
      "Apoio à imunidade, reprodução e desempenho do lote",
      "Granulometria uniforme, pronta para mistura e cocho",
      "Controle premium de qualidade em cada lote"
    ],
    beforeText: "Antes: lote irregular, consumo instável e baixa resposta no cocho.",
    beforeImage: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80",
    afterText: "Depois: lote mais uniforme, melhor escore corporal e manejo mineral consistente.",
    afterImage: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80"
  },
  kits: [
    {
      id: "kit-teste",
      name: "Novo Kit",
      bags: "1 saco de 25kg",
      ideal: "Ideal para iniciar e ver os primeiros resultados no lote",
      price: "R$ 247,90",
      economy: "Economia de R$ 24,97 • Ideal para teste",
      badge: "10% OFF",
      imageBadge: "Kit Teste",
      checkout: "#comprar",
      image: "https://iyazogjhbrdxqggnxjwb.supabase.co/storage/v1/object/public/images/image-1779833683386-wx2sg25.png",
      highlighted: false,
      buttonText: "Testar sem risco",
      buttonSubtext: "Economia de R$ 24,97 • Ideal para teste",
      buttonIcon: "none",
      installments: "10x de R$ 22,47",
      paymentPerk: "10x sem juros",
      treatmentAnimals: "25 animais",
      treatmentDays: "por 30 dias",
      estimatedProfit: "R$ 4.905 a R$ 11.670",
      roiText: "ROI: 2.182% a 5.192%",
      paymentInstallmentText: "10x de R$ 22,47 no cartão sem juros",
      paymentCashText: "ou R$ 224,73 à vista (PIX/Boleto)",
      features: [
        "Gasto: R$ 0,30/animal/dia",
        "Frete grátis",
        "Suporte técnico",
        "Garantia 30 dias"
      ],
      
      // Custom Sales Page Copy
      customHeadline: "1 SACO FORTEGADO PREMIUM",
      customSubheadline: "O pontapé inicial para a nutrição de alta performance na sua fazenda. Obtenha mais rendimento e lote uniforme.",
      paymentDownPayment: "R$ 0,00",
      paymentFirstInstallmentDays: "Imediato",
      paymentInstallmentsDetail: "10x de R$ 22,47 SEM JUROS",
      paymentConditionBadge: "CONDIÇÃO ESPECIAL FACILITADA",
      paymentConditionsList: [
        "Parcelamento em até 10x sem juros",
        "Frete Grátis incluso para todo o Brasil",
        "Garantia estendida de satisfação",
        "Suporte técnico na primeira dosagem"
      ],
      bonusTitle: "BÔNUS PARCEIRO FORTEGADO",
      bonusPercentage: "3%",
      bonusExampleText: "Pagando suas parcelas em dia, você ganha 3% de desconto garantido na sua próxima compra de reposição de estoque.",
      bonusBenefits: [
        "Economia garantida",
        "Giro rápido de estoque",
        "Parceria de confiança"
      ],
      guaranteeDays: "30 DIAS",
      guaranteeDescription: "Satisfação garantida: utilize o produto em um lote teste. Se não notar a evolução no ganho de peso e saúde, devolva o restante e pague apenas o que consumiu.",
      whatYouReceive: [
        "1 saco Fortegado Premium",
        "Manual prático de suplementação de cocho",
        "Suporte via WhatsApp com consultor técnico",
        "Entrega garantida na porteira"
      ],
      resultsExpected: [
        "Melhor consumo diário de minerais",
        "Lote mais equilibrado no pasto",
        "Redução de refugo de cocho"
      ],
      usageInstructions: "Misture em sal branco: 1 saco para cada 2 sacos de 25 kilos de sal branco.",
      usageConsumption: "O consumo médio estimado de cada animal é de 70 a 100 gramas por dia, dependendo da carência de macro e micro minerais."
    },
    {
      id: "kit-pecuarista",
      name: "Novo Kit",
      bags: "5 sacos de 25kg",
      ideal: "Melhor custo-benefício para iniciar os resultados na fazenda",
      price: "R$ 998,80",
      economy: "Economia de R$ 249,70 • Melhor custo-benefício",
      badge: "MAIS POPULAR • 20% OFF",
      imageBadge: "Kit Campeão",
      checkout: "#comprar",
      image: "https://iyazogjhbrdxqggnxjwb.supabase.co/storage/v1/object/public/images/image-1779833719655-91r5i0z.png",
      highlighted: true,
      buttonText: "Lucrar R$ 24.525 a R$ 58.350",
      buttonSubtext: "Economia de R$ 249,70 • Melhor custo-benefício",
      buttonIcon: "package",
      installments: "10x de R$ 99,88",
      paymentPerk: "Carência de 90 dias",
      treatmentAnimals: "125 animais",
      treatmentDays: "por 30 dias",
      estimatedProfit: "R$ 24.525 a R$ 58.350",
      roiText: "ROI: 2.455% a 5.843% • Retorno em 3 dias",
      paymentInstallmentText: "10x de R$ 99,88 no cartão sem juros",
      paymentCashText: "ou R$ 998,80 à vista (PIX/Boleto)",
      features: [
        "Gasto: R$ 0,27/animal/dia",
        "Frete grátis + seguro",
        "Suporte prioritário",
        "Pagamento em 90 dias"
      ],
      
      // Custom Sales Page Copy
      customHeadline: "5 SACOS FORTEGADO PREMIUM",
      customSubheadline: "A escolha favorita dos criadores focados em recria e engorda contínua. Desempenho garantido no cocho.",
      paymentDownPayment: "R$ 0,00",
      paymentFirstInstallmentDays: "30 dias",
      paymentInstallmentsDetail: "10x de R$ 99,88 SEM JUROS",
      paymentConditionBadge: "MELHOR CUSTO-BENEFÍCIO",
      paymentConditionsList: [
        "Primeira parcela para 30 dias",
        "Parcelamento em até 10x sem juros",
        "Suporte veterinário personalizado",
        "Desconto exclusivo no Pix"
      ],
      bonusTitle: "BÔNUS PRODUTOR EFICIENTE",
      bonusPercentage: "4%",
      bonusExampleText: "Compromisso com o rebanho! Ao pagar suas faturas em dia, você acumula 4% de crédito de bônus direto na conta para o próximo lote.",
      bonusBenefits: [
        "Desconto progressivo",
        "Acompanhamento nutricional completo",
        "Suplementação planejada"
      ],
      guaranteeDays: "30 DIAS",
      guaranteeDescription: "Experimente com segurança. Damos 30 dias completos de teste. Se não comprovar os resultados, devolvemos o valor do que não foi utilizado sem qualquer burocracia.",
      whatYouReceive: [
        "5 sacos Fortegado Premium",
        "Acompanhamento personalizado com zootecnista",
        "Plano de manejo mineral customizado",
        "Entrega agendada e prioritária"
      ],
      resultsExpected: [
        "Aceleração de ganho de peso (GMD)",
        "Fortalecimento imunológico do lote",
        "Melhor aproveitamento da pastagem fibrosa"
      ],
      usageInstructions: "Misture em sal branco: 1 saco para cada 2 sacos de 25 kilos de sal branco.",
      usageConsumption: "O consumo médio estimado de cada animal é de 70 a 100 gramas por dia, dependendo da carência de macro e micro minerais."
    },
    {
      id: "kit-premium",
      name: "Para Expandir",
      bags: "10 sacos de 25kg",
      ideal: "Excelente custo-benefício e máxima economia para rebanhos maiores",
      price: "R$ 1.872,75",
      economy: "Economia de R$ 624,25 • Maior economia",
      badge: "25% OFF",
      imageBadge: "Kit Premium",
      imageCtaText: "Fale com nossa assistente!",
      imageCtaLink: "https://wa.me/5511999999999",
      checkout: "#comprar",
      image: "https://iyazogjhbrdxqggnxjwb.supabase.co/storage/v1/object/public/images/image-1779830274441-yf88qq3.png",
      highlighted: false,
      buttonText: "Maximizar para R$ 116.700",
      buttonSubtext: "Economia de R$ 624,25 • Maior economia",
      buttonIcon: "chart",
      installments: "10x de R$ 187,28",
      paymentPerk: "Carência de 90 dias",
      treatmentAnimals: "250 animais",
      treatmentDays: "por 30 dias",
      estimatedProfit: "R$ 49.050 a R$ 116.700",
      roiText: "ROI: 2.619% a 6.230% • Máximo lucro",
      paymentInstallmentText: "10x de R$ 187,28 no cartão sem juros",
      paymentCashText: "ou R$ 1.872,75 à vista (PIX/Boleto)",
      features: [
        "Gasto: R$ 0,25/animal/dia",
        "Entrega expressa grátis",
        "Suporte VIP",
        "Consultoria zootécnica",
        "Pagamento em 90 dias"
      ],
      
      // Custom Sales Page Copy
      customHeadline: "10 SACOS FORTEGADO PREMIUM",
      customSubheadline: "MAIS PESO. MAIS RESULTADO. MAIS LUCRO NO SEU REBANHO. O pecuarista moderno sabe: gado forte não acontece por sorte. A diferença entre prejuízo e produtividade está na nutrição do rebanho. O FORTEGADO PREMIUM foi desenvolvido para produtores que querem: ✔ mais desempenho, ✔ mais ganho de peso, ✔ mais imunidade, ✔ melhor reprodução, ✔ mais rendimento no pasto.",
      paymentDownPayment: "R$ 0,00",
      paymentFirstInstallmentDays: "90 dias",
      paymentInstallmentsDetail: "10x de R$ 187,28 SEM JUROS",
      paymentConditionBadge: "CONDIÇÃO ESPECIAL PARA PECUARISTAS",
      paymentConditionsList: [
        "Primeira parcela somente em 90 dias",
        "Até 6 meses para pagar",
        "Parcelamento sem juros",
        "Condição facilitada para produção rural"
      ],
      bonusTitle: "BÔNUS PRODUTOR RESPONSÁVEL",
      bonusPercentage: "5%",
      bonusExampleText: "Pagou a parcela em dia? GANHE 5% DE BÔNUS NA PRÓXIMA PARCELA. Exemplo: Parcela de R$ 1.872,75. Pagando em dia: recebe R$ 93,64 de bônus/crédito direto.",
      bonusBenefits: [
        "Economia real de caixa",
        "Vantagem contínua para reposição",
        "Benefício de parceiro de longo prazo"
      ],
      guaranteeDays: "30 DIAS",
      guaranteeDescription: "Você testa o produto no seu rebanho. Se não aprovar os resultados: pode devolver o restante do produto, NÃO precisa pagar o que foi devolvido, paga somente o que foi utilizado. Sem enrolação. Sem burocracia. Porque quem confia no produto, oferece garantia de verdade.",
      whatYouReceive: [
        "10 sacos Fortegado Premium",
        "Suporte prioritário exclusivo",
        "Entrega programada na fazenda",
        "Produto premium de alta performance",
        "Acompanhamento comercial dedicado"
      ],
      resultsExpected: [
        "Melhor aproveitamento alimentar",
        "Mais rendimento no lote de abate/recria",
        "Mais desempenho e ganho de peso no pasto",
        "Redução drástica de perdas nutricionais",
        "Fortalecimento nutricional do rebanho"
      ],
      usageInstructions: "Misture em sal branco: 1 saco para cada 2 sacos de 25 kilos de sal branco.",
      usageConsumption: "O consumo médio estimado de cada animal é de 70 a 100 gramas por dia, dependendo da carência de macro e micro minerais."
    }
  ],
  videos: [
    {
      id: "v1",
      title: "Resultado consistente no cocho",
      client: "Cliente Fortegado há 4 anos",
      location: "Triângulo Mineiro",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      badge: "Prova real"
    },
    {
      id: "v2",
      title: "Mais desempenho no lote",
      client: "Pecuarista parceiro",
      location: "Goiás",
      url: "https://youtu.be/dQw4w9WgXcQ",
      badge: "Cliente antigo"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Marcelo Andrade",
      location: "Pecuarista em Uberaba, MG",
      text: "O lote respondeu rápido. Melhorou consumo, escore e a pesagem veio acima do esperado.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "t2",
      name: "Ana Ribeiro",
      location: "Fazenda Boa Vista, GO",
      text: "A equipe sentiu diferença na mistura e no desempenho. É produto de padrão alto.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: "t3",
      name: "João Matos",
      location: "Criador em Rondonópolis, MT",
      text: "Comprei para testar e virei cliente. O custo por cabeça compensou muito.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
    }
  ],
  faqs: [
    {
      id: "f1",
      question: "Como usar o Fortegado Premium?",
      answer: "Ofereça conforme orientação técnica, misturado ao sal ou à dieta do lote, sempre com água limpa disponível."
    },
    {
      id: "f2",
      question: "Qual quantidade por animal?",
      answer: "A quantidade varia por categoria, peso e objetivo produtivo. A recomendação ideal é definida no atendimento."
    },
    {
      id: "f3",
      question: "Qual é a validade?",
      answer: "A validade padrão é informada no rótulo do lote e deve ser respeitada com armazenamento seco e protegido."
    },
    {
      id: "f4",
      question: "Pode misturar com outros ingredientes?",
      answer: "Sim, o produto foi pensado para uso prático em mistura. Ajustes devem seguir recomendação técnica."
    },
    {
      id: "f5",
      question: "Como funciona a entrega?",
      answer: "Após o pedido, a equipe confirma endereço, prazo e melhor condição logística para sua região."
    },
    {
      id: "f6",
      question: "Existe garantia?",
      answer: "Sim. Você tem 30 dias de garantia para comprar com segurança e avaliar a experiência."
    }
  ],
  sections: {
    benefits: true,
    product: true,
    results: true,
    kits: true,
    videos: true,
    testimonials: true,
    guarantee: true,
    faq: true,
    finalCta: true
  },
  footer: {
    logo: "",
    description: "Fortegado Premium é sinônimo de inovação e alta performance na nutrição animal. Apoiamos o produtor rural com tecnologia de ponta para potencializar a rentabilidade e produtividade do rebanho.",
    address: "Rodovia Agropecuária Km 45, Distrito Industrial, Uberaba - MG",
    phone: "(34) 99999-9999",
    email: "contato@fortegadopremium.com.br",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    copyright: "© 2026 Fortegado Premium. Todos os direitos reservados.",
    linksCol1Title: "Institucional",
    linksCol1: "Sobre Nós | #produto\nNossos Kits | #kits\nFale Conosco | #suporte\nTrabalhe Conosco | #trabalhe",
    linksCol2Title: "Oportunidades",
    linksCol2: "Seja um Revendedor | #revendedor\nDistribuição Agro | #distribuidor\nTermos de Uso | #termos\nPolíticas de Privacidade | /politicas-de-privacidade"
  },
  guarantee: {
    title: "A MELHOR GARANTIA DO MERCADO: SATISFAÇÃO GARANTIDA OU SEU DINHEIRO DE VOLTA",
    text: "Experimente o Sal Mineral Forte Gado sem riscos! Se por qualquer motivo seus animais não se adaptarem ou se você não vir os resultados esperados, você tem 30 dias para devolver o produto. Pague apenas pelo que foi consumido na fazenda durante esse período.",
    image: ""
  },
  integrations: {
    ga4: "",
    metaPixel: "",
    googleAds: "",
    tiktokPixel: ""
  }
};
