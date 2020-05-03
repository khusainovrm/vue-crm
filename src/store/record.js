import firebase from "firebase/app";

export default {
  actions: {
    async createRecord ({commit, dispatch}, {categoryId, type, amount, description, date}) {
      try {
        const uid = await dispatch("getUid")
        await firebase.database().ref(`users/${uid}/ categories/record`).set()
      } catch (e) {
        commit("setError", e)
        throw e
      }
    }

  }
}
