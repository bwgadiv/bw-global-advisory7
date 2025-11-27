
import React, { useState, useEffect, useRef } from "react";
import { GlobeIcon, ShieldCheckIcon, LetterIcon, RocketIcon, CpuIcon, ActivityIcon, CheckCircle, FileText, Target, Zap } from './Icons';

// --- DEMO SCENARIOS ---
const SCENARIOS = [
    {
        id: 1,
        title: "Market Entry: Renewable Energy",
        context: {
            region: "Southeast Asia",
            industry: "Solar & Wind Infrastructure",
            capital: "$150M USD"
        },
        report: {
            docTitle: "Strategic Viability Assessment: SEA Energy Grid",
            summary: "Current grid instability in Vietnam and Philippines presents a high-value arbitrage opportunity for independent power producers (IPP).",
            rationale: "High solar irradiance combined with new Feed-in-Tariff (FiT) policies creates optimal entry window (12-18 months)."
        },
        logs: [
            "Initializing Nexus Core v4.0...",
            "Ingesting context: SEA Energy Grid...",
            "Drafting Executive Summary...",
            "Scanning regulatory frameworks in Vietnam, Thailand...",
            "Identifying high-asymmetry partners...",
            "Calculating IVAS scores...",
            "Finalizing Dossier..."
        ],
        matches: [
            {
                name: "Mekong Clean Power Infrastructure",
                location: "Vietnam",
                score: 94,
                ivas: "94%",
                risk: "Low",
                readiness: "Priority",
                opportunity: "$120M",
            },
            {
                name: "Philippine Agro-Solar Cooperative",
                location: "Philippines",
                score: 86,
                ivas: "82%",
                risk: "Med",
                readiness: "High",
                opportunity: "$45M",
            }
        ]
    },
    {
        id: 2,
        title: "Supply Chain Resilience: Electronics",
        context: {
            region: "Eastern Europe",
            industry: "Advanced Manufacturing",
            capital: "$75M USD"
        },
        report: {
            docTitle: "Supply Chain De-Risking: Euro-Zone Manufacturing",
            summary: "Rising labor costs in East Asia necessitate a near-shoring strategy. Poland and Romania offer 40% lower opex with EU market access.",
            rationale: "Tier-2 supplier networks in Gdansk show 91% compatibility with current assembly requirements."
        },
        logs: [
            "Switching Context: Euro-Zone Logistics...",
            "Synthesizing labor arbitrage data...",
            "Mapping Tier-2 supplier networks...",
            "Detecting latent industrial assets...",
            "Drafting Strategic Rationale...",
            "Optimizing for Activation Velocity..."
        ],
        matches: [
            {
                name: "Gdansk Maritime Services",
                location: "Poland",
                score: 91,
                ivas: "91%",
                risk: "Low",
                readiness: "Priority",
                opportunity: "$85M",
            },
            {
                name: "Bucharest Tech Assembly Park",
                location: "Romania",
                score: 84,
                ivas: "78%",
                risk: "Low",
                readiness: "High",
                opportunity: "$60M",
            }
        ]
    },
    {
        id: 3,
        title: "AgriTech: Food Security",
        context: {
            region: "Latin America",
            industry: "Precision Agriculture",
            capital: "$50M USD"
        },
        report: {
            docTitle: "Food Security Initiative: LATAM Yield Optimization",
            summary: "Critical yield gaps in Brazil's soy corridor can be closed via precision drone technology. Local cooperatives are seeking tech partners.",
            rationale: "Political will for food security is at an all-time high, reducing regulatory friction by estimated 60%."
        },
        logs: [
            "Context Shift: LATAM Food Systems...",
            "Analyzing soil data & yield gaps...",
            "Compiling regional risk assessment...",
            "Running political stability forecast...",
            "Finalizing symbiotic pairs...",
            "Generating Output Artifact..."
        ],
        matches: [
            {
                name: "São Paulo AgriTech Solutions",
                location: "Brazil",
                score: 89,
                ivas: "88%",
                risk: "Med",
                readiness: "Priority",
                opportunity: "$200M",
            },
            {
                name: "Andean Sustainable Farming",
                location: "Chile",
                score: 85,
                ivas: "81%",
                risk: "Low",
                readiness: "High",
                opportunity: "$35M",
            }
        ]
    }
];

export default function MatchmakingDemo() {
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [phase, setPhase] = useState(0); 
    // Phase 0: Init, 1: Typing Summary, 2: Calculating Matches, 3: Done
    
    const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
    const [typedTitle, setTypedTitle] = useState("");
    const [typedSummary, setTypedSummary] = useState("");
    const [showMatches, setShowMatches] = useState(false);
    
    const currentScenario = SCENARIOS[scenarioIndex];

    // Main Simulation Loop
    useEffect(() => {
        let timeout: any;
        let titleInterval: any;
        let summaryInterval: any;

        const runSimulation = async () => {
            // RESET
            setPhase(0);
            setShowMatches(false);
            setTypedTitle("");
            setTypedSummary("");
            setVisibleLogs([]);
            
            // PHASE 0: BOOT SEQUENCE
            await new Promise(r => setTimeout(r, 500));
            setVisibleLogs(prev => [...prev, `> SYSTEM: New Mission Received`]);
            await new Promise(r => setTimeout(r, 400));
            setVisibleLogs(prev => [...prev, `> PARAMS: ${currentScenario.context.industry} | ${currentScenario.context.region}`]);
            
            // PHASE 1: DRAFTING REPORT (TYPING EFFECT)
            setPhase(1);
            setVisibleLogs(prev => [...prev, `> AGENT: Strategist drafting executive brief...`]);
            
            // Type Title
            let titleIdx = 0;
            const fullTitle = currentScenario.report.docTitle;
            titleInterval = setInterval(() => {
                setTypedTitle(fullTitle.substring(0, titleIdx));
                titleIdx++;
                if (titleIdx > fullTitle.length) clearInterval(titleInterval);
            }, 30);
            
            await new Promise(r => setTimeout(r, 1000));

            // Type Summary
            let sumIdx = 0;
            const fullSum = currentScenario.report.summary;
            summaryInterval = setInterval(() => {
                setTypedSummary(fullSum.substring(0, sumIdx));
                sumIdx++;
                if (sumIdx > fullSum.length) clearInterval(summaryInterval);
            }, 15);

            await new Promise(r => setTimeout(r, 1500));
            
            // PHASE 2: MATCHMAKING LOGS
            setPhase(2);
            for (let i = 3; i < currentScenario.logs.length; i++) {
                await new Promise(r => setTimeout(r, 600));
                setVisibleLogs(prev => [...prev, `> ${currentScenario.logs[i]}`]);
            }

            // PHASE 3: SHOW MATCHES (FINAL REPORT)
            setPhase(3);
            setShowMatches(true);
            setVisibleLogs(prev => [...prev, `> DOSSIER COMPLETE.`]);

            // Wait before next scenario
            timeout = setTimeout(() => {
                setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
            }, 8000);
        };

        runSimulation();

        return () => {
            clearTimeout(timeout);
            clearInterval(titleInterval);
            clearInterval(summaryInterval);
        };
    }, [scenarioIndex]);

    return (
        <div className="bg-stone-950 flex flex-col md:flex-row h-[650px] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl font-sans">
            
            {/* LEFT: System Terminal (The Brain) */}
            <div className="w-full md:w-1/3 bg-black p-6 flex flex-col border-r border-stone-800 relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    <span className="ml-auto text-[10px] font-mono text-stone-600 tracking-wider">NEXUS_OS_v4.1</span>
                </div>

                {/* Status Indicator */}
                <div className="mb-8 pl-2 border-l-2 border-stone-800">
                    <h3 className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-1">Engine Status</h3>
                    <div className="flex items-center gap-3">
                        {phase === 1 || phase === 2 ? (
                            <ActivityIcon className="w-5 h-5 text-bronze-500 animate-pulse" />
                        ) : phase === 3 ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                            <CpuIcon className="w-5 h-5 text-stone-600" />
                        )}
                        <span className={`text-lg font-mono font-bold ${phase === 1 || phase === 2 ? 'text-bronze-400' : phase === 3 ? 'text-green-400' : 'text-stone-300'}`}>
                            {phase === 0 ? "STANDBY" : phase === 1 ? "DRAFTING" : phase === 2 ? "MATCHING" : "COMPLETE"}
                        </span>
                    </div>
                </div>

                {/* Terminal Output */}
                <div className="flex-grow font-mono text-[11px] leading-relaxed space-y-2 overflow-hidden text-green-400/90 relative">
                    {visibleLogs.map((log, i) => (
                        <div key={i} className="animate-fade-in border-l-2 border-transparent pl-2 hover:border-green-900/50 transition-colors break-words">
                            <span className="opacity-40 mr-2 text-green-200">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                            {log}
                        </div>
                    ))}
                    {(phase === 1 || phase === 2) && (
                        <div className="animate-pulse text-green-500 pl-2">_</div>
                    )}
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-full w-full animate-scan"></div>
                </div>

                {/* Context Data Block */}
                <div className="mt-6 p-3 bg-stone-900/50 rounded border border-stone-800/50">
                    <div className="flex justify-between text-[10px] uppercase text-stone-500 font-bold mb-2">
                        <span>Active Parameters</span>
                        <span className="text-bronze-600">Live</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                            <span className="block text-stone-600 font-mono text-[9px]">REGION</span>
                            <span className="text-stone-300">{currentScenario.context.region}</span>
                        </div>
                        <div>
                            <span className="block text-stone-600 font-mono text-[9px]">CAPITAL</span>
                            <span className="text-stone-300">{currentScenario.context.capital}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: The Document (The Artifact) */}
            <div className="w-full md:w-2/3 bg-stone-100 p-8 relative flex flex-col items-center justify-center overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                {/* Document Container */}
                <div className={`w-full max-w-xl bg-white shadow-2xl rounded-sm border border-stone-200 min-h-[500px] flex flex-col transition-all duration-700 transform ${phase > 0 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
                    
                    {/* Doc Header */}
                    <div className="p-8 border-b border-stone-100 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-4 opacity-50">
                                <GlobeIcon className="w-4 h-4 text-stone-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Nexus Intelligence Dossier</span>
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-stone-900 leading-tight min-h-[3.5rem]">
                                {typedTitle}
                                {phase === 1 && !typedTitle.endsWith(currentScenario.report.docTitle) && <span className="animate-pulse text-stone-400">|</span>}
                            </h2>
                        </div>
                        {phase === 3 && (
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider animate-fade-in">
                                Verified
                            </div>
                        )}
                    </div>

                    {/* Doc Body */}
                    <div className="p-8 flex-grow space-y-8">
                        
                        {/* Executive Summary Section */}
                        <div className={`transition-opacity duration-500 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Executive Summary
                            </h4>
                            <p className="text-sm text-stone-700 leading-relaxed font-serif border-l-2 border-bronze-500 pl-4 min-h-[4rem]">
                                {typedSummary}
                                {phase === 1 && <span className="animate-pulse text-stone-400">|</span>}
                            </p>
                        </div>

                        {/* Rationale Section */}
                        <div className={`transition-all duration-700 delay-300 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Zap className="w-3 h-3" /> Strategic Rationale
                            </h4>
                            <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 p-4 rounded-lg border border-stone-100">
                                {currentScenario.report.rationale}
                            </p>
                        </div>

                        {/* Matches Section - Appears Last */}
                        {showMatches && (
                            <div className="animate-fade-in-up">
                                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Target className="w-3 h-3" /> Identified Partners
                                </h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {currentScenario.matches.map((m, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 border border-stone-200 rounded hover:border-bronze-300 transition-colors bg-white shadow-sm group">
                                            <div>
                                                <div className="font-bold text-sm text-stone-900 group-hover:text-bronze-700">{m.name}</div>
                                                <div className="text-[10px] text-stone-500 uppercase tracking-wide mt-0.5 flex items-center gap-1">
                                                    {m.location} <span className="text-stone-300">•</span> {m.readiness} Readiness
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-stone-900">{m.score}</div>
                                                <div className="text-[9px] text-stone-400 font-bold uppercase">Score</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex justify-between items-center text-[9px] text-stone-400 uppercase tracking-widest">
                        <span>Confidential</span>
                        <span>Generated by Nexus AI</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
