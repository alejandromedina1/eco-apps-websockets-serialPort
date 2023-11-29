const int BUTTON_PIN = 2;

int btn_value = 0;
int previous_btn_value = 0;
void setup() {
  // put your setup code here, to run once:
  pinMode(BUTTON_PIN, INPUT);

  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available() > 0) {
    Serial.print("hola");
  } else {
    sendingData();
  }

  delay(100);

}

void sendingData() {
  btn_value = digitalRead(BUTTON_PIN);

  if (previous_btn_value != btn_value) {
    sendSerialMessage();
    previous_btn_value = btn_value;
  }
}

void sendSerialMessage(){
  int r = 0;
  int g = 0;
  int b = 255;
  Serial.print(r);
  Serial.print(' ');
  Serial.print(g);
  Serial.print(' ');
  Serial.print(b);
  Serial.println();
}
