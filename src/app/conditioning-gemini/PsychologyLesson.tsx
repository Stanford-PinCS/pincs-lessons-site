import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";
import Slide from "@/components/Slide";

export default function PsychologyLesson() {
  const slides = [
    // Slide 1: The Learning Mystery
    <Slide>
      <Block color="yellow" title="The Learning Mystery">
        <p>
          Watch this scenario: Sarah used to love the smell of vanilla candles.
          But after getting food poisoning at a vanilla-scented restaurant, she
          now feels nauseous whenever she smells vanilla - even though the
          candle had nothing to do with her illness.
        </p>
        <p>
          <Emphasize>What happened to Sarah?</Emphasize> How did her brain
          create this connection?
        </p>
      </Block>
    </Slide>,

    // Slide 2: Two Types of Learning
    <Slide>
      <Block color="blue" title="Two Types of Learning">
        <p>
          Psychologists have discovered that all learning falls into two main
          categories:
        </p>
        <ColorBox color="blue">
          <p>
            <Emphasize>Type 1: Automatic Responses</Emphasize>
          </p>
          <ul>
            <li>Happens without thinking</li>
            <li>Links two things together in your mind</li>
            <li>
              Example: Hearing your alarm clock makes you feel stressed
            </li>
          </ul>
        </ColorBox>
        <ColorBox color="green">
          <p>
            <Emphasize>Type 2: Chosen Behaviors</Emphasize>
          </p>
          <ul>
            <li>Happens because of consequences</li>
            <li>You learn what actions lead to good or bad outcomes</li>
            <li>Example: Studying hard because you get good grades</li>
          </ul>
        </ColorBox>
      </Block>
    </Slide>,

    // Slide 3: Classical Conditioning Foundation
    <Slide>
      <Block color="blue" title="Classical Conditioning Foundation">
        <p>
          <KeyTerm>Definition:</KeyTerm> Classical conditioning is associative
          learning where a neutral stimulus becomes associated with a stimulus
          that naturally produces a response.
        </p>
        <p>
          <Emphasize>Key Features:</Emphasize>
        </p>
        <ul>
          <li>Involves involuntary, automatic responses</li>
          <li>Creates stimulus-stimulus associations</li>
          <li>Timing is critical for learning to occur</li>
          <li>
            The neutral stimulus must come before or at the same time as the
            natural stimulus
          </li>
        </ul>
        <ColorBox color="yellow">
          <p>
            <Emphasize>Real-World Example:</Emphasize> A dog naturally
            salivates when it sees food. If you ring a bell every time before
            giving the dog food, eventually the dog will salivate just from
            hearing the bell.
          </p>
        </ColorBox>
      </Block>
    </Slide>,

    // Slide 4: The Five Essential Components
    <Slide>
      <Block color="blue" title="The Five Essential Components">
        <p>
          Every classical conditioning example has exactly five parts:
        </p>
        <ul>
          <li>
            <KeyTerm>Unconditioned Stimulus (UCS):</KeyTerm> The natural
            trigger that automatically causes a response.{" "}
            <Emphasize>Example: Food</Emphasize>
          </li>
          <li>
            <KeyTerm>Unconditioned Response (UCR):</KeyTerm> The natural,
            automatic response. <Emphasize>Example: Salivation</Emphasize>
          </li>
          <li>
            <KeyTerm>Neutral Stimulus (NS):</KeyTerm> Something that initially
            causes no response.{" "}
            <Emphasize>Example: Bell (before conditioning)</Emphasize>
          </li>
          <li>
            <KeyTerm>Conditioned Stimulus (CS):</KeyTerm> The neutral stimulus
            after it's been paired with the UCS.{" "}
            <Emphasize>Example: Bell (after conditioning)</Emphasize>
          </li>
          <li>
            <KeyTerm>Conditioned Response (CR):</KeyTerm> The learned response
            to the conditioned stimulus.{" "}
            <Emphasize>Example: Salivation to bell</Emphasize>
          </li>
        </ul>
      </Block>
    </Slide>,

    // Slide 5: Operant Conditioning Foundation
    <Slide>
      <Block color="blue" title="Operant Conditioning Foundation">
        <p>
          <KeyTerm>Definition:</KeyTerm> Operant conditioning is learning where
          behavior becomes more or less likely based on the consequences that
          follow it.
        </p>
        <p>
          <Emphasize>Key Features:</Emphasize>
        </p>
        <ul>
          <li>Involves voluntary, chosen behaviors</li>
          <li>Creates behavior-consequence associations</li>
          <li>Consequences control future behavior probability</li>
          <li>Can create entirely new behaviors</li>
        </ul>
        <ColorBox color="yellow">
          <p>
            <Emphasize>The Basic Principle:</Emphasize> Behaviors followed by
            good consequences become more likely. Behaviors followed by bad
            consequences become less likely.
          </p>
          <p>
            <Emphasize>Example:</Emphasize> A student studies harder after
            receiving praise for good grades. The praise (consequence) makes
            studying (behavior) more likely to happen again.
          </p>
        </ColorBox>
      </Block>
    </Slide>,

    // Slide 6: The Four-Quadrant System
    <Slide>
      <Block color="blue" title="Four Ways Consequences Affect Behavior">
        <p>
          All consequences fit into four categories based on two questions:
        </p>
        <ol>
          <li>Are you adding something or removing something?</li>
          <li>Is it pleasant or unpleasant?</li>
        </ol>
        <ul>
          <li>
            <KeyTerm>Positive Reinforcement:</KeyTerm> Add something pleasant →
            Behavior increases.{" "}
            <Emphasize>Example: Get money for doing chores.</Emphasize>
          </li>
          <li>
            <KeyTerm>Negative Reinforcement:</KeyTerm> Remove something
            unpleasant → Behavior increases.{" "}
            <Emphasize>Example: Take aspirin to remove a headache.</Emphasize>
          </li>
          <li>
            <KeyTerm>Positive Punishment:</KeyTerm> Add something unpleasant →
            Behavior decreases.{" "}
            <Emphasize>
              Example: Get extra homework for talking in class.
            </Emphasize>
          </li>
          <li>
            <KeyTerm>Negative Punishment:</KeyTerm> Remove something pleasant →
            Behavior decreases.{" "}
            <Emphasize>
              Example: Lose phone privileges for breaking curfew.
            </Emphasize>
          </li>
        </ul>
      </Block>
    </Slide>,

    // Slide 7: Pavlov's Accidental Discovery
    <Slide>
      <Block color="yellow" title="How Pavlov Accidentally Changed Psychology">
        <p>
          <Emphasize>The Original Plan:</Emphasize> Ivan Pavlov was studying
          digestion in dogs. He wanted to measure exactly how much saliva dogs
          produced when eating different foods.
        </p>
        <p>
          <Emphasize>The Unexpected Observation:</Emphasize> Pavlov noticed that
          dogs began salivating before the food arrived - when they heard
          footsteps in the hallway or saw the person who usually fed them.
        </p>
        <p>
          <Emphasize>The Scientific Question:</Emphasize> Why were dogs
          responding to things that weren't food?
        </p>
        <p>
          <Emphasize>The Systematic Investigation:</Emphasize> Pavlov began
          controlled experiments pairing neutral sounds (like bells) with food
          presentation.
        </p>
        <p>
          <Emphasize>The Revolutionary Discovery:</Emphasize> Dogs could learn
          to associate any neutral stimulus with food, creating a new field of
          psychology.
        </p>
      </Block>
    </Slide>,

    // Slide 8: Watson and Little Albert
    <Slide>
      <Block color="yellow" title="Watson's Little Albert Study">
        <p>
          <Emphasize>The Researcher:</Emphasize> John B. Watson wanted to prove
          that human emotions could be conditioned just like animal responses.
        </p>
        <p>
          <Emphasize>The Participant:</Emphasize> 11-month-old Albert, who
          initially showed no fear of white rats, rabbits, or other furry
          objects.
        </p>
        <p>
          <Emphasize>The Procedure:</Emphasize>
        </p>
        <ul>
          <li>
            <KeyTerm>Phase 1:</KeyTerm> Albert plays happily with a white rat
            (no fear response).
          </li>
          <li>
            <KeyTerm>Phase 2:</KeyTerm> Every time Albert reaches for the rat,
            researchers make a loud noise with a hammer and steel bar.
          </li>
          <li>
            <KeyTerm>Phase 3:</KeyTerm> After several pairings, Albert shows
            fear of the rat even without the noise.
          </li>
        </ul>
        <p>
          <Emphasize>The Results:</Emphasize> Albert developed fear not just of
          the white rat, but also of similar objects like rabbits, dogs, and
          even a Santa Claus mask.
        </p>
        <p>
          <Emphasize>The Significance:</Emphasize> First demonstration that
          human emotions could be classically conditioned.
        </p>
      </Block>
    </Slide>,

    // Slide 9: Thorndike's Law of Effect
    <Slide>
      <Block color="yellow" title="Thorndike's Puzzle Box Experiments">
        <p>
          <Emphasize>The Setup:</Emphasize> Edward Thorndike placed hungry cats in
          wooden boxes with latches. Food was placed outside where cats could
          see and smell it.
        </p>
        <p>
          <Emphasize>The Challenge:</Emphasize> Cats had to figure out how to
          escape the box to reach the food. Different boxes had different
          escape mechanisms (pull a string, press a lever, etc.).
        </p>
        <p>
          <Emphasize>The Observations:</Emphasize>
        </p>
        <ul>
            <li><KeyTerm>First trials:</KeyTerm> Cats tried many random behaviors (scratching, biting, jumping).</li>
            <li><KeyTerm>Successful trials:</KeyTerm> Eventually cats accidentally triggered the escape mechanism.</li>
            <li><KeyTerm>Later trials:</KeyTerm> Cats performed successful behaviors faster and ignored unsuccessful ones.</li>
        </ul>
        <ColorBox color="blue">
            <p><KeyTerm>The Law of Effect:</KeyTerm> "Behaviors followed by satisfying consequences are more likely to be repeated. Behaviors followed by unsatisfying consequences are less likely to be repeated."</p>
        </ColorBox>
      </Block>
    </Slide>,

    // Slide 10: Skinner's Contributions
    <Slide>
        <Block color="yellow" title="B.F. Skinner's Scientific Approach">
            <p><Emphasize>The Innovation:</Emphasize> B.F. Skinner created the "operant chamber" (Skinner box) to study behavior under precisely controlled conditions.</p>
            <p><Emphasize>Key Features of Skinner Box:</Emphasize></p>
            <ul>
                <li>Lever or button for animal to press</li>
                <li>Food dispenser for delivering reinforcement</li>
                <li>Lights and sounds for discriminative stimuli</li>
                <li>Recording device to measure response rates</li>
            </ul>
            <p><Emphasize>Major Discoveries:</Emphasize></p>
            <ul>
                <li>Different reinforcement schedules produce different behavior patterns</li>
                <li>Behavior can be shaped through successive approximations</li>
                <li>Superstitious behaviors can develop from accidental reinforcement</li>
            </ul>
            <p><Emphasize>The Distinction:</Emphasize> Skinner distinguished between:</p>
            <ul>
                <li><KeyTerm>Respondent behavior:</KeyTerm> Automatic responses (classical conditioning)</li>
                <li><KeyTerm>Operant behavior:</KeyTerm> Voluntary actions that "operate" on the environment</li>
            </ul>
        </Block>
    </Slide>,

    // Slide 11: Garcia's Taste Aversion Research
    <Slide>
        <Block color="yellow" title="When Biology Overrides Timing">
            <p><Emphasize>The Challenge to Traditional Theory:</Emphasize> Classical conditioning supposedly required close timing between neutral stimulus and unconditioned stimulus (within seconds).</p>
            <p><Emphasize>Garcia's Discovery:</Emphasize> Rats could learn to associate taste with illness even when the illness occurred hours later - violating traditional timing rules.</p>
            <p><Emphasize>The Experiment:</Emphasize></p>
            <ol>
                <li>Rats drink flavored water (saccharin)</li>
                <li>Hours later, rats receive radiation that makes them sick</li>
                <li>After recovery, rats avoid the flavored water completely</li>
            </ol>
            <p>This learning happened in just one trial.</p>
            <p><KeyTerm>Biological Preparedness:</KeyTerm> Some stimulus-response combinations are easier to learn because they have survival value. Animals are "prepared" to quickly learn that certain tastes predict illness.</p>
            <p><Emphasize>Real-World Application:</Emphasize> This explains why people develop food aversions after getting sick, even when they know the food didn't cause the illness.</p>
        </Block>
    </Slide>,

    // Slide 12: Rescorla's Contingency Theory
    <Slide>
        <Block color="yellow" title="It's Not Just Timing - It's Prediction">
            <p><Emphasize>The Traditional View:</Emphasize> Classical conditioning happens when neutral stimulus and unconditioned stimulus are paired in time.</p>
            <p><Emphasize>Rescorla's Insight:</Emphasize> The neutral stimulus must reliably <KeyTerm>predict</KeyTerm> the unconditioned stimulus. Simple pairing isn't enough.</p>
            <p><Emphasize>The Experiment:</Emphasize></p>
            <ul>
                <li><KeyTerm>Group 1:</KeyTerm> Tone always followed by shock (100% prediction)</li>
                <li><KeyTerm>Group 2:</KeyTerm> Tone sometimes followed by shock, but shock also occurs without tone (poor prediction)</li>
            </ul>
            <p><Emphasize>Result:</Emphasize> Group 1 showed strong conditioning, Group 2 showed weak conditioning.</p>
            <p><Emphasize>The Principle:</Emphasize> Learning is strongest when the conditioned stimulus provides reliable information about when the unconditioned stimulus will occur.</p>
            <p><Emphasize>Modern Understanding:</Emphasize> Classical conditioning involves cognitive processes like expectancy and prediction, not just automatic associations.</p>
        </Block>
    </Slide>,

    // Slide 13: Acquisition and Timing
    <Slide>
        <Block color="yellow" title="How and When Learning Happens">
            <p><KeyTerm>Acquisition:</KeyTerm> The initial stage when the association between conditioned stimulus and unconditioned stimulus is formed.</p>
            <p><Emphasize>Timing Types:</Emphasize></p>
            <ul>
                <li><KeyTerm>Forward Conditioning:</KeyTerm> CS comes before UCS (most effective)</li>
                <li><KeyTerm>Simultaneous Conditioning:</KeyTerm> CS and UCS occur at same time (moderately effective)</li>
                <li><KeyTerm>Backward Conditioning:</KeyTerm> CS comes after UCS (least effective)</li>
                <li><KeyTerm>Trace Conditioning:</KeyTerm> CS starts and stops before UCS begins (can be effective with short delays)</li>
            </ul>
            <p><Emphasize>Factors That Enhance Acquisition:</Emphasize></p>
            <ul>
                <li>Shorter time between CS and UCS</li>
                <li>More intense stimuli</li>
                <li>More pairings</li>
                <li>Biological relevance of the association</li>
            </ul>
        </Block>
    </Slide>,

    // Slide 14: Extinction and Spontaneous Recovery
    <Slide>
        <Block color="yellow" title="When Learning Disappears (And Returns)">
            <p><KeyTerm>Extinction:</KeyTerm> The weakening of a conditioned response when the CS is no longer paired with the UCS.</p>
            <ColorBox color="yellow"><p><Emphasize>Important:</Emphasize> Extinction is NOT forgetting. It's new learning that competes with the original association.</p></ColorBox>
            <p><KeyTerm>Spontaneous Recovery:</KeyTerm> After a rest period following extinction, the conditioned response often reappears (though usually weaker than before).</p>
            <p><Emphasize>Why This Happens:</Emphasize> The original learning is still stored in memory. Extinction creates a competing memory that says "CS no longer predicts UCS."</p>
            <p><Emphasize>Real-World Example:</Emphasize> A person overcomes their fear of dogs through therapy (extinction), but months later feels anxious around dogs again (spontaneous recovery).</p>
        </Block>
    </Slide>,

    // Slide 15: Generalization and Discrimination
    <Slide>
        <Block color="yellow" title="When Learning Spreads (And When It Doesn't)">
            <p><KeyTerm>Stimulus Generalization:</KeyTerm> The tendency for stimuli similar to the original CS to also trigger the conditioned response.</p>
            <p><Emphasize>The Generalization Gradient:</Emphasize> Response strength decreases as stimuli become less similar to the original CS.</p>
            <p><Emphasize>Example:</Emphasize> A child bitten by a large brown dog may fear all dogs, but the fear will be strongest for large brown dogs and weaker for small white dogs.</p>
            <p><KeyTerm>Stimulus Discrimination:</KeyTerm> The ability to respond differently to the CS versus other similar stimuli.</p>
            <p><Emphasize>Discrimination Training:</Emphasize> Present CS with UCS, but present similar stimuli without UCS. This teaches the organism to respond only to the specific CS.</p>
            <p><Emphasize>Real-World Importance:</Emphasize> Generalization helps us apply learning to new situations. Discrimination prevents us from overgeneralizing inappropriately.</p>
        </Block>
    </Slide>,

    // Slide 16: Higher-Order Conditioning
    <Slide>
        <Block color="yellow" title="Building Learning on Learning">
            <p><KeyTerm>Higher-Order Conditioning:</KeyTerm> Using an already established CS as if it were a UCS to condition a new neutral stimulus.</p>
            <p><Emphasize>The Process:</Emphasize></p>
            <ol>
                <li><KeyTerm>First-Order Conditioning:</KeyTerm> Bell (CS1) paired with food (UCS) until bell causes salivation.</li>
                <li><KeyTerm>Second-Order Conditioning:</KeyTerm> Light (NS) paired with bell (CS1) until light causes salivation.</li>
            </ol>
            <p><Emphasize>Result:</Emphasize> Light now triggers salivation even though it was never directly paired with food.</p>
            <p><Emphasize>Characteristics:</Emphasize></p>
            <ul>
                <li>Second-order responses are usually weaker than first-order.</li>
                <li>Third-order conditioning is possible but very weak.</li>
                <li>Higher-order conditioning explains complex emotional responses.</li>
            </ul>
            <p><Emphasize>Real-World Example:</Emphasize> A child fears the dentist (first-order). The dentist's office building becomes associated with the dentist (second-order). Now the child feels anxious just seeing the building.</p>
        </Block>
    </Slide>,

    // Slide 17: Reinforcement Schedules
    <Slide>
        <Block color="yellow" title="The Power of Patterns">
            <p><KeyTerm>Continuous Reinforcement:</KeyTerm> Every correct response is reinforced. Result: Fast learning, but quick extinction when reinforcement stops.</p>
            <p><Emphasize>Partial Reinforcement Schedules:</Emphasize></p>
            <ul>
                <li><KeyTerm>Fixed Ratio (FR):</KeyTerm> Reinforcement after a set number of responses. Pattern: Post-reinforcement pause, then rapid responding. Example: Pay for every 10 items assembled.</li>
                <li><KeyTerm>Variable Ratio (VR):</KeyTerm> Reinforcement after unpredictable number of responses. Pattern: High, steady response rate with strong resistance to extinction. Example: Gambling, sales commissions.</li>
                <li><KeyTerm>Fixed Interval (FI):</KeyTerm> Reinforcement after set time period. Pattern: Scalloped responding (slow after reinforcement, faster as time approaches). Example: Weekly paychecks.</li>
                <li><KeyTerm>Variable Interval (VI):</KeyTerm> Reinforcement after unpredictable time periods. Pattern: Steady, moderate responding with good extinction resistance. Example: Checking email, pop quizzes.</li>
            </ul>
        </Block>
    </Slide>,

    // Slide 18: Shaping Complex Behaviors
    <Slide>
        <Block color="yellow" title="Building Behaviors Step by Step">
            <p><KeyTerm>Shaping:</KeyTerm> The process of reinforcing successive approximations toward a target behavior.</p>
            <p><Emphasize>The Process:</Emphasize></p>
            <ol>
                <li>Define the target behavior (what you want the final result to be).</li>
                <li>Reinforce any behavior that resembles the target (even if it's not perfect).</li>
                <li>Gradually raise the criteria (require closer approximations to get reinforcement).</li>
                <li>Continue until target behavior is achieved.</li>
            </ol>
            <p><Emphasize>Example - Teaching a Rat to Press a Lever:</Emphasize></p>
            <ul>
                <li>Step 1: Reinforce rat for moving toward lever.</li>
                <li>Step 2: Reinforce only when rat touches lever.</li>
                <li>Step 3: Reinforce only when rat presses lever down.</li>
                <li>Step 4: Reinforce only firm lever presses.</li>
            </ul>
            <p><Emphasize>Real-World Applications:</Emphasize> Teaching children to write letters, athletic skill development, speech therapy, learning musical instruments.</p>
        </Block>
    </Slide>,

    // Slide 19: Chaining Behaviors
    <Slide>
        <Block color="yellow" title="Linking Actions Together">
            <p><KeyTerm>Behavioral Chaining:</KeyTerm> Connecting individual behaviors into complex sequences where each behavior serves as both a conditioned reinforcer for the previous behavior and a discriminative stimulus for the next behavior.</p>
            <p><Emphasize>How It Works:</Emphasize></p>
            <ul>
                <li>Each step in the chain is reinforced by the opportunity to perform the next step.</li>
                <li>Only the final step receives external reinforcement.</li>
                <li>The chain is usually taught backward (backward chaining).</li>
            </ul>
            <p><Emphasize>Example - Getting Ready for School:</Emphasize> Alarm rings (discriminative stimulus) → Get out of bed (behavior 1) → see clothes (reinforcer/discriminative stimulus) → Get dressed (behavior 2) → see breakfast (reinforcer/discriminative stimulus) → Eat breakfast (behavior 3) → see backpack (reinforcer/discriminative stimulus) → Grab backpack (behavior 4) → leave for school (final reinforcer).</p>
            <p><Emphasize>Why Backward Chaining Works:</Emphasize> The animal/person learns the final step first (which gets the real reward), then learns what leads to that step, and so on.</p>
        </Block>
    </Slide>,

    // Slide 20: Primary vs. Secondary Reinforcers
    <Slide>
        <Block color="yellow" title="Natural vs. Learned Rewards">
            <p><KeyTerm>Primary Reinforcers:</KeyTerm> Stimuli that are naturally reinforcing without any learning. Examples: Food, water, warmth, sleep, sex. Characteristics: Satisfy biological needs, work for all members of species.</p>
            <p><KeyTerm>Secondary Reinforcers:</KeyTerm> Stimuli that gain reinforcing power through association with primary reinforcers. Examples: Money, grades, praise, tokens, trophies. Characteristics: Must be learned, can vary between individuals and cultures.</p>
            <p><Emphasize>How Secondary Reinforcers Develop:</Emphasize> Money becomes reinforcing because it's been paired with primary reinforcers (food, shelter, etc.).</p>
            <p><KeyTerm>Generalized Secondary Reinforcers:</KeyTerm> Secondary reinforcers that have been paired with many different primary reinforcers. Example: Money can buy food, shelter, entertainment, etc. Advantage: Very powerful and resistant to extinction.</p>
        </Block>
    </Slide>,

    // Slide 21: Phobia Development and Treatment
    <Slide>
        <Block color="yellow" title="How Fears Are Learned and Unlearned">
            <p><Emphasize>How Phobias Develop Through Classical Conditioning:</Emphasize></p>
            <ul>
                <li><KeyTerm>UCS:</KeyTerm> Traumatic event (dog bite, car accident, etc.)</li>
                <li><KeyTerm>UCR:</KeyTerm> Natural fear response (pain, anxiety)</li>
                <li><KeyTerm>NS:</KeyTerm> Neutral situation (dogs, cars, etc.)</li>
                <li><KeyTerm>CS:</KeyTerm> Previously neutral situation (after trauma)</li>
                <li><KeyTerm>CR:</KeyTerm> Learned fear response</li>
            </ul>
            <p><Emphasize>Example:</Emphasize> Child bitten by dog (UCS) experiences pain and fear (UCR). Dogs (NS) become associated with bite. Now dogs (CS) trigger fear (CR) even when they're friendly.</p>
            <p><Emphasize>Treatment Through Classical Conditioning:</Emphasize></p>
            <ul>
                <li><KeyTerm>Systematic Desensitization:</KeyTerm> Teach relaxation techniques, create fear hierarchy, pair relaxation with gradual exposure, progress through hierarchy until fear is eliminated.</li>
                <li><KeyTerm>Flooding:</KeyTerm> Prolonged exposure to feared stimulus until extinction occurs.</li>
                <li><KeyTerm>Aversion Therapy:</KeyTerm> Pair unwanted behavior with unpleasant stimulus.</li>
            </ul>
        </Block>
    </Slide>,

    // Slide 22: Advertising and Marketing
    <Slide>
        <Block color="yellow" title="How Brands Use Classical Conditioning">
            <p><Emphasize>The Marketing Strategy:</Emphasize> Pair products (neutral stimuli) with things that naturally make people feel good (unconditioned stimuli).</p>
            <p><Emphasize>Common UCS Used in Advertising:</Emphasize> Attractive people, happy music, cute animals, beautiful scenery, success/achievement.</p>
            <p><Emphasize>The Goal:</Emphasize> After repeated pairings, the brand (CS) will trigger positive emotions (CR) even without the original positive elements.</p>
            <p><Emphasize>Example:</Emphasize> Coca-Cola ads pair their product with happy families, celebrations, and fun activities. Eventually, seeing the Coca-Cola logo alone triggers positive feelings.</p>
            <p><Emphasize>Why It Works:</Emphasize> Our brains automatically form associations between things that occur together, even when we're not consciously aware of it.</p>
            <p><Emphasize>Consumer Defense:</Emphasize> Understanding these techniques helps you make more rational purchasing decisions.</p>
        </Block>
    </Slide>,

    // Slide 23: Educational Applications
    <Slide>
        <Block color="yellow" title="Conditioning in the Classroom">
            <p><KeyTerm>Token Economy Systems:</KeyTerm> Students earn tokens (secondary reinforcers) for appropriate behaviors. Tokens can be exchanged for preferred activities or items (backup reinforcers). Example: Points for completing homework, participating, helping others.</p>
            <p><KeyTerm>Behavior Modification Programs:</KeyTerm> Systematic use of reinforcement to increase desired behaviors. Clear rules about what behaviors earn what consequences. Consistent application by all staff.</p>
            <p><KeyTerm>Classroom Management Applications:</KeyTerm> Positive reinforcement (praise), negative reinforcement (remove unpleasant tasks), negative punishment (loss of privileges).</p>
            <p><KeyTerm>Grading Systems:</KeyTerm> Grades function as secondary reinforcers that motivate studying and learning behaviors.</p>
            <p><Emphasize>Why It Works:</Emphasize> Students learn which behaviors lead to positive outcomes and adjust their actions accordingly.</p>
        </Block>
    </Slide>,

    // Slide 24: Therapeutic Interventions
    <Slide>
        <Block color="yellow" title="Conditioning-Based Treatments">
            <p><KeyTerm>Systematic Desensitization:</KeyTerm> Used for phobias, anxiety disorders. Process: Gradual exposure paired with relaxation. High success rate for specific phobias.</p>
            <p><KeyTerm>Flooding:</KeyTerm> Used for severe phobias, PTSD. Process: Prolonged exposure until extinction occurs. Caution: Can be traumatic if not done properly.</p>
            <p><KeyTerm>Aversion Therapy:</KeyTerm> Used for addictions, unwanted behaviors. Process: Pair unwanted behavior with unpleasant stimulus. Example: Medication that causes nausea when alcohol is consumed.</p>
            <p><KeyTerm>Token Economy:</KeyTerm> Used for autism, developmental disabilities, psychiatric hospitals. Process: Earn tokens for appropriate behaviors, exchange for rewards. Advantage: Can shape complex social and self-care behaviors.</p>
            <p><KeyTerm>Contingency Management:</KeyTerm> Used for substance abuse, behavioral disorders. Process: Clear consequences for specific behaviors. Key: Immediate and consistent reinforcement/punishment.</p>
        </Block>
    </Slide>,

    // Slide 25: Animal Training and Behavior Modification
    <Slide>
        <Block color="yellow" title="Conditioning in Action">
            <p><Emphasize>Animal Training Principles:</Emphasize> All animal training relies on operant conditioning: Positive reinforcement, negative punishment, shaping, and chaining.</p>
            <p><Emphasize>Examples:</Emphasize> Dog obedience, service animals, marine mammals, working animals.</p>
            <p><Emphasize>Behavior Modification in Clinical Settings:</Emphasize> Autism interventions, ADHD management, substance abuse.</p>
            <p><Emphasize>Workplace Applications:</Emphasize> Performance-based pay, employee recognition, safety programs.</p>
        </Block>
    </Slide>,

    // Slide 26: Habit Formation and Self-Control
    <Slide>
        <Block color="yellow" title="Using Conditioning to Change Your Own Behavior">
            <p><Emphasize>The Habit Loop:</Emphasize></p>
            <ol>
                <li><KeyTerm>Cue:</KeyTerm> Environmental trigger that starts the behavior.</li>
                <li><KeyTerm>Routine:</KeyTerm> The behavior itself.</li>
                <li><KeyTerm>Reward:</KeyTerm> The benefit you get from the behavior.</li>
            </ol>
            <p><Emphasize>Breaking Bad Habits:</Emphasize> Identify the cue, change the routine, keep the reward.</p>
            <p><Emphasize>Building Good Habits:</Emphasize> Make cues obvious, start small (shaping), stack habits (chaining), track progress (self-reinforcement).</p>
            <p><Emphasize>Example - Building Exercise Habit:</Emphasize> Cue: Lay out workout clothes. Routine: 10-minute walk. Reward: Listen to favorite music. Progress: Gradually increase duration.</p>
        </Block>
    </Slide>,

    // Slide 27: Classical vs. Operant Comparison
    <Slide>
        <Block color="yellow" title="Two Types of Learning Compared">
            <p><Emphasize>Critical Distinctions:</Emphasize></p>
            <ul>
                <li><KeyTerm>Timing:</KeyTerm> Classical (before response) vs. Operant (after response).</li>
                <li><KeyTerm>Behavior Type:</KeyTerm> Classical (involuntary) vs. Operant (voluntary).</li>
                <li><KeyTerm>Learning Focus:</KeyTerm> Classical (stimulus-stimulus) vs. Operant (behavior-consequence).</li>
                <li><KeyTerm>Control Mechanisms:</KeyTerm> Classical (stimulus controls response) vs. Operant (consequences control behavior).</li>
                <li><KeyTerm>Response Characteristics:</KeyTerm> Classical (similar to UCR) vs. Operant (can be new behavior).</li>
            </ul>
        </Block>
    </Slide>,

    // Slide 28: Integration in Real Life
    <Slide>
        <Block color="yellow" title="When Both Types Work Together">
            <p>Complex behaviors often involve both classical and operant conditioning working simultaneously.</p>
            <p><Emphasize>Example 1 - Test Anxiety:</Emphasize></p>
            <ul>
                <li><KeyTerm>Classical component:</KeyTerm> Test situation (CS) paired with past failures (UCS) creates anxiety (CR).</li>
                <li><KeyTerm>Operant component:</KeyTerm> Anxiety serves as negative reinforcement for avoidance behaviors (skipping class, not studying).</li>
            </ul>
            <p><Emphasize>Example 2 - Conditioned Reinforcers:</Emphasize></p>
            <ul>
                <li><KeyTerm>Classical component:</KeyTerm> Money (NS) paired with primary reinforcers (food, shelter).</li>
                <li><KeyTerm>Operant component:</KeyTerm> Money now reinforces work behaviors.</li>
            </ul>
            <p><Emphasize>Example 3 - Discriminative Stimuli with Emotions:</Emphasize></p>
            <ul>
                <li><KeyTerm>Classical component:</KeyTerm> Teacher's smile (CS) paired with positive experiences creates good feelings.</li>
                <li><KeyTerm>Operant component:</KeyTerm> Smile signals that participation will be reinforced.</li>
            </ul>
        </Block>
    </Slide>,

    // Slide 29: Superstitious Behavior and Learned Helplessness
    <Slide>
        <Block color="yellow" title="When Conditioning Goes Wrong">
            <p><Emphasize>Superstitious Behavior (Skinner's Research):</Emphasize></p>
            <p>Pigeons developed ritualistic behaviors due to accidental reinforcement of whatever behavior occurred just before food delivery. Humans do this too (e.g., lucky clothes, rituals).</p>
            <p><Emphasize>Learned Helplessness Research:</Emphasize></p>
            <p>Dogs who received inescapable shocks later didn't try to escape even when they could. Conclusion: Learning that you have no control leads to giving up.</p>
            <p><Emphasize>Applications to Depression:</Emphasize> People who experience repeated failures may stop trying. Therapy focuses on rebuilding sense of control and self-efficacy.</p>
        </Block>
    </Slide>,

    // Slide 30: Contemporary Applications
    <Slide>
        <Block color="yellow" title="Conditioning in the Digital Age">
            <p><Emphasize>Social Media and Variable Ratio Reinforcement:</Emphasize> Likes, comments, and shares come unpredictably, leading to high engagement (e.g., checking Instagram repeatedly).</p>
            <p><Emphasize>Gaming and Operant Conditioning:</Emphasize> Points (continuous reinforcement), achievements (variable ratio), and in-app purchases (negative reinforcement) keep players engaged.</p>
            <p><Emphasize>Technology Addiction Patterns:</Emphasize> Notification sounds (CS) create anticipation (CR), and checking the phone is reinforced by social connection (operant).</p>
            <p><Emphasize>Digital Behavior Modification:</Emphasize> Fitness apps, habit trackers, and screen time controls all use conditioning principles.</p>
        </Block>
    </Slide>,
    
    // Slide 31: Comprehensive Review
    <Slide>
        <Block color="green" title="Mastering All the Concepts">
            <p><Emphasize>Classical Conditioning Vocabulary:</Emphasize></p>
            <ul>
                <li><KeyTerm>UCS (Unconditioned Stimulus):</KeyTerm> naturally triggers response</li>
                <li><KeyTerm>UCR (Unconditioned Response):</KeyTerm> natural response to UCS</li>
                <li><KeyTerm>NS (Neutral Stimulus):</KeyTerm> initially causes no response</li>
                <li><KeyTerm>CS (Conditioned Stimulus):</KeyTerm> NS after pairing with UCS</li>
                <li><KeyTerm>CR (Conditioned Response):</KeyTerm> learned response to CS</li>
                <li><KeyTerm>Acquisition:</KeyTerm> Initial learning phase</li>
                <li><KeyTerm>Extinction:</KeyTerm> Weakening when CS presented without UCS</li>
                <li><KeyTerm>Spontaneous Recovery:</KeyTerm> Return of CR after rest period</li>
                <li><KeyTerm>Generalization:</KeyTerm> Response to similar stimuli</li>
                <li><KeyTerm>Discrimination:</KeyTerm> Responding only to specific CS</li>
                <li><KeyTerm>Higher-Order:</KeyTerm> Using CS as new UCS</li>
            </ul>
             <p><Emphasize>Operant Conditioning Vocabulary:</Emphasize></p>
            <ul>
                <li><KeyTerm>Positive Reinforcement:</KeyTerm> Add pleasant → behavior increases</li>
                <li><KeyTerm>Negative Reinforcement:</KeyTerm> Remove unpleasant → behavior increases</li>
                <li><KeyTerm>Positive Punishment:</KeyTerm> Add unpleasant → behavior decreases</li>
                <li><KeyTerm>Negative Punishment:</KeyTerm> Remove pleasant → behavior decreases</li>
                <li><KeyTerm>Shaping:</KeyTerm> Reinforcing successive approximations</li>
                <li><KeyTerm>Chaining:</KeyTerm> Linking behaviors in sequence</li>
                <li><KeyTerm>Schedules:</KeyTerm> FR, VR, FI, VI patterns of reinforcement</li>
            </ul>
        </Block>
    </Slide>
  ];

  return <Lesson slides={slides} />;
}
