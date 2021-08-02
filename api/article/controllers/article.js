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
    const nextItem = await strapi.query('article').model.query(qb => {
      qb.where('id', '>', id).andWhere('status', 'published');
    }).fetch()
    const prevItem = await strapi.query('article').model.query(qb => {
      qb.where('id', '<', id).andWhere('status', 'published');
    }).fetch()
    return {
      ...sanitizeEntity(entity, { model: strapi.models.article }),
      nextItem,
      prevItem
    };
  },
};
