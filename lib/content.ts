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
      id: "kit-5",
      name: "KIT PECUARISTA",
      bags: "5 sacos",
      ideal: "Ideal para iniciar e ver os primeiros resultados no lote",
      price: "R$ 1.490,00",
      economy: "Frete grátis para sua região",
      badge: "INICIAL PRODUTOR",
      checkout: "#comprar",
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=82",
      installments: "6x de R$ 248,33",
      paymentPerk: "Parcelamento sem juros",
      
      // Custom Sales Page Copy
      customHeadline: "5 SACOS FORTEGADO PREMIUM",
      customSubheadline: "O pontapé inicial para a nutrição de alta performance na sua fazenda. Obtenha mais rendimento e lote uniforme.",
      paymentDownPayment: "R$ 0,00",
      paymentFirstInstallmentDays: "Imediato",
      paymentInstallmentsDetail: "6x de R$ 248,33 SEM JUROS",
      paymentConditionBadge: "CONDIÇÃO ESPECIAL FACILITADA",
      paymentConditionsList: [
        "Parcelamento em até 6x sem juros",
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
        "5 sacos Fortegado Premium",
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
      id: "kit-10",
      name: "KIT PRODUTOR",
      bags: "10 sacos",
      ideal: "Excelente custo-benefício para rebanhos em crescimento",
      price: "R$ 2.790,00",
      economy: "Economia no frete + suporte prioritário",
      badge: "MAIS VENDIDO",
      checkout: "#comprar",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=82",
      highlighted: true,
      installments: "6x de R$ 465,00",
      paymentPerk: "Até 6x sem juros",
      
      // Custom Sales Page Copy
      customHeadline: "10 SACOS FORTEGADO PREMIUM",
      customSubheadline: "A escolha favorita dos criadores focados em recria e engorda contínua. Desempenho garantido no cocho.",
      paymentDownPayment: "R$ 0,00",
      paymentFirstInstallmentDays: "30 dias",
      paymentInstallmentsDetail: "6x de R$ 465,00 SEM JUROS",
      paymentConditionBadge: "MELHOR CUSTO-BENEFÍCIO",
      paymentConditionsList: [
        "Primeira parcela para 30 dias",
        "Parcelamento em até 6x sem juros",
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
        "10 sacos Fortegado Premium",
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
      id: "fazenda",
      name: "KIT FAZENDA PREMIUM",
      bags: "30 sacos",
      ideal: "Máxima economia e carência de 90 dias para grandes plantéis",
      price: "R$ 7.470,00",
      economy: "Economia extrema + carência de 90 dias",
      badge: "MELHOR OPÇÃO AGRO",
      checkout: "#comprar",
      image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=900&q=82",
      installments: "6x de R$ 1.245,00",
      paymentPerk: "Carência de 90 dias",
      
      // Custom Sales Page Copy (Exact copy supplied by user!)
      customHeadline: "30 SACOS FORTEGADO PREMIUM",
      customSubheadline: "MAIS PESO. MAIS RESULTADO. MAIS LUCRO NO SEU REBANHO. O pecuarista moderno sabe: gado forte não acontece por sorte. A diferença entre prejuízo e produtividade está na nutrição do rebanho. O FORTEGADO PREMIUM foi desenvolvido para produtores que querem: ✔ mais desempenho, ✔ mais ganho de peso, ✔ mais imunidade, ✔ melhor reprodução, ✔ mais rendimento no pasto.",
      paymentDownPayment: "R$ 0,00",
      paymentFirstInstallmentDays: "90 dias",
      paymentInstallmentsDetail: "6x de R$ 1.245,00 SEM JUROS",
      paymentConditionBadge: "CONDIÇÃO ESPECIAL PARA PECUARISTAS",
      paymentConditionsList: [
        "Primeira parcela somente em 90 dias",
        "Até 6 meses para pagar",
        "Parcelamento sem juros",
        "Condição facilitada para produção rural"
      ],
      bonusTitle: "BÔNUS PRODUTOR RESPONSÁVEL",
      bonusPercentage: "5%",
      bonusExampleText: "Pagou a parcela em dia? GANHE 5% DE BÔNUS NA PRÓXIMA PARCELA. Exemplo: Parcela de R$ 1.245,00. Pagando em dia: recebe R$ 62,25 de bônus/crédito direto.",
      bonusBenefits: [
        "Economia real de caixa",
        "Vantagem contínua para reposição",
        "Benefício de parceiro de longo prazo"
      ],
      guaranteeDays: "30 DIAS",
      guaranteeDescription: "Você testa o produto no seu rebanho. Se não aprovar os resultados: pode devolver o restante do produto, NÃO precisa pagar o que foi devolvido, paga somente o que foi utilizado. Sem enrolação. Sem burocracia. Porque quem confia no produto, oferece garantia de verdade.",
      whatYouReceive: [
        "30 sacos Fortegado Premium",
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
