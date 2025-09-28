import React, { useState, useRef, useEffect } from 'react';

// --- SVG Icon Components ---
const AttachmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paperclip">
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal">
        <path d="m3 3 3 9-3 9 19-9Z" />
        <path d="M6 12h16" />
    </svg>
);

const BotIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-bot ${className}`}>
        <rect width="18" height="10" x="3" y="11" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" x2="8" y1="16" y2="16" />
        <line x1="16" x2="16" y1="16" y2="16" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-circle">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
);

const RestartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M3 21v-5h5"/>
    </svg>
);

const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
        <rect width="7" height="9" x="3" y="3" rx="1"/>
        <rect width="7" height="5" x="14" y="3" rx="1"/>
        <rect width="7" height="9" x="14" y="12" rx="1"/>
        <rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
);

const MicrophoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
    </svg>
);

const MenuIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

// --- Sidebar Component ---
const Sidebar = ({ isOpen, setView, handleRestart, onMouseLeave }) => (
    <aside
        onMouseLeave={onMouseLeave}
        className={`fixed top-0 left-0 h-full bg-neutral-900 border-r border-neutral-800 z-30 text-white flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}
    >
        <div className="flex items-center justify-center h-20 border-b border-neutral-800 shrink-0">
             <MenuIcon className="w-8 h-8 text-white"/>
        </div>
        <nav className="flex-1 py-4">
            <ul>
                <li>
                    <button onClick={handleRestart} className="flex items-center w-full py-3 px-6 hover:bg-neutral-800 transition-colors" title="New Interview">
                        <RestartIcon/>
                        <span className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>New Interview</span>
                    </button>
                </li>
                 <li>
                    <button onClick={() => setView('dashboard')} className="flex items-center w-full py-3 px-6 hover:bg-neutral-800 transition-colors" title="Dashboard">
                        <DashboardIcon/>
                        <span className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Dashboard</span>
                    </button>
                </li>
            </ul>
        </nav>
    </aside>
);

// --- Dashboard Component ---
const Dashboard = ({ results, switchToChat }) => (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-black">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-200 mb-6">Interview Dashboard</h2>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg">
                <table className="w-full text-left text-sm text-neutral-300">
                    <thead className="border-b border-neutral-700 text-xs text-neutral-400 uppercase tracking-wider">
                        <tr>
                            <th scope="col" className="px-6 py-4">Candidate Name</th>
                            <th scope="col" className="px-6 py-4">Email</th>
                            <th scope="col" className="px-6 py-4 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length > 0 ? (
                            results.map((result) => (
                                <tr key={result.id} className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-800/50">
                                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">{result.name}</td>
                                    <td className="px-6 py-4">{result.email}</td>
                                    <td className="px-6 py-4 font-bold text-white text-right">{result.percentage}%</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-16 text-neutral-500">No interview results yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
             <button onClick={switchToChat} className="mt-8 flex items-center gap-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-2 rounded-full transition-colors">
                Back to Chatbot
            </button>
        </div>
    </div>
);


// --- Main App Component ---
const App = () => {
    const initialState = {
        chatMessages: [{ sender: 'bot', text: "Hello! I am your AI interviewer. Please upload your resume to begin." }],
        userInput: '',
        isLoading: false,
        error: '',
        interviewState: 'start', // 'start', 'generating_questions', 'in_progress', 'evaluating', 'finished'
        questions: [],
        currentQuestionIndex: 0,
        timer: null,
        userAnswers: [],
        resumeContext: null,
        currentUser: { name: null, email: null },
        view: 'chatbot', // 'chatbot', 'dashboard'
        dashboardResults: [],
    };

    const [chatMessages, setChatMessages] = useState(initialState.chatMessages);
    const [userInput, setUserInput] = useState(initialState.userInput);
    const [isLoading, setIsLoading] = useState(initialState.isLoading);
    const [error, setError] = useState(initialState.error);
    const [interviewState, setInterviewState] = useState(initialState.interviewState);
    const [questions, setQuestions] = useState(initialState.questions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialState.currentQuestionIndex);
    const [timer, setTimer] = useState(initialState.timer);
    const [userAnswers, setUserAnswers] = useState(initialState.userAnswers);
    const [resumeContext, setResumeContext] = useState(initialState.resumeContext);
    const [currentUser, setCurrentUser] = useState(initialState.currentUser);
    const [view, setView] = useState(initialState.view);
    const [dashboardResults, setDashboardResults] = useState(initialState.dashboardResults);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fileInputRef = useRef(null);
    const chatEndRef = useRef(null);
    const timerIntervalRef = useRef(null);

    const API_KEY = "AIzaSyD9JGekT8-f6wFj_k4hNx3QgMm3vxvtvbA"; // Leave this as is, the execution environment provides it.

    useEffect(() => {
        try {
            const savedResults = localStorage.getItem('interviewDashboardResults');
            if (savedResults) {
                setDashboardResults(JSON.parse(savedResults));
            }
        } catch (e) {
            console.error("Failed to load dashboard results:", e);
        }
    }, []);

    useEffect(() => {
        if (view === 'chatbot') {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, view]);

    useEffect(() => {
        if (interviewState === 'in_progress' && currentQuestionIndex < questions.length) {
            const timeLimit = questions[currentQuestionIndex].timeLimit;
            setTimer(timeLimit);
            
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timerIntervalRef.current);
                        handleNextQuestion(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerIntervalRef.current);
    }, [interviewState, currentQuestionIndex, questions]);


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            return;
        }

        setError('');
        setIsLoading(true);
        setInterviewState('generating_questions');
        setChatMessages(prev => [...prev, { sender: 'user', text: `Uploading resume: ${file.name}` }]);

        try {
            const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = (error) => reject(error);
            });
            
            const resumeContentForAPI = { inlineData: { mimeType: "application/pdf", data: base64Data } };
            setResumeContext(resumeContentForAPI);

            const prompt = `You are an AI hiring assistant. Your first task is to analyze the provided resume.
            1. Validate if it contains a name, an email, and a phone number.
            2. If any are missing, respond ONLY with a JSON object like: {"validation": {"success": false, "missing": ["field1", "field2"]}}.
            3. If all information is present, proceed to the next step. Extract the candidate's name and email.
            4. Generate exactly 6 interview questions based on the resume's skills and projects.
            5. The questions must include 2 'easy' (20 seconds), 2 'medium' (60 seconds), and 2 'hard' (120 seconds).
            6. Respond ONLY with a JSON object like: {"validation": {"success": true, "name": "John Doe", "email": "john.doe@example.com"}, "questions": [{"question": "...", "difficulty": "easy", "timeLimit": 20}, ...]}. Do not include any other text, explanation or markdown formatting.`;

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }, resumeContentForAPI] }],
                 generationConfig: { responseMimeType: "application/json" },
            };

            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            
            const result = await response.json();
            const parsedResult = JSON.parse(result.candidates[0].content.parts[0].text);

            if (!parsedResult.validation.success) {
                const missingFields = parsedResult.validation.missing.join(', ');
                const errorMessage = `Resume validation failed. Missing required fields: ${missingFields}. Please upload a revised resume.`;
                setError(errorMessage);
                setChatMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
                setInterviewState('start');
            } else {
                setCurrentUser({ name: parsedResult.validation.name, email: parsedResult.validation.email });
                const welcomeMessage = `Hello ${parsedResult.validation.name}! I've reviewed your resume and generated 6 questions for our interview. We'll start with the first question now. Good luck!`;
                setChatMessages(prev => [...prev, { sender: 'bot', text: welcomeMessage }]);
                setQuestions(parsedResult.questions);
                setInterviewState('in_progress');
            }

        } catch (err) {
            console.error(err);
            const errorMessage = "Sorry, I couldn't process the resume or generate questions. Please try again.";
            setError(errorMessage);
            setChatMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
            setInterviewState('start');
        } finally {
            setIsLoading(false);
            event.target.value = null;
        }
    };
    
    const handleNextQuestion = (isTimeout = false) => {
        const answer = isTimeout ? "No answer provided within the time limit." : userInput;
        setUserAnswers(prev => [...prev, { question: questions[currentQuestionIndex].question, answer }]);
        
        clearInterval(timerIntervalRef.current);
        setUserInput('');
    
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setInterviewState('evaluating');
            evaluatePerformance([...userAnswers, { question: questions[currentQuestionIndex].question, answer }]);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || interviewState !== 'in_progress') return;
        setChatMessages(prev => [...prev, { sender: 'user', text: userInput }]);
        handleNextQuestion();
    };

    const evaluatePerformance = async (finalAnswers) => {
        setIsLoading(true);
        setChatMessages(prev => [...prev, { sender: 'bot', text: "Thank you for your answers. I am now evaluating your performance..." }]);
        
        try {
            const answersText = finalAnswers.map((item, index) => `Question ${index + 1}: ${item.question}\nAnswer: ${item.answer}`).join('\n\n');
            const prompt = `You are an expert technical interviewer. The candidate's resume is provided. Below are the questions asked and the candidate's answers. Provide a brief, constructive performance summary in 2-3 paragraphs. Analyze the answers for technical accuracy, clarity, and problem-solving skills. Conclude with an overall assessment and a final score as a percentage.
            Respond ONLY with a JSON object like: {"evaluation": "...", "percentage": 85}. Do not include any other text, explanation or markdown formatting.
            
            ${answersText}`;
            
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
            const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }, resumeContext] }],
                generationConfig: { responseMimeType: "application/json" },
            };
            
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            
            const result = await response.json();
            const parsedResult = JSON.parse(result.candidates[0].content.parts[0].text);
            const { evaluation, percentage } = parsedResult;

            const finalMessage = `**Interview Complete! Your score is ${percentage}%.**\n\nHere is your feedback:\n\n${evaluation}`;
            setChatMessages(prev => [...prev, { sender: 'bot', text: finalMessage }]);

            const newResult = { id: Date.now(), ...currentUser, percentage };
            const updatedResults = [...dashboardResults, newResult];
            setDashboardResults(updatedResults);
            localStorage.setItem('interviewDashboardResults', JSON.stringify(updatedResults));

        } catch (err) {
            console.error(err);
            const errorMessage = "Sorry, I couldn't generate your performance review. The interview is complete.";
            setChatMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
        } finally {
            setIsLoading(false);
            setInterviewState('finished');
        }
    };

    const handleRestart = () => {
        setChatMessages(initialState.chatMessages);
        setUserInput(initialState.userInput);
        setIsLoading(initialState.isLoading);
        setError(initialState.error);
        setInterviewState(initialState.interviewState);
        setQuestions(initialState.questions);
        setCurrentQuestionIndex(initialState.currentQuestionIndex);
        setTimer(initialState.timer);
        setUserAnswers(initialState.userAnswers);
        setResumeContext(initialState.resumeContext);
        setCurrentUser(initialState.currentUser);
        clearInterval(timerIntervalRef.current);
        setView('chatbot');
    };

    const currentQuestion = questions[currentQuestionIndex];
    const difficultyColors = {
        easy: 'text-green-400 border-green-400',
        medium: 'text-yellow-400 border-yellow-400',
        hard: 'text-red-400 border-red-400',
    };

    return (
        <div className="flex h-screen bg-black text-neutral-200 font-sans">
            <div
                className="fixed top-0 left-0 h-full w-20 z-40"
                onMouseEnter={() => setIsSidebarOpen(true)}
            />
             <Sidebar
                isOpen={isSidebarOpen}
                setView={setView}
                handleRestart={handleRestart}
                onMouseLeave={() => setIsSidebarOpen(false)}
            />

            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {view === 'dashboard' ? (
                    <Dashboard results={dashboardResults} switchToChat={() => setView('chatbot')} />
                ) : (
                    <>
                        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-40">
                            <div className="max-w-3xl mx-auto space-y-8">
                                {chatMessages.map((msg, index) => (
                                    <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                        {msg.sender === 'bot' && (
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
                                                <BotIcon className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                        <div className={`max-w-md md:max-w-lg p-4 rounded-2xl shadow-md text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-neutral-700 text-white rounded-br-none' : 'bg-neutral-800 text-neutral-200 rounded-bl-none'}`}>
                                            <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium">$1</strong>') }}></p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && interviewState !== 'in_progress' && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700"><BotIcon className="w-5 h-5 text-white" /></div>
                                        <div className="max-w-md p-4 rounded-2xl bg-neutral-800 rounded-bl-none">
                                            <div className="flex items-center space-x-2">
                                                <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="h-2 w-2 bg-white rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        </main>

                        <footer className="fixed bottom-0 p-4 bg-black/50 backdrop-blur-sm" style={{ left: isSidebarOpen ? '16rem' : '5rem', right: 0, transition: 'left 300ms ease-in-out' }}>
                            <div className="max-w-3xl mx-auto">
                                {interviewState === 'in_progress' && currentQuestion && (
                                    <div className="mb-3 p-3 bg-neutral-900/70 rounded-lg border border-neutral-700">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm font-semibold text-neutral-300">Question {currentQuestionIndex + 1} of {questions.length}</p>
                                            <span className={`text-xs font-bold uppercase px-2 py-1 border rounded-full ${difficultyColors[currentQuestion.difficulty]}`}>{currentQuestion.difficulty}</span>
                                        </div>
                                        <p className="text-white mb-3">{currentQuestion.question}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-mono text-neutral-400 w-10">{timer}s</p>
                                            <div className="w-full bg-neutral-700 rounded-full h-1.5">
                                                <div className="bg-white h-1.5 rounded-full" style={{ width: `${(timer / currentQuestion.timeLimit) * 100}%`, transition: 'width 0.5s linear' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {error && <p className="text-red-400 text-sm mb-2 text-center">{error}</p>}
                                <form onSubmit={handleSendMessage} className={`flex items-center gap-2 bg-white rounded-full p-2 border border-neutral-700 shadow-2xl shadow-black/50 ${interviewState === 'finished' ? 'hidden' : ''}`}>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="hidden" disabled={interviewState !== 'start'} />
                                    <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 text-neutral-500 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors" disabled={interviewState !== 'start'} aria-label="Upload Resume">
                                        <AttachmentIcon />
                                    </button>
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder={
                                            interviewState === 'start' ? "Upload resume to begin..." :
                                            interviewState === 'in_progress' ? "Type your answer..." :
                                            "Interview has ended."
                                        }
                                        className="flex-1 bg-transparent focus:outline-none px-2 text-sm text-black placeholder:text-neutral-500"
                                        disabled={interviewState !== 'in_progress' || timer === 0}
                                    />
                                     {/* <button type="button" className="p-2 text-neutral-500 hover:text-black" aria-label="Use Microphone">
                                         <MicrophoneIcon />
                                     </button> */}
                                    <button type="submit" className="p-2 w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors" disabled={!userInput.trim() || interviewState !== 'in_progress' || timer === 0} aria-label="Send Message">
                                        <SendIcon />
                                    </button>
                                </form>
                            </div>
                        </footer>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;

