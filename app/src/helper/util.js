const Util = {
  initLogin(props) {
    const user =
      localStorage.user == null ? null : JSON.parse(atob(localStorage.user));
    const navList =
      localStorage.navList == null
        ? null
        : JSON.parse(atob(localStorage.navList));
    const { setUser, setIsLogin, setNavList } = props;
    const isLogin = user != null;
    setIsLogin(isLogin);
    setUser(user);
    setNavList(navList);
  },
};

export default Util;
