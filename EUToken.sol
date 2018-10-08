pragma solidity ^0.4.24;

import "./ERC223.sol";

contract EUToken is ERC223Token {
    address public owner = msg.sender;
   

    string public name = "EU Token";
    string public symbol = "EU";
    uint public decimals = 4;
    uint public totalSupply = 100;
    bool public statusFreezedToken;

    function EUToken() public{
        balances[msg.sender] = totalSupply;
    }

    
    //increase totalSupply
    function mint(uint256 amount) public onlyOwner {
        require(statusFreezedToken == false);
        totalSupply = totalSupply.add(amount);
        balances[msg.sender] = balances[msg.sender].add(amount);        
    }

    //decrease totalSupply
    function burn(uint256 amount) public onlyOwner {
        require(statusFreezedToken == false);
        totalSupply = totalSupply.sub(amount);
        balances[msg.sender] = balances[msg.sender].sub(amount);
    }

    //decrease totalSupply/ Balance from Address
    function burnFromAddress(uint256 amount, address _to) public onlyOwner {
        require(statusFreezedToken == false);
        totalSupply = totalSupply.sub(amount);
        balances[_to] = balances[_to].sub(amount);

    }

    //Freeze Account from Address
    function freezeAccount(address target, bool freeze, string reason) public onlyOwner {
        require(statusFreezedToken == false);
        frozenAccountStatus[target] = freeze;
        frozenAccountReason[target] = reason;
        emit FrozenFunds(target, freeze, reason);
    }

    //Freeze Token
    function freezeToken(bool freezeTokens )public onlyOwner {
        statusFreezedToken = freezeTokens;
    }
    
}