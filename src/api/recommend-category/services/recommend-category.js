'use strict';

/**
 * recommend-category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recommend-category.recommend-category');
