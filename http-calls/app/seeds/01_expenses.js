
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('expenses').del()
    .then(function (table) {
      return Promise.all([
        // Inserts seed entries
        knex('expenses').insert({
          category: 'pink',
          amount: 24.30
        }),
        knex('expenses').insert({
          category: 'purple',
          amount: 70.50
        }),
        knex('expenses').insert({
          category: 'blue',
          amount: 2.25
        })
      ])
    })
}
