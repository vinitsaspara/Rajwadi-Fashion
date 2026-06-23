export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/me"
  },

  PRODUCTS: {
    GET_ALL: "/product",
    GET_BY_ID: (id) => `/product/${id}`,
    CREATE: "/product",
    UPDATE: (id) => `/product/${id}`,
    DELETE: (id) => `/product/${id}`,
  },

  CATEGORIES: {
    GET_ALL: "/categories",
  },

  CART: {
    GET: "/cart",
    ADD: "/cart",
    UPDATE: "/cart",
    REMOVE: "/cart",
    CLEAR: "/cart/clear",
  },

  WISHLIST: {
    GET: "/wishlist",
    ADD: "/wishlist",
    REMOVE: "/wishlist",
  },

  ADDRESS: {
    GET_ALL: "/addresses",
    CREATE: "/addresses",
  },

  ORDERS: {
    GET_ALL: "/orders",
    GET_BY_ID: (id) => `/orders/${id}`,
  },

  CHECKOUT: {
    CREATE: "/checkout",
  },
};