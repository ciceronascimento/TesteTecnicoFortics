# Teste Técnico Fortics

## Visão Geral
- Desenvolvimento de testes automatizados end-to-end (e2e) para o sistema Swag Labs utilizando Cypress.
- Adoção do padrão gitflow no repositório para facilitar a criação e refatoração de funcionalidades.
- Integração da biblioteca Faker para geração dinâmica e realista de dados durante os testes.

## Estrutura do Projeto

O projeto segue a seguinte estrutura de organização de pastas:
> **Nota sobre Estrutura do Projeto:**
> 
> - __e2e/fixtures__: Armazena arquivos JSON com dados utilizados nos testes.
> - __e2e/integration__: Contém os scripts de teste para integração.
> - __support/helpers__: Inclui funções e utilitários auxiliares para facilitar a execução dos testes.
> - __support/pageObjects__: Apresenta objetos de página projetados para simplificar a interação com os elementos da interface de usuário durante os testes.
> - __features__: Agrupa casos de teste destinados a cobrir diversas funcionalidades do sistema.

## Como Começar

Siga as instruções abaixo para configurar e executar os testes:

### Pré-requisitos

Antes de prosseguir, certifique-se de ter o Node.js e o npm instalados em sua máquina.

### Instalação

Para instalar as dependências do projeto, execute o seguinte comando no terminal:

```bash
npm install 
```

### Execução dos Testes

Para executar os testes via terminal e gerar relatórios, utilize:

```bash
npx cypress run
```

Para visualizar e interagir com os testes através da interface do Cypress, utilize:

```bash
npx cypress open
```
