import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  router:service(),
  notif:service('toast'),
  myBase:null,

  didInsertElement() {
    this._super(...arguments);
    this.set('myBase',[])
  },

  actions: {
    deploy(){
      let notif = this.get('notif');
      let arr=[];
        var n = document.getElementsByName('cell');
          n.forEach(i=>{
              if(i.checked){
                arr.push(i.value);
                console.log(i.checked);
              }
          });
          if(arr.length == 3){
            notif.success("Great Lets start",'start');
            localStorage.mybase = JSON.stringify(arr);
            // const socket = this.get('socketRef');
            // socket.send("READY");
            this.get('router').transitionTo('game');
          }else {
            notif.error("You must select 3 points",'select');
          }
        console.log(this.points);
      }
    }
});
