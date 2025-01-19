const database = {
  sync: true,
  master: {
    username: process.env.DB_USERNAME_MASTER,
    password: process.env.DB_PASSWORD_MASTER,
    database: process.env.DB_NAME_MASTER,
    host: process.env.DB_HOSTNAME_MASTER,
    port: process.env.DB_PORT_MASTER,
  },
  slave: {
    username: process.env.DB_USERNAME_SLAVE,
    password: process.env.DB_PASSWORD_SLAVE,
    database: process.env.DB_NAME_SLAVE,
    host: process.env.DB_HOSTNAME_SLAVE,
    port: process.env.DB_PORT_SLAVE,
  },
};

module.exports = database;
