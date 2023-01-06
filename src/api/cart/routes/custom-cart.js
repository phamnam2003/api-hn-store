module.exports = {
    routes: [
        {
            method: "GET", 
            path: "/cart/create",
            handler: "cart.create"
        }, {
            method: "GET",
            path: "/cart/get",
            handler: "cart.get"
        }, {
            method: "GET",
            path: "/cart/add/:id",
            handler: "cart.add"
        }
    ]
}