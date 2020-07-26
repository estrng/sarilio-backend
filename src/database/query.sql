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

  SELECT cpf  FROM PessoaFisica WHERE usuario_id = 2