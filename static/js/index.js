//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	
	document.getElementById("estado").src="/static/images/led_on.png";
    message = new Paho.MQTT.Message("1");
    message.destinationName = "jomsk@hotmail.com/IoT1";
    client.send(message);
	console.log("led on");
  
}
function LED1_Off(){	
	
	document.getElementById("estado").src="/static/images/led_off.png";
    message = new Paho.MQTT.Message("0");
    message.destinationName = "jomsk@hotmail.com/IoT1";
    client.send(message);
    console.log("led off");
}


// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "jomsk@hotmail.com",
    password: "Jomsk4all1996",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("¡Conectado!");
	
    client.subscribe("jomsk@hotmail.com/IoT");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "jomsk@hotmail.com/IoT1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);

    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
  var separador=",";
  var SValue="0";
    console.log("onMessageArrived:"+message.payloadString);
    SValue=message.payloadString.split(separador);
    document.getElementById("sensor").innerHTML=SValue[0];
    if(SValue[1]=="1"){
    document.getElementById("estado").src="/static/images/led_on.png";
	}else if(SValue[1]=="0"){
    document.getElementById("estado").src="/static/images/led_off.png";
	}

  }
  
