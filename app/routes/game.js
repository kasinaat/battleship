import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  beforeModel(){
    var self = this;
    if(localStorage){
      var username = localStorage.getItem("username");
      var auth_key = localStorage.getItem("auth_token");
      let xhr = new XMLHttpRequest();
      xhr.open("GET","/login?user="+username+"&token="+auth_key);
      xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 403){
          self.transitionTo("login")
        }
      }
      xhr.send();
    }

  },
  websockets: service(),
  socketRef: null,
  message:'',
  myBase:null,
  disp:'none',
  point:0,
  controller:null,
  opponent:'',
  notif:service('toast'),
  init(){
    this._super(...arguments);
    const socket = this.get('websockets').socketFor('ws://172.22.125.206:8080/battleship-server/websocket/'+localStorage.getItem('username'));
    console.log(JSON.parse(localStorage.mybase));
    this.set('myBase',JSON.parse(localStorage.mybase));
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', this.myCloseHandler, this);

    this.set('socketRef', socket);
  },
  setupController(controller, model) {
    this._super(...arguments);
    this.set('controller',controller);
    this.controller.set('point', this.point);
    this.controller.set('opponent', this.opponent);
  },
  myOpenHandler(event) {
   console.log(`On open event has been called: ${event}`);
   const socket = this.get('socketRef');
   socket.send("READY");
   document.getElementById('opponent').setAttribute("style","display:none");

 },

 myMessageHandler(event) {
   // if(event.data === "READY")
   console.log(event.data);
   let notif = this.get('notif');
   const socket = this.get('socketRef');
   var hitRegex = /^HIT#[0-9]+$/;
   var trueRegex = /^TRUE#[0-9]+$/;
   var falseRegex = /^FALSE#[0-9]+$/;
   if((event.data).contains("READY#")){
     notif.clear();
     notif.info('User joined Its your turn','Start');
     document.getElementById('opponent').setAttribute("style","display:inline-block;pointer-events:");
     let val = (event.data).split("#");
     this.set("opponent",val[1]);
     this.controller.set("opponent",val[1]);

   } else if(event.data == "WAIT"){
     notif.clear();
     notif.info('Waiting for another user','Wait');
     document.getElementById('opponent').setAttribute("style","pointer-events:none");
   } else if(hitRegex.test(event.data)){
       notif.clear();
       notif.info("It's your turn")
       let values = (event.data).split("#");
       let myCell = document.getElementsByName('cell');
       if(this.myBase.includes(values[1])){
         notif.error("We've been hit",'hit');
         socket.send("TRUE#"+values[1]+"#"+this.get("opponent"));
         document.getElementById('opponent').setAttribute("style","pointer-events:");
         let count = 1;
         myCell.forEach(i=>{
           if(count == values[1]){
             i.setAttribute("checked","true");
             i.setAttribute("disabled","true");
           }
           count++;
         });
     } else{
       document.getElementById('opponent').setAttribute("style","pointer-events:");
       socket.send("FALSE#"+values[1]+"#"+this.get("opponent"));
     }

   } else if(trueRegex.test(event.data)){
     notif.clear();
     notif.success("Yay! We hit em!",'success')
     this.point++;
     this.controller.set('point',this.point);
     let socket = this.get('socketRef');
     let hit = (event.data).split("#");
     let hitValue = hit[1];
     let oppCell = document.getElementsByName('oppCell');
     let count = 1;
     oppCell.forEach(i=>{
       if(count == hitValue){
         console.log("Adichutta da");
         i.setAttribute("checked","true");
         i.setAttribute("disabled","true");
       }
       count++;
     });
     if(this.controller.get('point') == 3){
       socket.send("WINNER#"+this.get("opponent"));
       socket.send("POINT#3#"+localStorage.getItem('username'));
       document.getElementById('main').setAttribute("style","pointer-events:none");
       document.getElementById('opponent').setAttribute("style","pointer-events:none");
       notif.clear();
       notif.success("Ohoooo.. We won",'Winner');
       socket.close();
     }

   } else if(falseRegex.test(event.data)){
     let miss = (event.data).split("#");
     let missValue = miss[1];
     let oppCell = document.getElementsByName('oppCell');
     let count = 1;
     oppCell.forEach(i=>{
       if(count == missValue){
         i.removeAttribute("checked");
         i.setAttribute("disabled","true");
       }
       count++
     });
 } else if ((event.data).contains("WINNER#")) {
     socket.send("POINT#"+this.get(point)+"#"+localStorage.getItem('username'));
     document.getElementById('main').setAttribute("style","pointer-events:none");
     document.getElementById('opponent').setAttribute("style","pointer-events:none");
     notif.clear();
     notif.success("Noooooo we lost the game",'Lost');
     socket.close();
   }
 },

 myCloseHandler(event) {
  //  const socket = this.get('socketRef');
  //  if (performance.navigation.type == 1) {
  //   console.info( "This page is reloaded" );
  //   socket.send("WINNER_BY_EXIT");
  //   document.getElementById('main').setAttribute("style","pointer-events:none");
  //   document.getElementById('opponent').setAttribute("style","pointer-events:none");
  //   socket.send("WINNER");
  //   socket.send("POINT#"+this.controller.get('point')+"#"+localStorage.getItem('username'));
  //   notif.clear();
  //   notif.error("Ooo no we lost",'lost');
  // } else {
  //   console.info( "This page is not reloaded");
  // }

   this.controller.set('point',0);
   this.transitionTo('history');

   console.log(`On close event has been called: ${event}`);
 },
 actions:{
   attack(){
    document.getElementById('opponent').setAttribute("style","pointer-events:none");
    var oppCell = document.getElementsByName("oppCell");
    let count =1;
    const socket = this.get('socketRef');
    oppCell.forEach(i=>{
      if(i.checked == true && i.disabled != true){
        i.setAttribute("disabled","true");
        socket.send("HIT#"+count+"#"+this.get("opponent"));
      }
      count++;
    });
   }
 }
});
