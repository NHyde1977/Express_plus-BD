Aula 25/08/2026:

Exercício 1
Teste os cinco endpoints:

POST   /alunos
GET    /alunos
GET    /alunos/:id
PUT    /alunos/:id
DELETE /alunos/:id

R: Tudo funcionando.

Exercício 2
Cadastre três alunos.

Reinicie o servidor Node.js.

Consulte:

GET /alunos
Explique por que os dados continuam existindo.

R:Os dados continuam existindo por que agora estão gravados no mySQL. Reiniciar a aplicação só reinicia o servidor, isso não apaga o banco e os dados gravados nele.

Exercício 3
Pare e remova o container:

docker compose down
Suba novamente:

docker compose up -d
Confira os dados.

Explique o papel do Docker Volume.

R: O comando "docker compose down" sem o "-v" não remove o volume (onde os dados estão gravados), o que preserva os dados salvos. Quando o novo container sobe, ele reutiliza esse volume.

Exercício 4
Tente buscar:

GET /alunos/999
Explique por que o 404 pertence ao Controller e não ao Repository.

R: O Repository apenas consulta os dados e retorna o resultado ou null, ele não tem e nem deve ter acesso as requisições, os resultados e os status HTTP que ficam separados na camada do controller.

Exercício 5
Remova temporariamente:

WHERE id = ?
do DELETE.

Não execute a requisição.

Analise o SQL e explique o problema que isso causaria.

R: Delete sem where ia "destruir" dos dados do banco de dados, mandando-os para SP (saco preto).