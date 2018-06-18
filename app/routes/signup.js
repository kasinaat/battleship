import Route from '@ember/routing/route';

export default Route.extend({
  actions:{
    userFlag : false,
    emailFlag : false,

    signup(){
      var self = this;
      var alertTemplate =`<div class="alert alert-danger">
                              ##message##
                            </div>`;

      var error = document.getElementById('error-box');
      var username = document.getElementById('username').value;
      var firstName = document.getElementById('firstname').value;
      var lastName = document.getElementById('lastname').value;
      var email = document.getElementById('email').value;
      var mobile = document.getElementById('mobile').value;
      var password = document.getElementById('pwd').value;
      var cnfPass = document.getElementById('cnfpwd').value;
      var passRegex = /^[A-Za-z0-9]{8,}$/;
      var mobileRegex = /^[0-9]{10}$/;
      var nameRegex = /^[A-Za-z0-9 ]+$/;
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(nameRegex.test(firstName) && nameRegex.test(lastName)){
        error.innerHTML = "";
      } else{
        error.innerHTML = alertTemplate.replace('##message##','Name is required');
        return;
      }
      if(emailRegex.test(email) && this.emailFlag){
        error.innerHTML = "";
      } else {
        error.innerHTML = alertTemplate.replace('##message##','Valid Email is required');
        return;
      }
      if(nameRegex.test(username) && this.userFlag){
        error.innerHTML = "";
      } else {
        error.innerHTML = alertTemplate.replace('##message##','Username is required');
        return;
      }
      if(mobileRegex.test(mobile)){
        error.innerHTML = "";
      } else {
        error.innerHTML = alertTemplate.replace('##message##','Mobile Number is required');
        return;
      }
      if(passRegex.test(password) && passRegex.test(cnfPass) && password === cnfPass){
        error.innerHTML = "";
      } else {
        error.innerHTML = alertTemplate.replace('##message##','Minimum 8 Characters is required');
        return;
      }
      var xhr = new XMLHttpRequest();
      xhr.open("POST","/signup");
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          self.transitionTo('login');
        }
        else if(this.readyState == 4 && this.status == 400){
            error.innerHTML = alertTemplate.replace("##message##","Oops..Some error Occured Please try again");
        }
      }
      xhr.send("username="+username+"&password="+password+"&firstName="+firstName+"&lastName="+lastName+"&email="+email+"&mobile="+mobile);
    },
    checkMail(){
      var self = this;
      var error = document.getElementById('error-box');
      var alertTemplate =`<div class="alert alert-danger">
                              ##message##
                            </div>`;
      var email = document.getElementById('email').value;
      var xhr = new XMLHttpRequest();
      xhr.open("GET","/signup?check=email&val=" + email);
      xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          self.set('emailFlag', true);
          error.innerHTML ="";
        }
        else if(this.readyState == 4 && this.status == 404){
          self.set('emailFlag', false);
          error.innerHTML = alertTemplate.replace("##message##","Email Address already Taken");
        }
      }
      xhr.send();
    },
    checkUser(){
      var self = this;
      var error = document.getElementById('error-box');
      var alertTemplate =`<div class="alert alert-danger">
                              ##message##
                            </div>`;
      var username = document.getElementById('username').value;
      var xhr = new XMLHttpRequest();
      xhr.open("GET","/signup?check=username&val=" + username);
      xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          self.set('userFlag', true);
          error.innerHTML ="";
        }
        else if(this.readyState == 4 && this.status == 404){
          self.set('userFlag', false);
          error.innerHTML = alertTemplate.replace("##message##","username already Taken");
        }
      }
      xhr.send();
    }
  }
});
