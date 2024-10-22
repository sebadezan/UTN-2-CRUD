var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function (req, res, next) {
  try {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
      layout: 'admin/layout',
      persona: req.session.nombre,
      novedades
    });
  } catch (error) {
    console.error('Error al obtener novedades:', error);
    res.status(500).send('Error al cargar las novedades');
  }
});

router.get('/eliminar/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.error('Error al eliminar la novedad:', error);
    res.status(500).send('Error al eliminar la novedad');
  }
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.post('/agregar', async (req, res, next) => {
  try {

    console.log(req.body)

    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('/admin/agregar', {
        layout: '/admin/layout',
        error: true,
        message: 'completar todos los datos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'no completaste la novedad'
    })
  }
})

router.get('/modificar/:id', async (req, res, next) => {
  try {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);

    res.reder('/admin/modificar', {
      layout: 'admin/layout',
      novedad
    });
  } catch (error) {
    console.error('Error al eliminar la novedad:', error);
    res.status(500).send('Error al eliminar la novedad');
  }
});

router.post('/modificar', async (req, res, next) => {
    try {

      var obj = {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        cuerpo: req.body.cuerpo
      }


      console.log(obj)
      await novedadesModel.modificarNovedadesById(obj, req.body.id);
      res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error)
        res.render('/admin/modificar', {
          layout: '/admin/layout',
          error: true,
          message: 'no se modifico la novedad'
        })
    }
});

module.exports = router;
