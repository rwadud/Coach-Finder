<template>
  <div>
    <BaseDialog :show="!!error" title="Error Occured" @close="handleError">
      <p>{{error}}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters"></CoachFilter>
    </section>
    <section>

      <BaseCard>
        <div class="controls">
          <base-button @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register-coach" v-if="!isLoggedIn">Signin to register as Coach
          </base-button>
          <base-button :to="{name: 'registerCoach'}" link v-if="isLoggedIn && !isCoach && !isLoading">Register Coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :coach="coach"></CoachItem>
        </ul>
        <h3 v-else>No Coaches found.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import BaseSpinner from "../../components/UI/BaseSpinner.vue";
import BaseDialog from "../../components/UI/BaseDialog.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    filteredCoaches() {
      const coaches = this.coaches.filter((coach) => {
        for (const filter in this.activeFilters) {
          if (this.activeFilters[filter] && coach.areas.includes(filter)) {
            return true;
          }
        }
        return false;
      });
      return coaches;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    /* coaches() {
          return this.$store.getters['coaches/coaches'];
        }, */
    ...mapGetters("coaches", ["coaches"])
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;

    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh
        });
      } catch (e) {
        this.error = e.message || 'error found';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadCoaches();
  },
  components: { CoachItem, CoachFilter, BaseSpinner, BaseDialog }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>