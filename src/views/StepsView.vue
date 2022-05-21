<template>
  <v-container>
    <template>
      <v-container>
        <v-row>
          <v-col cols="12" style="text-align: center">
            <v-dialog
                v-model="stepDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn depressed outlined @click="stepDialog = true">New step</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Create step</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            label="Step text*"
                            v-model="newStepText"
                            required

                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                      >
                        <v-select
                            :items="events"
                            multiple
                            return-object
                            item-text="text"
                            v-model="newStepEvents"
                            label="Buttons"
                            small-chips
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="stepDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="createStep"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-expansion-panels multiple elevation="22"  v-model="openedSteps">

              <v-expansion-panel v-for="(step,i) in steps"
                                 readonly
                                 :key="step.id" :class="'mt-1 elevation-'+getElevation(step.id)">
                <v-expansion-panel-header >


                  <v-row no-gutters align="center"
                         justify="center">
                    <v-col cols="6" :class="'text-subtitle-1 ' + getClass(step.id)">
                      {{ step.text | str_limit(12) }}
                    </v-col>
                    <v-col
                        style="text-align: right"
                        cols="3"
                        class="text--secondary;"
                    >

                      <v-btn v-if="fromStep === step.id"

                          icon
                          color="info"
                          @click="getSteps"
                      >
                        <v-icon>mdi-transit-connection-variant</v-icon>
                      </v-btn>
                      <v-btn v-else

                             icon
                             color="info"
                             @click="getConnectedSteps(step.id)"
                      >
                        <v-icon>mdi-transit-connection-variant</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="3"
                           style="text-align: right"
                           class="text--secondary;">
                      <v-btn
                          class="mr-5"
                          icon
                          color="info"
                          @click="openTransitionDialog(step)"
                      >
                        <v-icon >mdi-link-variant-plus</v-icon>
                      </v-btn>
                    </v-col>

                  </v-row>
                  <template v-slot:actions>
                    <v-icon color="primary" @click="openOrCloseStep(i)">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-textarea
                          auto-grow
                          outlined
                          row-height="15"
                          clearable
                          clear-icon="mdi-close-circle"
                          label="test"
                          v-model="step.text"
                      >

                      </v-textarea>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                          outlined
                          return-object
                          item-text="text"
                          v-model="step.events"
                          :items="events"
                          hint="Maximum of 5 tags"
                          label="Add some tags"
                          multiple
                          persistent-hint
                          small-chips
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-card-actions>
                        <v-btn
                            icon>
                          <v-icon>mdi-delete-empty</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            icon
                            color="info">
                          <v-icon>mdi-file-undo-outline</v-icon>
                        </v-btn>
                        <v-btn
                            icon
                            color="green"
                            @click="saveStep(step)"
                        >
                          <v-icon>mdi-content-save-check</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-dialog
            v-model="transitionDialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Create transition</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-select
                        :items="steps"
                        return-object
                        item-text="text"
                        v-model="newFromStep"
                        label="From step"
                    ></v-select>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-select
                        :items="steps"
                        return-object
                        item-text="text"
                        v-model="newToStep"
                        label="To step"
                    ></v-select>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-select
                        :items="eventTypes"
                        multiple
                        item-text="name"
                        return-object
                        v-model="newEventTypes"
                        label="Event type"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="transitionDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="createTransition"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </template>
  </v-container>
</template>

<script>
export default {
  name: 'EventView',
  methods: {
    getTelegram() {
      this.window.Telegram.WebApp.sendData(this.window.Telegram.WebApp.initDataUnsafe.query_id)
      //this.data = this.window.Telegram.WebApp.initDataUnsafe.query_id

    },
    openTransitionDialog(step){
      this.newFromStep = step
      this.transitionDialog = true
    },
    getClass(stepId){
      if (this.fromStep === stepId){
        return 'info--text'
      } else return ''
    },
    getElevation(stepId){
      if (this.fromStep === null){
        return '3'
      }
      if (this.fromStep === stepId){
        return '3'
      } else return '10'
    },
    openOrCloseStep(stepId){
      let index = this.openedSteps.find(it=>it===stepId)
      if (index !== undefined){
        this.openedSteps = this.openedSteps.filter(step=>step !== stepId)
      } else {
        this.openedSteps.push(stepId)
      }

    },
    saveStep(step){
      console.log(step)
      this.$axios.post("/api/step/edit",{
        stepId: step.id,
        text: step.text,
        eventIds: step.events.map(it=>it.id)
      })
    },
    createTransition(){
      this.$axios.post("/api/transition/create",{
        fromStep: this.newFromStep.id,
        toStep: this.newToStep.id,
        stateMachineId: this.$route.params.stateMachineId,
        eventTypeIds: this.newEventTypes.map(it=>it.id)
      }).then(res => {
        this.getSteps()
        this.transitionDialog = false
        this.newFromStep = null
        this.newToStep = null
        this.newEventTypes = []
      })
    },
    createStep(){
      console.log("create step")
      this.$axios.post("/api/step/create",{
        text: this.newStepText,
        eventIds: this.newStepEvents.map(it=>it.id),
        stateMachineId: this.$route.params.stateMachineId
      }).then(res => {
        this.getSteps()
        this.stepDialog = false
        this.newStepEvents = []
        this.stepDialog = ""
      })
    },
    getConnectedSteps(stepId){
      this.fromStep = stepId
      this.$axios.get("/api/step/get/connected",{
        params: {
          stepId: stepId
        }
      }).then(res => {
        this.steps = res.data
      })
    },
    getEvents(){
      this.$axios.get("/api/eventtype/get",{
        params: {
          stateMachineId: this.$route.params.stateMachineId
        }
      }).then(res => {
        this.eventTypes = res.data
        this.events = res.data.flatMap(it=>it.events)
      })
    },
    getSteps(){
      console.log(this.$route.params)
      this.$axios.get("/api/step/get",{
        params: {
          stateMachineId: this.$route.params.stateMachineId
        }
      }).then(res => {
        this.steps = res.data
        this.fromStep = null
      })
    }
  },

  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop())
      }
    },
  },
  data: () => ({
    data: null,
    newFromStep: null,
    newToStep: null,
    newEventTypes: [],
    newStepText: "",
    newStepEvents: [],
    stepDialog: false,
    transitionDialog: false,
    items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
    model: ['Vuetify'],
    events: [],
    eventTypes: [],
    openedSteps:[],
    fromStep: null,
    search: null,
    steps: [],
    trip: {
      name: '',
      location: null,
      start: null,
      end: null,
    },
    locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
  }),
  created() {
    this.getSteps()
    this.getEvents()
  }
}
</script>