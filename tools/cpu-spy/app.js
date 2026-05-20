const hotspots = {
  pc: { x: 3.0, y: 47.8, w: 3.8, h: 14.2 },
  instructionMemory: { x: 9.3, y: 52.1, w: 10.7, h: 19.7 },
  pcAdder: { x: 14.4, y: 5.8, w: 6.0, h: 17.7 },
  pcSrcMux: { x: 80.5, y: 7.6, w: 3.3, h: 14.3 },
  controlUnit: { x: 31.8, y: 24.7, w: 11.0, h: 24.7, kind: "control", shape: "oval" },
  registers: { x: 40.1, y: 50.3, w: 14.1, h: 26.7 },
  regDstMux: { x: 36.3, y: 62.0, w: 3.2, h: 12.0 },
  signExtend: { x: 45.6, y: 74.2, w: 6.7, h: 11.9, shape: "oval" },
  aluSrcMux: { x: 58.7, y: 60.1, w: 3.1, h: 13.7 },
  aluControl: { x: 60.2, y: 79.2, w: 7.8, h: 13.7, kind: "control", shape: "oval" },
  alu: { x: 64.4, y: 54.6, w: 10.2, h: 17.8 },
  dataMemory: { x: 77.3, y: 58.7, w: 12.4, h: 21.4 },
  memToRegMux: { x: 92.8, y: 61.0, w: 3.2, h: 13.0 },
  branchAdder: { x: 65.9, y: 11.2, w: 10.0, h: 18.0 },
  shiftLeft: { x: 58.7, y: 23.2, w: 5.6, h: 8.9, shape: "oval" },
  branchAnd: { x: 76.7, y: 28.3, w: 4.7, h: 5.8, kind: "control" },
  regDstSignal: { x: 43.2, y: 25.8, w: 7.3, h: 3.0, kind: "control" },
  branchSignal: { x: 43.2, y: 28.8, w: 7.2, h: 3.0, kind: "control" },
  memReadSignal: { x: 43.2, y: 31.8, w: 8.4, h: 3.0, kind: "control" },
  memToRegSignal: { x: 43.2, y: 34.8, w: 9.0, h: 3.0, kind: "control" },
  aluOpSignal: { x: 43.2, y: 37.6, w: 6.8, h: 2.9, kind: "control" },
  memWriteSignal: { x: 43.2, y: 40.4, w: 8.8, h: 3.0, kind: "control" },
  aluSrcSignal: { x: 43.2, y: 43.2, w: 7.6, h: 3.0, kind: "control" },
  regWriteSignal: { x: 43.2, y: 46.0, w: 8.2, h: 3.0, kind: "control" },
  pcSrcSignal: { x: 83.0, y: 23.1, w: 6.0, h: 3.0, kind: "control" },
  zeroSignal: { x: 69.7, y: 57.8, w: 4.6, h: 3.2, kind: "control" }
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
  instructionToFields: "Istruzione -> campi",
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
      active: ["instructionMemory", "controlUnit", "registers", "regDstMux"],
      controls: allControlSignals,
      wires: [
        "instructionToFields",
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
      active: ["regDstMux", "registers", "aluSrcMux", "aluControl", "alu"],
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
        { text: "MemRead = 0", x: 82.7, y: 56.0, kind: "control" },
        { text: "MemWrite = 0", x: 82.7, y: 79.2, kind: "control" },
        { text: "Branch = 0, PCSrc = 0", x: 84.5, y: 27.5, kind: "control" },
        { text: "MemtoReg = 0", x: 93.5, y: 57.1, kind: "control" }
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
      active: ["instructionMemory", "controlUnit", "registers", "regDstMux", "signExtend"],
      controls: allControlSignals,
      wires: [
        "instructionToFields",
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
      active: ["regDstMux", "registers", "signExtend", "aluSrcMux", "aluControl", "alu"],
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
        { text: "MemRead = 0", x: 82.7, y: 56.0, kind: "control" },
        { text: "MemWrite = 0", x: 82.7, y: 79.2, kind: "control" },
        { text: "MemtoReg = 0", x: 93.5, y: 57.1, kind: "control" }
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
      active: ["instructionMemory", "controlUnit", "registers", "regDstMux", "signExtend"],
      controls: allControlSignals,
      wires: [
        "instructionToFields",
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
      active: ["registers", "signExtend", "aluSrcMux", "aluControl", "alu"],
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
        { text: "ALUCtrl = ADD", x: 64.4, y: 78.0, kind: "control" },
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
        { text: "Indirizzo = 0x...1020", x: 78.5, y: 63.0 },
        { text: "MemRead = 1", x: 82.7, y: 56.0, kind: "control" },
        { text: "Dato letto = 0x1122334455667788", x: 91.2, y: 65.0 },
        { text: "MemtoReg = 1", x: 93.5, y: 57.1, kind: "control" }
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
      active: ["instructionMemory", "controlUnit", "registers", "signExtend"],
      controls: allControlSignals,
      wires: [
        "instructionToFields",
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
      active: ["registers", "signExtend", "aluSrcMux", "aluControl", "alu"],
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
        { text: "Dato R1 pronto per MEM", x: 72.2, y: 78.0 }
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
        { text: "Dato scritto = 0xAABBCCDDEEFF0011", x: 82.0, y: 76.5, kind: "write" },
        { text: "MemWrite = 1", x: 82.7, y: 79.2, kind: "control" },
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
      active: ["instructionMemory", "controlUnit", "registers", "signExtend"],
      controls: allControlSignals,
      wires: [
        "instructionToFields",
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
      active: ["registers", "signExtend", "shiftLeft", "branchAdder", "aluSrcMux", "aluControl", "alu"],
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
const encodingValue = document.querySelector("#encodingValue");
const formatValue = document.querySelector("#formatValue");
const initialValue = document.querySelector("#initialValue");
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
}

function openInfo(topicKey, trigger) {
  const topic = infoTopics[topicKey];
  if (!topic) return;
  lastInfoTrigger = trigger;
  infoModalTitle.textContent = topic.title;
  renderInfoBody(topic);
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

function createHotspots() {
  Object.entries(hotspots).forEach(([key, box]) => {
    const node = document.createElement("button");
    node.type = "button";
    node.className = "hotspot";
    node.dataset.hotspot = key;
    node.setAttribute("aria-label", getHotspotName(key));
    node.style.left = `${box.x}%`;
    node.style.top = `${box.y}%`;
    node.style.width = `${box.w}%`;
    node.style.height = `${box.h}%`;
    node.classList.toggle("is-oval", box.shape === "oval");
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      inspectItem({ kind: "hotspot", id: key });
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
    button.innerHTML = `${phase.code}<span>Clock ${index + 1}</span>`;
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
      role: "Segnale di controllo",
      description: `Linea di controllo ${signalName} prodotta dalla control unit.`,
      signals: signalNamesByHotspot[key],
      valueIncludes: signalNamesByHotspot[key]
    };
  }

  return {
    name: readableKey(key),
    role: "Elemento datapath",
    description: "Elemento del datapath MIPS64.",
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
    return "Scrittura attiva";
  }

  if (muted.has(key)) {
    return "Presente ma disattivato in questa fase";
  }

  if (active.has(key)) {
    return hotspots[key]?.kind === "control" ? "Segnale attivo" : "Attivo in questa fase";
  }

  return "Non evidenziato in questa fase";
}

function getWireType(id) {
  const wire = Array.from(document.querySelectorAll(".wire")).find(
    (node) => node.dataset.wire === id
  );

  if (!wire) {
    return "Collegamento";
  }

  if (wire.classList.contains("control")) {
    return "Controllo";
  }

  if (wire.classList.contains("write")) {
    return "Write-back";
  }

  return "Dato";
}

function getWireStatus(id, phase) {
  return (phase.wires || []).includes(id)
    ? "Collegamento attivo in questa fase"
    : "Collegamento non usato in questa fase";
}

function formatSignalEntries(entries) {
  return entries.map(([name, value]) => `${name}=${value}`).join(", ");
}

function formatList(values) {
  return [...new Set(values)].join(" | ");
}

function setInspection(title, description, rows) {
  inspectTitle.textContent = title;
  inspectDescription.textContent = description;
  inspectState.innerHTML = "";

  rows
    .filter(([, value]) => value !== "")
    .forEach(([label, value]) => {
      const chip = document.createElement("span");
      const chipLabel = document.createElement("b");
      const chipValue = document.createElement("span");
      chip.className = "inspect-chip";
      chipLabel.textContent = label;
      chipValue.textContent = value;
      chip.append(chipLabel, chipValue);
      inspectState.appendChild(chip);
    });
}

function renderOverview() {
  const phase = currentDemo.phases[currentPhase];
  setInspection("Panoramica fase", phase.description, [
    ["Istruzione", currentDemo.title],
    ["Fase", `${phase.code} - ${phase.name}`],
    ["Clock", `${currentPhase + 1}/${currentDemo.phases.length}`]
  ]);
}

function describeHotspot(key) {
  const phase = currentDemo.phases[currentPhase];
  const info = getElementInfo(key);
  const signals = getSignalEntries(phase, info.signals);
  const values = getRelatedValues(phase, info);

  setInspection(`${info.name} (${info.role})`, info.description, [
    ["Stato", getHotspotStatus(key, phase)],
    ["Fase", `${phase.code} - ${phase.name}`],
    ["Segnali", formatSignalEntries(signals)],
    ["Valori", formatList(values)]
  ]);
}

function describeWire(id) {
  const phase = currentDemo.phases[currentPhase];
  const name = wireNames[id] || readableKey(id);
  const type = getWireType(id);

  setInspection(name, "Collegamento che trasporta dati o segnali tra due blocchi del datapath.", [
    ["Tipo", type],
    ["Stato", getWireStatus(id, phase)],
    ["Fase", `${phase.code} - ${phase.name}`]
  ]);
}

function describeValue(index) {
  const phase = currentDemo.phases[currentPhase];
  const value = (phase.values || [])[Number(index)];

  if (!value) {
    selectedItem = null;
    renderOverview();
    return;
  }

  const type = value.kind === "control" ? "Segnale" : value.kind === "write" ? "Scrittura" : "Dato";

  setInspection("Valore visualizzato", "Valore calcolato, selezionato o propagato durante la fase corrente.", [
    ["Tipo", type],
    ["Stato", "Visibile in questa fase"],
    ["Fase", `${phase.code} - ${phase.name}`],
    ["Valore", value.text]
  ]);
}

function updateSelectedStyles() {
  document.querySelectorAll(".hotspot").forEach((node) => {
    node.classList.toggle(
      "is-selected",
      selectedItem?.kind === "hotspot" && selectedItem.id === node.dataset.hotspot
    );
  });

  document.querySelectorAll(".wire").forEach((node) => {
    node.classList.toggle(
      "is-selected",
      selectedItem?.kind === "wire" && selectedItem.id === node.dataset.wire
    );
  });

  document.querySelectorAll(".value-label").forEach((node) => {
    node.classList.toggle(
      "is-selected",
      selectedItem?.kind === "value" && selectedItem.id === node.dataset.valueIndex
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
  } else if (selectedItem.kind === "value") {
    describeValue(selectedItem.id);
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
  if (selectedItem?.kind === "value") {
    selectedItem = null;
  }
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
  phase.values.forEach((item, index) => {
    const label = document.createElement("button");
    label.type = "button";
    label.className = `value-label ${item.kind || ""}`.trim();
    label.dataset.valueIndex = String(index);
    label.setAttribute("aria-label", `Valore: ${item.text}`);
    label.textContent = item.text;
    label.style.left = `${item.x}%`;
    label.style.top = `${item.y}%`;
    label.addEventListener("click", (event) => {
      event.stopPropagation();
      inspectItem({ kind: "value", id: String(index) });
    });
    valueLayer.appendChild(label);
  });

  clockLabel.textContent = `Clock ${currentPhase + 1}/${currentDemo.phases.length}`;
  phaseCode.textContent = phase.code;
  phaseName.textContent = phase.name;
  phaseTitle.textContent = phase.title;
  phaseDescription.textContent = phase.description;

  signalList.innerHTML = "";
  phase.signals.forEach(([name, value]) => {
    const chip = document.createElement("span");
    chip.className = "signal-chip";
    chip.innerHTML = `<b>${name}</b> ${value}`;
    signalList.appendChild(chip);
  });

  traceList.innerHTML = "";
  phase.trace.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
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

diagramStage.addEventListener("click", (event) => {
  if (event.target === diagramStage || event.target.tagName === "IMG") {
    selectedItem = null;
    renderInspection();
  }
});

createHotspots();
createInstructionOptions();
createPhaseTabs();
setupWires();
bindInfoButtons();
renderPhase();
