<template>
  <Header />
  <InputForm />
  <Filters />
  <Table :headers="headers" :data="this.$store.getters.getFilteredData" />
</template>

<script>
import Header from './components/Header.vue'
import InputForm from './components/InputForm.vue'
import Filters from './components/Filters.vue'
import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    InputForm,
    Filters,
    Table,
    Header
  },
  data () {
    return {
      headers: [
        {
          key: 'name',
          name: 'Name'
        },
        {
          key: 'address',
          name: 'Address'
        },
        {
          key: 'vaccine',
          name: 'Vaccine'
        },
        {
          key: 'fee_type',
          name: 'Type'
        },
        {
          key: 'available_capacity_dose1',
          name: 'Dose 1'
        },
        {
          key: 'available_capacity_dose2',
          name: 'Dose 2'
        }
      ]
    }
  }
}
</script>

<style lang="scss">

  @import './assets/styles/styles.scss'

</style>
