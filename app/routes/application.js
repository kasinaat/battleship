import Route from '@ember/routing/route';

export default Route.extend({
  controller:null,
  setupController(controller,model){
    this._super(...arguments);
    this.set('controller',controller);
    if(localStorage.getItem('username') && localStorage.getItem('auth_token')){
      this.controller.set('username',localStorage.getItem('username'));
      this.controller.set('userlogged', true);
      this.controller.set('userNotlogged', false);
    } else{
      this.controller.set('userlogged', false);
      this.controller.set('userNotlogged', true);
    }
  },
  actions:{
    toHistory(){
      this.transitionTo('history')
    }
  }

});
