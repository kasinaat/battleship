import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let self = this;
    var json;
    let xhr = new XMLHttpRequest();
    xhr.open("GET","/user?query=games&type=new",false);
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        json = JSON.parse(this.responseText);
      }
    }
    xhr.send();
    console.log(json);
    return json;
  }
});
