import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
let state = {
  test: '骨架屏',
  goodType: [],
  buyGoods: {}
}
export default new Vuex.Store({
  state: state,
  mutations: {
    changeTest: (state, paylod) => {
      state.test = paylod
    },
    add (state, typeId) {
      state.goodType.map(item => {
        if (item.typeId === typeId) {
          item.count += 1
          return false
        }
      })
    },
    reduce (state, typeId) {
      state.goodType.map(item => {
        if (item.typeId === typeId) {
          item.count--
          return false
        }
      })
    },
    saveGoodType (state, paylod) {
      state.goodType = paylod
    },
    addBuyList (state, paylod) {
      Vue.set(state.buyGoods, paylod.id, paylod)
    },
    reduceBuyList (state, payload) {
      Vue.set(state.buyGoods, payload.id, payload)
    }
  },
  actions: {
    changeTest ({ commit }, payload) {
      commit('changeTest', payload)
    },
    add (context, typeId) {
      context.commit('add', typeId)
    },
    saveGoodType (context, payload) {
      context.commit('saveGoodType', payload)
    },
    addBuyList ({ commit }, payload) {
      commit('addBuyList', payload)
    },
    reduce ({ commit }, typeId) {
      commit('reduce', typeId)
    },
    reduceBuyList ({ commit }, payload) {
      commit('reduceBuyList', payload)
    }
  }
})
