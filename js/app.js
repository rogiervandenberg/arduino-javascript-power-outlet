$(document).ready(function() {
  var pubnub = new PubNub({
    publishKey: "pub-c-d2e96420-3c82-45a1-bf67-bb8cd6bdc016",
    subscribeKey: "sub-c-b9f865be-bfc2-11e6-91e2-02ee2ddab7fe"
  });

  startPubNubListener();
  retrieveHistory();

  $("#powerSwitch").change(function() {
    if ($(this).is(":checked")) {
      publishToggle(true);
    } else {
      publishToggle(false);
    }
  });

  function publishToggle(on) {
    var publishConfig = {
      channel: "state",
      message: on === true ? "1" : "0"
    };
    pubnub.publish(publishConfig, function(status, response) {
      console.log(status, response);
    });
  }

  function startPubNubListener() {
    pubnub.addListener({
      message: function(message) {
        console.log("New Message!!", message);
        setPowerSwitch(message.message == "1");
      }
    });
    console.log("Subscribing..");
    pubnub.subscribe({
      channels: ["state"]
    });
  }

  function retrieveHistory() {
    pubnub.history(
      {
          channel: 'state',
          count: 1, // how many items to fetch
      },
      function (status, response) {
        console.log("History", response);
        setPowerSwitch(response.messages[0].entry == "1");
          // handle status, response
      }
  );
  }

  function setPowerSwitch(on) {
    $("#powerSwitch").prop("checked", on);
  }
});
