class UserController {
  async store(req, res) {
    console.log(req.body);
    return res.json();
  }
}

module.exports = new UserController();
