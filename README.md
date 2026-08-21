Aula 21/08/2026:

instalar o mysql2;
utilizar a Promise API do MySQL2;
criar um pool de conexões;
utilizar variáveis de ambiente;
utilizar process.env;
proteger o .env;
criar um .env.example;
testar a comunicação com o banco;
separar configuração da aplicação e inicialização do servidor;
compreender a diferença entre localhost e o nome de serviço do Docker.

--
Exercício 1
Altere temporariamente a senha do banco no .env.

Observe o erro retornado. Depois restaure a senha correta.

R: Mensagem do terminal: Restarting 'src/server.js' Não foi possível conectar ao banco de dados Access denied for user 'api_user'@'172.18.0.1' (using password: YES) Failed running 'src/server.js'. Waiting for file changes before restarting...
Restaurando a senha, e usando o npm run dev funcionou tudo certinho.

Exercício 2
Altere o nome do banco e observe o comportamento.

R: Mensagem do terminal: Não foi possível conectar ao banco de dados
Access denied for user 'api_user'@'%' to database 'api_resthdhh'

Exercício 3
Utilizando o pool, execute temporariamente no server.js:

const [rows] = await pool.query('SELECT * FROM alunos')

console.log(rows)
Confira os registros no terminal.

Depois remova esse código.

A consulta não deverá permanecer no server.js, pois consultas relacionadas a alunos terão uma camada específica no próximo tutorial.

R: retornou [], pois a tabela existe, mas está vazia:
Restarting 'src/server.js' [] Conexão com o MySQL estabelecida Servidor rodando em http://localhost:3000
Sem a linha: "const [rows] = await pool.query('SELECT * FROM alunos')", server.js volta só a inicializar a aplicação e validar a conexão com o banco, sem carregar consultas específicas.