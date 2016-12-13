'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/info', controller.userinfo);
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id/friends', controller.friends);
router.post('/:id/friends', controller.addfriend);
router.delete('/:id/friends', controller.removefriend);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/favorites', auth.isAuthenticated(),
           controller.favorites);
router.get('/:id/friends', controller.friends);
router.get('/info', controller.userinfo);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
