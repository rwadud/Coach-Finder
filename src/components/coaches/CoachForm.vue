<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !firstName.isValid}">
      <label for="fname">Firstname</label>
      <input type="text" id="fname" v-model.trim="firstName.val" @blur="clearValidity('firstName')">
    </div>
    <div class="form-control" :class="{invalid: !lastName.isValid}">
      <label for="lname">Lastname</label>
      <input type="text" id="lname" v-model.trim="lastName.val" @blur="clearValidity('lastName')" />
    </div>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <label for="desc">Description</label>
      <textarea id="desc" rows="5" v-model.trim="description.val" @blur="clearValidity('description')" />
    </div>
    <div class="form-control" :class="{invalid: !rate.isValid}">
      <label for="rate">Rate</label>
      <input type="text" id="rate" v-model.trim="rate.val" @blur="clearValidity('rate')" />
    </div>
    <div class="form-control" :class="{invalid: !areas.isValid}">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" name="areas" value="frontend" id="frontend" v-model="areas.val"
          @blur="clearValidity('areas')" />
        <label for="frontend">Frontend Dev</label>
      </div>
      <div>
        <input type="checkbox" name="areas" value="backend" id="backend" v-model="areas.val"
          @blur="clearValidity('areas')" />
        <label for="backend">Backend Swd</label>
      </div>
      <div>
        <input type="checkbox" name="areas" value="career" id="career" v-model="areas.val"
          @blur="clearValidity('areas')" />
        <label for="backend">Career Advisor</label>
      </div>
    </div>
    <p v-if="!formIsValid">Please fix the errors.</p>
    <base-button>Register</base-button>
  </form>

</template>

<script>
export default {
  emits: ['coach-register'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true
      },
      lastName: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      rate: {
        val: '',
        isValid: true
      },
      formIsValid: true
    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.rate.val === '') {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }

    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }


      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        areas: this.areas.val,
        rate: this.rate.val,
      }
      this.$emit('coach-register', formData);
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>