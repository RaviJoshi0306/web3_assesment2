import React , { useMemo,useEffect} from "react"
import "./dashboard.css"
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from './ProgressCountdown';
import moment from 'moment';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import { roundAndFormatNumber } from '../../0x';
import usebShareStats from '../../hooks/usebShareStats';
import useBombStats from '../../hooks/useBombStats';
import useBondStats from '../../hooks/useBondStats';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import {getDisplayBalance} from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBombFinance from '../../hooks/useBombFinance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';

import useStatsForPool from '../../hooks/useStatsForPool';
import useBank from '../../hooks/useBank';
import Page from "../../components/Page";
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import bbond from '../../assets/img/bbond-256.png';
import bomb from '../../assets/img/bomb.png';
import bshares from '../../assets/img/bshares.png';
import { Button } from "@material-ui/core";
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import bombbtc from '../../assets/img/bomb-btc-lp-512.png';
import bsharebnb from '../../assets/img/bshare-bnb-lp-512.png';
// import {Typography} from '@material-ui/core';
const Dashboard=()=> {
    const bShareStats = usebShareStats();
    const bombStats = useBombStats();
    const currentEpoch = useCurrentEpoch();
    const { to } = useTreasuryAllocationTimes();
    const tBondStats = useBondStats();
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const bondStat = useBondStats();
  const cashPrice = useCashPriceInLastTWAP();
  const bondScale = (Number(cashPrice) / 100000000000000).toFixed(4);
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const bondsPurchasable = useBondsPurchasable();


  useEffect(() => window.scrollTo(0, 0));
  const bankId = "BombBtcbLPBShareRewardPool"; 
  const bank = useBank(bankId);
  let statsOnPool = useStatsForPool(bank);

  const bankId_ = "BshareBnbLPBShareRewardPool"; 
  const bank_ = useBank(bankId_);
  const TVL = useTotalValueLocked();
  let statsOnPool_ = useStatsForPool(bank_);
  const boardroomAPR = useFetchBoardroomAPR();
  const earnings = useEarningsOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const tokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  const totalStaked = useTotalStakedOnBoardroom();
  return (
    <Page>

    <div className="App">
        <BackgroundImage/>
      <div className="section-1">
        <div className="section-1-header">
          <h4>Bomb Finance Summary</h4>
        <hr />
        </div>
        
        <div className="container-section-1">
          <div className="leftTable">
            <div className="row">
              <div className="col">
                {/* 1 of 2 */}
                <table className="table-dark" id="leftTableid">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Current Supply</th>
                      <th scope="col">Total Supply</th>
                      <th scope="col">Price</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th> <img alt="bomb" style={{ width: '30px' }} src={bomb} /></th>
                      <th scope="row"> $BOMB</th>
                      <td>  {roundAndFormatNumber(bombCirculatingSupply, 2)}</td>
                      <td>{roundAndFormatNumber(bombTotalSupply, 2)}</td>
                      <td>  {bombPriceInBNB ? bombPriceInBNB : '-.----'} BTC  ${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}</td>
                      <td><Button
                            onClick={() => {
                              bombFinance.watchAssetInMetamask('BOMB');
                            }}
                          >
                            {' '}
                            <b>+</b>&nbsp;&nbsp;
                            <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                          </Button></td>
                    </tr>
                    <tr>
                    <th> <img alt="bshare" style={{ width: '30px' }} src={bshares} /></th>
                      <th scope="row"> $BSHARE</th>
                      <td>{roundAndFormatNumber(bShareCirculatingSupply, 2)}</td>
                      <td> {roundAndFormatNumber(bShareTotalSupply, 2)}</td>
                      <td> {bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BNB   ${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}</td>
                      <td><Button
                            onClick={() => {
                              bombFinance.watchAssetInMetamask('BShare');
                            }}
                          >
                            {' '}
                            <b>+</b>&nbsp;&nbsp;
                            <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                          </Button></td>
                    </tr>
                    <tr>
                    <th> <img alt="bbond" style={{ width: '30px' }} src={bbond} /></th>
                      <th scope="row">$BBOND</th>
                      <td> {roundAndFormatNumber(tBondCirculatingSupply, 2)}</td>
                      <td>{roundAndFormatNumber(tBondTotalSupply, 2)}</td>
                      <td>  {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BOND ${roundAndFormatNumber((tBondCirculatingSupply * tBondPriceInDollars).toFixed(2), 2)}</td>
                      <td><Button
                            onClick={() => {
                              bombFinance.watchAssetInMetamask('BOND');
                            }}
                          >
                            {' '}
                            <b>+</b>&nbsp;&nbsp;
                            <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                          </Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="rightTable">
            <div className="epoch">
              <h4>
              
                Current Epoch <br />  {Number(currentEpoch)}<br /> 
                Next Epoch in
              <ProgressCountdown   base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
              </h4>
              <br/>
            </div>
            <div className="epoch">
              <h4>Live TWAP: {Number(bondStat?.tokenInFtm).toFixed(4) || '-'}</h4>
              <br />
              TVL: ${TVL.toFixed()}
              <br />
              Last Epoch TWAP: {bondScale || '-'}
            </div>
          </div>
        </div>
      </div>
      <div className="xyz">
        <div className="section-2-1">
          <div className="section-2-header">
            <h4>Read investment strategy</h4>
            <br/>
          </div>

          <div className="subdiv-1">
            <div className="sub-sub-div-1">
              <div className="investNow">
                <button className="investNow1">
                  <b>Invest Now</b>
                </button>
              </div>
              <div className="chats">
                <div className="discord">
                  {" "}
                  <button className="button">chat on discord</button>
                </div>
                <div className="docs">
                  {" "}
                  <button className="button">Read docs</button>
                </div>
              </div>
            </div>

            <div className="larger">
              <div className="larger-subdiv">
                <div className="Boardroom">
                  <div className="Boardroomsub">
                    <div className="Boardroomelement">Boardroom</div>
                    <div className="Boardroombutton">
                      <span >Recommended</span>
                    </div>
                  </div>
                  <div className="Bshare">
                    <div className="Bshare1">
                      Stake BSHARE and earn BOMB every epoch
                    </div>
                    <div className="Bshare2">TVL: $1,008,430</div>
                  </div>
                  <hr />

                  <div className="Boardroom-below">
                    <div className="Boardroom-below-disc">
                      Total stacked: {getDisplayBalance(totalStaked)}
                    </div>
                    <div className="TVL">
                      <div className="Boardlower1">
                        <div className="Boardlower">
                          Daily returns <br /><br />
                          {Math.round(boardroomAPR.toFixed(2) / 365)}% 
                        </div>
                        <div className="Boardlower">
                          Your stake
                          <br /> <br />{getDisplayBalance(stakedBalance)}  {`≈ $${tokenPriceInDollars}`}
                        </div>
                        <div className="Boardlower">
                          Earned <br /><br /> {getDisplayBalance(earnings)} {`≈ $${earnedInDollars}`}
                        </div>
                        <div className="parenboard">
                          <div className="motherBoard">
                            <div className="Boardlower">
                              <button className="button">Deposit</button>
                            </div>
                            <div className="Boardlower">
                              <button className="button">Withdraw</button>
                            </div>
                          </div>
                          <div className="claim">
                            <button className="button">Claim rewards</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-2-2">
          <div className="LatestNews">
            <h4>Latest News</h4>
          </div>
        </div>
      </div>

      <div className="section-3">
        <div className="bombfarmshead">
          <h2>Bomb Farms</h2>
        </div>
        <div className="tokenshead">
          <div className="token1">
            Stake your LP tokens in our farms to start earning $BSHARE
          </div>
          <div className="token2">
            <button className="token3">Claim All</button>
          </div>
        </div>
        <div className="bombbtlower">
          <div className="bombbt1">
          <img alt="bomb" style={{ width: '40px' }} src={bombbtc} />
            <h2>BOMB BTCB</h2>
          </div>
          <div className="bombbt2">
            <h2>
            <span >Recommended</span>
            </h2>
          </div>
          <div className="TVL1">TVL: ${statsOnPool?.TVL}</div>
        </div>

        <hr />
        <div className="s3_div2-content">
          
          
          <div className="s3-div2-content-table">
            <table className="table-dark" id="sec2table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Daily Returns:</th>
                  <th scope="col">Your stake</th>
                  <th scope="col">Earned</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>  {bank_.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</td>
                  <td>{statsOnPool_?.TVL}</td>
                  <td>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}</td>
                </tr>
              </tbody>
            </table>
            
           
          </div>
          <div className="s3part">
            <div className="sec3-deposit">
              <button className="bombbt4">Deposit</button>
            </div>
            <div className="sec3-withdraw">
              <button className="bombbt4">Withdraw</button>
            </div>
            <div className="sec3-rewards">
              <button className="bombbt4">Rewards</button>
            </div>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="s3_div2-header"></div>
        <hr />
        <div className="bombbtlower">
          <div className="bombbt1">
          <img alt="bshare" style={{ width: '40px' }} src={bsharebnb} />
            <h2>BSHARE-BNB</h2>
          </div>
          <div className="bombbt2">
            <h2>
            <span >Recommended</span>
            </h2>
          </div>
          <div className="TVL1">TVL: ${statsOnPool_?.TVL}</div>
        </div>
        <hr />

        <div className="s3part">
          <div className="s3-div2-content-table">
            <table className="table-dark" id="sec2table">
              <thead>
                <tr>
                  <th className="dataval" scope="col"></th>
                  <th className="dataval" scope="col">
                    Daily Returns:
                  </th>
                  <th className="dataval" scope="col">
                    Your stake
                  </th>
                  <th className="dataval" scope="col">
                    Earned
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="dataval"></td>
                  <td className="dataval">{bank_.closedForStaking ? '0.00' : statsOnPool_?.dailyAPR}%</td>
                  <td className="dataval">{statsOnPool_?.TVL}</td>
                  <td className="dataval">{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="2">
          <div className="s3-right">
            <div className="sec3-deposit">
              <button className="bombbt4">Deposit</button>
            </div>
            <div className="sec3-withdraw">
              <button className="bombbt4">Withdraw</button>
            </div>
            <div className="sec3-rewards">
              <button className="bombbt4">Rewards</button>
            </div>
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="Bonds">
          <h2>BONDS</h2>
          <br/>
        </div>
        <div className="Bonds-content">
          BOND can be purchased only on contraction periods, when TWAP of BOMB
          is below 1
        </div>
        <div className="footer">
          <div className="foter-child">
            Current Price: {Number(bondStat?.tokenInFtm).toFixed(4) || '-'}
            <br />
            <br />
            <br />
            <br />
            BBond = {bondScale || '-'} BTCB
          </div>
          <div className="foter-child">
            Available to redeem: <br />
            <br />
            <br />
            <br />  {getDisplayBalance(bondsPurchasable, 18, 4)}    {console.log(getDisplayBalance(bondBalance))}
          </div>
          <div className="footer-parent">
            <div className="foter-child">Purchase BBond </div>
            <div className="foter-child">Bomb is over peg</div>
          </div>
          <div className="footer-parent">
            <div className="foter-child">Purchase</div>
            <hr />
            <div className="foter-child">Redeem</div>
          </div>
        </div>
      </div>
    </div>
    </Page>
  );
}

export default Dashboard;
