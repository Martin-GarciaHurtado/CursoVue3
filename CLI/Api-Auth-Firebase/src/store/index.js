import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
    user: null,
    error: { tipo: null, mensaje: null }
  },
  mutations: {
    setError( state, payload ){
      if( payload === null ){
        return state.error = { tipo: null, mensaje: null }
      }
      if( payload === "EMAIL_NOT_FOUND" ){
        return state.error = { tipo: 'email', mensaje: 'Correo electrónico no registrado.' }
      }
      if( payload === "INVALID_PASSWORD" ){
        return state.error = { tipo: 'password', mensaje: 'Contraseña incorrecta.' }
      }
      if( payload === "EMAIL_EXISTS" ){
        return state.error = { tipo: 'email', mensaje: 'El correo electrónico ya existe.' }
      }
      if( payload === "INVALID_EMAIL" ){
        return state.error = { tipo: 'email', mensaje: 'Formato incorrecto de correo electronico.' }
      }
    },
    setUser(state, payload) {
      state.user = payload
    },
    cargar(state, payload) {
      state.tareas = payload
    },
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    tarea(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    }
  },
  actions: {
    cerrarSesion({ commit }) {
      commit('setUser', null)
      router.push('/ingreso')
      localStorage.removeItem('usuario')
    },
    async ingresoUsuario({ commit }, usuario) {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxIUb1wy5hE8qPWWAeHZkzrpPSHFcEjsE', {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if (userDB.error) {
          console.log(userDB.error)
          return commit( 'setError', userDB.error.message )
        }
        commit('setUser', userDB)
        commit( 'setError', null )
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },
    async registrarUsuario({ commit }, usuario) {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxIUb1wy5hE8qPWWAeHZkzrpPSHFcEjsE', {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })
        if (userDB.error) {
          console.log(userDB.error)
          return commit( 'setError', userDB.error.message )
        }
        commit('setUser', userDB)
        commit( 'setError', null )
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },
    async cargarLocalStorage({ commit, state }) {
      if (localStorage.getItem('usuario')) {
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      } else {
        return commit('setUser', null)
      }
      try {
        const res = await fetch(`https://udemy-api-eddd3-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await res.json()
        const arrayTareas = []
        for (let id in dataDB){
          arrayTareas.push(dataDB[id])
        }
        commit('cargar', arrayTareas)

      } catch (error) {
        console.log(error)
      }
    },
    async setTareas({ commit, state }, tarea) {
      try {
        const res = await fetch(`https://udemy-api-eddd3-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })

        const dataDB = await res.json()
        console.log(dataDB)
      } catch (error) {
        console.log(error)
      }
      commit('set', tarea)
    },
    async deleteTareas({ commit, state }, id) {
      try {
        await fetch(`https://udemy-api-eddd3-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE',
        })
        commit('eliminar', id)
      } catch (error) {
        console.log(error)
      }
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
    async updateTarea({ commit, state }, tarea) {
      try {
        const res = await fetch(`https://udemy-api-eddd3-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        commit('update', dataDB)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user
    }
  },
  modules: {
  }
})
