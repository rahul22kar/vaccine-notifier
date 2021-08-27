<template>
  <div class="filters container">
    <div class="row justify-content-start align-items-center">
      <div class="input-group">
        <label for="vaccine">Vaccine</label>
        <select @input="filterByVaccine" name="vaccine" id="vaccine">
          <option value="" selected>Any</option>
          <option value="COVAXIN">Covaxin</option>
          <option value="COVISHIELD">Covishield</option>
          <option value="SPUTNIK V">Sputnik</option>
        </select>
      </div>
      <div class="input-group">
        <label for="fee-type">Fee type</label>
        <select @input="filterByfeeType" name="fee-type" id="fee-type">
          <option value="" selected>Any</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
      <div class="input-group">
        <input @input="filterByDose1" type="checkbox" id="dose1" class="checkbox">
        <label for="dose1">Dose 1</label>
      </div>
      <div class="input-group">
        <input @input="filterByDose2" type="checkbox" id="dose2" class="checkbox">
        <label for="dose2">Dose 2</label>
      </div>
      <div class="input-group">
        <input @input="soundCheck" type="checkbox" id="sound" class="checkbox">
        <label for="sound">Play sound when vaccine is available</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  methods: {
    filterByVaccine: function (event) {
      this.$store.dispatch('changeFilter', {
        key: 'vaccine',
        value: event.target.value
      })
    },
    filterByfeeType: function (event) {
      this.$store.dispatch('changeFilter', {
        key: 'feeType',
        value: event.target.value
      })
    },
    filterByDose1: function () {
      this.$store.dispatch('changeFilter', {
        key: 'dose1',
        value: !this.Dose_1
      })
    },
    filterByDose2: function () {
      this.$store.dispatch('changeFilter', {
        key: 'dose2',
        value: !this.Dose_2
      })
    },
    soundCheck: function () {
      this.$store.commit('toggleSound')
    }
  },
  computed: {
    Dose_1 () {
      return this.$store.state.filters.dose1
    },
    Dose_2 () {
      return this.$store.state.filters.dose2
    }
  }
}
</script>

<style lang="scss" scoped>

.filters {
  position: sticky;
  top: 0;
  background: white;
}

label {
  font-size: 1.2em;
}

@media (max-width: 880px) {
  .filters {
    position: static;
  }
}

</style>
