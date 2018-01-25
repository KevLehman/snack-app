module.exports = function(app) {
    var store = require("../controllers/appController.js");
    
    // to add a new snack
    app.route("/snacks/:name/:price/:quant")
        .post(store.postASnack);
    
    // to get information and delete one snack
    app.route("/snacks/:snackId")
        .get(store.getOneSnack)
        .delete(store.deleteSnack);
        
    // to like a snack
    app.route("/snacks/like/:snackId")    
        .post(store.likeSnack);
        
    // to change a snack stock
    app.route("/snacks/:snackId/:quantity")
        .post(store.changeSnackQuant);
    
    // to change a snack price
    app.route("/price/:snackId/:price")
        .post(store.changePrice);
        
    // to get a list of all snacks (orderBy = asc/des) (order = likes/name)
    app.route("/snacks/:orderBy?/:order?")
        .get(store.getAllSnacks);
    
    // to buy a snack
    app.route("/buy/:snackId/:quant")
        .post(store.buySnack);
    
    // get buy log
    app.route("/buy/log")
        .get(store.getLog);
        
    // get price change log
    app.route("/price/log")
        .get(store.getPriceLog);
    
    // create a new user (created as normal user)
    app.route("/users/create/")
        .post(store.createUser);
};