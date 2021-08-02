const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.services.article.findOne({ slug });
    const id = entity.id
    const prevItem = await strapi.services.article.findOne({ 'id': id - 1 })
    const nextItem = await strapi.services.article.findOne({ 'id': id + 1 })
    return {
      ...sanitizeEntity(entity, { model: strapi.models.article }),
      nextItem,
      prevItem
    };
  },
};
