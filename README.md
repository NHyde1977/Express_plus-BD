Exercício 10
Após compreender a diferença entre container e volume, execute:

docker compose down -v
Suba novamente:

docker compose up -d
Verifique o que aconteceu com:

Tabela
Dados
Banco
Explique o resultado.

Ao derrubar o volume (comando incluindo "-v"; docker compose down -v) os dados não persistidos são apagados, e com isso perde-se todos os dados e todas as tabelas criadas e até então salvas em disco.
Os dados persistentes do MySQL estavam armazenados nesse volume, logo todas as tabelas e dados criados anteriormente são apagados. Mas observe que quando roda o docker compose up -d, um novo volume é criado e o banco é criado novamente, mas sem os dados e tabelas que existiam anteriormente por que estes não está no arquivo de configuração (foram criados via comandos de SQL pelo usuário).
