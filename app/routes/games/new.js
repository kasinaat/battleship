import Route from '@ember/routing/route';

export default Route.extend({
  errorMessage:'',
  setupController(controller, model) {
    this._super(...arguments);
    this.set('controller',controller);
    this.controller.set('errorMessage', this.errorMessage);
  }
});
