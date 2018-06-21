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
    deploy(param){
      let self = this;
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
            if(param == 'create'){
              var xhr = new XMLHttpRequest();
              xhr.open("POST","/user");
              xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
              xhr.send("user="+localStorage.getItem('username'));
              xhr.onreadystatechange = function(){
                if(this.status == 200 && this.readyState == 4){
                  let json = JSON.parse(this.responseText);
                  self.get('router').transitionTo('/game/'+json.gameId);
                }
              }
            } else{
                this.get('router').transitionTo('games');
            }

          }else {
            notif.error("You must select 3 points",'select');
          }
        console.log(this.get("arr"));
      }
    }
});
