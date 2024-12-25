import React from "react";
import Navbar from "../Navbar";
import { useAppSelector } from "../../store";
import PriceView from "./PriceView";
import MatchViewTable from "./MatchView";
import PairsComponent from "./Pairs";
// import MessageList from "../MessageList";

const Dashboard: React.FC = () => {
  const { pairs } = useAppSelector((state) => state.websocket);

  return (
    <>
      <Navbar />
      <PairsComponent />
      <h1>Dashboard</h1>
      {Object.keys(pairs).map((pair) => (
        <>
          <PriceView key={pair} pair={pair} data={pairs[pair]} />
          <MatchViewTable key={`${pair}-1`} data={pairs[pair]} pair={pair} />
        </>
      ))}

      {/* <PriceTable  data={pairs} /> */}
      {/* <div><MessageList /></div> */}
    </>
  );
};

export default Dashboard;
