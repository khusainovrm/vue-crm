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

