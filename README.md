<p align="center">
  <img src="https://img.shields.io/badge/cypress-%23E9E9E9.svg?style=for-the-badge&logo=cypress&logoColor=31EBEB" />
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

# 🚀 Automação de Testes E2E - Módulo Bancos de Dados

Este repositório contém a suíte de testes automatizados para a funcionalidade de **Bancos de Dados** da plataforma Colmeia. O objetivo do projeto foi garantir a qualidade dos fluxos principais (CRUD) e identificar falhas críticas de regra de negócio e experiência do usuário (UX).

## 🛠️ Tecnologias e Ferramentas
* **Framework:** [Cypress 13+](https://www.cypress.io/)
* **Linguagem:** JavaScript (ES6+)
* **Ambiente:** Node.js.

## 🔐 Custom Commands

O projeto utiliza Custom Commands do Cypress para reutilização de autenticação e redução de duplicidade de código.

Exemplo:
- cy.login()

## ⚙️ Configuração de Ambiente

As URLs e configurações sensíveis são gerenciadas via variáveis de ambiente do Cypress.

> **⚠️ Nota para o Avaliador:** Excepcionalmente para este desafio, o arquivo `.env` foi mantido no repositório (fora do `.gitignore`). Essa decisão foi intencional para facilitar a clonagem e execução imediata dos testes, eliminando a necessidade de configurações prévias.

## 📌 Estratégia de Testes

A estratégia adotada priorizou:
- Fluxos críticos do usuário
- Regras de negócio
- Cenários negativos
- Persistência de dados
- Segurança básica de entrada
- Evidência de bugs funcionais

## 🧪 Cenários de Teste Automatizados
A suíte cobre **10 cenários críticos**, garantindo uma cobertura abrangente da tela:

**Cenários para criação de bancos**
1. **Criação de Banco (Caminho Feliz):**  
   Validação do fluxo completo de criação de um novo banco de dados.

2. **Validação de Campo Obrigatório e Bypass de Validação:**  
   Tentativa de salvar registro sem preenchimento e evidência de falha via clique duplo no botão "Salvar".

3. **Arquivamento de Registro:**  
   Validação do fluxo de arquivamento e inconsistência de persistência/listagem após atualização.

4. **Pesquisa e Filtro Dinâmico:**  
   Validação de busca por registros existentes e comportamento para pesquisas sem resultado.

5. **Exclusão de Registro:**  
   Remoção de banco de dados e validação da exclusão na listagem.

6. **Duplicidade de Nomes:**  
   Validação do comportamento da aplicação ao permitir criação de registros com nomes idênticos.

7. **Sanitização e Caracteres Especiais:**  
   Inserção de caracteres especiais e scripts para validação básica de segurança e renderização.

8. **Persistência após Refresh:**  
   Validação da perda de dados após atualização completa da aplicação (F5/reload).


**Cenários referente ao login**
9. **Login sem preenchimento:**  
   Validação de mensagens obrigatórias ao tentar autenticação sem credenciais.

10. **Login com credenciais inválidas:**  
    Validação do comportamento da aplicação ao informar usuário/senha incorretos.

---

## 🐞 Relatório de Bugs Identificados

Durante a execução da automação, foram detectadas as seguintes inconsistências:

| ID | Defeito | Impacto |
| :--- | :--- | :--- |
| **BUG-01** | **Bypass de Validação** | Permite salvar campos vazios através de clique duplo no botão "Salvar". |
| **BUG-02** | **Item não sendo apresentado** | Registros arquivados não são exibidos corretamente na aba "Arquivados". |
| **BUG-03** | **Falta de Persistência** | Dados criados em memória são perdidos ao atualizar o navegador (F5) e o refresh da tabela não recupera registros arquivados. |
| **BUG-04** | **Duplicidade de Nomes** | O sistema permite a criação de múltiplos bancos com o mesmo nome sem aviso. |
| **BUG-05** | **Permite nomes vazios** | É possível criar bancos sem nome válido (campos vazios ou apenas espaços). |
| **BUG-06** | **Colmeia Forms sem carregamento** | Ao acessar a funcionalidade "Colmeia Forms", nenhum conteúdo é renderizado na tela, impossibilitando utilização do módulo. |
| **BUG-07** | **Menu do candidato sem ação** | O botão/perfil do candidato apresenta ícone de expansão, porém não executa nenhuma ação ou exibe opções ao usuário após clique. |

## 💡 Sugestões de Melhoria (UX)
* Implementar **Modais de Confirmação** antes de ações de exclusão por exemplo.
* Adicionar **Toasts de Feedback** (Sucesso/Erro) para confirmação de ações ao usuário.
* Aplicar máscaras de validação e restrição de caracteres no campo de nome.

## 📊 Relatórios de Execução

O projeto utiliza o **Mochawesome** para geração de relatórios HTML de execução automatizada.

Os relatórios são gerados automaticamente na raiz do projeto através do arquivo:

report.html

---

## 🚀 Como Executar o Projeto

1. **Instalação:**
   npm install

2. Executar via Interface (Cypress Open):
    npx cypress open

3. Executar os testes em modo headless:
    npm test

4. Gerar o relatório HTML com Mochawesome após a execução dos testes:
    npm run report

5. Abrir o relatório gerado no navegador:
    start report.html


---

<p align="center">
  Desenvolvido por <strong>Leonardo Balbinotti</strong> 🚀
  <br>
  <a href="https://www.linkedin.com/in/leonardo-balbinotti" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
</p>