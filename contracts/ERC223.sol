pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./ownable.sol";


contract ERC223Token is Ownable {
    using SafeMath for uint;

    mapping(address => uint) balances;
  

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event ERC223Transfer(address indexed _from, address indexed _to, uint256 _value, bytes _data);


    //Freeze
    mapping (address => bool) public frozenAccountStatus;
    mapping (address => string) public frozenAccountReason;
    //Events
    event FrozenFunds(address target, bool frozen, string reasons);

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    bool public statusFreezedToken;

  // Function to access name of token .
    function name() public view  returns (string _name)  {
        return name;
    }
  // Function to access symbol of token .
    function symbol() public view  returns (string _symbol) {
        return symbol;
    }
  // Function to access decimals of token .
    function decimals() public view  returns (uint8 _decimals) {
        return decimals;
    }
  // Function to access total supply of tokens .
    function totalSupply() public view  returns (uint256 _totalSupply) {
        return totalSupply;
    }

  // Function that is called when a user or another contract wants to transfer funds .
    function transfer(address _to, uint _value, bytes _data) returns (bool success) {
        require(statusFreezedToken == false);
        if(isContract(_to)) {
            return transferToContract(_to, _value, _data);
        }
        else {
            return transferToAddress(_to, _value, _data);
        }
    }

  // Standard function transfer similar to ERC20 transfer with no _data .
  // Added due to backwards compatibility reasons .
    function transfer(address _to, uint _value) returns (bool success) {

    //standard function transfer similar to ERC20 transfer with no _data
    //added due to backwards compatibility reasons
        bytes memory empty;
        require(statusFreezedToken == false);
        require(!frozenAccountStatus[msg.sender]); //Check if sender is frozen
        require(!frozenAccountStatus[_to]);   //Check if recipient is frozen
 
        
        if(isContract(_to)) {
            return transferToContract(_to, _value, empty);
    }
        else {
            return transferToAddress(_to, _value, empty);
    }
    }   

//assemble the given address bytecode. If bytecode exists then the _addr is a contract.
    function isContract(address _addr) private returns (bool is_contract) {
        uint length;
        assembly {
            //retrieve the size of the code on target address, this needs assembly
            length := extcodesize(_addr)
        }
        if(length>0) {
            return true;
        }
            else {
            return false;
        }
    }

  //function that is called when transaction target is an address
    function transferToAddress(address _to, uint _value, bytes _data) private returns (bool success) {
        if (balanceOf(msg.sender) < _value) revert();
        balances[msg.sender] = balanceOf(msg.sender).sub(_value);
        balances[_to] = balanceOf(_to).add(_value);
        emit Transfer(msg.sender, _to, _value);
        emit ERC223Transfer(msg.sender, _to, _value, _data);
        return true;
    }

  //function that is called when transaction target is a contract
    function transferToContract(address _to, uint _value, bytes _data) private returns (bool success) {
        if (balanceOf(msg.sender) < _value) revert();
        balances[msg.sender] = balanceOf(msg.sender).sub(_value);
        balances[_to] = balanceOf(_to).add(_value);
        ContractReceiver reciever = ContractReceiver(_to);
        reciever.tokenFallback(msg.sender, _value, _data);
        emit Transfer(msg.sender, _to, _value);
        emit ERC223Transfer(msg.sender, _to, _value, _data);
        return true;
    }


    function balanceOf(address _owner) constant returns (uint balance) {
        return balances[_owner];
    }
}

contract ContractReceiver {
    function tokenFallback(address _from, uint _value, bytes _data);
}