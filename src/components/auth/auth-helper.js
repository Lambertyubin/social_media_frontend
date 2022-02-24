const auth = {
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    else return false;
  },
  authenticate(data, cb) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(data));
      cb();
    }
  },
  clearJWT(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();
  },
};

export default auth;
