export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Jim',
          lastName: 'Smith',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Jim and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          rate: '$95/hour',
        },
        {
          id: 'c2',
          firstName: 'Bob',
          lastName: 'Duul',
          areas: ['frontend', 'career'],
          description:
            'I am Bob and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          rate: '$60/hour',
        },
      ],
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async loadCoaches(ctx, payload) {
      if (!payload.forceRefresh && !ctx.getters.shouldUpdate) return;
      const response = await fetch(
        `${process.env.VUE_APP_RTDB_BASE_URL}/coaches.json`
      );

      if (!response.ok) throw new Error('errr');
      const data = await response.json();

      if (data) {
        const coaches = Object.entries(data).map(([k, v]) => ({ id: k, ...v }));

        ctx.commit('setCoaches', coaches);
        ctx.commit('setFetchTimestamp');
      }
    },
    async registerCoach(ctx, data) {
      const userId = ctx.rootGetters.userId;
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        rate: data.rate,
        description: data.desc,
        areas: data.areas,
      };

      const token = ctx.rootGetters.token;
      try {
        const response = await fetch(
          `${process.env.VUE_APP_RTDB_BASE_URL}/coaches/${userId}.json?auth=${token}`,
          {
            method: 'PUT',
            body: JSON.stringify(coachData),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }

        ctx.commit('registerCoach', {
          ...coachData,
          id: userId,
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return !!state.coaches.length;
    },
    isCoach(_, getters, __, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;

      return coaches.some((coach) => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimestamp = new Date().getTime();

      return (currentTimestamp - lastFetch) / 1000 > 60;
    },
  },
};
