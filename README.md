# pgats-automacao-testes-web
Repositorio criado para o projeto de conclusão da disciplina de Automação de Testes na Camada de Interface (Web) da Pós Graduação

# Projeto de Testes End-to-End com Playwright

Este projeto contém testes automatizados end-to-end usando o [Playwright](https://playwright.dev/).  
O objetivo é validar fluxos críticos da aplicação web simulando o comportamento real do usuário.

---

## Pré-requisitos

Antes de iniciar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- Um editor de código como [VS Code](https://code.visualstudio.com/)

---

## Configuração do projeto

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/giotavares2296/pgats-automacao-testes-web.git
   ```

## Configuração e execução

###  Instale depêndencias

```bash
npm install
```

### Instale os navegadores usados pelo Playwright:
```bash
npx playwright install
```

### Executando os testes

**Execução em modo headless (sem abrir o navegador):**
```bash
npx playwright test
```

**Execução com o navegador visível (modo headed):**
```bash
npx playwright test --headed
```

**Execução de um teste específico::**
```bash
npx playwright test tests/login.spec.js
```
