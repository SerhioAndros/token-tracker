import axios from "axios";

const baseURL =
  "https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x89bd2e7e388fab44ae88bef4e1ad12b4f1e0911c";
// ("&address={userAddress}&page=1&offset=100&sort=asc&apikey={APIkey}");

const fetchInfo = (userAddress) => {
  const APIkey = "VJ2RGZDFZUSNP151K197C4CSYXQPSUNICE";
  return axios
    .get(
      `${baseURL}&address=${userAddress}&page=1&offset=100&startblock=0&endblock=12467913&sort=asc&apikey=${APIkey}`
    )
    .then((resp) => resp.data);
};

export { fetchInfo };
