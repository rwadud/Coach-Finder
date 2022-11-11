<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Revieved</h2>
      </header>
      <ul v-if="hasRequests">
        <RequestItem v-for="request in requests" :key="request.id" :email="request.email" :message="request.message">
        </RequestItem>
      </ul>
      <p v-else>No requests yet</p>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  data() {
    return {
      error: null,
      isLoading: false
    }
  },
  computed: {
    requests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/loadRequests');
      } catch (e) {
        this.error = e.message || 'error found';
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadRequests();
  },
  components: { RequestItem }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>