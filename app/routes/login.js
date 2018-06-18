import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(){
    var self = this;
    if(localStorage){
      var username = localStorage.getItem("username");
      var auth_key = localStorage.getItem("auth_token");
      let xhr = new XMLHttpRequest();
      xhr.open("GET","/login?user="+username+"&token="+auth_key);
      xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
          self.transitionTo("user")
        }
      }
      xhr.send();
    }
  },
  errorMessage : '',
  actions:{
    authenticate: function() {
            var self = this;
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST","/login");
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.onreadystatechange = function(){
              if(this.readyState == 4 && this.status == 200){
                localStorage.setItem('username',username);
                localStorage.setItem('auth_token',this.responseText);
                window.location.reload();
                self.transitionTo('user');
              }
              else if(this.readyState == 4 && this.status==403){
                self.set('errorMessage',"Invalid Credentials");
              }
            }
            xhr.send("username="+username+"&pass="+password);
        }
  }
});
