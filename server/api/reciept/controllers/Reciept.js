'use strict';

/**
 * Reciept.js controller
 *
 * @description: A set of functions called "actions" for managing `Reciept`.
 */

module.exports = {

  findReceiptssWithBuyers: async (ctx) => {
    // Retrieve the list of articles with their authors.
    const articles = Article
      .find()
      .populate('buyer');

    // Send the list of users.
    ctx.body = users;
  },

  /**
   * Retrieve reciept records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.reciept.search(ctx.query);
    } else {
      return strapi.services.reciept.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a reciept record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.reciept.fetch(ctx.params);
  },

  /**
   * Count reciept records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.reciept.count(ctx.query);
  },

  /**
   * Create a/an reciept record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.reciept.add(ctx.request.body);
  },

  /**
   * Update a/an reciept record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.reciept.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an reciept record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.reciept.remove(ctx.params);
  }
};
