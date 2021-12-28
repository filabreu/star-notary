const StarNotary = artifacts.require('StarNotary.sol');

var accounts;
var owner;

describe('StarNotary', async () => {

  contract('StarNotary', async(accs) => {
    accounts = accs;
    owner = accounts[0];
  });

  it('has correct name', async () => {
    const instance = await StarNotary.deployed();
    const starName = await instance.starName.call();

    assert.equal(starName, 'Awesome Udacity Star');
  });

  it('can be claimed', async () => {
    const instance = await StarNotary.deployed();
    await instance.claimStar({ from: owner });
    const starOwner = await instance.starOwner.call();

    assert.equal(starOwner, owner);
  });

  it('can change owners', async () => {
    const instance = await StarNotary.deployed();
    const newOwner = accounts[1];

    await instance.claimStar({ from: owner });
    const starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);

    await instance.claimStar({ from: newOwner });
    const newStarOwner = await instance.starOwner.call();
    assert.equal(newStarOwner, newOwner);
  });

  describe('changeName', async () => {
    it('owner can change star name', async () => {
      const instance = await StarNotary.deployed();
      const newStarName = 'My new star';

      await instance.claimStar({ from: owner });
      await instance.changeName(newStarName, { from: owner });

      const starName = await instance.starName.call();
      assert.equal(starName, newStarName);
    });
  });
});
