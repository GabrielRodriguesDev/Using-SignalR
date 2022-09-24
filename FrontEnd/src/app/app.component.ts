import { Component, OnInit } from '@angular/core';
import { LogLevel } from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Gabriel } from './models/Gabriel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';

  value = 'Teste';

  eu: Gabriel = new Gabriel();

  eus?: Gabriel[] = []

  connectionId = '';

  private _hubConnection?: HubConnection;

  constructor() {
  }

  private getConnectionId() {
    this._hubConnection!.invoke('getconnectionid')
      .then((data: string) => {
        console.log(data + 'Drika fedida.');
        this.connectionId = data;
      });
  }



  ngOnInit(): void {

    this._hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7144/notify')
      .configureLogging(LogLevel.Information)
      .build();

    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .then(() => this.getConnectionId())
      .catch(err => console.log('Error while establishing connection :('));


    // this._hubConnection.invoke('notification', 'Teste e essa é minha mensagem')
    //   .then(() => console.log("Deu certo sa bagaça"))
    //   .catch(err => console.error('err'));

    // console.log("Cheguei aqui");

    this._hubConnection.on('SendNotification', (data: Gabriel) => {
      this.eu = data;
      this.eus?.push(data);
      console.log(this.eus);
    });


    //console.log(connectionId);
  }

}
