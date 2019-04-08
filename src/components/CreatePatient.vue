<template>
  <div class="frosted-box" id="create-patient-box">
    <p class="page-name">Create Patient</p>
    <form @submit.prevent="submitForm" id="form-register">
      <div class="input-tile">
        <input
          type="text"
          placeholder="First Name"
          v-model="firstname"
          label="firstname"
          v-validate="'required'"
          name="firstname"
          autocomplete="off"
        />
      </div>
      <span>{{ errors.first('firstname') }}</span>
      <div class="input-tile">
        <input
          type="text"
          placeholder="Surname"
          v-model="surname"
          label="Surname"
          v-validate="'required'"
          name="surname"
          autocomplete="off"
        />
      </div>
      <span>{{ errors.first('surname') }}</span>
      <div class="input-tile">
        <select
          type="text"
          v-model="sexChosen"
          label="Sex"
          v-validate="'required'"
          name="sex"
        >
          <option value="" disabled selected>Select gender...</option>
          <option selected>Male</option>
          <option>Female</option>
        </select>
      </div>
      <span>{{ errors.first('sex') }}</span>
      <div class="input-tile">
        <input
          type="text"
          placeholder="PESEL ID"
          v-model="pesel"
          label="PESEL"
          v-validate="'required|digits:11'"
          name="PESEL"
          autocomplete="off"
        />
      </div>
      <span>{{ errors.first('PESEL') }}</span>
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
      <span>{{ errors.first('password') }}</span>
      <button class="submit-button" type="submit" @:click="submitForm">
        Submit
      </button>
    </form>
    <transition name="modal_box">
      <div v-if="isError">
        <p class="modal">Error: {{ errorMessage }}</p>
      </div>
      <div v-if="goodModal">
        <p class="modal modal-good">Success!</p>
      </div>
    </transition>
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
      sexChosen: '',
      pesel: '',
      modal: false,
      date: new Date().toISOString().substr(0, 10),
      expand: false,
      submitted: false,
      isError: false,
      errorMessage: '',
      goodModal: false
    }
  },
  methods: {
    ...mapActions(['addPatient']),
    submitForm() {
      this.$validator.validateAll().then(() => {
        if (!this.errors.any()) {
          this.addPatient(this.parseData())
            .then(() => {
              this.resetFrom()
              this.showGoodModal()
            })
            .catch(err => {
              this.showBadModal()
              this.errorMessage = err.data.reason
            })
        }
      })
    },
    showGoodModal() {
      const self = this
      this.goodModal = true
      setTimeout(function() {
        self.goodModal = false
      }, 5000)
    },
    showBadModal() {
      const self = this
      this.isError = true
      setTimeout(function() {
        self.isError = false
      }, 5000)
    },
    parseData() {
      return JSON.stringify({
        firstname: this.firstname,
        surname: this.surname,
        dateOfBirth: this.date,
        sex: this.sexChosen,
        PESEL: this.pesel
      })
    },
    resetFrom() {
      this.firstname = ''
      this.surname = ''
      this.pesel = ''
      this.$nextTick(() => this.$validator.reset())
    }
  }
}
</script>

<style>
#create-patient-box {
  padding: 10px 10px 10px 10px;
  width: 100%;
}
</style>
