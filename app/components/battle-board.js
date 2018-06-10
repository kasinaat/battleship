import Component from '@ember/component';

export default Component.extend({
    myships:'0000000000000000000000000',
    actions:{
        deploy(){
            var n = document.getElementsByName('cell');
            console.log(n.entries());
            console.log(this.myships);
        }
    }
});
