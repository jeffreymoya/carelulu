const {hash} = require("bcrypt")
exports.seed = async function (knex) {
  await knex('tasks').del();
  await knex('users').del();

  const johnPwd = await hash('john', 10);
  const pedroPwd = await hash('pedro', 10);

  const userIds = await knex('users').insert([
    { username: 'john', password: johnPwd },
    { username: 'pedro', password: pedroPwd },
  ]);
  const pedro = await knex('users').where({ username: 'pedro' }).first()
  const tasks = [
    { name: 'Task 1', done: false, user_id: userIds[0] },
    { name: 'Task 2', done: true, user_id: userIds[0] },
    { name: 'Task 3', done: false, user_id: pedro.id },
    { name: 'Task 4', done: true, user_id: pedro.id },
  ];

  await knex('tasks').insert(tasks);
};
