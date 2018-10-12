import { Injectable } from '@angular/core';
//import {Web3} from 'web3';
const Web3 = require('web3');

declare let window: any;
declare let require: any;

const contractAbi = require('./contract.abi.json');
const contractAddress = '0x0f0df6be5065313972e82906092ef25b6f17c453';


@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private _account: string = null;
  public _web3: any;
  private _contract: any;


  constructor() {
    this.initializeWeb3();
  }

  initializeWeb3() {
    console.log('Web3 Service initiated');


    if (typeof window.web3 !== 'undefined') {
      //web3 = new Web3(web3.currentProvider);
      this._web3 = new Web3(window.web3.currentProvider);
      console.log('metamask is found');
    } else {
      // Set the provider you want from Web3.providers
      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    this._contract = this._web3.eth.contract(contractAbi).at(contractAddress);
  }



  public async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }

          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          resolve(accs[0]);
        })
      }) as string;

      this._web3.eth.defaultAccount = this._account;
    }

    return Promise.resolve(this._account);
  }


  public async ownerAddress(): Promise<any> {

    return new Promise((resolve, reject) => {
      this._contract.ownerAddress.call((err, result) => {
        if (err != null) {
          return reject(err);
        }
        return resolve(result);
      });
    }) as any;
  }


  public async totalSupply(): Promise<any> {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._contract.totalSupply.call((err, result) => {
        if (err != null) {
          return reject(err);
        }
        return resolve(result);
      });
    }) as any;
  }

  public async statusFreezedToken(): Promise<any> {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._contract.statusFreezedToken.call((err, result) => {

        if (err != null) {
          return reject(err);
        }
        return resolve(result);
      });
    }) as any;
  }


  public async balanceOf(): Promise<number> {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._contract.balanceOf.call(account, function (err, result) {
        if (err != null) {
          reject(err);
        }
        resolve(_web3.fromWei(result));
      });
    }) as Promise<number>;
  }


  public async transfer(_to: any, _value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.transfer(_to, _value,
        (err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    }) as any;
  }


  public async readBalance(address: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this._contract.balanceOf(address,
        (err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    });
  }


  public async burnFromAddress(_to: any, _value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.burnFromAddress(_to, _value,
        (err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    }) as any;
  }

  public async mint(_value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.mint(_value,
        (err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    }) as any;
  }

  public async freezeToken(bool: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.freezeToken(bool,
        (err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    }) as any;
  }

  public async burn(_value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.burn(_value,
        (err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    }) as any;
  }


  public async freezeAccount(address: any, bool: boolean, reason: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.freezeAccount(address, bool, reason,
        (err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    }) as any;
  }



  public async frozenAccountStatus(address: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._contract.frozenAccountStatus(address,
        (err, result, reason) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    });
  }


  public async frozenAccountReason(address: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._contract.frozenAccountReason(address,
        (err, result, reason) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    });
  }

  public async transferOwnership(address: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._contract.transferOwnership(address,
        (err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        },
      );
    });
  }


}