let timer;

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoSignout: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoSignout = false;
    },
    setAutoSignout(state) {
      state.didAutoSignout = true;
    },
  },
  actions: {
    async auth(ctx, payload) {
      const authMode =
        payload.mode === 'signup' ? 'signUp' : 'signInWithPassword';

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${authMode}?key=${process.env.VUE_APP_FIREBASE_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error.message || 'Auth Error');
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const tokenExpiration = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', tokenExpiration);

      timer = setTimeout(function () {
        ctx.dispatch('autoSignout');
      }, expiresIn);

      ctx.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    autoSignout(ctx) {
      ctx.dispatch('signout');
      ctx.commit('setAutoSignout');
    },
    tryLogin(ctx) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const currentTime = new Date().getTime();
      const expiresIn = +tokenExpiration - currentTime;

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(function () {
        ctx.dispatch('autoSignout');
      }, expiresIn);

      if (token && userId) {
        ctx.commit('setUser', {
          token,
          userId,
        });
      }
    },
    signout(ctx) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

      ctx.commit('setUser', {
        token: null,
        userId: null,
      });
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoSignout(state) {
      return state.didAutoSignout;
    },
  },
};
