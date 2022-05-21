<template>
  <v-container>
    <template>
      <v-container>
        <v-row>
          <v-col cols="12" style="text-align: center">
            <v-btn depressed outlined>New transition</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card v-for="n in 4"
                    :key="n" class="elevation-3 mt-3">
              <div>
                <v-card-subtitle
                    class="text-subtitle-1"
                    v-text="'Transition ' + n"
                ></v-card-subtitle>
                <v-card-text>
                  <v-row align="center"
                         justify="center" no-gutters>
                    <v-col cols="12">
                      <v-combobox outlined hide-selected
                                  hint="Maximum of 5 tags"
                                  label="Add some tags">

                      </v-combobox>
                    </v-col>
                    <v-col cols="12">
                      <v-combobox outlined hide-selected
                                  hint="Maximum of 5 tags"
                                  label="Add some tags">

                      </v-combobox>
                    </v-col>
                    <v-col cols="12">
                      <v-combobox outlined hide-selected
                                  hint="Maximum of 5 tags"
                                  label="Add some tags">

                      </v-combobox>
                    </v-col>
                    <v-col cols="12">
                      <v-card-actions>
                        <v-btn color="info"
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
                        >
                          <v-icon>mdi-content-save-check</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
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
  name: "TransitionView",
  data: () => ({
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
    ],
  }),
}
</script>

<style scoped>

</style>