import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('game');
  this.route('start');
  this.route('signup');
  this.route('login');
  this.route('logout');
  this.route('user');
  this.route('history');
});

export default Router;
