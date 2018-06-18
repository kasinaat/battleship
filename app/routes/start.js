import Route from '@ember/routing/route';
export default Route.extend({
  beforeModel(){
    var self = this;
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
});
