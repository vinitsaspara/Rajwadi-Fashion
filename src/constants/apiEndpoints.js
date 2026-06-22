export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  PRODUCTS: {
    GET_ALL: "/products",
    GET_BY_SLUG: (slug) => `/products/${slug}`,
    FEATURED: "/products/featured",
    NEW_ARRIVALS: "/products/new-arrivals",
    BEST_SELLERS: "/products/best-sellers",
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