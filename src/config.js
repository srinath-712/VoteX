export const ELECTION_CONFIG = {
  // ⚠️  UPDATE THIS BEFORE EACH ELECTION CYCLE  ⚠️
  // Set to the main polling day in ISO format (YYYY-MM-DD).
  // The timeline auto-selects the "current" phase based on how many days remain until this date.
  CURRENT_ELECTION_DATE: "2026-05-15",
  
  // Can explicitly override the automatic timeline phase (1-8) for testing
  // Leave as null in production to let the system auto-calculate from dates
  FORCE_PHASE: null,
  
  TIMELINE_PHASES: [
    {
      id: "phase1",
      number: 1,
      estimatedDate: "Feb-Mar 2026",
    },
    {
      id: "phase2",
      number: 2,
      estimatedDate: "Mar 10, 2026",
    },
    {
      id: "phase3",
      number: 3,
      estimatedDate: "Mar 15, 2026",
    },
    {
      id: "phase4",
      number: 4,
      estimatedDate: "Mar 20-30, 2026",
    },
    {
      id: "phase5",
      number: 5,
      estimatedDate: "Apr - May 13, 2026",
    },
    {
      id: "phase6",
      number: 6,
      estimatedDate: "May 15, 2026",
    },
    {
      id: "phase7",
      number: 7,
      estimatedDate: "May 18, 2026",
    },
    {
      id: "phase8",
      number: 8,
      estimatedDate: "May 25, 2026",
    }
  ]
};

// Helper to determine the current phase based on date
export const getCurrentPhase = () => {
  if (ELECTION_CONFIG.FORCE_PHASE) return ELECTION_CONFIG.FORCE_PHASE;
  
  const now = new Date();
  const electionDay = new Date(ELECTION_CONFIG.CURRENT_ELECTION_DATE);
  
  // Very simplified auto-calculation logic for MVP
  const diffDays = Math.floor((electionDay - now) / (1000 * 60 * 60 * 24));
  
  if (diffDays > 60) return 1; // Voter Registration focus
  if (diffDays > 30) return 2; // Dates announced
  if (diffDays > 25) return 3; // Code of conduct
  if (diffDays > 15) return 4; // Nominations
  if (diffDays > 0) return 5;  // Campaigning
  if (diffDays === 0) return 6; // Election Day
  if (diffDays > -3) return 7; // Exit polls
  return 8; // Results
};
