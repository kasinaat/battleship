import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let self = this;
    let xhr = new XMLHttpRequest();
    xhr.open("GET","/user&query=games&type=new");
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        console.log(this.responseText)
      }
    }
    xhr.send();
  }
});
