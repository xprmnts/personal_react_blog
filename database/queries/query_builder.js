// helper function to build a query restrictor based on tags, category or draft status
// can add more conditions in the future to build more complex queries
exports.build = criteria => {
  const query = {};

  if (criteria.cat) {
    query.category = {
      $in: criteria.cat
    };
  }

  if (criteria.tag) {
    query.tags = { $elemMatch: { $eq: criteria.tag } };
  }

  if (criteria.draft) {
    query.draft = { $eq: criteria.draft };
  }
  return query;
};
