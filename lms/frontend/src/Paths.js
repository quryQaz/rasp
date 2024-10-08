const Paths = {
  dashboard: {
        path : () => `/dashboard/`,
        mask : () => `/dashboard/`,
	},
  product: {
    path: (id) => `/dashboard/${id}`, // Маршрут для товара с динамическим id
    mask: () => `/dashboard/:id`,     // Маска для маршрута
  },
  create_product: {
    path: (id) => `/create-product`, // Маршрут для товара с динамическим id
    mask: () => `/create-product/`,     // Маска для маршрута
  },
  main : {
    login : {
      path : () => `/login/`,
      mask : () => `/login/`,
    },
    register : {
      path : () => `/register/`,
      mask : () => `/register/`,
    },
  }
}
export { Paths };
