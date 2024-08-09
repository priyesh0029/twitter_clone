
export default {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      host: '127.0.0.1',
      password: 'password',
      database: 'twitter_clone',
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
