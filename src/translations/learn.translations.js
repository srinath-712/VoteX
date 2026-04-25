export const learnTranslations = {
  en: {
    hero: {
      title: "Learning Center",
      subtitle: "Everything you need to know to be an informed voter.",
      tabs: {
        glossary: "Glossary",
        quiz: "Take a Quiz",
        candidates: "Candidates"
      }
    },
    glossary: {
      searchPlaceholder: "Search terms...",
      emptyState: "No terms found matching your search.",
      terms: [
        { term: "EVM", definition: "Electronic Voting Machine. The device used to electronically record votes securely." },
        { term: "VVPAT", definition: "Voter Verifiable Paper Audit Trail. A slip printed immediately after you cast your vote allowing you to verify your vote." },
        { term: "EPIC", definition: "Electors Photo Identity Card. Your official Voter ID card issued by the Election Commission of India." },
        { term: "NOTA", definition: "None Of The Above. A ballot option to officially register a vote of rejection for all candidates." },
        { term: "Constituency", definition: "A specific geographical area that elects one representative to a legislative body." },
        { term: "Manifesto", definition: "A published declaration of the intentions, motives, or views of a political party." },
        { term: "MCC", definition: "Model Code of Conduct. Strict guidelines issued by the ECI for conduct of political parties and candidates during elections." },
        { term: "ECI", definition: "Election Commission of India. The autonomous constitutional authority responsible for administering election processes in India." },
        { term: "Affidavit (Form 26)", definition: "A document filed by a candidate disclosing their criminal background, assets, liabilities, and educational qualifications." }
      ]
    },
    quiz: {
      title: "Test Your Election Knowledge",
      startBtn: "Start Quiz",
      nextBtn: "Next Question",
      finishBtn: "See Results",
      retryBtn: "Try Again",
      scoreTitle: "Your Score",
      questions: [
        {
          question: "Can you vote if your name is NOT on the voter list but you have an EPIC (Voter ID)?",
          options: ["Yes", "No", "Only for local elections", "Only if approved by the BLO"],
          correctIndex: 1,
          explanation: "You CANNOT vote. Having a Voter ID is not enough; your name must strictly be present on the current Electoral Roll."
        },
        {
          question: "How long is the VVPAT slip visible in the window before dropping into the box?",
          options: ["3 seconds", "5 seconds", "7 seconds", "10 seconds"],
          correctIndex: 2,
          explanation: "The VVPAT slip is visible through the transparent window for exactly 7 seconds before it gets cut and drops."
        },
        {
          question: "Which of these is NOT allowed inside the polling booth?",
          options: ["A water bottle", "Original Aadhaar Card", "Mobile Phone", "A wallet"],
          correctIndex: 2,
          explanation: "Mobile phones, cameras, and any recording devices are strictly banned inside polling booths to protect voting secrecy."
        },
        {
          question: "What does NOTA stand for?",
          options: ["None Of The Above", "No Other True Alternative", "Not Option To Anyone", "National Organization of Trade Agreements"],
          correctIndex: 0,
          explanation: "NOTA allows you to officially register your vote to reject all candidates in the election."
        }
      ]
    },
    candidates: {
      title: "Know Your Candidates (Demo)",
      description: "In a real scenario, this section pulls live data from Affidavits filed with the ECI. Below is a mock comparison.",
      compareBtn: "Compare",
      metrics: {
        education: "Education",
        assets: "Declared Assets",
        cases: "Criminal Cases",
        attendance: "Past Attendance"
      },
      mockData: [
        { id: 1, name: "Arun Sharma", party: "Party A", education: "Post Graduate", assets: "₹2.5 Cr", cases: "0", attendance: "85%" },
        { id: 2, name: "Priya Desai", party: "Party B", education: "Doctorate", assets: "₹4.1 Cr", cases: "1 (Pending)", attendance: "92%" },
        { id: 3, name: "Tariq Khan", party: "Independent", education: "Graduate", assets: "₹80 Lakh", cases: "0", attendance: "N/A (First time)" }
      ]
    }
  },
  // English fallback for MVP on all supported locales
  hi: { hero: { title: "Learning Center", subtitle: "Everything you need to know to be an informed voter.", tabs: { glossary: "Glossary", quiz: "Take a Quiz", candidates: "Candidates" } }, glossary: { searchPlaceholder: "Search...", emptyState: "No terms found.", terms: [] }, quiz: { title: "Test Your Election Knowledge", startBtn: "Start Quiz", nextBtn: "Next Question", finishBtn: "See Results", retryBtn: "Try Again", scoreTitle: "Your Score", questions: [] }, candidates: { title: "Know Your Candidates", description: "...", compareBtn: "Compare", metrics: { education: "Education", assets: "Assets", cases: "Cases", attendance: "Attendance" }, mockData: [] } }
};
