# 🚀 Guia Rápido de Deploy - Azure Static Web Apps

## Deploy em 5 Minutos

### 📋 Pré-requisitos
- Conta no Azure (crie gratuitamente em https://azure.com/free)
- Código do site (já pronto neste diretório)

---

## 🎯 Método 1: Deploy via Azure Portal (Mais Fácil)

### Passo 1: Login no Azure
Acesse: https://portal.azure.com

### Passo 2: Criar Static Web App
1. Clique em **"Criar um recurso"**
2. Busque por **"Static Web App"**
3. Clique em **"Criar"**

### Passo 3: Configurar
```
Subscription: Sua subscrição
Resource Group: Criar novo "rg-fabbrica"
Name: fabbrica-web
Region: East US 2 (ou mais próxima)
Plan type: Free
Deployment source: Other
```

### Passo 4: Deploy Manual
Após criar o recurso, você terá um **deployment token**.

No PowerShell, execute:
```powershell
# Instale a Azure CLI se ainda não tiver
winget install Microsoft.AzureCLI

# Login
az login

# Deploy
az staticwebapp upload `
  --name fabbrica-web `
  --resource-group rg-fabbrica `
  --source . `
  --token "SEU_TOKEN_AQUI"
```

### Passo 5: Acessar
Seu site estará disponível em:
```
https://gentle-beach-xxxxxx.azurestaticapps.net
```

---

## 🎯 Método 2: Deploy via VS Code (Recomendado)

### Passo 1: Instalar Extensão
1. Abra VS Code
2. Vá em Extensions (Ctrl+Shift+X)
3. Busque: **"Azure Static Web Apps"**
4. Clique em **Install**

### Passo 2: Login no Azure
1. Clique no ícone do Azure na barra lateral
2. Clique em **"Sign in to Azure"**
3. Complete o login no navegador

### Passo 3: Deploy
1. Clique com botão direito na pasta do projeto
2. Selecione **"Deploy to Static Web Apps"**
3. Escolha sua subscription
4. Escolha **"Create new Static Web App"**
5. Nome: `fabbrica-web`
6. Região: Escolha a mais próxima
7. Framework preset: **"Custom"**
8. App location: `/`
9. Output location: *(deixe em branco)*

### Passo 4: Aguarde
O deploy leva ~2 minutos. Você verá o progresso na aba Output.

✅ Pronto! Seu site está no ar!

---

## 🎯 Método 3: Deploy via GitHub Actions (Automático)

### Passo 1: Criar Repositório no GitHub
```bash
git init
git add .
git commit -m "Initial commit: Fabbrica landing page"
git branch -M main
git remote add origin https://github.com/seu-usuario/fabbrica.git
git push -u origin main
```

### Passo 2: Criar Static Web App com GitHub
1. No Azure Portal, crie um novo Static Web App
2. Em **Deployment source**, escolha **"GitHub"**
3. Autorize o Azure a acessar seu GitHub
4. Selecione seu repositório: `fabbrica`
5. Branch: `main`
6. Framework preset: **"Custom"**
7. App location: `/`
8. Output location: *(deixe em branco)*

### Passo 3: Deploy Automático
O Azure criará automaticamente um GitHub Actions workflow.

✅ Agora, a cada `git push`, seu site é atualizado automaticamente!

---

## 🎨 Customizações Rápidas

### Alterar Cores Principais
Edite `styles.css` (linhas 1-10):
```css
:root {
    --primary: #6366f1;      /* Azul principal */
    --secondary: #8b5cf6;    /* Roxo secundário */
    --accent: #ec4899;       /* Rosa destaque */
}
```

### Alterar Nome da Empresa
Busque e substitua "Fabbrica" em `index.html`:
- Ctrl+H (Find and Replace)
- Find: `Fabbrica`
- Replace: `Seu Nome`

### Alterar Email de Contato
Edite `index.html` (linha ~380):
```html
<a href="mailto:contato@fabbrica.website">
```

### Adicionar Logo
1. Adicione sua imagem em `/images/logo.svg`
2. Edite `index.html` (linha ~18):
```html
<a href="#" class="logo">
    <img src="/images/logo.svg" alt="Logo" />
    <span class="logo-text">Sua Empresa</span>
</a>
```

---

## 🌍 Configurar Domínio Próprio

### Passo 1: No Azure Portal
1. Vá para seu Static Web App
2. Clique em **"Custom domains"**
3. Clique em **"+ Add"**
4. Digite seu domínio: `www.seudominio.com`

### Passo 2: No seu Provedor de DNS
Adicione um registro CNAME:
```
Type: CNAME
Name: www
Value: gentle-beach-xxxxxx.azurestaticapps.net
TTL: 3600
```

### Passo 3: Validar
Volte ao Azure Portal e clique em **"Validate"**

⏱️ Pode levar até 48h para propagar (geralmente 15 minutos)

---

## 📊 Monitoramento

### Ver Logs de Deploy
**Azure Portal** → Seu Static Web App → **Deployments**

### Analytics (Opcional)
Adicione Google Analytics em `index.html` antes de `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🆘 Troubleshooting

### Erro: "Site não carrega"
✅ Verifique se o deploy foi concluído com sucesso
✅ Aguarde 2-3 minutos após o deploy
✅ Limpe o cache do navegador (Ctrl+Shift+R)

### Erro: "404 Not Found"
✅ Verifique se `staticwebapp.config.json` está na raiz
✅ Verifique se `index.html` está na raiz

### CSS/JS não carrega
✅ Verifique os caminhos no `index.html`
✅ Certifique-se de que os arquivos foram incluídos no deploy

### Site lento
✅ Azure Static Web Apps tem CDN global automático
✅ Verifique no Azure Portal: Overview → Performance

---

## 💰 Custos

### Plano Free (Incluído)
- ✅ 100 GB de bandwidth por mês
- ✅ 2 ambientes (production + staging)
- ✅ SSL/HTTPS gratuito
- ✅ CDN global
- ✅ Domínio customizado

**Custo: $0/mês** para sites pequenos/médios

### Quando Upgrade?
- Traffic > 100 GB/mês
- Precisa de mais de 2 ambientes
- Enterprise features

---

## 📞 Suporte

### Documentação Oficial
https://docs.microsoft.com/azure/static-web-apps

### Azure Support
https://azure.microsoft.com/support

### Comunidade
- Stack Overflow: tag `azure-static-web-apps`
- Microsoft Q&A: https://aka.ms/qs-azurewebapps

---

## ✅ Checklist Final

- [ ] Site deployado no Azure
- [ ] URL funcionando
- [ ] Conteúdo personalizado (nome, cores, textos)
- [ ] Email de contato atualizado
- [ ] Testado em mobile e desktop
- [ ] (Opcional) Domínio próprio configurado
- [ ] (Opcional) Analytics configurado
- [ ] (Opcional) GitHub Actions para deploy automático

---

**🎉 Parabéns! Seu site está no ar!**

Compartilhe: https://[seu-site].azurestaticapps.net
