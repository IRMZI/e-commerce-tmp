# Documentação de Configuração e Execução do Projeto

## Estrutura do Projeto

```
.gitattributes
.gitignore
backend/
	.env
	package.json
	src/
		auth/
			auth.js
		config/
			smtp.js
		Controllers/
			leads.js
			orders.js
			products.js
			users.js
		Data/
			productsData.json
		DataAccess/
			leads.js
			...
		database/
		helpers/
			logger.js
		index.js
		routes/
		services/
frontend/
	eslint.config.js
	index.html
	package.json
	public/
	README.md
	src/
		App.jsx
		assets/
			styles/
				global.css
		components/
		contexts/
		index.css
		main.jsx
		pages/
		services/
	tsconfig.json
	vite.config.js
README.md
```

## Dependências

### Backend

As dependências do backend estão listadas no arquivo 

package.json

:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "description": "",
  "devDependencies": {
    "nodemon": "^3.1.7"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.10.0",
    "nodemailer": "^6.9.16",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0"
  }
}
```

### Frontend

As dependências do frontend estão listadas no arquivo 

package.json

:

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^6.3.1",
    "@mui/material": "^6.1.7",
    "lucide": "^0.468.0",
    "mui": "^0.0.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "react-router-dom": "^6.28.0",
    "react-slick": "^0.30.2",
    "recharts": "^2.15.0",
    "zod": "^3.23.8"
  }
}
```

## Variáveis de Ambiente

### Backend

Crie um arquivo `.env` na pasta 

backend

 com o seguinte conteúdo:

```
MONGO_CS=<sua-string-de-conexão-mongodb>
MONGO_DB_NAME=<nome-do-seu-banco-de-dados>
EMAIL_USER=<seu-email>
EMAIL_PASSWORD=<sua-senha-de-email>
```

### Frontend

Não há variáveis de ambiente específicas listadas para o frontend.

## Configuração e Execução

### Backend

1. Navegue até a pasta 

backend

:
    ```sh
    cd backend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```

### Frontend

1. Navegue até a pasta 

frontend

:
    ```sh
    cd frontend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```

## Estrutura de Diretórios

### Backend

- 

src/auth

: Contém a lógica de autenticação.
- 

src/config

: Configurações de SMTP.
- 

src/Controllers

: Controladores para leads, pedidos, produtos e usuários.
- 

src/Data

: Dados estáticos, como 

productsData.json

.
- 

src/DataAccess

: Acesso a dados para leads, pedidos, produtos e usuários.
- 

src/database

: Configuração do banco de dados.
- 

src/helpers

: Funções auxiliares, incluindo o logger.
- 

src/routes

: Definição das rotas.
- 

src/services

: Serviços, como envio de e-mails.

### Frontend

- 

src/assets

: Arquivos estáticos, como imagens.
- 

src/assets/styles

: Arquivos de estilo global.
- 

src/components

: Componentes React reutilizáveis.
- 

src/contexts

: Contextos React para gerenciamento de estado.
- 

src/pages

: Páginas da aplicação.
- 

src/services

: Serviços para comunicação com a API backend.

## Acessibilidade

Para garantir que a aplicação seja acessível, siga as diretrizes do WCAG (Web Content Accessibility Guidelines). Aqui estão algumas práticas recomendadas:

- Use atributos `aria-*` para melhorar a acessibilidade.
- Certifique-se de que todos os elementos interativos (botões, links, etc.) tenham rótulos descritivos.
- Utilize HTML semântico para melhorar a navegação por leitores de tela.
- Garanta que o contraste de cores seja suficiente para usuários com deficiência visual.
- Teste a aplicação com ferramentas de acessibilidade, como o Lighthouse do Google Chrome.

## Fontes do Projeto

Certifique-se de que as seguintes fontes estão incluídas no projeto:

```css
:root {
  --default-font: 'Roboto, sans-serif'; /* Fonte padrão */
  --secondary-font: 'Koulen, sans-serif'; /* Fonte secundária */
  --tertiary-font: 'Teko, sans-serif'; /* Fonte terciária */
  --quaternary-font: 'Cormorant, serif'; /* Fonte quaternária */
}
```

## Estilos Globais

Adicione o seguinte conteúdo ao arquivo `frontend/src/assets/styles/global.css`:

```css
:root {
  --default-font: 'Roboto, sans-serif';
  --secondary-font: 'Koulen, sans-serif';
  --tertiary-font: 'Teko, sans-serif';
  --quaternary-font: 'Cormorant, serif';
  --primary-color: #22C55E;
  --secondary-color: #8b5e3c;
  --error-color: #e74c3c;
  --background-color: #f9f9f9;
  --text-color: #333;
}

body {
  font-family: var(--default-font);
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--quaternary-font);
}

button {
  font-family: var(--default-font);
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: darken(var(--primary-color), 10%);
}
```

## Melhorias de UI/UX e Acessibilidade

### Design Visual

- Ajuste de cores para melhor contraste e legibilidade.
- Uso de tipografia consistente e espaçamentos adequados.
- Adição de efeitos de hover para elementos interativos.

### Usabilidade

- Simplificação das interações e navegação intuitiva.
- Adição de labels descritivos para ícones e botões.

### Acessibilidade

- Uso de atributos `aria-*` para melhorar a acessibilidade.
- Garantia de contraste de cores suficiente para usuários com deficiência visual.
- Testes com ferramentas de acessibilidade, como o Lighthouse do Google Chrome.

### Tempo de Carregamento

- Otimização de imagens e recursos estáticos.
- Uso de técnicas de lazy loading para componentes pesados.

### Chamadas para Ação (CTAs)

- Posicionamento estratégico de CTAs para aumentar a visibilidade.
- Texto claro e direto para incentivar cliques.
- Design atraente e consistente com o restante da página.

## Executando o Projeto

1. Certifique-se de que o MongoDB está em execução e acessível.
2. Inicie o backend conforme descrito acima.
3. Inicie o frontend conforme descrito acima.
4. Acesse o frontend no navegador em `http://localhost:3000`.

## Considerações Finais

Certifique-se de que todas as dependências estão instaladas e as variáveis de ambiente estão configuradas corretamente. Para qualquer dúvida ou problema, consulte a documentação das bibliotecas utilizadas ou entre em contato com o desenvolvedor responsável.