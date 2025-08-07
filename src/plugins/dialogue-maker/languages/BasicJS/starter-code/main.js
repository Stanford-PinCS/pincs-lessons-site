const scenes = {
  start: {
    message: "Hello traveler, what brings you here?",
    choices: [
      {
        response: "I'm looking for the magic sword.",
        nextScene: "swordInfo",
      },
      {
        response: "Just passing through.",
        nextScene: "farewell",
      },
    ],
  },
  swordInfo: {
    message: "Ah, the legendary blade! It's in the dragon's lair.",
    choices: [
      {
        response: "Tell me more.",
        nextScene: "dragonDetails",
      },
      {
        response: "Thanks, goodbye.",
        nextScene: "farewell",
      },
    ],
  },
  farewell: {
    message: "Safe travels, adventurer!",
    choices: [],
  },
};

loadDialogue(scenes);
