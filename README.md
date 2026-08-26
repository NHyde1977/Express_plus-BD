## Incrementos adicionais

Após a implementação do CRUD utilizando a arquitetura em camadas, foram realizados dois incrementos adicionais no projeto.

### 1. Camada Service e regras de negócio para CPF

Foi adicionada a camada `Service`, alterando a arquitetura para:

Route → Controller → Service → Repository → MySQL

A camada `Service` passou a concentrar as regras de negócio da aplicação.

Também foi adicionado o campo `cpf` ao cadastro de alunos, com as seguintes regras:

- nome, curso e CPF são obrigatórios;
- CPF deve possuir exatamente 11 dígitos;
- CPF deve ser único;
- durante uma atualização, o aluno pode manter o próprio CPF.

A tabela `alunos` também passou a utilizar a restrição `UNIQUE` para o campo CPF, reforçando a integridade dos dados no banco.

### 2. Busca de alunos por nome e curso

Foi implementada a possibilidade de filtrar a listagem de alunos utilizando parâmetros de consulta (`query parameters`).

Exemplos:

GET /alunos?nome=Maria

GET /alunos?curso=ADS

GET /alunos?nome=Maria&curso=ADS

Quando nenhum parâmetro é informado, `GET /alunos` continua retornando todos os alunos.

A busca utiliza `LIKE` no Repository e parâmetros preparados, permitindo pesquisas parciais sem interpolar diretamente os valores recebidos na instrução SQL.