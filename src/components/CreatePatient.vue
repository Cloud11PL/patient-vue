<template>
  <div id="CreatePatient">
    <form @submit.prevent="submit">
      <v-flex flex xs6 sm8 offset-xs3 offset-sm2>
        <v-text-field
          label="First Name"
          v-model="firstname"
          v-validate="'required|alpha'"
          name="firstname"
          type="text"
        ></v-text-field>
        <span>{{ errors.first('firstname') }}</span>
      </v-flex>
      <v-flex flex xs6 sm8 offset-xs3 offset-sm2>
        <v-text-field
          label="Surname"
          v-model="surname"
          v-validate="'required|alpha'"
          name="surname"
          type="text"
        ></v-text-field>
        <span>{{ errors.first('surname') }}</span>
      </v-flex>
      <v-flex flex xs6 sm8 offset-xs3 offset-sm2>
        <v-select
          :items="sex"
          label="Choose sex"
          v-model="sexChosen"
          v-validate="'required'"
          name="sexChosen"
          type="text"
        ></v-select>
        <span>{{ errors.first('sexChosen') }}</span>
      </v-flex>
      <v-flex flex xs6 sm8 offset-xs3 offset-sm2>
        <v-text-field
          label="PESEL ID"
          v-model="pesel"
          v-validate="'required|digits:11'"
          name="pesel"
          type="number"
        ></v-text-field>
        <span>{{ errors.first('pesel') }}</span>
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
          v-validate="'required'"
          name="date"
          type="text"
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
            <v-btn flat color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-btn v-on:click="submitForm" color="success" class="btn btn-primary"
        >add</v-btn
      >
    </form>
    <br />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          const patient = JSON.stringify({
            firstname: this.firstname,
            surname: this.surname,
            dateOfBirth: this.date,
            sex: this.sexChosen,
            PESEL: this.pesel
          })
          this.addPatient(patient).then(res => {
            this.firstname = ''
            this.surname = ''
            this.pesel = ''
            this.$nextTick(() => this.$validator.reset())
          })
        }
      })
    }
  }
}
</script>
