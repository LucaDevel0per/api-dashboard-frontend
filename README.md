# 🚀 User Dashboard Frontend

Um sistema completo de dashboard de usuários com autenticação JWT, painel administrativo e área do usuário, construído com Next.js 14 e TypeScript.

## ✨ Funcionalidades

### 🔐 **Sistema de Autenticação**
- **Cadastro de usuários** com validação
- **Login** com JWT
- **Proteção de rotas** baseada em roles (admin/usuário)
- **Logout** seguro

### 👨‍💼 **Painel Administrativo**
- **Lista de usuários** com busca por nome
- **Visualização de perfil** individual
- **Edição de usuários** (nome, email)
- **Exclusão de usuários** com confirmação
- **Página de perfil** dedicada para cada usuário
- **Verificação de permissões** de admin

### 👤 **Área do Usuário**
- **Perfil pessoal** com informações detalhadas
- **Edição de dados** pessoais
- **Alteração de senha** com validação
- **Histórico de atividades** recentes
- **Logout** da conta

### 🎨 **Interface Moderna**
- **Design responsivo** para desktop e mobile
- **Gradientes** e cards modernos
- **Ícones Lucide** para melhor UX
- **Feedback visual** para todas as ações
- **Estados de loading** com spinners
- **Mensagens de erro/sucesso** estilizadas

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones modernos
- **JWT** - Autenticação segura
- **Fetch API** - Comunicação com backend

## 📁 Estrutura do Projeto

```
my-app/
├── src/
│   ├── app/
│   │   ├── login/page.tsx          # Página de login
│   │   ├── signup/page.tsx         # Página de cadastro
│   │   ├── area/page.tsx           # Área comum (escolha de área)
│   │   ├── dashboard/page.tsx      # Painel administrativo
│   │   ├── user-area/page.tsx      # Área do usuário
│   │   └── profile/[id]/page.tsx   # Perfil individual do usuário
│   ├── components/
│   │   ├── login.tsx               # Componente de login
│   │   └── signup.tsx              # Componente de cadastro
│   └── lib/
│       └── utils.ts                # Utilitários
├── public/                         # Arquivos estáticos
├── .env.local                      # Variáveis de ambiente
└── package.json
```

## 🚀 Instalação e Configuração

### 1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd user-dashboard-frontend/my-app
```

### 2. **Instale as dependências**
```bash
npm install
```

### 3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. **Execute o projeto**
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 🔧 Configuração do Backend

Este frontend espera um backend com as seguintes rotas:

### **Autenticação**
- `POST /api/register` - Cadastro de usuários
- `POST /api/login` - Login de usuários

### **Usuários**
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca usuário por ID
- `PUT /api/users/:id` - Atualiza usuário
- `DELETE /api/users/:id` - Remove usuário

### **Verificação de Admin**
- `GET /api/dashboard` - Verifica permissões de admin

### **Headers Necessários**
- `Authorization: Bearer <token>` para rotas protegidas
- `Content-Type: application/json` para requisições POST/PUT

## 📱 Como Usar

### **1. Cadastro e Login**
- Acesse `/signup` para criar uma conta
- Acesse `/login` para fazer login
- Após autenticação, será redirecionado para `/area`

### **2. Área Comum**
- Escolha entre "Área do Usuário" ou "Área do Admin"
- A área do admin requer permissões especiais

### **3. Painel Administrativo**
- Visualize todos os usuários
- Busque usuários por nome
- Clique no ícone de olho para ver perfil detalhado
- Edite ou delete usuários
- Acesse página de perfil individual

### **4. Área do Usuário**
- Visualize suas informações pessoais
- Edite nome e email
- Altere sua senha
- Veja histórico de atividades
- Faça logout da conta

## 🎨 Design System

### **Cores**
- **Azul**: Login, perfil do usuário
- **Verde**: Cadastro, atividades
- **Roxo**: Segurança, alteração de senha
- **Vermelho**: Logout, ações destrutivas

### **Componentes**
- **Cards** com gradientes e sombras
- **Botões** com estados hover e loading
- **Inputs** com ícones e validação
- **Mensagens** de feedback coloridas

## 🔒 Segurança

- **JWT** para autenticação
- **Proteção de rotas** baseada em tokens
- **Validação** de formulários
- **Confirmação** para ações destrutivas
- **Logout** com limpeza de dados

## 🚀 Deploy

### **Vercel (Recomendado)**
```bash
npm run build
vercel --prod
```

### **Outros Provedores**
- Configure as variáveis de ambiente
- Execute `npm run build`
- Deploy dos arquivos da pasta `out/`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no repositório
- Entre em contato através do email

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**
