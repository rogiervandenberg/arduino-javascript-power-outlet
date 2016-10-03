$(document).ready(function() {

  checkDweetState();

  $('#powerSwitch').change(function() {
    if($(this).is(":checked")) {
          dweetio.dweet_for("arduino-javascript-power-outlet", {state:"1"}, function(err, dweet){
          if (err) {
            console.log("too quick!");
            checkDweetState();
          } else {
            console.log(dweet.thing); // "my-thing"
            console.log(dweet.content); // The content of the dweet
            console.log(dweet.created); // The create date of the dweet
          }
        })
    } else {
        dweetio.dweet_for("arduino-javascript-power-outlet", {state:"0"}, function(err, dweet){
          if (err) {
            console.log("too quick!");
            checkDweetState();
          } else {
            console.log(dweet.thing); // "my-thing"
            console.log(dweet.content); // The content of the dweet
            console.log(dweet.created); // The create date of the dweet
          }
      })
    }
  });

  function checkDweetState() {
    dweetio.get_latest_dweet_for("arduino-javascript-power-outlet", function(err, dweet){
      var dweet = dweet[0]; // Dweet is always an array of 1
      if(dweet.content["state"] == 1) {
          $('#powerSwitch').prop('checked', true);
      } else {
        $('#powerSwitch').prop('checked', false);
      }
    });
  }

});
