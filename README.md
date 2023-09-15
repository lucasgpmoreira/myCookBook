# Documentação

## `/Receitas`

Métodos referentes à rota de todas as receitas

<details>
<summary><strong><font color="#a6e22e">GET</font></strong></summary>
<br>

Pega todas as receitas cadastradas no banco de dados. Os seguintes dados devem ser retornados: o ID da receita, o título, o ID do autor e o número de likes.

**Exemplo de resposta:**
```json
[
  {
    "idReceita": 1,
    "titulo": "Receita 1",
    "idAutor": 10,
    "numLikes": 5
  },
  {
    "idReceita": 2,
    "titulo": "Receita 2",
    "idAutor": 10,
    "numLikes": 5
  }
]
```
</details>

<details>
<summary><strong><font color="#268bd2">POST</font></strong></summary>
<br>

Adiciona uma nova receita.

**Exemplo de JSON a ser enviado:**
```json
{
  "idReceita": 1,
  "titulo": "titulo da receita",
  "idAutor": 10,
  "numLikes": 5
}
```
</details>


## `/Receita/{id}`

Métodos referentes à rota de uma receita específica

<details>
<summary><strong><font color="#a6e22e">GET</font></strong></summary>
<br>

Obtém os dados de uma receita específica.

**Exemplo de resposta esperada para uma única receita:**
```json
{
  "idReceita": 1,
  "titulo": "titulo da receita",
  "numLikes": 4,
  "idAutor": 5,
  "usuariosQueSalvaramReceita": [
    {"idUsuario": 4,"dataSalvamento": "31/12/2023"},
    {"idUsuario": 5,"dataSalvamento": "31/12/2023"}
  ],
  "versoesReceita": [
    {
      "tituloVersao": "titulo da versao 1",
      "ingredientes": ["array","de","ingredientes"],
      "instrucoes": ["array","de","instrucoes"]
    },
    {
      "tituloVersao": "titulo da versao 2",
      "ingredientes": ["array","de","ingredientes"],
      "instrucoes": ["array","de","instrucoes"]
    }
  ]
}
```
</details>

<details>
<summary><strong><font color="#f0c674">PUT</font></strong></summary>
<br>

Edita uma receita específica.

**Dados a serem enviados:**
```json
{
  "idReceita": 4,
  "novoTitulo": "novo titulo da receita"
}
```
</details>

<details>
<summary><strong><font color="#dc322f">DELETE</font></strong></summary>
<br>

Deleta uma receita pelo seu ID.

**Dados a serem enviados:**
```json
{
  "idReceita": 4
}
```
</details>


## `/Receita/{id}/like`

Métodos referentes à rota de dar like em uma receita específica

<details>
<summary><strong><font color="#268bd2">POST</font></strong></summary>
<br>

Adiciona um novo like a uma receita pelo

seu ID.

**Dados a serem enviados:**
```json
{
  "idReceita": 5
}
```
</details>

<details>
<summary><strong><font color="#dc322f">DELETE</font></strong></summary>
<br>

Remove um like de uma receita pelo seu ID.

**Dados a serem enviados:**
```json
{
  "idReceita": 4
}
```
</details>


## `/Usuario/{id}`

Métodos referentes à rota de um usuário específico

<details>
<summary><strong><font color="#a6e22e">GET</font></strong></summary>
<br>

Obtém as informações de um usuário específico, incluindo os IDs das receitas que o usuário salvou.

**Exemplo de resposta:**
```json
{
  "idUsuario": 5,
  "nomeDeUsuario": "username_unico",
  "email": "email@do.usuario",
  "receitasSalvasPeloUsuario": [1, 2, 3, 4]
}
```
</details>

<details>
<summary><strong><font color="#f0c674">PUT</font></strong></summary>
<br>

Atualiza o nome de usuário de um usuário específico.

**Dados a serem enviados:**
```json
{
  "idUsuario": 5,
  "nomeDeUsuario": "novo_username"
}
```
</details>

<details>
<summary><strong><font color="#dc322f">DELETE</font></strong></summary>
<br>

Exclui o perfil de um usuário específico do banco de dados.

**Dados a serem enviados:**
```json
{
  "idUsuario": 5
}
```
</details>