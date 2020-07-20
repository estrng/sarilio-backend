require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    options: {
      useUTC: false,
      dateFirst: 1,
    },
  },
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
};
