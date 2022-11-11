<template>
  <div>
    <base-dialog :show="!!error" title="Error Occurred" @close="handleError">
      <p> {{error}} </p>
    </base-dialog>
    <base-dialog fixed title="Authenticating..." :show="isLoading">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">Please enter a valid email or password.</p>
        <base-button> {{submitButtonCaption}} </base-button>
        <base-button mode="flat" @click.prevent="switchAuthMode"> {{switchModeButtonCaption}}</base-button>
      </form>
    </base-card>
  </div>


</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'signin',
      isLoading: false,
      error: null
    }
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'signin' ? 'Signin' : 'Signup';
    },
    switchModeButtonCaption() {
      return this.mode === 'signin' ? 'Signup instead' : 'Login instead';
    }
  },
  methods: {
    handleError() {
      this.error = null
    },
    async submitForm() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      try {
        await this.$store.dispatch('auth', {
          email: this.email,
          password: this.password,
          mode: this.mode
        });

        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.message || 'auth failed';
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === 'signin' ? 'signup' : 'signin';
    }
  }
}
</script>t

<style scoped>
form {
  margin: 1rem;
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
</style>