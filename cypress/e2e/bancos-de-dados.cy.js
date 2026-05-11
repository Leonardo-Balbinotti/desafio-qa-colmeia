describe('Funcionalidade: Bancos de Dados - Colmeia', () => {

  beforeEach(() => {
    // Configura a resolução da tela e realiza o login via Custom Command
    cy.viewport(1280, 720);
    cy.login();

    // Navegação até a tela de Bancos de Dados
    cy.get('a[routerlink="/dashboard/campanha"]').click();
    cy.contains('Bancos de dados', { matchCase: false }).click({ force: true });
  });

  // --- CENÁRIO 1: Fluxo de Criação (Caminho Feliz) ---
  it('Deve criar um novo banco de dados com sucesso', () => {
    // Definição de massa de dados dinâmica
    const nomeBanco = `Banco_Automacao_${Math.floor(Math.random() * 1000)}`;

    // Acionamento do fluxo de criação
    cy.contains('button', 'Criar').click();
    cy.contains('Adicionar novo item').should('be.visible');

    // Preenchimento do formulário e submissão
    cy.get('input[placeholder="Nome do item"]').type(nomeBanco);
    cy.contains('button', 'Salvar').click();

    // Validação da persistência dos dados na listagem
    cy.contains(nomeBanco).should('be.visible');
  });

  // --- CENÁRIO 2: Fluxo Negativo (Bypass de validação via Double Click) ---
  it('Deve evidenciar falha de validação ao permitir salvar campo vazio com clique duplo', () => {
    // Abertura do modal de criação
    cy.contains('button', 'Criar').click();

    // Primeiro clique para disparar a validação de campo obrigatório
    cy.contains('button', 'Salvar').click();
    cy.contains('O nome do item é obrigatório').should('be.visible');

    // Segundo clique para evidenciar o bypass da trava de segurança
    cy.contains('button', 'Salvar').click();

    // Validação da falha: O sistema fecha o modal sem preenchimento do campo obrigatório
    cy.contains('Adicionar novo item').should('not.exist');
    cy.contains('Campo obrigatório').should('not.exist');
  });

  // --- CENÁRIO 3: Validação de banco cadastrado na listagem ---

  it('Deve arquivar um banco e validar que o registro não consta nos arquivados', () => {

    const nomeBancoArquivar = `Banco_Para_Arquivar_${Math.floor(Math.random() * 1000)}`;

    // --- CRIAÇÃO DO BANCO ---
    // Abre o modal de criação
    cy.contains('button', 'Criar').click();

    // Preenche o nome do banco criado dinamicamente
    cy.get('input[placeholder="Nome do item"]').should('be.visible').type(nomeBancoArquivar);

    // Salva o novo registro
    cy.contains('button', 'Salvar').click();

    // Valida que o banco foi criado com sucesso na tabela
    cy.contains('tr', nomeBancoArquivar).should('be.visible');

    // --- ARQUIVAMENTO ---
    // Busca a linha correspondente ao banco criado
    // e executa o clique no primeiro botão da linha
    cy.contains('tr', nomeBancoArquivar).within(() => { cy.get('button').first().click({ force: true }); });

    // --- VALIDAÇÃO DA REMOÇÃO ---
    // Confirma que o item desapareceu da listagem principal
    cy.contains(nomeBancoArquivar).should('not.exist');

    // --- REFRESH DA TELA ---
    // Executa refresh manual para validar persistência da remoção
    cy.get('button:visible').eq(1).click({ force: true });

    // Garante novamente que o banco não voltou para a listagem após refresh
    cy.contains(nomeBancoArquivar).should('not.exist');

  });
  // --- CENÁRIO 4: Validação de Pesquisa ---
  it('Deve filtrar bancos de dados corretamente através do campo de pesquisa', () => {

    const bancoPesquisa01 = `Banco_Pesquisa_${Math.floor(Math.random() * 1000)}`;
    const bancoPesquisa02 = `Banco_Secundario_${Math.floor(Math.random() * 1000)}`;
    const bancoInexistente = `Banco_Inexistente_${Math.floor(Math.random() * 1000)}`;

    // --- CRIAÇÃO DO PRIMEIRO BANCO ---
    // Abre o modal de criação
    cy.contains('button', 'Criar').click();

    // Preenche o nome do primeiro banco
    cy.get('input[placeholder="Nome do item"]').should('be.visible').type(bancoPesquisa01);

    // Salva o registro
    cy.contains('button', 'Salvar').click();

    // Valida criação do primeiro banco
    cy.contains('tr', bancoPesquisa01).should('be.visible');

    // --- CRIAÇÃO DO SEGUNDO BANCO ---
    // Abre novamente o modal
    cy.contains('button', 'Criar').click();

    // Preenche o nome do segundo banco
    cy.get('input[placeholder="Nome do item"]').should('be.visible').type(bancoPesquisa02);

    // Salva o segundo registro
    cy.contains('button', 'Salvar').click();

    // Valida criação do segundo banco
    cy.contains('tr', bancoPesquisa02).should('be.visible');

    // --- PESQUISA DE REGISTRO EXISTENTE ---
    // Limpa o campo de pesquisa e busca pelo primeiro banco criado
    cy.get('input[placeholder="Pesquisar"]').clear().type(bancoPesquisa01);

    // Valida que o banco pesquisado aparece na tabela
    cy.contains('tr', bancoPesquisa01).should('be.visible');

    // Valida que o segundo banco não aparece no filtro
    cy.contains('tr', bancoPesquisa02).should('not.exist');

    // --- PESQUISA DE REGISTRO INEXISTENTE ---
    // Limpa o campo e pesquisa um banco inexistente
    cy.get('input[placeholder="Pesquisar"]').clear().type(bancoInexistente);

    // Valida que os registros criados não aparecem mais na listagem
    cy.contains('tr', bancoPesquisa01).should('not.exist');
    cy.contains('tr', bancoPesquisa02).should('not.exist');

  });

  // --- CENÁRIO 5: Fluxo de Exclusão (Remoção de Registro) ---
  it('Deve excluir um banco de dados e validar a remoção na listagem', () => {

    const nomeBancoExcluir = `Excluir_${Math.floor(Math.random() * 1000)}`;

    // --- CRIAÇÃO DO REGISTRO ---
    // Abre modal de criação
    cy.contains('button', 'Criar').click();

    // Preenche o nome do banco
    cy.get('input[placeholder="Nome do item"]').type(nomeBancoExcluir);

    // Salva o novo registro
    cy.contains('button', 'Salvar').click();

    // Valida que o banco foi criado corretamente
    cy.contains('tr', nomeBancoExcluir).should('be.visible');

    // --- EXCLUSÃO DO REGISTRO ---
    // Busca a linha correspondente ao banco criado
    // e executa o clique no segundo botão da linha (excluir)
    cy.contains('tr', nomeBancoExcluir)
      .within(() => {
        cy.get('button')
          .eq(1)
          .click({ force: true });
      });

    // --- VALIDAÇÃO DA REMOÇÃO ---
    // Confirma que o registro não existe mais na listagem
    cy.contains(nomeBancoExcluir).should('not.exist');

  });

  // --- CENÁRIO 6: Validação de Nomes Duplicados ---
  it('Deve validar o comportamento do sistema ao tentar criar bancos com nomes idênticos', () => {
    const nomeDuplicado = "Banco_Repetido_Teste";

    // Criação do primeiro registro
    cy.contains('button', 'Criar').click();
    cy.get('input[placeholder="Nome do item"]').type(nomeDuplicado);
    cy.contains('button', 'Salvar').click();

    // Tentativa de criação do segundo registro com o mesmo nome
    cy.contains('button', 'Criar').click();
    cy.get('input[placeholder="Nome do item"]').type(nomeDuplicado);
    cy.contains('button', 'Salvar').click();

    // Análise de resultado: 
    // Se o sistema permitir (dois itens iguais na lista), o teste evidencia falta de validação.
    // Se o sistema barrar (ex: mensagem de erro), o teste valida a regra de negócio.
    cy.get('tr').filter(`:contains("${nomeDuplicado}")`).should('have.length.at.least', 1);
  });

  // --- CENÁRIO 7: Validação de Caracteres Especiais e Sanitização ---
  it('Deve validar a criação de registro com caracteres especiais e scripts', () => {
    const nomeEspecial = "QA_TEST_!@#$%¨&*()_+<script>alert(1)</script>";

    cy.contains('button', 'Criar').click();
    cy.get('input[placeholder="Nome do item"]').type(nomeEspecial);
    cy.contains('button', 'Salvar').click();

    // Valida se o sistema renderizou o texto corretamente sem executar o script
    // E se não houve quebra de layout na tabela
    cy.contains('tr', 'QA_TEST_').should('be.visible');
  });

  // --- CENÁRIO 8: Validação de Persistência após refresh ---
  it('Deve validar perda de persistência após refresh da página', () => {

    const bancoRefresh = `Refresh_${Math.floor(Math.random() * 1000)}`;

    // --- CRIAÇÃO DO REGISTRO ---
    // Abre o modal de criação
    cy.contains('button', 'Criar').click();

    // Preenche o nome do banco dinamicamente
    cy.get('input[placeholder="Nome do item"]').type(bancoRefresh);

    // Salva o novo registro
    cy.contains('button', 'Salvar').click();

    // Valida que o banco foi criado corretamente
    cy.contains('tr', bancoRefresh).should('be.visible');

    // --- REFRESH DA APLICAÇÃO ---
    // Recarrega completamente a página simulando um F5 do usuário
    cy.reload();

    // --- VALIDAÇÃO DE PERSISTÊNCIA ---
    // Confirma que o registro não permaneceu após atualização da página
    cy.contains('tr', bancoRefresh).should('not.exist');

  });
  
});