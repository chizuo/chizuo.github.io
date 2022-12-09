let db_skills = ["HTML","CSS","JavaScript","TypeScript","PHP","Java","C#","Lisp","Ada","Haskell","UML","Ruby","C++","C","Fortran"];

let db_availibilityCalendar = [
  {
    uid: "availibility-1",
    dataUnavailable: [Date(2020, 1, 1), Date(2020, 1, 2), Date(2020, 1, 3)],
    type: "holiday",
  },
  {
    uid: "availibility-2",
    dataUnavailable: [Date(2020, 2, 1), Date(2020, 2, 2), Date(2020, 2, 3)],
    type: "thanks giving week",
  },
  {
    uid: "availibility-3",
    dataUnavailable: [Date(2020, 3, 1), Date(2020, 3, 2), Date(2020, 3, 3)],
    type: "christmas week",
  },
];

const db_resources = [
  {
    uid: "RES-736789",
    name: "Jonathan Chua",
    title: "Project Manager",
    availabilityCalender: "./scripts/calendar/jonathan.png",
    skills: [
      {skillName: 'Java', skillLevel: 10}, 
      {skillName: 'JavaScript', skillLevel: 8}, 
      {skillName: 'ERD', skillLevel: 8},
      {skillName: 'UML', skillLevel: 9}
    ], // arrray of skills id
    payRate: 100,
  },
  {
    uid: "RES-736733",
    name: "Parth Savaj",
    title: "Software Engineer",
    availabilityCalender: "./scripts/calendar/parth.png",
    skills: [
      {skillName: 'Java', skillLevel: 8}, 
      {skillName: 'JavaScript', skillLevel: 8}, 
      {skillName: 'ERD', skillLevel: 7},
      {skillName: 'UML', skillLevel: 9},
      {skillName: 'SRD', skillLevel: 6}
    ], // arrray of skills id
    payRate: 65,
  },
  {
    uid: "RES-732289",
    name: "Alondra Gonzalez",
    title: "Software Designer",
    availabilityCalender: "./scripts/calendar/alonda.png",
    skills: [
      {skillName: 'Java', skillLevel: 9}, 
      {skillName: 'ERD', skillLevel: 8},
      {skillName: 'SRD', skillLevel: 9}
    ], // arrray of skills id
    payRate: 89,
  },
  {
    uid: "RES-736778",
    name: "Jeel Patel",
    title: "Software Tester",
    availabilityCalender: "./scripts/calendar/jeel.png",
    skills: [
      {skillName: 'Java', skillLevel: 9}, 
      {skillName: 'ERD', skillLevel: 8},
      {skillName: 'UML', skillLevel: 9}
    ], // arrray of skills id
    payRate: 76,
  },
  {
    uid: "RES-709789",
    name: "Sari Ajina",
    title: "Software Developer",
    availabilityCalender: "./scripts/calendar/sari.png",
    skills: [
      {skillName: 'Java', skillLevel: 10}, 
      {skillName: 'UML', skillLevel: 6}, 
      {skillName: 'ERD', skillLevel: 4}
    ], // arrray of skills id
    payRate: 68,
  },
  {
    uid: "RES-736589",
    name: "Mrunal Prakash Gavali",
    title: "Software Designer",
    availabilityCalender: "./scripts/calendar/mrunal.png",
    skills: [
      {skillName: 'Python', skillLevel: 10}, 
      {skillName: 'Java', skillLevel: 8}, 
      {skillName: 'ERD', skillLevel: 8},
      {skillName: 'SRD', skillLevel: 9}
    ], // arrray of skills id
    payRate: 125,
  },
];

let db_deliverables = [
  {
    uid: "D-736789",
    name: "Deliverable 1",
    description: "This is the first deliverable",
    dueDate: new Date(2022, 7, 30),
    listOfRequirement: [], // array of requirement id
    listOfTasks: [], // array of task id
  },
  {
    uid: "D-736733",
    name: "Deliverable 2",
    description: "This is the second deliverable",
    dueDate: new Date(2022, 7, 30),
    listOfRequirement: [], // array of requirement id
    listOfTasks: [], // array of task id
  },
  {
    uid: "D-732289",
    name: "Deliverable 3",
    description: "This is the third deliverable",
    dueDate: new Date(2022, 7, 30),
    listOfRequirement: [], // array of requirement id
    listOfTasks: [], // array of task id
  },
];

let db_requirements = [
  {
    uid: "REQ-736789",
    name: "Requirement 1",
    text: "This is the first requirement",
    sourceDocument: "Source Document 1",
    sourcePage: "Page 1",
    sourceParagraph: "Paragraph 1",
    clientReference: "Client Document 1",
    clientPage: "Page 1",
    clientParagraph: "Paragraph 1",
    DeliverableId: 0
  },
  {
    uid: "REQ-736733",
    name: "Requirement 2",
    text: "This is the second requirement",
    sourceDocument: "Source Document 2",
    sourcePage: "Page 2",
    sourceParagraph: "Paragraph 2",
    clientReference: "Client Document 2",
    clientPage: "Page 2",
    clientParagraph: "Paragraph 2",
    DeliverableId: 1
  },
  {
    uid: "REQ-732289",
    name: "Requirement 3",
    text: "This is the third requirement",
    sourceDocument: "Source Document 3",
    sourcePage: "Page 3",
    sourceParagraph: "Paragraph 3",
    clientReference: "Client Document 3",
    clientPage: "Page 3",
    clientParagraph: "Paragraph 3",
    DeliverableId: 2
  },
];

const db_tasks = [
  {
    uid: "T-736789",
    name: "Task 1",
    milestone: 0,
    description: "This is the first task",
    resource: "RES-736789",
    resourceID: 0,
    expectedStartDate: new Date(2022, 7, 30),
    expectedEndDate: new Date(2022, 8, 30),
    expectedDuration: 31,
    expectedEffort: 6,
    actualStartDate: new Date(2022, 7, 31),
    actualEndDate: new Date(2022, 9, 15),
    actualDuration: 31,
    effortCompleted: 20,
    actualEffort: 12,
    percentComplete: 100,
    issue: ["I-736733"],
    type: "regular",
    group: 2,
    subtask: ["T-336733"],
    predecessor: ["T-936713"],
    successor: ["T-115721"]
  },
  {
    uid: "T-736733",
    name: "Task 2",
    milestone: 0,
    description: "This is the second task",
    resource: "RES-736778",
    resourceID: 3,
    expectedStartDate: new Date(2022, 9, 10),
    expectedEndDate: new Date(2022, 11, 11),
    expectedDuration: 10,
    expectedEffort: 12,
    actualStartDate: new Date(2022, 9, 30),
    actualEndDate: new Date(2022, 11, 15),
    actualDuration: 10,
    effortCompleted: 25,
    actualEffort: 13,
    percentComplete: 75,
    issue: ["I-732289"],
    type:"regular",
    group: 1,
    subtask: ["T-136789"],
    predecessor: ["T-736733"],
    successor: ["T-396280"]
  },
  {
    uid: "T-732289",
    name: "Task 3",
    milestone: 0,
    description: "This is the third task",
    resource: "RES-709789", 
    resourceID: 4,
    expectedStartDate: new Date(2022, 8, 15),
    expectedEndDate: new Date(2022, 11, 15),
    expectedDuration: 10,
    expectedEffort: 22,
    actualStartDate: new Date(2022, 8, 15),
    actualEndDate: new Date(2022, 11, 1),
    actualDuration: 10,
    effortCompleted: 33,
    actualEffort: 22,
    percentComplete: 88,
    issue: ["I-736789"],
    type: "regular",
    group: 1,
    subtask: ["T-236713"],
    predecessor: ["T-736789"],
    successor: ["T-923451","T-442945"]
  },
];

const db_tasks_sort = ["", "name", "expected start", "expected end", "actual start", "actual end"];
const db_tasks_filter = ["", "expected start", "expected end", "actual start", "actual end"];
const db_predecessor = [{uid:"T-736789",name:"Task-736789"}, {uid:"T-736733",name:"Task-736733"}, {uid:"T-936713",name:"Task-936713"}];
const db_successor = [{uid:"T-923451",name:"Task-923451"},{uid:"T-442945",name:"Task-442945"}, {uid:"T-396280",name:"Task-442945"}, {uid:"T-115721",name:"Task-115721"}];
const db_subtask = [{uid:"T-136789",name:"Task-136789"}, {uid:"T-336733",name:"Task-336733"}, {uid:"T-236713",name:"Task-236713"}];

/******** Risks ********/
const db_risks = [
  {
    uid: "R-736789",
    name: "Risk 1",
    category: 1,
    probability: 25,
    impact: 3,
    mitigation: "Mitigation plan 1",
    contingency: "Contingency plan 1",
    riskScore: 3,
    actionBy: new Date(2022, 7, 30),
    actionItems: [1,2]
  },
  {
    uid: "R-736733",
    name: "Risk 2",
    category: 3,
    probability: 10,
    impact: 2,
    mitigation: "Mitigation plan 2",
    contingency: "Contingency plan 2",
    riskScore: 1,
    actionBy: new Date(2022, 8, 22),
    actionItems: [3]
  },
  {
    uid: "R-732289",
    name: "Risk 3",
    category: "Category 3",
    probability: 45,
    impact: 1,
    mitigation: "Mitigation plan 3",
    contingency: "Contingency plan 3",
    riskScore: 10,
    actionBy: new Date(2022, 10, 30),
    actionItems: [0]
  },
];

const db_risks_impact = ["","High","Medium","Low"];
const db_risks_category = ["","Schedule","Budget","Scope"];
const db_risks_sort = ["","name","Action By"];
const db_risks_filter = ["","Action By"];
const db_risks_resource = ["", "R-136789, Sari Ajina","R-144577, Jonathan Chua","R-734257, Mrunal Prakash Gavali","R-835510, Alondra Gonzalez","R-482946, Jeel Prakashkumar Patel","R-270087, Parth Savaj"];

let db_impacts = [
  {
    uid: "I-736789",
    value: 10,
  },
  {
    uid: "I-736733",
    value: 10,
  },
  {
    uid: "I-732289",
    value: 10,
  },
];

const db_actionItems = [
  {
    uid: "AI-736789",
    name: "Replace Antenna Module#455",
    description:
      "The antenna cannot achieve the minimum gains we need to fulfill one of the requirements",
    dateCreated: new Date(2022, 6, 15),
    dateAssigned: new Date(2022, 6, 28),
    resource: 1,
    expectedComp: new Date(2023, 1, 15),
    actualComp: null,
    status: 3,
    statusDescription:
      "Currently 75% complete with the prototype using the new module.",
    updateDate: new Date(2022, 7, 30),
  },
  {
    uid: "AI-774577",
    name: "Optimize Tracking Software",
    description:
      "The polling frequency needs to increase now that the system can reach more towers.",
    dateCreated: new Date(2022, 8, 15),
    dateAssigned: new Date(2022, 8, 16),
    resource: 0,
    expectedComp: new Date(2023, 1, 20),
    actualComp: null,
    status: 3,
    statusDescription:
      "The drivers are causing the software to freeze at increase polling rates.",
    updateDate: new Date(2022, 8, 12),
  },
  {
    uid: "AI-444573",
    name: "Replace existing memory",
    description:
      "The memory modules speeds are inadequate to meet minimum load speeds",
    dateCreated: new Date(2022, 8, 25),
    dateAssigned: new Date(2022, 8, 26),
    resource: 2,
    expectedComp: new Date(2023, 1, 5),
    actualComp: null,
    status: 1,
    statusDescription:
      "We were able to secure enough for the prototype but not for the entire deliverable",
    updateDate: new Date(2022, 9, 12),
  },
  {
    uid: "AI-124593",
    name: "Replace logic board",
    description:
      "the current logic board cannot support faster memory modules.",
    dateCreated: new Date(2022, 8, 25),
    dateAssigned: new Date(2022, 8, 26),
    resource: 3,
    expectedComp: new Date(2023, 1, 4),
    actualComp: null,
    status: 4,
    statusDescription:
      "We were able to secure enough for the prototype but not for the entire deliverable",
    updateDate: new Date(2022, 9, 12),
  },
];

const db_status = [
  {
    uid: 1,
    name: "In Progress",
  },
  {
    uid: 2,
    name: "Completed",
  },
  {
    uid: 3,
    name: "Delayed",
  },
];

/********** Decisions **********/
const db_decisions = [
  {
    uid: "D-736789",
    name: "Decision 1",
    description: "This is the first decision",
    priority: 2,
    impact: 3,
    dateCreated: new Date(2022, 6, 30),
    dateNeeded: new Date(2022, 10, 22),
    dateMade: new Date(2022, 8, 4),
    resource: 1,
    expectedCompletionDate: new Date(2022, 10, 22),
    actualCompletionDate: new Date(2022, 10, 22),
    status: 2,
    note: "Note-192837465",
    noteDate: new Date(2022, 9, 22),
    statusDescription: "This is the status description as of the last update",
    updateDate: new Date(2022, 9, 14),
  },
  {
    uid: "D-736733",
    name: "Decision 2",
    description: "This is the second decision",
    priority: 3,
    impact: 1,
    dateCreated: new Date(2022, 6, 22),
    dateNeeded: new Date(2022, 11, 2),
    dateMade: new Date(2022, 7, 30),
    resource: 2,
    expectedCompletionDate: new Date(2022, 11, 1),
    actualCompletionDate: null,
    status: 3,
    note: "Note-987654321",
    noteDate: new Date(2022, 8, 22),
    statusDescription: "This is the status description as of the last update",
    updateDate: new Date(2022, 10, 30),
  },
  {
    uid: "D-732289",
    name: "Decision 3",
    description: "This is the third decision",
    priority: 1,
    impact: 2,
    dateCreated: new Date(2022, 7, 30),
    dateNeeded: new Date(2022, 11, 2),
    dateMade: new Date(2022, 9, 3),
    resource: 3,
    expectedCompletionDate: new Date(2022, 11, 15),
    actualCompletionDate: null,
    status: 4,
    note: "Note-123456789",
    noteDate: new Date(2022, 8, 1),
    statusDescription: "Client is making a requirement change affecting this decision",
    updateDate: new Date(2022, 11, 2),
  },
];

const db_decisions_sort = ["","name","created on","needed on","decision made on", "expected on", "completed on", "last updated"];
const db_decisions_filter = ["", "created on","needed on","decision made on", "expected on", "completed on", "last updated"]
const db_priority = [
  {
    uid: "P-736789",
    value: 10,
  },
  {
    uid: "P-736733",
    value: 10,
  },
  {
    uid: "P-732289",
    value: 10,
  },
];

const db_impact = [
  {
    uid: "I-736789",
    value: 10,
  },
  {
    uid: "I-736733",
    value: 10,
  },
  {
    uid: "I-732289",
    value: 10,
  },
];

const db_referenceDocument = [
  {
    uid: "RD-736789",
    decisionId: ["D-736789", "D-736733", "D-736733"],
  },
  {
    uid: "RD-736733",
    decisionId: ["D-736789", "D-736733", "D-736733"],
  },
  {
    uid: "RD-732289",
    decisionId: ["D-736789", "D-736733", "D-736733"],
  },
];

const db_meetingNotes = [
  {
    uid: "MN-736789",
    decisionId: ["D-736789", "D-736733", "D-736733"],
  },
  {
    uid: "MN-736733",
    decisionId: ["D-736789", "D-736733", "D-736733"],
  },

  {
    uid: "MN-732289",
    decisionId: ["D-736789", "D-736733", "D-736733"],
  },
];

const db_severity = [
  {
    uid: "S-736789",
    value: 10,
  },
  {
    uid: "S-736733",
    value: 10,
  },
  {
    uid: "S-732289",
    value: 10,
  },
];

/********** Issues **********/
const db_issues = [
  {
    uid: "I-736789",
    name: "Issue 1",
    description: "This is the first issue",
    priority: 2,
    severity: 1,
    dateRaised: new Date(2022, 6, 28),
    dateAssigned: new Date(2022, 8, 15),
    expectedCompletionDate: new Date(2023, 1, 22),
    actualCompletionDate: null,
    status: 3,
    statusDescription: "This is the status description for the first issue",
    updateDate: new Date(2022, 8, 22),
    actionItem: 1,
    decision: 2
  },
  {
    uid: "I-736733",
    name: "Issue 2",
    description: "This is the second issue",
    priority: 1,
    severity: 4,
    dateRaised: new Date(2022, 6, 20),
    dateAssigned: new Date(2022, 8, 10),
    expectedCompletionDate: new Date(2022, 11, 15),
    actualCompletionDate: new Date(2022, 11, 26),
    status: 2,
    statusDescription: "This is the status description for the second issue",
    updateDate: new Date(2022, 8, 30),
    actionItem: 2,
    decision: 1
  },
  {
    uid: "I-732289",
    name: "Issue 3",
    description: "This is the third issue",
    priority: 3,
    severity: 5,
    dateRaised: new Date(2022, 6, 26),
    dateAssigned: new Date(2022, 7, 30),
    expectedCompletionDate: new Date(2022, 11, 29),
    actualCompletionDate: null,
    status: 1,
    statusDescription: "This is the status description for the third issue",
    updateDate: new Date(2022, 9, 2),
    actionItem: 3,
    decision: 2
  },
];
const db_issues_status = ["","Open","Closed","In Progress","Hold","Complete"];
const db_issues_severity = ["","Critical","High","Medium","Low","Minor"];
const db_issues_priority = ["","High","Medium","Low"];
const db_issues_sort= ["","name","date raised","date assigned","expected completion date","actual completion date","update date"];
const db_issues_filter = ["", "date raised", "date assigned", "update date", "actual completion date", "expected completion date", "past due", "specified days until expected completion"];
