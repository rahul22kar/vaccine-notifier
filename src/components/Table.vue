<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th :key="header.key" v-for="header in headers">{{ header.name }}</th>
        </tr>
      </thead>
      <tr :key="item.key" v-for="item in data">
        <td :key="header.key" :data-label="header.name" v-for="header in headers">{{ item[header.key] }}</td>
      </tr>
    </table>
    <div v-if="this.$store.state.loading" class="loader">
      Loading..
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    headers: Array,
    data: Array
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
  thead {
    th {
      position: sticky;
      top: 4em;
      background: #dddddd;
      padding: 0.8em;
      text-align: left;
    }
  }
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 0.8em;
}

@media (max-width: 880px) {

  table, tr, td {
    display: block;
  }

  thead {
    display: none;
  }

  tr {
    border: 1px solid;
    margin: 1rem 0 1rem 0;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    white-space: normal;
    text-align:left;
  }
  td:before {
    content: attr(data-label);
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align:left;
    font-weight: bold;
  }
}
</style>
