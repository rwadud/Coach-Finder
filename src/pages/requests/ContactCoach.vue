<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your Email</label>
      <input type="email" name="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="msg">Message</label>
      <textarea name="msg" id="msg" rows="5" v-model.trim="msg"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">Please include an email and a message.</p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      email: '',
      msg: '',
      formIsValid: true
    }
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@') || this.msg === '') {
        this.formIsValid = false;
        return;
      }

      const request = {
        coachId: this.$route.params.id,
        email: this.email,
        message: this.msg
      };

      this.$store.dispatch('requests/contactCoach', request);

      this.$router.replace('/coaches')
    },
  },
  created() {

  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>