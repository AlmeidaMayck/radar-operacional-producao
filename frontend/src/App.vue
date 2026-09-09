<template>
  <div>
    <header class="page-header">
      <h1>Radar Operacional de Produção</h1>

      <p>Sistema de acompanhamento da produção.</p>
    </header>

      <div class="indicadores">
      <div>
        <strong>Total</strong>
        <span>{{ productions.length }}</span>
      </div>

      <div>
        <strong>Normais</strong>
        <span>{{ countBySituation('normal') }}</span>
      </div>

      <div>
        <strong>Atenção</strong>
        <span>{{ countBySituation('atencao') }}</span>
      </div>

      <div>
        <strong>Críticas</strong>
        <span>{{ countBySituation('critica') }}</span>
      </div>
    </div>

    <button @click="loadProductions">
      Atualizar produções
    </button>

    <hr>

    <h2>{{ editingId ? 'Editar produção' : 'Nova produção' }}</h2>

    <form @submit.prevent="saveProduction">
      <div>
        <label>Produto:</label>
        <input v-model="form.produto" type="text">
      </div>

      <div>
        <label>Quantidade:</label>
        <input v-model.number="form.quantidade" type="number">
      </div>

      <div>
        <label>Meta:</label>
        <input v-model.number="form.meta" type="number">
      </div>

      <div>
        <label>Status:</label>
        <input v-model="form.status" type="text">
      </div>

      <button type="submit">
        {{ editingId ? 'Salvar alteração' : 'Cadastrar' }}
      </button>

      <button
        v-if="editingId"
        type="button"
        @click="cancelEdit"
      >
        Cancelar
      </button>
    </form>

    <p v-if="message">
      {{ message }}
    </p>

    <p v-if="error">
      {{ error }}
    </p>

    <hr>

    <h2>Produções</h2>

    <p v-if="productions.length === 0">
      Nenhuma produção encontrada.
    </p>

    <table v-if="productions.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Meta</th>
          <th>Status</th>
          <th>% da Meta</th>
          <th>Situação</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="production in productions"
          :key="production.id"
        >
          <td>{{ production.id }}</td>
          <td>{{ production.produto }}</td>
          <td>{{ production.quantidade }}</td>
          <td>{{ production.meta }}</td>
          <td>{{ production.status }}</td>
          <td>{{ production.percentualMeta }}%</td>
          <td>{{ production.situacao }}</td>

          <td>
            <button @click="editProduction(production)">
              Editar
            </button>

            <button @click="deleteProduction(production.id)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const productions = ref([]);
const loading = ref(false);
const error = ref('');
const countBySituation = (situation) => {
  return productions.value.filter(
    (production) => production.situacao === situation
  ).length;
};
const message = ref('');
const editingId = ref(null);

const form = ref({
  produto: '',
  quantidade: null,
  meta: null,
  status: ''
});

const clearMessages = () => {
  error.value = '';
  message.value = '';
};

const clearForm = () => {
  form.value = {
    produto: '',
    quantidade: null,
    meta: null,
    status: ''
  };

  editingId.value = null;
};

const loadProductions = async () => {
  loading.value = true;
  clearMessages();

  try {
    const response = await fetch(
      'http://localhost:3000/api/production'
    );

    if (!response.ok) {
      throw new Error('Não foi possível carregar as produções.');
    }

    productions.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const saveProduction = async () => {
  clearMessages();

  const url = editingId.value
    ? `http://localhost:3000/api/production/${editingId.value}`
    : 'http://localhost:3000/api/production';

  const method = editingId.value ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.erro || 'Erro ao salvar produção.'
      );
    }

    message.value = editingId.value
      ? 'Produção alterada com sucesso.'
      : 'Produção cadastrada com sucesso.';

    clearForm();

    await loadProductions();
  } catch (err) {
    error.value = err.message;
  }
};

const editProduction = (production) => {
  clearMessages();

  editingId.value = production.id;

  form.value = {
    produto: production.produto,
    quantidade: production.quantidade,
    meta: production.meta,
    status: production.status
  };
};

const cancelEdit = () => {
  clearMessages();
  clearForm();
};

const deleteProduction = async (id) => {
  clearMessages();

  const confirmed = confirm(
    'Deseja realmente excluir esta produção?'
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/production/${id}`,
      {
        method: 'DELETE'
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.erro || 'Erro ao excluir produção.'
      );
    }

    message.value = 'Produção excluída com sucesso.';

    await loadProductions();
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(() => {
  loadProductions();
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background: #f4f6f8;
  color: #222;
}

.page-header {
  margin-bottom: 24px;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

h1 {
  margin: 0;
  color: #000;
  line-height: 1.1;
}

.page-header p {
  margin: 8px 0 0;
  color: #000;
  line-height: 1.4;
}

button {
  padding: 8px 12px;
  margin: 5px 5px 5px 0;
  border: 1px solid #999;
  border-radius: 4px;
  background: rgb(10, 8, 8);
  color: #fff;
  cursor: pointer;
}

button:hover {
  background: #2c2626;
}

form {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  max-width: 500px;
}

form div {
  margin-bottom: 12px;
}

label {
  display: inline-block;
  width: 100px;
  color: #000;
}

input {
  padding: 7px;
  border: 1px solid #aaa;
  border-radius: 4px;
  color: #000;
  background: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #eee;
  color: #000;
}

td {
  color: #000;
}

hr {
  margin: 25px 0;
}

.indicadores {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 15px;
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

.indicadores div {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px 25px;
  min-width: 0;
  text-align: center;
  box-sizing: border-box;
}

.indicadores strong {
  display: block;
  margin-bottom: 8px;
}

.indicadores span {
  font-size: 24px;
  font-weight: bold;
}

@media (max-width: 700px) {
  .indicadores {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>