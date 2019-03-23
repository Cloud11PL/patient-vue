<template>
  <v-app>
    <v-card>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <br />
          <v-data-table
            :headers="headers"
            :items="patientArray"
            :expand="expand"
            item-key="surname"
            v-show="showTable"
          >
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-left">{{ increaseIndex(props.index) }}</td>
                <td class="text-xs-left">{{ props.item.surname }}</td>
                <td class="text-xs-left">{{ props.item.firstname }}</td>
                <td class="text-xs-left">{{ props.item.dateOfBirth }}</td>
                <td class="text-xs-left">{{ props.item.PESEL }}</td>
                <td class="text-xs-left">{{ props.item.sex }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat>
                <v-btn
                  depressed
                  large
                  color="error"
                  v-on:click="destroyPatientByID(props.item.id)"
                >
                  Delete this patient.
                </v-btn>
              </v-card>
            </template>
          </v-data-table>
          <v-btn fab dark color="indigo">
            <v-icon dark v-on:click="showAddPatient = !showAddPatient">
              add
            </v-icon>
          </v-btn>
          <v-expand-transition>
            <div v-if="showAddPatient">
              <create-patient />
            </div>
          </v-expand-transition>
        </v-flex>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>
import createPatient from '../components/CreatePatient'
import { mapActions } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    createPatient
  },
  data() {
    return {
      patients: {},
      patientArray: [],
      expand: false,
      showTable: false,
      showAddPatient: false,
      firstId: 0,
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        { text: 'Surname', value: 'surname', width: '10%' },
        { text: 'Firstname', value: 'firstname' },
        { text: 'Date of Birth', value: 'date' },
        { text: 'PESEL ID', value: 'pesel' },
        { text: 'Sex', value: 'sex' }
      ]
    }
  },
  computed: {
    getPatientsFromStore() {
      return this.$store.getters.patients
    }
  },
  created() {
    const self = this
    this.$store.subscribe(mutation => {
      if (mutation.type === 'SET_PATIENTS') {
        self.patientArray = self.getPatientsFromStore
        self.showTable = true
      }
    })
  },
  methods: {
    increaseIndex(index) {
      return index + 1
    },
    toggle() {
      this.$props.expanded = !this.$props.expanded
    },
    ...mapActions(['removePatient']),
    destroyPatientByID(id) {
      this.removePatient(id)
    }
  },
  mounted() {
    this.$store.dispatch('getAllPatients')
  }
}
</script>
