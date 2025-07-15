"use client";
import React, { Children, useState } from "react";
import { useEffect } from "react";
import Block from "@/components/Block";
import Emphasize from "@/components/Emphasize";
import ColorBox from "@/components/ColorBox";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
  Label,
  Legend,
} from "recharts";
import rollinginmoney from "./rollinginmoney.jpg";
import MultiSelectQuizQuestion from "@/components/MultiSelectQuizQuestion";
import TextQuizQuestion from "@/components/TextQuizQuestion";

const Code = ({ children }: { children: React.ReactNode }) => {
  return (
    <code
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    >
      {children}
    </code>
  );
};

const Collapsible = ({
  children,
  ExampleContent,
}: {
  children: React.ReactNode;
  ExampleContent: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleSymbol = isOpen ? "🔼" : "🔽";
  return (
    <div>
      <button onClick={toggle}>
        {children} {toggleSymbol}
      </button>
      {isOpen && (
        <div>
          <p>{ExampleContent}</p>
        </div>
      )}
    </div>
  );
};

const SupplyDemandLesson: React.FC = () => {
  const slides = [
    <Block color="green" title="Introduction">
      <div style={{ position: "relative" }}>
        <div style={{ overflow: "hidden" }}>
          <p>
            Supply and demand is an economic model that{" "}
            <Emphasize>
              shows how the price and quantity of goods and services are
              determined{" "}
            </Emphasize>
            in a market economy.
            <br />
            <br />
            So if YOU were to create your own business, this model would help
            you{" "}
            <Emphasize>
              set the price that will make the most amount of money
            </Emphasize>
            .
            <br />
            <br />
            So let's dive right in!
          </p>
        </div>
        <div style={{ clear: "both", textAlign: "center", marginTop: "2rem" }}>
          <center>
            <img
              src={rollinginmoney.src}
              alt="you after you take this lesson"
              style={{ width: "60%" }}
            />
            <p style={{ marginTop: "1rem", fontSize: "14px" }}>
              This lesson is based off of videos by{" "}
              <a
                style={{ color: "blue", textDecoration: "underline" }}
                href="https://www.youtube.com/@JacobAClifford"
              >
                Jacob Clifford
              </a>
            </p>
          </center>
        </div>
      </div>
    </Block>,
    <Block color="blue" title="Graphs">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Simple_supply_and_demand.svg"
        alt="supply and demand graph"
      />

      <ColorBox color="blue">
        <p>
          <Emphasize>This is the supply and demand graph,</Emphasize>
          <br />
          <br />
          which shows the relationship between the price of a good and the
          quantity. The x-axis is the quantity of the good, and the y-axis is
          the price of the good.
          <br />
          <br />
          The <Emphasize>Demand curve</Emphasize> is the line where it is
          sloping downwards and the <Emphasize>Supply curve</Emphasize> is the
          line where it is sloping upwards.
          <br />
          <br />
          Now let's dig deeper to see why this is the case:
        </p>
      </ColorBox>
    </Block>,

    <Block color="blue" title="Demand">
      <p>
        Demand means how much people want to buy something.
        <br />
        <Emphasize>👉 Example: </Emphasize> If ice cream is cheap on a hot day,
        lots of people want it!{" "}
      </p>
      <ColorBox color="blue">
        <p>
          The law of demand states that{" "}
          <Emphasize>
            as price goes up, the amount that people want to buy
          </Emphasize>{" "}
          (Quantity Demanded) <Emphasize> goes down</Emphasize>, and vice versa.
        </p>
        <div>
          <Emphasize>
            <u>Reasons: </u>
          </Emphasize>
          <ul>
            <li>
              <Collapsible
                ExampleContent={
                  <p style={{ fontSize: "16px" }}>
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                    </Emphasize>{" "}
                    If ice cream is too expensive, they will buy a candy bar
                    instead
                  </p>
                }
              >
                <Emphasize>- Substitution effect: </Emphasize> Consumers switch
                to alternatives.
              </Collapsible>
            </li>
            <li>
              <Collapsible
                ExampleContent={
                  <p style={{ fontSize: "16px" }}>
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                    </Emphasize>{" "}
                    If they have more money to spend, they will get fine dining
                    instead of McDonald's.
                  </p>
                }
              >
                <Emphasize>- Income effect: </Emphasize> Budget constraints
                change purchasing power
              </Collapsible>
            </li>
            <li>
              <Collapsible
                ExampleContent={
                  <p style={{ fontSize: "16px" }}>
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                    </Emphasize>{" "}
                    If they have more and more ice cream, they will be less and
                    less satisfied with each additional ice cream.
                  </p>
                }
              >
                <Emphasize>- Diminishing </Emphasize>
                <a
                  href="https://pincs.stanford.edu/pickcode-dev/econ/marginal-utility/?slide=1"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  marginal utility:
                </a>{" "}
                The satisfaction from buying more of the same thing decreases.{" "}
              </Collapsible>
            </li>
          </ul>
        </div>
      </ColorBox>
      <ColorBox color="purple">
        <p>
          <Emphasize>
            What is the difference between demand and quantity demanded?
          </Emphasize>
        </p>
        <p>
          Demand is the entire relationship between prices and how much people
          want at each price. Quantity demanded is how much people want at one
          particular price.
          <br />
          <br />
          Therefore, the change in demand shifts the{" "}
          <Emphasize>ENTIRE</Emphasize> curve, while the change in quantity
          demanded changes <Emphasize>ALONG</Emphasize> the curve.
        </p>
      </ColorBox>

      <p>So let's try this out in the interactive tool below!</p>
      <br />

      <iframe
        title="supply and demand interactive tool"
        src="https://dev.pickcode.io/lesson/supply-and-demand-lesson-cmce1y3ab02zmk3y1a39dulwh-2025-07-09-01-22-14"
        width="100%"
        height="650px"
      ></iframe>
      <ColorBox color="purple">
        As you can see, changes in price{" "}
        <Emphasize>moves along the curve</Emphasize>
      </ColorBox>
      <ColorBox color="blue">
        <p>
          <Emphasize>👉 Check in: </Emphasize>
        </p>
        <QuizQuestion
          question="As price falls, what happens to the quantity demanded?"
          choices={[
            {
              text: "Quantity demanded stays the same",
              isCorrect: false,
              explanation:
                "Oops! Try running the tool again! What do you notice?",
            },
            {
              text: "Quantity demanded goes down",
              isCorrect: false,
              explanation:
                "Oops! Try running the tool again! What do you notice?",
            },
            {
              text: "Quantity demanded goes up",
              isCorrect: true,
              explanation: "Correct!",
            },
            {
              text: "Quantity demanded goes up and down",
              isCorrect: false,
              explanation:
                "Oops! Try running the tool again! What do you notice?",
            },
          ]}
        ></QuizQuestion>
      </ColorBox>
    </Block>,

    <Block color="blue" title="Demand">
      <ColorBox color="yellow">
        <ul>
          <li>
            <Emphasize>Demand Shifters</Emphasize>
          </li>
          <li>
            <Collapsible
              ExampleContent={
                <p>
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                  </Emphasize>{" "}
                  If the weather is hot, people will want to buy more ice cream.{" "}
                  <br />{" "}
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Notice:{" "}
                  </Emphasize>{" "}
                  The price of ice cream stays the same. Some other outside
                  factor is causing the shift <br />
                  <br />
                </p>
              }
            >
              - Consumer Preferences
            </Collapsible>
          </li>
          <li>
            <Collapsible
              ExampleContent={
                <p>
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                  </Emphasize>{" "}
                  If there are more people buying something, the demand for that
                  thing goes up. <br />{" "}
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Notice:{" "}
                  </Emphasize>{" "}
                  The price of ice cream stays the same. Some other outside
                  factor is causing the shift <br />
                  <br />
                </p>
              }
            >
              - Number of Buyers
            </Collapsible>
          </li>
          <li>
            <Collapsible
              ExampleContent={
                <p>
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                  </Emphasize>{" "}
                  Cones and Ice Cream are <Emphasize>compliments</Emphasize>, so
                  if the price of ice cream cones go up, the cost of ice cream
                  goes up, meaning less people will buy ice cream. <br />
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                  </Emphasize>{" "}
                  Candy bars and ice cream are{" "}
                  <Emphasize>substitutes</Emphasize>, so if less people buy
                  candy bars, more people will buy ice cream. <br />
                  <br />
                </p>
              }
            >
              - Prices of Related Goods (substitutes/complements)
            </Collapsible>
          </li>
          <li>
            <Collapsible
              ExampleContent={
                <p>
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Normal goods:{" "}
                  </Emphasize>{" "}
                  things people buy more of when they have more money (e.g.
                  Jewlery) <br />
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Inferior goods:{" "}
                  </Emphasize>{" "}
                  things people buy less of when they have more money (e.g.
                  McDonald's) <br /> <br />
                  <Emphasize>👉 Therefore:</Emphasize> When people's income go
                  down, they will buy less of normal goods and more of inferior
                  goods (and vice versa)
                  <br />
                  <br />
                </p>
              }
            >
              - Income (normal vs. inferior goods)
            </Collapsible>
          </li>
          <li>
            <Collapsible
              ExampleContent={
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <Emphasize>Definition:</Emphasize> If people expect the price
                  of something to go up, they will buy more of it now. <br />
                  <br />
                  <Emphasize>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:
                  </Emphasize>{" "}
                  If people expect the price of toilet paper to go up, they will
                  stock up on it before it does. (This happened during the COVID
                  Pandemic)
                  <br /> <br />
                </p>
              }
            >
              - Expectations (future price anticipation)
            </Collapsible>
          </li>
        </ul>
      </ColorBox>
      <ColorBox color="purple">
        <Emphasize>👉 Check in: </Emphasize>
        <TextQuizQuestion
          question={
            <>
              What happens to the price of Computers when the quantity of chips
              go down? (Hint: use the tool below and see if it adds or removes
              Demand)
              <br />
              <br />
              Price will _____
            </>
          }
          placeholder="e.g. increase, decrease, no change"
          pattern="^increase$"
        />
      </ColorBox>

      <iframe
        title="supply and demand interactive tool"
        src="https://dev.pickcode.io/lesson/demand-shift-lesson-cmce1y3ab02zmk3y1a39dulwh-2025-07-10-01-38-58"
        width="100%"
        height="450px"
      ></iframe>
      <ColorBox color="purple">
        <p>
          <Emphasize>👉 Takeaway: </Emphasize>
        </p>
        <TextQuizQuestion
          placeholder="e.g. right, left, up, down, no change"
          question={
            <>
              What happens to the graph when you add Demand?
              <br />
              <br />
              The graph shifts to the _____
            </>
          }
          pattern="^right"
        />
      </ColorBox>
    </Block>,

    <Block color="green" title="Supply">
      <ColorBox color="green">
        Supply means the number of products that a producer/seller can provide
        to buyers <br />
      </ColorBox>

      <p>
        The law of supply states that{" "}
        <Emphasize>as price goes up, sellers want to sell more of</Emphasize>{" "}
        the same thing, and vice versa. In other words, the Quantity Supplied
        goes up.
      </p>
      <ColorBox color="blue">
        <Emphasize>To put it simply:</Emphasize>
        <p>
          If price is low, producers won't want to make more of it because they
          won't make much money (try <Code>setPrice(0.5)</Code> and{" "}
          <Code>setQuantity(0.5)</Code> ) in the tool below <br />
          <br />
          If price is high, producers want to make more of it to make more money
          (try <Code>setPrice(1.5)</Code> and <Code>setQuantity(1.5)</Code> ) in
          the tool below <br />
        </p>
      </ColorBox>
      <br />
      <br />
      <iframe
        title="supply and demand interactive tool"
        src="https://dev.pickcode.io/lesson/tool-itself-lesson-cmce1y3ab02zmk3y1a39dulwh-2025-07-10-05-43-49"
        width="100%"
        height="450px"
      ></iframe>
    </Block>,

    <Block color="green" title="Supply Shifters">
      <ColorBox color="green">
        <div>
          <ul>
            <li>
              <Emphasize>Supply Shifters</Emphasize>
            </li>
            <li>
              <Collapsible
                ExampleContent={
                  <p>
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                    </Emphasize>{" "}
                    If the cost of potatoes go up, that will cause the supply of
                    french fries to go down. <br />
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Notice:
                    </Emphasize>{" "}
                    A decrease in supply will shift the supply curve to the
                    left.
                    <br /> <br />
                  </p>
                }
              >
                Input Prices (cost of raw materials).
              </Collapsible>
            </li>
            <li>
              <Collapsible
                ExampleContent={
                  <p>
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                    </Emphasize>{" "}
                    If there are machines that make french fries faster and
                    cheaper, it would cause the supply of french fries to go up.
                    <br />
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Notice:
                    </Emphasize>{" "}
                    An increase in supply will shift the supply curve to the
                    right. <br /> <br />
                  </p>
                }
              >
                Technology (production efficiency)
              </Collapsible>
            </li>
            <li>
              <Collapsible
                ExampleContent={
                  <p>
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                    </Emphasize>{" "}
                    If there are more french fry sellers, it would cause the
                    supply of french fries to go up. <br />
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:
                    </Emphasize>{" "}
                    If there are less french fry sellers, it would cause the
                    supply of french fries to go down. <br /> <br />
                  </p>
                }
              >
                Number of Sellers.
              </Collapsible>
            </li>
            <li>
              <Collapsible
                ExampleContent={
                  <p>
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                    </Emphasize>{" "}
                    If people expect the price of french fries to go up, they
                    will hold back on selling them now and wait for the price to
                    go up. <br />
                    <br />
                  </p>
                }
              >
                Expectations (future price expectations).
              </Collapsible>
            </li>
            <li>
              <Collapsible
                ExampleContent={
                  <p>
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:{" "}
                    </Emphasize>{" "}
                    If the government gives a subsidy (money to make things
                    cheaper) to french fry producers, it would cause the supply
                    of french fries to go up.
                    <br />
                    <Emphasize>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;👉 Example:
                    </Emphasize>{" "}
                    If the government taxes french fry producers, it would cause
                    the supply of french fries to go down. <br /> <br />
                  </p>
                }
              >
                Government Policies (taxes, subsidies).
              </Collapsible>
            </li>
          </ul>
        </div>
      </ColorBox>
      <ColorBox color="yellow">
        <p>
          <Emphasize>👉 Notice: </Emphasize>The change of price is not on this
          list, because price moves <Emphasize>ALONG</Emphasize> the curve,
          while outside factors <Emphasize>SHIFT</Emphasize> the ENTIRE curve.
        </p>
      </ColorBox>
      <ColorBox color="purple">
        <p>
          <Emphasize>👉 Check in: </Emphasize>
        </p>
        <TextQuizQuestion
          question={
            <>
              Using the tool below, what might happen to the price of concert
              tickets, if a big company decides to buy out other ticket
              providers?
              <br />
              <br />
              Price will _____
            </>
          }
          placeholder="e.g. increase, decrease, no change"
          pattern="^increase$"
        />
      </ColorBox>
      <iframe
        src="https://dev.pickcode.io/lesson/supply-lesson-cmce1y3ab02zmk3y1a39dulwh-2025-07-15-12-46-43"
        width="100%"
        height="450px"
      ></iframe>
    </Block>,

    <Block color="purple" title="Equilibrium">
      <ColorBox color="yellow">
        When supply and demand meet, this is the{" "}
        <Emphasize>equilibrium point </Emphasize>. This is where the quantity
        supplied and quantity demanded are equal.
        <br />
        <br />
        If not, this is called <Emphasize>disequilibrium</Emphasize>.
      </ColorBox>

      <ColorBox color="purple">
        <div>
          There are 2 types of disequilibrium:
          <ul>
            <li>
              <Emphasize>Shortage:</Emphasize> When the quantity demanded is{" "}
              <u>greater</u> than the quantity supplied.
            </li>
            <li>
              <Emphasize>Surplus:</Emphasize> When the quantity demanded is{" "}
              <u>less</u> than the quantity supplied.
            </li>
          </ul>
        </div>
      </ColorBox>
      <p>
        Using the interactive tool below, try to code the equilibrium point,
        shortage, and surplus with the <Code>setPrice</Code> and{" "}
        <Code>setQuantity</Code> and <Code>draw()</Code> functions.
      </p>
      <iframe
        title="supply and demand interactive tool"
        src="https://dev.pickcode.io/lesson/tool-itself-lesson-cmce1y3ab02zmk3y1a39dulwh-2025-07-10-05-43-49"
        width="100%"
        height="450px"
      ></iframe>

      <ColorBox color="blue">
        <p>
          <Emphasize>👉 Check in: </Emphasize>
          <br />
          <TextQuizQuestion
            placeholder="e.g. (0.3, 1.5)"
            question="What is the equilibrium point?"
            pattern={`^(1,1)`}
          />
          <br />
          <TextQuizQuestion
            placeholder="e.g. (0.5, 0.8), (0.3, 1.5)"
            question="What were the two points of the shortage? (to make things simple, make sure one of your values is 1.5)"
            pattern="^(0.5, 1.5),(1.5, 1.5) $"
          />
          <br />
          <TextQuizQuestion
            placeholder="e.g. (0.5, 0.8), (0.3, 1.5)"
            question="What were the two points of the surplus? (to make things simple, make sure one of your values is 0.5)"
            pattern={`^(0.5, 0.5),(1.5, 0.5) `}
          />
        </p>
      </ColorBox>
    </Block>,
    <Block color="yellow" title="Review">
      <Block color="green" title="Question 1">
        <QuizQuestion
          question="Land in the United States can be used to produce either soybeans or corn. The price of soybean fertilizer has fallen due to cheaper imports from Ghana. What will change for soybeans and corn?"
          choices={[
            {
              text: "Supply of both corn and soybeans will increase",
              isCorrect: true,
              explanation: "",
            },
            {
              text: "Supply of soybeans will decrease and supply of corn will increase",
              isCorrect: false,
              explanation: "",
            },
            {
              text: "Supply of soybeans will increase and the supply of corn will decrease",
              isCorrect: false,
              explanation: "",
            },
            {
              text: "Quantity supplied of corn and quantity supplied of soybeans will both increase",
              isCorrect: false,
              explanation: "",
            },
            {
              text: "Quantity supplied of corn and quantity supplied of soybeans will both decrease",
              isCorrect: false,
              explanation: "",
            },
          ]}
        ></QuizQuestion>
      </Block>

      <Block color="blue" title="Question 2">
        <MultiSelectQuizQuestion
          question="If there is a groundbreaking study that shows that eating french fries is good for you, what will happen? (select all that apply)"
          choices={[
            {
              text: "The price of french fries will increase",
              isCorrect: true,
              explanation: "",
            },
            {
              text: "The price of french fries will decrease",
              isCorrect: false,
              explanation: "",
            },
            {
              text: "The quantity will increase",
              isCorrect: true,
              explanation: "",
            },
            {
              text: "The quantity will decrease",
              isCorrect: false,
              explanation: "",
            },
            {
              text: "The demand will increase",
              isCorrect: true,
              explanation: "",
            },
            {
              text: "The demand will decrease",
              isCorrect: false,
              explanation: "",
            },
          ]}
        ></MultiSelectQuizQuestion>
      </Block>

      <Block color="purple" title="Question 3">
        <TextQuizQuestion
          question={
            <>
              If there is a groundbreaking new technology that makes french
              fries cheaper to produce, <br />
              <br /> the price of french fries will:{" "}
            </>
          }
          placeholder="e.g. increase/decrease/stay the same"
          pattern={`decrease`}
        />
        <TextQuizQuestion
          question="The quantity of french fries will:"
          placeholder="e.g. increase/decrease/stay the same"
          pattern={`increase`}
        />
      </Block>
      <Block color="green" title="Question 4">
        <QuizQuestion
          question="If the price of french fries goes up, what happens on the supply and demand graph?"
          choices={[
            {
              text: "The entire supply or demand curve will shift.",
              isCorrect: false,
              explanation:
                "No, only outside factors (not price) shift the entire curve.",
            },
            {
              text: "Our point on the supply and demand graph will move along the curve.",
              isCorrect: true,
              explanation:
                "Correct! A change in price moves the point along the curve, not the curve itself.",
            },
            {
              text: "The graph will disappear.",
              isCorrect: false,
              explanation: "No, the graph remains; only the point moves.",
            },
          ]}
        />
      </Block>
    </Block>,
    <Block color="yellow" title="Conclusion">
      <p>
        In this lesson, we learned about the supply and demand model and how to
        use it to set the best price to make the most money.
        <br />
        <br />
        <ColorBox color="green">
          <Emphasize>
            Here are some questions to ponder about as you continue your Econ
            journey:
          </Emphasize>
          <br />
          - Can you create a situation where price stays the same but quantity
          increases?
          <br />
          - Is it possible to shift both curves and keep the equilibrium
          unchanged?
          <br />
          - Can you create a situation where price goes up and quantity goes
          down?
          <br />
        </ColorBox>
        <br />
        <p>
          Thinking about these questions will help you understand not only the
          supply and demand model, but also the real world.
        </p>
      </p>
    </Block>,
  ];
  return <Lesson slides={slides}></Lesson>;
};

export default SupplyDemandLesson;
