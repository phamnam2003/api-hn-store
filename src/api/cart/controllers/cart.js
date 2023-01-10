'use strict';

/**
 * cart controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) => ({
    // create cart when register account successfully
    async create (ctx) {
        try {
            // get id of current user
            const user_id = ctx.state.user.id;

            // create one cart with default data have user_id is id of current user, publishAt to avoid draf
            const cart_create = await strapi.entityService.create("api::cart.cart", {
                data: {
                    user_id: user_id + '', 
                    publishedAt: "2023-01-05T09:19:28.187Z"
                }
            });

            console.log(cart_create);

            ctx.body = "Successfully! Cart is created!";
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    }, 
    async get (ctx) {
        try {
            const user_id = ctx.state.user.id;

            // find cart have user_id of user authenticate equals field user_id of cart
            // because products from other entity so populate set products is true
            const cart_find = await strapi.entityService.findMany("api::cart.cart", {
                fields: ['id'],
                filters: { user_id },
                populate: { products: true }
            });

            console.log(cart_find[0].products);
            
            // because use findMany so return 1 array have id of cart and array products
            ctx.body = cart_find[0].products;
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },
    async add (ctx) {
        try {
            const user_id = ctx.state.user.id;
            const product_id = ctx.params.id;

            // get product in cart before add new product of current user
            const cart_find = await strapi.entityService.findMany("api::cart.cart", {
                fields: ['id'],
                filters: { user_id },
                populate: { products: true }
            });

            let new_cart = [];
            // get products in cart before adding new product 
            cart_find[0].products.map(product => new_cart.unshift(product.id));

            // adding id product after add product
            new_cart.unshift(product_id);

            // get id new_cart for update cart
            const cart_id = cart_find[0].id;

            // update with cart_id equal id of current user
            const update_cart = await strapi.entityService.update("api::cart.cart", cart_id, {
                data: {
                    products: new_cart
                }
            });

            ctx.body = "Sucessfully! This product is added in your cart!";
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    }, 
    async remove (ctx) {
        try {
            const user_id = ctx.state.user.id;
            const product_id = parseInt(ctx.params.id);

            const cart_find = await strapi.entityService.findMany("api::cart.cart", {
                fields: ['id'],
                filters: { user_id },
                populate: { products: true }
            });

            let new_cart = [];
            cart_find[0].products.map(product => new_cart.push(product.id));

            new_cart = new_cart.filter(item => item !== product_id);

            const cart_id = cart_find[0].id;

            console.log(cart_find[0].products);
            const cart_update = await strapi.entityService.update("api::cart.cart", cart_id, {
                data: {
                    products: new_cart
                }
            });

            const cart_deleted = await strapi.entityService.findMany("api::cart.cart", {
                fields: ['id'],
                filters: { user_id },
                populate: { products: true }
            });
            ctx.body = cart_deleted[0].products;
        }
        catch (err) {
            console.log(err);
            ctx.body = err;
        }
    }
}));
