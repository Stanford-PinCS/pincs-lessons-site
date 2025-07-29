"use client";
import ColorBox from "@/components/ColorBox";
import React, { useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";

interface StepData {
  title: string;
  explanation: string;
}

const stepsData: StepData[] = [
  {
    title: "Step 1 of 5: Our Data",
    explanation:
      "Suppose we have the data below. We have some words that a character says to you and some words that you say in response, but right now our data are disorganized. We want to find a way we can structure these data so we can easily create a dialogue and the computer can easily read it.",
  },
  {
    title: "Step 2 of 5: Adding Flow Structure",
    explanation:
      "If we add arrows, we suddenly start to see how we organize our data. This is a great approach for representing our paths! Each message points to the responses that can follow and each response points to the message that follows.",
  },
  {
    title: "Step 3 of 5: 'Infinite Copy' Problem & Solution",
    explanation: `However, how would we handle a repeating scene? If the player wants to keep going back in a menu or asks a question over and over, how could we store that data without wasting space (or needing to have an infinitely long path)? We're going to want to name each scene with a "key," which we can use to access it. Then, when we want to go to the scene, we can use the "key" to get back to that scene. This method of using "keys" allows us to have a singular scene that multiple choices can access with the key. Now we have the tools to store very complicated scenes and dialogues!`,
  },
  {
    title: "Step 4 of 5: The Object-Based Structure",
    explanation: `But how exactly do we store it in a computer? We're going to want to break it up into simple "objects" (meaning data that we group together) and combine those objects to make our overall data structure. See how we can use a "Scene Object" (green) and a "Choice Object" (orange) to represent the diagram from Step 2.`,
  },
  {
    title: "Step 5 of 5: Final Data Structure",
    explanation: `This is how it would look typed out. We define an "Object" that holds all of our scenes. We put the "key" of each scene to the left of a colon and its value (the "Scene Object") to the right of the colon. Then, each "Scene Object" is made of a message and a list of choices, so we put those as key-value pairs with the key names of "message" and "choices." Finally, to define our "Choice Objects," we define a "response" and "nextScene" where the nextScene has the key to the next scene. That's it! Move onto the next slide to have fun modifying the data.`,
  },
];

const MessageBox = ({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    id={id}
    className={`flex items-center justify-center p-4 rounded-lg bg-blue-100 border-2 border-blue-500 text-blue-900 text-center shadow-md ${className}`}
  >
    <p className="font-sans font-medium">{children}</p>
  </div>
);

const ChoiceBox = ({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    id={id}
    className={`flex items-center justify-center p-3 rounded-md bg-orange-100 border-2 border-orange-500 text-orange-800 text-center shadow ${className}`}
  >
    <p className="font-sans text-sm">{children}</p>
  </div>
);

type StepProps = {
  isVisible: boolean;
};

const Step1: React.FC<StepProps> = ({ isVisible }) => (
  <div
    className={`w-full h-full p-12 flex flex-col justify-around ${
      isVisible ? "flex" : "hidden"
    }`}
  >
    <div className="flex justify-around items-center">
      <MessageBox id="s1_msg1" className="w-1/4 -rotate-12">
        Hello traveler, what brings you here?
      </MessageBox>
      <ChoiceBox
        id="s1_choice1"
        className="w-1/5 rotate-12 translate-y-[-2rem]"
      >
        I'm looking for the magic sword.
      </ChoiceBox>
    </div>
    <div className="flex justify-center items-center">
      <ChoiceBox id="s1_choice2" className="w-1/6 -rotate-6">
        Just passing through.
      </ChoiceBox>
    </div>
    <div className="flex justify-around items-center">
      <MessageBox id="s1_msg3" className="w-1/5 rotate-3">
        Safe travels, adventurer!
      </MessageBox>
      <MessageBox id="s1_msg2" className="w-1/4 rotate-6 -translate-y-4">
        Ah, the legendary blade!
      </MessageBox>
    </div>
  </div>
);

const Step2: React.FC<StepProps> = ({ isVisible }) => (
  <div
    className={`w-full h-full p-8 flex flex-col items-center justify-center gap-16 ${
      isVisible ? "flex" : "hidden"
    }`}
  >
    <MessageBox id="s2_msg1" className="w-1/3">
      Hello traveler, what brings you here?
    </MessageBox>
    <div className="flex w-full justify-around">
      <ChoiceBox id="s2_choice1" className="w-1/4">
        I'm looking for the magic sword.
      </ChoiceBox>
      <ChoiceBox id="s2_choice2" className="w-1/5">
        Just passing through.
      </ChoiceBox>
    </div>
    <div className="flex w-full justify-around">
      <MessageBox id="s2_msg2" className="w-1/4">
        Ah, the legendary blade!
      </MessageBox>
      <MessageBox id="s2_msg3" className="w-1/5">
        Safe travels, adventurer!
      </MessageBox>
    </div>
    {isVisible && (
      <>
        <Xarrow
          start="s2_msg1"
          end="s2_choice1"
          path="grid"
          endAnchor="top"
          startAnchor="bottom"
          color="#6b7280"
          strokeWidth={2}
          headSize={5}
        />
        <Xarrow
          start="s2_msg1"
          end="s2_choice2"
          path="grid"
          endAnchor="top"
          startAnchor="bottom"
          color="#6b7280"
          strokeWidth={2}
          headSize={5}
        />
        <Xarrow
          start="s2_choice1"
          end="s2_msg2"
          path="grid"
          endAnchor="top"
          startAnchor="bottom"
          color="#6b7280"
          strokeWidth={2}
          headSize={5}
        />
        <Xarrow
          start="s2_choice2"
          end="s2_msg3"
          path="grid"
          endAnchor="top"
          startAnchor="bottom"
          color="#6b7280"
          strokeWidth={2}
          headSize={5}
        />
      </>
    )}
  </div>
);

const InfiniteCopyItem = ({ id }: { id: number }) => (
  <div className="flex flex-col items-center gap-2">
    <MessageBox id={`s3_msg_copy${id}`} className="text-sm">
      Florence was founded in 59 BC.
    </MessageBox>
    <ChoiceBox id={`s3_choice_copy${id}`}>What date did you say?</ChoiceBox>
  </div>
);

const Step3: React.FC<StepProps> = ({ isVisible }) => (
  <div
    className={`w-full h-full p-6 flex flex-col gap-6 justify-center ${
      isVisible ? "flex" : "hidden"
    }`}
  >
    <div className="w-full rounded-lg bg-red-50 border-2 border-red-400 p-4">
      <p className="text-center font-sans text-xl text-red-600 font-bold mb-4">
        Problem: Infinite Nested Copies
      </p>
      <div className="flex items-center justify-center gap-8">
        {[1, 2, 3].map((id) => (
          <InfiniteCopyItem key={id} id={id} />
        ))}
        <p className="font-sans text-5xl text-red-500 font-bold">...</p>
      </div>
    </div>
    <div className="w-full rounded-lg bg-green-50 border-2 border-green-500 p-4">
      <p className="text-center font-sans text-xl text-green-700 font-bold mb-4">
        Solution: A Single Scene with a Reference
      </p>
      <div className="flex items-center justify-center">
        <div
          id="s3_solution_scene"
          className="w-1/3 border-4 border-green-600 border-dashed rounded-xl p-4 flex flex-col items-center gap-2"
        >
          <p className="text-center font-sans text-base text-green-600 font-bold">
            florenceDateScene
          </p>
          <MessageBox id="s3_solution_msg" className="w-full mb-10">
            Florence was founded in 59 BC.
          </MessageBox>
          <ChoiceBox id="s3_solution_choice" className="w-3/4">
            What date did you say?
          </ChoiceBox>
        </div>
      </div>
    </div>
    {isVisible && (
      <>
        <Xarrow
          start="s3_choice_copy1"
          end="s3_msg_copy2"
          color="#6b7280"
          strokeWidth={2}
          headSize={5}
        />
        <Xarrow
          start="s3_choice_copy2"
          end="s3_msg_copy3"
          color="#6b7280"
          strokeWidth={2}
          headSize={5}
        />
        <Xarrow
          start="s3_solution_choice"
          end="s3_solution_msg"
          path="smooth"
          startAnchor="top"
          endAnchor="bottom"
          showTail={true}
          color="#ef4444"
          strokeWidth={3}
        />
      </>
    )}
  </div>
);

const Step4: React.FC<StepProps> = ({ isVisible }) => (
  <div
    className={`w-full h-full p-8 flex flex-col items-center justify-center gap-12 ${
      isVisible ? "flex" : "hidden"
    }`}
  >
    <div className="w-2/3 border-4 border-green-500 border-dashed rounded-xl p-4 flex flex-col items-center gap-6">
      <p className="font-sans text-lg text-green-500 font-bold">Scene Object</p>
      <MessageBox id="s4_msg" className="w-3/4">
        Hello traveler, what brings you here?
      </MessageBox>
      <div className="w-full flex justify-around">
        <div
          id="s4_choice_obj1"
          className="w-2/5 border-4 border-orange-500 border-dashed rounded-xl p-2 flex flex-col justify-center items-center gap-1"
        >
          <p className="font-sans text-base text-orange-500 font-bold">
            Choice Object
          </p>
          <p className="font-sans text-base text-orange-800 mt-1">
            Looking for sword.
          </p>
          <p className="ml-9 font-sans text-sm italic text-gray-600">
            → nextScene: "swordScene"
          </p>
        </div>
        <div
          id="s4_choice_obj2"
          className="w-2/5 border-4 border-orange-500 border-dashed rounded-xl p-2 flex flex-col justify-center items-center gap-1"
        >
          <p className="font-sans text-base text-orange-500 font-bold">
            Choice Object
          </p>
          <p className="font-sans text-base text-orange-800 mt-1">
            Just passing through.
          </p>
          <p className="ml-9 font-sans text-sm italic text-gray-600">
            → nextScene: "farewellScene"
          </p>
        </div>
      </div>
    </div>
    <div className="w-full flex justify-around">
      <div
        id="s4_sword_scene"
        className="w-1/3 border-4 border-green-500 border-dashed rounded-xl p-4 flex flex-col justify-center items-center gap-2"
      >
        <p className="font-sans text-lg text-green-500 font-bold">swordScene</p>
        <p className="text-center font-sans text-base text-blue-900">
          Ah, the legendary blade!
        </p>
      </div>
      <div
        id="s4_farewell_scene"
        className="w-1/3 border-4 border-green-500 border-dashed rounded-xl p-4 flex flex-col justify-center items-center gap-2"
      >
        <p className="font-sans text-lg text-green-500 font-bold">
          farewellScene
        </p>
        <p className="text-center font-sans text-base text-blue-900">
          Safe travels, adventurer!
        </p>
      </div>
    </div>
    {isVisible && (
      <>
        <Xarrow
          start="s4_choice_obj1"
          end="s4_sword_scene"
          dashness={true}
          color="#6b7280"
          strokeWidth={2}
          headSize={5}
        />
        <Xarrow
          start="s4_choice_obj2"
          end="s4_farewell_scene"
          dashness={true}
          color="#6b7280"
          strokeWidth={2}
          headSize={5}
        />
      </>
    )}
  </div>
);

const Step5: React.FC<StepProps> = ({ isVisible }) => (
  <div
    className={`w-full h-full p-6 flex items-center justify-center ${
      isVisible ? "flex" : "hidden"
    }`}
  >
    <div className="w-full h-full rounded-lg bg-slate-800 border-2 border-green-500 p-6 flex justify-around items-center gap-6">
      <pre className="text-white text-base leading-relaxed flex-grow h-full overflow-auto">
        <code>
          <span className="text-orange-400">const </span>
          <span className="text-cyan-400">scenes</span>
          <span className="text-white"> = {"{"}</span>
          <br />
          {"  "}
          <span className="text-yellow-300">start</span>
          <span className="text-white">: {"{"}</span>
          <br />
          {"    "}
          <span className="text-cyan-400">message</span>
          <span className="text-white">: </span>
          <span className="text-green-400">
            "Hello traveler, what brings you here?"
          </span>
          <span className="text-white">,</span>
          <br />
          {"    "}
          <span className="text-cyan-400">choices</span>
          <span className="text-white">: [</span>
          <br />
          {"      "}
          <span className="text-white">{"{"}</span>
          <br />
          {"        "}
          <span className="text-cyan-400">response</span>
          <span className="text-white">: </span>
          <span className="text-green-400">
            "I'm looking for the magic sword."
          </span>
          <span className="text-white">,</span>
          <br />
          {"        "}
          <span className="text-cyan-400">nextScene</span>
          <span className="text-white">: </span>
          <span className="text-yellow-300">"swordInfo"</span>
          <span className="text-white">,</span>
          <br />
          {"      "}
          <span className="text-white">{"}"},</span>
          <br />
          {"      "}
          <span className="text-white">{"{"}</span>
          <br />
          {"        "}
          <span className="text-cyan-400">response</span>
          <span className="text-white">: </span>
          <span className="text-green-400">"Just passing through."</span>
          <span className="text-white">,</span>
          <br />
          {"        "}
          <span className="text-cyan-400">nextScene</span>
          <span className="text-white">: </span>
          <span className="text-yellow-300">"farewell"</span>
          <span className="text-white">,</span>
          <br />
          {"      "}
          <span className="text-white">{"}"},</span>
          <br />
          {"    "}
          <span className="text-white">]</span>
          <br />
          {"  "}
          <span className="text-white">{"}"},</span>
          <br />
          <br />
          {"  "}
          <span className="text-yellow-300">swordInfo</span>
          <span className="text-white">
            : {"{"} ... {"}"},
          </span>
          <br />
          {"  "}
          <span className="text-yellow-300">farewell</span>
          <span className="text-white">
            : {"{"} ... {"}"},
          </span>
          <br />
          <span className="text-white">{"}"};</span>
        </code>
      </pre>
      <div className="w-7/20 h-2/3 bg-slate-900/70 border border-green-400 rounded-lg p-6 flex flex-col justify-center gap-4">
        <p className="text-center font-sans text-xl text-green-400 font-bold">
          Syntax Notes
        </p>
        <p className="font-sans text-lg text-white">
          Every Object is defined inside curly brackets: {`{ key: value }`}.
        </p>
        <p className="font-sans text-lg text-white">
          The list of objects is defined inside square brackets:{" "}
          {`[item1, item2]`}.
        </p>
        <p className="font-sans text-lg text-white">
          The keys do not have spaces and values are put in quotes: "message".
        </p>
      </div>
    </div>
  </div>
);

const RPGDataAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const buttonBaseClasses =
    "bg-blue-500 text-white border-none py-3 px-6 mx-2 rounded-full cursor-pointer text-base font-semibold transition-all duration-300 ease-in-out shadow-lg";
  const buttonHoverClasses = "hover:-translate-y-0.5 hover:shadow-xl";
  const buttonDisabledClasses =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg";

  return (
    <main className="space-y-4">
      <div className="text-center my-5 flex flex-col sm:flex-row flex-wrap justify-between gap-2">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
        >
          ← Previous
        </button>
        <div className="self-center text-center text-xl font-semibold text-blue-500">
          {stepsData[currentStep].title}
        </div>
        <button
          onClick={handleNext}
          disabled={currentStep === stepsData.length - 1}
          className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
        >
          Next →
        </button>
      </div>

      <ColorBox color="blue">{stepsData[currentStep].explanation}</ColorBox>

      {/* The main container now lets its content define its height */}
      <div className="relative w-full border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
        <Xwrapper>
          {/* Each Step component now controls its own layout and visibility */}
          <Step1 isVisible={currentStep === 0} />
          <Step2 isVisible={currentStep === 1} />
          <Step3 isVisible={currentStep === 2} />
          <Step4 isVisible={currentStep === 3} />
          <Step5 isVisible={currentStep === 4} />
        </Xwrapper>
      </div>
    </main>
  );
};

export default RPGDataAnimation;
