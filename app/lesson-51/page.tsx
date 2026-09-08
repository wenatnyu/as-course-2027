import "../paper-two-lessons.css";
import { lessonMetadata } from "../_components/lesson-metadata";
import { PaperTwoLesson, type PaperTwoLessonSpec } from "../_components/paper-two-lesson";

export const dynamic = "force-static";
export const metadata = lessonMetadata("51", "Cambridge 9618 linked lists, array implementation and complete Chapter 10 review with Paper 2 practice.");

const spec = {
  lessonNumber: "51", chapter: "10", chapterTitle: "Data Types and Structures", title: "ADTs II: Linked Lists & Chapter Review", tagline: "Follow links rather than physical positions, rewire pointers to insert or delete nodes and describe how data, next pointers and free space are represented in arrays.", syllabus: "10.4", textbook: "TEXTBOOK CH.13 · pp.229–238",
  objectives: ["Explain node, link, head/start, null and free-list pointers.", "Distinguish logical list order from physical array order.", "Trace traversal by following links until null.", "Describe insertion, editing and deletion by rewiring an array implementation."],
  starter: { prompt: "Array slots hold C, A, B physically. Links are A→B→C→null. In what order is the list traversed?", answer: "A, B, C. Linked-list order comes from the start pointer and each next link, not from physical array index order." },
  concepts: [
    { label: "NODE", text: "One data item plus a link/pointer to another node." },
    { label: "START / HEAD", text: "Identifies the first node in the logical list." },
    { label: "NULL", text: "A value outside valid node indices marking no next node/end of list." },
    { label: "FREE LIST", text: "Links unused array positions so they can be allocated efficiently." },
    { label: "TRAVERSE", text: "Start at Head; process data; replace current index with its Next value; stop at null." },
    { label: "REWIRE", text: "Insert/delete by changing links; array elements need not be shifted." },
  ],
  model: { title: "Array-backed list: logical links control order.", code: "Index   Data   Next\n  1      Mina     4\n  2      Chen    -1\n  3      FREE     5\n  4      Ayo      2\n  5      FREE    -1\n\nHeadPointer = 1\nFreePointer = 3\nNullPointer = -1\nTraversal: 1 → 4 → 2 → -1", note: "Valid indices are 1 to 5, so −1 is a safe null sentinel. The free list is 3 → 5 → −1." },
  worked: { title: "Insert Bea between Mina and Ayo.", prompt: "Use free node 3 and state every pointer change.", steps: ["Take node 3 from FreePointer.", "Advance FreePointer to old Next[3], which is 5.", "Store Bea in Data[3] and set Next[3] to 4.", "Change Next[1] from 4 to 3."], answer: "The new logical order is 1(Mina) → 3(Bea) → 4(Ayo) → 2(Chen) → null. No existing data item moves." },
  comparison: { title: "Linked list versus ordinary array sequence.", rows: [
    { term: "logical order", distinction: "links choose the next node", example: "1→4→2 despite index order" },
    { term: "insertion/deletion", distinction: "rewire links rather than shift later data", example: "change predecessor Next" },
    { term: "direct access", distinction: "must traverse from start", example: "cannot assume fifth logical item is index 5" },
  ] },
  practice: { title: "Delete the node at index 4.", prompt: "Head is 1 and current chain is 1→3→4→2→null. Return 4 to the free list.", cues: ["Find predecessor index 3.", "Bypass 4 using its next link.", "Link 4 to old FreePointer and update FreePointer."], answer: "Set Next[3] ← Next[4] (2); set Next[4] ← FreePointer; set FreePointer ← 4. The active chain becomes 1→3→2→null." },
  pitfalls: ["Never traverse by Index ← Index + 1; follow the stored Next pointer.", "Null must be outside the valid index range and its convention must be stated.", "Deleting a node requires bypassing it and normally returning it to the free list; clearing its data alone does not repair links."],
  examMethod: ["Copy Head, Free and Null values beside the diagram before any operation.", "For traversal, show start, loop-to-null, data access and pointer-follow update.", "For insertion/deletion, write the old and new arrows so every active and free node remains reachable."],
  papers: [
    { source: "9618/23 O/N 2024 · Q3(a–c)", marks: "10 MARKS", prompt: "Identify null, initialise links and traverse an array-backed list.", cues: [{ label: "NULL", text: "outside array bounds" }, { label: "START", text: "HeadPointer first" }, { label: "FOLLOW", text: "output data then Next until null" }], answer: "The mark scheme rewards a null value outside valid indices, correct initial link values, starting at HeadPointer, looping until null, outputting Data[current] and following the stored pointer." },
    { source: "9618/22 O/N 2023 · Q3(a–b)", marks: "9 MARKS", prompt: "Read linked/free lists and insert a node by rewiring.", cues: [{ label: "ACTIVE", text: "follow start list" }, { label: "FREE", text: "allocate first free node" }, { label: "INSERT", text: "new node and predecessor links" }], answer: "Take the node identified by FreePointer, advance the free list, store its data, link it to the successor and change the predecessor to point to it. Existing nodes are not shifted." },
  ],
  retrieval: ["How does a linked list use both records and arrays?", "Why is insertion often easier than in a packed array?", "Which Chapter 10 operation still requires following indices one by one?"],
  exit: ["State a valid null value for indices 0:9.", "Trace Head 4 with links 4→1→7→−1.", "Name two links changed during insertion."],
  homework: {
    instructions: "Draw arrows and state Head, Free and Null conventions. Follow stored links; do not assume physical index order.",
    sections: [
      { code: "A", title: "Read a list", subtitle: "Nodes, pointers and order", questions: [
        { prompt: "Define node, start pointer and null pointer.", answer: "A node stores data and link; start identifies the first active node; null is an out-of-range sentinel showing no next node.", marks: 3 },
        { prompt: "Given Head=3 and Next[3]=1, Next[1]=4, Next[4]=-1, state traversal order.", answer: "Indices 3, 1, 4, then stop at −1. Output corresponding data in that order.", marks: 3 },
        { prompt: "Explain four differences between physical array order and logical linked-list order.", answer: "Indices show storage positions; links define sequence; logical neighbours need not be adjacent; traversal starts at Head and follows Next, not index arithmetic.", marks: 4 },
      ] },
      { code: "B", title: "Change a list", subtitle: "Insert, edit and delete", questions: [
        { prompt: "State three steps to edit the Data field of a known node without changing order.", answer: "Locate/select its index, replace only Data[index], preserve its Next link; Head/free pointers remain unchanged.", marks: 3 },
        { prompt: "Explain how to insert a free node between nodes P and Q.", answer: "Allocate free node N and advance FreePointer; set Next[N] ← Q; set Next[P] ← N; store new data.", marks: 3 },
        { prompt: "Explain how to delete Q after P and return Q to the free list.", answer: "Set Next[P] ← Next[Q] to bypass Q; set Next[Q] ← old FreePointer; set FreePointer ← Q; update Head separately if Q was first.", marks: 4 },
      ] },
      { code: "C", title: "Published-paper application", subtitle: "Traversal and Chapter 10 synthesis", questions: [
        { prompt: "Adapted from 9618/23 O/N 2024 Q3: describe complete traversal pseudocode in words.", answer: "Current ← Head; while Current <> Null, output Data[Current] then Current ← Next[Current]; stop at null.", marks: 3 },
        { prompt: "Adapted from 9618/22 O/N 2023 Q3: explain why insertion need not move existing data.", answer: "Logical order is stored in links, so changing predecessor/new-node pointers inserts the node even when physical slots are elsewhere.", marks: 3 },
        { prompt: "Choose record, 2D array, text file or linked list for four stated needs and justify each.", answer: "Record for mixed fields of one entity; 2D array for same-type grid; text file for persistence; linked list for link-defined order with rewiring.", marks: 4 },
      ] },
    ], challenge: { prompt: "Describe the special case when deleting the head node.", answer: "There is no active predecessor. Save the old head, set HeadPointer to the old head's Next value, then link the removed node into the free list and update FreePointer." },
  },
  sourceSummary: "Checked against syllabus 10.4, Coursebook Chapter 13 printed pp.229–238 and published Paper 2 questions/mark schemes.",
  sourceDetail: "Core: linked-list nodes, start/null/free pointers, logical versus physical order, traversal, insertion/edit/delete and array implementation. Authentic anchors: 9618/23 O/N 2024 Q3(a–c) [10] and 9618/22 O/N 2023 Q3(a–b) [9]. Chapter 10 is complete; dynamic-memory and pointer-type syntax are outside AS.",
} satisfies PaperTwoLessonSpec;

export default function Lesson51Page() { return <PaperTwoLesson spec={spec} />; }
