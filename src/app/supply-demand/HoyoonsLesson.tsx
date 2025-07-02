"use client";
import React from "react";
import { useEffect } from "react";

export const HoyoonsFirstLesson: React.FC = () => {
  return (
    <div className="w-full h-full">
      <center>
        <h1 className="text-4xl font-bold">Supply and Demand</h1>
        <br />

        <div
          className="border-2 border-gray-300 rounded-lg p-4"
          style={{ width: "80%", textAlign: "left" }}
        >
          <h1 className="text-xl font-bold underline">Definition</h1>
          <p>
            Supply and demand is an economic model that{" "}
            <b>
              shows how the price and quantity of goods and services are
              determined{" "}
            </b>{" "}
            in a market economy.
            <br />
            <br />
            It illustrates the relationship between sellers, who supply goods,
            and buyers, who demand them, balancing at a price where the quantity
            supplied equals the quantity demanded. This interplay affects many
            aspects of economics, including interest rates and currency values.
          </p>
        </div>

        <br />
        <div
          className="border-2 border-gray-300 rounded-lg p-4"
          style={{ width: "80%", textAlign: "left" }}
        >
          <h1 className="text-xl font-bold underline">Demand</h1>
          <p>
            Demand describes the <b>desire buyers have for the product </b> that
            is in supply. <br />
            The law of demand states that{" "}
            <b>as price goes up, the quantity demanded goes down,</b> and vice
            versa. Therefore, the demand curve is downward sloping.
          </p>
          <p>
            Now let's see what happens when Demand increases. In the interactive
            tool below, if you type the function <code>addDemand(0.3)</code>,
            what happens to the price?
          </p>
        </div>

        <iframe
          title="supply and demand interactive tool"
          src="http://localhost:5173/sandbox/supply-demand"
          width="80%"
          height="500px"
        ></iframe>
      </center>
    </div>
  );
};
