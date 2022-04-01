<template>
 <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
    <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col">

            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                
                <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <form @submit.prevent="searchFilter()">
                        <div class="relative flex w-full flex-wrap items-stretch mb-3">
                            <input type="search" placeholder="Searching" v-model="search" class="px-3 py-3 placeholder-slate-300 bg-gray-800 text-slate-600 relative dark:bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
                            <span class="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/>
                                </svg>
                            </span>
                        </div>
                    </form>
                    
                    <div class="overflow-hidden">
                        <div class="card">
                            <div class="card-body">
                                <table class="min-w-full text-center">
                                    <thead class="border-b bg-gray-800">
                                        <tr>
                                            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                                Name
                                                <button><i class=" fa-solid fa-arrow-down-a-z"></i></button>
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                                Gender
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                                Birth
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in getData" :key="index" class="bg-white border-b">
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {{ item.name.first }} {{ item.name.last }}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {{ item.gender}}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {{ formatDate(item.registered.date) }}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <a href="#" class="btn bg-green-800  text-white">Acessar</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="card-footer">
                                <div class="container mt-2 flex justify-left mx-auto">
                                    <ul class="flex">
                                        <li>
                                            <button @click="firstPage" :disabled="loading['firstPage'] === 1" class="h-10 px-5 text-gray-600 bg-white border border-r-0 border-gray-600"> First </button>
                                        </li>
                                        <li>
                                            <button @click="prevPage" :disabled="loading['prevPage'] === 1" class="h-10 px-5 text-gray-600 bg-white border border-r-0 border-gray-600 hover:bg-gray-100">Prev</button>
                                        </li>
                                        <li>
                                            <button @click="nextPage" :disabled="loading['nextPage'] === 1" class="h-10 px-5 text-gray-600 bg-white border border-gray-600 hover:bg-gray-100">Next</button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
 </main>
</template>
<script>
import { onMounted, computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { GET_DATA } from '@/store/mutation-types.js'
export default {
    setup() {
        const store     = useStore();
        const search    = ref('');
        const getData   = computed(() => store.getters.getUsers)
        const loading = reactive({
            nextPage : 0,
            prevPage : 0,
            firstPage: 0,
        })

       function formatDate(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
        }

        function btnRefresh() {
            store.dispatch(GET_DATA).then(() => {
                for (let prop in loading) {
                    loading[prop] = 0
                }
            })
            store.dispatch(GET_DATA, 'results=50')
        }

        function searchFilter() {
            if(!this.search) {
                btnRefresh()
            }
            store.commit('SET_FILTER', this.search)
        }

        function firstPage() {
            this.loading['firstPage'] = 1
            store.commit('FIRST_PAGE')
            this.btnRefresh()
        }

        function prevPage() {
            if (this.getData.from === 1) {
                return
            }
            this.loading['prevPage'] = 1
            store.commit('PREV_PAGE')
            this.btnRefresh()
        }

        function nextPage() {
            if (
                this.getData.to === this.getData.total
            ) {
                return
            }

            this.loading['nextPage'] = 1
            store.commit('NEXT_PAGE')
            this.btnRefresh()
        }

        onMounted(() => {
            btnRefresh()
        })

        return {
            getData,
            search,
            btnRefresh,
            searchFilter,
            loading,
            nextPage,
            prevPage,
            firstPage,
            formatDate
        }
    },
}
</script>