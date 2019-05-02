document.addEventListener("DOMContentLoaded", function(){
      var x = 123;
      var clickcleable = document.querySelector('H1')


      var subject = new Rx.Subject();
      
      subject.subscribe(logData);
      subject.subscribe(otraFuncion)

      
      clickcleable.addEventListener("click", function(e){
            //emmit
            subject.next(['foo', x]);
      })

      //funciones accesorias
      function logData(data) {
            console.log('data: ' + data) + x;
      }
      
      function otraFuncion(data) {
            console.log(x)
      }
})

