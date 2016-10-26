require(['jquery', 'vue', 'filter'], function($, Vue) {

    new Vue({
        el: '#app',
        data: {
            name: "meizu",
            os: "flyme",
            devices: [
                {"device_name":"MEIZU PRO 5","display":"Flyme OS 5.6.3.22 beta"}
            ]
        },
        methods:{
            add: function(){
                this.devices.push({"device_name":this.name,"display":this.os});
                this.name = "meizu";
                this.os = "flyme";
            },
            remove: function(index){
                this.devices.splice(index, 1);
            }
        }
    });

});