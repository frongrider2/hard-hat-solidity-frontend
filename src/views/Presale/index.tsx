import { GridColumn, GridRow, H1TEXT, Text } from "components/box";
import { ethers } from "ethers";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { usePresaleContract, usePresaleTokenContract } from "hooks/useContract";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import InputText from "components/InputText/InputText";
import Button from "components/Button";
import { fromWei } from "utils/unitConversion";
import { registerToken } from "utils/wallet";
import { getPresaleTokenAddress } from "utils/addressHelper";

function Presale() {
  const [load, setLoad] = useState(true);
  const [load2, setLoad2] = useState(false);
  const [re, setRe] = useState(false);
  const [val, setVal] = useState("0");
  const { account, chainId, library } = useActiveWeb3React();
  const [bnb, setBNB] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [allToken] = useState("100000");
  const [remain, setRemainToken] = useState("");

  const [buyRound, setBuyRound] = useState("");

  const PresaleContract = usePresaleContract(true);
  const PresaleToken = usePresaleTokenContract(true);

  const refreshData = async () => {
    setLoad(true);
    if (account) {
      const balance = await PresaleToken.balanceOf(account);
      const balanceParse = ethers.utils.formatUnits(balance.toString(), "ether");
      setTokenBalance(balanceParse);
      const bnb = await library.getBalance(account);
      const bnbBalance = ethers.utils.formatUnits(bnb.toString(), "ether");
      setBNB(bnbBalance);
    } else {
      setTokenBalance("");
      setBNB("");
    }
    const all = await PresaleContract.getToken();
    const allParse = ethers.utils.formatUnits(all.toString(), "ether");
    setRemainToken(allParse);
    setLoad(false);
  };

  useEffect(() => {
    refreshData();
  }, [account, chainId, library, re]);

  const handleChange = async (e) => {
    setVal(e.target.value);
    if (Number(e.target.value) < 0.1 || !e.target.value || Number(e.target.value) > 1) {
      setBuyRound("0");
    }
  };

  const willget = async () => {
    const wei = ethers.utils.parseUnits(val).toString();
    console.log(wei);
    const willGet = await PresaleContract.calculateAmount(wei);
    setBuyRound(fromWei(willGet).toString());
  };

  const buy = async () => {
    try {
      const wei = ethers.utils.parseUnits(val).toString();
      const buyResult = await PresaleContract.buy({
        value: wei,
      });
      console.log(buyResult);
      await buyResult.wait();
      setRe(!re);
    } catch (err) {
      console.log(err);
    }
  };

  const addToken = async () => {
    await registerToken(getPresaleTokenAddress(), "NCP", 18);
  };

  return (
    <GridColumn>
      <H1TEXT>Your Address : {chainId ? account : <LoadingOutlined />}</H1TEXT>
      <H1TEXT>Your BNB Balance : {!load ? bnb : <LoadingOutlined />} BNB</H1TEXT>
      <H1TEXT>Your NCP Balance : {!load ? tokenBalance : <LoadingOutlined />} NCP</H1TEXT>
      <H1TEXT>NCP For Sale : {!load ? allToken : <LoadingOutlined />} NCP</H1TEXT>
      <H1TEXT>Remaining NCP Sale : {!load ? remain : <LoadingOutlined />} NCP</H1TEXT>
      <InputText type="number" value={val} onChange={handleChange} />
      <GridRow rowTem="1fr 1fr" gap="2rem">
        <Button onClick={willget} text="CALCURATE MIN" disabled={val === "0" || val === ""} />
        <Button onClick={buy} text="BUY" disabled={val === "0" || val === ""} />
        <Button style={{ gridColumn: "1 / -1" }} onClick={addToken} text="Add Presale Token" disabled={!chainId} />
      </GridRow>
      <H1TEXT>You will Recieve : {!load2 ? buyRound : <LoadingOutlined />} NCP</H1TEXT>
    </GridColumn>
  );
}

export default Presale;
