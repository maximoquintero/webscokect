#include <Ultrasonic.h>

#define LED_PIN 13
Ultrasonic ultrasonico(11, 12); // Trigger 11 y Echo 12

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    char command = Serial.read();
    if (command == '1') {
      digitalWrite(LED_PIN, HIGH);
    } else if (command == '0') {
      digitalWrite(LED_PIN, LOW);
    }
  }

  long distancia = ultrasonico.distanceRead(CM);
  Serial.println(distancia);
  delay(1000);
}
