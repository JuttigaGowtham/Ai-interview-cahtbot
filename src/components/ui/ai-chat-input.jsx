// "use client";
// import * as React from "react";
// import { useState, useEffect, useRef } from "react";
// import { Lightbulb, Mic, Globe, Paperclip, Send } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";

// const PLACEHOLDERS = [
//   "Generate website with HextaUI",
//   "Create a new project with Next.js",
//   "What is the meaning of life?",
//   "What is the best way to learn React?",
//   "How to cook a delicious meal?",
//   "Summarize this article",
// ];


// const AIChatInput = () => {
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const [showPlaceholder, setShowPlaceholder] = useState(true);
//   const [isActive, setIsActive] = useState(false);
//   const [thinkActive, setThinkActive] = useState(false);
//   const [deepSearchActive, setDeepSearchActive] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [resumeName, setResumeName] = useState("");
//   // On mount, check localStorage for resume and generate questions if found
//   React.useEffect(() => {
//     const storedResume = localStorage.getItem("resumeContent");
//     const storedResumeName = localStorage.getItem("resumeName");
//     if (storedResume && storedResumeName) {
//       setResumeName(storedResumeName);
//       generateQuestions(storedResume, storedResumeName);
//     }
//   }, []);

//   function generateQuestions(text, fileName) {
//     // Extract keywords (demo: split by space, filter >3 chars)
//     const words = text.split(/\W+/).filter(w => w.length > 3);
//     const keywords = Array.from(new Set(words)).slice(0, 8);
//     // Generate questions
//     function makeQ(level, kw, sec) {
//       return `(${level}, ${sec}s) What is your experience with ${kw}?`;
//     }
//     let qs = [];
//     for (let i = 0; i < 2; i++) {
//       qs.push(makeQ("Easy", keywords[i] || "your field", 20));
//     }
//     for (let i = 2; i < 4; i++) {
//       qs.push(makeQ("Medium", keywords[i] || "your field", 60));
//     }
//     for (let i = 4; i < 6; i++) {
//       qs.push(makeQ("Hard", keywords[i] || "your field", 120));
//     }
//     setQuestions(qs);
//   }
//   const wrapperRef = useRef(null);

//   // Cycle placeholder text when input is inactive
//   useEffect(() => {
//     if (isActive || inputValue) return;

//     const interval = setInterval(() => {
//       setShowPlaceholder(false);
//       setTimeout(() => {
//         setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
//         setShowPlaceholder(true);
//       }, 400);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isActive, inputValue]);

//   // Close input when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         if (!inputValue) setIsActive(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [inputValue]);

//   const handleActivate = () => setIsActive(true);

//   const containerVariants = {
//     collapsed: {
//       height: 68,
//       boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
//       transition: { type: "spring", stiffness: 120, damping: 18 },
//     },
//     expanded: {
//       height: 128,
//       boxShadow: "0 8px 32px 0 rgba(0,0,0,0.16)",
//       transition: { type: "spring", stiffness: 120, damping: 18 },
//     },
//   };

//   const placeholderContainerVariants = {
//     initial: {},
//     animate: { transition: { staggerChildren: 0.025 } },
//     exit: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
//   };

//   const letterVariants = {
//     initial: {
//       opacity: 0,
//       filter: "blur(12px)",
//       y: 10,
//     },
//     animate: {
//       opacity: 1,
//       filter: "blur(0px)",
//       y: 0,
//       transition: {
//         opacity: { duration: 0.25 },
//         filter: { duration: 0.4 },
//         y: { type: "spring", stiffness: 80, damping: 20 },
//       },
//     },
//     exit: {
//       opacity: 0,
//       filter: "blur(12px)",
//       y: -10,
//       transition: {
//         opacity: { duration: 0.2 },
//         filter: { duration: 0.3 },
//         y: { type: "spring", stiffness: 80, damping: 20 },
//       },
//     },
//   };

//   return (
//     <div className="w-full min-h-screen flex justify-center items-center text-black">
//       <motion.div
//         ref={wrapperRef}
//         className="w-full max-w-3xl"
//         variants={containerVariants}
//         animate={isActive || inputValue ? "expanded" : "collapsed"}
//         initial="collapsed"
//         style={{ overflow: "hidden", borderRadius: 32, background: "#fff" }}
//         onClick={handleActivate}
//       >
//         <div className="flex flex-col items-stretch w-full h-full">
//           {/* Input Row */}
//           <div className="flex items-center gap-2 p-3 rounded-full bg-white max-w-3xl w-full">
//             <label className="p-3 rounded-full hover:bg-gray-100 transition cursor-pointer" title="Attach file">
//               <Paperclip size={20} />
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                 style={{ display: "none" }}
//                 onChange={async e => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     setResumeName(file.name);
//                     // Read file as text (works for .txt/.docx, not for .pdf)
//                     const ext = file.name.split('.').pop().toLowerCase();
//                     let text = "";
//                     if (ext === "txt") {
//                       text = await file.text();
//                     } else if (ext === "docx" || ext === "doc") {
//                       // For demo: just use file name as content, real docx parsing needs a library
//                       text = file.name;
//                     } else if (ext === "pdf") {
//                       text = file.name; // For demo, real PDF parsing needs a library
//                     }
//                     // Store in localStorage
//                     localStorage.setItem("resumeContent", text);
//                     localStorage.setItem("resumeName", file.name);
//                     generateQuestions(text, file.name);
//                   }
//                 }}
//               />
//             </label>

//             {/* Text Input & Placeholder */}
//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="flex-1 border-0 outline-0 rounded-md py-2 text-base bg-transparent w-full font-normal"
//                 style={{ position: "relative", zIndex: 1 }}
//                 onFocus={handleActivate}
//               />
//               <div className="absolute left-0 top-0 w-full h-full pointer-events-none flex items-center px-3 py-2">
//                 <AnimatePresence mode="wait">
//                   {showPlaceholder && !isActive && !inputValue && (
//                     <motion.span
//                       key={placeholderIndex}
//                       className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none"
//                       style={{
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         zIndex: 0,
//                       }}
//                       variants={placeholderContainerVariants}
//                       initial="initial"
//                       animate="animate"
//                       exit="exit"
//                     >
//                       {PLACEHOLDERS[placeholderIndex]
//                         .split("")
//                         .map((char, i) => (
//                           <motion.span
//                             key={i}
//                             variants={letterVariants}
//                             style={{ display: "inline-block" }}
//                           >
//                             {char === " " ? "\u00A0" : char}
//                           </motion.span>
//                         ))}
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>

//             <button
//               className="p-3 rounded-full hover:bg-gray-100 transition"
//               title="Voice input"
//               type="button"
//               tabIndex={-1}
//             >
//               <Mic size={20} />
//             </button>
//             <button
//               className="flex items-center gap-1 bg-black hover:bg-zinc-700 text-white p-3 rounded-full font-medium justify-center"
//               title="Send"
//               type="button"
//               tabIndex={-1}
//             >
//               <Send size={18} />
//             </button>
//           </div>

//           {/* Expanded Controls */}
//           <motion.div
//             className="w-full flex justify-start px-4 items-center text-sm"
//             variants={{
//               hidden: {
//                 opacity: 0,
//                 y: 20,
//                 pointerEvents: "none",
//                 transition: { duration: 0.25 },
//               },
//               visible: {
//                 opacity: 1,
//                 y: 0,
//                 pointerEvents: "auto",
//                 transition: { duration: 0.35, delay: 0.08 },
//               },
//             }}
//             initial="hidden"
//             animate={isActive || inputValue ? "visible" : "hidden"}
//             style={{ marginTop: 8 }}
//           >
//             <div className="flex gap-3 items-center">
//               {/* Think Toggle */}
//               <button
//                 className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all font-medium group ${
//                   thinkActive
//                     ? "bg-blue-600/10 outline outline-blue-600/60 text-blue-950"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//                 title="Think"
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setThinkActive((a) => !a);
//                 }}
//               >
//                 <Lightbulb
//                   className="group-hover:fill-yellow-300 transition-all"
//                   size={18}
//                 />
//                 Think
//               </button>

//               {/* Deep Search Toggle */}
//               <motion.button
//                 className={`flex items-center px-4 gap-1 py-2 rounded-full transition font-medium whitespace-nowrap overflow-hidden justify-start ${
//                   deepSearchActive
//                     ? "bg-blue-600/10 outline outline-blue-600/60 text-blue-950"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//                 title="Deep Search"
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setDeepSearchActive((a) => !a);
//                 }}
//                 initial={false}
//                 animate={{
//                   width: deepSearchActive ? 125 : 36,
//                   paddingLeft: deepSearchActive ? 8 : 9,
//                 }}
//               >
//                 <div className="flex-1">
//                   <Globe size={18} />
//                 </div>
//                 <motion.span
//                   className="pb-[2px]"
//                   initial={false}
//                   animate={{
//                     opacity: deepSearchActive ? 1 : 0,
//                   }}
//                 >
//                   Deep Search
//                 </motion.span>
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//         {/* Show questions if available */}
//         {resumeName && questions.length > 0 && (
//           <div style={{marginTop: 32, background: "#f9f9f9", borderRadius: 16, padding: 24}}>
//             <h3 style={{fontWeight: "bold", fontSize: "1.2rem", marginBottom: 12}}>Questions based on {resumeName}:</h3>
//             <ol style={{paddingLeft: 24}}>
//               {questions.map((q, i) => (
//                 <li key={i} style={{marginBottom: 8}}>{q}</li>
//               ))}
//             </ol>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export { AIChatInput };