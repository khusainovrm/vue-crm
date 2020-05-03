import firebase from 'firebase/app'

export default {
  actions: {
   async fetchInfo ({commit, dispatch}) {
     try {
      const uid = await dispatch("getUid") 
      const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val()
      commit("setInfo", info)
     // eslint-disable-next-line no-empty
     } catch (e) {
       commit("setError", e)
       throw e
     }

    },

    async updateInfo ({commit, dispatch, getters}, toUpdate) {
     try {
       const uid = await dispatch("getUid")
       const updateData = {...getters.info, ...toUpdate}
       await firebase.database().ref(`users/${uid}/info`).update(updateData)
       commit('setInfo', updateData)
     } catch (e) {
       commit("setError", e)
       throw e
     }
    }
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  state: {
    info: {}
  },
  getters: {
    info: s => s.info
  }
}

