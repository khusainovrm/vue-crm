<template>
<div>
  <Loader v-if="loading" />
  <div class="app-main-layout" v-else>

    <Navbar @click="isOpen=!isOpen"/>

    <Sidebar v-model="isOpen" :key="locale"/>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link to="/record" >
        <a class="btn-floating btn-large blue" href="#" v-tooltip="tooltip">
          <i class="large material-icons">add</i>
        </a>
      </router-link>
    </div>

  </div>
</div>
</template>

<script>
import messages from "@/utils/message"
import Navbar from "@/components/app/Navbar.vue"
import Sidebar from "@/components/app/Sidebar.vue"

export default {
  name: "main-layouy",
  data: () => ({
    isOpen: true,
    loading: true,
    tooltip: ''
  }),
  components: {
    Navbar, Sidebar
  },
  async mounted (){
    if (!Object.keys(this.$store.getters.info).length){
      await this.$store.dispatch("fetchInfo")

    this.loading = false
    this.tooltip = this.$store.getters.info.locale === 'ru-RU' ? 'Создать новую запись' : 'Create new record'
    }
  },
  computed : {
    error () {
      return this.$store.getters.error
    },
    locale () {
       return this.$store.getters.info.locale
     }
  },
  watch: {
    error (fbError){
      this.$error(messages[fbError.code] || "Что-то пошло не так...")
    } 
  }
}
</script>

<style>

</style>
