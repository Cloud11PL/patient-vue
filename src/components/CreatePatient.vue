<template>
  <div id="CreatePatient">
    <form @submit.prevent="submit">
      <v-flex flex xs6 sm8 offset-xs3 offset-sm2 >
        <v-text-field label="First Name" v-model="firstname" v-validate="'required'" ></v-text-field></v-flex>
        <div v-if="submitted && errors.has('firstname')" class="invalid-feedback">{{ errors.first('firstname') }}</div>
      <v-flex flex xs6 sm8 offset-xs3 offset-sm2 >
        <v-text-field label="Surname" v-model="surname"></v-text-field>
      </v-flex>
      <v-flex flex xs6 sm8 offset-xs3 offset-sm2>
        <v-select
          :items="sex"
          label="Choose sex"
          v-model="sexChosen"
        ></v-select>
      </v-flex>
      <v-flex flex xs6 sm8 offset-xs3 offset-sm2>
        <v-text-field label="PESEL ID" v-model="pesel"></v-text-field>
      </v-flex>
        <v-flex flex xs6 sm8 offset-xs3 offset-sm2>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px"
        >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Picker in dialog"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-btn v-on:click="submitForm" color="success" class="btn btn-primary">add</v-btn>
    </form>
      <br>
  </div>
</template>

<script>
/*
		firstname: req.body.firstname,
		surname: req.body.surname,
		dateOfBirth: req.body.dateOfBirth,
		sex: req.body.sex,
        PESEL: req.body.PESEL

        xs4 sm4 md4 
*/
import { mapActions } from 'vuex'
/*
Pass button event to the parent View
Hide/show component on created/cancelled
sex - list
dat of birth - picker
*/
export default {
  name: 'createPatient',
  data() {
    return {
      firstname: '',
      surname: '',
      sex: ['Male', 'Female'],
      sexChosen: '',
      pesel: '',
      modal: false,
      date: new Date().toISOString().substr(0, 10),
      expand: false,
      submitted: false
    }
  },
  methods: {
    ...mapActions(['addPatient']),
    submitForm() {
      if(this.firstname == null || this.surname == null || this.sexChosen == null || this.pesel == null){
        console.log('Not enough input data.')
      } else {
        const patient = JSON.stringify({
          'firstname': this.firstname,
          'surname': this.surname,
          'dateOfBirth': this.date,
          'sex': this.sexChosen,
          'PESEL': this.pesel
        })
        this.addPatient(patient)
        this.firstname = '',
        this.surname = '',
        this.pesel = ''
      }
    }
  }
  
}
</script>
