"use client";
import { CodeEditor } from "@/components/CodeEditor/CodeEditor";
import React from "react";

const instructionsMarkdown = `
<Slide>
<Step>
In this lesson, we'll combine everything we've learned so far to write a program that translates words into emojis.
</Step>
<Step>
Press the next button to get started.
</Step>
</Slide>
<Slide>
<Step>
Let's start by printing out a welcome message and ask the user for a word. Add this code on line 1:
</Step>
\`\`\`python
print("Welcome to the emoji translator!")
word = input("Enter a word: ")
\`\`\`

<Step>
Press the play button to run the code. The program should print out the welcome message and ask you for a word. Type in a word and press enter. The program stored what you typed in the variable \`word\`, but it didn't print anything out yet.
</Step>
<Step>
Press the next button to move on.
</Step>
</Slide>
<Slide>
<Step>
We'll use if statements to translate the word into an emoji. Add this code:
</Step>
\`\`\`python
if word == "happy":
    print("😀")
elif word == "sad":
    print("😢")
elif word == "angry":
  print("😡")
\`\`\`
<Collapsible title="How do I type an emoji?">
- On a Mac, you can press control + command + space to bring up the emoji keyboard.
- On Windows, you can press the Windows key + . to bring up the emoji keyboard.
- On Chromebook, you can press Search/Launcher key+Shift+Space
</Collapsible>
<Step>
Press the play button to run the code. The program should print out the emoji if you typed in a word in the if statement, but it won't print out anything if you typed in a word that isn't handled in the if statement.
</Step>
<Step>
Press the next button to move on.
</Step>
</Slide>


`;

export const CodeEditorExample: React.FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] p-4">
      <h2 className="text-lg font-bold px-2 text-center">
        Try the coding lesson below!
      </h2>
      <CodeEditor
        instructionsMarkdown={instructionsMarkdown}
        lessonId="particle-simulation-lesson"
        pluginId="particle-simulation"
        height={600}
        language={"javascript"}
      />
    </div>
  );
};

export default CodeEditorExample;
