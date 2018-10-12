var EUToken = artifacts.require("EUToken");

require('truffle-test-utils').init();
const expect = require('chai').expect;
const log = console.log;

contract("EUToken", accounts => {

  let tokenOwner = accounts[0];
  let acc1 = accounts[1];
  let acc2 = accounts[2];

  let contract;

  beforeEach(async function () {
      contract = await EUToken.new();
  });

  //Total Supply Test
  it('return the total Supply', async function () {
    let instance = await contract.totalSupply.call();
    expect(100).to.equal(instance.toNumber());
    //assert.equal(instance.valueOf(), 100, 'total Supply is wrong');
  });


  //Test Balance of Owner
  it('should return the balance of token owner', async function () {
    let balance = await contract.balanceOf(tokenOwner);
    assert.equal(balance.valueOf(), 100, 'balance is wrong');
  });


  //Test Transfer function
  it('should transfer token', async function () {
    await contract.transfer(acc1, 10);
    let balance = await contract.balanceOf(acc1);
    let balance2 = await contract.balanceOf(tokenOwner);
    assert.equal(balance.valueOf(), 10, 'acc1 balance is wrong');
    assert.equal(balance2.valueOf(), 90, 'tokenOwner balance is wrong');
  });


//Test burn Function
it('should reduce the supply', async function () {
  await contract.burn(10);
  let instance = await contract.totalSupply();
  assert.equal(instance.valueOf(), 90, 'total supply is wrong');
});


//Test burn from Address Function
it('should burn the supply of Account 2', async function () {
  await contract.transfer(acc1, 50);
  await contract.burnFromAddress(20, acc1);
  let balance = await contract.balanceOf(acc1);
  let balance2 = await contract.balanceOf(tokenOwner);
  let instance = await contract.totalSupply();
  assert.equal(balance.valueOf(), 30, 'acc1 balance is wrong');
  assert.equal(balance2.valueOf(), 50, 'tokenOwner balance is wrong');
  assert.equal(instance.valueOf(), 80, 'total supply is wrong');
});


//mint totalSupply
it('should increase the totalSupply', async function () {
  await contract.mint(50);
  let instance = await contract.totalSupply();
  assert.equal(instance.valueOf(), 150, 'total supply is wrong');
});


//freeze Account
it('should freeze Account 1', async function () {
  try{
  await contract.freezeAccount(acc1, true, "");
  await contract.transfer(acc1, 10);
  let balance = await contract.balanceOf(acc1);
  assert.equal(balance.valueOf(), 10, 'acc1 balance is wrong');
  }
  catch (error) {
    assertInvalidOpCode(error);
  }
});


//Pause Test
it('should pause Token', async function () {

  await contract.freezeToken(true);
  await contract.statusFreezedToken.call();
 
  //mint Method
  try{
  await contract.mint(50);
  let instance = await contract.totalSupply();
  assert.equal(instance.valueOf(), 150, 'total supply is wrong');
}
  catch (error) {
    assertInvalidOpCode(error);
  }

  //burn Method
  try{
  await contract.burn(50);
  let instance2 = await contract.totalSupply();
  assert.equal(instance2.valueOf(), 100, 'total supply is wrong');
  }
  catch (error) {
    assertInvalidOpCode(error);
  }

  //burn from Address
  try{
  await contract.transfer(acc1, 50);
  await contract.burnFromAddress(20, acc1);
  let balance = await contract.balanceOf(acc1);
  let balance2 = await contract.balanceOf(tokenOwner);
  let instance3 = await contract.totalSupply();
  assert.equal(balance.valueOf(), 30, 'acc1 balance is wrong');
  assert.equal(balance2.valueOf(), 50, 'tokenOwner balance is wrong');
  assert.equal(instance3.valueOf(), 80, 'total supply is wrong');
  }
  catch (error) {
    assertInvalidOpCode(error);
}

  //Transfer
  try{
  await contract.transfer(acc2, 10);
  let balance3 = await contract.balanceOf(acc2);
  let balance4 = await contract.balanceOf(tokenOwner);
  assert.equal(balance3.valueOf(), 10, 'acc2 balance is wrong');
  assert.equal(balance4.valueOf(), 40, 'tokenOwner balance is wrong');
  }
  catch (error) {
    assertInvalidOpCode(error);
}

  //Prove Balances
  let balancea = await contract.balanceOf(acc1);
  let balanceb = await contract.balanceOf(tokenOwner);
  assert.equal(balancea.valueOf(), 50, 'acc1 balance is wrong');
  assert.equal(balanceb.valueOf(), 40, 'tokenOwner balance is wrong');
}
);


function assertInvalidOpCode(error) {
  assert(
      error.message.indexOf('VM Exception while processing transaction: revert') >= 0,
      'Method should have reverted'
  );
}


})