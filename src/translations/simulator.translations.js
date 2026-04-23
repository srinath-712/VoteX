export const simulatorTranslations = {
  en: {
    hero: {
      title: "Mock Simulator",
      subtitle: "Experience how an EVM and VVPAT machine works before election day.",
    },
    scenes: {
      scene1: {
        title: "Welcome to the Booth",
        instruction: "Imagine you have just handed your signed voter slip to the Third Polling Officer. They smile and point you to the voting compartment. Please step inside.",
        actionBtn: "Enter Voting Compartment",
      },
      scene2: {
        title: "The Electronic Voting Machine (EVM)",
        instruction: "You are now facing the EVM. You'll see candidates' names and party symbols. There is a blue button next to each name. Press the blue button for the candidate of your choice.",
      },
      scene3: {
        title: "The Beep!",
        instruction: "Did you hear that long beep? That loud sound confirms your vote has been locked into the Control Unit. But wait, we must verify it!",
        actionBtn: "Look at the VVPAT machine",
      },
      scene4: {
        title: "The VVPAT Verification",
        instruction: "Look at the glass window on the VVPAT machine next to the EVM. A paper slip with your candidate's serial number, name, and symbol will drop down. It will be visible for exactly 7 seconds.",
        vvpatLabel: "VVPAT Window",
        slipCandidate: "Candidate:",
        slipParty: "Symbol:",
      },
      scene5: {
        title: "Vote Complete!",
        instruction: "You did it! The paper slip has dropped into the sealed drop box, confirming your vote is 100% physically auditable. You may now leave the polling booth.",
        actionBtn: "Finish Simulation",
      }
    },
    evm: {
      label: "Simulation — Not a real EVM",
      candidates: [
        { id: 1, name: "Arun Sharma", symbol: "🌞" },
        { id: 2, name: "Priya Desai", symbol: "🚲" },
        { id: 3, name: "Tariq Khan", symbol: "⚖️" },
        { id: 4, name: "Meera Reddy", symbol: "🐘" },
        { id: 5, name: "NOTA", symbol: "❌" } // None of the above
      ]
    }
  },
  hi: { hero: { title: "Mock Simulator", subtitle: "Experience how an EVM works before election day." }, scenes: { scene1: { title: "Welcome to the Booth", instruction: "...", actionBtn: "Enter" }, scene2: { title: "The EVM", instruction: "..." }, scene3: { title: "The Beep!", instruction: "...", actionBtn: "Next" }, scene4: { title: "The VVPAT Verification", instruction: "...", vvpatLabel: "Window", slipCandidate: "Candidate:", slipParty: "Symbol:" }, scene5: { title: "Vote Complete!", instruction: "...", actionBtn: "Finish" } }, evm: { label: "Simulation", candidates: [] } }
};
