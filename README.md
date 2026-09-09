-- Radar Operacional de Produção --

API REST desenvolvida para gerenciamento e acompanhamento de produções operacionais.

-- Tecnologias --

- Node.js
- Express
- JavaScript
- SQLite
- Better-SQLite3
- Git e GitHub

-- Objetivo --

O sistema permite cadastrar, consultar, atualizar e excluir registros de produção, além de calcular indicadores relacionados ao cumprimento das metas.

-- Funcionalidades --

--  Endpoints da API --

--- Verificar status da API ---

**GET** `/api/status`

Retorna o status atual da aplicação.

Exemplo de resposta:

```json
{
  "status": "online",
  "sistema": "Radar Operacional de Produção"
}

- Consulta de produções

Exemplo de Cadastro (GET):

[
  {
    "id": 1,
    "produto": "Produto A",
    "quantidade": 850,
    "meta": 1000,
    "status": "em_producao",
    "percentualMeta": 85,
    "situacao": "atencao"
  }
]

- Consulta de produção por ID

Exemplo caso o Id não exista:

{
  "erro": "Produção não encontrada"
}

- Cadastro de produção

Exemplo de Requisção (POST):

{
  "produto": "Produto C",
  "quantidade": 500,
  "meta": 800,
  "status": "em_producao"
}

Reposta:

 {
  "id": 3,
  "produto": "Produto C",
  "quantidade": 500,
  "meta": 800,
  "status": "em_producao",
  "percentualMeta": 62.5,
  "situacao": "critica"
}

- Atualização de produção

 Exemplo de Atualização (PUT):
 
 {
  "produto": "Produto A Atualizado",
  "quantidade": 900,
  "meta": 1000,
  "status": "em_producao"
}

- Exclusão de produção

Exemplo de Resposta (Delete):

{
  "mensagem": "Produção excluída com sucesso",
  "producao": {
    "id": 1,
    "produto": "Produto A",
    "quantidade": 900,
    "meta": 1000,
    "status": "em_producao",
    "percentualMeta": 90,
    "situacao": "normal"
  }
}

- Cálculo do percentual da meta

Percentual da meta = (quantidade / meta) × 100


- Classificação da situação da produção

| Percentual      | Situação |
| --------------- | -------- |
| Abaixo de 70%   | crítica  |
| De 70% a 89,99% | atenção  |
| 90% ou mais     | normal   |

- Validação dos dados recebidos

A API valida os seguintes campos:

Produto é obrigatório.
Produto deve ser um texto.
Quantidade é obrigatória.
Quantidade deve ser um número válido.
Quantidade não pode ser negativa.
Meta é obrigatória.
Meta deve ser um número válido.
Meta deve ser maior que zero.
IDs devem ser números inteiros positivos.

- Persistência dos dados em SQLite

### Execução do Projeto: ###

instalar as dependencias:

npm install

## Iniciar o servidor ##

A Api esta disponivel em:

http://localhost:3000

### Testes ##

Os endpoints foram testados utilizando o Tgunder Client no visual studio code

### Bancoo de Dados ###

Realizado com SQLite para permanencia dos dados.
O banco é criado automaticamente durante a inicialização da aplicação.


