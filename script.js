const websocket = new WebSocket("ws://localhost:8765");
websocket.onopen = () => console.log("Conectado al servidor WebSocket");

const id = 1;
axios
  .get(`http://localhost:8082/led/${id}`)
  .then(function (response) {
    const estado_inicial = response.data[0].led_status;
    console.log(estado_inicial);
    websocket.send(estado_inicial);
    const toggleBtn = document.getElementById("toggleBtn");
    if (estado_inicial == 0) {
      toggleBtn.checked = false;
    } else {
      toggleBtn.checked = true;
    }
  })
  .catch(function (error) {
    console.error("Error:", error);
  });

var ctx1 = document.getElementById("sensorUltrasonico").getContext("2d");
var chart1 = new Chart(ctx1, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Sensor Ultrasonico",
        backgroundColor: "rgb(51, 141, 255)",
        borderColor: "rgb(93, 164, 255)",
        data: [],
      },
    ],
  },
  options: {},
});

let labels = [];
let sensorData = [];

function actualizarGrafica(distancia, mensaje) {
  labels.push(mensaje);
  sensorData.push(distancia);

  chart1.data.labels = labels;
  chart1.data.datasets[0].data = sensorData;
  chart1.update();

  // Cambiar los LED basados en el último color
  const led1 = document.getElementById("led1");
  const led2 = document.getElementById("led2");
  const led3 = document.getElementById("led3");

  if (mensaje === "Rojo") {
    led1.src = "img/VERDE-OFF.svg";
    led2.src = "img/AMARILLO-OFF.svg";
    led3.src = "img/ROJO-ON.svg";
  } else if (mensaje === "Amarillo") {
    led1.src = "img/VERDE-OFF.svg";
    led2.src = "img/AMARILLO-ON.svg";
    led3.src = "img/ROJO-OFF.svg";
  } else if (mensaje === "Verde") {
    led1.src = "img/VERDE-ON.svg";
    led2.src = "img/AMARILLO-OFF.svg";
    led3.src = "img/ROJO-OFF.svg";
  }
}

websocket.onmessage = (event) => {
  const mensajes = JSON.parse(event.data);
  console.log("Mensaje recibido del servidor:", mensajes); // Imprime el mensaje recibido del servidor
  const distancia = mensajes.valor;
  const mensaje = mensajes.mensaje;
  console.log("Datos de distancia y mensaje:", distancia, mensaje); // Imprime los datos de distancia y mensaje
  actualizarGrafica(distancia, mensaje);
};

$("#toggleBtn").change(function () {
  const toggleBtn = document.getElementById("toggleBtn");
  const command = toggleBtn.checked ? "1" : "0";
  websocket.send(command);
  console.log("Comando enviado al servidor:", command);
  axios
    .put(`http://localhost:8082/led/${id}`,{
      estado: command
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});
