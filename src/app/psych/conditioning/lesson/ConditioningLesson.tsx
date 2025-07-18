"use client";

import React from "react";
import Lesson from "@/components/Lesson";
import LessonWrapper from "@/components/LessonWrapper";
import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import QuizQuestion from "@/components/QuizQuestion";

// Helper component for custom module placeholders
const CustomModulePlaceholder = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <div className="my-6 rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 p-6 text-center">
    <h4 className="text-lg font-semibold text-gray-700">
      Interactive Module Placeholder: {name}
    </h4>
    <p className="mt-2 text-gray-500">{description}</p>
  </div>
);

export default function ConditioningLesson() {
  const slides = [
    // =================================================================
    // Module 1: Classical Conditioning (The Automatic World)
    // =================================================================

    // Slide 1: The Learning Mystery
    <Block color="green" title="The Learning Mystery">
      <p className="text-xl italic text-gray-700">
        Watch this scenario: Sarah used to love the smell of vanilla candles. But
        after getting food poisoning at a vanilla-scented restaurant, she now
        feels nauseous whenever she smells vanilla - even though the candle had
        nothing to do with her illness.
      </p>
      <br />
      <p>
        What happened to Sarah? How did her brain create this connection? This
        lesson will unlock the mystery by exploring how we learn.
      </p>
      <ColorBox color="gray">
        Visual Idea: A simple two-panel cartoon. Panel 1: A happy person
        smelling a vanilla candle. Panel 2: The same person looking green and
        nauseous while smelling the same candle.
      </ColorBox>
    </Block>,

    // Slide 2: Classical Conditioning Foundation
    <Block color="blue" title="Classical Conditioning Foundation">
      <p>
        <KeyTerm>Classical conditioning</KeyTerm> is associative learning where
        a neutral stimulus becomes associated with a stimulus that naturally
        produces a response.
      </p>
      <h3 className="text-xl font-bold mt-4 mb-2">Key Features:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Involves involuntary, automatic responses</li>
        <li>Creates stimulus-stimulus associations</li>
        <li>
          Timing is critical: the neutral stimulus must come before or at the same
          time as the natural stimulus.
        </li>
      </ul>
      <ColorBox color="gray">
        Visual Idea: A simple diagram showing Pavlov's dog. A picture of food
        with an arrow pointing to a drooling dog. A picture of a bell with an
        arrow pointing to a dog with a neutral expression.
      </ColorBox>
    </Block>,

    // Slide 3: The Five Essential Components
    <Block color="blue" title="The Five Essential Components">
      <p>Every classical conditioning example has exactly five parts:</p>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>
          <Emphasize>Unconditioned Stimulus (UCS):</Emphasize> The natural
          trigger that automatically causes a response. (e.g., Food)
        </li>
        <li>
          <Emphasize>Unconditioned Response (UCR):</Emphasize> The natural,
          automatic response. (e.g., Salivation)
        </li>
        <li>
          <Emphasize>Neutral Stimulus (NS):</Emphasize> Something that initially
          causes no response. (e.g., Bell before conditioning)
        </li>
        <li>
          <Emphasize>Conditioned Stimulus (CS):</Emphasize> The neutral stimulus
          after it's been paired with the UCS. (e.g., Bell after conditioning)
        </li>
        <li>
          <Emphasize>Conditioned Response (CR):</Emphasize> The learned response
          to the conditioned stimulus. (e.g., Salivation to bell)
        </li>
      </ul>
      <CustomModulePlaceholder
        name="ClassicalComponentsIdentifier"
        description="An interactive module where you will label the UCS, UCR, NS, CS, and CR in a new scenario."
      />
    </Block>,

    // Slide 4: Acquisition and Timing
    <Block color="blue" title="The Learning Process: Acquisition and Timing">
      <p>
        <KeyTerm>Acquisition</KeyTerm> is the initial stage when the association
        between the Conditioned Stimulus (CS) and Unconditioned Stimulus (UCS)
        is formed.
      </p>
      <h3 className="text-xl font-bold mt-4 mb-2">Timing Types:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Emphasize>Forward Conditioning:</Emphasize> CS comes before UCS (most
          effective).
        </li>
        <li>
          <Emphasize>Simultaneous Conditioning:</Emphasize> CS and UCS occur at
          the same time (moderately effective).
        </li>
        <li>
          <Emphasize>Backward Conditioning:</Emphasize> CS comes after UCS
          (least effective).
        </li>
      </ul>
      <ColorBox color="gray">
        Visual Idea: A simple line graph titled "Acquisition" showing
        "Strength of CR" on the Y-axis and "Trials (CS + UCS pairings)" on the
        X-axis. The line should curve upwards, then plateau.
      </ColorBox>
    </Block>,

    // Slide 5: Extinction and Spontaneous Recovery
    <Block
      color="blue"
      title="The Learning Process: Extinction and Spontaneous Recovery"
    >
      <p>
        <KeyTerm>Extinction</KeyTerm> is the weakening of a Conditioned Response
        (CR) when the Conditioned Stimulus (CS) is no longer paired with the
        Unconditioned Stimulus (UCS).
      </p>
      <p className="mt-4">
        <KeyTerm>Spontaneous Recovery</KeyTerm> is when, after a rest period
        following extinction, the Conditioned Response (CR) often reappears
        (though usually weaker than before).
      </p>
      <ColorBox color="gray">
        Visual Idea: A multi-phase line graph. The first phase shows the
        Acquisition curve going up. The second phase, labeled "Extinction,"
        shows the curve dropping to zero. The third phase, labeled "Rest
        Period," is a gap. The final phase, "Spontaneous Recovery," shows a
        small bump in the curve.
      </ColorBox>
    </Block>,

    // Slide 6: Generalization and Discrimination
    <Block
      color="blue"
      title="The Learning Process: Generalization and Discrimination"
    >
      <p>
        <KeyTerm>Stimulus Generalization</KeyTerm> is the tendency for stimuli
        similar to the original Conditioned Stimulus (CS) to also trigger the
        Conditioned Response (CR). (e.g., A child bitten by a large brown dog
        may fear all dogs).
      </p>
      <p className="mt-4">
        <KeyTerm>Stimulus Discrimination</KeyTerm> is the ability to respond
        differently to the Conditioned Stimulus (CS) versus other similar
        stimuli.
      </p>
      <ColorBox color="gray">
        Visual Idea: A cartoon of a toddler. In the center, the toddler is
        happy to see their family's pet cat. On one side (Generalization), the
        toddler points excitedly at a lion on TV. On the other side
        (Discrimination), the toddler looks scared of a strange dog.
      </ColorBox>
    </Block>,

    // Slide 7: Higher-Order Conditioning
    <Block color="blue" title="The Learning Process: Higher-Order Conditioning">
      <p>
        <KeyTerm>Higher-Order Conditioning</KeyTerm> involves using an already
        established Conditioned Stimulus (CS) as if it were an Unconditioned
        Stimulus (UCS) to condition a new neutral stimulus.
      </p>
      <ColorBox color="gray">
        Visual Idea: A three-step flowchart. Step 1: Bell (CS1) -{'>'} Salivation.
        Step 2: Light (NS) + Bell (CS1). Step 3: Light (CS2) -{'>'} Salivation.
      </ColorBox>
    </Block>,

    // Slide 8: Pavlov's Accidental Discovery
    <Block color="blue" title="The Pioneer: Pavlov's Accidental Discovery">
      <p>
        Ivan Pavlov was studying digestion in dogs. He unexpectedly noticed that
        dogs began salivating <Emphasize>before</Emphasize> the food arrived -
        when they heard footsteps or saw the person who usually fed them. This
        led to his systematic investigation of these learned associations.
      </p>
      <ColorBox color="gray">
        Visual Idea: A classic, historical-style illustration or photo of Ivan
        Pavlov with his experimental setup and a dog.
      </ColorBox>
    </Block>,

    // Slide 9: Watson and Little Albert
    <Block color="blue" title="The Pioneer: Watson and Little Albert">
      <p>
        John B. Watson proved that human emotions could be conditioned.
        11-month-old Albert was conditioned to fear a white rat by pairing the
        rat with a loud, frightening noise. The fear generalized to similar
        objects, proving that complex emotions could be classically conditioned.
      </p>
      <ColorBox color="gray">
        Visual Idea: A stylized, respectful cartoon representing the
        experiment. A baby looking neutrally at a rat. Then, a "BANG!" sound
        bubble next to the rat. Finally, the baby crying at the sight of the
        rat.
      </ColorBox>
    </Block>,

    // Slide 10: Garcia's Taste Aversion
    <Block color="blue" title="Biological Constraints: Garcia's Taste Aversion">
      <p>
        John Garcia discovered that rats could learn to associate a taste with
        illness even when the illness occurred <Emphasize>hours later</Emphasize>.
        This concept of <KeyTerm>Biological Preparedness</KeyTerm> shows that
        some associations are easier to learn because they have survival value.
      </p>
      <ColorBox color="gray">
        Visual Idea: A cartoon rat happily drinking from a water bottle. Hours
        later, the rat looks sick. In the final panel, the rat sees the water
        bottle again and holds up its paws in a "stop" motion.
      </ColorBox>
    </Block>,

    // Slide 11: Rescorla's Contingency Theory
    <Block color="blue" title="Cognitive Constraints: Rescorla's Contingency Theory">
      <p>
        Robert Rescorla argued that the Neutral Stimulus must reliably{" "}
        <Emphasize>predict</Emphasize> the Unconditioned Stimulus (UCS). Simple
        pairing isn't enough. Learning is strongest when the Conditioned Stimulus
        (CS) provides reliable information, which suggests a cognitive element
        of expectancy.
      </p>
        <ColorBox color="gray">
        Visual Idea: A diagram comparing two groups of rats. Group A: A light
        is ALWAYS followed by a small shock. Group B: A light is sometimes
        followed by a shock, and shocks also happen without the light. Show
        Group A rat cowering at the light, and Group B rat looking confused.
      </ColorBox>
    </Block>,

    // Slide 12: Module 1 Quiz
    <Block color="purple" title="Module 1 Quiz: Classical Conditioning">
      <QuizQuestion
        question="What is the initial stage of linking the Neutral Stimulus and Unconditioned Stimulus called?"
        choices={[
          { text: "Extinction", isCorrect: false, explanation: "Incorrect. Extinction is when the CR weakens because the CS is no longer paired with the UCS." },
          { text: "Discrimination", isCorrect: false, explanation: "Incorrect. Discrimination is the ability to respond differently to the CS versus similar stimuli." },
          { text: "Acquisition", isCorrect: true, explanation: "Correct! Acquisition is the initial learning stage where the NS becomes associated with the UCS to become a CS." },
        ]}
      />
      <QuizQuestion
        question="Pavlov's dogs salivating at the taste of food is an example of a(n)..."
        choices={[
          { text: "Conditioned Response (CR)", isCorrect: false, explanation: "Incorrect. A CR is a learned response to a CS. Salivating to food is natural, not learned." },
          { text: "Unconditioned Response (UCR)", isCorrect: true, explanation: "Correct! An UCR is an automatic, unlearned response to a natural stimulus (UCS)." },
          { text: "Conditioned Stimulus (CS)", isCorrect: false, explanation: "Incorrect. A CS is a previously neutral stimulus that has been paired with a UCS." },
        ]}
      />
      <QuizQuestion
        question="The reappearance of a weakened Conditioned Response (CR) after a pause is called..."
        choices={[
          { text: "Spontaneous Recovery", isCorrect: true, explanation: "Correct! Spontaneous recovery occurs when an extinguished CR temporarily reappears after a rest period." },
          { text: "Stimulus Generalization", isCorrect: false, explanation: "Incorrect. Generalization is when similar stimuli to the CS also trigger the CR." },
          { text: "Acquisition", isCorrect: false, explanation: "Incorrect. Acquisition is the initial learning phase, not the reappearance of a response." },
        ]}
      />
      <QuizQuestion
        question="Which researcher is most associated with demonstrating that emotions can be conditioned?"
        choices={[
          { text: "Ivan Pavlov", isCorrect: false, explanation: "Incorrect. Pavlov's work focused on physiological responses like salivation, not emotions." },
          { text: "John Garcia", isCorrect: false, explanation: "Incorrect. Garcia's work focused on taste aversion learning." },
          { text: "John B. Watson", isCorrect: true, explanation: "Correct! Watson's Little Albert experiment demonstrated that emotional responses like fear could be classically conditioned." },
        ]}
      />
      <QuizQuestion
        question="A person develops a fear of flying after experiencing severe turbulence. A year later, they find they are also anxious on trains and buses. This is an example of:"
        choices={[
          {
            text: "Higher-Order Conditioning",
            isCorrect: false,
            explanation:
              "Incorrect. This would involve pairing a new stimulus with 'flying', not reacting to similar forms of transport.",
          },
          {
            text: "Stimulus Generalization",
            isCorrect: true,
            explanation:
              "Correct. The fear of flying (the original CR) has generalized to other, similar stimuli (other modes of transport).",
          },
          {
            text: "Spontaneous Recovery",
            isCorrect: false,
            explanation:
              "Incorrect. This would involve the fear of flying reappearing after it had been extinguished, not spreading to other situations.",
          },
        ]}
      />
      <QuizQuestion
        question="The fact that it is easier to develop a phobia of snakes than of flowers is best explained by:"
        choices={[
          {
            text: "Rescorla's Contingency Model",
            isCorrect: false,
            explanation:
              "Incorrect. Rescorla's model is about the predictive power of a stimulus, not the type of stimulus itself.",
          },
          {
            text: "Higher-Order Conditioning",
            isCorrect: false,
            explanation:
              "Incorrect. This doesn't explain why some fears are more common or 'natural' than others.",
          },
          {
            text: "Biological Preparedness",
            isCorrect: true,
            explanation:
              "Correct. Garcia's work on taste aversion led to this concept. We are biologically predisposed to learn fears that have evolutionary survival value, like fearing venomous creatures.",
          },
        ]}
      />
      <QuizQuestion
        question="To treat a child's fear of dogs, a therapist advises the parents to present a dog at a distance while the child engages in a fun activity, like playing a video game. This technique is an early step in:"
        choices={[
          {
            text: "Aversion Therapy",
            isCorrect: false,
            explanation:
              "Incorrect. Aversion therapy pairs the stimulus (dog) with an unpleasant stimulus, not a pleasant one.",
          },
          {
            text: "Systematic Desensitization",
            isCorrect: true,
            explanation:
              "Correct. This is a form of counter-conditioning where a feared stimulus is paired with a new, incompatible response (relaxation or enjoyment). Presenting it at a distance is part of the 'gradual exposure' hierarchy.",
          },
          {
            text: "Flooding",
            isCorrect: false,
            explanation:
              "Incorrect. Flooding would involve intense, prolonged exposure to the dog, not gradual exposure paired with a pleasant activity.",
          },
        ]}
      />
    </Block>,

    // =================================================================
    // Module 2: Operant Conditioning (The World of Choice)
    // =================================================================

    // Slide 13: Thorndike's Law of Effect
    <Block color="blue" title="The Foundation: Thorndike's Law of Effect">
      <p>
        Edward Thorndike placed hungry cats in puzzle boxes. He observed that
        cats performed successful escape behaviors faster on later trials because
        they learned from the consequences.
      </p>
      <ColorBox color="blue">
        <Emphasize>The Law of Effect:</Emphasize> "Behaviors followed by
        satisfying consequences are more likely to be repeated. Behaviors
        followed by unsatisfying consequences are less likely to be repeated."
      </ColorBox>
      <ColorBox color="gray">
        Visual Idea: A simple cartoon of a cat in a box looking frustrated. An
        arrow points to a second panel where the cat has pressed a lever, the
        door is open, and it's eating a fish with a happy expression.
      </ColorBox>
    </Block>,

    // Slide 14: Operant Conditioning Foundation
    <Block color="blue" title="Operant Conditioning Foundation">
      <p>
        <KeyTerm>Operant conditioning</KeyTerm> is learning where behavior
        becomes more or less likely based on the consequences that follow it.
      </p>
      <h3 className="text-xl font-bold mt-4 mb-2">Key Features:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Involves voluntary, chosen behaviors</li>
        <li>Creates behavior-consequence associations</li>
        <li>Consequences control future behavior probability</li>
      </ul>
      <ColorBox color="gray">
        Visual Idea: A diagram of a lever. A rat presses the lever (behavior),
        and a food pellet comes out (consequence). An arrow indicates this makes
        the lever-pressing behavior more likely in the future.
      </ColorBox>
    </Block>,

    // Slide 15: B.F. Skinner's Contributions
    <Block color="blue" title="The Architect: B.F. Skinner's Contributions">
      <p>
        B.F. Skinner created the <KeyTerm>operant chamber</KeyTerm> ("Skinner
        box") to study behavior under precisely controlled conditions. He was
        able to discover how different reinforcement patterns affect behavior and
        how behavior can be shaped through{" "}
        <KeyTerm>successive approximations</KeyTerm>.
      </p>
      <ColorBox color="gray">
        Visual Idea: A simplified diagram of a Skinner Box, showing the lever,
        food dispenser, and a light.
      </ColorBox>
    </Block>,

    // Slide 16: The Four-Quadrant System
    <Block color="yellow" title="The Four-Quadrant System of Consequences">
      <p>
        All consequences fit into four categories based on two questions: 1. Are
        you adding a stimulus or removing one? 2. Is the goal to increase or
        decrease behavior?
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-center">
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-bold">Positive Reinforcement</h4>
          <p>Add something pleasant → Behavior increases</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h4 className="font-bold">Positive Punishment</h4>
          <p>Add something unpleasant → Behavior decreases</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-bold">Negative Reinforcement</h4>
          <p>Remove something unpleasant → Behavior increases</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h4 className="font-bold">Negative Punishment</h4>
          <p>Remove something pleasant → Behavior decreases</p>
        </div>
      </div>
      <CustomModulePlaceholder
        name="OperantQuadrantClassifier"
        description="Interactive module where you will classify scenarios into one of the four quadrants."
      />
    </Block>,

    // Slide 17: Reinforcement Schedules
    <Block color="blue" title="The Power of Patterns: Reinforcement Schedules">
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <Emphasize>Fixed Ratio (FR):</Emphasize> Reinforcement after a set
          number of responses.
        </li>
        <li>
          <Emphasize>Variable Ratio (VR):</Emphasize> Reinforcement after an
          unpredictable number of responses.
        </li>
        <li>
          <Emphasize>Fixed Interval (FI):</Emphasize> Reinforcement for the
          first response after a set time period.
        </li>
        <li>
          <Emphasize>Variable Interval (VI):</Emphasize> Reinforcement after
          unpredictable time periods.
        </li>
      </ul>
      <ColorBox color="gray">
        Visual Idea: Four simple icons. Fixed Ratio (FR): A factory worker getting
        paid per piece. Variable Ratio (VR): A slot machine. Fixed Interval (FI): A person
        looking at a calendar for payday. Variable Interval (VI): A person fishing.
      </ColorBox>
    </Block>,

    // Slide 18: Primary vs. Secondary Reinforcers
    <Block
      color="blue"
      title="The Value of Rewards: Primary vs. Secondary Reinforcers"
    >
      <p>
        <KeyTerm>Primary Reinforcers</KeyTerm> are naturally reinforcing because
        they satisfy biological needs (e.g., food, water).
      </p>
      <p className="mt-4">
        <KeyTerm>Secondary Reinforcers</KeyTerm> (or Conditioned Reinforcers)
        gain their power through association with primary reinforcers (e.g.,
        money, grades, praise).
      </p>
      <ColorBox color="gray">
        Visual Idea: A diagram showing money (Secondary Reinforcer) with arrows
        pointing to pictures of a hamburger, a house, and a video game (things
        it can acquire, representing Primary Reinforcers).
      </ColorBox>
    </Block>,

    // Slide 19: Shaping
    <Block color="blue" title="Building Behaviors Step-by-Step: Shaping">
      <p>
        <KeyTerm>Shaping</KeyTerm> is the process of reinforcing successive
        approximations toward a target behavior. You start by reinforcing any
        behavior that resembles the target, and then gradually raise the criteria
        until the final behavior is achieved. This is essential for teaching
        complex skills.
      </p>
      <ColorBox color="gray">
        Visual Idea: A sequence of four cartoon panels showing a dog trainer
        teaching a dog to roll over. 1. Dog gets treat for lying down. 2. Dog
        gets treat for lying on its side. 3. Dog gets treat for rolling onto its
        back. 4. Dog gets treat for a full roll.
      </ColorBox>
    </Block>,

    // Slide 20: Chaining
    <Block color="blue" title="Linking Actions Together: Chaining">
      <p>
        <KeyTerm>Behavioral Chaining</KeyTerm> connects individual behaviors
        into complex sequences. Each behavior serves as a reinforcer for the
        previous step and a cue for the next. The entire chain is often taught
        backward, starting with the final step that receives the ultimate reward.
      </p>
        <ColorBox color="gray">
        Visual Idea: A comic strip of a person brushing their teeth, showing
        each step: picking up toothbrush -{'>'} putting on toothpaste -{'>'} brushing -{'>'}
        rinsing -{'>'} smiling in the mirror.
      </ColorBox>
    </Block>,

    // Slide 21: Module 2 Quiz
    <Block color="purple" title="Module 2 Quiz: Operant Conditioning">
      <QuizQuestion
        question="Which of the following is an example of negative reinforcement?"
        choices={[
          { text: "A mother gives her son praise for doing his homework.", isCorrect: false, explanation: "Incorrect. This is positive reinforcement - adding something pleasant (praise) to increase behavior." },
          { text: "A child loses TV privileges for not cleaning their room.", isCorrect: false, explanation: "Incorrect. This is negative punishment - removing something pleasant (TV) to decrease behavior." },
          { text: "A person fastens their seatbelt to stop the car's annoying beeping sound.", isCorrect: true, explanation: "Correct! This is negative reinforcement because the behavior (fastening seatbelt) increases to remove an unpleasant stimulus (beeping)." },
        ]}
      />
      <QuizQuestion
        question="Getting paid $10 for every 5 shirts you sew is an example of which schedule?"
        choices={[
          { text: "Fixed Ratio (FR)", isCorrect: true, explanation: "Correct! Fixed Ratio schedules deliver reinforcement after a set number of responses (in this case, 5 shirts)." },
          { text: "Variable Ratio (VR)", isCorrect: false, explanation: "Incorrect. VR schedules deliver reinforcement after an unpredictable number of responses." },
          { text: "Fixed Interval (FI)", isCorrect: false, explanation: "Incorrect. FI schedules deliver reinforcement after a set time period, not a set number of responses." },
        ]}
      />
      <QuizQuestion
        question="Money is considered a powerful..."
        choices={[
          { text: "Primary Reinforcer", isCorrect: false, explanation: "Incorrect. Primary reinforcers satisfy biological needs directly (like food or water)." },
          { text: "Secondary Reinforcer", isCorrect: true, explanation: "Correct! Money is a secondary reinforcer because its value is learned through association with primary reinforcers it can buy." },
          { text: "Unconditioned Stimulus (UCS)", isCorrect: false, explanation: "Incorrect. A UCS naturally triggers a response without learning, unlike money which must be learned." },
        ]}
      />
      <QuizQuestion
        question="The process of rewarding behaviors that get closer and closer to a desired final behavior is called:"
        choices={[
          { text: "Chaining", isCorrect: false, explanation: "Incorrect. Chaining links separate behaviors into a sequence, rather than gradually refining one behavior." },
          { text: "Shaping", isCorrect: true, explanation: "Correct! Shaping involves reinforcing successive approximations toward a target behavior." },
          { text: "Generalization", isCorrect: false, explanation: "Incorrect. Generalization is responding similarly to stimuli that resemble the original stimulus." },
        ]}
      />
      <QuizQuestion
        question="A coffee shop gives you a free coffee after you buy 9 coffees. This is an example of a _____ schedule, which typically produces a _____ pattern of responding."
        choices={[
          { text: "Fixed Interval (FI); scalloped", isCorrect: false, explanation: "Incorrect. This is based on the number of responses (coffees bought), not the passage of time."},
          { text: "Fixed Ratio (FR); post-reinforcement pause then high rate", isCorrect: true, explanation: "Correct. The reward is given after a fixed number of responses (9 coffees). People often pause after getting the reward before starting again."},
          { text: "Variable Ratio (VR); high and steady", isCorrect: false, explanation: "Incorrect. The number of coffees is fixed (9), not variable or unpredictable."},
        ]}
      />
       <QuizQuestion
        question="A parent wants to stop their child's tantrums. Every time the child has a tantrum, the parent takes away their favorite toy for an hour. This is an example of:"
        choices={[
          { text: "Positive Punishment", isCorrect: false, explanation: "Incorrect. Positive punishment would involve ADDING an unpleasant stimulus, like extra chores."},
          { text: "Negative Reinforcement", isCorrect: false, explanation: "Incorrect. Negative reinforcement INCREASES a behavior by removing an unpleasant stimulus. Here, the goal is to decrease the tantrums."},
          { text: "Negative Punishment", isCorrect: true, explanation: "Correct. A pleasant stimulus (the toy) is being REMOVED to DECREASE an undesirable behavior (the tantrum)."},
        ]}
      />
      <QuizQuestion
        question="Which schedule of reinforcement is most resistant to extinction and is best for maintaining a behavior long-term?"
        choices={[
          { text: "Fixed Interval (FI)", isCorrect: false, explanation: "Incorrect. Behavior drops off quickly after reinforcement on this schedule."},
          { text: "Variable Ratio (VR)", isCorrect: true, explanation: "Correct. The unpredictability of the reward keeps the subject responding at a high, steady rate, making it very hard to extinguish. This is the principle behind gambling."},
          { text: "Continuous Reinforcement", isCorrect: false, explanation: "Incorrect. Continuous reinforcement leads to the fastest extinction once the reward is stopped."},
        ]}
      />
    </Block>,

    // =================================================================
    // Module 3: Synthesis, Applications & Advanced Topics
    // =================================================================

    // Slide 22: Two Types of Learning Overview
    <Block color="green" title="Two Types of Learning: An Overview">
        <p>As we've seen, learning falls into two main categories:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-center">Type 1: Automatic Responses (Classical)</h4>
                <ul className="list-disc pl-5 mt-2">
                    <li>Happens without thinking</li>
                    <li>Links two stimuli together</li>
                </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-center">Type 2: Chosen Behaviors (Operant)</h4>
                <ul className="list-disc pl-5 mt-2">
                    <li>Happens because of consequences</li>
                    <li>You learn what actions lead to good or bad outcomes</li>
                </ul>
            </div>
        </div>
         <ColorBox color="gray">
            Visual Idea: A brain with two lobes. One lobe is labeled "Classical" with icons of a bell and a lightning bolt linked together. The other lobe is labeled "Operant" with icons of a person choosing a path that leads to either a trophy or a sad face.
        </ColorBox>
    </Block>,

    // Slide 23: Classical vs. Operant Comparison
    <Block color="blue" title="Classical vs. Operant: A Head-to-Head Comparison">
       <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 font-bold">Feature</th>
            <th className="border p-2 font-bold">Classical Conditioning</th>
            <th className="border p-2 font-bold">Operant Conditioning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 font-bold">Behavior</td>
            <td className="border p-2">Involuntary, reflexive</td>
            <td className="border p-2">Voluntary, chosen</td>
          </tr>
          <tr>
            <td className="border p-2 font-bold">Association</td>
            <td className="border p-2">Stimulus-Stimulus</td>
            <td className="border p-2">Behavior-Consequence</td>
          </tr>
        </tbody>
      </table>
    </Block>,

    // Slide 24: Integration in Real Life
    <Block color="blue" title="When Both Types Work Together">
        <p>Complex behaviors often involve both types of conditioning working simultaneously. For example, in test anxiety, the test situation (CS) is classically conditioned to produce fear (CR), while operant conditioning reinforces avoidance behaviors (like not studying) through negative reinforcement (temporary relief from fear).</p>
        <ColorBox color="gray">
            Visual Idea: A flowchart showing the test anxiety example. A box for "Test" leads to "Anxiety" (Classical). A separate arrow from "Anxiety" leads to "Avoids Studying," which then leads to "Anxiety Relief" (Operant).
        </ColorBox>
    </Block>,

    // Slide 25: When Conditioning Goes Wrong
    <Block color="yellow" title="When Conditioning Goes Wrong">
        <h3 className="text-xl font-bold mb-2">Superstitious Behavior</h3>
        <p>Skinner's research showed that accidental reinforcement can create ritualistic, superstitious behaviors in both pigeons and humans.</p>
        <h3 className="text-xl font-bold mt-4 mb-2">Learned Helplessness</h3>
        <p>Research showed that dogs who learned they could not escape shocks would not even try to escape later when it was possible. This model helps explain why people may give up after repeated failures.</p>
        <ColorBox color="gray">
            Visual Idea: A two-panel cartoon. Panel 1: A pigeon doing a strange dance next to a food dispenser, labeled "Superstition." Panel 2: A sad-looking dog lying in a cage with an open door, not leaving, labeled "Learned Helplessness."
        </ColorBox>
    </Block>,

    // Slide 26: Phobia Development and Treatment
    <Block color="yellow" title="Application: Phobia Development and Treatment">
        <p>Phobias are often classically conditioned fears. Treatments like <KeyTerm>Systematic Desensitization</KeyTerm> use conditioning principles to pair the feared stimulus with relaxation, effectively unlearning the fear.</p>
        <ColorBox color="gray">
            Visual Idea: A "fear ladder" for arachnophobia. The bottom rung is a cartoon drawing of a spider. The middle rung is a photo of a spider. The top rung is a person calmly looking at a spider in a tank.
        </ColorBox>
    </Block>,

    // Slide 27: Advertising and Marketing
    <Block color="yellow" title="Application: Advertising and Marketing">
        <p>Brands use classical conditioning by pairing their products (CS) with things that naturally make people feel good, like happy music or attractive people (UCS). The goal is for the brand itself to trigger those positive feelings.</p>
        <ColorBox color="gray">
            Visual Idea: A cartoon of a person watching a TV ad for a soda that features a famous, cool athlete. The next panel shows the person in a store, seeing the soda, and smiling.
        </ColorBox>
    </Block>,

    // Slide 28: Educational Applications
    <Block color="yellow" title="Application: Educational Settings">
        <p><KeyTerm>Token economy systems</KeyTerm> and behavior modification programs use operant conditioning principles, like reinforcement for appropriate behaviors, to manage classrooms and improve learning.</p>
        <ColorBox color="gray">
            Visual Idea: A colorful classroom chart titled "Our Super Stars!" with student names and columns for gold star stickers.
        </ColorBox>
    </Block>,
    
    // Slide 29: Therapeutic Interventions
    <Block color="yellow" title="Application: Therapeutic Interventions">
        <p>Conditioning-based treatments are widespread. <KeyTerm>Aversion Therapy</KeyTerm> pairs an unwanted behavior with an unpleasant stimulus, while <KeyTerm>Contingency Management</KeyTerm> provides clear rewards for desired behaviors in substance abuse treatment.</p>
        <ColorBox color="gray">
            Visual Idea: A split image. On the left, an icon of a cigarette with a "nauseous" green cloud around it (Aversion Therapy). On the right, an icon of a person receiving a voucher or certificate for a positive result (Contingency Management).
        </ColorBox>
    </Block>,

    // Slide 30: Animal Training
    <Block color="yellow" title="Application: Animal Training">
        <p>All modern animal training relies on operant conditioning, primarily positive reinforcement. Shaping is used to teach complex tricks, and chaining links them into routines.</p>
        <ColorBox color="gray">
            Visual Idea: A bright, cheerful cartoon of a dolphin jumping through a hoop and a trainer tossing it a fish.
        </ColorBox>
    </Block>,
    
    // Slide 31: Habit Formation and Self-Control
    <Block color="yellow" title="Application: Habit Formation and Self-Control">
        <p>You can use conditioning to change your own behavior. By identifying the Cue-Routine-Reward loop, you can break bad habits by changing the routine, and build good habits by making cues obvious and rewarding small steps.</p>
        <CustomModulePlaceholder
          name="HabitPlanner"
          description="A simple tool to help you identify the Cue, Routine, and Reward for a habit you want to change."
        />
    </Block>,

    // Slide 32: The Digital Age
    <Block color="yellow" title="Application: The Digital Age">
        <p>Social media and video games are masters of operant conditioning, using variable-ratio reinforcement (unpredictable likes, comments, or loot drops) to create high engagement and resistance to extinction.</p>
        <ColorBox color="gray">
            Visual Idea: An illustration of a smartphone screen with a stream of colorful notification bubbles for likes, comments, and new followers popping up.
        </ColorBox>
    </Block>,

    // Slide 33: Comprehensive Review
    <Block color="green" title="Comprehensive Review">
      <h3 className="text-xl font-bold mb-2">Classical Conditioning Vocabulary</h3>
      <p className="text-sm"><KeyTerm>Unconditioned Stimulus (UCS), Unconditioned Response (UCR), Neutral Stimulus (NS), Conditioned Stimulus (CS), Conditioned Response (CR), Acquisition, Extinction, Spontaneous Recovery, Generalization, Discrimination, Higher-Order Conditioning.</KeyTerm></p>
      <h3 className="text-xl font-bold mt-4 mb-2">Operant Conditioning Vocabulary</h3>
      <p className="text-sm"><KeyTerm>Positive/Negative Reinforcement, Positive/Negative Punishment, Shaping, Chaining, Primary/Secondary Reinforcers, Schedules (FR, VR, FI, VI).</KeyTerm></p>
      <ColorBox color="gray">
        Visual Idea: An icon of an open textbook or a study guide with a magnifying glass over it.
      </ColorBox>
    </Block>

  ];

  return (
    <LessonWrapper>
      <Lesson slides={slides}></Lesson>
    </LessonWrapper>
  );
}