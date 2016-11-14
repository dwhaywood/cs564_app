/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/scheduled-meals', require('./api/scheduled-meal'));
  app.use('/api/schedules', require('./api/schedule'));
  app.use('/api/ingredients', require('./api/ingredient'));
  app.use('/api/units', require('./api/unit'));
  app.use('/api/nutrition-attributess', require('./api/nutrition-attributes'));
  app.use('/api/recipes', require('./api/recipe'));
  app.use('/api/preferences', require('./api/preferences'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/query', require('./api/query.js'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
