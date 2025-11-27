
import React, { useState, useCallback } from 'react';
import { IntelligenceDesignStudio } from './components/IntelligenceDesignStudio';
import Dashboard from './components/Dashboard';
import CommandCenter from './components/CommandCenter';
import AdminDashboard from './components/Admin/AdminDashboard';
import { ReportParameters, UserProfile } from './types';
import { NexusLogo, GlobeIcon, LayoutDashboardIcon, ReportIcon, ShieldCheckIcon } from './components/Icons';
import { LandingPage } from './components/LandingPage';
import useEscapeKey from './hooks/useEscapeKey';
import { LegalInfoHub } from './components/LegalInfoHub';

const initialParams: ReportParameters = {
    reportName: '',
    userName: '',
    userDepartment: '',
    organizationType: 'Private Enterprise (MNC)',
    organizationSubType: '',
    userCountry: '',
    userTier: '',
    skillLevel: 'senior',
    region: 'Global',
    industry: [],
    customIndustry: '',
    idealPartnerProfile: '',
    problemStatement: '',
    analysisTimeframe: 'Last 12 Months',
    tier: ['Tier 1'],
    aiPersona: [],
    customAiPersona: '',
    reportId: '',
    createdAt: new Date().toISOString(),
    status: 'draft',
    analyticalModules: [],
    reportLength: 'standard',
    outputFormat: 'report',
    stakeholderPerspectives: [],
    includeCrossSectorMatches: false,
    matchCount: 5,
    partnershipSupportNeeds: [],
    partnerDiscoveryMode: false,
    strategicMode: 'discovery',
    searchScope: 'Regional',
    intentTags: [],
    comparativeContext: [],
    additionalContext: '',
    relationshipStage: 'Initial Outreach',
    dueDiligenceDepth: 'Standard',
    partnerCapabilities: [],
    operationalPriority: 'Balanced',
    riskTolerance: 'Moderate',
    expansionTimeline: '12-18 Months'
};

type ViewMode = 'command-center' | 'intelligence-system' | 'live-feed' | 'admin-dashboard' | 'legal-hub';

const App: React.FC = () => {
    const [params, setParams] = useState<ReportParameters>(initialParams);
    const [viewMode, setViewMode] = useState<ViewMode>('intelligence-system');
    const [hasEntered, setHasEntered] = useState(false);
    const [savedReports, setSavedReports] = useState<ReportParameters[]>([]);
    const [legalSection, setLegalSection] = useState<string | undefined>(undefined);
    
    const handleEscape = useCallback(() => {
        if (viewMode !== 'command-center' && viewMode !== 'admin-dashboard' && viewMode !== 'legal-hub') {
            setViewMode('command-center');
        } else if (viewMode === 'legal-hub') {
            setViewMode('command-center');
        }
    }, [viewMode]);

    useEscapeKey(handleEscape);

    const handleParamsChange = (newParams: ReportParameters) => {
        setParams(newParams);
    };

    const handleProfileUpdate = (profile: UserProfile) => {
        console.log('Profile Updated:', profile);
    };

    const startNewMission = () => {
        const newReport = {
            ...initialParams, 
            reportId: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        };
        setParams(newReport);
        setViewMode('intelligence-system');
    };

    const loadReport = (report: ReportParameters) => {
        setParams(report);
        setViewMode('intelligence-system');
    };

    const saveReport = (reportToSave: ReportParameters) => {
        setSavedReports(prev => {
            const existing = prev.findIndex(r => r.reportId === reportToSave.reportId);
            if (existing >= 0) {
                const updated = [...prev];
                updated[existing] = { ...reportToSave, status: 'draft', createdAt: new Date().toISOString() };
                return updated;
            }
            return [...prev, { ...reportToSave, status: 'draft', createdAt: new Date().toISOString() }];
        });
    };

    const deleteReport = (reportName: string) => {
        setSavedReports(prev => prev.filter(r => r.reportName !== reportName));
    };

    const openLegal = (section?: string) => {
        setLegalSection(section);
        setViewMode('legal-hub');
        setHasEntered(true); // Ensure we bypass landing if accessed directly
    };

    if (!hasEntered) {
        return <LandingPage onEnter={() => setHasEntered(true)} onOpenLegal={openLegal} />;
    }

    if (viewMode === 'admin-dashboard') {
        return (
            <div className="h-screen flex flex-col">
                <AdminDashboard />
                <button 
                    onClick={() => setViewMode('command-center')}
                    className="fixed bottom-4 right-4 bg-stone-800 text-white px-4 py-2 rounded shadow-lg text-xs font-bold"
                >
                    Exit Admin Mode
                </button>
            </div>
        );
    }

    if (viewMode === 'legal-hub') {
        return <LegalInfoHub onBack={() => setViewMode('command-center')} initialSection={legalSection} />;
    }

    return (
        <div className="h-screen w-full bg-stone-50 font-sans text-stone-900 flex flex-col overflow-hidden">
            {/* Header - Platinum/White style */}
            <header className="bg-white border-b border-stone-200 z-50 shadow-sm h-20 flex-shrink-0 flex items-center justify-between px-8 relative">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-50"></div>
                
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setViewMode('intelligence-system')}>
                    <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center shadow-lg border border-stone-700">
                        <NexusLogo className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-serif font-bold text-stone-900 leading-none tracking-tight">BW Nexus AI</h1>
                        <span className="text-[10px] text-bronze-600 font-bold uppercase tracking-widest">Intelligence OS</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center bg-stone-50 p-1.5 rounded-xl border border-stone-200 shadow-inner">
                    <button 
                        onClick={() => setViewMode('intelligence-system')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                            viewMode === 'intelligence-system' 
                            ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200' 
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        <ReportIcon className="w-4 h-4" />
                        Studio
                    </button>
                    <button 
                        onClick={() => setViewMode('command-center')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                            viewMode === 'command-center' 
                            ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200' 
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        <LayoutDashboardIcon className="w-4 h-4" />
                        Repository
                    </button>
                    <button 
                        onClick={() => setViewMode('live-feed')}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                            viewMode === 'live-feed' 
                            ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200' 
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                    >
                        <GlobeIcon className="w-4 h-4" />
                        Global Data
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setViewMode('admin-dashboard')}
                        className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
                        title="Admin Console"
                    >
                        <ShieldCheckIcon className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={startNewMission}
                        className="hidden lg:flex items-center gap-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 px-5 py-2.5 rounded-lg transition-colors shadow-lg"
                    >
                        + New Mission
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex-grow w-full overflow-hidden bg-stone-50">
                {viewMode === 'command-center' && (
                    <CommandCenter 
                        savedReports={savedReports}
                        onCreateNew={startNewMission}
                        onLoadReport={loadReport}
                        onOpenInstant={() => setViewMode('live-feed')}
                        onOpenSimulator={() => setViewMode('live-feed')}
                    />
                )}
                {viewMode === 'intelligence-system' && (
                    <IntelligenceDesignStudio
                        params={params}
                        onParamsChange={handleParamsChange}
                        onProfileUpdate={handleProfileUpdate}
                        onSaveReport={saveReport}
                        savedReports={savedReports}
                        onLoadReport={loadReport}
                        onDeleteReport={deleteReport}
                    />
                )}
                {viewMode === 'live-feed' && (
                    <div className="h-full overflow-hidden">
                        <Dashboard 
                            onAnalyze={(item) => console.log("Analyzing", item)} 
                            onStartSymbiosis={(ctx) => console.log("Symbiosis", ctx)} 
                        />
                    </div>
                )}
            </main>

            {/* System Footer */}
            <footer className="bg-white border-t border-stone-200 py-3 px-8 z-50 flex justify-between items-center text-[10px] text-stone-400 uppercase tracking-widest font-medium shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4">
                    <span className="hover:text-stone-600 transition-colors cursor-default">&copy; {new Date().getFullYear()} BW Global Advisory</span>
                    <span className="w-px h-3 bg-stone-300"></span>
                    <span className="hover:text-stone-600 transition-colors cursor-default">ABN: 55 978 113 300</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => openLegal('privacy')} className="hover:text-stone-600 transition-colors">Privacy</button>
                    <button onClick={() => openLegal('terms')} className="hover:text-stone-600 transition-colors">Terms</button>
                    <span className="w-px h-3 bg-stone-300"></span>
                    <span className="text-stone-300">Nexus Intelligence OS v4.0.1</span>
                </div>
            </footer>
        </div>
    );
};

export default App;
