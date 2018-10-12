import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../providers/token.web3.service';


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  public totalsupply: any;
  public statusfreezedtoken: any;
  public balance: number;
  public endergebnis: any;
  public balanceof: any;
  public account: any;
  public _to: any;
  public _value: any;
  public balanceofaddress: any;
  public stautsfr: any;
  public stautsreason: any;
  public owner: any;


  constructor(private _web3: Web3Service) { }

  ngOnInit() {
    this.ownerAddress();
    this.totalSupply();
    this.statusFreezedToken();
    this.balanceOf();
    this.getAccount();
  }


  public ownerAddress() {
    this._web3.ownerAddress()
      .then(result => {
        this.owner = result;
        console.log(result);
      }).catch(err => {
        console.log(err);
      });
  }

  public async totalSupply() {
    this.totalsupply = await this._web3.totalSupply();
  }

  public statusFreezedToken() {
    this._web3.statusFreezedToken().then(result => {
      console.log(result);
      this.statusfreezedtoken = result;
    }).catch(err => {
      console.log(err);
    });
  }

  public balanceOf() {
    this._web3.balanceOf().then(balance => {
      console.log(balance);
      this.balanceof = balance;
    }).catch(err => {
      console.log(err);
    });
  }

  public getAccount() {
    this._web3.getAccount().then(_account => {
      console.log(_account);
      this.account = _account;
    });
  }

  public readBalance(address: any) {
    this._web3.readBalance(address).then(result => {
      console.log(result);
      this.balanceofaddress = result;
    });
  }

  public transfer(_to: any, _value: any) {
    this._web3.transfer(_to, _value).then(result => {
      console.log(result);
    });
  }

  public burnFromAddress(_to: any, _value: any) {
    this._web3.burnFromAddress(_to, _value).then(result => {
      console.log(result);
    });
  }

  public mint(_value: any) {
    this._web3.mint(_value).then(result => {
      console.log(result);
    });
  }

  public freezeToken(boolString: string) {
    const bool: boolean = (boolString === "true") ? true : false;
    this._web3.freezeToken(bool).then(result => {
      console.log(result);
    });
  }

  public burn(_value: any) {
    this._web3.burn(_value).then(result => {
      console.log(result);
    });
  }

  public freezeAccount(address: any, boolString: string, reason: string) {
    const bool: boolean = (boolString === "true") ? true : false;
    this._web3.freezeAccount(address, bool, reason).then(result => {
      console.log(result);
    });
  }



  public frozenAccountStatus(address: any) {
    this._web3.frozenAccountStatus(address).then(result => {
      console.log(result);
      this.stautsfr = result;
    });
  }



  public frozenAccountReason(address: any) {
    this._web3.frozenAccountReason(address).then(result => {
      console.log(result);
      this.stautsreason = result;
    });
  }


  public transferOwnership(address: any) {
    this._web3.transferOwnership(address).then(result => {
      console.log(result);
    });
  }


}






