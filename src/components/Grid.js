import React from "react";
import Cell from "./Cell";
import "./Grid.css";

const KEYS =  ["A", "B", "C", "D", "E", "F",
               "G", "H", "I", "J", "K", "L",
               "M", "N", "O", "P", "Q", "R",
               "S", "T", "U", "V", "W", "X",
               "Y", "Z", "0", "1", "2", "3",
               "4", "5", "6", "7", "8", "9"];

export default function Grid(props) {
  const cells = KEYS.map((k) => 
                    <Cell key={k}
                          letter={k}
                          useNumbers={props.useNumbers}
                          useSpecials={props.useSpecials}
                          cellWordLength={props.cellWordLength} />);
  const timestamp = props.timestamp || new Date(Date.now());
  return(
    <div>
      <h1>Password Matrix</h1>
      <main>
        { cells }
      </main>
      <p>Generated: {timestamp.toLocaleString()}</p>
      {props.hasExpiration && props.expiration &&   
        <p>Expires: {props.expiration.toDateString()}</p>
      }
    </div>
  )
}