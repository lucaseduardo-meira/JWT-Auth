exports.login = (req, res) => {
  res.render("login");
};

exports.register = (req, res) => {
  res.render("register");
};

exports.recover_password = (req, res) => {
  res.render("recover-password");
};
