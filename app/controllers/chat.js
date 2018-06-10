import Controller from '@ember/controller';
// import { inject } from '@ember/service';
export default Controller.extend({
  // websockets: inject.service(),
  init(){
    this._super(...arguments);
    var socket = this.get('websockets').socketFor('ws://localhost:8080/myserv');
    socket.on('open',this.myOpenHandler,this);
    socket.on('message',this.myMessageHandler,this);
    socket.on('close',function(event){
      console.log("Connection Closed" + event);
    });
  },
  message :'',
  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },

  myMessageHandler: function(event) {
    console.log('Message: ' + event.data);
    this.set('message',event.data);
  },

  actions: {
    sendButtonPressed: function() {
      var socket = this.get('websockets').socketFor('ws://localhost:7000/');
      socket.send('Hello Websocket World');
    }
  }
});
