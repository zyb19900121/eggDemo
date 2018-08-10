'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
	router.get('/', controller.home.index);
	router.resources('user', '/api/user', controller.user);
	router.resources('game', '/api/game', controller.game);
	router.resources('appInfo', '/api/appInfo', controller.appInfo);
};
