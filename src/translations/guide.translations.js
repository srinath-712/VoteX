export const guideTranslations = {
  en: {
    hero: {
      title: "Step-by-step Guide",
      subtitle: "Choose your experience level to get started.",
      firstTimeBtn: "I'm a First-Time Voter",
      refresherBtn: "I Just Need a Refresher",
      progress: "Step {{current}} of {{total}}",
      nextBtn: "Next step",
      prevBtn: "Previous",
      simulatorCta: "Try Mock Simulator",
      markUnderstood: "Mark as understood",
      understood: "Understood",
    },
    firstTime: [
      {
        id: "check-name",
        title: "Check your name on the list",
        body: "Even if you have a Voter ID card, you cannot vote if your name is not on the Electoral Roll. Verify this online well before election day.",
      },
      {
        id: "find-booth",
        title: "Find your designated booth",
        body: "You are assigned a specific polling station based on your residential address. You cannot vote anywhere else.",
      },
      {
        id: "prepare-id",
        title: "Keep your ID ready",
        body: "Take your original Voter ID (EPIC). If you don't have it, Aadhaar, PAN card, Passport, or Driving License are typically accepted.",
      },
      {
        id: "no-phones",
        title: "Leave phones outside",
        body: "Mobile phones, cameras, or any recording devices are strictly prohibited inside the polling booth to maintain ballot secrecy.",
      },
      {
        id: "enter-booth",
        title: "Entering the booth",
        body: "Join the queue. When it's your turn, the First Polling Officer will check your name on the voter list and your ID document.",
      },
      {
        id: "ink-signature",
        title: "The indelible ink",
        body: "The Second Polling Officer will ink your left forefinger, ask you to sign (or thumbprint) the register, and give you a signed voter slip.",
      },
      {
        id: "verify-slip",
        title: "Hand over the slip",
        body: "You will deposit the signed slip with the Third Polling Officer, who will then grant you access to the voting compartment.",
      },
      {
        id: "use-evm",
        title: "Press the button on the EVM",
        body: "Go to the EVM. Press the blue button next to the symbol and name of your chosen candidate. You will hear a loud beep confirming your vote.",
      },
      {
        id: "check-vvpat",
        title: "Check the VVPAT slip",
        body: "Look into the transparent window of the VVPAT machine. A slip showing your candidate's serial number, name, and symbol will be visible for 7 seconds before it drops into the sealed box.",
      },
      {
        id: "exit-booth",
        title: "You've voted!",
        body: "That's it! You can now safely exit the polling station. Be proud of participating in the world's largest democracy.",
      }
    ],
    refresher: [
      {
        id: "verify-roll",
        title: "Verify Electoral Roll status",
        body: "Don't assume you're still on the list just because you voted last time. Names occasionally get deleted. Check electoralsearch.eci.gov.in.",
      },
      {
        id: "check-booth",
        title: "Double-check your booth",
        body: "Polling station locations can change between elections due to reorganization. Confirm your current assigned booth.",
      },
      {
        id: "id-rules",
        title: "Valid ID requirement",
        body: "Carry your original EPIC or approved alternative photo ID. Digital copies on phones are not accepted since phones aren't allowed inside.",
      },
      {
        id: "evm-vvpat",
        title: "EVM and VVPAT process",
        body: "Press the blue button for your candidate. Wait for the beep, and verify the printed slip in the VVPAT window for 7 seconds to ensure your vote was recorded correctly.",
      },
      {
        id: "no-merch",
        title: "No political merchandise",
        body: "Remember that wearing clothes, caps, or badges bearing party symbols within 100 meters of the booth is an electoral offense.",
      }
    ]
  },
  // Adding simple fallback objects so it doesn't break
  hi: { hero: { title: "Step-by-step Guide", subtitle: "Choose your experience level to get started.", firstTimeBtn: "I'm a First-Time Voter", refresherBtn: "I Just Need a Refresher", progress: "Step {{current}} of {{total}}", nextBtn: "Next step", prevBtn: "Previous", simulatorCta: "Try Mock Simulator", markUnderstood: "Mark as understood", understood: "Understood" }, firstTime: [], refresher: [] }
};
