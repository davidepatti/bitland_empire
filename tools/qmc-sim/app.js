"use strict";

const variables = ["A", "B", "C", "D", "E", "G"];
const languageKey = "qmc-sim-language";

const translations = {
  en: {
    appTitle: "Quine-McCluskey Simulator",
    logicMinimization: "Logic minimization",
    language: "Language",
    inputBits: "Input bits",
    apply: "Apply",
    applyAllOutputs: "Apply all outputs",
    applyAllZero: "All 0",
    applyAllOne: "All 1",
    truthTable: "Truth table",
    outputValues: "Output values",
    clear: "Clear",
    example: "Example",
    outputVector: "Output vector",
    load: "Load",
    input: "Input",
    qmcProgression: "QMC progression",
    combiningImplicants: "Combining implicants",
    buildMethod: "Build method",
    initialStatus: "Enter a truth table, then build the method.",
    previousStep: "Previous step",
    nextStep: "Next step",
    ready: "Ready.",
    primeImplicantChart: "Prime implicant chart",
    simplificationGuesses: "Simplification guesses",
    resetChart: "Reset chart",
    checkStatus: "Check status",
    revealSolution: "Reveal solution",
    finish: "Finish",
    simplificationType: "Simplification type",
    essential: "Essential",
    rowDominance: "Row dominance",
    columnDominance: "Column dominance",
    applyGuess: "Apply guess",
    tutorial: "Tutorial",
    about: "About",
    close: "Close",
    truthHelpLabel: "Help for output values",
    methodHelpLabel: "Help for combining implicants",
    chartHelpLabel: "Help for simplification guesses",
    noChartYet: "No chart yet.",
    examGuardTitle: "Unlock qmc-sim",
    examGuardBody: "This desktop copy must be unlocked on this computer before it can run.",
    examGuardRequestCode: "Computer code",
    examGuardUnlockCode: "Unlock code",
    examGuardUnlock: "Unlock",
    examGuardChecking: "Checking unlock status...",
    examGuardUnconfigured: "This exam build is missing its public unlock key.",
    examGuardUnlocked: "Unlocked for this computer.",
    examGuardActivatedFor: ({ student }) => `Unlocked for ${student}.`,
    examGuardEnterCode: "Paste the unlock code supplied by the instructor.",
    truthTableCleared: "Truth table cleared.",
    allOutputsSet: ({ value }) => `All outputs set to ${value}.`,
    bitsSelected: ({ bits }) => `${bits} input bit${bits === 1 ? "" : "s"} selected.`,
    exampleLoaded: "Example loaded: minterms 0, 1, 2, 5, 6, 7, 8, 9, 10, 14 with don't-cares 11, 15.",
    vectorInvalid: ({ expected }) => `Vector must contain exactly ${expected} symbols: 0, 1, or X.`,
    vectorLoaded: "Vector loaded.",
    outputForMinterm: ({ index }) => `Output for minterm ${index}`,
    constantResult: "Constant result",
    constantZeroDesc: "F is 0 because the truth table has no minterms with output 1.",
    constantOneDesc: "All output-0 rows are absent, so every input is covered. The minimized result is",
    primeCount: ({ count }) => `${count} prime implicant${count === 1 ? "" : "s"} found.`,
    passTitle: ({ index }) => `Pass ${index}`,
    stepCount: ({ current, total }) => `${current} of ${total}`,
    onesGroup: ({ count }) => `${count} one${count === 1 ? "" : "s"}`,
    noFurtherCombination: "No further combination",
    unmarkedBecomePrime: "Unmarked implicants from this pass become prime implicants.",
    primesCaptured: "Prime implicants captured",
    successfulCombinations: "Successful combinations",
    newImplicantsThisStep: "New implicants from this pass",
    noNewImplicantsThisStep: "No new combined implicants were found in this pass.",
    newPrimeThisStep: "New prime implicants from this pass",
    noNewPrimeThisStep: "No new prime implicants are finalized in this pass.",
    primeSoFar: "Prime implicants accumulated so far",
    noPrimeSoFar: "No prime implicants have been accumulated yet.",
    chartReady: "Prime implicants are ready. Try a simplification guess.",
    chartReset: "Chart reset.",
    selected: "Selected",
    remainingMinterms: "Remaining minterms",
    none: "none",
    implicant: "Implicant",
    selectionEssentialEmpty: "Select one implicant row.",
    selectionEssentialChosen: ({ row }) => `Essential guess: ${row}`,
    selectionRowEmpty: "Select row to remove, then the row that dominates it.",
    selectionRowChosen: ({ remove, dominator }) => `Remove ${remove || "..."}; covered by ${dominator || "..."}`,
    selectionColumnEmpty: "Select column to remove, then the stricter column.",
    selectionColumnChosen: ({ remove, strict }) => `Remove m${remove ?? "..."}; justified by m${strict ?? "..."}`,
    chooseEssentialRow: "Choose one active row before applying an essential implicant guess.",
    hasCoveringRows: ({ col, count }) => `m${col} has ${count} covering rows`,
    coversNoActive: ({ row }) => `${row} covers no active minterm`,
    notEssential: ({ row, detail }) => `${row} is not essential. ${detail}.`,
    essentialHistory: ({ row, cols }) => `Essential implicant: ${row} alone covers ${cols}.`,
    essentialCorrect: ({ row }) => `Correct. ${row} is essential and has been selected.`,
    chooseRowDominance: "Choose two different active rows: first the row to remove, then the row that covers at least the same active minterms.",
    doesNotDominate: ({ dominator, remove, missing }) => `${dominator} does not dominate ${remove}; it misses ${missing}.`,
    sameCoverageMoreLiterals: ({ dominator, remove }) => `${dominator} covers the same active minterms, but it has more literals than ${remove}. Removing ${remove} would make the expression no simpler.`,
    rowHistory: ({ remove, dominator }) => `Row dominance: removed ${remove}, covered by ${dominator}.`,
    rowCorrect: ({ remove, dominator }) => `Correct. ${remove} was removed because ${dominator} covers all of its active minterms.`,
    chooseColumnDominance: "Choose two different active columns: first the column to remove, then the stricter column that forces it.",
    columnMiss: ({ strict, remove, missing }) => `m${strict} does not justify removing m${remove}; ${missing} cover m${strict} without covering m${remove}.`,
    sameColumnsTie: ({ remove, strict }) => `m${remove} and m${strict} are covered by the same rows. That tie does not prove either column can be removed here.`,
    columnHistory: ({ remove, strict }) => `Column dominance: removed m${remove}, forced by m${strict}.`,
    columnCorrect: ({ remove, strict }) => `Correct. m${remove} was removed because every row that covers m${strict} also covers m${remove}.`,
    allCovered: "All minterms are covered. The selected implicants already form a complete minimized expression.",
    noSimplifications: "No essential implicant, row dominance, or column dominance remains. The remaining coverage choice needs a final selection method.",
    noMoreAlert: "No more chart simplifications are available.",
    revealAllCovered: "All minterms are already covered.",
    revealNoMoves: "No essential implicant, row dominance, or column dominance is currently available.",
    revealIntro: "Valid table simplifications available now:",
    revealEssentialTitle: "Essential implicants",
    revealRowTitle: "Row dominance",
    revealColumnTitle: "Column dominance",
    revealEssentialItem: ({ row, cols }) => `${row} is essential; it is the only row covering ${cols}.`,
    revealRowItem: ({ remove, dominator, cols }) => `Remove ${remove}; ${dominator} covers every active minterm covered by ${remove} (${cols}).`,
    revealColumnItem: ({ remove, strict, rows }) => `Remove m${remove}; m${strict} is stricter because every row covering it also covers m${remove} (${rows}).`,
    essentialCandidate: ({ count }) => `${count} essential candidate${count === 1 ? "" : "s"}`,
    rowMove: ({ count }) => `${count} row dominance move${count === 1 ? "" : "s"}`,
    columnMove: ({ count }) => `${count} column dominance move${count === 1 ? "" : "s"}`,
    validSimplification: ({ hints }) => `There is still a valid simplification: ${hints}.`,
    finishBlocked: ({ parts }) => `There is still a chart simplification available: ${parts}. Apply one before final coverage.`,
    finalCoverage: "Final coverage",
    appliedChartMoves: "Applied chart moves",
    noHistory: "No chart simplification has been applied yet.",
    finalCoveredDesc: "The chart is fully covered by the selected essential or dominance-confirmed implicants.",
    trivialChoice: ({ explanation }) => `The remaining choice is trivial: ${explanation}`,
    proposedResult: "Proposed result",
    petrickIntro: "The remaining chart is not settled by essential implicants or dominance, so Petrick's method is applied as an example.",
    oneMinimumCover: "One minimum cover",
    alreadyCoveredExplanation: "all active minterms are already covered",
    onlyRemainingImplicant: ({ row }) => `${row} is the only remaining active implicant.`,
    onlyRemainingMinterm: ({ col, row }) => `only m${col} remains, so any row covering it works; ${row} is the shortest available choice.`,
    afterMinterm: ({ col, products }) => `After m${col}: ${products}`,
    minimumProduct: ({ product }) => `Minimum product chosen: ${product}.`
  },
  it: {
    appTitle: "Simulatore Quine-McCluskey",
    logicMinimization: "Minimizzazione logica",
    language: "Lingua",
    inputBits: "Bit di input",
    apply: "Applica",
    applyAllOutputs: "Applica a tutte le uscite",
    applyAllZero: "Tutti 0",
    applyAllOne: "Tutti 1",
    truthTable: "Tabella di verità",
    outputValues: "Valori di uscita",
    clear: "Pulisci",
    example: "Esempio",
    outputVector: "Vettore di uscita",
    load: "Carica",
    input: "Input",
    qmcProgression: "Progressione QMC",
    combiningImplicants: "Combinazione degli implicanti",
    buildMethod: "Costruisci metodo",
    initialStatus: "Inserisci una tabella di verità, poi costruisci il metodo.",
    previousStep: "Passo precedente",
    nextStep: "Passo successivo",
    ready: "Pronto.",
    primeImplicantChart: "Tabella degli implicanti primi",
    simplificationGuesses: "Tentativi di semplificazione",
    resetChart: "Reimposta tabella",
    checkStatus: "Controlla stato",
    revealSolution: "Rivela soluzione",
    finish: "Concludi",
    simplificationType: "Tipo di semplificazione",
    essential: "Essenziale",
    rowDominance: "Dominanza di riga",
    columnDominance: "Dominanza di colonna",
    applyGuess: "Applica scelta",
    tutorial: "Tutorial",
    about: "Info",
    close: "Chiudi",
    truthHelpLabel: "Aiuto per i valori di uscita",
    methodHelpLabel: "Aiuto per la combinazione degli implicanti",
    chartHelpLabel: "Aiuto per i tentativi di semplificazione",
    noChartYet: "Nessuna tabella ancora.",
    examGuardTitle: "Sblocca qmc-sim",
    examGuardBody: "Questa copia desktop deve essere sbloccata su questo computer prima di poter essere usata.",
    examGuardRequestCode: "Codice computer",
    examGuardUnlockCode: "Codice di sblocco",
    examGuardUnlock: "Sblocca",
    examGuardChecking: "Controllo dello sblocco...",
    examGuardUnconfigured: "A questa build d'esame manca la chiave pubblica di sblocco.",
    examGuardUnlocked: "Sbloccato per questo computer.",
    examGuardActivatedFor: ({ student }) => `Sbloccato per ${student}.`,
    examGuardEnterCode: "Incolla il codice di sblocco fornito dal docente.",
    truthTableCleared: "Tabella di verità pulita.",
    allOutputsSet: ({ value }) => `Tutte le uscite impostate a ${value}.`,
    bitsSelected: ({ bits }) => `${bits} bit di input selezionat${bits === 1 ? "o" : "i"}.`,
    exampleLoaded: "Esempio caricato: mintermini 0, 1, 2, 5, 6, 7, 8, 9, 10, 14 con don't-care 11, 15.",
    vectorInvalid: ({ expected }) => `Il vettore deve contenere esattamente ${expected} simboli: 0, 1 oppure X.`,
    vectorLoaded: "Vettore caricato.",
    outputForMinterm: ({ index }) => `Uscita per il mintermine ${index}`,
    constantResult: "Risultato costante",
    constantZeroDesc: "F vale 0 perché la tabella di verità non contiene mintermini con uscita 1.",
    constantOneDesc: "Non ci sono righe con uscita 0, quindi ogni input è coperto. Il risultato minimizzato è",
    primeCount: ({ count }) => `${count} implicant${count === 1 ? "e primo trovato" : "i primi trovati"}.`,
    passTitle: ({ index }) => `Passo ${index}`,
    stepCount: ({ current, total }) => `${current} di ${total}`,
    onesGroup: ({ count }) => `${count} un${count === 1 ? "o" : "i"}`,
    noFurtherCombination: "Nessuna ulteriore combinazione",
    unmarkedBecomePrime: "Gli implicanti non marcati in questo passo diventano implicanti primi.",
    primesCaptured: "Implicanti primi individuati",
    successfulCombinations: "Combinazioni riuscite",
    newImplicantsThisStep: "Nuovi implicanti da questo passo",
    noNewImplicantsThisStep: "In questo passo non sono stati trovati nuovi implicanti combinati.",
    newPrimeThisStep: "Nuovi implicanti primi da questo passo",
    noNewPrimeThisStep: "In questo passo non viene finalizzato alcun nuovo implicante primo.",
    primeSoFar: "Implicanti primi accumulati finora",
    noPrimeSoFar: "Non è stato ancora accumulato alcun implicante primo.",
    chartReady: "Gli implicanti primi sono pronti. Prova una scelta di semplificazione.",
    chartReset: "Tabella reimpostata.",
    selected: "Selezionati",
    remainingMinterms: "Mintermini rimanenti",
    none: "nessuno",
    implicant: "Implicante",
    selectionEssentialEmpty: "Seleziona una riga di implicante.",
    selectionEssentialChosen: ({ row }) => `Ipotesi essenziale: ${row}`,
    selectionRowEmpty: "Seleziona la riga da eliminare, poi la riga che la domina.",
    selectionRowChosen: ({ remove, dominator }) => `Elimina ${remove || "..."}; coperta da ${dominator || "..."}`,
    selectionColumnEmpty: "Seleziona la colonna da eliminare, poi la colonna più vincolante.",
    selectionColumnChosen: ({ remove, strict }) => `Elimina m${remove ?? "..."}; giustificata da m${strict ?? "..."}`,
    chooseEssentialRow: "Scegli una riga attiva prima di applicare un tentativo di implicante essenziale.",
    hasCoveringRows: ({ col, count }) => `m${col} ha ${count} righe che la coprono`,
    coversNoActive: ({ row }) => `${row} non copre alcun mintermine attivo`,
    notEssential: ({ row, detail }) => `${row} non è essenziale. ${detail}.`,
    essentialHistory: ({ row, cols }) => `Implicante essenziale: ${row} copre da solo ${cols}.`,
    essentialCorrect: ({ row }) => `Corretto. ${row} è essenziale ed è stato selezionato.`,
    chooseRowDominance: "Scegli due righe attive diverse: prima la riga da eliminare, poi la riga che copre almeno gli stessi mintermini attivi.",
    doesNotDominate: ({ dominator, remove, missing }) => `${dominator} non domina ${remove}; non copre ${missing}.`,
    sameCoverageMoreLiterals: ({ dominator, remove }) => `${dominator} copre gli stessi mintermini attivi, ma ha più letterali di ${remove}. Eliminare ${remove} non semplificherebbe l'espressione.`,
    rowHistory: ({ remove, dominator }) => `Dominanza di riga: eliminata ${remove}, coperta da ${dominator}.`,
    rowCorrect: ({ remove, dominator }) => `Corretto. ${remove} è stata eliminata perché ${dominator} copre tutti i suoi mintermini attivi.`,
    chooseColumnDominance: "Scegli due colonne attive diverse: prima la colonna da eliminare, poi la colonna più vincolante che la forza.",
    columnMiss: ({ strict, remove, missing }) => `m${strict} non giustifica l'eliminazione di m${remove}; ${missing} coprono m${strict} senza coprire m${remove}.`,
    sameColumnsTie: ({ remove, strict }) => `m${remove} e m${strict} sono coperte dalle stesse righe. Questo pareggio non dimostra che una delle due colonne possa essere eliminata qui.`,
    columnHistory: ({ remove, strict }) => `Dominanza di colonna: eliminata m${remove}, forzata da m${strict}.`,
    columnCorrect: ({ remove, strict }) => `Corretto. m${remove} è stata eliminata perché ogni riga che copre m${strict} copre anche m${remove}.`,
    allCovered: "Tutti i mintermini sono coperti. Gli implicanti selezionati formano già un'espressione minimizzata completa.",
    noSimplifications: "Non resta alcun implicante essenziale, né dominanza di riga o di colonna. La copertura rimanente richiede un metodo di scelta finale.",
    noMoreAlert: "Non sono disponibili altre semplificazioni della tabella.",
    revealAllCovered: "Tutti i mintermini sono già coperti.",
    revealNoMoves: "Al momento non sono disponibili implicanti essenziali, dominanze di riga o dominanze di colonna.",
    revealIntro: "Semplificazioni valide disponibili ora:",
    revealEssentialTitle: "Implicanti essenziali",
    revealRowTitle: "Dominanza di riga",
    revealColumnTitle: "Dominanza di colonna",
    revealEssentialItem: ({ row, cols }) => `${row} è essenziale; è l'unica riga che copre ${cols}.`,
    revealRowItem: ({ remove, dominator, cols }) => `Elimina ${remove}; ${dominator} copre tutti i mintermini attivi coperti da ${remove} (${cols}).`,
    revealColumnItem: ({ remove, strict, rows }) => `Elimina m${remove}; m${strict} è più vincolante perché ogni riga che la copre copre anche m${remove} (${rows}).`,
    essentialCandidate: ({ count }) => `${count} candidat${count === 1 ? "o" : "i"} essenziale${count === 1 ? "" : "i"}`,
    rowMove: ({ count }) => `${count} moss${count === 1 ? "a" : "e"} di dominanza di riga`,
    columnMove: ({ count }) => `${count} moss${count === 1 ? "a" : "e"} di dominanza di colonna`,
    validSimplification: ({ hints }) => `C'è ancora una semplificazione valida: ${hints}.`,
    finishBlocked: ({ parts }) => `C'è ancora una semplificazione disponibile nella tabella: ${parts}. Applicala prima della copertura finale.`,
    finalCoverage: "Copertura finale",
    appliedChartMoves: "Mosse applicate alla tabella",
    noHistory: "Non è ancora stata applicata alcuna semplificazione della tabella.",
    finalCoveredDesc: "La tabella è completamente coperta dagli implicanti essenziali o confermati dalla dominanza.",
    trivialChoice: ({ explanation }) => `La scelta rimanente è banale: ${explanation}`,
    proposedResult: "Risultato proposto",
    petrickIntro: "La tabella rimanente non è risolta da implicanti essenziali o dominanza, quindi si applica il metodo di Petrick come esempio.",
    oneMinimumCover: "Una copertura minima",
    alreadyCoveredExplanation: "tutti i mintermini attivi sono già coperti",
    onlyRemainingImplicant: ({ row }) => `${row} è l'unico implicante attivo rimanente.`,
    onlyRemainingMinterm: ({ col, row }) => `rimane solo m${col}, quindi va bene qualsiasi riga che lo copra; ${row} è la scelta disponibile più corta.`,
    afterMinterm: ({ col, products }) => `Dopo m${col}: ${products}`,
    minimumProduct: ({ product }) => `Prodotto minimo scelto: ${product}.`
  }
};

const infoTopics = {
  en: {
    about: {
      title: "About qmc-sim",
      paragraphs: [
        "qmc-sim is a local teaching tool for practicing Quine-McCluskey logic minimization from truth table entry through prime implicant chart reduction.",
        "It runs entirely in the browser or Electron app; no truth tables or exercises are sent anywhere."
      ],
      facts: [
        ["Author", "Davide Patti"],
        ["Email", "xedivad@gmail.com"],
        ["License", "MIT License"],
        ["Repository", "github.com/davidepatti/bitland_empire", "https://github.com/davidepatti/bitland_empire"]
      ]
    },
    tutorial: {
      title: "Tutorial",
      paragraphs: [
        "Use this flow when you want to complete an exercise from the truth table to the minimized expression."
      ],
      steps: [
        {
          visual: "truth",
          title: "1. Prepare the truth table",
          body: "Choose the number of input bits, then mark every output as 0, 1, or X. You can also load an output vector or the example exercise."
        },
        {
          visual: "build",
          title: "2. Build the QMC progression",
          body: "Press Build method to group minterms and don't-cares by the number of ones and generate the first combination pass."
        },
        {
          visual: "passes",
          title: "3. Inspect each pass",
          body: "Use the previous and next arrows to review which implicants combine, which ones stop combining, and which prime implicants have been found."
        },
        {
          visual: "chart",
          title: "4. Reduce the prime implicant chart",
          body: "Choose Essential, Row dominance, or Column dominance. Click the required row or column candidates, then apply the guess."
        },
        {
          visual: "finish",
          title: "5. Finish the cover",
          body: "Check the status until no table simplification remains, then Finish to see the final cover and the minimized expression."
        }
      ]
    },
    truth: {
      title: "Output values",
      paragraphs: [
        "Choose the number of input bits, then mark each minterm output as 0, 1, or X for don't-care.",
        "You can also paste an output vector using 0, 1, X, or - and press Load. Use Example when you want a ready-made exercise."
      ]
    },
    method: {
      title: "Combining implicants",
      paragraphs: [
        "After the truth table is ready, press Build method to run the Quine-McCluskey grouping passes.",
        "Use the step arrows to inspect each pass: which implicants combine, which ones become prime, and how the result evolves."
      ]
    },
    chart: {
      title: "Simplification guesses",
      paragraphs: [
        "Use the prime implicant chart to practice the final covering stage.",
        "Select Essential, Row dominance, or Column dominance, then click the row or column candidates and Apply guess. Check status reports any simplification still available, while Finish completes the remaining cover when appropriate."
      ]
    }
  },
  it: {
    about: {
      title: "Info su qmc-sim",
      paragraphs: [
        "qmc-sim e uno strumento didattico locale per esercitarsi con la minimizzazione di Quine-McCluskey, dalla tabella di verita alla riduzione della tabella degli implicanti primi.",
        "Funziona interamente nel browser o nell'app Electron; tabelle di verita ed esercizi non vengono inviati da nessuna parte."
      ],
      facts: [
        ["Autore", "Davide Patti"],
        ["Email", "xedivad@gmail.com"],
        ["Licenza", "MIT License"],
        ["Repository", "github.com/davidepatti/bitland_empire", "https://github.com/davidepatti/bitland_empire"]
      ]
    },
    tutorial: {
      title: "Tutorial",
      paragraphs: [
        "Segui questo flusso per completare un esercizio dalla tabella di verita fino all'espressione minimizzata."
      ],
      steps: [
        {
          visual: "truth",
          title: "1. Prepara la tabella di verita",
          body: "Scegli il numero di bit di input, poi imposta ogni uscita a 0, 1 oppure X. Puoi anche caricare un vettore di uscita o l'esempio."
        },
        {
          visual: "build",
          title: "2. Costruisci la progressione QMC",
          body: "Premi Costruisci metodo per raggruppare mintermini e don't-care in base al numero di uni e generare il primo passo di combinazione."
        },
        {
          visual: "passes",
          title: "3. Osserva ogni passo",
          body: "Usa le frecce precedente e successivo per controllare quali implicanti si combinano, quali si fermano e quali implicanti primi sono stati trovati."
        },
        {
          visual: "chart",
          title: "4. Riduci la tabella degli implicanti primi",
          body: "Scegli Essenziale, Dominanza di riga o Dominanza di colonna. Clicca le righe o colonne richieste, poi applica la scelta."
        },
        {
          visual: "finish",
          title: "5. Concludi la copertura",
          body: "Controlla lo stato finche non resta alcuna semplificazione della tabella, poi premi Concludi per vedere la copertura finale e l'espressione minimizzata."
        }
      ]
    },
    truth: {
      title: "Valori di uscita",
      paragraphs: [
        "Scegli il numero di bit di input, poi imposta ogni mintermine a 0, 1 oppure X per i don't-care.",
        "Puoi anche incollare un vettore di uscita con 0, 1, X o - e premere Carica. Usa Esempio quando vuoi partire da un esercizio gia pronto."
      ]
    },
    method: {
      title: "Combinazione degli implicanti",
      paragraphs: [
        "Quando la tabella e pronta, premi Costruisci metodo per eseguire i passaggi di raggruppamento di Quine-McCluskey.",
        "Usa le frecce per osservare ogni passo: quali implicanti si combinano, quali diventano primi e come evolve il risultato."
      ]
    },
    chart: {
      title: "Tentativi di semplificazione",
      paragraphs: [
        "Usa la tabella degli implicanti primi per esercitarti nella fase finale di copertura.",
        "Scegli Essenziale, Dominanza di riga o Dominanza di colonna, poi clicca righe o colonne candidate e premi Applica scelta. Controlla stato segnala le semplificazioni ancora disponibili, mentre Concludi completa la copertura rimanente quando possibile."
      ]
    }
  }
};

const state = {
  language: getInitialLanguage(),
  bits: 3,
  outputs: [],
  qmc: null,
  stepIndex: 0,
  mode: "essential",
  selectedRows: [],
  selectedCols: [],
  chart: null,
  alertedNoMore: false,
  lastFinal: null,
  examGuard: {
    ready: false,
    available: false,
    enabled: false,
    configured: false,
    locked: false,
    watermarkEnabled: false,
    watermarkSeed: "browser",
    requestCode: "",
    error: "",
    activation: null
  }
};

const els = {
  tutorialButton: document.getElementById("tutorialButton"),
  aboutButton: document.getElementById("aboutButton"),
  languageSelect: document.getElementById("languageSelect"),
  bitCount: document.getElementById("bitCount"),
  applyBits: document.getElementById("applyBits"),
  fillZeros: document.getElementById("fillZeros"),
  fillOnes: document.getElementById("fillOnes"),
  clearTable: document.getElementById("clearTable"),
  loadExample: document.getElementById("loadExample"),
  vectorInput: document.getElementById("vectorInput"),
  loadVector: document.getElementById("loadVector"),
  truthBody: document.getElementById("truthBody"),
  buildQmc: document.getElementById("buildQmc"),
  statusLine: document.getElementById("statusLine"),
  stepControls: document.getElementById("stepControls"),
  prevStep: document.getElementById("prevStep"),
  nextStep: document.getElementById("nextStep"),
  stepTitle: document.getElementById("stepTitle"),
  stepCount: document.getElementById("stepCount"),
  stepView: document.getElementById("stepView"),
  chartPanel: document.getElementById("chartPanel"),
  modeButtons: Array.from(document.querySelectorAll(".mode-button")),
  selectionText: document.getElementById("selectionText"),
  applyGuess: document.getElementById("applyGuess"),
  resetChart: document.getElementById("resetChart"),
  checkStatus: document.getElementById("checkStatus"),
  revealSolution: document.getElementById("revealSolution"),
  finishCoverage: document.getElementById("finishCoverage"),
  messageBox: document.getElementById("messageBox"),
  selectedBox: document.getElementById("selectedBox"),
  chartWrap: document.getElementById("chartWrap"),
  finalBox: document.getElementById("finalBox"),
  infoModal: document.getElementById("infoModal"),
  infoModalTitle: document.getElementById("infoModalTitle"),
  infoModalBody: document.getElementById("infoModalBody")
};

let lastInfoTrigger = null;

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(languageKey);
    if (saved === "en" || saved === "it") return saved;
  } catch (error) {
    // Local files may block storage in some browser settings.
  }
  return navigator.language && navigator.language.toLowerCase().startsWith("it") ? "it" : "en";
}

function t(key, params = {}) {
  const entry = translations[state.language][key] ?? translations.en[key] ?? key;
  if (typeof entry === "function") return entry(params);
  return entry.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = t("appTitle");
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(element => {
    element.dataset.i18nAttr.split(";").forEach(pair => {
      const [attr, key] = pair.split(":");
      if (attr && key) element.setAttribute(attr, t(key));
    });
  });
}

function setLanguage(language) {
  if (language !== "en" && language !== "it") return;
  state.language = language;
  try {
    localStorage.setItem(languageKey, language);
  } catch (error) {
    // Storage is optional; the selector still works for this session.
  }
  applyTranslations();
  renderExamGuard();
  renderCurrentLanguageState();
}

function currentInfoTopic(key) {
  return infoTopics[state.language][key] || infoTopics.en[key];
}

function renderInfoBody(topic) {
  els.infoModalBody.innerHTML = "";
  topic.paragraphs.forEach(text => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    els.infoModalBody.appendChild(paragraph);
  });

  if (topic.facts) {
    const list = document.createElement("dl");
    list.className = "info-facts";
    topic.facts.forEach(([label, value, href]) => {
      const term = document.createElement("dt");
      const detail = document.createElement("dd");
      term.textContent = label;
      if (href || value.includes("@")) {
        const link = document.createElement("a");
        link.href = href || `mailto:${value}`;
        link.textContent = value;
        if (href) {
          link.target = "_blank";
          link.rel = "noopener";
        }
        detail.appendChild(link);
      } else {
        detail.textContent = value;
      }
      list.append(term, detail);
    });
    els.infoModalBody.appendChild(list);
  }

  if (topic.steps) {
    const steps = document.createElement("div");
    steps.className = "tutorial-steps";
    topic.steps.forEach(step => {
      const article = document.createElement("article");
      article.className = "tutorial-step";

      const shot = document.createElement("div");
      shot.className = `tutorial-screenshot tutorial-screenshot-${step.visual}`;
      shot.setAttribute("aria-hidden", "true");
      shot.innerHTML = tutorialVisual(step.visual);

      const copy = document.createElement("div");
      copy.className = "tutorial-copy";
      const title = document.createElement("h3");
      const body = document.createElement("p");
      title.textContent = step.title;
      body.textContent = step.body;
      copy.append(title, body);

      article.append(shot, copy);
      steps.appendChild(article);
    });
    els.infoModalBody.appendChild(steps);
  }
}

function tutorialVisual(type) {
  const labels = {
    truth: t("truthTable"),
    bits: t("inputBits"),
    vector: t("outputVector"),
    build: t("buildMethod"),
    pass: t("passTitle", { index: 1 }),
    combinations: t("successfulCombinations"),
    primes: t("primeSoFar"),
    chart: t("primeImplicantChart"),
    essential: t("essential"),
    row: t("rowDominance"),
    column: t("columnDominance"),
    apply: t("applyGuess"),
    status: t("checkStatus"),
    finish: t("finish"),
    final: t("finalCoverage")
  };

  if (type === "truth") {
    return `
      <div class="shot-bar"><span>${escapeHtml(labels.truth)}</span><span>${escapeHtml(labels.bits)}: 3</span></div>
      <div class="shot-field"><span>${escapeHtml(labels.vector)}</span><strong>0110X001</strong></div>
      <div class="shot-table">
        <span>m0</span><span>000</span><strong>0</strong>
        <span>m1</span><span>001</span><strong class="shot-good">1</strong>
        <span>m2</span><span>010</span><strong class="shot-good">1</strong>
        <span>m3</span><span>011</span><strong class="shot-warn">X</strong>
      </div>
    `;
  }

  if (type === "build") {
    return `
      <div class="shot-bar"><span>${escapeHtml(labels.build)}</span><span>QMC</span></div>
      <div class="shot-groups">
        <div><b>0</b><span class="pattern">000</span><small>{0}</small></div>
        <div><b>1</b><span class="pattern">001</span><small>{1}</small></div>
        <div><b>2</b><span class="pattern">011</span><small>{3}</small></div>
      </div>
      <div class="shot-arrow-row"><span class="pattern">001</span><b>+</b><span class="pattern">011</span><b>=</b><span class="pattern">0-1</span></div>
    `;
  }

  if (type === "passes") {
    return `
      <div class="shot-nav"><span>‹</span><strong>${escapeHtml(labels.pass)}</strong><span>›</span></div>
      <div class="shot-card"><b>${escapeHtml(labels.combinations)}</b><span><span class="pattern">01-</span> + <span class="pattern">11-</span> = <span class="pattern">-1-</span></span></div>
      <div class="shot-card"><b>${escapeHtml(labels.primes)}</b><span>P1 <span class="pattern">0-1</span></span><span>P2 <span class="pattern">-10</span></span></div>
    `;
  }

  if (type === "chart") {
    return `
      <div class="shot-tabs"><span class="active">${escapeHtml(labels.essential)}</span><span>${escapeHtml(labels.row)}</span><span>${escapeHtml(labels.column)}</span></div>
      <div class="shot-chart">
        <span></span><b>m1</b><b>m2</b><b>m5</b>
        <b>P1</b><i>x</i><i></i><i>x</i>
        <b>P2</b><i></i><i>x</i><i>x</i>
        <b>P3</b><i>x</i><i>x</i><i></i>
      </div>
      <div class="shot-cta">${escapeHtml(labels.apply)}</div>
    `;
  }

  return `
    <div class="shot-bar"><span>${escapeHtml(labels.final)}</span><span>${escapeHtml(labels.finish)}</span></div>
    <div class="shot-status">${escapeHtml(labels.status)}: OK</div>
    <div class="shot-result"><span>F =</span><strong>A'C + BC'</strong></div>
    <div class="shot-history"><span>P1</span><span>P3</span><span>P4</span></div>
  `;
}

function openInfo(topicKey, trigger) {
  const topic = currentInfoTopic(topicKey);
  if (!topic) return;
  lastInfoTrigger = trigger;
  els.infoModal.querySelector(".info-card").classList.toggle("tutorial-card", Boolean(topic.steps));
  els.infoModalTitle.textContent = topic.title;
  renderInfoBody(topic);
  els.infoModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  els.infoModal.querySelector(".modal-close").focus();
}

function closeInfo() {
  els.infoModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  if (lastInfoTrigger) lastInfoTrigger.focus();
}

function renderCurrentLanguageState() {
  renderTruthTable();
  updateVectorInput();
  updateSelectionText();

  if (!state.qmc) {
    if (els.stepView.classList.contains("empty-state")) renderReadyState();
    return;
  }

  if (state.qmc.constant === "0") {
    renderConstantZero();
    setStatus("F = 0.");
  } else if (state.qmc.constant === "1") {
    renderConstantOne();
    setStatus("F = 1.");
  } else if (state.qmc.passes.length) {
    renderStep();
    setStatus(t("primeCount", { count: state.qmc.primes.length }));
  }

  if (state.chart) {
    renderChart();
    showMessage(t("chartReady"), "neutral");
  }
  if (state.lastFinal && !els.finalBox.classList.contains("hidden")) {
    const baseRows = Array.from(state.chart.chosenRows);
    const activeCols = sortedSet(state.chart.activeCols);
    renderFinal(solveRemainingCoverage(activeCols, sortedSet(state.chart.activeRows), baseRows));
  }
}

function init() {
  els.languageSelect.value = state.language;
  document.documentElement.lang = state.language;
  state.outputs = makeDefaultOutputs(state.bits);
  bindEvents();
  applyTranslations();
  renderTruthTable();
  updateVectorInput();
  initExamGuard();
}

function hasExamGuardApi() {
  return Boolean(window.qmcExamGuard && typeof window.qmcExamGuard.getStatus === "function");
}

function initExamGuard() {
  if (!hasExamGuardApi()) {
    applyExamGuardStatus({
      ready: true,
      available: false,
      enabled: false,
      locked: false,
      watermarkEnabled: false,
      watermarkSeed: "browser"
    });
    return;
  }

  applyExamGuardStatus({
    ready: false,
    available: true,
    enabled: true,
    configured: false,
    locked: true,
    watermarkEnabled: false,
    watermarkSeed: "pending",
    error: ""
  });

  window.qmcExamGuard.getStatus()
    .then(status => applyExamGuardStatus(status))
    .catch(error => {
      applyExamGuardStatus({
        ready: true,
        available: true,
        enabled: true,
        configured: false,
        locked: true,
        watermarkEnabled: false,
        error: error.message || String(error)
      });
    });
}

function applyExamGuardStatus(status) {
  const next = {
    ...state.examGuard,
    ...status,
    ready: status.ready !== false,
    error: status.error || "",
    activation: status.activation || null
  };
  next.watermarkSeed = next.watermarkSeed || next.requestCode || "browser";
  state.examGuard = next;
  document.body.classList.toggle("exam-guard-locked", Boolean(next.available && next.enabled && next.locked));
  renderExamGuard();
}

function ensureExamGuardOverlay() {
  let overlay = document.getElementById("examGuardOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "examGuardOverlay";
    overlay.className = "exam-guard-overlay hidden";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    document.body.appendChild(overlay);
  }
  return overlay;
}

function renderExamGuard() {
  const overlay = ensureExamGuardOverlay();
  const guard = state.examGuard;
  const visible = Boolean(guard.available && guard.enabled && guard.locked);
  overlay.classList.toggle("hidden", !visible);
  document.body.classList.toggle("exam-guard-locked", visible);

  if (!visible) {
    overlay.innerHTML = "";
    return;
  }

  const pending = !guard.ready;
  const message = pending
    ? t("examGuardChecking")
    : guard.configured ? t("examGuardBody") : t("examGuardUnconfigured");
  const requestCode = guard.requestCode || "...";
  const inputDisabled = pending || !guard.configured ? " disabled" : "";
  const error = guard.error ? `<p class="exam-guard-error">${escapeHtml(guard.error)}</p>` : "";

  overlay.innerHTML = `
    <section class="exam-guard-card" aria-labelledby="examGuardTitle">
      <p class="eyebrow">${escapeHtml(t("logicMinimization"))}</p>
      <h2 id="examGuardTitle">${escapeHtml(t("examGuardTitle"))}</h2>
      <p>${escapeHtml(message)}</p>
      <label class="field exam-code-field">
        <span>${escapeHtml(t("examGuardRequestCode"))}</span>
        <code>${escapeHtml(requestCode)}</code>
      </label>
      <label class="field">
        <span>${escapeHtml(t("examGuardUnlockCode"))}</span>
        <input id="examUnlockCode" type="text" spellcheck="false" autocomplete="off"${inputDisabled}>
      </label>
      <div class="button-row compact">
        <button id="examUnlockButton" class="button primary" type="button" data-icon="✓"${inputDisabled}>${escapeHtml(t("examGuardUnlock"))}</button>
      </div>
      ${error}
    </section>
  `;

  const input = document.getElementById("examUnlockCode");
  const button = document.getElementById("examUnlockButton");
  if (input && !input.disabled) {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") activateExamGuard();
    });
    input.focus();
  }
  if (button && !button.disabled) {
    button.addEventListener("click", activateExamGuard);
  }
}

async function activateExamGuard() {
  const input = document.getElementById("examUnlockCode");
  const code = input ? input.value.trim() : "";
  if (!code) {
    applyExamGuardStatus({ ...state.examGuard, error: t("examGuardEnterCode") });
    return;
  }

  try {
    const result = await window.qmcExamGuard.activate(code);
    if (result.ok) {
      applyExamGuardStatus(result.status);
    } else {
      applyExamGuardStatus({
        ...(result.status || state.examGuard),
        error: result.error || (result.status && result.status.error) || ""
      });
    }
  } catch (error) {
    applyExamGuardStatus({ ...state.examGuard, error: error.message || String(error) });
  }
}

function bindEvents() {
  els.tutorialButton.addEventListener("click", () => openInfo("tutorial", els.tutorialButton));
  els.aboutButton.addEventListener("click", () => openInfo("about", els.aboutButton));
  document.querySelectorAll("[data-help]").forEach(button => {
    button.addEventListener("click", () => openInfo(button.dataset.help, button));
  });
  els.infoModal.querySelectorAll("[data-modal-close]").forEach(button => {
    button.addEventListener("click", closeInfo);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !els.infoModal.classList.contains("hidden")) {
      closeInfo();
    }
  });

  els.languageSelect.addEventListener("change", () => {
    setLanguage(els.languageSelect.value);
  });

  els.applyBits.addEventListener("click", () => {
    const bits = clamp(parseInt(els.bitCount.value, 10) || 3, 1, 6);
    setBits(bits);
  });

  els.clearTable.addEventListener("click", () => {
    state.outputs = makeDefaultOutputs(state.bits);
    resetWork();
    renderTruthTable();
    updateVectorInput();
    setStatus(t("truthTableCleared"));
  });

  els.fillZeros.addEventListener("click", () => setAllOutputs("0"));
  els.fillOnes.addEventListener("click", () => setAllOutputs("1"));

  els.loadExample.addEventListener("click", () => {
    setBits(4);
    const ones = new Set([0, 1, 2, 5, 6, 7, 8, 9, 10, 14]);
    const dcs = new Set([11, 15]);
    state.outputs = Array.from({ length: 16 }, (_, i) => dcs.has(i) ? "x" : ones.has(i) ? "1" : "0");
    resetWork();
    renderTruthTable();
    updateVectorInput();
    setStatus(t("exampleLoaded"));
  });

  els.loadVector.addEventListener("click", loadVectorFromInput);
  els.vectorInput.addEventListener("keydown", event => {
    if (event.key === "Enter") loadVectorFromInput();
  });

  els.buildQmc.addEventListener("click", buildMethod);
  els.prevStep.addEventListener("click", () => changeStep(-1));
  els.nextStep.addEventListener("click", () => changeStep(1));

  els.modeButtons.forEach(button => {
    button.addEventListener("click", () => {
      setMode(button.dataset.mode);
    });
  });

  els.applyGuess.addEventListener("click", applyGuess);
  els.resetChart.addEventListener("click", () => {
    if (!state.qmc) return;
    createChart();
    showMessage(t("chartReset"), "neutral");
  });
  els.checkStatus.addEventListener("click", reportChartStatus);
  els.revealSolution.addEventListener("click", revealSolution);
  els.finishCoverage.addEventListener("click", finishCoverage);
}

function setBits(bits) {
  state.bits = bits;
  els.bitCount.value = String(bits);
  state.outputs = makeDefaultOutputs(bits);
  resetWork();
  renderTruthTable();
  updateVectorInput();
  setStatus(t("bitsSelected", { bits }));
}

function setAllOutputs(value) {
  state.outputs = Array.from({ length: 2 ** state.bits }, () => value);
  resetWork();
  renderTruthTable();
  updateVectorInput();
  setStatus(t("allOutputsSet", { value }));
}

function makeDefaultOutputs(bits) {
  return Array.from({ length: 2 ** bits }, () => "0");
}

function resetWork() {
  state.qmc = null;
  state.stepIndex = 0;
  state.chart = null;
  state.selectedRows = [];
  state.selectedCols = [];
  state.alertedNoMore = false;
  els.stepControls.classList.add("hidden");
  els.chartPanel.classList.add("hidden");
  els.finalBox.classList.add("hidden");
  state.lastFinal = null;
  renderReadyState();
}

function renderReadyState() {
  els.stepView.className = "step-view empty-state";
  els.stepView.innerHTML = `
    <div class="mini-diagram" aria-hidden="true"><span></span><span></span><span></span></div>
    <p>${t("ready")}</p>
  `;
}

function renderTruthTable() {
  const rows = state.outputs.map((value, index) => {
    const bits = bitString(index, state.bits);
    return `
      <tr>
        <td>${index}</td>
        <td><span class="bitstring">${bits}</span></td>
        <td>
          <div class="output-toggle" role="group" aria-label="${t("outputForMinterm", { index })}">
            ${valueButton(index, "0", value)}
            ${valueButton(index, "1", value)}
            ${valueButton(index, "x", value)}
          </div>
        </td>
      </tr>
    `;
  }).join("");
  els.truthBody.innerHTML = rows;
  els.truthBody.querySelectorAll(".value-button").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const value = button.dataset.value;
      state.outputs[index] = value;
      resetWork();
      renderTruthTable();
      updateVectorInput();
    });
  });
}

function valueButton(index, value, current) {
  const active = current === value ? " active" : "";
  const label = value === "x" ? "X" : value;
  const pressed = current === value ? "true" : "false";
  return `<button class="value-button${active}" data-index="${index}" data-value="${value}" type="button" aria-pressed="${pressed}">${label}</button>`;
}

function updateVectorInput() {
  els.vectorInput.value = state.outputs.map(value => value.toUpperCase()).join("");
}

function loadVectorFromInput() {
  const raw = els.vectorInput.value.replace(/\s|,/g, "").toLowerCase();
  const expected = 2 ** state.bits;
  if (raw.length !== expected || /[^01x-]/.test(raw)) {
    setStatus(t("vectorInvalid", { expected }), true);
    updateVectorInput();
    return;
  }
  state.outputs = raw.split("").map(value => value === "-" ? "x" : value);
  resetWork();
  renderTruthTable();
  updateVectorInput();
  setStatus(t("vectorLoaded"));
}

function buildMethod() {
  const ones = outputIndices("1");
  const dcs = outputIndices("x");
  const zeros = outputIndices("0");
  state.alertedNoMore = false;

  if (ones.length === 0) {
    state.qmc = {
      ones,
      dcs,
      zeros,
      passes: [],
      primes: [],
      constant: "0"
    };
    els.stepControls.classList.add("hidden");
    els.chartPanel.classList.add("hidden");
    renderConstantZero();
    setStatus("F = 0.");
    return;
  }

  if (ones.length + dcs.length === 2 ** state.bits) {
    state.qmc = {
      ones,
      dcs,
      zeros,
      passes: [],
      primes: [makePrimeImplicant(repeat("-", state.bits), ones, 0)],
      constant: "1"
    };
    state.stepIndex = 0;
    renderConstantOne();
    createChart();
    setStatus("F = 1.");
    return;
  }

  state.qmc = runQuineMcCluskey(ones, dcs, state.bits);
  state.stepIndex = 0;
  els.stepControls.classList.remove("hidden");
  renderStep();
  createChart();
  setStatus(t("primeCount", { count: state.qmc.primes.length }));
}

function renderConstantZero() {
  els.stepView.className = "step-view";
  els.stepView.innerHTML = `<div class="prime-card"><h3>${t("constantResult")}</h3><p>${t("constantZeroDesc")}</p></div>`;
}

function renderConstantOne() {
  els.stepControls.classList.add("hidden");
  els.stepView.className = "step-view";
  els.stepView.innerHTML = `
    <div class="prime-card">
      <h3>${t("constantResult")}</h3>
      <p>${t("constantOneDesc")} <strong>F = 1</strong>.</p>
    </div>
  `;
}

function outputIndices(value) {
  return state.outputs
    .map((output, index) => output === value ? index : -1)
    .filter(index => index >= 0);
}

function runQuineMcCluskey(ones, dcs, bits) {
  const allTerms = [...ones, ...dcs].sort((a, b) => a - b);
  let currentTerms = allTerms.map(index => makeTerm(bitString(index, bits), [index], ones.includes(index), index));
  const passes = [];
  const primeMap = new Map();
  let passNumber = 0;

  while (currentTerms.length > 0) {
    const groups = groupTerms(currentTerms);
    const usedIds = new Set();
    const combinations = [];
    const nextMap = new Map();

    const groupNumbers = Array.from(groups.keys()).sort((a, b) => a - b);
    for (const groupNumber of groupNumbers) {
      const leftGroup = groups.get(groupNumber) || [];
      const rightGroup = groups.get(groupNumber + 1) || [];
      leftGroup.forEach(left => {
        rightGroup.forEach(right => {
          const combinedPattern = combinePatterns(left.pattern, right.pattern);
          if (!combinedPattern) return;
          usedIds.add(left.id);
          usedIds.add(right.id);
          const combined = mergeTerms(combinedPattern, left, right, ones);
          const key = combined.pattern;
          if (!nextMap.has(key)) {
            nextMap.set(key, combined);
          } else {
            nextMap.set(key, absorbTerm(nextMap.get(key), combined, ones));
          }
          combinations.push({ left, right, result: nextMap.get(key) });
        });
      });
    }

    currentTerms.forEach(term => {
      if (!usedIds.has(term.id) && term.minterms.length > 0) {
        const prime = makePrimeImplicant(term.pattern, ones, passNumber);
        if (prime.covers.length > 0 && !primeMap.has(prime.pattern)) {
          primeMap.set(prime.pattern, prime);
        }
      }
    });

    const newTerms = Array.from(nextMap.values())
      .sort((a, b) => a.pattern.localeCompare(b.pattern) || a.source[0] - b.source[0]);

    passes.push({
      index: passNumber,
      terms: currentTerms.map(term => ({ ...term, used: usedIds.has(term.id) })),
      groups,
      combinations,
      newTerms
    });

    const nextTerms = newTerms;
    if (nextTerms.length === 0) break;
    currentTerms = nextTerms;
    passNumber += 1;
  }

  const primes = Array.from(primeMap.values())
    .sort((a, b) => literalCount(a.pattern) - literalCount(b.pattern) || a.pattern.localeCompare(b.pattern))
    .map((prime, index) => ({ ...prime, id: `P${index + 1}`, label: `P${index + 1}` }));

  return { ones, dcs, passes, primes, constant: null };
}

function makeTerm(pattern, source, isMinterm, originalIndex) {
  const sortedSource = [...source].sort((a, b) => a - b);
  return {
    id: `${pattern}|${sortedSource.join(",")}`,
    pattern,
    source: sortedSource,
    minterms: isMinterm ? [originalIndex] : [],
    used: false
  };
}

function mergeTerms(pattern, left, right, ones) {
  const source = uniqueNumbers([...left.source, ...right.source]);
  const minterms = source.filter(value => ones.includes(value));
  return {
    id: `${pattern}|${source.join(",")}`,
    pattern,
    source,
    minterms,
    used: false
  };
}

function absorbTerm(base, addition, ones) {
  const source = uniqueNumbers([...base.source, ...addition.source]);
  const minterms = source.filter(value => ones.includes(value));
  return {
    ...base,
    id: `${base.pattern}|${source.join(",")}`,
    source,
    minterms
  };
}

function makePrimeImplicant(pattern, ones, passNumber) {
  const covers = ones.filter(index => matchesPattern(pattern, bitString(index, state.bits)));
  return {
    id: pattern,
    label: pattern,
    pattern,
    expression: patternToExpression(pattern),
    covers,
    passNumber
  };
}

function groupTerms(terms) {
  const groups = new Map();
  terms.forEach(term => {
    const count = onesCount(term.pattern);
    if (!groups.has(count)) groups.set(count, []);
    groups.get(count).push(term);
  });
  return groups;
}

function combinePatterns(left, right) {
  let differences = 0;
  let pattern = "";
  for (let i = 0; i < left.length; i += 1) {
    if (left[i] === right[i]) {
      pattern += left[i];
    } else if (left[i] !== "-" && right[i] !== "-") {
      differences += 1;
      pattern += "-";
    } else {
      return null;
    }
  }
  return differences === 1 ? pattern : null;
}

function renderStep() {
  const pass = state.qmc.passes[state.stepIndex];
  els.prevStep.disabled = state.stepIndex === 0;
  els.nextStep.disabled = state.stepIndex === state.qmc.passes.length - 1;
  els.stepTitle.textContent = t("passTitle", { index: pass.index });
  els.stepCount.textContent = t("stepCount", { current: state.stepIndex + 1, total: state.qmc.passes.length });
  els.stepView.className = "step-view";

  const groupNumbers = Array.from(pass.groups.keys()).sort((a, b) => a - b);
  const groupsHtml = groupNumbers.map(groupNumber => {
    const terms = pass.groups.get(groupNumber);
    const chips = terms.map(term => `
      <span class="chip ${term.used ? "used" : ""}">
        <span class="pattern">${term.pattern}</span>
        <span>{${term.source.join(",")}}</span>
      </span>
    `).join("");
    return `
      <div class="group-card">
        <h3>${t("onesGroup", { count: groupNumber })}</h3>
        <div class="chip-list">${chips}</div>
      </div>
    `;
  }).join("");

  const combinationsHtml = pass.combinations.length
    ? pass.combinations.map(item => `
      <div class="combination">
        <span><span class="pattern">${item.left.pattern}</span> {${item.left.source.join(",")}}</span>
        <span class="arrow">+</span>
        <span><span class="pattern">${item.right.pattern}</span> {${item.right.source.join(",")}}</span>
        <span class="arrow">=</span>
        <strong><span class="pattern">${item.result.pattern}</span> {${item.result.source.join(",")}}</strong>
      </div>
    `).join("")
    : `<div class="combination-card"><h3>${t("noFurtherCombination")}</h3><p>${t("unmarkedBecomePrime")}</p></div>`;

  const newImplicantsHtml = pass.newTerms.length
    ? renderTermChipList(pass.newTerms)
    : `<p class="muted-copy">${t("noNewImplicantsThisStep")}</p>`;
  const primesFromPass = state.qmc.primes.filter(prime => prime.passNumber === pass.index);
  const cumulativePrimes = state.qmc.primes.filter(prime => prime.passNumber <= pass.index);
  const primesFromPassHtml = primesFromPass.length
    ? renderPrimeChipList(primesFromPass)
    : `<p class="muted-copy">${t("noNewPrimeThisStep")}</p>`;
  const cumulativePrimesHtml = cumulativePrimes.length
    ? renderPrimeChipList(cumulativePrimes)
    : `<p class="muted-copy">${t("noPrimeSoFar")}</p>`;

  els.stepView.innerHTML = `
    <div class="groups-grid">${groupsHtml}</div>
    <h3 class="section-title">${t("successfulCombinations")}</h3>
    <div class="combination-list">${combinationsHtml}</div>
    <div class="step-summary-grid">
      <div class="prime-card">
        <h3>${t("newImplicantsThisStep")}</h3>
        ${newImplicantsHtml}
      </div>
      <div class="prime-card">
        <h3>${t("newPrimeThisStep")}</h3>
        ${primesFromPassHtml}
      </div>
      <div class="prime-card">
        <h3>${t("primeSoFar")}</h3>
        ${cumulativePrimesHtml}
      </div>
    </div>
  `;
}

function renderTermChipList(terms) {
  return `
    <div class="chip-list">
      ${terms.map(term => `<span class="chip"><span class="pattern">${term.pattern}</span><span>{${term.source.join(",")}}</span></span>`).join("")}
    </div>
  `;
}

function renderPrimeChipList(primes) {
  return `
    <div class="chip-list">
      ${primes.map(prime => `<span class="chip"><strong>${prime.id}</strong><span class="pattern">${prime.pattern}</span><span>${prime.expression}</span></span>`).join("")}
    </div>
  `;
}

function changeStep(delta) {
  if (!state.qmc || !state.qmc.passes.length) return;
  state.stepIndex = clamp(state.stepIndex + delta, 0, state.qmc.passes.length - 1);
  renderStep();
}

function createChart() {
  if (!state.qmc || !state.qmc.primes.length) return;
  state.chart = {
    activeRows: new Set(state.qmc.primes.map(prime => prime.id)),
    activeCols: new Set(state.qmc.ones),
    chosenRows: new Set(),
    removedRows: new Set(),
    removedCols: new Set(),
    history: []
  };
  state.selectedRows = [];
  state.selectedCols = [];
  state.lastFinal = null;
  els.chartPanel.classList.remove("hidden");
  els.finalBox.classList.add("hidden");
  renderChart();
  updateSelectionText();
  showMessage(t("chartReady"), "neutral");
}

function renderChart() {
  if (!state.chart) return;

  const activeCols = sortedSet(state.chart.activeCols);
  const allCols = [...state.qmc.ones].sort((a, b) => a - b);
  const rows = state.qmc.primes;
  const headerCells = allCols.map(col => {
    const selected = state.selectedCols.includes(col) ? " selected" : "";
    const removed = state.chart.removedCols.has(col) ? " removed-col" : "";
    const inactive = !state.chart.activeCols.has(col) ? " removed-col" : "";
    return `
      <th class="${removed || inactive ? "removed-col" : ""}">
        <button class="col-label${selected}" data-col="${col}" type="button">
          m${col}<br><span class="mono">${bitString(col, state.bits)}</span>
        </button>
      </th>
    `;
  }).join("");

  const bodyRows = rows.map(row => {
    const selected = state.selectedRows.includes(row.id) ? " selected" : "";
    const chosen = state.chart.chosenRows.has(row.id);
    const removed = state.chart.removedRows.has(row.id) || !state.chart.activeRows.has(row.id);
    const rowClasses = [
      chosen ? "selected-row" : "",
      removed && !chosen ? "removed-row" : ""
    ].filter(Boolean).join(" ");
    const cells = allCols.map(col => {
      const covered = row.covers.includes(col);
      const colInactive = !state.chart.activeCols.has(col);
      return `
        <td class="${colInactive ? "removed-col" : ""}">
          ${covered ? `<span class="cover-dot">x</span>` : ""}
        </td>
      `;
    }).join("");
    return `
      <tr class="${rowClasses}">
        <td>
          <button class="row-label${selected}" data-row="${row.id}" type="button">
            ${row.id}: <span class="pattern">${row.pattern}</span> = ${row.expression}
          </button>
        </td>
        ${cells}
      </tr>
    `;
  }).join("");

  els.chartWrap.innerHTML = `
    <table class="coverage-chart">
      <thead>
        <tr>
          <th>${t("implicant")}</th>
          ${headerCells}
        </tr>
      </thead>
      <tbody>${bodyRows}</tbody>
    </table>
  `;

  els.chartWrap.querySelectorAll(".row-label").forEach(button => {
    button.addEventListener("click", () => selectRow(button.dataset.row));
  });
  els.chartWrap.querySelectorAll(".col-label").forEach(button => {
    button.addEventListener("click", () => selectColumn(Number(button.dataset.col)));
  });

  renderSelectedBox(activeCols);
}

function renderSelectedBox(activeCols) {
  const chosen = state.qmc.primes.filter(prime => state.chart.chosenRows.has(prime.id));
  if (!chosen.length) {
    els.selectedBox.classList.remove("visible");
    els.selectedBox.textContent = "";
    return;
  }
  const chosenText = chosen.map(prime => `${prime.id} (${prime.expression})`).join(", ");
  const remaining = activeCols.length ? activeCols.map(col => `m${col}`).join(", ") : t("none");
  els.selectedBox.classList.add("visible");
  els.selectedBox.innerHTML = `<strong>${t("selected")}:</strong> ${chosenText}<br><strong>${t("remainingMinterms")}:</strong> ${remaining}`;
}

function setMode(mode) {
  state.mode = mode;
  state.selectedRows = [];
  state.selectedCols = [];
  els.modeButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  updateSelectionText();
  renderChart();
}

function selectRow(rowId) {
  if (!state.chart || !state.chart.activeRows.has(rowId)) return;
  if (state.mode === "column") return;
  const limit = state.mode === "essential" ? 1 : 2;
  toggleLimitedSelection(state.selectedRows, rowId, limit);
  updateSelectionText();
  renderChart();
}

function selectColumn(col) {
  if (!state.chart || !state.chart.activeCols.has(col)) return;
  if (state.mode !== "column") return;
  toggleLimitedSelection(state.selectedCols, col, 2);
  updateSelectionText();
  renderChart();
}

function toggleLimitedSelection(list, value, limit) {
  const index = list.indexOf(value);
  if (index >= 0) {
    list.splice(index, 1);
    return;
  }
  list.push(value);
  while (list.length > limit) list.shift();
}

function updateSelectionText() {
  if (state.mode === "essential") {
    els.selectionText.textContent = state.selectedRows.length
      ? t("selectionEssentialChosen", { row: state.selectedRows[0] })
      : t("selectionEssentialEmpty");
    return;
  }
  if (state.mode === "row") {
    els.selectionText.textContent = state.selectedRows.length
      ? t("selectionRowChosen", { remove: state.selectedRows[0], dominator: state.selectedRows[1] })
      : t("selectionRowEmpty");
    return;
  }
  els.selectionText.textContent = state.selectedCols.length
    ? t("selectionColumnChosen", { remove: state.selectedCols[0], strict: state.selectedCols[1] })
    : t("selectionColumnEmpty");
}

function applyGuess() {
  if (!state.chart) return;
  els.finalBox.classList.add("hidden");
  state.lastFinal = null;

  if (state.mode === "essential") {
    applyEssentialGuess();
  } else if (state.mode === "row") {
    applyRowDominanceGuess();
  } else {
    applyColumnDominanceGuess();
  }
}

function applyEssentialGuess() {
  const rowId = state.selectedRows[0];
  if (!rowId) {
    showMessage(t("chooseEssentialRow"), "bad");
    return;
  }

  const uniqueCols = essentialColumnsForRow(rowId);
  if (!uniqueCols.length) {
    const row = primeById(rowId);
    const covered = row.covers.filter(col => state.chart.activeCols.has(col));
    const detail = covered.length
      ? covered.map(col => t("hasCoveringRows", { col, count: coveringRows(col).length })).join("; ")
      : t("coversNoActive", { row: rowId });
    showMessage(t("notEssential", { row: rowId, detail }), "bad");
    return;
  }

  chooseRow(rowId, historyEntry("essentialHistory", { row: rowId, cols: uniqueCols.map(col => `m${col}`).join(", ") }));
  state.selectedRows = [];
  showMessage(t("essentialCorrect", { row: rowId }), "good");
  afterSuccessfulSimplification();
}

function applyRowDominanceGuess() {
  const [removeId, dominatorId] = state.selectedRows;
  if (!removeId || !dominatorId || removeId === dominatorId) {
    showMessage(t("chooseRowDominance"), "bad");
    return;
  }

  const removeCovers = activeCoverage(removeId);
  const dominatorCovers = activeCoverage(dominatorId);
  const missing = removeCovers.filter(col => !dominatorCovers.includes(col));
  if (missing.length) {
    showMessage(t("doesNotDominate", { dominator: dominatorId, remove: removeId, missing: missing.map(col => `m${col}`).join(", ") }), "bad");
    return;
  }

  if (sameSet(removeCovers, dominatorCovers) && literalCount(primeById(dominatorId).pattern) > literalCount(primeById(removeId).pattern)) {
    showMessage(t("sameCoverageMoreLiterals", { dominator: dominatorId, remove: removeId }), "bad");
    return;
  }

  state.chart.activeRows.delete(removeId);
  state.chart.removedRows.add(removeId);
  state.chart.history.push(historyEntry("rowHistory", { remove: removeId, dominator: dominatorId }));
  state.selectedRows = [];
  showMessage(t("rowCorrect", { remove: removeId, dominator: dominatorId }), "good");
  afterSuccessfulSimplification();
}

function applyColumnDominanceGuess() {
  const [removeCol, strictCol] = state.selectedCols;
  if (removeCol === undefined || strictCol === undefined || removeCol === strictCol) {
    showMessage(t("chooseColumnDominance"), "bad");
    return;
  }

  const removeRows = coveringRows(removeCol);
  const strictRows = coveringRows(strictCol);
  const missing = strictRows.filter(rowId => !removeRows.includes(rowId));
  if (missing.length) {
    showMessage(t("columnMiss", { strict: strictCol, remove: removeCol, missing: missing.join(", ") }), "bad");
    return;
  }

  if (sameSet(removeRows, strictRows)) {
    showMessage(t("sameColumnsTie", { remove: removeCol, strict: strictCol }), "bad");
    return;
  }

  state.chart.activeCols.delete(removeCol);
  state.chart.removedCols.add(removeCol);
  state.chart.history.push(historyEntry("columnHistory", { remove: removeCol, strict: strictCol }));
  state.selectedCols = [];
  showMessage(t("columnCorrect", { remove: removeCol, strict: strictCol }), "good");
  afterSuccessfulSimplification();
}

function afterSuccessfulSimplification() {
  state.alertedNoMore = false;
  renderChart();
  if (state.chart.activeCols.size === 0) {
    finishCoverage();
  }
}

function chooseRow(rowId, reason) {
  const row = primeById(rowId);
  state.chart.chosenRows.add(rowId);
  state.chart.activeRows.delete(rowId);
  row.covers.forEach(col => {
    if (state.chart.activeCols.has(col)) {
      state.chart.activeCols.delete(col);
      state.chart.removedCols.add(col);
    }
  });
  state.chart.history.push(reason);
}

function reportChartStatus() {
  if (!state.chart) return;
  const report = findAvailableSimplifications();

  if (state.chart.activeCols.size === 0) {
    showMessage(t("allCovered"), "good");
    finishCoverage();
    return;
  }

  if (!report.any) {
    showMessage(t("noSimplifications"), "neutral");
    if (!state.alertedNoMore) {
      alert(t("noMoreAlert"));
      state.alertedNoMore = true;
    }
    return;
  }

  const hints = [];
  if (report.essential.length) hints.push(t("essentialCandidate", { count: report.essential.length }));
  if (report.row.length) hints.push(t("rowMove", { count: report.row.length }));
  if (report.column.length) hints.push(t("columnMove", { count: report.column.length }));
  showMessage(t("validSimplification", { hints: hints.join(", ") }), "neutral");
}

function revealSolution() {
  if (!state.chart) return;
  const report = findAvailableSimplifications();
  els.messageBox.classList.remove("good", "bad");
  els.messageBox.classList.add("solution-message");

  if (state.chart.activeCols.size === 0) {
    els.messageBox.textContent = t("revealAllCovered");
    return;
  }

  if (!report.any) {
    els.messageBox.textContent = t("revealNoMoves");
    return;
  }

  const sections = [];
  if (report.essential.length) {
    const rows = watermarkedOrder(report.essential, "reveal-essential", rowId => rowId);
    sections.push(solutionSection(
      t("revealEssentialTitle"),
      rows.map(rowId => t("revealEssentialItem", {
        row: rowId,
        cols: essentialColumnsForRow(rowId).map(col => `m${col}`).join(", ")
      }))
    ));
  }
  if (report.row.length) {
    const moves = watermarkedOrder(report.row, "reveal-row", ([removeId, dominatorId]) => `${removeId}:${dominatorId}`);
    sections.push(solutionSection(
      t("revealRowTitle"),
      moves.map(([removeId, dominatorId]) => t("revealRowItem", {
        remove: removeId,
        dominator: dominatorId,
        cols: activeCoverage(removeId).map(col => `m${col}`).join(", ")
      }))
    ));
  }
  if (report.column.length) {
    const moves = watermarkedOrder(report.column, "reveal-column", ([removeCol, strictCol]) => `${removeCol}:${strictCol}`);
    sections.push(solutionSection(
      t("revealColumnTitle"),
      moves.map(([removeCol, strictCol]) => t("revealColumnItem", {
        remove: removeCol,
        strict: strictCol,
        rows: coveringRows(strictCol).join(", ")
      }))
    ));
  }

  els.messageBox.innerHTML = `
    <strong>${escapeHtml(t("revealIntro"))}</strong>
    ${examTrace("reveal")}
    <div class="solution-sections">${sections.join("")}</div>
  `;
}

function solutionSection(title, items) {
  return `
    <section class="solution-section">
      <h3>${escapeHtml(title)}</h3>
      <ul>
        ${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function watermarkActive() {
  return Boolean(state.examGuard.watermarkEnabled && state.examGuard.watermarkSeed && !state.examGuard.locked);
}

function exerciseSignature() {
  return `${state.bits}:${state.outputs.join("")}`;
}

function textHash(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function watermarkRank(context, key) {
  if (!watermarkActive()) return 0;
  return textHash(`${state.examGuard.watermarkSeed}|${exerciseSignature()}|${context}|${key}`);
}

function watermarkedOrder(items, context, keyFn) {
  const copy = [...items];
  if (!watermarkActive()) return copy;
  return copy.sort((left, right) => {
    const leftKey = String(keyFn(left));
    const rightKey = String(keyFn(right));
    return watermarkRank(context, leftKey) - watermarkRank(context, rightKey) || leftKey.localeCompare(rightKey);
  });
}

function orderPrimesForExpression(primes, context) {
  return watermarkedOrder(primes, `expression-${context}`, prime => `${prime.id}:${prime.pattern}:${prime.expression}`);
}

function examTraceCode(context) {
  if (!watermarkActive()) return "";
  return textHash(`${state.examGuard.watermarkSeed}|${exerciseSignature()}|trace:${context}`)
    .toString(36)
    .toUpperCase()
    .padStart(7, "0")
    .slice(-7);
}

function examTrace(context) {
  const code = examTraceCode(context);
  return code ? `<span class="exam-trace" data-qmc-trace="${escapeHtml(code)}" aria-hidden="true"></span>` : "";
}

function finishCoverage() {
  if (!state.chart) return;
  if (state.chart.activeCols.size > 0) {
    const report = findAvailableSimplifications();
    if (report.any) {
      const parts = [];
      if (report.essential.length) parts.push(t("essential"));
      if (report.row.length) parts.push(t("rowDominance"));
      if (report.column.length) parts.push(t("columnDominance"));
      showMessage(t("finishBlocked", { parts: parts.join(", ") }), "bad");
      return;
    }
  }
  const baseRows = Array.from(state.chart.chosenRows);
  const activeCols = sortedSet(state.chart.activeCols);
  const final = solveRemainingCoverage(activeCols, sortedSet(state.chart.activeRows), baseRows);
  renderFinal(final);
}

function renderFinal(final) {
  state.lastFinal = final;
  const chosenIds = final.rows;
  const primes = orderPrimesForExpression(chosenIds.map(primeById).filter(Boolean), final.kind);
  const expression = primes.length ? primes.map(prime => prime.expression).join(" + ") : "0";
  const history = state.chart.history.length
    ? state.chart.history.map(item => `<div class="petrick-line">${escapeHtml(historyText(item))}</div>`).join("")
    : `<div class="petrick-line">${t("noHistory")}</div>`;

  let body = "";
  if (state.chart.activeCols.size === 0) {
    body = `
      <p>${t("finalCoveredDesc")}</p>
      <p><strong>F = ${escapeHtml(expression)}</strong></p>
    `;
  } else if (final.kind === "trivial") {
    body = `
      <p>${escapeHtml(t("trivialChoice", { explanation: final.explanation }))}</p>
      <p><strong>${t("proposedResult")}: F = ${escapeHtml(expression)}</strong></p>
    `;
  } else {
    const petrickLines = final.petrickSteps.map(line => `<div class="petrick-line">${escapeHtml(line)}</div>`).join("");
    body = `
      <p>${t("petrickIntro")}</p>
      <div class="petrick-list">${petrickLines}</div>
      <p><strong>${t("oneMinimumCover")}: F = ${escapeHtml(expression)}</strong></p>
    `;
  }

  els.finalBox.classList.remove("hidden");
  els.finalBox.innerHTML = `
    <h3>${t("finalCoverage")}</h3>
    ${examTrace(`final-${final.kind}`)}
    ${body}
    <h3>${t("appliedChartMoves")}</h3>
    <div class="petrick-list">${history}</div>
  `;
}

function solveRemainingCoverage(activeCols, activeRows, baseRows) {
  if (!activeCols.length) {
    return { kind: "covered", rows: baseRows, explanation: t("alreadyCoveredExplanation"), petrickSteps: [] };
  }

  if (activeRows.length === 1) {
    const only = activeRows[0];
    return {
      kind: "trivial",
      rows: uniqueStrings([...baseRows, only]),
      explanation: t("onlyRemainingImplicant", { row: only }),
      petrickSteps: []
    };
  }

  if (activeCols.length === 1) {
    const col = activeCols[0];
    const choices = coveringRows(col);
    const best = choices
      .map(primeById)
      .sort((a, b) => literalCount(a.pattern) - literalCount(b.pattern) || a.id.localeCompare(b.id))[0];
    return {
      kind: "trivial",
      rows: uniqueStrings([...baseRows, best.id]),
      explanation: t("onlyRemainingMinterm", { col, row: best.id }),
      petrickSteps: []
    };
  }

  const petrick = petrickSolve(activeCols);
  return {
    kind: "petrick",
    rows: uniqueStrings([...baseRows, ...petrick.best]),
    petrickSteps: petrick.steps
  };
}

function petrickSolve(activeCols) {
  let products = [new Set()];
  const steps = [];

  activeCols.forEach(col => {
    const choices = coveringRows(col);
    steps.push(`m${col}: (${choices.join(" + ")})`);
    const next = [];
    products.forEach(product => {
      choices.forEach(rowId => {
        next.push(new Set([...product, rowId]));
      });
    });
    products = simplifyProducts(next);
    steps.push(t("afterMinterm", { col, products: formatProducts(products) }));
  });

  const sorted = products
    .map(product => Array.from(product).sort())
    .sort((a, b) => {
      const left = a.join("");
      const right = b.join("");
      return productCost(a) - productCost(b)
        || watermarkRank("petrick-product", left) - watermarkRank("petrick-product", right)
        || left.localeCompare(right);
    });

  const best = sorted[0] || [];
  steps.push(t("minimumProduct", { product: best.join("") || "1" }));
  return { best, steps };
}

function simplifyProducts(products) {
  const unique = new Map();
  products.forEach(product => {
    const key = Array.from(product).sort().join("|");
    unique.set(key, product);
  });
  const list = Array.from(unique.values());
  return list.filter((product, index) => {
    return !list.some((other, otherIndex) => {
      if (index === otherIndex) return false;
      return isSubset(Array.from(other), Array.from(product)) && productCost(Array.from(other)) <= productCost(Array.from(product));
    });
  });
}

function formatProducts(products) {
  return products
    .map(product => {
      const ids = Array.from(product).sort();
      return ids.length ? ids.join("") : "1";
    })
    .join(" + ");
}

function productCost(rowIds) {
  const rowCount = rowIds.length * 100;
  const literalTotal = rowIds.reduce((sum, rowId) => sum + literalCount(primeById(rowId).pattern), 0);
  return rowCount + literalTotal;
}

function findAvailableSimplifications() {
  const activeRows = sortedSet(state.chart.activeRows);
  const activeCols = sortedSet(state.chart.activeCols);
  const essential = activeRows.filter(rowId => essentialColumnsForRow(rowId).length > 0);
  const row = [];
  const column = [];

  activeRows.forEach(removeId => {
    activeRows.forEach(dominatorId => {
      if (removeId === dominatorId) return;
      const removeCovers = activeCoverage(removeId);
      const dominatorCovers = activeCoverage(dominatorId);
      if (!removeCovers.length) return;
      if (isSubset(removeCovers, dominatorCovers)) {
        if (sameSet(removeCovers, dominatorCovers) && literalCount(primeById(dominatorId).pattern) > literalCount(primeById(removeId).pattern)) {
          return;
        }
        row.push([removeId, dominatorId]);
      }
    });
  });

  activeCols.forEach(removeCol => {
    activeCols.forEach(strictCol => {
      if (removeCol === strictCol) return;
      const removeRows = coveringRows(removeCol);
      const strictRows = coveringRows(strictCol);
      if (strictRows.length && isSubset(strictRows, removeRows) && !sameSet(removeRows, strictRows)) {
        column.push([removeCol, strictCol]);
      }
    });
  });

  return {
    essential,
    row,
    column,
    any: essential.length > 0 || row.length > 0 || column.length > 0
  };
}

function essentialColumnsForRow(rowId) {
  const row = primeById(rowId);
  if (!row) return [];
  return sortedSet(state.chart.activeCols).filter(col => {
    return row.covers.includes(col) && coveringRows(col).length === 1;
  });
}

function activeCoverage(rowId) {
  const row = primeById(rowId);
  if (!row) return [];
  return row.covers.filter(col => state.chart.activeCols.has(col)).sort((a, b) => a - b);
}

function coveringRows(col) {
  return state.qmc.primes
    .filter(prime => state.chart.activeRows.has(prime.id) && prime.covers.includes(col))
    .map(prime => prime.id)
    .sort();
}

function primeById(rowId) {
  return state.qmc && state.qmc.primes.find(prime => prime.id === rowId);
}

function historyEntry(key, params) {
  return { key, params };
}

function historyText(entry) {
  return typeof entry === "string" ? entry : t(entry.key, entry.params);
}

function showMessage(text, type) {
  els.messageBox.textContent = text;
  els.messageBox.classList.remove("good", "bad", "solution-message");
  if (type === "good") els.messageBox.classList.add("good");
  if (type === "bad") els.messageBox.classList.add("bad");
}

function setStatus(text, isError = false) {
  els.statusLine.textContent = text;
  els.statusLine.style.color = isError ? "var(--bad)" : "var(--muted)";
}

function bitString(number, bits) {
  return number.toString(2).padStart(bits, "0");
}

function patternToExpression(pattern) {
  let result = "";
  for (let index = 0; index < pattern.length; index += 1) {
    if (pattern[index] === "-") continue;
    result += variables[index] + (pattern[index] === "0" ? "'" : "");
  }
  return result || "1";
}

function matchesPattern(pattern, bits) {
  for (let index = 0; index < pattern.length; index += 1) {
    if (pattern[index] !== "-" && pattern[index] !== bits[index]) return false;
  }
  return true;
}

function onesCount(pattern) {
  return pattern.split("").filter(char => char === "1").length;
}

function literalCount(pattern) {
  return pattern.split("").filter(char => char !== "-").length;
}

function repeat(char, count) {
  return Array.from({ length: count }, () => char).join("");
}

function uniqueNumbers(values) {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

function uniqueStrings(values) {
  return Array.from(new Set(values));
}

function sortedSet(set) {
  return Array.from(set).sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b));
  });
}

function isSubset(left, right) {
  return left.every(value => right.includes(value));
}

function sameSet(left, right) {
  return left.length === right.length && isSubset(left, right);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

init();
