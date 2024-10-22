var pool = require('./bd');

async function getNovedades() {
  try {
    var query = 'SELECT * FROM novedades';
    var rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error al obtener novedades:', error);
    throw error; 
  }
}

async function deleteNovedadesById(id) {
  try {
    var query = 'DELETE FROM novedades WHERE id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
  } catch (error) {
    console.error('Error al eliminar novedad:', error);
    throw error;
  }
}

async function insertNovedad(obj) {
  try {
    var query = 'insert into novedades set ?';
    var rows = await pool.query(query, [obj]);
    return rows;

  } catch (error) {
    console.error('Error al eliminar novedad:', error);
    throw error;
  }
}

async function getNovedadesById(id) {
    var query = 'SELECT * FROM novedades';
    var rows = await pool.query(query);
    return rows[0];
}

async function modificarNovedadesById(id) {
  try {
    var query = 'update novedades set ? where id =?';
    var rows = await pool.query(query[obj, id]);
    return rows;
  } catch (error) {
      throw error; 
  }
}

module.exports = { getNovedades, deleteNovedadesById, insertNovedad, getNovedadesById, modificarNovedadesById};
