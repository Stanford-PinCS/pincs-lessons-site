import { Message } from "../../messages";

const createExports = (sendMessage: (message: Message) => void) => {
  return Promise.resolve({
    optimize: (
      choose: (
        mu_apple: number,
        p_apple: number,
        mu_banana: number,
        p_banana: number
      ) => string
    ) => {
      let budget = 7;

      let appleMU = 30;
      let bananaMU = 20;
      const applePrice = 2;
      const bananaPrice = 1;

      const appleSlope = 10;
      const bananaSlope = 5;

      let goodLastChoice = true;
      while (goodLastChoice && bananaMU > 0 && appleMU > 0 && budget > 0) {
        const choice = choose(appleMU, applePrice, bananaMU, bananaPrice);
        sendMessage(choice);

        // Update MU and budget values
        if (choice == "apple") {
          appleMU -= appleSlope;
          budget -= applePrice;
        } else if (choice == "banana") {
          bananaMU -= bananaSlope;
          budget -= bananaPrice;
        }

        // Check if they made a valid choice... otherwise, this will be their last.
        if (!["apple", "banana"].includes(choice)) {
          goodLastChoice = false;
        }
      }
    },
  });
};

export default createExports;
