module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'gympoint',
  define: {
    timestamps: true, // cria uma tabela com data de criação e alteração
    underscored: true,
    underscoredAll: true,
  },
};
