// Note: be sure to specify 'exact=true' in the Routes file if changing root
enum Routes {
  HOME = "/",
  DASHBOARD = "/dashboard",
  DEMO = "/demo",
  FORCE_DEMO = "/demoStart",
  REGISTER = "/register",
  LOGIN = "/login",
  FORGOT_PASS = "/forgotPassword",
  RESET_PASS = "/resetPassword",
  USER = "/user",
  LOGIN_REQUIRED = "/loginRequired",
  INVALID_TOKEN = "/invalidToken",
  // Note: /404 is not actually a route. Since the 404 page is actually a catch-all,
  // any invalid route (aka any route that is not described above) would bring up the
  // 404 page. Also, DNE in the variable name stands for "Does Not Exist"
  DNE404 = "/404",
}

export default Routes;
