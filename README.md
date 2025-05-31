# Cuidar+

Cuidar+ é uma plataforma digital de saúde focada em bem-estar, consultas médicas e acompanhamento personalizado, desenvolvida com [Next.js](https://nextjs.org) e recursos modernos do ecossistema React. O projeto oferece funcionalidades para o usuário cuidar da saúde física e mental, com planos acessíveis e recursos de emergência.

## ✨ Funcionalidades

- **Planos de Saúde**:

  - **Básico (Gratuito):** Conteúdos de bem-estar, meditação, exercícios e chamadas rápidas de emergência.
  - **Intermediário:** Tudo do básico + consultas ilimitadas com psicólogos e agenda médica integrada.
  - **Premium:** Tudo do intermediário + acompanhamento personalizado e relatórios semanais para familiares.

- **Consultas Online**: Agendamento de consultas com profissionais, incluindo videochamadas seguras.
- **Chat com Especialistas**: Tire dúvidas com profissionais de saúde.
- **Lembretes de Medicamentos**: Gerencie receitas e receba alertas de horários para tomar remédios.
- **Acompanhamento de Saúde**: Ferramentas para monitoramento de atividades físicas, bem-estar mental, notificações e privacidade.
- **Ambiente Responsivo**: Interface adaptável para dispositivos móveis e desktop.

## 🚀 Como começar

Clone o projeto e instale as dependências:

```bash
git clone https://github.com/JoaoVitorMS0/cuidar-maaais.git
cd cuidar-maaais
npm install
```

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## 🗂 Estrutura do Projeto

- `app/` — Contém as páginas principais do sistema:
  - `home/` — Página inicial e navegação entre funcionalidades.
  - `plans/` — Exibição de planos disponíveis.
  - `consultation-booking/` — Agendamento de consultas.
  - `video-call/` — Realização de videochamadas médicas.
  - `medicine-home/` — Gerenciamento e lembretes de medicamentos.
  - `chat/` — Conversa direta com profissionais.
  - `settings/` — Configurações de perfil, privacidade e notificações.
- `public/` — Imagens e assets estáticos.
- `app/layout.tsx` — Layout global, fontes e estilos.
- `app/page.tsx` — Página principal (landing page).

## ⚙️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- React
- TypeScript
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) e [Geist Font](https://vercel.com/font)
- CSS Modules (ou Tailwind CSS se estiver configurado)
- LocalStorage para armazenamento temporário de dados do usuário

## 📦 Deploy

Recomendado o deploy na [Vercel](https://vercel.com) para melhor performance e integração contínua. Basta conectar o repositório no painel da Vercel e seguir as instruções.

## 🤝 Contribua

Pull requests são bem-vindos! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/sua-feature`)
3. Commit suas modificações (`git commit -m 'feat: nova feature'`)
4. Faça push na sua branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

---

Desenvolvido por [JoaoVitorMS0](https://github.com/JoaoVitorMS0) 💙  
Protótipo de alta fidelidade feito por Eyck Cainã Silva Santos,
João Pedro de Oliveira Guimarães, João Afonso Lopes de Carvalho
