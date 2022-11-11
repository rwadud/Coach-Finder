<template>
  <div>
    <section>
      <base-card>
        <h2>{{coach.name}}</h2>
        <h3>{{coach.rate}}</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink" :id="id">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :type="area" :title="area" :key="area"></base-badge>
        <p>{{coach.description}}</p>
      </base-card>
    </section>
  </div>

</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      coach: null
    }
  },
  computed: {
    contactLink() {
      return this.$route.path + '/contact';
    },
    areas() {
      return this.coach.areas;
    }
  },
  created() {
    this.coach = this.$store.getters['coaches/coaches'].find((coach) => coach.id === this.id);
    this.coach.name = this.coach.firstName + ' ' + this.coach.lastName;
  }
}
</script>

<style>

</style>