
import React from 'react';
import { 
    NexusLogo, Target, GlobeIcon, ActivityIcon, ShieldCheck, 
    BrainCircuit, Users, Zap, CheckCircle, ManualIcon, BarChart, TrendingUp
} from './Icons';
import MatchmakingDemo from './MatchmakingDemo';

interface LandingPageProps {
    onEnter: () => void;
    onOpenLegal?: (section?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onOpenLegal }) => {
    const handleLegalClick = (section: string) => {
        if (onOpenLegal) {
            onOpenLegal(section);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-bronze-100 selection:text-bronze-900 flex flex-col">
            
            {/* --- HEADER --- */}
            <header className="fixed top-0 left-0 w-full p-6 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-stone-800 rounded-lg shadow-lg">
                            <NexusLogo className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-serif font-bold tracking-wider uppercase text-stone-900">BW Nexus AI</span>
                    </div>
                    <button onClick={onEnter} className="text-sm font-bold uppercase tracking-widest text-stone-600 hover:text-bronze-700 transition-colors">
                        Log In
                    </button>
                </div>
            </header>

            <div className="flex-grow">
                {/* --- HERO SECTION --- */}
                <section className="pt-40 pb-20 px-6 relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-stone-100 to-transparent -z-10"></div>
                    
                    <div className="max-w-6xl mx-auto text-center relative z-10">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-black text-stone-900 leading-tight mb-8 tracking-tight">
                            Your Region’s Value, <br/>
                            <span className="text-bronze-700">Understood Globally.</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-stone-600 font-medium leading-relaxed max-w-4xl mx-auto mb-10 font-sans">
                            The world’s first Intelligence Operating System designed to uncover the economic truth that traditional consulting overlooks.
                        </p>

                        <div className="max-w-4xl mx-auto space-y-6 text-lg text-stone-500 leading-relaxed mb-12 text-left md:text-center font-sans">
                            <p>
                                For decades, vast potential in regional economies has remained invisible to global investors—simply because no system could translate local reality into global confidence. Capital flows to the familiar, not necessarily the valuable.
                            </p>
                            <p>
                                We have built the first architecture that does not rely on human intuition alone. Using proprietary mathematical engines that have never existed before, we convert the "unseen" attributes of a region into hard, audit-grade investment data.
                            </p>
                            <p className="text-stone-900 font-bold text-xl pt-4 font-serif">
                                BW Nexus AI changes the way the world reads value.
                            </p>
                        </div>

                        <div>
                            <button 
                                onClick={onEnter}
                                className="px-10 py-5 bg-stone-800 text-white rounded-xl font-bold text-lg tracking-widest uppercase hover:bg-bronze-700 transition-all shadow-2xl transform hover:-translate-y-1"
                            >
                                Access The OS
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- VALUE PROPOSITION --- */}
                <section className="py-16 px-6 bg-white border-y border-stone-200">
                    <div className="max-w-5xl mx-auto">
                        <p className="text-xl md:text-2xl font-medium text-stone-800 leading-relaxed text-center mb-12 font-serif">
                            This is not a report generator. It is an <span className="font-bold text-bronze-700">Economic Intelligence Operating System</span> capable of calculating outcomes that previously required teams of 50 analysts and six months of work.
                        </p>
                        <div className="grid md:grid-cols-3 gap-12 text-left">
                            <div className="p-6 bg-stone-50 rounded-xl shadow-sm border border-stone-200">
                                <div className="text-bronze-700 font-black text-xl mb-4 uppercase tracking-widest font-serif">Translates</div>
                                <p className="text-stone-600 leading-relaxed">
                                    It takes the raw, unstructured chaos of a local economy—its culture, its hidden assets, its workforce nuance—and translates it into the structured data language that Wall Street, London, and Singapore require to deploy capital.
                                </p>
                            </div>
                            <div className="p-6 bg-stone-50 rounded-xl shadow-sm border border-stone-200">
                                <div className="text-bronze-700 font-black text-xl mb-4 uppercase tracking-widest font-serif">Turns</div>
                                <p className="text-stone-600 leading-relaxed">
                                    It converts "potential" into "probability." By applying our proprietary <strong>SPI (Success Probability Index)</strong>, we strip away the ambiguity that scares off investors, replacing "gut feeling" with calculated confidence intervals.
                                </p>
                            </div>
                            <div className="p-6 bg-stone-50 rounded-xl shadow-sm border border-stone-200">
                                <div className="text-bronze-700 font-black text-xl mb-4 uppercase tracking-widest font-serif">Transforms</div>
                                <p className="text-stone-600 leading-relaxed">
                                    It transforms overlooked places into inevitable opportunities. It does not "sell" a region; it proves the mathematical validity of investing there, removing the friction of bias and the barrier of the unknown.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- LIVE DEMO SECTION --- */}
                <section className="py-24 px-6 bg-stone-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="px-4 py-1 rounded-full border border-bronze-300 bg-bronze-50 text-bronze-800 text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                                Live System Preview
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 font-serif">
                                See The Engine in Action
                            </h2>
                            <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed">
                                Below is a live preview of the **Matchmaking Engine**. It connects strategic intent with high-asymmetry partners using our proprietary **IVAS (Investment Velocity & Activation Score)** models. This is not a database search; it is a multi-agent negotiation simulation running in real-time.
                            </p>
                        </div>
                        
                        <div className="shadow-2xl rounded-2xl overflow-hidden border border-stone-200">
                            <MatchmakingDemo />
                        </div>
                    </div>
                </section>

                {/* --- THE PROBLEM: 100 YEAR GAP --- */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-16 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight font-serif">
                                    The Problem: <br/>
                                    <span className="text-stone-400">The 100-Year Confidence Gap</span>
                                </h2>
                                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                                    <p>
                                        For over a century, the global economic machine has suffered from a massive inefficiency. Capital creates "safe havens" in major metropolises (New York, London, Tokyo) while starving high-growth regions of funding.
                                    </p>
                                    <p>
                                        <strong>Why? It is not a lack of value. It is a lack of visibility.</strong>
                                    </p>
                                    <p>
                                        Investors rely on data they trust. Emerging regions, secondary cities, and specialized zones often lack the "audit-grade" intelligence infrastructure to prove their worth. This creates a <strong>Confidence Gap</strong>—a void where good deals die because the risk cannot be calculated.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-stone-50 p-8 rounded-2xl shadow-sm border border-stone-200">
                                <h3 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-200 pb-4 font-serif">The Barriers to Entry</h3>
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-3xl font-black text-stone-300 mb-2">01</div>
                                        <h4 className="font-bold text-stone-900 mb-2">Intelligence Was Too Expensive</h4>
                                        <p className="text-sm text-stone-600">
                                            Only elite firms could afford the $500k+ fees for deep market research. Everyone else was left guessing, leading to risk aversion.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-stone-300 mb-2">02</div>
                                        <h4 className="font-bold text-stone-900 mb-2">The Unknown Felt Risky</h4>
                                        <p className="text-sm text-stone-600">
                                            Without standardized, transparent intelligence (like our NSIL protocol), investors defaulted to "No" because they couldn't quantify the "Yes."
                                        </p>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-stone-300 mb-2">03</div>
                                        <h4 className="font-bold text-stone-900 mb-2">No Shared Language</h4>
                                        <p className="text-sm text-stone-600">
                                            Local leaders spoke of "potential" and "community." Global investors spoke of "IRR" and "Exit Multiples." BW Nexus acts as the universal translator.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-800 rounded-3xl p-8 md:p-16 text-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-serif">The Result: A Global Bottleneck</h3>
                            <p className="text-stone-300 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
                                Capital funnels into the same saturated cities. Innovation remains geographically trapped. Good ideas die unseen. 
                                <br/><br/>
                                <span className="text-white font-bold">BW Nexus AI exists to bridge this gap permanently, democratizing access to elite-level strategic intelligence.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- CONSULTING TRUTH: THE HORSE AND CART --- */}
                <section className="py-24 px-6 bg-stone-50 text-stone-900 relative">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-bronze-700 font-bold tracking-widest uppercase text-sm mb-2 block">The Industry Shift</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight font-serif">An Engine, Not A Rival</h2>
                            
                            <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                                <p>
                                    We are often asked: "Is this designed to replace consultants?"
                                </p>
                                <p>
                                    <strong>The answer is No. It is designed to replace the drudgery.</strong>
                                </p>
                                <p>
                                    BW Nexus AI is an Operating System for the world's best strategic minds. We automate the heavy lifting—the data gathering, the risk weighting, the initial drafting—so that consultants, government leaders, and investors can focus on the high-level architecture of the deal.
                                </p>
                                <p>
                                    We turn researchers into Architects. We turn bureaucrats into Visionaries. We provide the foundation upon which human wisdom builds the final deal.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-white p-10 rounded-3xl border border-stone-200 relative shadow-sm">
                            {/* Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-100 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <h3 className="text-xl font-bold text-stone-900 mb-8 uppercase tracking-widest border-b border-stone-100 pb-4">Evolution of Intelligence</h3>
                            
                            <div className="space-y-8">
                                <div className="flex gap-4 opacity-50 grayscale">
                                    <div className="w-12 h-12 bg-stone-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ManualIcon className="w-6 h-6 text-stone-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-700">Traditional Consulting</h4>
                                        <p className="text-sm text-stone-500">Human intuition. Slow. Expensive. Biased.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 opacity-70">
                                    <div className="w-12 h-12 bg-stone-300 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-stone-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-800">AI-Assisted Consulting</h4>
                                        <p className="text-sm text-stone-600">Humans using AI to write faster. The "Cart" moves faster, but the thinking is still limited.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 scale-105 origin-left">
                                    <div className="w-12 h-12 bg-stone-800 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <BrainCircuit className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-900 text-lg">The Nexus Architecture</h4>
                                        <p className="text-sm text-stone-700 font-medium">
                                            Deterministic Math + Multi-Agent Reasoning. The system does the thinking. Humans do the architecture.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- THE PROOF: PROPRIETARY MATH --- */}
                <section className="py-24 px-6 bg-stone-900 text-white">
                    <div className="max-w-6xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 font-serif">The Proof is in the Math</h2>
                        <p className="text-xl text-stone-300 max-w-3xl mx-auto">
                            We didn't just build a chatbot. We developed proprietary scoring engines that have never existed until now. These formulas transform "opinion" into "physics."
                        </p>
                    </div>

                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                            <div className="mb-6 p-3 bg-bronze-600/20 w-fit rounded-lg">
                                <ActivityIcon className="w-8 h-8 text-bronze-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-serif">SPI™</h3>
                            <p className="text-sm font-mono text-bronze-400 mb-4">Success Probability Index</p>
                            <p className="text-stone-300 text-sm leading-relaxed">
                                A weighted deterministic model that calculates the exact viability of a project before a single dollar is spent. It ingests 40+ variables—from labor stability to regulatory friction—to output a confidence interval that bankers respect.
                            </p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                            <div className="mb-6 p-3 bg-blue-500/20 w-fit rounded-lg">
                                <TrendingUp className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-serif">IVAS™</h3>
                            <p className="text-sm font-mono text-blue-400 mb-4">Investment Velocity & Activation Score</p>
                            <p className="text-stone-300 text-sm leading-relaxed">
                                Capital has speed. IVAS predicts the *time-to-value*. It doesn't just tell you if a project is good; it calculates how long it will take to navigate the bureaucracy and break ground, adjusting for political will and latent assets.
                            </p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                            <div className="mb-6 p-3 bg-emerald-500/20 w-fit rounded-lg">
                                <BarChart className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-serif">SCF™</h3>
                            <p className="text-sm font-mono text-emerald-400 mb-4">Symbiotic Cascade Forecast</p>
                            <p className="text-stone-300 text-sm leading-relaxed">
                                Economic value isn't isolated; it ripples. SCF models the second and third-order effects of an investment. If you build a port here, what happens to the textile industry 50 miles away? This engine simulates the ecosystem impact.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- COLLABORATION VS COMPETITION --- */}
                <section className="py-24 px-6 bg-stone-50">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-black text-stone-900 mb-6 font-serif">Collaboration First</h2>
                                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                                    <p>
                                        The future of global economics is not zero-sum. It is collaborative.
                                    </p>
                                    <p>
                                        By removing the friction of "unknowns," we allow capital to flow freely to where it is most needed and most productive. This system is built to be used by the visionaries who build the future.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                                <h3 className="font-bold text-stone-900 mb-6 uppercase tracking-widest text-sm">Who This Is For</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <div className="p-1 bg-green-100 rounded-full mt-1"><CheckCircle className="w-4 h-4 text-green-600" /></div>
                                        <div>
                                            <strong className="block text-stone-900">Governments & EDAs</strong>
                                            <span className="text-sm text-stone-600">To prove the value of their region with math, not marketing.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-1 bg-green-100 rounded-full mt-1"><CheckCircle className="w-4 h-4 text-green-600" /></div>
                                        <div>
                                            <strong className="block text-stone-900">Investors & Family Offices</strong>
                                            <span className="text-sm text-stone-600">To de-risk emerging markets and find "off-market" alpha.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-1 bg-green-100 rounded-full mt-1"><CheckCircle className="w-4 h-4 text-green-600" /></div>
                                        <div>
                                            <strong className="block text-stone-900">Consultancies</strong>
                                            <span className="text-sm text-stone-600">To scale their output 100x and offer deeper, data-backed insights.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- ACCESS & PRICING --- */}
                <section className="py-20 px-6 bg-stone-900 text-white text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 font-serif">Simple, Transparent Access</h2>
                        <p className="text-lg text-stone-300 mb-12">No contracts. No cold sales. No consulting gatekeepers.</p>
                        
                        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            {/* Single Pass Card */}
                            <div className="bg-white text-stone-900 p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-bronze-600"></div>
                                <h3 className="text-lg font-bold text-stone-500 uppercase mb-4 tracking-widest">Single Pass</h3>
                                <div className="text-6xl font-black mb-2 text-stone-900">$15</div>
                                <div className="text-base font-medium text-stone-600 mb-8">7-day full platform access</div>
                                <button onClick={onEnter} className="w-full py-4 bg-stone-800 text-white rounded-xl font-bold hover:bg-bronze-700 transition-colors text-lg shadow-lg">
                                    Start Now
                                </button>
                                <p className="mt-4 text-xs text-stone-400">Instant activation. No auto-renew.</p>
                            </div>
                            
                            {/* Subscription Card */}
                            <div className="bg-stone-800 text-white p-10 rounded-3xl border border-stone-700 flex flex-col justify-center">
                                <h3 className="text-lg font-bold text-stone-400 uppercase mb-8 tracking-widest">Enterprise Subscriptions</h3>
                                <ul className="space-y-6 text-lg font-medium">
                                    <li className="flex justify-between border-b border-stone-700 pb-3">
                                        <span>3 months</span>
                                        <span className="text-bronze-400 font-bold">$175</span>
                                    </li>
                                    <li className="flex justify-between border-b border-stone-700 pb-3">
                                        <span>6 months</span>
                                        <span className="text-bronze-400 font-bold">$395</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>12 months</span>
                                        <span className="text-bronze-400 font-bold">$395</span>
                                    </li>
                                </ul>
                                <button onClick={onEnter} className="w-full mt-8 py-3 bg-stone-700 text-white rounded-xl font-bold hover:bg-stone-600 transition-colors text-sm uppercase tracking-wide">
                                    Contact Sales
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* --- FOOTER --- */}
            <footer className="bg-stone-950 border-t border-stone-800 py-12 px-6 z-50 text-stone-400">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-1.5 bg-stone-800 rounded-lg">
                                <NexusLogo className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-serif font-bold text-white tracking-wider uppercase">BW Nexus AI</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm text-stone-500">
                            The world's premier Economic Intelligence Operating System. Bridging the 100-Year Confidence Gap with deterministic mathematics and multi-agent reasoning.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={onEnter} className="hover:text-bronze-500 transition-colors">Intelligence Studio</button></li>
                            <li><button onClick={onEnter} className="hover:text-bronze-500 transition-colors">Live Data Hub</button></li>
                            <li><button onClick={onEnter} className="hover:text-bronze-500 transition-colors">Report Architect</button></li>
                            <li><button onClick={onEnter} className="hover:text-bronze-500 transition-colors">Enterprise API</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Legal & Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={() => handleLegalClick('privacy')} className="hover:text-bronze-500 transition-colors text-left w-full">Privacy Policy</button></li>
                            <li><button onClick={() => handleLegalClick('terms')} className="hover:text-bronze-500 transition-colors text-left w-full">Terms of Service</button></li>
                            <li><button onClick={() => handleLegalClick('ethical-framework')} className="hover:text-bronze-500 transition-colors text-left w-full">Data Security</button></li>
                            <li><button onClick={onEnter} className="hover:text-bronze-500 transition-colors text-left w-full">Contact Support</button></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-stone-600">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <span>&copy; {new Date().getFullYear()} BW Global Advisory. All rights reserved.</span>
                        <span className="hidden md:inline w-px h-3 bg-stone-800"></span>
                        <span>ABN: 55 978 113 300</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Nexus Intelligence OS v4.0.1</span>
                        <span className="w-px h-3 bg-stone-800"></span>
                        <span className="text-bronze-800">Authorized Access Only</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
