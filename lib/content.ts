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
      id: "inicial",
      name: "KIT INICIAL",
      bags: "2 sacos",
      ideal: "Ideal para teste controlado no lote",
      price: "R$ 297",
      economy: "Economia pequena",
      badge: "ENTRADA PREMIUM",
      checkout: "#comprar",
      image: "https://images.unsplash.com/photo-1551298457-c72eced6d366?auto=format&fit=crop&w=900&q=82",
      installments: "3x de R$ 99,00",
      paymentPerk: "Sem juros no cartão"
    },
    {
      id: "pecuarista",
      name: "KIT PECUARISTA",
      bags: "5 sacos",
      ideal: "Mais vendido para fazendas em expansão",
      price: "R$ 697",
      economy: "Frete grátis + melhor giro",
      badge: "MAIS VENDIDO",
      checkout: "#comprar",
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=82",
      highlighted: true,
      installments: "10x de R$ 69,70",
      paymentPerk: "Sem juros ou Pix com desconto"
    },
    {
      id: "fazenda",
      name: "KIT FAZENDA PREMIUM",
      bags: "10 sacos",
      ideal: "Maior economia para manejo contínuo",
      price: "R$ 1.297",
      economy: "Suporte prioritário",
      badge: "MELHOR CUSTO BENEFÍCIO",
      checkout: "#comprar",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=82",
      installments: "12x de R$ 108,08",
      paymentPerk: "3 meses de carência p/ pagar"
    },
    {
      id: "revenda",
      name: "KIT REVENDA",
      bags: "20 sacos",
      ideal: "Preço especial para distribuidores",
      price: "R$ 2.397",
      economy: "Condição comercial exclusiva",
      badge: "DISTRIBUIDOR",
      checkout: "#comprar",
      image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=900&q=82",
      installments: "12x de R$ 199,75",
      paymentPerk: "Faturamento no boleto agro"
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
    title: "30 DIAS OU SEU DINHEIRO DE VOLTA",
    text: "Você compra com segurança, testa a experiência Fortegado Premium e conta com atendimento para orientar o melhor uso no seu manejo.",
    image: ""
  },
  integrations: {
    ga4: "",
    metaPixel: "",
    googleAds: "",
    tiktokPixel: ""
  }
};
