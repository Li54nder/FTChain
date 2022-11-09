import { Component, OnInit } from '@angular/core';
import { distinct } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss']
})
export class MonitoringPageComponent implements OnInit {
  explorerLoadings = [true, true];
  peers = [];
  channels = [];
  orgs = [];
  chaincodes = ['Models Management', 'Users Management', 'Supply Chains Management', 'Data Entries Management'];

  networkLoadingsOne = [true, true, true];
  actors = [];
  devices = {};
  sensors = {};

  networkLoadingsTwo = [true, true];
  localModels = [];
  globalModels = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getExplorerData();
    this.getNetworkData();
    this.getModelsFromNetwork();
  }

  getExplorerData() {
    this.apiService.loginToExplorer().subscribe({
      next: res => {
        localStorage.setItem('access_token', res['token'])
        this.getInfoFromExplorer();
      }
    })
  }

  getInfoFromExplorer() {
    this.apiService.getAllChannels().subscribe({
      next: res => {
        this.channels = res['channels'];
        this.explorerLoadings[0] = false;
      }
    })

    this.apiService.getAllPeers().subscribe({
      next: res => {
        this.peers = res['peers'].filter(x => x.peer_type !== "ORDERER").map(x => x.requests.split('.ftchain.com')[0]);
        this.orgs = this.peers.map(x => x.split(".")[1]).filter((value, index, self) => self.indexOf(value) === index);
        this.explorerLoadings[1] = false;
      }
    })
  }

  getNetworkData() {
    this.getActors();
  }

  getActors() {
    this.apiService.getActors().subscribe({
      next: actors => {
        let a = actors['result'].filter(x => x.Record.name !== "Vizloer Account");
        a.forEach(element => {
          if(element.Record.name === "VizLore Account") {
            element.Record.name = "VizLore"
          }

          this.actors.push(element.Record.name);
          this.devices[element.Record.name] = []
        });
        this.networkLoadingsOne[0] = false;
        this.getDevices();
      }
    });
  }

  getDevices() {
    this.apiService.getDevices().subscribe({
      next: devices => {
        devices['result'].forEach(element => {
          this.devices[element.Record.owner].push({
            "deviceId": element.Record.ID,
            "name": element.Record.desc
          })
          this.sensors[element.Record.ID] = [];
        });
        this.networkLoadingsOne[1] = false;
        this.getSensors();
      }
    });
  }

  getSensors() {
    this.apiService.getSensors().subscribe({
      next: sensors => {
        sensors['result'].forEach(element => {
          this.sensors[element.Record.deviceId].push({
            "name": element.Record.serialNo,
            "desc": element.Record.type
          });
        });
        this.networkLoadingsOne[2] = false;
      }
    })
  }

  getModelsFromNetwork() {
    this.apiService.getLastFiveLocalModels().subscribe({
      next: res => {
        this.localModels = res['result'].map(x => {
          let obj = {};
          obj["CID"] = x.CID;
          obj["createdAt"] = x.createdAt + "000";
          return obj;
        })
        this.networkLoadingsTwo[0] = false;
      }
    })

    this.apiService.getLastFiveGlobalModels().subscribe({
      next: res => {
        this.globalModels = res['result'].map(x => {
          let obj = {};
          obj["CID"] = x.CID;
          obj["createdAt"] = x.createdAt + "000";
          return obj;
        })
        this.networkLoadingsTwo[1] = false;
      }
    })
  }

}
