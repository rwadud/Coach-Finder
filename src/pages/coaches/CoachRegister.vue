<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @coach-register="registerCoach"></CoachForm>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
export default {
  components: { CoachForm },
  computed: {

  },
  methods: {
    registerCoach(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>