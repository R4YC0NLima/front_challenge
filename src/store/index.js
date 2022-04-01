import { createStore } from 'vuex'
import axios from 'axios'
// const endpoint = "https://randomuser.me/api/1.3/?nat=us"
import { 
    GET_DATA, 
    SET_FILTER,
    NEXT_PAGE,
    PREV_PAGE,
    FIRST_PAGE,
    LOADING,
    ERROR,
    SUCCESS 
} from './mutation-types'

export default createStore({
    namespaced: true,
    state: {
        pacients: {},
        filter: {
            page: 1
        },
        status: ''
    },
    getters: {
        getUsers   : (state) => state.pacients,
        getLoading : (state) => state.loading
    },

    mutations: {
        
        [GET_DATA]: (state, peoples) => {
            state.pacients = peoples;
        },
        
        [SET_FILTER]: (state, payload) => {
           state.pacients = state.pacients.filter((user) => {
                return (
                    user.name.first === payload ||
                    user.name.last  === payload ||
                    user.gender     === payload
                )
           })
        },

        [SUCCESS]: (state, resp) => {
            state.pacients  = resp.data
            state.status    = 'success'
        },
        [ERROR]: state => {
            state.status = 'error'
        },

        [NEXT_PAGE]: state => {
            state.filter.page += 1
        },

        [PREV_PAGE]: state => {
            state.filter.page -= 1
        },

        [FIRST_PAGE]: state => {
            state.filter.page === 1
        },

        [LOADING]: (state, payload) => {
            state.loading = payload.newValue
        }
    },
    actions: {


        [GET_DATA]: async ({ commit }, payload ) => {
            const response  = await axios.get(`?nat=us&${payload}`)
            const pacients  = await response.data
            commit(GET_DATA, pacients.results)
        },
        [NEXT_PAGE]: ({ commit }) => {
            commit(NEXT_PAGE)
        },
        [PREV_PAGE]: ({ commit }) => {
            commit(PREV_PAGE)
        },
        [FIRST_PAGE]: ({ commit }) => {
            commit(FIRST_PAGE)
        },
    },
})