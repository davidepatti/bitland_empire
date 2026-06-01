const SVG_NS = "http://www.w3.org/2000/svg";
const languageKey = "cpu-spy-language";

const translations = {
  it: {
    language: "Lingua",
    tutorial: "Tutorial",
    quizMode: "Quiz",
    close: "Chiudi",
    instruction: "Istruzione",
    pipelinePhases: "Fasi pipeline",
    format: "Formato",
    initialValues: "Valori iniziali",
    signals: "Segnali",
    microOperations: "Micro-operazioni",
    element: "Elemento",
    clock: "Clock",
    clockCount: ({ current, total }) => `Clock ${current}/${total}`,
    phaseOverview: "Panoramica fase",
    phase: "Fase",
    state: "Stato",
    values: "Valori",
    type: "Tipo",
    quizQuestion: "Quale descrizione spiega correttamente questo clock?",
    quizHiddenDescription: "Modalita quiz attiva: scegli la descrizione corretta prima di leggere la spiegazione.",
    quizTraceHidden: "Le micro-operazioni sono nascoste in modalita quiz.",
    correct: "Corretto.",
    wrong: "Non proprio.",
    correctAnswer: "Risposta corretta",
    activeWrite: "Scrittura attiva",
    mutedStatus: "Presente ma disattivato in questa fase",
    activeControl: "Segnale attivo",
    activeStage: "Attivo in questa fase",
    inactiveStage: "Non evidenziato in questa fase",
    controlSignal: "Segnale di controllo",
    datapathElement: "Elemento datapath",
    controlType: "Controllo",
    writeType: "Scrittura",
    dataType: "Dato",
    linkType: "Collegamento",
    activeLink: "Collegamento attivo in questa fase",
    inactiveLink: "Collegamento non usato in questa fase",
    wireDescription: "Collegamento che trasporta dati o segnali tra due blocchi del datapath.",
    tutorialIntro: "Segui questi passaggi per usare CPU Spy come dimostrazione guidata o come esercizio.",
    tutorialStep1Title: "1. Scegli una istruzione",
    tutorialStep1Body: "Seleziona una istruzione MIPS64 e osserva come cambiano formato, segnali e valori iniziali.",
    tutorialStep2Title: "2. Avanza nei clock",
    tutorialStep2Body: "Usa le frecce o le schede IF, ID, EX, MEM e WB per seguire una fase alla volta.",
    tutorialStep3Title: "3. Ispeziona il datapath",
    tutorialStep3Body: "Clicca blocchi, collegamenti o valori evidenziati per vedere perche sono attivi.",
    tutorialStep4Title: "4. Prova il quiz",
    tutorialStep4Body: "Attiva Quiz: la spiegazione sparisce e devi scegliere la descrizione corretta tra quattro opzioni."
  },
  en: {
    language: "Language",
    tutorial: "Tutorial",
    quizMode: "Quiz",
    close: "Close",
    instruction: "Instruction",
    pipelinePhases: "Pipeline phases",
    format: "Format",
    initialValues: "Initial values",
    signals: "Signals",
    microOperations: "Micro-operations",
    element: "Element",
    clock: "Clock",
    clockCount: ({ current, total }) => `Clock ${current}/${total}`,
    phaseOverview: "Phase overview",
    phase: "Phase",
    state: "Status",
    values: "Values",
    type: "Type",
    quizQuestion: "Which description correctly explains this clock?",
    quizHiddenDescription: "Quiz mode is active: choose the correct description before reading the explanation.",
    quizTraceHidden: "Micro-operations are hidden in quiz mode.",
    correct: "Correct.",
    wrong: "Not quite.",
    correctAnswer: "Correct answer",
    activeWrite: "Active write",
    mutedStatus: "Present but disabled in this phase",
    activeControl: "Active signal",
    activeStage: "Active in this phase",
    inactiveStage: "Not highlighted in this phase",
    controlSignal: "Control signal",
    datapathElement: "Datapath element",
    controlType: "Control",
    writeType: "Write",
    dataType: "Data",
    linkType: "Link",
    activeLink: "Link active in this phase",
    inactiveLink: "Link not used in this phase",
    wireDescription: "Connection carrying data or control signals between datapath blocks.",
    tutorialIntro: "Use these steps to run CPU Spy as a guided demo or as a quick exercise.",
    tutorialStep1Title: "1. Choose an instruction",
    tutorialStep1Body: "Select a MIPS64 instruction and watch the format, signals, and initial values change.",
    tutorialStep2Title: "2. Step through clocks",
    tutorialStep2Body: "Use the arrows or the IF, ID, EX, MEM, and WB tabs to inspect one phase at a time.",
    tutorialStep3Title: "3. Inspect the datapath",
    tutorialStep3Body: "Click highlighted blocks, wires, or values to see why they are active.",
    tutorialStep4Title: "4. Try quiz mode",
    tutorialStep4Body: "Turn on Quiz: the explanation disappears and you choose the right description from four options."
  }
};

const englishText = {
  "Preleva l'istruzione": "Fetch the instruction",
  "Decodifica e lettura registri": "Decode and read registers",
  "Somma R2 e R3 nella ALU": "Add R2 and R3 in the ALU",
  "Memoria dati non usata": "Data memory not used",
  "Scrive il risultato in R1": "Write the result to R1",
  "Decodifica I-type e immediato": "Decode I-type and immediate",
  "Somma registro e immediato": "Add register and immediate",
  "Aggiorna R1": "Update R1",
  "Decodifica load e offset": "Decode load and offset",
  "Calcola l'indirizzo effettivo": "Compute the effective address",
  "Legge dalla memoria dati": "Read from data memory",
  "Scrive il dato letto in R1": "Write the loaded data to R1",
  "Decodifica store e lettura dati": "Decode store and read data",
  "Calcola l'indirizzo di store": "Compute the store address",
  "Scrive nella memoria dati": "Write to data memory",
  "Nessun write-back": "No write-back",
  "Decodifica branch e offset": "Decode branch and offset",
  "Confronta R1 e R2, calcola loop": "Compare R1 and R2, compute loop target",
  "Aggiorna il PC se il branch e preso": "Update the PC if the branch is taken",
  "Il PC indirizza la memoria istruzioni. In parallelo l'addizionatore calcola PC + 4 e il mux del PC prepara il cammino sequenziale.": "The PC addresses instruction memory. In parallel, the adder computes PC + 4 and the PC mux prepares the sequential path.",
  "L'unita di controllo riconosce una istruzione R-type. Il banco registri legge R2 e R3 come operandi sorgente.": "The control unit recognizes an R-type instruction. The register file reads R2 and R3 as source operands.",
  "Il mux ALUSrc seleziona il secondo dato letto dal registro. Il controllore ALU traduce ALUOp e funct nella operazione DADD.": "The ALUSrc mux selects the second register value. The ALU controller translates ALUOp and funct into the DADD operation.",
  "DADD e una istruzione aritmetica R-type: non legge e non scrive la memoria dati. Il risultato ALU prosegue verso il mux di write-back.": "DADD is an R-type arithmetic instruction: it neither reads nor writes data memory. The ALU result continues toward the write-back mux.",
  "Il mux MemtoReg seleziona il risultato della ALU. Con RegWrite attivo, il banco registri aggiorna R1 con il valore calcolato.": "The MemtoReg mux selects the ALU result. With RegWrite active, the register file updates R1 with the computed value.",
  "La control unit riconosce DADDI. Il banco registri legge R2, mentre l'immediato a 16 bit viene esteso di segno.": "The control unit recognizes DADDI. The register file reads R2 while the 16-bit immediate is sign-extended.",
  "Il mux ALUSrc seleziona l'immediato esteso. La ALU esegue una somma signed a 64 bit.": "The ALUSrc mux selects the sign-extended immediate. The ALU performs a signed 64-bit addition.",
  "DADDI produce solo un risultato aritmetico. La memoria dati resta disattivata e il risultato ALU continua verso il write-back.": "DADDI produces only an arithmetic result. Data memory stays disabled and the ALU result continues to write-back.",
  "Il risultato della ALU viene selezionato dal mux MemtoReg e scritto in R1.": "The ALU result is selected by the MemtoReg mux and written into R1.",
  "La control unit riconosce LD. R2 viene letto come registro base, mentre vett viene trattato come offset a 16 bit.": "The control unit recognizes LD. R2 is read as the base register while vett is treated as a 16-bit offset.",
  "La ALU somma il contenuto di R2 con l'offset vett esteso a 64 bit.": "The ALU adds the contents of R2 to the vett offset extended to 64 bits.",
  "MemRead abilita la memoria dati. L'indirizzo proviene dalla ALU e il dato letto viene inviato al mux MemtoReg.": "MemRead enables data memory. The address comes from the ALU and the loaded data is sent to the MemtoReg mux.",
  "Il mux MemtoReg seleziona il dato proveniente dalla memoria. RegWrite aggiorna R1.": "The MemtoReg mux selects the value coming from memory. RegWrite updates R1.",
  "La control unit riconosce SD. R2 fornisce la base dell'indirizzo, R1 fornisce il dato da scrivere.": "The control unit recognizes SD. R2 provides the address base and R1 provides the value to store.",
  "La ALU somma R2 con l'offset vett. Il dato letto da R1 viene conservato per la fase MEM.": "The ALU adds R2 to the vett offset. The value read from R1 is kept for the MEM phase.",
  "MemWrite abilita la scrittura. La memoria riceve l'indirizzo dalla ALU e il dato da R1.": "MemWrite enables the write. Memory receives the address from the ALU and the value from R1.",
  "SD non scrive nel banco registri. Il percorso di write-back resta disabilitato.": "SD does not write the register file. The write-back path stays disabled.",
  "La control unit riconosce BNE. Il banco registri legge R1 e R2 per il confronto, mentre l'offset loop viene esteso.": "The control unit recognizes BNE. The register file reads R1 and R2 for comparison while the loop offset is extended.",
  "La ALU sottrae R2 da R1. In parallelo l'offset esteso viene shiftato a sinistra di 2 e sommato a PC+4.": "The ALU subtracts R2 from R1. In parallel, the extended offset is shifted left by 2 and added to PC+4.",
  "BNE non accede alla memoria dati. Il controllo di branch usa not Zero: con R1 diverso da R2, PCSrc seleziona loop.": "BNE does not access data memory. Branch control uses not Zero: with R1 different from R2, PCSrc selects loop.",
  "BNE modifica solo il PC. Il banco registri non viene scritto.": "BNE only changes the PC. The register file is not written."
};

// Hotspots share the inline datapath SVG viewBox and remain invisible click targets.
const hotspots = {
  pc: { x: 56, y: 665, w: 66, h: 196 },
  instructionMemory: { x: 166, y: 722, w: 192, h: 274 },
  pcAdder: { x: 258, y: 80, w: 108, h: 248 },
  pcSrcMux: { x: 1444, y: 104, w: 58, h: 200 },
  controlUnit: { x: 626, y: 350, w: 138, h: 334, kind: "control", shape: "oval" },
  registers: { x: 718, y: 698, w: 253, h: 370 },
  regDstMux: { x: 650, y: 844, w: 60, h: 184 },
  signExtend: { x: 812, y: 1084, w: 126, h: 184, shape: "oval" },
  aluSrcMux: { x: 1052, y: 846, w: 58, h: 184 },
  aluControl: { x: 1080, y: 1098, w: 138, h: 202, kind: "control", shape: "oval" },
  alu: { x: 1154, y: 758, w: 184, h: 244 },
  dataMemory: { x: 1385, y: 812, w: 224, h: 324 },
  memToRegMux: { x: 1664, y: 846, w: 58, h: 184 },
  branchAdder: { x: 1180, y: 154, w: 180, h: 248 },
  shiftLeft: { x: 1052, y: 292, w: 102, h: 134, shape: "oval" },
  branchAnd: { x: 1375, y: 360, w: 86, h: 94, kind: "control" },
  regDstSignal: { x: 778, y: 352, w: 132, h: 40, kind: "control", target: "label" },
  branchSignal: { x: 778, y: 394, w: 132, h: 40, kind: "control", target: "label" },
  memReadSignal: { x: 778, y: 436, w: 158, h: 40, kind: "control", target: "label" },
  memToRegSignal: { x: 778, y: 478, w: 172, h: 40, kind: "control", target: "label" },
  aluOpSignal: { x: 778, y: 520, w: 130, h: 40, kind: "control", target: "label" },
  memWriteSignal: { x: 778, y: 556, w: 166, h: 40, kind: "control", target: "label" },
  aluSrcSignal: { x: 778, y: 598, w: 146, h: 40, kind: "control", target: "label" },
  regWriteSignal: { x: 778, y: 640, w: 154, h: 40, kind: "control", target: "label" },
  pcSrcSignal: { x: 1489, y: 318, w: 114, h: 42, kind: "control", target: "label" },
  zeroSignal: { x: 1250, y: 782, w: 88, h: 42, kind: "control", target: "label" },
  opcodeField: { x: 388, y: 475, w: 235, h: 42, target: "label" },
  rsField: { x: 388, y: 704, w: 247, h: 42, target: "label" },
  rtField: { x: 388, y: 795, w: 247, h: 42, target: "label" },
  rdField: { x: 388, y: 927, w: 247, h: 42, target: "label" },
  immediateField: { x: 388, y: 1115, w: 220, h: 42, target: "label" },
  functField: { x: 724, y: 1282, w: 236, h: 42, target: "label" }
};

const allControlSignals = [
  "regDstSignal",
  "branchSignal",
  "memReadSignal",
  "memToRegSignal",
  "aluOpSignal",
  "memWriteSignal",
  "aluSrcSignal",
  "regWriteSignal"
];

const signalNamesByHotspot = {
  regDstSignal: ["RegDst"],
  branchSignal: ["Branch", "Branch/BNE"],
  memReadSignal: ["MemRead"],
  memToRegSignal: ["MemtoReg"],
  aluOpSignal: ["ALUOp"],
  memWriteSignal: ["MemWrite"],
  aluSrcSignal: ["ALUSrc"],
  regWriteSignal: ["RegWrite"],
  pcSrcSignal: ["PCSrc"],
  zeroSignal: ["Zero"]
};

const diagramElements = {
  pc: {
    name: "PC",
    role: "Registro",
    description: "Mantiene l'indirizzo dell'istruzione corrente e riceve il prossimo indirizzo.",
    signals: ["PCSrc", "Next PC"],
    valueIncludes: ["PC =", "PC <-", "Next PC"]
  },
  instructionMemory: {
    name: "Memoria istruzioni",
    role: "Memoria",
    description: "Legge la parola istruzione indirizzata dal PC.",
    valueIncludes: ["Instr =", "opcode =", "rs =", "rt =", "rd =", "imm =", "vett =", "loop offset"]
  },
  opcodeField: {
    name: "Istruzione [31-26]",
    role: "Campo opcode",
    description: "Campo dell'istruzione inviato alla control unit per la decodifica.",
    valueIncludes: ["opcode ="]
  },
  rsField: {
    name: "Istruzione [25-21]",
    role: "Campo rs",
    description: "Campo che seleziona il primo registro sorgente.",
    valueIncludes: ["rs =", "base rs ="]
  },
  rtField: {
    name: "Istruzione [20-16]",
    role: "Campo rt",
    description: "Campo che seleziona il secondo registro sorgente o il registro destinazione I-type.",
    valueIncludes: ["rt =", "rt/dest =", "rt/source ="]
  },
  rdField: {
    name: "Istruzione [15-11]",
    role: "Campo rd",
    description: "Campo che seleziona il registro destinazione per le istruzioni R-type.",
    valueIncludes: ["rd ="]
  },
  immediateField: {
    name: "Istruzione [15-0]",
    role: "Immediato",
    description: "Campo immediato o offset passato al sign extend.",
    valueIncludes: ["imm =", "vett =", "loop offset"]
  },
  functField: {
    name: "Istruzione [5-0]",
    role: "Campo funct",
    description: "Campo funzione usato dal controllore ALU nelle istruzioni R-type.",
    valueIncludes: ["funct ="]
  },
  pcAdder: {
    name: "Addizionatore PC+4",
    role: "Addizionatore",
    description: "Calcola l'indirizzo sequenziale dell'istruzione successiva.",
    signals: ["Next PC"],
    valueIncludes: ["PC + 4"]
  },
  pcSrcMux: {
    name: "Mux PCSrc",
    role: "Multiplexer",
    description: "Sceglie tra PC+4 e il target di branch.",
    signals: ["PCSrc", "Next PC"],
    valueIncludes: ["PCSrc", "PC <-", "Target loop"]
  },
  controlUnit: {
    name: "Control unit",
    role: "Controllo",
    description: "Decodifica l'opcode e genera i segnali che abilitano mux, memorie e registri.",
    signals: "all",
    valueIncludes: ["opcode ="]
  },
  registers: {
    name: "Banco registri",
    role: "Registro file",
    description: "Legge gli operandi sorgente e, quando RegWrite e attivo, scrive il risultato.",
    signals: ["RegWrite", "WriteRegister", "WriteData"],
    valueIncludes: ["Read1", "Read2", "Base =", "Dato store", "WriteData", "WriteReg", "R1 <-", "R1 e R2"]
  },
  regDstMux: {
    name: "Mux RegDst",
    role: "Multiplexer",
    description: "Sceglie quale campo dell'istruzione diventa il registro destinazione.",
    signals: ["RegDst", "WriteRegister"],
    valueIncludes: ["RegDst", "WriteReg"]
  },
  signExtend: {
    name: "Sign extend",
    role: "Estensione",
    description: "Estende il campo immediato a 64 bit mantenendo il segno.",
    valueIncludes: ["imm =", "vett =", "loop offset", "SignExt"]
  },
  aluSrcMux: {
    name: "Mux ALUSrc",
    role: "Multiplexer",
    description: "Sceglie il secondo ingresso della ALU: registro letto oppure immediato esteso.",
    signals: ["ALUSrc"],
    valueIncludes: ["ALUSrc"]
  },
  aluControl: {
    name: "ALU control",
    role: "Controllo",
    description: "Traduce ALUOp e funct nella operazione eseguita dalla ALU.",
    signals: ["ALUOp", "ALUCtrl"],
    valueIncludes: ["funct =", "ALUCtrl"]
  },
  alu: {
    name: "ALU",
    role: "Unita aritmetico-logica",
    description: "Esegue somma, sottrazione o confronto in base al controllo ALU.",
    signals: ["ALUCtrl", "Zero", "Effective address"],
    valueIncludes: ["0x...", "Risultato", "Indirizzo", "R1 - R2", "Zero"]
  },
  dataMemory: {
    name: "Memoria dati",
    role: "Memoria",
    description: "Legge o scrive dati quando MemRead o MemWrite sono abilitati.",
    signals: ["MemRead", "MemWrite", "Memory data", "Mem[0x1020]"],
    valueIncludes: ["MemRead", "MemWrite", "Dato letto", "Dato scritto", "Indirizzo", "Mem["]
  },
  memToRegMux: {
    name: "Mux MemtoReg",
    role: "Multiplexer",
    description: "Sceglie il dato da riportare al banco registri: risultato ALU o dato di memoria.",
    signals: ["MemtoReg", "WriteData"],
    valueIncludes: ["MemtoReg", "WriteData"]
  },
  branchAdder: {
    name: "Addizionatore branch",
    role: "Addizionatore",
    description: "Somma PC+4 con l'offset di branch gia shiftato.",
    signals: ["Target"],
    valueIncludes: ["offset<<2", "Target loop"]
  },
  shiftLeft: {
    name: "Shift left 2",
    role: "Shift",
    description: "Shift dell'offset di branch per ottenere uno spiazzamento in byte.",
    valueIncludes: ["offset<<2"]
  },
  branchAnd: {
    name: "Logica branch",
    role: "Controllo",
    description: "Combina il controllo di branch con Zero per decidere se cambiare il PC.",
    signals: ["Branch", "Branch/BNE", "Zero", "PCSrc"],
    valueIncludes: ["BNECtrl", "Zero", "PCSrc"]
  }
};

const wireNames = {
  pcToInstructionMemory: "PC -> memoria istruzioni",
  pcToAdder: "PC -> addizionatore PC+4",
  adderToPcMux: "PC+4 -> mux PCSrc",
  pcMuxToPc: "Mux PCSrc -> PC",
  opcodeToControl: "opcode -> control unit",
  rsToRegisters: "rs -> banco registri",
  rtToRegisters: "rt -> banco registri",
  rtToRegDstMux: "rt -> mux RegDst",
  rdToRegDstMux: "rd -> mux RegDst",
  regDstToWriteRegister: "Mux RegDst -> WriteRegister",
  functToAluControl: "funct -> ALU control",
  immediateToSignExtend: "immediato -> sign extend",
  signExtendToAluSrc: "sign extend -> mux ALUSrc",
  signExtendToShift: "sign extend -> shift left 2",
  shiftToBranchAdder: "shift left 2 -> addizionatore branch",
  pcPlus4ToBranchAdder: "PC+4 -> addizionatore branch",
  branchAdderToPcMux: "target branch -> mux PCSrc",
  readData1ToAlu: "ReadData1 -> ALU",
  readData2ToAluSrc: "ReadData2 -> mux ALUSrc",
  aluSrcToAlu: "Mux ALUSrc -> ALU",
  aluResultToMemory: "Risultato ALU -> memoria dati",
  aluResultToMemToReg: "Risultato ALU -> mux MemtoReg",
  memToMemToReg: "Memoria dati -> mux MemtoReg",
  readData2ToMemory: "ReadData2 -> memoria dati",
  memToRegToRegisters: "Mux MemtoReg -> banco registri",
  controlToRegDst: "Control unit -> RegDst",
  controlToAluSrc: "Control unit -> ALUSrc",
  controlToAluOp: "Control unit -> ALUOp",
  controlToMemRead: "Control unit -> MemRead",
  controlToMemWrite: "Control unit -> MemWrite",
  controlToMemToReg: "Control unit -> MemtoReg",
  controlToRegWrite: "Control unit -> RegWrite",
  zeroToBranchAnd: "Zero -> logica branch",
  branchToPcSrc: "Branch -> logica PCSrc"
};

function fetchPhase(demo) {
  return {
    code: "IF",
    name: "Instruction Fetch",
    title: "Preleva l'istruzione",
    description:
      "Il PC indirizza la memoria istruzioni. In parallelo l'addizionatore calcola PC + 4 e il mux del PC prepara il cammino sequenziale.",
    active: ["pc", "instructionMemory", "pcAdder", "pcSrcMux"],
    controls: ["pcSrcSignal"],
    wires: ["pcToInstructionMemory", "pcToAdder", "adderToPcMux", "pcMuxToPc"],
    values: [
      { text: "PC = 0x0000000000001000", x: 13.0, y: 46.7 },
      { text: `Instr = ${demo.encoding}`, x: 21.0, y: 60.0 },
      { text: "PC + 4 = 0x0000000000001004", x: 35.8, y: 13.4 },
      { text: "PCSrc = 0", x: 87.0, y: 19.2, kind: "control" }
    ],
    signals: [
      ["PCSrc", "0"],
      ["Next PC", "PC+4"]
    ],
    trace: [
      "PC fornisce l'indirizzo alla memoria istruzioni.",
      `La memoria restituisce la parola ${demo.encoding}, cioe ${demo.title}.`,
      "Il percorso PC+4 prepara l'indirizzo della prossima istruzione."
    ]
  };
}

const demos = [
  {
    id: "dadd",
    title: "DADD R1,R2,R3",
    encoding: "0x0043082C",
    format: "R-type",
    initial: "R2 = 0x0000000000000007, R3 = 0x0000000000000005",
    phases: null
  },
  {
    id: "daddi",
    title: "DADDI R1,R2,immediate",
    encoding: "0x60410010",
    format: "I-type",
    initial: "R2 = 0x0000000000000007, immediate = 16",
    phases: null
  },
  {
    id: "ld",
    title: "LD R1,vett(R2)",
    encoding: "0xDC410020",
    format: "I-type load",
    initial: "R2 = 0x0000000000001000, vett = 0x0020, Mem[0x1020] = 0x1122334455667788",
    phases: null
  },
  {
    id: "sd",
    title: "SD R1,vett(R2)",
    encoding: "0xFC410020",
    format: "I-type store",
    initial: "R1 = 0xAABBCCDDEEFF0011, R2 = 0x0000000000001000, vett = 0x0020",
    phases: null
  },
  {
    id: "bne",
    title: "BNE R1,R2,loop",
    encoding: "0x1422FFFB",
    format: "I-type branch",
    initial: "R1 = 0x000000000000000E, R2 = 0x0000000000000007, loop = 0x0000000000000FF0",
    phases: null
  }
];

const phaseDefinitions = {
  dadd: [
    {
      code: "ID",
      name: "Instruction Decode",
      title: "Decodifica e lettura registri",
      description:
        "L'unita di controllo riconosce una istruzione R-type. Il banco registri legge R2 e R3 come operandi sorgente.",
      active: [
        "instructionMemory",
        "opcodeField",
        "rsField",
        "rtField",
        "rdField",
        "functField",
        "controlUnit",
        "registers",
        "regDstMux"
      ],
      controls: allControlSignals,
      wires: [
        "opcodeToControl",
        "rsToRegisters",
        "rtToRegisters",
        "rtToRegDstMux",
        "rdToRegDstMux",
        "controlToRegDst",
        "controlToRegWrite"
      ],
      values: [
        { text: "opcode = 000000", x: 29.0, y: 35.5 },
        { text: "rs = R2", x: 32.3, y: 50.3 },
        { text: "rt = R3", x: 32.3, y: 57.0 },
        { text: "rd = R1", x: 31.5, y: 66.5 },
        { text: "funct = 101100", x: 48.0, y: 91.5 },
        { text: "Read1 = 0x...0007", x: 58.0, y: 55.7 },
        { text: "Read2 = 0x...0005", x: 58.0, y: 66.6 }
      ],
      signals: [
        ["RegDst", "1"],
        ["Branch", "0"],
        ["MemRead", "0"],
        ["MemtoReg", "0"],
        ["ALUOp", "10"],
        ["MemWrite", "0"],
        ["ALUSrc", "0"],
        ["RegWrite", "1"]
      ],
      trace: [
        "I campi dell'istruzione sono separati: rs=R2, rt=R3, rd=R1.",
        "La control unit imposta il profilo R-type per una operazione ALU.",
        "Il banco registri legge R2 sul primo ingresso e R3 sul secondo."
      ]
    },
    {
      code: "EX",
      name: "Execute",
      title: "Somma R2 e R3 nella ALU",
      description:
        "Il mux ALUSrc seleziona il secondo dato letto dal registro. Il controllore ALU traduce ALUOp e funct nella operazione DADD.",
      active: ["rdField", "functField", "regDstMux", "registers", "aluSrcMux", "aluControl", "alu"],
      controls: ["regDstSignal", "aluOpSignal", "aluSrcSignal", "zeroSignal"],
      wires: [
        "controlToRegDst",
        "controlToAluSrc",
        "controlToAluOp",
        "regDstToWriteRegister",
        "functToAluControl",
        "readData1ToAlu",
        "readData2ToAluSrc",
        "aluSrcToAlu"
      ],
      values: [
        { text: "RegDst=1 => R1", x: 39.5, y: 65.7, kind: "control" },
        { text: "ALUSrc=0", x: 60.5, y: 59.2, kind: "control" },
        { text: "ALUCtrl = DADD", x: 64.4, y: 78.0, kind: "control" },
        { text: "0x...0007 + 0x...0005", x: 68.4, y: 51.4 },
        { text: "Risultato = 0x...000C", x: 79.0, y: 65.0 },
        { text: "Zero = 0", x: 73.0, y: 57.1, kind: "control" }
      ],
      signals: [
        ["RegDst", "1"],
        ["ALUOp", "10"],
        ["ALUSrc", "0"],
        ["ALUCtrl", "DADD"],
        ["Zero", "0"]
      ],
      trace: [
        "Il mux RegDst sceglie il campo rd, quindi il registro destinazione e R1.",
        "Il mux ALUSrc lascia passare ReadData2, percio la ALU riceve R2 e R3.",
        "La ALU esegue DADD: 7 + 5 = 12, senza overflow."
      ]
    },
    {
      code: "MEM",
      name: "Memory Access",
      title: "Memoria dati non usata",
      description:
        "DADD e una istruzione aritmetica R-type: non legge e non scrive la memoria dati. Il risultato ALU prosegue verso il mux di write-back.",
      active: ["alu", "memToRegMux"],
      muted: ["dataMemory", "branchAnd", "pcSrcMux"],
      controls: ["memReadSignal", "memWriteSignal", "memToRegSignal", "branchSignal", "pcSrcSignal"],
      wires: [
        "aluResultToMemory",
        "aluResultToMemToReg",
        "controlToMemRead",
        "controlToMemWrite",
        "controlToMemToReg",
        "branchToPcSrc",
        "zeroToBranchAnd"
      ],
      values: [
        { text: "ALU result = 0x...000C", x: 76.0, y: 63.0 },
        { text: "MemRead = 0", x: 80.8, y: 55.5, kind: "control" },
        { text: "MemWrite = 0", x: 82.7, y: 79.2, kind: "control" },
        { text: "Branch = 0, PCSrc = 0", x: 84.5, y: 27.5, kind: "control" },
        { text: "MemtoReg = 0", x: 91.0, y: 52.4, kind: "control" }
      ],
      signals: [
        ["MemRead", "0"],
        ["MemWrite", "0"],
        ["Branch", "0"],
        ["PCSrc", "0"],
        ["MemtoReg", "0"]
      ],
      trace: [
        "La porta indirizzo della memoria vede il risultato ALU, ma MemRead e MemWrite restano a 0.",
        "Il circuito di branch resta disattivato, quindi il PC continua sul percorso sequenziale.",
        "Il mux MemtoReg e preparato per selezionare il risultato ALU."
      ]
    },
    {
      code: "WB",
      name: "Write Back",
      title: "Scrive il risultato in R1",
      description:
        "Il mux MemtoReg seleziona il risultato della ALU. Con RegWrite attivo, il banco registri aggiorna R1 con il valore calcolato.",
      active: ["memToRegMux", "registers"],
      write: ["registers", "memToRegMux"],
      controls: ["memToRegSignal", "regWriteSignal"],
      wires: ["aluResultToMemToReg", "memToRegToRegisters", "controlToMemToReg", "controlToRegWrite"],
      values: [
        { text: "MemtoReg=0 => ALU", x: 93.8, y: 59.0, kind: "control" },
        { text: "WriteData = 0x000000000000000C", x: 63.0, y: 96.6, kind: "write" },
        { text: "WriteReg = R1", x: 39.6, y: 70.0, kind: "write" },
        { text: "RegWrite = 1", x: 47.8, y: 49.7, kind: "control" },
        { text: "R1 <- 0x...000C", x: 48.6, y: 74.4, kind: "write" }
      ],
      signals: [
        ["MemtoReg", "0"],
        ["RegWrite", "1"],
        ["WriteRegister", "R1"],
        ["WriteData", "0x000000000000000C"]
      ],
      trace: [
        "Il mux MemtoReg prende il valore proveniente dalla ALU, non dalla memoria dati.",
        "Il registro destinazione e R1, scelto dal mux RegDst nella fase EX.",
        "Alla fine del ciclo, R1 contiene 12 in formato 64 bit."
      ]
    }
  ],
  daddi: [
    {
      code: "ID",
      name: "Instruction Decode",
      title: "Decodifica I-type e immediato",
      description:
        "La control unit riconosce DADDI. Il banco registri legge R2, mentre l'immediato a 16 bit viene esteso di segno.",
      active: [
        "instructionMemory",
        "opcodeField",
        "rsField",
        "rtField",
        "immediateField",
        "controlUnit",
        "registers",
        "regDstMux",
        "signExtend"
      ],
      controls: allControlSignals,
      wires: [
        "opcodeToControl",
        "rsToRegisters",
        "rtToRegDstMux",
        "immediateToSignExtend",
        "controlToRegDst",
        "controlToAluSrc",
        "controlToRegWrite"
      ],
      values: [
        { text: "opcode = 011000", x: 29.0, y: 35.5 },
        { text: "rs = R2", x: 32.3, y: 50.3 },
        { text: "rt = R1", x: 32.3, y: 57.0 },
        { text: "imm = 0x0010", x: 33.0, y: 81.2 },
        { text: "SignExt = 0x...0010", x: 53.0, y: 80.2 },
        { text: "Read1 = 0x...0007", x: 58.0, y: 55.7 }
      ],
      signals: [
        ["RegDst", "0"],
        ["Branch", "0"],
        ["MemRead", "0"],
        ["MemtoReg", "0"],
        ["ALUOp", "00"],
        ["MemWrite", "0"],
        ["ALUSrc", "1"],
        ["RegWrite", "1"]
      ],
      trace: [
        "Il campo rs seleziona R2 come sorgente.",
        "Il campo rt seleziona R1 come registro destinazione per una I-type.",
        "L'immediato 0x0010 viene esteso a 64 bit."
      ]
    },
    {
      code: "EX",
      name: "Execute",
      title: "Somma registro e immediato",
      description:
        "Il mux ALUSrc seleziona l'immediato esteso. La ALU esegue una somma signed a 64 bit.",
      active: [
        "rtField",
        "immediateField",
        "regDstMux",
        "registers",
        "signExtend",
        "aluSrcMux",
        "aluControl",
        "alu"
      ],
      controls: ["regDstSignal", "aluOpSignal", "aluSrcSignal", "zeroSignal"],
      wires: [
        "controlToRegDst",
        "controlToAluSrc",
        "controlToAluOp",
        "regDstToWriteRegister",
        "immediateToSignExtend",
        "signExtendToAluSrc",
        "readData1ToAlu",
        "aluSrcToAlu"
      ],
      values: [
        { text: "RegDst=0 => R1", x: 39.5, y: 65.7, kind: "control" },
        { text: "ALUSrc=1 => imm", x: 60.5, y: 70.4, kind: "control" },
        { text: "ALUCtrl = ADD", x: 64.4, y: 78.0, kind: "control" },
        { text: "0x...0007 + 0x...0010", x: 68.4, y: 51.4 },
        { text: "Risultato = 0x...0017", x: 79.0, y: 65.0 },
        { text: "Zero = 0", x: 73.0, y: 57.1, kind: "control" }
      ],
      signals: [
        ["RegDst", "0"],
        ["ALUOp", "00"],
        ["ALUSrc", "1"],
        ["ALUCtrl", "ADD"],
        ["Zero", "0"]
      ],
      trace: [
        "Il mux RegDst sceglie il campo rt, quindi il registro destinazione e R1.",
        "Il mux ALUSrc porta l'immediato esteso al secondo ingresso ALU.",
        "La ALU esegue DADDI: 7 + 16 = 23."
      ]
    },
    {
      code: "MEM",
      name: "Memory Access",
      title: "Memoria dati non usata",
      description:
        "DADDI produce solo un risultato aritmetico. La memoria dati resta disattivata e il risultato ALU continua verso il write-back.",
      active: ["alu", "memToRegMux"],
      muted: ["dataMemory", "branchAnd", "pcSrcMux"],
      controls: ["memReadSignal", "memWriteSignal", "memToRegSignal", "branchSignal", "pcSrcSignal"],
      wires: [
        "aluResultToMemory",
        "aluResultToMemToReg",
        "controlToMemRead",
        "controlToMemWrite",
        "controlToMemToReg"
      ],
      values: [
        { text: "ALU result = 0x...0017", x: 76.0, y: 63.0 },
        { text: "MemRead = 0", x: 80.8, y: 55.5, kind: "control" },
        { text: "MemWrite = 0", x: 82.7, y: 79.2, kind: "control" },
        { text: "MemtoReg = 0", x: 91.0, y: 52.4, kind: "control" }
      ],
      signals: [
        ["MemRead", "0"],
        ["MemWrite", "0"],
        ["Branch", "0"],
        ["MemtoReg", "0"]
      ],
      trace: [
        "Nessun accesso alla memoria dati e richiesto.",
        "Il mux MemtoReg resta impostato sul risultato ALU.",
        "Il valore 23 resta disponibile per il write-back."
      ]
    },
    {
      code: "WB",
      name: "Write Back",
      title: "Aggiorna R1",
      description:
        "Il risultato della ALU viene selezionato dal mux MemtoReg e scritto in R1.",
      active: ["memToRegMux", "registers"],
      write: ["registers", "memToRegMux"],
      controls: ["memToRegSignal", "regWriteSignal"],
      wires: ["aluResultToMemToReg", "memToRegToRegisters", "controlToMemToReg", "controlToRegWrite"],
      values: [
        { text: "MemtoReg=0 => ALU", x: 93.8, y: 59.0, kind: "control" },
        { text: "WriteData = 0x0000000000000017", x: 63.0, y: 96.6, kind: "write" },
        { text: "WriteReg = R1", x: 39.6, y: 70.0, kind: "write" },
        { text: "RegWrite = 1", x: 47.8, y: 49.7, kind: "control" },
        { text: "R1 <- 0x...0017", x: 48.6, y: 74.4, kind: "write" }
      ],
      signals: [
        ["MemtoReg", "0"],
        ["RegWrite", "1"],
        ["WriteRegister", "R1"],
        ["WriteData", "0x0000000000000017"]
      ],
      trace: [
        "Il dato scritto non viene dalla memoria.",
        "RegWrite abilita la scrittura nel banco registri.",
        "Alla fine del ciclo, R1 contiene 23."
      ]
    }
  ],
  ld: [
    {
      code: "ID",
      name: "Instruction Decode",
      title: "Decodifica load e offset",
      description:
        "La control unit riconosce LD. R2 viene letto come registro base, mentre vett viene trattato come offset a 16 bit.",
      active: [
        "instructionMemory",
        "opcodeField",
        "rsField",
        "rtField",
        "immediateField",
        "controlUnit",
        "registers",
        "regDstMux",
        "signExtend"
      ],
      controls: allControlSignals,
      wires: [
        "opcodeToControl",
        "rsToRegisters",
        "rtToRegDstMux",
        "immediateToSignExtend",
        "controlToRegDst",
        "controlToAluSrc",
        "controlToMemRead",
        "controlToMemToReg",
        "controlToRegWrite"
      ],
      values: [
        { text: "opcode = 110111", x: 29.0, y: 35.5 },
        { text: "base rs = R2", x: 32.3, y: 50.3 },
        { text: "rt/dest = R1", x: 32.3, y: 57.0 },
        { text: "vett = 0x0020", x: 33.0, y: 81.2 },
        { text: "SignExt = 0x...0020", x: 53.0, y: 80.2 },
        { text: "Base = 0x...1000", x: 58.0, y: 55.7 }
      ],
      signals: [
        ["RegDst", "0"],
        ["Branch", "0"],
        ["MemRead", "1"],
        ["MemtoReg", "1"],
        ["ALUOp", "00"],
        ["MemWrite", "0"],
        ["ALUSrc", "1"],
        ["RegWrite", "1"]
      ],
      trace: [
        "Il campo rs seleziona R2 come registro base.",
        "Il campo rt identifica R1 come destinazione del load.",
        "L'offset vett viene esteso di segno prima del calcolo dell'indirizzo."
      ]
    },
    {
      code: "EX",
      name: "Execute",
      title: "Calcola l'indirizzo effettivo",
      description:
        "La ALU somma il contenuto di R2 con l'offset vett esteso a 64 bit.",
      active: ["rsField", "immediateField", "registers", "signExtend", "aluSrcMux", "aluControl", "alu"],
      controls: ["aluOpSignal", "aluSrcSignal", "zeroSignal"],
      wires: [
        "controlToAluSrc",
        "controlToAluOp",
        "immediateToSignExtend",
        "signExtendToAluSrc",
        "readData1ToAlu",
        "aluSrcToAlu"
      ],
      values: [
        { text: "ALUSrc=1 => vett", x: 60.5, y: 70.4, kind: "control" },
        { text: "ALUCtrl = ADD", x: 64.0, y: 88.6, kind: "control" },
        { text: "0x...1000 + 0x...0020", x: 68.4, y: 51.4 },
        { text: "Indirizzo = 0x...1020", x: 79.0, y: 65.0 }
      ],
      signals: [
        ["ALUOp", "00"],
        ["ALUSrc", "1"],
        ["ALUCtrl", "ADD"],
        ["Effective address", "0x0000000000001020"]
      ],
      trace: [
        "Il primo ingresso ALU riceve R2.",
        "Il secondo ingresso ALU riceve l'offset vett esteso.",
        "Il risultato ALU e l'indirizzo effettivo della parola da caricare."
      ]
    },
    {
      code: "MEM",
      name: "Memory Access",
      title: "Legge dalla memoria dati",
      description:
        "MemRead abilita la memoria dati. L'indirizzo proviene dalla ALU e il dato letto viene inviato al mux MemtoReg.",
      active: ["alu", "dataMemory", "memToRegMux"],
      controls: ["memReadSignal", "memWriteSignal", "memToRegSignal"],
      wires: [
        "aluResultToMemory",
        "memToMemToReg",
        "controlToMemRead",
        "controlToMemWrite",
        "controlToMemToReg"
      ],
      values: [
        { text: "Indirizzo = 0x...1020", x: 75.5, y: 63.0 },
        { text: "MemRead = 1", x: 80.6, y: 55.5, kind: "control" },
        { text: "Dato letto = 0x1122334455667788", x: 84.5, y: 68.0 },
        { text: "MemtoReg = 1", x: 91.0, y: 52.4, kind: "control" }
      ],
      signals: [
        ["MemRead", "1"],
        ["MemWrite", "0"],
        ["MemtoReg", "1"],
        ["Memory data", "0x1122334455667788"]
      ],
      trace: [
        "L'indirizzo ALU raggiunge l'ingresso indirizzo della memoria dati.",
        "MemRead=1 abilita la lettura.",
        "Il dato letto viene preparato per il write-back."
      ]
    },
    {
      code: "WB",
      name: "Write Back",
      title: "Scrive il dato letto in R1",
      description:
        "Il mux MemtoReg seleziona il dato proveniente dalla memoria. RegWrite aggiorna R1.",
      active: ["memToRegMux", "registers"],
      write: ["registers", "memToRegMux"],
      controls: ["memToRegSignal", "regWriteSignal"],
      wires: ["memToMemToReg", "memToRegToRegisters", "controlToMemToReg", "controlToRegWrite"],
      values: [
        { text: "MemtoReg=1 => memoria", x: 93.8, y: 59.0, kind: "control" },
        { text: "WriteData = 0x1122334455667788", x: 63.0, y: 96.6, kind: "write" },
        { text: "WriteReg = R1", x: 39.6, y: 70.0, kind: "write" },
        { text: "RegWrite = 1", x: 47.8, y: 49.7, kind: "control" },
        { text: "R1 <- memoria", x: 48.6, y: 74.4, kind: "write" }
      ],
      signals: [
        ["MemtoReg", "1"],
        ["RegWrite", "1"],
        ["WriteRegister", "R1"],
        ["WriteData", "0x1122334455667788"]
      ],
      trace: [
        "Il dato di memoria attraversa il mux MemtoReg.",
        "Il campo rt identifica R1 come destinazione.",
        "Alla fine del ciclo, R1 contiene il valore caricato da Mem[0x1020]."
      ]
    }
  ],
  sd: [
    {
      code: "ID",
      name: "Instruction Decode",
      title: "Decodifica store e lettura dati",
      description:
        "La control unit riconosce SD. R2 fornisce la base dell'indirizzo, R1 fornisce il dato da scrivere.",
      active: [
        "instructionMemory",
        "opcodeField",
        "rsField",
        "rtField",
        "immediateField",
        "controlUnit",
        "registers",
        "signExtend"
      ],
      controls: allControlSignals,
      wires: [
        "opcodeToControl",
        "rsToRegisters",
        "rtToRegisters",
        "immediateToSignExtend",
        "controlToAluSrc",
        "controlToMemWrite"
      ],
      values: [
        { text: "opcode = 111111", x: 29.0, y: 35.5 },
        { text: "base rs = R2", x: 32.3, y: 50.3 },
        { text: "rt/source = R1", x: 32.3, y: 57.0 },
        { text: "vett = 0x0020", x: 33.0, y: 81.2 },
        { text: "Base = 0x...1000", x: 58.0, y: 55.7 },
        { text: "Dato store = 0xAABB...0011", x: 58.0, y: 66.6 }
      ],
      signals: [
        ["RegDst", "X"],
        ["Branch", "0"],
        ["MemRead", "0"],
        ["MemtoReg", "X"],
        ["ALUOp", "00"],
        ["MemWrite", "1"],
        ["ALUSrc", "1"],
        ["RegWrite", "0"]
      ],
      trace: [
        "Il campo rs seleziona R2 come base.",
        "Il campo rt seleziona R1 come dato da mandare alla memoria.",
        "L'offset vett viene esteso per il calcolo dell'indirizzo."
      ]
    },
    {
      code: "EX",
      name: "Execute",
      title: "Calcola l'indirizzo di store",
      description:
        "La ALU somma R2 con l'offset vett. Il dato letto da R1 viene conservato per la fase MEM.",
      active: ["rsField", "rtField", "immediateField", "registers", "signExtend", "aluSrcMux", "aluControl", "alu"],
      controls: ["aluOpSignal", "aluSrcSignal"],
      wires: [
        "controlToAluSrc",
        "controlToAluOp",
        "immediateToSignExtend",
        "signExtendToAluSrc",
        "readData1ToAlu",
        "aluSrcToAlu",
        "readData2ToMemory"
      ],
      values: [
        { text: "ALUSrc=1 => vett", x: 60.5, y: 70.4, kind: "control" },
        { text: "ALUCtrl = ADD", x: 64.4, y: 78.0, kind: "control" },
        { text: "0x...1000 + 0x...0020", x: 68.4, y: 51.4 },
        { text: "Indirizzo = 0x...1020", x: 79.0, y: 65.0 },
        { text: "Dato R1 pronto per MEM", x: 82.0, y: 75.0 }
      ],
      signals: [
        ["ALUOp", "00"],
        ["ALUSrc", "1"],
        ["ALUCtrl", "ADD"],
        ["Effective address", "0x0000000000001020"]
      ],
      trace: [
        "Il primo ingresso ALU riceve R2.",
        "Il secondo ingresso ALU riceve l'offset vett esteso.",
        "ReadData2 contiene R1 e prosegue verso l'ingresso Dato scritto della memoria."
      ]
    },
    {
      code: "MEM",
      name: "Memory Access",
      title: "Scrive nella memoria dati",
      description:
        "MemWrite abilita la scrittura. La memoria riceve l'indirizzo dalla ALU e il dato da R1.",
      active: ["alu", "dataMemory"],
      write: ["dataMemory"],
      controls: ["memReadSignal", "memWriteSignal"],
      wires: ["aluResultToMemory", "readData2ToMemory", "controlToMemWrite", "controlToMemRead"],
      values: [
        { text: "Indirizzo = 0x...1020", x: 78.5, y: 63.0 },
        { text: "Dato scritto = 0xAABBCCDDEEFF0011", x: 79.8, y: 75.2, kind: "write" },
        { text: "MemWrite = 1", x: 86.8, y: 83.2, kind: "control" },
        { text: "MemRead = 0", x: 82.7, y: 56.0, kind: "control" }
      ],
      signals: [
        ["MemWrite", "1"],
        ["MemRead", "0"],
        ["RegWrite", "0"],
        ["Mem[0x1020]", "0xAABBCCDDEEFF0011"]
      ],
      trace: [
        "L'indirizzo ALU seleziona la cella di memoria.",
        "Il dato letto da R1 arriva all'ingresso Dato scritto.",
        "MemWrite=1 aggiorna Mem[0x1020]."
      ]
    },
    {
      code: "WB",
      name: "Write Back",
      title: "Nessun write-back",
      description:
        "SD non scrive nel banco registri. Il percorso di write-back resta disabilitato.",
      muted: ["memToRegMux", "registers"],
      controls: ["memToRegSignal", "regWriteSignal"],
      wires: ["controlToRegWrite", "controlToMemToReg"],
      values: [
        { text: "RegWrite = 0", x: 47.8, y: 49.7, kind: "control" },
        { text: "MemtoReg = X", x: 93.8, y: 59.0, kind: "control" },
        { text: "Nessun registro aggiornato", x: 48.6, y: 74.4 }
      ],
      signals: [
        ["RegWrite", "0"],
        ["MemtoReg", "X"],
        ["WriteRegister", "-"],
        ["WriteData", "-"]
      ],
      trace: [
        "La istruzione store ha gia completato il suo effetto nella fase MEM.",
        "Il banco registri non riceve abilitazione di scrittura.",
        "R1 e R2 restano invariati."
      ]
    }
  ],
  bne: [
    {
      code: "ID",
      name: "Instruction Decode",
      title: "Decodifica branch e offset",
      description:
        "La control unit riconosce BNE. Il banco registri legge R1 e R2 per il confronto, mentre l'offset loop viene esteso.",
      active: [
        "instructionMemory",
        "opcodeField",
        "rsField",
        "rtField",
        "immediateField",
        "controlUnit",
        "registers",
        "signExtend"
      ],
      controls: allControlSignals,
      wires: [
        "opcodeToControl",
        "rsToRegisters",
        "rtToRegisters",
        "immediateToSignExtend",
        "controlToAluOp",
        "controlToAluSrc",
        "branchToPcSrc"
      ],
      values: [
        { text: "opcode = 000101", x: 29.0, y: 35.5 },
        { text: "rs = R1", x: 32.3, y: 50.3 },
        { text: "rt = R2", x: 32.3, y: 57.0 },
        { text: "loop offset = 0xFFFB (-5)", x: 34.0, y: 81.2 },
        { text: "Read1 = 0x...000E", x: 58.0, y: 55.7 },
        { text: "Read2 = 0x...0007", x: 58.0, y: 66.6 }
      ],
      signals: [
        ["RegDst", "X"],
        ["Branch/BNE", "1"],
        ["MemRead", "0"],
        ["MemtoReg", "X"],
        ["ALUOp", "01"],
        ["MemWrite", "0"],
        ["ALUSrc", "0"],
        ["RegWrite", "0"]
      ],
      trace: [
        "I registri R1 e R2 vengono letti per decidere il branch.",
        "L'offset loop e -5 istruzioni rispetto a PC+4.",
        "La control unit prepara la ALU per un confronto tramite sottrazione."
      ]
    },
    {
      code: "EX",
      name: "Execute",
      title: "Confronta R1 e R2, calcola loop",
      description:
        "La ALU sottrae R2 da R1. In parallelo l'offset esteso viene shiftato a sinistra di 2 e sommato a PC+4.",
      active: [
        "rsField",
        "rtField",
        "immediateField",
        "registers",
        "signExtend",
        "shiftLeft",
        "branchAdder",
        "aluSrcMux",
        "aluControl",
        "alu"
      ],
      controls: ["aluOpSignal", "aluSrcSignal", "zeroSignal"],
      wires: [
        "controlToAluSrc",
        "controlToAluOp",
        "immediateToSignExtend",
        "signExtendToShift",
        "shiftToBranchAdder",
        "pcPlus4ToBranchAdder",
        "readData1ToAlu",
        "readData2ToAluSrc",
        "aluSrcToAlu"
      ],
      values: [
        { text: "ALUSrc=0", x: 60.5, y: 59.2, kind: "control" },
        { text: "ALUCtrl = SUB", x: 64.4, y: 78.0, kind: "control" },
        { text: "R1 - R2 = 14 - 7", x: 68.4, y: 51.4 },
        { text: "Zero = 0", x: 73.0, y: 57.1, kind: "control" },
        { text: "offset<<2 = -20", x: 63.3, y: 24.0 },
        { text: "Target loop = 0x...0FF0", x: 75.0, y: 18.5 }
      ],
      signals: [
        ["ALUOp", "01"],
        ["ALUSrc", "0"],
        ["ALUCtrl", "SUB"],
        ["Zero", "0"],
        ["Target", "0x0000000000000FF0"]
      ],
      trace: [
        "La ALU confronta R1 e R2 tramite sottrazione.",
        "Poiche R1 diverso da R2, Zero vale 0.",
        "Il target viene calcolato come PC+4 + (offset << 2)."
      ]
    },
    {
      code: "MEM",
      name: "Memory Access",
      title: "Aggiorna il PC se il branch e preso",
      description:
        "BNE non accede alla memoria dati. Il controllo di branch usa not Zero: con R1 diverso da R2, PCSrc seleziona loop.",
      active: ["branchAdder", "branchAnd", "pcSrcMux", "pc"],
      muted: ["dataMemory"],
      controls: ["branchSignal", "zeroSignal", "pcSrcSignal", "memReadSignal", "memWriteSignal"],
      wires: [
        "branchToPcSrc",
        "zeroToBranchAnd",
        "branchAdderToPcMux",
        "pcMuxToPc",
        "controlToMemRead",
        "controlToMemWrite"
      ],
      values: [
        { text: "BNECtrl = 1", x: 82.2, y: 29.0, kind: "control" },
        { text: "Zero=0 => not Zero=1", x: 74.0, y: 57.1, kind: "control" },
        { text: "PCSrc = 1", x: 87.0, y: 19.2, kind: "control" },
        { text: "PC <- 0x0000000000000FF0", x: 82.0, y: 12.5, kind: "write" },
        { text: "MemRead=0, MemWrite=0", x: 82.7, y: 70.0, kind: "control" }
      ],
      signals: [
        ["Branch/BNE", "1"],
        ["Zero", "0"],
        ["PCSrc", "1"],
        ["Next PC", "loop"]
      ],
      trace: [
        "La memoria dati resta inattiva.",
        "Per BNE, il branch e preso quando Zero=0.",
        "Il mux del PC seleziona l'indirizzo target loop."
      ]
    },
    {
      code: "WB",
      name: "Write Back",
      title: "Nessun write-back",
      description:
        "BNE modifica solo il PC. Il banco registri non viene scritto.",
      muted: ["memToRegMux", "registers"],
      controls: ["regWriteSignal", "memToRegSignal"],
      wires: ["controlToRegWrite"],
      values: [
        { text: "RegWrite = 0", x: 47.8, y: 49.7, kind: "control" },
        { text: "Nessun WriteData", x: 63.0, y: 96.6 },
        { text: "R1 e R2 invariati", x: 48.6, y: 74.4 }
      ],
      signals: [
        ["RegWrite", "0"],
        ["WriteRegister", "-"],
        ["WriteData", "-"],
        ["Effetto", "PC = loop"]
      ],
      trace: [
        "Il branch non produce un valore da scrivere nei registri.",
        "Il solo effetto architetturale e il nuovo PC.",
        "La prossima istruzione prelevata sara all'etichetta loop."
      ]
    }
  ]
};

demos.forEach((demo) => {
  demo.phases = [fetchPhase(demo), ...phaseDefinitions[demo.id]];
});

const infoTopics = {
  about: {
    title: "About CPU Spy",
    paragraphs: [
      "CPU Spy is a local teaching tool for inspecting how MIPS64 instructions move through the datapath, control lines, and write-back path.",
      "It runs entirely in the browser or Electron app; no simulation data is sent anywhere."
    ],
    facts: [
      ["Author", "Davide Patti"],
      ["Email", "xedivad@gmail.com"],
      ["License", "MIT License"],
      ["Repository", "github.com/davidepatti/bitland_empire", "https://github.com/davidepatti/bitland_empire"]
    ]
  },
  instruction: {
    title: "Istruzione",
    paragraphs: [
      "Scegli l'istruzione MIPS64 da simulare. Il datapath, i segnali e le micro-operazioni vengono ricalcolati partendo dal primo clock.",
      "Usa questo controllo per confrontare istruzioni R-type, immediati, load/store e branch."
    ]
  },
  phases: {
    title: "Fasi pipeline",
    paragraphs: [
      "Ogni pulsante rappresenta un ciclo della simulazione. Clicca una fase per saltare direttamente a quel punto.",
      "Le frecce nella barra superiore avanzano o tornano indietro di un clock; Reset riporta la simulazione alla fase IF."
    ]
  },
  diagram: {
    title: "Datapath",
    paragraphs: [
      "Il diagramma evidenzia blocchi, segnali e collegamenti usati nella fase corrente.",
      "Clicca un blocco, una linea evidenziata o una etichetta di valore per vedere il suo ruolo e i valori rilevanti nel pannello Elemento."
    ]
  },
  phasePanel: {
    title: "Fase corrente",
    paragraphs: [
      "Questo pannello descrive cosa avviene nel clock selezionato: nome della fase, istruzione codificata, formato e valori iniziali.",
      "Leggilo insieme al datapath: i colori sullo schema indicano quali parti sono attive mentre il testo spiega perche."
    ]
  },
  signals: {
    title: "Segnali",
    paragraphs: [
      "Qui trovi i segnali di controllo o stato importanti per la fase corrente.",
      "Valori come RegWrite, MemRead, ALUSrc o PCSrc spiegano quali mux, registri e memorie sono abilitati."
    ]
  },
  trace: {
    title: "Micro-operazioni",
    paragraphs: [
      "La lista scompone la fase in piccoli passi operativi.",
      "Seguila dall'alto verso il basso per collegare il comportamento logico dell'istruzione al percorso evidenziato nel datapath."
    ]
  },
  inspection: {
    title: "Elemento",
    paragraphs: [
      "Questa area cambia quando selezioni un blocco, un collegamento o un valore nel diagramma.",
      "Usala per capire se l'elemento e attivo, quali segnali lo controllano e quali valori sta trasportando nella fase corrente."
    ]
  }
};

const infoTopicsEnglish = {
  about: {
    title: "About CPU Spy",
    paragraphs: [
      "CPU Spy is a local teaching tool for inspecting how MIPS64 instructions move through the datapath, control lines, and write-back path.",
      "It runs entirely in the browser or Electron app; no simulation data is sent anywhere."
    ],
    facts: [
      ["Author", "Davide Patti"],
      ["Email", "xedivad@gmail.com"],
      ["License", "MIT License"],
      ["Repository", "github.com/davidepatti/bitland_empire", "https://github.com/davidepatti/bitland_empire"]
    ]
  },
  instruction: {
    title: "Instruction",
    paragraphs: [
      "Choose the MIPS64 instruction to simulate. The datapath, signals, and micro-operations are recomputed from the first clock.",
      "Use this control to compare R-type, immediate, load/store, and branch instructions."
    ]
  },
  phases: {
    title: "Pipeline phases",
    paragraphs: [
      "Each button represents one simulation clock. Click a phase to jump directly to that point.",
      "The arrows in the top bar move one clock backward or forward; Reset returns the simulation to IF."
    ]
  },
  diagram: {
    title: "Datapath",
    paragraphs: [
      "The diagram highlights blocks, signals, and wires used in the current phase.",
      "Click a highlighted block, wire, or value label to inspect its role and relevant values in the Element panel."
    ]
  },
  phasePanel: {
    title: "Current phase",
    paragraphs: [
      "This panel describes what happens in the selected clock: phase name, encoded instruction, format, and initial values.",
      "Read it with the datapath: colors show the active parts while the text explains why they matter."
    ]
  },
  signals: {
    title: "Signals",
    paragraphs: [
      "This area lists the control or status signals that matter in the current phase.",
      "Values such as RegWrite, MemRead, ALUSrc, or PCSrc explain which muxes, registers, and memories are enabled."
    ]
  },
  trace: {
    title: "Micro-operations",
    paragraphs: [
      "The list breaks the phase into small operational steps.",
      "Follow it top to bottom to connect the instruction behavior to the highlighted datapath route."
    ]
  },
  inspection: {
    title: "Element",
    paragraphs: [
      "This area changes when you select a block, wire, or value in the diagram.",
      "Use it to understand whether the element is active, which signals control it, and which values it carries."
    ]
  }
};

function tutorialTopic() {
  return {
    title: t("tutorial"),
    paragraphs: [t("tutorialIntro")],
    steps: [
      { visual: "instruction", title: t("tutorialStep1Title"), body: t("tutorialStep1Body") },
      { visual: "phases", title: t("tutorialStep2Title"), body: t("tutorialStep2Body") },
      { visual: "inspect", title: t("tutorialStep3Title"), body: t("tutorialStep3Body") },
      { visual: "quiz", title: t("tutorialStep4Title"), body: t("tutorialStep4Body") }
    ]
  };
}

function getInfoTopic(topicKey) {
  if (topicKey === "tutorial") return tutorialTopic();
  return appState.language === "en" ? infoTopicsEnglish[topicKey] : infoTopics[topicKey];
}

const hotspotLayer = document.querySelector("#hotspotLayer");
const valueLayer = document.querySelector("#valueLayer");
const phaseStrip = document.querySelector("#phaseStrip");
const signalList = document.querySelector("#signalList");
const traceList = document.querySelector("#traceList");
const clockLabel = document.querySelector("#clockLabel");
const phaseCode = document.querySelector("#phaseCode");
const phaseName = document.querySelector("#phaseName");
const phaseTitle = document.querySelector("#phaseTitle");
const phaseDescription = document.querySelector("#phaseDescription");
const diagramStage = document.querySelector("#diagramStage");
const instructionSelect = document.querySelector("#instructionSelect");
const instructionTitle = document.querySelector("#instructionTitle");
const languageSelectEl = document.querySelector("#languageSelect");
const quizModeButtonEl = document.querySelector("#quizModeBtn");
const tutorialButtonEl = document.querySelector("#tutorialButton");
const encodingValue = document.querySelector("#encodingValue");
const formatValue = document.querySelector("#formatValue");
const initialValue = document.querySelector("#initialValue");
const phaseQuizEl = document.querySelector("#phaseQuiz");
const inspectTitle = document.querySelector("#inspectTitle");
const inspectDescription = document.querySelector("#inspectDescription");
const inspectState = document.querySelector("#inspectState");
const infoModal = document.querySelector("#infoModal");
const infoModalTitle = document.querySelector("#infoModalTitle");
const infoModalBody = document.querySelector("#infoModalBody");

let currentDemo = demos[0];
let currentPhase = 0;
let selectedItem = null;
let lastInfoTrigger = null;
const appState = {
  language: getInitialLanguage(),
  quizMode: false,
  quizAnswers: new Map(),
  quizChoiceCache: new Map()
};

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(languageKey);
    if (saved === "en" || saved === "it") return saved;
  } catch (error) {
    // Local files may block storage in some browser settings.
  }
  return "it";
}

function t(key, params = {}) {
  const entry = translations[appState.language][key] ?? translations.en[key] ?? key;
  if (typeof entry === "function") return entry(params);
  return entry.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}

function localizeText(value) {
  if (appState.language === "it") return value;
  return englishText[value] || value;
}

function quizText(it, en) {
  return appState.language === "en" ? en : it;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function applyTranslations() {
  document.documentElement.lang = appState.language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attribute, key] = pair.split(":");
      if (attribute && key) element.setAttribute(attribute, t(key));
    });
  });
  languageSelectEl.value = appState.language;
  quizModeButtonEl.textContent = t("quizMode");
  tutorialButtonEl.textContent = t("tutorial");
}

function setLanguage(language) {
  if (language !== "en" && language !== "it") return;
  appState.language = language;
  try {
    localStorage.setItem(languageKey, language);
  } catch (error) {
    // Local files may block storage in some browser settings.
  }
  phaseStrip.innerHTML = "";
  createPhaseTabs();
  applyTranslations();
  renderPhase();
}

function renderInfoBody(topic) {
  infoModalBody.innerHTML = "";

  topic.paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    infoModalBody.appendChild(paragraph);
  });

  if (topic.facts) {
    const list = document.createElement("dl");
    list.className = "info-facts";
    topic.facts.forEach(([label, value, href]) => {
      const term = document.createElement("dt");
      const detail = document.createElement("dd");
      term.textContent = label;
      if (href || label === "Email") {
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
    infoModalBody.appendChild(list);
  }

  if (topic.steps) {
    const steps = document.createElement("div");
    steps.className = "tutorial-steps";
    topic.steps.forEach((step) => {
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
    infoModalBody.appendChild(steps);
  }
}

function tutorialVisual(type) {
  if (type === "instruction") {
    return `
      <div class="shot-bar"><span>${escapeHtml(t("instruction"))}</span><span>DADD R1,R2,R3</span></div>
      <div class="shot-card">R2 = 0x...0007<br>R3 = 0x...0005</div>
      <div class="shot-path"><span class="active">IF</span><span>ID</span><span>EX</span><span>MEM</span><span>WB</span></div>
    `;
  }

  if (type === "phases") {
    return `
      <div class="shot-bar"><span>${escapeHtml(t("clockCount", { current: 3, total: 5 }))}</span><span>EX</span></div>
      <div class="shot-path"><span>IF</span><span>ID</span><span class="active">EX</span><span>MEM</span><span>WB</span></div>
      <div class="shot-card">${escapeHtml(localizeText("Somma R2 e R3 nella ALU"))}</div>
    `;
  }

  if (type === "inspect") {
    return `
      <div class="shot-bar"><span>ALU</span><span>${escapeHtml(t("activeStage"))}</span></div>
      <div class="shot-card">ALUCtrl = DADD<br>Risultato = 0x...000C</div>
      <div class="shot-result">${escapeHtml(t("element"))}</div>
    `;
  }

  return `
    <div class="shot-bar"><span>${escapeHtml(t("quizMode"))}</span><span>EX</span></div>
    <span class="shot-choice">${escapeHtml(localizeText("Legge dalla memoria dati"))}</span>
    <span class="shot-choice good">${escapeHtml(localizeText("Somma R2 e R3 nella ALU"))}</span>
    <span class="shot-choice">${escapeHtml(localizeText("Nessun write-back"))}</span>
    <div class="shot-result">${escapeHtml(t("correct"))}</div>
  `;
}

function openInfo(topicKey, trigger) {
  const topic = getInfoTopic(topicKey);
  if (!topic) return;
  lastInfoTrigger = trigger;
  infoModalTitle.textContent = topic.title;
  renderInfoBody(topic);
  infoModal.querySelector(".info-card").classList.toggle("tutorial-card", Boolean(topic.steps));
  infoModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  infoModal.querySelector(".modal-close").focus();
}

function closeInfo() {
  infoModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
  if (lastInfoTrigger) lastInfoTrigger.focus();
}

function bindInfoButtons() {
  document.querySelectorAll("[data-help]").forEach((button) => {
    button.addEventListener("click", () => openInfo(button.dataset.help, button));
  });
  infoModal.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", closeInfo);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !infoModal.classList.contains("hidden")) {
      closeInfo();
    }
  });
}

function getPhaseIndexFromParam(demo, phaseParam) {
  if (!phaseParam) {
    return 0;
  }

  const normalized = phaseParam.trim().toUpperCase();
  const byCode = demo.phases.findIndex((phase) => phase.code === normalized);
  if (byCode !== -1) {
    return byCode;
  }

  const numeric = Number.parseInt(phaseParam, 10);
  if (Number.isNaN(numeric)) {
    return 0;
  }

  if (numeric >= 1 && numeric <= demo.phases.length) {
    return numeric - 1;
  }

  return numeric >= 0 && numeric < demo.phases.length ? numeric : 0;
}

function applyInitialUrlState() {
  const params = new URLSearchParams(window.location.search);
  const requestedDemo = demos.find((demo) => demo.id === params.get("demo"));
  if (requestedDemo) {
    currentDemo = requestedDemo;
  }
  currentPhase = getPhaseIndexFromParam(currentDemo, params.get("phase"));
}

function createHotspots() {
  Object.entries(hotspots).forEach(([key, box]) => {
    const node =
      box.shape === "oval"
        ? document.createElementNS(SVG_NS, "ellipse")
        : document.createElementNS(SVG_NS, "rect");

    node.setAttribute("class", box.target === "label" ? "hotspot hotspot-label" : "hotspot");
    node.dataset.hotspot = key;
    node.setAttribute("role", "button");
    node.setAttribute("tabindex", "0");
    node.setAttribute("focusable", "true");
    node.setAttribute("aria-label", getHotspotName(key));

    if (box.shape === "oval") {
      node.setAttribute("cx", box.x + box.w / 2);
      node.setAttribute("cy", box.y + box.h / 2);
      node.setAttribute("rx", box.w / 2);
      node.setAttribute("ry", box.h / 2);
    } else {
      node.setAttribute("x", box.x);
      node.setAttribute("y", box.y);
      node.setAttribute("width", box.w);
      node.setAttribute("height", box.h);
      node.setAttribute("rx", box.target === "label" ? "5" : "8");
      node.setAttribute("ry", box.target === "label" ? "5" : "8");
    }

    node.addEventListener("click", (event) => {
      event.stopPropagation();
      inspectItem({ kind: "hotspot", id: key });
    });
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        inspectItem({ kind: "hotspot", id: key });
      }
    });
    hotspotLayer.appendChild(node);
  });
}

function createInstructionOptions() {
  demos.forEach((demo) => {
    const option = document.createElement("option");
    option.value = demo.id;
    option.textContent = demo.title;
    instructionSelect.appendChild(option);
  });
}

function createPhaseTabs() {
  currentDemo.phases.forEach((phase, index) => {
    const button = document.createElement("button");
    button.className = "phase-tab";
    button.type = "button";
    button.dataset.phase = String(index);
    button.innerHTML = `${phase.code}<span>${t("clock")} ${index + 1}</span>`;
    button.addEventListener("click", () => setPhase(index));
    phaseStrip.appendChild(button);
  });
}

function readableKey(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function getElementInfo(key) {
  if (diagramElements[key]) {
    return diagramElements[key];
  }

  if (signalNamesByHotspot[key]) {
    const signalName = signalNamesByHotspot[key][0];
    return {
      name: signalName,
      role: t("controlSignal"),
      description: appState.language === "en"
        ? `Control line ${signalName} produced by the control unit.`
        : `Linea di controllo ${signalName} prodotta dalla control unit.`,
      signals: signalNamesByHotspot[key],
      valueIncludes: signalNamesByHotspot[key]
    };
  }

  return {
    name: readableKey(key),
    role: t("datapathElement"),
    description: appState.language === "en" ? "MIPS64 datapath element." : "Elemento del datapath MIPS64.",
    valueIncludes: [readableKey(key)]
  };
}

function getHotspotName(key) {
  const info = getElementInfo(key);
  return `${info.name}, ${info.role}`;
}

function signalMatches(actual, target) {
  const actualLower = actual.toLowerCase();
  const targetLower = target.toLowerCase();
  return (
    actualLower === targetLower ||
    actualLower.startsWith(`${targetLower}/`) ||
    targetLower.startsWith(`${actualLower}/`)
  );
}

function getSignalEntries(phase, signals) {
  if (signals === "all") {
    return phase.signals || [];
  }

  if (!signals || signals.length === 0) {
    return [];
  }

  return (phase.signals || []).filter(([name]) =>
    signals.some((target) => signalMatches(name, target))
  );
}

function getRelatedValues(phase, info) {
  const tokens = info.valueIncludes || [];
  if (tokens.length === 0) {
    return [];
  }

  return (phase.values || [])
    .filter((item) => tokens.some((token) => item.text.includes(token)))
    .map((item) => item.text);
}

function getHotspotStatus(key, phase) {
  const active = new Set([...(phase.active || []), ...(phase.controls || [])]);
  const muted = new Set(phase.muted || []);
  const write = new Set(phase.write || []);

  if (write.has(key)) {
    return t("activeWrite");
  }

  if (muted.has(key)) {
    return t("mutedStatus");
  }

  if (active.has(key)) {
    return hotspots[key]?.kind === "control" ? t("activeControl") : t("activeStage");
  }

  return t("inactiveStage");
}

function getWireType(id) {
  const wire = Array.from(document.querySelectorAll(".wire")).find(
    (node) => node.dataset.wire === id
  );

  if (!wire) {
    return t("linkType");
  }

  if (wire.classList.contains("control")) {
    return t("controlType");
  }

  if (wire.classList.contains("write")) {
    return t("writeType");
  }

  return t("dataType");
}

function getWireStatus(id, phase) {
  return (phase.wires || []).includes(id)
    ? t("activeLink")
    : t("inactiveLink");
}

function formatSignalEntries(entries) {
  return entries.map(([name, value]) => `${name}=${value}`).join(", ");
}

function formatList(values) {
  return [...new Set(values)].join(" | ");
}

function quizKey() {
  return `${appState.language}:${currentDemo.id}:${currentPhase}`;
}

function shuffleQuizValues(values) {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function uniqueQuizValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function stageFallbackQuizPool(phaseCode) {
  if (phaseCode === "IF") {
    return [
      quizText(
        "Il PC viene aggiornato prima che la memoria istruzioni riceva l'indirizzo del clock corrente.",
        "The PC is updated before instruction memory receives the address for the current clock."
      ),
      quizText(
        "La memoria istruzioni usa PC+4 come indirizzo e lascia fermo il PC corrente.",
        "Instruction memory uses PC+4 as the address and leaves the current PC idle."
      ),
      quizText(
        "Il mux del PC mantiene il vecchio indirizzo finche la decodifica non conferma l'opcode.",
        "The PC mux holds the old address until decode confirms the opcode."
      )
    ];
  }

  if (phaseCode === "ID") {
    return [
      quizText(
        "La control unit osserva l'opcode, ma il banco registri resta fermo fino alla fase EX.",
        "The control unit observes the opcode, but the register file stays idle until EX."
      ),
      quizText(
        "I campi dell'istruzione vengono separati, ma nessun segnale di controllo viene ancora preparato.",
        "The instruction fields are split, but no control signal is prepared yet."
      ),
      quizText(
        "Il banco registri legge i campi di destinazione invece dei campi sorgente richiesti dalla decodifica.",
        "The register file reads destination fields instead of the source fields required by decode."
      )
    ];
  }

  if (phaseCode === "EX") {
    return [
      quizText(
        "La ALU riceve gli ingressi, ma il controllo ALU verra deciso solo nel clock successivo.",
        "The ALU receives its inputs, but ALU control will be decided only on the next clock."
      ),
      quizText(
        "Il mux ALUSrc seleziona l'ingresso opposto a quello richiesto dall'istruzione corrente.",
        "The ALUSrc mux selects the input opposite to the one required by the current instruction."
      ),
      quizText(
        "Gli operandi restano nel banco registri e non raggiungono ancora la ALU.",
        "The operands remain in the register file and do not reach the ALU yet."
      )
    ];
  }

  if (phaseCode === "MEM") {
    return [
      quizText(
        "I controlli MEM vengono ignorati e il risultato della fase EX torna indietro verso la ALU.",
        "MEM controls are ignored and the EX-stage result moves backward to the ALU."
      ),
      quizText(
        "Il mux MemtoReg decide il valore finale prima che la fase MEM abbia terminato il suo effetto.",
        "The MemtoReg mux decides the final value before the MEM phase has completed its effect."
      ),
      quizText(
        "La fase MEM modifica sempre sia la memoria dati sia il PC, qualunque sia l'istruzione.",
        "The MEM phase always changes both data memory and the PC, regardless of the instruction."
      )
    ];
  }

  return [
    quizText(
      "RegWrite rimane spento anche se la fase sta preparando una scrittura valida.",
      "RegWrite remains off even though the phase is preparing a valid write."
    ),
    quizText(
      "Il mux di write-back seleziona un ingresso diverso da quello prodotto dall'istruzione corrente.",
      "The write-back mux selects an input different from the one produced by the current instruction."
    ),
    quizText(
      "Il banco registri riceve il dato corretto, ma non conosce quale registro aggiornare.",
      "The register file receives the correct value, but does not know which register to update."
    )
  ];
}

function cpuQuizPool(demo, phase) {
  if (phase.code === "IF") {
    return [
      quizText(
        "La memoria istruzioni riceve PC+4 come indirizzo, quindi preleva la parola successiva invece di quella corrente.",
        "Instruction memory receives PC+4 as the address, so it fetches the next word instead of the current one."
      ),
      quizText(
        "Il PC mantiene il vecchio valore mentre l'addizionatore prepara PC+4 senza inviarlo al mux.",
        "The PC keeps the old value while the adder prepares PC+4 without sending it to the mux."
      ),
      quizText(
        "Il mux del PC seleziona il proprio ingresso solo dopo che la memoria istruzioni ha decodificato l'opcode.",
        "The PC mux selects its input only after instruction memory has decoded the opcode."
      ),
      quizText(
        "L'addizionatore PC+4 usa la parola istruzione appena letta come operando dell'incremento.",
        "The PC+4 adder uses the fetched instruction word as the increment operand."
      ),
      quizText(
        "Il cammino sequenziale resta disattivato e il PC non prepara nessun prossimo indirizzo.",
        "The sequential path stays disabled and the PC prepares no next address."
      ),
      quizText(
        "La parola istruzione viene conservata nel PC, mentre la memoria istruzioni aspetta la fase ID.",
        "The instruction word is stored in the PC while instruction memory waits for ID."
      ),
      quizText(
        "PCSrc mantiene il PC sul valore precedente invece di predisporre il percorso PC+4.",
        "PCSrc keeps the PC on the previous value instead of preparing the PC+4 path."
      )
    ];
  }

  const pools = {
    dadd: {
      ID: [
        quizText(
          "La control unit riconosce un profilo R-type, ma il banco registri legge R1 e R2 come sorgenti.",
          "The control unit recognizes an R-type profile, but the register file reads R1 and R2 as sources."
        ),
        quizText(
          "I campi rs e rt vengono passati al banco registri, ma rd e funct restano inutilizzati in questa fase.",
          "The rs and rt fields reach the register file, but rd and funct are left unused in this phase."
        ),
        quizText(
          "Il mux RegDst prepara il campo rt come destinazione anche se il formato decodificato e R-type.",
          "The RegDst mux prepares rt as the destination even though the decoded format is R-type."
        ),
        quizText(
          "La lettura di R2 e R3 viene rimandata alla fase EX; in ID si osservano solo opcode e funct.",
          "Reading R2 and R3 is delayed until EX; ID only observes opcode and funct."
        ),
        quizText(
          "ALUOp resta indefinito, quindi il campo funct non puo ancora scegliere l'operazione ALU.",
          "ALUOp remains undefined, so the funct field cannot choose the ALU operation yet."
        ),
        quizText(
          "R2 e R3 sono letti, ma la control unit non abilita ancora il profilo R-type.",
          "R2 and R3 are read, but the control unit does not enable the R-type profile yet."
        ),
        quizText(
          "Il campo rd viene usato come sorgente, mentre rt viene preparato come destinazione.",
          "The rd field is used as a source while rt is prepared as the destination."
        )
      ],
      EX: [
        quizText(
          "Il mux ALUSrc seleziona R3, ma la ALU resta in attesa del funct fino alla fase MEM.",
          "The ALUSrc mux selects R3, but the ALU waits for funct until MEM."
        ),
        quizText(
          "La ALU confronta R2 e R3 e usa solo Zero, senza produrre il risultato DADD.",
          "The ALU compares R2 and R3 and uses only Zero, without producing the DADD result."
        ),
        quizText(
          "Il controllore ALU interpreta ALUOp e funct come una sottrazione invece della DADD.",
          "The ALU controller interprets ALUOp and funct as a subtraction instead of DADD."
        ),
        quizText(
          "Il secondo dato letto raggiunge il mux ALUSrc, ma non viene ancora portato alla ALU.",
          "The second read value reaches the ALUSrc mux, but is not carried to the ALU yet."
        ),
        quizText(
          "La destinazione R1 viene scelta, mentre R2 e R3 rimangono nel banco registri.",
          "Destination R1 is selected while R2 and R3 remain in the register file."
        ),
        quizText(
          "RegDst sceglie R1, ma il controllo ALU lascia l'operazione aritmetica non definita.",
          "RegDst selects R1, but ALU control leaves the arithmetic operation undefined."
        )
      ],
      MEM: [
        quizText(
          "MemRead viene attivato per rileggere il risultato ALU dalla memoria dati.",
          "MemRead is enabled to read the ALU result back from data memory."
        ),
        quizText(
          "MemWrite salva il risultato ALU in memoria dati prima del write-back.",
          "MemWrite stores the ALU result in data memory before write-back."
        ),
        quizText(
          "Il mux MemtoReg seleziona il dato memoria anche se il risultato disponibile e quello ALU.",
          "The MemtoReg mux selects memory data even though the available result is the ALU result."
        ),
        quizText(
          "Il risultato ALU resta bloccato nella memoria dati finche RegWrite diventa attivo.",
          "The ALU result stays blocked in data memory until RegWrite becomes active."
        ),
        quizText(
          "La memoria dati riceve l'indirizzo ALU, ma i segnali MemRead e MemWrite non sono ancora definiti.",
          "Data memory receives the ALU address, but MemRead and MemWrite are not defined yet."
        )
      ],
      WB: [
        quizText(
          "RegWrite resta disattivato, quindi R1 non viene aggiornato con il risultato ALU.",
          "RegWrite remains disabled, so R1 is not updated with the ALU result."
        ),
        quizText(
          "MemtoReg seleziona il dato memoria invece del risultato ALU destinato a R1.",
          "MemtoReg selects memory data instead of the ALU result meant for R1."
        ),
        quizText(
          "Il banco registri prepara R1, ma la scrittura viene rimandata al clock successivo.",
          "The register file prepares R1, but the write is delayed until the next clock."
        ),
        quizText(
          "WriteReg resta indeterminato, quindi il valore ALU non puo essere scritto.",
          "WriteReg remains undefined, so the ALU value cannot be written."
        ),
        quizText(
          "Il mux MemtoReg riceve il risultato ALU, ma lo lascia fuori dal percorso WriteData.",
          "The MemtoReg mux receives the ALU result but leaves it outside the WriteData path."
        )
      ]
    },
    daddi: {
      ID: [
        quizText(
          "La control unit riconosce DADDI, ma tratta R1 come sorgente e R2 come destinazione.",
          "The control unit recognizes DADDI, but treats R1 as the source and R2 as the destination."
        ),
        quizText(
          "L'immediato viene letto, ma il sign extend viene lasciato alla fase EX.",
          "The immediate is read, but sign extension is left to EX."
        ),
        quizText(
          "Il banco registri legge R2 e R1 come due operandi ALU, ignorando l'immediato.",
          "The register file reads R2 and R1 as two ALU operands, ignoring the immediate."
        ),
        quizText(
          "RegDst resta indeterminato, quindi il campo rt non viene ancora preparato come destinazione.",
          "RegDst remains undefined, so rt is not yet prepared as the destination."
        ),
        quizText(
          "ALUSrc rimane sul percorso del banco registri, quindi l'immediato non verra selezionato.",
          "ALUSrc remains on the register-file path, so the immediate will not be selected."
        ),
        quizText(
          "Il campo rt viene letto solo come sorgente e non viene preparato per la scrittura di R1.",
          "The rt field is read only as a source and is not prepared for writing R1."
        )
      ],
      EX: [
        quizText(
          "Il mux ALUSrc resta sul percorso del banco registri, quindi l'immediato esteso non entra in ALU.",
          "The ALUSrc mux stays on the register-file path, so the extended immediate does not enter the ALU."
        ),
        quizText(
          "La ALU usa R2 e l'immediato, ma esegue un confronto invece della somma.",
          "The ALU uses R2 and the immediate, but performs a comparison instead of addition."
        ),
        quizText(
          "RegDst sceglie il campo rt, ma il risultato ALU viene gia scritto nel banco registri.",
          "RegDst selects rt, but the ALU result is already written into the register file."
        ),
        quizText(
          "Il sign extend produce l'immediato, ma ALUSrc lo lascia fermo prima della ALU.",
          "Sign extension produces the immediate, but ALUSrc leaves it stopped before the ALU."
        ),
        quizText(
          "ALUOp non viene tradotto in ADD, quindi R2 e l'immediato non vengono sommati correttamente.",
          "ALUOp is not translated to ADD, so R2 and the immediate are not added correctly."
        ),
        quizText(
          "La destinazione R1 viene scelta, ma la ALU usa solo R2 senza aggiungere l'immediato.",
          "Destination R1 is selected, but the ALU uses only R2 without adding the immediate."
        )
      ],
      MEM: [
        quizText(
          "MemRead viene attivato per trasformare il risultato ALU in un dato letto dalla memoria.",
          "MemRead is enabled to turn the ALU result into a value read from memory."
        ),
        quizText(
          "MemWrite salva il risultato della somma in memoria dati invece di lasciarlo al write-back.",
          "MemWrite stores the addition result in data memory instead of leaving it for write-back."
        ),
        quizText(
          "MemtoReg passa al dato memoria, quindi il risultato ALU non raggiunge il percorso di scrittura.",
          "MemtoReg switches to memory data, so the ALU result does not reach the write path."
        ),
        quizText(
          "La memoria dati attende l'indirizzo, quindi il risultato ALU non puo ancora avanzare.",
          "Data memory waits for an address, so the ALU result cannot advance yet."
        ),
        quizText(
          "Il risultato ALU viene scartato in MEM perche DADDI non usa la memoria dati.",
          "The ALU result is discarded in MEM because DADDI does not use data memory."
        )
      ],
      WB: [
        quizText(
          "RegWrite resta disattivato, quindi il risultato immediato non aggiorna R1.",
          "RegWrite remains disabled, so the immediate result does not update R1."
        ),
        quizText(
          "MemtoReg seleziona il dato memoria invece del risultato della ALU.",
          "MemtoReg selects memory data instead of the ALU result."
        ),
        quizText(
          "WriteReg resta indeterminato, quindi R1 non viene scelto come destinazione.",
          "WriteReg remains undefined, so R1 is not selected as the destination."
        ),
        quizText(
          "Il risultato ALU arriva al mux, ma il banco registri rimane in sola lettura.",
          "The ALU result reaches the mux, but the register file stays read-only."
        ),
        quizText(
          "R1 viene preparato come destinazione, ma il dato scritto resta quello vecchio.",
          "R1 is prepared as the destination, but the written value remains the old one."
        )
      ]
    },
    ld: {
      ID: [
        quizText(
          "La control unit riconosce LD, ma legge R1 come base e R2 come destinazione.",
          "The control unit recognizes LD, but reads R1 as the base and R2 as the destination."
        ),
        quizText(
          "L'offset vett resta nel campo istruzione senza passare al sign extend.",
          "The vett offset remains in the instruction field without going through sign extension."
        ),
        quizText(
          "Il banco registri legge R2 come base, ma RegWrite viene lasciato spento.",
          "The register file reads R2 as the base, but RegWrite is left off."
        ),
        quizText(
          "MemRead e MemtoReg sono preparati, ma il campo rt non viene conservato come destinazione.",
          "MemRead and MemtoReg are prepared, but rt is not kept as the destination."
        ),
        quizText(
          "R2 e l'offset sono letti, ma ALUSrc resta sul percorso del banco registri.",
          "R2 and the offset are read, but ALUSrc stays on the register-file path."
        ),
        quizText(
          "Il campo rt viene trattato come dato sorgente invece che come destinazione del load.",
          "The rt field is treated as source data instead of the load destination."
        )
      ],
      EX: [
        quizText(
          "ALUSrc resta sul secondo registro, quindi l'offset non partecipa all'indirizzo.",
          "ALUSrc stays on the second register, so the offset does not contribute to the address."
        ),
        quizText(
          "L'indirizzo effettivo viene preso direttamente da vett, senza sommare R2.",
          "The effective address is taken directly from vett, without adding R2."
        ),
        quizText(
          "La ALU usa R2 e vett, ma produce un confronto invece dell'indirizzo.",
          "The ALU uses R2 and vett, but produces a comparison instead of the address."
        ),
        quizText(
          "L'offset esteso raggiunge il mux, ma la ALU attende la fase MEM per sommarlo.",
          "The extended offset reaches the mux, but the ALU waits until MEM to add it."
        ),
        quizText(
          "Il campo rt viene scelto come secondo operando della ALU al posto dell'offset.",
          "The rt field is selected as the ALU second operand instead of the offset."
        ),
        quizText(
          "R2 raggiunge la ALU, ma il controllo ALU non viene ancora fissato a ADD.",
          "R2 reaches the ALU, but ALU control is not fixed to ADD yet."
        )
      ],
      MEM: [
        quizText(
          "MemWrite abilita la memoria dati e sovrascrive la cella indicata dall'indirizzo ALU.",
          "MemWrite enables data memory and overwrites the cell addressed by the ALU address."
        ),
        quizText(
          "MemRead resta disattivo, quindi il mux MemtoReg riceve ancora il risultato ALU.",
          "MemRead remains disabled, so the MemtoReg mux still receives the ALU result."
        ),
        quizText(
          "La memoria usa R2 come indirizzo, ignorando l'indirizzo effettivo prodotto dalla ALU.",
          "Memory uses R2 as the address, ignoring the effective address produced by the ALU."
        ),
        quizText(
          "Il dato letto resta nella memoria e non raggiunge il mux MemtoReg.",
          "The loaded data stays in memory and does not reach the MemtoReg mux."
        ),
        quizText(
          "MemtoReg rimane sul risultato ALU mentre MemRead legge il dato dalla memoria.",
          "MemtoReg stays on the ALU result while MemRead reads data from memory."
        ),
        quizText(
          "L'indirizzo ALU arriva alla memoria, ma la lettura viene rinviata al write-back.",
          "The ALU address reaches memory, but the read is delayed until write-back."
        )
      ],
      WB: [
        quizText(
          "MemtoReg resta sul risultato ALU, quindi R1 riceve l'indirizzo effettivo.",
          "MemtoReg stays on the ALU result, so R1 receives the effective address."
        ),
        quizText(
          "RegWrite resta disattivo e il dato letto non aggiorna R1.",
          "RegWrite remains disabled and the loaded data does not update R1."
        ),
        quizText(
          "Il dato di memoria passa al mux, ma WriteReg non viene fissato a R1.",
          "Memory data reaches the mux, but WriteReg is not fixed to R1."
        ),
        quizText(
          "R1 viene scelto come destinazione, ma WriteData conserva l'indirizzo della ALU.",
          "R1 is selected as the destination, but WriteData keeps the ALU address."
        ),
        quizText(
          "Il banco registri riceve il dato caricato, ma RegWrite viene attivato solo nel ciclo seguente.",
          "The register file receives the loaded data, but RegWrite is enabled only on the next cycle."
        )
      ]
    },
    sd: {
      ID: [
        quizText(
          "La control unit riconosce SD, ma prepara RegWrite per aggiornare R1.",
          "The control unit recognizes SD, but prepares RegWrite to update R1."
        ),
        quizText(
          "R2 viene letto come base, ma il dato da R1 non viene letto dal banco registri.",
          "R2 is read as the base, but the data from R1 is not read from the register file."
        ),
        quizText(
          "L'offset vett viene usato come dato da scrivere invece che come parte dell'indirizzo.",
          "The vett offset is used as the value to write instead of as part of the address."
        ),
        quizText(
          "MemWrite resta spento, quindi la store non prepara nessun aggiornamento memoria.",
          "MemWrite remains off, so the store prepares no memory update."
        ),
        quizText(
          "Il campo rt non viene conservato come dato sorgente da mandare alla memoria.",
          "The rt field is not kept as source data to send to memory."
        ),
        quizText(
          "Il sign extend viene saltato e l'indirizzo usa solo la base R2.",
          "Sign extension is skipped and the address uses only base R2."
        )
      ],
      EX: [
        quizText(
          "La ALU calcola l'indirizzo con R2 e vett, ma il dato R1 viene scartato prima di MEM.",
          "The ALU computes the address from R2 and vett, but the R1 data is discarded before MEM."
        ),
        quizText(
          "ALUSrc resta sul dato R1, quindi l'offset non entra nel calcolo dell'indirizzo.",
          "ALUSrc stays on the R1 data, so the offset does not enter address calculation."
        ),
        quizText(
          "L'indirizzo di store viene preso dal solo R2 senza aggiungere vett.",
          "The store address is taken from R2 alone without adding vett."
        ),
        quizText(
          "Il dato R1 viene mandato alla ALU come secondo operando invece che conservarsi per MEM.",
          "The R1 data is sent to the ALU as the second operand instead of being kept for MEM."
        ),
        quizText(
          "L'offset esteso resta fermo al sign extend e non raggiunge il mux ALUSrc.",
          "The extended offset stays at sign extend and does not reach the ALUSrc mux."
        ),
        quizText(
          "La ALU prepara l'indirizzo, ma il percorso del dato da scrivere viene gia disabilitato.",
          "The ALU prepares the address, but the write-data path is already disabled."
        )
      ],
      MEM: [
        quizText(
          "MemRead viene abilitato e la memoria restituisce il contenuto della cella indirizzata.",
          "MemRead is enabled and memory returns the content of the addressed cell."
        ),
        quizText(
          "MemWrite resta disattivo, quindi l'indirizzo ALU attraversa MEM senza effetto.",
          "MemWrite remains disabled, so the ALU address passes through MEM with no effect."
        ),
        quizText(
          "La memoria riceve l'indirizzo corretto, ma usa R2 come dato da scrivere.",
          "Memory receives the correct address, but uses R2 as the data to write."
        ),
        quizText(
          "Il dato R1 arriva alla memoria, ma l'indirizzo viene preso dall'offset non sommato.",
          "The R1 data reaches memory, but the address is taken from the non-added offset."
        ),
        quizText(
          "La scrittura viene preparata in MEM, ma avverra solo nella fase WB.",
          "The write is prepared in MEM, but will happen only in WB."
        ),
        quizText(
          "MemWrite aggiorna il banco registri invece della cella di memoria indirizzata.",
          "MemWrite updates the register file instead of the addressed memory cell."
        )
      ],
      WB: [
        quizText(
          "RegWrite torna attivo e riscrive R1 con il dato appena salvato.",
          "RegWrite turns back on and rewrites R1 with the value just stored."
        ),
        quizText(
          "MemtoReg seleziona il valore memoria per aggiornare il campo rt.",
          "MemtoReg selects memory data to update the rt field."
        ),
        quizText(
          "Il banco registri aggiorna R2 con l'indirizzo effettivo calcolato dalla ALU.",
          "The register file updates R2 with the effective address computed by the ALU."
        ),
        quizText(
          "La store usa WB per confermare la scrittura nella memoria dati.",
          "The store uses WB to confirm the write in data memory."
        ),
        quizText(
          "WriteData contiene il dato R1 e RegWrite lo riporta nel banco registri.",
          "WriteData contains the R1 value and RegWrite writes it back to the register file."
        )
      ]
    },
    bne: {
      ID: [
        quizText(
          "La control unit riconosce BNE, ma legge solo R1 e rimanda R2 alla fase EX.",
          "The control unit recognizes BNE, but reads only R1 and delays R2 until EX."
        ),
        quizText(
          "L'offset loop viene ignorato in ID e non passa al sign extend.",
          "The loop offset is ignored in ID and does not go through sign extension."
        ),
        quizText(
          "ALUOp resta sul profilo di somma, quindi il confronto non viene preparato.",
          "ALUOp stays on the add profile, so the comparison is not prepared."
        ),
        quizText(
          "Il banco registri legge R1 e R2, ma RegWrite viene preparato per aggiornare R1.",
          "The register file reads R1 and R2, but RegWrite is prepared to update R1."
        ),
        quizText(
          "Il campo rt non viene letto dal banco registri per il confronto del branch.",
          "The rt field is not read from the register file for the branch comparison."
        ),
        quizText(
          "Branch/BNE resta spento, quindi PCSrc non ricevera la decisione del confronto.",
          "Branch/BNE remains off, so PCSrc will not receive the comparison decision."
        )
      ],
      EX: [
        quizText(
          "La ALU somma R1 e R2 invece di sottrarli per il confronto.",
          "The ALU adds R1 and R2 instead of subtracting them for comparison."
        ),
        quizText(
          "Il branch adder riceve l'offset esteso, ma non lo somma ancora con PC+4.",
          "The branch adder receives the extended offset, but does not add it to PC+4 yet."
        ),
        quizText(
          "ALUSrc seleziona l'offset per il confronto, quindi R2 non entra nella sottrazione.",
          "ALUSrc selects the offset for the comparison, so R2 does not enter the subtraction."
        ),
        quizText(
          "La ALU produce Zero=1 anche se R1 e R2 sono diversi.",
          "The ALU produces Zero=1 even though R1 and R2 are different."
        ),
        quizText(
          "L'offset viene shiftato, ma il target resta uguale a PC+4.",
          "The offset is shifted, but the target remains equal to PC+4."
        ),
        quizText(
          "Il controllore ALU mantiene ADD invece del confronto tramite SUB.",
          "The ALU controller keeps ADD instead of the SUB-based comparison."
        )
      ],
      MEM: [
        quizText(
          "PCSrc resta a 0, quindi il mux del PC sceglie PC+4 anche con not Zero attivo.",
          "PCSrc remains 0, so the PC mux chooses PC+4 even with not Zero active."
        ),
        quizText(
          "Il controllo di branch richiede Zero=1, quindi il BNE non viene preso.",
          "Branch control requires Zero=1, so the BNE is not taken."
        ),
        quizText(
          "Il target loop arriva al mux PCSrc, ma il PC viene aggiornato solo in WB.",
          "The loop target reaches the PCSrc mux, but the PC is updated only in WB."
        ),
        quizText(
          "Il branch adder fornisce il target, ma il mux PCSrc mantiene il percorso sequenziale.",
          "The branch adder provides the target, but the PCSrc mux keeps the sequential path."
        ),
        quizText(
          "not Zero vale 1, ma Branch/BNE rimane spento e non puo cambiare il PC.",
          "not Zero is 1, but Branch/BNE remains off and cannot change the PC."
        ),
        quizText(
          "Il PC riceve PC+4 mentre il target loop resta fermo all'addizionatore di branch.",
          "The PC receives PC+4 while the loop target stays at the branch adder."
        )
      ],
      WB: [
        quizText(
          "RegWrite aggiorna R1 con il risultato del confronto.",
          "RegWrite updates R1 with the comparison result."
        ),
        quizText(
          "MemtoReg sceglie il target loop e lo scrive nel banco registri.",
          "MemtoReg chooses the loop target and writes it to the register file."
        ),
        quizText(
          "Il branch usa WB per applicare il nuovo PC.",
          "The branch uses WB to apply the new PC."
        ),
        quizText(
          "WriteData contiene Zero e viene scritto nel campo rt.",
          "WriteData contains Zero and is written into the rt field."
        ),
        quizText(
          "Il banco registri viene aggiornato per ricordare che il branch e stato preso.",
          "The register file is updated to remember that the branch was taken."
        )
      ]
    }
  };

  return pools[demo.id]?.[phase.code] || [];
}

function pickQuizDistractors(pool, fallback, correct) {
  const primaryCandidates = uniqueQuizValues(pool)
    .filter((choice) => choice !== correct);
  const distractors = shuffleQuizValues(primaryCandidates).slice(0, 3);

  if (distractors.length >= 3) {
    return distractors;
  }

  const fallbackCandidates = uniqueQuizValues(fallback)
    .filter((choice) => choice !== correct && !distractors.includes(choice));
  return [
    ...distractors,
    ...shuffleQuizValues(fallbackCandidates).slice(0, 3 - distractors.length)
  ];
}

function quizChoices() {
  const key = quizKey();
  if (appState.quizChoiceCache.has(key)) {
    return appState.quizChoiceCache.get(key);
  }

  const phase = currentDemo.phases[currentPhase];
  const correct = localizeText(phase.description);
  const distractors = pickQuizDistractors(
    cpuQuizPool(currentDemo, phase),
    stageFallbackQuizPool(phase.code),
    correct
  );
  const choices = shuffleQuizValues([correct, ...distractors]);
  appState.quizChoiceCache.set(key, choices);
  return choices;
}

function renderPhaseQuiz() {
  if (!appState.quizMode) {
    phaseQuizEl.classList.add("hidden");
    phaseQuizEl.innerHTML = "";
    return;
  }

  const phase = currentDemo.phases[currentPhase];
  const correct = localizeText(phase.description);
  const choices = quizChoices();
  const selected = appState.quizAnswers.get(quizKey());
  const answered = selected !== undefined;

  phaseQuizEl.classList.remove("hidden");
  phaseQuizEl.innerHTML = `
    <p class="quiz-question">${escapeHtml(t("quizQuestion"))}</p>
    ${choices.map((choice, index) => {
      const isCorrect = choice === correct;
      const isSelected = selected === index;
      const className = answered && isCorrect ? " correct" : answered && isSelected ? " wrong" : "";
      return `<button class="quiz-choice${className}" type="button" data-quiz-choice="${index}"${answered ? " disabled" : ""}>${escapeHtml(choice)}</button>`;
    }).join("")}
    ${answered ? `<p class="quiz-result"><strong>${choices[selected] === correct ? escapeHtml(t("correct")) : escapeHtml(t("wrong"))}</strong> ${escapeHtml(t("correctAnswer"))}: ${escapeHtml(correct)}</p>` : ""}
  `;
}

function chooseQuizAnswer(index) {
  appState.quizAnswers.set(quizKey(), index);
  renderPhase();
}

function setInspection(title, description, rows) {
  inspectTitle.textContent = localizeText(title);
  inspectDescription.textContent = localizeText(description);
  inspectState.innerHTML = "";

  rows
    .filter(([, value]) => value !== "")
    .forEach(([label, value]) => {
      const chip = document.createElement("span");
      const chipLabel = document.createElement("b");
      const chipValue = document.createElement("span");
      chip.className = "inspect-chip";
      chipLabel.textContent = localizeText(label);
      chipValue.textContent = localizeText(value);
      chip.append(chipLabel, chipValue);
      inspectState.appendChild(chip);
    });
}

function renderOverview() {
  const phase = currentDemo.phases[currentPhase];
  setInspection(t("phaseOverview"), appState.quizMode ? t("quizHiddenDescription") : phase.description, [
    [t("instruction"), currentDemo.title],
    [t("phase"), `${phase.code} - ${phase.name}`],
    [t("clock"), `${currentPhase + 1}/${currentDemo.phases.length}`]
  ]);
}

function describeHotspot(key) {
  const phase = currentDemo.phases[currentPhase];
  const info = getElementInfo(key);
  const signals = getSignalEntries(phase, info.signals);
  const values = getRelatedValues(phase, info);

  setInspection(`${info.name} (${info.role})`, info.description, [
    [t("state"), getHotspotStatus(key, phase)],
    [t("phase"), `${phase.code} - ${phase.name}`],
    [t("signals"), formatSignalEntries(signals)],
    [t("values"), formatList(values)]
  ]);
}

function describeWire(id) {
  const phase = currentDemo.phases[currentPhase];
  const name = wireNames[id] || readableKey(id);
  const type = getWireType(id);

  setInspection(name, t("wireDescription"), [
    [t("type"), type],
    [t("state"), getWireStatus(id, phase)],
    [t("phase"), `${phase.code} - ${phase.name}`]
  ]);
}

function updateSelectedStyles() {
  document.querySelectorAll(".hotspot").forEach((node) => {
    node.classList.toggle(
      "is-selected",
      selectedItem?.kind === "hotspot" && selectedItem.id === node.dataset.hotspot
    );
  });

  document.querySelectorAll("[data-element]").forEach((node) => {
    node.classList.toggle(
      "is-selected",
      selectedItem?.kind === "hotspot" && selectedItem.id === node.dataset.element
    );
  });

  document.querySelectorAll(".wire").forEach((node) => {
    node.classList.toggle(
      "is-selected",
      selectedItem?.kind === "wire" && selectedItem.id === node.dataset.wire
    );
  });
}

function renderInspection() {
  if (!selectedItem) {
    renderOverview();
    updateSelectedStyles();
    return;
  }

  if (selectedItem.kind === "hotspot") {
    describeHotspot(selectedItem.id);
  } else if (selectedItem.kind === "wire") {
    describeWire(selectedItem.id);
  }

  updateSelectedStyles();
}

function inspectItem(item) {
  selectedItem = item;
  renderInspection();
}

function setupWires() {
  document.querySelectorAll(".wire").forEach((wire) => {
    wire.setAttribute("role", "button");
    wire.setAttribute("tabindex", "-1");
    wire.setAttribute("aria-label", wireNames[wire.dataset.wire] || readableKey(wire.dataset.wire));

    wire.addEventListener("click", (event) => {
      if (!wire.classList.contains("is-active")) {
        return;
      }

      event.stopPropagation();
      inspectItem({ kind: "wire", id: wire.dataset.wire });
    });

    wire.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && wire.classList.contains("is-active")) {
        event.preventDefault();
        inspectItem({ kind: "wire", id: wire.dataset.wire });
      }
    });
  });
}

function setDemo(id) {
  currentDemo = demos.find((demo) => demo.id === id) || demos[0];
  currentPhase = 0;
  selectedItem = null;
  renderPhase();
}

function setPhase(index) {
  currentPhase = (index + currentDemo.phases.length) % currentDemo.phases.length;
  renderPhase();
}

function renderPhase() {
  const phase = currentDemo.phases[currentPhase];
  const active = new Set([...(phase.active || []), ...(phase.controls || [])]);
  const muted = new Set(phase.muted || []);
  const write = new Set(phase.write || []);

  instructionTitle.textContent = currentDemo.title;
  instructionSelect.value = currentDemo.id;
  encodingValue.textContent = currentDemo.encoding;
  formatValue.textContent = currentDemo.format;
  initialValue.textContent = currentDemo.initial;

  document.querySelectorAll(".hotspot").forEach((node) => {
    const key = node.dataset.hotspot;
    const isActive = active.has(key) || muted.has(key);
    node.classList.toggle("is-active", isActive);
    node.classList.toggle("is-muted", muted.has(key));
    node.classList.toggle("is-control", isActive && hotspots[key]?.kind === "control");
    node.classList.toggle("is-write", isActive && write.has(key));
    node.setAttribute("aria-pressed", selectedItem?.kind === "hotspot" && selectedItem.id === key ? "true" : "false");
  });

  document.querySelectorAll("[data-element]").forEach((node) => {
    const key = node.dataset.element;
    const isActive = active.has(key) || muted.has(key);
    node.classList.toggle("is-active", isActive);
    node.classList.toggle("is-muted", muted.has(key));
    node.classList.toggle("is-control", isActive && hotspots[key]?.kind === "control");
    node.classList.toggle("is-write", isActive && write.has(key));
  });

  document.querySelectorAll(".wire").forEach((wire) => {
    const isActive = (phase.wires || []).includes(wire.dataset.wire);
    wire.classList.toggle("is-active", isActive);
    wire.setAttribute("tabindex", isActive ? "0" : "-1");
    wire.setAttribute("aria-disabled", isActive ? "false" : "true");
  });

  document.querySelectorAll(".phase-tab").forEach((tab, index) => {
    tab.classList.toggle("is-active", index === currentPhase);
  });

  valueLayer.innerHTML = "";

  clockLabel.textContent = t("clockCount", { current: currentPhase + 1, total: currentDemo.phases.length });
  phaseCode.textContent = phase.code;
  phaseName.textContent = phase.name;
  phaseTitle.textContent = localizeText(phase.title);
  phaseDescription.textContent = appState.quizMode ? t("quizHiddenDescription") : localizeText(phase.description);
  phaseDescription.classList.toggle("quiz-alert", appState.quizMode);
  renderPhaseQuiz();

  signalList.innerHTML = "";
  phase.signals.forEach(([name, value]) => {
    const chip = document.createElement("span");
    chip.className = "signal-chip";
    chip.innerHTML = `<b>${name}</b> ${value}`;
    signalList.appendChild(chip);
  });

  traceList.innerHTML = "";
  const traceItems = appState.quizMode ? [t("quizTraceHidden")] : phase.trace;
  traceItems.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = localizeText(text);
    traceList.appendChild(item);
  });

  renderInspection();
}

function advance() {
  setPhase(currentPhase + 1);
}

document.querySelector("#prevBtn").addEventListener("click", () => setPhase(currentPhase - 1));
document.querySelector("#nextBtn").addEventListener("click", advance);
document.querySelector("#resetBtn").addEventListener("click", () => setPhase(0));
instructionSelect.addEventListener("change", (event) => setDemo(event.target.value));
languageSelectEl.addEventListener("change", () => setLanguage(languageSelectEl.value));
document.addEventListener("click", (event) => {
  const tutorialTrigger = event.target.closest("#tutorialButton");
  if (tutorialTrigger) {
    event.preventDefault();
    openInfo("tutorial", tutorialTrigger);
    return;
  }

  const quizTrigger = event.target.closest("#quizModeBtn");
  if (quizTrigger) {
    event.preventDefault();
    appState.quizMode = !appState.quizMode;
    quizModeButtonEl.setAttribute("aria-pressed", appState.quizMode ? "true" : "false");
    renderPhase();
  }
});
phaseQuizEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quiz-choice]");
  if (!button) return;
  chooseQuizAnswer(Number(button.dataset.quizChoice));
});

diagramStage.addEventListener("click", (event) => {
  if (event.target === diagramStage || event.target.tagName === "IMG") {
    selectedItem = null;
    renderInspection();
  }
});

createHotspots();
createInstructionOptions();
applyInitialUrlState();
createPhaseTabs();
setupWires();
bindInfoButtons();
applyTranslations();
renderPhase();
