import { createStore } from 'vuex'

export default createStore({
  state: {
    contador: 50,
  },
  getters: {
  },
  mutations: {
    incrementar( state, payload ){
      state.contador = state.contador + payload
    },
    reducir( state, payload ){
      state.contador = state.contador - payload
    }
  },
  actions: {
    suma( { commit }, numero ){
      commit( 'incrementar', numero )
    },
    resta( { commit }, numero ){
      commit( 'reducir', numero )
    },
    accionButton( { commit }, object ){
      if(object.estado){
        commit('incrementar', object.numero)
      } else {
        commit('reducir', object.numero)
      }
    }
  },
  modules: {
  }
})
