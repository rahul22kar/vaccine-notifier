<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        <button @click="changeSearchType" value="pincode" class="toggleButton" :class="{ activeToggle : searchType === 'pincode'}" >Search by Pincode</button>
      </div>
      <div class="col">
        <button @click="changeSearchType" value="district" class="toggleButton" :class="{ activeToggle : searchType === 'district'}" >Search by District</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-if="searchType === 'pincode'">
        <div class="input-group row">
          <input v-model="pincode" type="number" name="pincode" id="pincode" pattern="[0-9]{6}" placeholder="Enter Pincode" />
        </div>
      </div>
      <div v-else class="row justify-content-center">
        <div class="input-group col">
          <select @input="getDistrict" name="state" id="state-select" required>
            <option value="" disabled hidden selected>Select state</option>
            <option :value="state.state_id" :key="state.state_id" v-for="state in stateList">{{ state.state_name }}</option>
          </select>
        </div>
        <div class="input-group col select-wrapper">
          <select @input="setDistrict" name="district" id="district-select" required>
            <option value="" disabled hidden selected>Select district</option>
            <option :value="district.district_id" :key="district.district_id" v-for="district in districtList">{{ district.district_name }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <div class="input-group">
          <input @input="setDate" type="date" name="date" id="date-select" v-model="inputDate">
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <button @click="getData" class="button-primary">
        Search
      </button>
      <div v-if="interval">
        <button @click="stopData" class="button-primary">
          Stop search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  props: {},
  data () {
    return {
      pincode: '',
      stateList: [],
      districtList: [],
      date: '',
      inputDate: '',
      searchType: 'pincode',
      interval: undefined
    }
  },
  mounted () {
    this.axios
      .get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
      .then((response) => {
        this.stateList = response.data.states
      })
      .catch((err) => {
        console.log(err)
      })
    this.setDate()
  },
  methods: {
    setDate: function (event) {
      const rawDate = new Date(event ? event.target.value : Date.now())
      this.inputDate = `${rawDate.getFullYear()}-${('0' + (rawDate.getMonth() + 1)).slice(-2)}-${('0' + rawDate.getDate()).slice(-2)}`
      this.date = `${('0' + rawDate.getDate()).slice(-2)}-${('0' + (rawDate.getMonth() + 1)).slice(-2)}-${rawDate.getFullYear()}`
    },
    setDistrict: function (event) {
      this.district_id = event.target.value
    },
    stopData: function () {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = undefined
      }
    },
    getData: function (event) {
      event.preventDefault()
      if (this.interval) { clearInterval(this.interval) }
      if (this.searchType === 'pincode') {
        this.getDataByPincode()
        this.interval = setInterval(
          this.getDataByPincode,
          10000
        )
      } else {
        this.getDataByDistrict()
        this.interval = setInterval(
          this.getDataByDistrict,
          10000
        )
      }
    },
    getDataByDistrict: function () {
      this.$store.dispatch('getDataByDistrict', {
        district_id: this.district_id,
        date: this.date
      })
    },
    getDataByPincode: function () {
      this.$store.dispatch('getDataByPincode', {
        pincode: this.pincode,
        date: this.date
      })
    },
    getDistrict: function (event) {
      this.axios
        .get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${event.target.value}`)
        .then((response) => {
          this.districtList = response.data.districts
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeSearchType: function (event) {
      this.searchType = event.target.value
    }
  }
}
</script>

<style scoped lang="scss">
</style>
