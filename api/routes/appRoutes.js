module.exports = function(app) {
    var store = require("../controllers/appController.js");
    
    
    app.route("/snacks/:name/:price/:quant")
        .post(store.postASnack);
        
    app.route("/snacks/:snackId")
        .get(store.getOneSnack)
        .delete(store.deleteSnack);
        
    app.route("/snacks/like/:snackId")    
        .post(store.likeSnack);
        
    app.route("/snacks/:snackId/:quantity")
        .post(store.changeSnackQuant);
    
    app.route("/price/:snackId/:price")
        .post(store.changePrice);
        
    app.route("/snacks/:orderBy?/:order?")
        .get(store.getAllSnacks);
            
    app.route("/buy/:snackId/:quant")
        .post(store.buySnack);
            
    app.route("/buy/log")
        .get(store.getLog);
        
    app.route("/price/log")
        .get(store.getPriceLog);
        
    app.route("/users")
        .post(store.getToken);
    
    app.route("/users/create/")
        .post(store.createUser);
};