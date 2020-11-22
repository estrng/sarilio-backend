-- Create a new database called 'sariliodev'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
  SELECT [name]
    FROM sys.databases
    WHERE [name] = N'sariliodev'
)
CREATE DATABASE sariliodev
GO


/* Usuario */

SELECT TOP (1000) [id]
      ,[email]
      ,[senha_hash]
      ,[createdAt]
      ,[updatedAt]
FROM [sariliodev].[dbo].[Usuario]

SELECT cpf  FROM PessoaFisica WHERE usuario_id = 3


SELECT [Usuario].[id], [Usuario].[email], [Usuario].[senha_hash], [Usuario].[createdAt], [Usuario].[updatedAt], [ContaBancaria].[id] AS [ContaBancaria.id], [ContaBancaria].[cpf] AS [ContaBancaria.cpf], [ContaBancaria].[titular] AS [ContaBancaria.titular], [ContaBancaria].[numero_do_banco] AS [ContaBancaria.numero_do_banco], [ContaBancaria].[tipo_de_conta] AS [ContaBancaria.tipo_de_conta], [ContaBancaria].[agencia] AS [ContaBancaria.agencia], [ContaBancaria].[numero_da_conta] AS [ContaBancaria.numero_da_conta], [ContaBancaria].[createdAt] AS [ContaBancaria.createdAt], [ContaBancaria].[updatedAt] AS [ContaBancaria.updatedAt], [ContaBancaria].[usuario_id] AS [ContaBancaria.usuario_id], [ContaInterna].[id] AS [ContaInterna.id], [ContaInterna].[brl_saldo] AS [ContaInterna.brl_saldo], [ContaInterna].[ativo_brl_saldo] AS [ContaInterna.ativo_brl_saldo], [ContaInterna].[createdAt] AS [ContaInterna.createdAt], [ContaInterna].[updatedAt] AS [ContaInterna.updatedAt], [ContaInterna].[usuario_id] AS [ContaInterna.usuario_id], [PessoaFisica].[id] AS [PessoaFisica.id], [PessoaFisica].[cpf] AS [PessoaFisica.cpf], [PessoaFisica].[nome] AS [PessoaFisica.nome], [PessoaFisica].[data_de_nascimento] AS [PessoaFisica.data_de_nascimento], [PessoaFisica].[nome_da_mae] AS [PessoaFisica.nome_da_mae], [PessoaFisica].[celular] AS [PessoaFisica.celular], [PessoaFisica].[genero] AS [PessoaFisica.genero], [PessoaFisica].[createdAt] AS [PessoaFisica.createdAt], [PessoaFisica].[updatedAt] AS [PessoaFisica.updatedAt], [PessoaFisica].[usuario_id] AS [PessoaFisica.usuario_id], [Qualificacao].[id] AS [Qualificacao.id], [Qualificacao].[tipo] AS [Qualificacao.tipo], [Qualificacao].[status] AS [Qualificacao.status], [Qualificacao].[createdAt] AS [Qualificacao.createdAt], [Qualificacao].[updatedAt] AS [Qualificacao.updatedAt], [Qualificacao].[usuario_id] AS [Qualificacao.usuario_id], [Endereco].[id] AS [Endereco.id], [Endereco].[cep] AS [Endereco.cep], [Endereco].[logradouro] AS [Endereco.logradouro], [Endereco].[numero] AS [Endereco.numero], [Endereco].[complemento] AS [Endereco.complemento], [Endereco].[bairro] AS [Endereco.bairro], [Endereco].[localidade] AS [Endereco.localidade], [Endereco].[uf] AS [Endereco.uf], [Endereco].[unidade] AS [Endereco.unidade], [Endereco].[ibge] AS [Endereco.ibge], [Endereco].[gia] AS [Endereco.gia], [Endereco].[createdAt] AS [Endereco.createdAt], [Endereco].[updatedAt] AS [Endereco.updatedAt], [Endereco].[usuario_id] AS [Endereco.usuario_id] 
FROM [Usuario]
LEFT OUTER JOIN [ContaBancaria] AS [ContaBancaria] ON [Usuario].[id] = [ContaBancaria].[usuario_id] 
LEFT OUTER JOIN [ContaInterna] AS [ContaInterna] ON [Usuario].[id] = [ContaInterna].[usuario_id] 
LEFT OUTER JOIN [PessoaFisica] AS [PessoaFisica] ON [Usuario].[id] = [PessoaFisica].[usuario_id] 
LEFT OUTER JOIN [Qualificacao] AS [Qualificacao] ON [Usuario].[id] = [Qualificacao].[usuario_id] 
LEFT OUTER JOIN [Endereco] AS [Endereco] ON [Usuario].[id] = [Endereco].[usuario_id] 
WHERE [Usuario].[id] = N'1'



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

SELECT Usuario.id, Usuario.email, Usuario.senha_hash
FROM Usuario
WHERE Usuario.id = 1003 
GO
/* WHERE Qualificacao.tipo = 'Funcionario' */

SELECT TOP (1000) [id]
      ,[tipo]
      ,[status]
      ,[usuario_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[Qualificacao]


-- Insert rows into table 'Qualificacao' in schema '[dbo]'
INSERT INTO [dbo].[Qualificacao]
( -- Columns to insert data into
 [tipo], [status], [usuario_id], [createdAt], [updatedAt]
)
VALUES
( -- First row: values for the columns in the list above
 'Cliente', 'Inativo', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
)

GO
SELECT usuario_id FROM [dbo].[Qualificacao]
WHERE tipo = 'Funcionario'
GO

-- Delete rows from table '[Qualificacao]' in schema '[dbo]'
DELETE * FROM [dbo].[Qualificacao]
WHERE [Qualificacao].[status] = 'Inativo'
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

  SELECT * FROM [dbo].[Qualificacao]
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

  UPDATE [dbo].[ContaInterna]
  SET [brl_saldo] = 100
  WHERE id = 1
  GO

  UPDATE [dbo].[ContaInterna]
  SET [ativo_brl_saldo] = 0
  WHERE id = 1
  GO


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

-- Update rows in table '[Ativo]' in schema '[dbo]'
UPDATE [dbo].[Ativo]
SET [quantidade_disponivel] = 1000
WHERE id = 1
GO

UPDATE [dbo].[Ativo]
SET [categoria_id] = 1
WHERE id = 
GO

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

/*Cliente Ativo*/

SELECT TOP (1000) [id]
      ,[nome]
      ,[valor]
      ,[quantidade]
      ,[usuario_id]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[ClienteAtivo]

-- Delete rows from table '[ClienteAtivo]' in schema '[dbo]'
DELETE FROM [dbo].[ClienteAtivo]
WHERE id = 11
GO

/* Categoria */

SELECT TOP (1000) [id]
      ,[descricao]
      ,[createdAt]
      ,[updatedAt]
  FROM [sariliodev].[dbo].[Categoria]

UPDATE [dbo].[Categoria]
SET
  [descricao] = 'Cripto Moeda'
WHERE id = 1
GO