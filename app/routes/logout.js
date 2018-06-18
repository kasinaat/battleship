import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(){
    localStorage.clear();
    window.location.reload();
    this.transitionTo('application');
  }
});
