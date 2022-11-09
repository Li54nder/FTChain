import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  // explorer

  loginToExplorer() {
    const body = {
      user: 'exploreradmin',
      password: 'exploreradminpw',
      network: 'test-network'
    };
    return this.http.post('echo/auth/login', body, this.httpOptions);
  }

  getAllChannels() {
    const httpOptionsExp = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.get('echo/api/channels', httpOptionsExp);
  }

  getAllPeers() {
    const httpOptionsExp = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };
    // uses only: server_hostname
    return this.http.get('echo/api/peers/2796a276fce592f72faf10cf6427b436c24fbd215727e81c3d7ddd7c3185315f', httpOptionsExp);
  }

  // network

  getActors() {
    const body = {
      fcn: 'getAllUsers',
      args: [''],
      username: 'PlatformOperator',
      orgName: 'PlatformOperator',
      chaincodeName: 'usersManagement',
      channelName: 'usersandresources',
    };
    return this.http.post(environment.networkUrl + '/website/invoke', body, this.httpOptions)
  }

  getDevices() {
    const body = {
      fcn: 'getMyDevices',
      args: [''],
      username: 'VizLore',
      orgName: 'SupplyChainActors',
      chaincodeName: 'usersManagement',
      channelName: 'usersandresources',
    };
    return this.http.post(environment.networkUrl + '/website/invoke', body, this.httpOptions)
  }

  getSensors() {
    const body = {
      fcn: 'getMySensors',
      args: [''],
      username: 'VizLore',
      orgName: 'SupplyChainActors',
      chaincodeName: 'usersManagement',
      channelName: 'usersandresources',
    };
    return this.http.post(environment.networkUrl + '/website/invoke', body, this.httpOptions)
  }

  getLastFiveLocalModels() {
    const body = {
      fcn: 'getLocalModelsPagination',
      args: ['5'],
      username: 'VizLore',
      orgName: 'SupplyChainActors',
      chaincodeName: 'modelsManagement',
      channelName: 'federetedlearning',
    };
    return this.http.post(environment.networkUrl + '/website/invoke', body, this.httpOptions)
  }

  getLastFiveGlobalModels() {
    const body = {
      fcn: 'getGlobalModelsPagination',
      args: ['5'],
      username: 'VizLore',
      orgName: 'SupplyChainActors',
      chaincodeName: 'modelsManagement',
      channelName: 'federetedlearning',
    };
    return this.http.post(environment.networkUrl + '/website/invoke', body, this.httpOptions)
  }

}
