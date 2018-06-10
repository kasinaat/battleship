import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  /*
   * 1. Inject the websockets service
   */
  router:service(),
  notif:service('toast'),
  myBase:null,

  didInsertElement() {
    this._super(...arguments);
    this.set('myBase',[])
   /*
      2. The next step you need to do is to create your actual websocket. Calling socketFor
      will retrieve a cached websocket if one exists or in this case it
      will create a new one for us.
    */
    // const socket = this.get('websockets').socketFor('ws://localhost:8080/myserv/websocket');

    /*
      3. The next step is to define your event handlers. All event handlers
      are added via the `on` method and take 3 arguments: event name, callback
      function, and the context in which to invoke the callback. All 3 arguments
      are required.
    */
    // socket.on('open', this.myOpenHandler, this);
    // socket.on('message', this.myMessageHandler, this);
    // socket.on('close', this.myCloseHandler, this);
    //
    // this.set('socketRef', socket);
  },


  // myOpenHandler(event) {
  //   console.log(`On open event has been called: ${event}`);
  // },
  //
  // myMessageHandler(event) {
  //   // if(event.data === "READY")
  // },
  //
  // myCloseHandler(event) {
  //   console.log(`On close event has been called: ${event}`);
  // },

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
