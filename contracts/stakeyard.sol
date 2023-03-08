// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0 <=0.8.17;
contract stakeFIL{
    address owner;
    constructor() {
        //setting up owner as deployer
      owner = msg.sender;
    }
    uint256 public duration;

    mapping(address => uint256) userStakeMapping;
    mapping(address => uint256) stakeTimeEpochMapping;
    mapping(address => uint256) withdrawEligibleMapping;

    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }
    function setDuration(uint256 _durationInSeconds) public onlyOwner{
        duration = _durationInSeconds;
    }
    function getDuration() public view returns(uint256){
        return duration;
    }
    function stake(address _address,uint256 _duration) public payable {
        // 15552000 for 6 months
        require(_duration >= duration,"Minimum duration doesn't match");
        userStakeMapping[_address] += msg.value;
        stakeTimeEpochMapping[_address] = block.timestamp;
        withdrawEligibleMapping[_address] = block.timestamp + _duration;
    }
    function readUserStake(address _address) public view returns(uint256) {
        return userStakeMapping[_address];
    }
    function readStakeTimeEpoch() public view returns(uint256) {
        return stakeTimeEpochMapping[msg.sender];
    }
    function readWithdrawEligibility() public view returns(uint256) {
        return withdrawEligibleMapping[msg.sender];
    }
    function rightNow() public view returns(uint256){
        return block.timestamp;
    }
   
    function withdraw(address payable _address, uint256 _value) public payable {
        require(block.timestamp > withdrawEligibleMapping[msg.sender],"please wait");
        _address.transfer(_value);
        userStakeMapping[msg.sender] = userStakeMapping[msg.sender] - _value;
    }
}