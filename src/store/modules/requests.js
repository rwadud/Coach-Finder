export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async loadRequests(ctx) {
      const coachId = ctx.rootGetters.userId;
      const token = ctx.rootGetters.token;

      const response = await fetch(
        `${process.env.VUE_APP_RTDB_BASE_URL}/requests/${coachId}.json?auth=${token}`
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message);

      if (data) {
        const requests = Object.entries(data).map(([k, v]) => ({
          id: k,
          coachId: coachId,
          ...v,
        }));

        ctx.commit('setRequests', requests);
      }
    },

    async contactCoach(ctx, payload) {
      const request = {
        email: payload.email,
        message: payload.message,
      };

      const response = await fetch(
        `${process.env.VUE_APP_RTDB_BASE_URL}/requests/${payload.coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        throw new Error('error');
      }

      const data = await response.json();
      request.id = data.name;
      request.coachId = payload.coachId;
      ctx.commit('addRequest', request);
    },
  },
  getters: {
    requests(state, _, __, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests > 0;
    },
  },
};
