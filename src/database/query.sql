/* Usuaro */

SELECT TOP (1000) [id]
      ,[email]
      ,[senha_hash]
      ,[createdAt]
      ,[updatedAt]
FROM [sariliodev].[dbo].[Usuario]

SELECT cpf  FROM PessoaFisica WHERE usuario_id = 3

/* Conta Bancaria */

SELECT TOP (1000) [id]
      ,[cpf]
      ,[titular]
      ,[numero_do_banco]
      ,[tipo_de_conta]
      ,[agencia]
      ,[numero_da_conta]
      ,[usuario_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[ContaBancaria]


  SELECT tipo, [status] FROM Qualificacao
  WHERE usuario_id = 1


/* Qualidicação */

SELECT Usuario.id, Usuario.email, Qualificacao.tipo, Qualificacao.usuario_id, Qualificacao.[status]
FROM Usuario
INNER JOIN Qualificacao ON Usuario.id = Qualificacao.usuario_id
/* WHERE Qualificacao.tipo = 'Funcionario' */
WHERE Qualificacao.usuario_id = 1
ORDER BY [Qualificacao].[id]
GO

SELECT TOP (1000) [id]
      ,[tipo]
      ,[status]
      ,[usuario_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[Qualificacao]

SELECT usuario_id FROM [dbo].[Qualificacao]
WHERE tipo = 'Funcionario'
GO

-- Delete rows from table '[Qualificacao]' in schema '[dbo]'
DELETE FROM [dbo].[Qualificacao]
WHERE usuario_id = 3 AND [status] = 'Inativo'
GO


/* Pessoa Juridica */

SELECT TOP (1000) [id]
      ,[cnpj]
      ,[nome_fantasia]
      ,[razao_social]
      ,[inscricao_estadual]
      ,[telefone]
      ,[usuario_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[PessoaJuridica]

  SELECT * FROM [dbo].[Qualificacao], [dbo].[PessoaFisica]
  WHERE tipo = 'Cliente'
  GO

  /* Pessoa Fisica */

SELECT TOP (1000) [id]
      ,[cpf]
      ,[nome]
      ,[data_de_nascimento]
      ,[nome_da_mae]
      ,[celular]
      ,[genero]
      ,[usuario_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[PessoaFisica]
  GO

  /* Endereço */

  SELECT TOP (10) [id]
      ,[cep]
      ,[logradouro]
      ,[numero]
      ,[complemento]
      ,[bairro]
      ,[localidade]
      ,[uf]
      ,[unidade]
      ,[ibge]
      ,[gia]
      ,[usuario_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[Endereco]

  /* Conta Interna */

  SELECT TOP (10) [id]
      ,[brl_saldo]
      ,[ativo_brl_saldo]
      ,[usuario_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[ContaInterna]

/* Ativo  */

SELECT TOP (10) [id]
      ,[nome_do_ativo]
      ,[valor]
      ,[quantidade_disponivel]
      ,[categoria_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[Ativo]
  WHERE nome_do_ativo ='SarilioCoin'

/* LivroDeOfertas */

SELECT TOP (1000) [id]
      ,[tipo_de_ordem]
      ,[preco_limite]
      ,[valor_total]
      ,[comissao]
      ,[quantidade]
      ,[status]
      ,[conta_interna_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[LivroDeOferta]
