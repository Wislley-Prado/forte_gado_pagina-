# 📄 Documento de Requisitos do Produto (PRD) - Fortegado Premium

Este documento contém a especificação oficial da página de vendas premium e do painel administrativo do **FORTEGADO PREMIUM**.

---

## 🎯 Objetivo
Criar a **melhor página de vendas** de suplemento mineral do agronegócio brasileiro, transmitindo autoridade, confiança, qualidade premium e alta lucratividade, acompanhada de um painel de administração integrado completo para edição dinâmica e sem necessidade de programação.

---

## 💎 Identidade Visual e Estilo
* **Conceito:** Design moderno, alto padrão visual, estética "agro premium", responsivo para dispositivos móveis, animações suaves e aparência de grande player do agronegócio.
* **Paleta de Cores:**
  * Azul Premium: `#0A3D91`
  * Dourado: `#F2B705`
  * Verde Campo: `#5E8C31`
  * Branco Gelo: `#F8F9FA`
  * Azul Escuro: `#082B63`
* **Tipografia:** Títulos fortes, robustos e com grande impacto visual.

---

## 📑 Estrutura da Página de Vendas

### 1. Hero Section (Topo)
* Fundo com foto em alta qualidade de gado premium.
* Logomarca dinâmica no topo esquerdo (com suporte a imagem ou texto fallback).
* Headline de Impacto: `“FORTALEÇA. NUTRA. TRANSFORME.”`
* Subheadline persuasiva sobre desempenho e produtividade.
* Botão de Ação Primário (CTA) personalizável (padrão: `“QUERO MELHORAR MEU REBANHO”`).
* Botão de Suporte/WhatsApp com texto e link URL 100% customizáveis no admin.
* Selo de garantia de 30 dias, selo premium e ícones de benefícios.
* Sincronização inteligente de Favicon (ícone de aba do navegador) dinâmico.

### 2. Barra de Urgência & Escassez (Marketing)
* Faixa promocional com texto editável.
* **Contador Regressivo Real (Ticking Countdown):** Contador ativo que exibe o tempo restante até o final do dia (`HH:MM:SS`) de forma contínua, estimulando compras por impulso.

### 3. Barra de Benefícios
* Cards horizontais com ícones modernos para:
  * Mais ganho de peso
  * Mais imunidade
  * Melhor reprodução
  * Mais produtividade
  * Pronto para mistura
  * Resultado comprovado

### 4. Seção "Sobre o Produto"
* **Player de Vídeo Embutido (YouTube):** Bloco dinâmico que exibe um player de vídeo embedded do YouTube assim que uma URL de vídeo válida é inserida no admin (com suporte a links curtos, normais e embeds), caindo de volta de forma inteligente para a foto do produto/sacaria se a URL estiver vazia.
* Composição do produto editável (um item por linha).
* Cards com diferenciais de alta performance.

### 5. Seção de Resultados
* Cards comparativos com formato estruturado de "Antes" e "Depois".
* Dados de produtividade e ganho de peso.

### 6. Seção de Kits de Tratamento
* Tabela de preços disposta em cards de alta conversão.
* **Fusão de Fundo Invisível:** Fundo das imagens dos cards em branco puro (`bg-white`) para que fotos com fundo branco se integrem 100% perfeitamente ao card, sem caixas cinzas ao redor.
* Selo visual premium, efeito hover de elevação e badge promocional.
* **Links de Compra Dinâmicos:** **O botão de compra de cada card direciona o usuário diretamente para o link de checkout específico daquele kit (`kit.checkout`), que é 100% editável no painel administrativo.**
* **Texto de Botão Customizável:** Possibilidade de definir textos específicos no botão de cada kit (ex: `"Comprar Agora"`, `"Saber Mais"`, `"Ir para Checkout"`).

#### Kits Iniciais Padrão:
1. **KIT INICIAL:** 2 sacos, ideal para teste controlado, economia pequena.
2. **KIT PECUARISTA:** 5 sacos, selo "MAIS VENDIDO", frete grátis, destaque dourado especial.
3. **KIT FAZENDA PREMIUM:** 10 sacos, selo "MELHOR CUSTO BENEFÍCIO", maior economia, suporte prioritário.
4. **KIT REVENDA:** 20 sacos, preço especial para distribuidores.

### 7. Carrossel de Depoimentos
* Fotos circulares de pecuaristas reais, classificação em estrelas e relatos de resultados no pasto.

### 8. Garantia Blindada
* Painel ilustrado de 30 dias de garantia de satisfação ou reembolso completo.

### 9. FAQ (Perguntas Frequentes)
* Sanfonas retráteis (`<details>`) para rápida consulta de uso, dosagem, validade, mistura, frete e garantia.

### 10. CTA Final
* Chamada visual imponente e botão final de alta conversão.

---

## 🛠️ Painel Administrativo Integrado (Admin)
* **Guia de Tamanhos Integrado:** Card de ajuda retrátil e interativo no topo do painel especificando formatos e dimensões de imagens.
* **Upload com Compressor Inteligente:** O painel comprime e redimensiona imagens gigantes tiradas do celular antes do salvamento, reduzindo o arquivo para menos de 200KB. Isso **elimina o erro de armazenamento (`QuotaExceededError`)** e faz o site carregar instantaneamente.
* **Isolamento de Cache:** Estrutura de salvamento robusta com `try-catch` que garante a sincronização contínua com o banco de dados Supabase mesmo se o navegador atingir algum limite de memória local.
* **Edição Geral:** Alteração de Headlines, Subheadlines, Banners, WhatsApp, Textos, Seções Ativas, FAQs, Depoimentos, Vídeos e Imagens de forma imediata e sem tocar em código.

---

## 🚀 SEO & Otimização
* Estrutura semântica HTML5 ultra-otimizada.
* **JSON-LD Schema Markup:** Metadados estruturados de produto (`@type: Product`) integrando marca, descrição e ofertas de kits dinamicamente para indexação em destaque no Google.
* Metadados e OpenGraph estruturados no `layout.tsx`.
