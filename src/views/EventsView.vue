<template>
  <v-container>
    <template>
      <v-container>
        <v-row>
          <v-col cols="12" style="text-align: center">
            <v-btn depressed outlined @click="createEventTypeDialog = true">New event</v-btn>
          </v-col>
        </v-row>
        <v-dialog
            v-model="createEventTypeDialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Create event type</span>
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
                        label="Event type name*"
                        v-model="newEventTypeName"
                        required

                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-combobox
                        multiple
                        return-object
                        item-text="text"
                        v-model="newEvents"
                        label="Buttons"
                        small-chips
                    ></v-combobox>
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
                  @click="createEventTypeDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="createEventType"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row>
          <v-col cols="12"  >
            <v-card v-for="eventType in eventTypes"
                    :key="eventType.id" class="elevation-5 mt-3">
              <div>
                <v-card-subtitle
                    class="text-subtitle-1"
                    v-text="'Event ' + eventType.name"
                ></v-card-subtitle>
                <v-card-text>
                  <v-row align="center"
                         justify="center" no-gutters>
                    <v-col cols="12" >
                      <v-combobox outlined
                                  hide-selected
                                  readonly
                                  multiple
                                  small-chips
                                  item-text="text"
                                  v-model="eventType.events"
                                  hint="Maximum of 5 tags"
                                  label="Buttons">

                      </v-combobox>

                    </v-col>
                    <v-col cols="12">
                      <v-card-actions>
                        <v-btn
                            color="info"
                            icon>
                          <v-icon>mdi-delete-empty</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-col>
                  </v-row >
                </v-card-text>
              </div>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "EventsView",
  created() {
    this.getEvents()
  },
  methods: {
    getEvents(){
      this.$axios.get("/api/eventtype/get",{
        params: {
          stateMachineId: this.$route.params.stateMachineId
        }
      }).then(res => {
        this.eventTypes = res.data
      })
    },
    createEventType(){
      this.$axios.post("/api/eventtype/create",{
        name: this.newEventTypeName,
        stateMachineId: this.$route.params.stateMachineId,
        eventTexts: this.newEvents,
      }).then(res => {
        this.getEvents()
        this.createEventTypeDialog = false
        this.newEventTypeName = ""
        this.newEvents = []
      })
    }
  },
  data: () => ({
    eventTypes: [],
    createEventTypeDialog: false,
    newEventTypeName: "",
    newEvents: []
  })
}
</script>

<style scoped>

</style>