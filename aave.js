// Import the ABIs, see: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
// import DaiTokenABI from "./DAItoken.json";
import LendingPoolAddressesProviderABI from "./abi/LendingPoolAddressesProvider.json";
import LendingPoolABI from "./abi/LendingPool.json";

// ... The rest of your code ...

// Input variables
const daiAmountinWei = web3.utils.toWei("1000", "ether").toString();
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // mainnet DAI
const referralCode = "0";
const userAddress = "YOUR_WALLET_ADDRESS";

const lpAddressProviderAddress = "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8"; // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
const lpAddressProviderContract = new web3.eth.Contract(
  LendingPoolAddressesProviderABI,
  lpAddressProviderAddress
);

// Get the latest LendingPoolCore address
const lpCoreAddress = await lpAddressProviderContract.methods
  .getLendingPoolCore()
  .call()
  .catch((e) => {
    throw Error(`Error getting lendingPool address: ${e.message}`);
  });

// Approve the LendingPoolCore address with the DAI contract
const daiContract = new web3.eth.Contract(DAITokenABI, daiAddress);
await daiContract.methods
  .approve(lpCoreAddress, daiAmountinWei)
  .send()
  .catch((e) => {
    throw Error(`Error approving DAI allowance: ${e.message}`);
  });

// Get the latest LendingPool contract address
const lpAddress = await lpAddressProviderContract.methods
  .getLendingPool()
  .call()
  .catch((e) => {
    throw Error(`Error getting lendingPool address: ${e.message}`);
  });

// Make the deposit transaction via LendingPool contract
const lpContract = new web3.eth.Contract(LendingPoolABI, lpAddress);
await lpContract.methods
  .deposit(daiAddress, daiAmountinWei, referralCode)
  .send()
  .catch((e) => {
    throw Error(`Error depositing to the LendingPool contract: ${e.message}`);
  });
