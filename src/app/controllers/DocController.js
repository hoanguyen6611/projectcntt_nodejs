const Doc = require("../models/Doc");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const PAGE_SIZE = 9;
class DocController {
  //[GET]/doc
  index(req, res, next) {
    Doc.find({})
      .then((docs) => {
        res.json({
          data: mutipleMongooseToObject(docs),
          result: "ok",
          message: "Successfully",
        });
      })
      .catch((next) => {
        res.json({
          data: {},
          result: "failed",
          message: "Failed to find",
        });
      });
  }
  //[GET]/docs/:slug
  showItems(req, res, next) {
    Doc.findOne({ slug: req.params.slug })
      .then((doc) => {
        res.json({
          data: mongooseToObject(doc),
          result: "ok",
          message: "Successfully",
        });
      })
      .catch(next);
  }
  //[GET]/docs/create
  create(req, res, next) {
    if (!req.session.isAuthenticated) {
      return res.redirect("/users/sign-in");
    }
    res.render("docs/create");
  }
  //[GET]/docs/store
  store(req, res, next) {
    if (!req.session.isAuthenticated) {
      return res.redirect("/users/sign-in");
    }
    req.body.userId = req.session.authUser.email;
    const doc = new Doc(req.body);
    doc
      .save()
      .then(() => res.redirect("/me/stored/docs"))
      .catch((error) => {});
  }
  //[GET]/docs/:id/edit
  edit(req, res, next) {
    if (!req.session.isAuthenticated) {
      return res.redirect("/users/sign-in");
    }
    Doc.findById(req.params.id)
      .then((doc) =>
        res.render("docs/edit", {
          doc: mongooseToObject(doc),
        })
      )
      .catch(next);
  }
  //[PUT]/course/:id
  update(req, res, next) {
    if (!req.session.isAuthenticated) {
      return res.redirect("/users/sign-in");
    }
    Doc.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/docs"))
      .catch(next);
  }
  showFour(req, res, next) {
    Doc.find()
      .limit(4)
      .then((docs) => {
        res.render("home", {
          docs: mutipleMongooseToObject(docs),
        });
      })
      .catch(next);
  }
}
//Public ra ngoài
module.exports = new DocController();
