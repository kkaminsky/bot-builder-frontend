<template>
  <v-app id="app">

    <v-app-bar
        absolute
        dense
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Dialog 1</v-toolbar-title>

    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        style="text-align: left"
        absolute
        temporary
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Sandra Adams
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn outlined>
            New dialog
          </v-btn>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list
          nav
          dense
      >
        <v-list-item>
          Available machines
        </v-list-item>
        <v-list-item link v-for="n in 4" :key="n">
          <v-list-item-icon class="mr-4">
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>State machine {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>


        <v-row class="mt-10" v-if="loading">
          <v-progress-linear

              indeterminate
              color="info"
          ></v-progress-linear>
        </v-row>


        <v-row justify="space-around" v-if="loading"
               align="center" class="mt-5">

          <v-chip-group
              active-class="info--text"
              mandatory
          >
            <v-chip @click="$router.push({name:'steps', params: {stateMachineId: selectedStateMachine.id}})">Steps</v-chip>
            <v-chip @click="$router.push({name:'transitions', params: {stateMachineId: selectedStateMachine.id}})">Transitions</v-chip>
            <v-chip @click="$router.push({name:'events', params: {stateMachineId: selectedStateMachine.id}})">Events</v-chip>
          </v-chip-group>
        </v-row>
        <v-row justify="space-around" v-else
               align="center" class="mt-15">

          <v-chip-group
              active-class="info--text"
              mandatory
          >
            <v-chip @click="$router.push({name:'steps', params: {stateMachineId: selectedStateMachine.id}})">Steps</v-chip>
            <v-chip @click="$router.push({name:'transitions', params: {stateMachineId: selectedStateMachine.id}})">Transitions</v-chip>
            <v-chip @click="$router.push({name:'events', params: {stateMachineId: selectedStateMachine.id}})">Events</v-chip>
          </v-chip-group>
        </v-row>
      </v-container>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    telegramReady: false,
    checkingInterval: null,
    loading: true,
    mainBgColor: "",
    drawer: false,
    group: null,
    user: null,
    tel: null,
    telegramUserId: "-",
    stateMachines: [],
    selectedStateMachine: {}
  }),
  watch: {
    telegramReady: function (data) {
      if (data) {
        clearInterval(this.checkingInterval)
        this.mainBgColor = "background-color: " + this.window.Telegram.WebApp.themeParams.bg_color
        this.window.Telegram.WebApp.expand()
        this.tel =  this.window.Telegram
        /*this.tel.WebApp.MainButton.show()
        this.tel.WebApp.onEvent('mainButtonClicked', this.tel.WebApp.sendData("Hello from web"))*/
        this.telegramUserId =  this.tel.WebApp.initDataUnsafe.user.id
        this.getUser()
      }
    }
  },
  methods: {
    closeApp(){
      this.tel.WebApp.sendData("Hello from web")
    },
    getUser() {
      this.$axios.get("api/user/get/telegramId", {
        params: {
          telegramId: this.telegramUserId
        }
      }).then(res=>{
        this.user = res.data
        this.getUserStateMachines()
      }, error => {
        this.initUser()
      })
    },
    getUserStateMachines(){
      this.$axios.get("api/statemachine/get",{
        params: {
          userId: this.user.id
        }
      }).then(res=>{
        this.stateMachines = res.data
        this.selectedStateMachine = res.data[0]
        /*this.window.Telegram.WebApp.MainButton.show()
        this.closeApp()*/
        this.loading = false
        this.$router.push({name:'steps', params: {stateMachineId: this.selectedStateMachine.id}})
      })
    },
    initUser(){
      this.$axios.post("api/user/init", {
        telegramId: this.telegramUserId,
        username: this.user
      }).then(res=>{
        this.user = res.data
        this.getUserStateMachines()
      })
    }
  },
  created() {
    let localThis = this
    this.checkingInterval = setInterval(function () {
      console.log("check")
      if (window.Telegram) {
        if(this.tel != null){}
        localThis.telegramReady = true
        /*localThis.telegramUserId = this.tel.WebApp.initDataUnsafe.user.id
        localThis.getUser()*/
      }
    }, 100)
  },
  mounted() {
    let Script = document.createElement("script");
    Script.setAttribute("src", "https://telegram.org/js/telegram-web-app.js");
    document.head.appendChild(Script);
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
