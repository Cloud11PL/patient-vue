<template>
  <v-app>
    <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
    <v-btn v-on:click="getPatients">Refresh</v-btn>
    <v-data-table
        :headers="headers"
        :items="patientArray"
        :expand="expand"
        item-key="surname"
        v-show="showTable"
      >
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.surname }}</td>
            <td class="text-xs-left">{{ props.item.firstname }}</td>
            <td class="text-xs-left">{{ props.item.dateOfBirth }}</td>
            <td class="text-xs-left">{{ props.item.PESEL }}</td>
            <td class="text-xs-left">{{ props.item.sex }}</td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-card-text>Peek-a-boo!</v-card-text>
          </v-card>
        </template>
      </v-data-table>
      <v-btn fab dark color="indigo">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HomePage',
  data() {
    return {
      patients: {},
      patientArray: [],
      expand: false,
      showTable: false,
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
  methods: {
    ...mapActions(['getAllPatients']),
    getPatients() {
        this.getAllPatients()
    }
  },
  created: 
    function () {
        this.getPatients()
        this.$store.subscribe((mutation) => {
        if (mutation.type === 'setPatients') {
            console.log('liek, fav, sub')
            console.log(this.$store.getters.getPatients) 
            const patients = this.$store.getters.getPatients
            this.$data.patientArray = patients
            this.$data.showTable = true
        }
      })
    }
  
}
</script>
