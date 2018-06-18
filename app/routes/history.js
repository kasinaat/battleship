import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    let xhr = new XMLHttpRequest();
    var json;
    xhr.open("GET","/user?query=history&user="+localStorage.getItem('username'),false);
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
