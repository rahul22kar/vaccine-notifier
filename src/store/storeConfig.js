import axios from 'axios'
const NotiSound = new Audio(require('../assets/music/noti.wav'))

export default {
  state () {
    return {
      responseData: [],
      filteredData: [],
      filters: {
        vaccine: '',
        feeType: '',
        dose1: false,
        dose2: false
      },
      loading: false,
      sound: false
    }
  },
  getters: {
    getFilteredData (state) {
      return state.filteredData
    },
    filterResponse (state) {
      let isVaccine = true
      let isFeeType = true
      let isDose1 = true
      let isDose2 = true
      const filteredArray = state.responseData.filter((center) => {
        if (state.filters.vaccine) {
          isVaccine = state.filters.vaccine === center.vaccine
        }
        if (state.filters.feeType) {
          isFeeType = state.filters.feeType === center.fee_type
        }
        if (state.filters.dose1) {
          isDose1 = center.available_capacity_dose1 > 0
        }
        if (state.filters.dose2) {
          isDose2 = center.available_capacity_dose2 > 0
        }
        return isVaccine && isFeeType && isDose1 && isDose2
      })
      if (filteredArray.length > 0 && state.sound) {
        NotiSound.currentTime = 0
        NotiSound.play()
      }
      return filteredArray
    }
  },
  mutations: {
    setFilteredData (state, data) {
      state.filteredData = data
    },
    setFilterData (state, data) {
      state.filters[data.key] = data.value
    },
    setResponseData (state, data) {
      state.responseData = data
    },
    toggleLoading (state) {
      state.loading = !state.loading
    },
    toggleSound (state) {
      state.sound = !state.sound
    }
  },
  actions: {
    changeFilter ({ commit, dispatch, state }, data) {
      commit('setFilterData', data)
      dispatch('getFilteredData', state.responseData)
    },
    getFilteredData ({ commit, getters }, responseData) {
      commit('setResponseData', responseData)
      const data = getters.filterResponse
      commit('setFilteredData', data)
    },
    async getDataByDistrict ({ commit, dispatch }, data) {
      commit('toggleLoading')
      const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${data.district_id}&date=${data.date}`)
      dispatch('getFilteredData', response.data.sessions)
      commit('toggleLoading')
    },
    async getDataByPincode ({ commit, dispatch }, data) {
      commit('toggleLoading')
      const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${data.pincode}&date=${data.date}`)
      dispatch('getFilteredData', response.data.sessions)
      commit('toggleLoading')
    }
  }
}
