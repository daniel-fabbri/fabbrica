# Fabbrica - Landing Page

Landing page moderna e disruptiva para empresa de arquitetura de software e inovação com IA.

## 🚀 Características

- **Design Moderno**: Interface contemporânea com gradientes, glassmorphism e animações sutis
- **Totalmente Responsivo**: Otimizado para todos os dispositivos
- **Performance**: Carregamento rápido e otimizado
- **Animações Suaves**: Experiência visual impactante
- **SEO Friendly**: Estrutura semântica e otimizada

## 🛠️ Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- JavaScript Vanilla (ES6+)
- Google Fonts (Inter & Space Grotesk)

## 📂 Estrutura do Projeto

```
fabbrica/
├── index.html              # Estrutura principal
├── styles.css              # Estilos e animações
├── script.js               # Interatividade
├── staticwebapp.config.json # Configuração Azure
└── README.md               # Este arquivo
```

## 🌐 Deploy no Azure Static Web Apps

### Opção 1: Via Azure Portal (Interface Gráfica)

1. **Acesse o Azure Portal**: https://portal.azure.com
2. **Crie um novo recurso**: Procure por "Static Web App"
3. **Configure o recurso**:
   - Nome: `fabbrica-web` (ou outro nome de sua escolha)
   - Região: Escolha a mais próxima
   - Plan: Free (para começar)
4. **Configure o deployment**:
   - Source: GitHub (ou "Other" para upload manual)
   - Se GitHub: conecte seu repositório
   - Se Other: use Azure CLI ou VS Code extension
5. **Build Details**:
   - App location: `/`
   - Output location: deixe em branco (site estático puro)
6. **Revisar e Criar**: Aguarde a criação do recurso

### Opção 2: Via Azure CLI

```bash
# 1. Login no Azure
az login

# 2. Criar o Static Web App
az staticwebapp create \
  --name fabbrica-web \
  --resource-group seu-resource-group \
  --source . \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --output-location "" \
  --sku Free

# 3. Deploy manual (se não estiver usando GitHub)
az staticwebapp upload \
  --name fabbrica-web \
  --resource-group seu-resource-group \
  --source .
```

### Opção 3: Via VS Code Extension

1. **Instale a extensão**: "Azure Static Web Apps" no VS Code
2. **Abra a paleta de comandos**: `Ctrl+Shift+P` (Windows) ou `Cmd+Shift+P` (Mac)
3. **Execute**: "Azure Static Web Apps: Create Static Web App..."
4. **Siga o wizard**:
   - Selecione sua subscrição
   - Escolha um nome para o recurso
   - Selecione a região
   - Escolha "Custom" como framework preset
   - App location: `/`
   - Output location: deixe em branco

### Opção 4: Via GitHub Actions (CI/CD Automático)

1. **Crie um repositório no GitHub** e faça push do código
2. **No Azure Portal**, crie o Static Web App e conecte ao GitHub
3. O Azure criará automaticamente um workflow no GitHub Actions
4. A cada push na branch `main`, o site será automaticamente deployado

Exemplo de workflow (`.github/workflows/azure-static-web-apps.yml`):

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true

      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: ""
```

## 🎨 Personalização

### Cores

Edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --accent: #ec4899;
    /* ... */
}
```

### Conteúdo

Edite o arquivo `index.html` para alterar:
- Textos e descrições
- Links de navegação
- Informações de contato
- Cases e projetos
- Tecnologias

### Fontes

As fontes atuais são:
- **Inter**: Corpo do texto
- **Space Grotesk**: Títulos

Para alterar, edite o link no `<head>` do `index.html`.

## 📱 Funcionalidades

- **Menu Mobile**: Hamburguer menu responsivo
- **Scroll Suave**: Navegação entre seções
- **Animações**: Fade in, parallax, hover effects
- **Cards Interativos**: Efeito 3D nos cards
- **Contador Animado**: Stats com animação de números
- **Cursor Trail**: Efeito de rastro do cursor (desktop)

## 🔧 Desenvolvimento Local

Para testar localmente, você pode usar qualquer servidor HTTP simples:

### Python
```bash
python -m http.server 8000
```

### Node.js (http-server)
```bash
npx http-server -p 8000
```

### VS Code Live Server
1. Instale a extensão "Live Server"
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

Acesse: `http://localhost:8000`

## 📊 Performance

O site é otimizado para:
- ✅ Core Web Vitals
- ✅ Lighthouse Score > 90
- ✅ Carregamento rápido
- ✅ SEO otimizado
- ✅ Acessibilidade

## 🌍 Domínio Customizado

Após o deploy no Azure Static Web Apps:

1. **No Azure Portal**, vá até seu Static Web App
2. Clique em **"Custom domains"** no menu lateral
3. Clique em **"Add"**
4. Siga as instruções para configurar seu domínio:
   - Adicione um registro CNAME no seu provedor de DNS
   - Aponte para o URL gerado pelo Azure
   - Aguarde a validação

Exemplo de configuração DNS:
```
CNAME: www.seudominio.com → gentle-beach-xxxxxx.azurestaticapps.net
```

## 📧 Contato

Para configurar o formulário de contato, você pode integrar com:
- Azure Functions
- SendGrid
- Formspree
- Web3Forms

## 🔒 Segurança

O arquivo `staticwebapp.config.json` já inclui:
- Headers de segurança (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Configuração de cache
- Fallback para SPA

## 📝 Licença

Este projeto é proprietário da Fabbrica. Todos os direitos reservados.

## 🤝 Suporte

Para dúvidas ou suporte:
- Email: contato@fabbrica.website
- Website: [Após deploy]

---

**Desenvolvido com ❤️ pela Fabbrica**
