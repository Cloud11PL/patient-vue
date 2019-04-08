<template>
  <div class="something">
    <div class="box">
      <div
        class="patient-box"
        v-for="patient in getPatientsFromStore"
        :key="patient.id"
      >
        <div class="image-box">
          <img class="patient-image" src="../assets/user-white.png" />
          <button class="delete-button">
            <img
              class="delete-button-image"
              src="../assets/delete-button.png"
              @click="destroyPatientByID(patient.id)"
            />
          </button>
        </div>
        <div class="text-data">
          <p class="name">{{ patient.firstname }} {{ patient.surname }}</p>
          <p class="other-patient-info">
            Date of birth: {{ patient.dateOfBirth }}
          </p>
          <p class="other-patient-info">Gender: {{ patient.sex }}</p>
          <p class="other-patient-info">Pesel: {{ patient.PESEL }}</p>
        </div>
      </div>
    </div>
    <div class="create">
      <createPatient />
    </div>
  </div>
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
      expand: false,
      showTable: false,
      showAddPatient: false,
      firstId: 0
    }
  },
  computed: {
    getPatientsFromStore() {
      return this.$store.state.patients ? this.$store.state.patients : []
    }
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
      if (confirm('Do you want to delete this patient?')) {
        this.removePatient(id)
      }
    }
  },
  mounted() {
    this.$store.dispatch('getAllPatients')
  }
}
</script>

<style>
@import url(../assets/styles/loginPage.css);
@import url(../assets/styles/homePage.css);
</style>
