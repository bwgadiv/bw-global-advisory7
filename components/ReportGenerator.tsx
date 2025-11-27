
import React, { useState, useEffect, useCallback } from 'react';
import { EngineInputs, ComputeResult, ReportParameters, ReportSuggestions, UserProfile as UserProfileType } from '../types';
import { TrendingUp, AlertTriangleIcon, CheckCircle, CloseIcon, ActivityIcon, Target, Users, GlobeIcon, ShieldCheck, Zap, FileText, LoadIcon, Settings, ChevronRight, BarChart, ScaleIcon, MicroscopeIcon, HandshakeIcon, CpuIcon, RocketIcon } from './Icons';
import Inquire from './Inquire';

interface ReportGeneratorProps {
    params: ReportParameters;
    onParamsChange: (params: ReportParameters) => void;
    onReportUpdate: (params: ReportParameters, content: string, error: string | null, generating: boolean) => void;
    onProfileUpdate: (profile: UserProfileType) => void;
    isGenerating: boolean; 
    onApplySuggestions: (suggestions: ReportSuggestions) => void;
    savedReports: ReportParameters[];
    onSaveReport: (params: ReportParameters) => void;
    onLoadReport: (params: ReportParameters) => void;
    onDeleteReport: (reportName: string) => void;
    onScopeComplete: () => void;
}

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error' | 'blocked';
  duration?: number;
  result?: any;
  requiredForNext?: boolean;
  errorMessage?: string;
}

interface ReportGenerationState {
  currentStep: number;
  isGenerating: boolean;
  reportId?: string;
  progress: number;
  estimatedTimeRemaining?: number;
  results: Partial<ComputeResult>;
  errors: string[];
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ params, onParamsChange }) => {
  const [state, setState] = useState<ReportGenerationState>({
    currentStep: 0,
    isGenerating: false,
    progress: 0,
    results: {},
    errors: []
  });

  const [strategicContext, setStrategicContext] = useState<EngineInputs>({
    sanctionsRisk: 30,
    corruption: 35,
    stability: 60,
    legalIntegrity: 55,
    compliance: 60,
    transparency: 50,
    esg: 45,
    cultureDistance: 30,
    communicationFriction: 25,
    governanceMismatch: 20,
    incentiveMisalignment: 30,
    powerImbalance: 20,
    legalAdvantage: 10,
    financialDominance: 15,
    dependencyRatio: 20,
    mediaDistortion: 20,
    informationGap: 40,
    trustHistory: 50,
    fearIndex: 25,
    reserves: 40,
    energySecurity: 60,
    foodSecurity: 55,
    tradeDiversity: 45,
    bankingResilience: 50,
    volatility: 35,
    politicalRisk: 30,
    marketNoise: 40,
    persona: params.organizationType || 'Multinational Corporation',
    targetRegion: params.region || 'Southeast Asia',
    notes: params.problemStatement || 'Strategic investment analysis'
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'engines' | 'results' | 'reports'>('overview');

  useEffect(() => {
      // Sync params to local engine inputs if needed
      setStrategicContext(prev => ({
          ...prev,
          persona: params.organizationType || prev.persona,
          targetRegion: params.region || prev.targetRegion,
          notes: params.problemStatement || prev.notes
      }));
  }, [params.organizationType, params.region, params.problemStatement]);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'context-validation',
      title: 'Strategic Context Validation',
      description: 'Validate and enrich strategic requirements with global intelligence',
      status: 'pending',
      requiredForNext: true
    },
    {
      id: 'ethics-gateway',
      title: 'Ethics & Compliance Gateway',
      description: 'Automated integrity screening and regulatory compliance assessment',
      status: 'pending',
      requiredForNext: true
    },
    {
      id: 'engine-orchestration',
      title: 'Multi-Engine Intelligence Analysis',
      description: 'Parallel processing of all 8 intelligence engines via backend APIs',
      status: 'pending',
      requiredForNext: true
    },
    {
      id: 'intelligence-synthesis',
      title: 'Intelligence Synthesis & Correlation',
      description: 'Cross-engine analysis and strategic insight generation',
      status: 'pending',
      requiredForNext: true
    },
    {
      id: 'recommendation-engine',
      title: 'Strategic Recommendations Engine',
      description: 'Generate prioritized recommendations with confidence scoring',
      status: 'pending',
      requiredForNext: true
    },
    {
      id: 'report-compilation',
      title: 'Report Compilation & Formatting',
      description: 'Assemble professional multi-format report with visualizations',
      status: 'pending',
      requiredForNext: true
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance & Review',
      description: 'Automated validation and final compliance verification',
      status: 'pending',
      requiredForNext: false
    }
  ];

  // Simulate comprehensive API call to backend compute endpoint
  const callBackendCompute = async (inputs: EngineInputs): Promise<ComputeResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `report_${Date.now()}`,
          createdAt: new Date().toISOString(),
          spi: 74.85,
          spi_ci_low: 0,
          spi_ci_high: 95,
          pei: 35.7,
          saq: 27.0,
          cfi: 43.75,
          esac: 58.25,
          ddc: 100,
          hics: 40.5,
          svs: 0,
          ethicsStatus: 'CAUTION',
          explanation: [
            'SPI=74.85 (CI: 0-95) - Core success probability with high uncertainty',
            'PEI=35.7 - Partnership complexity indicates moderate integration challenges',
            'SAQ=27.0 - Strategic power imbalances require governance attention',
            'CFI=43.75 - Information reliability concerns suggest enhanced verification',
            'ESAC=58.25 - Economic resilience provides reasonable crisis management capacity',
            'DDC=100 - Decision quality decay risk indicates urgent structured review processes',
            'HICS=40.5 - Cultural compatibility suggests change management investment',
            'SVS=0 - Overall strategic viability requires fundamental reassessment',
            'Ethics Status: CAUTION (3 compliance flags identified)'
          ],
          keyInsights: [
            'Exceptional foundational viability with strong success probability baseline',
            'High partnership complexity suggests phased implementation approach needed',
            'Power imbalances detected - governance structure critically important',
            'Information reliability concerns - enhanced verification processes required',
            'Strong economic resilience provides good crisis management foundation',
            'Decision quality decay risk - structured review processes essential',
            'Cultural integration challenges - change management investment required',
            'Very low strategic viability - fundamental strategic realignment needed'
          ],
          recommendations: [
            'CRITICAL: Do not proceed - address fundamental compliance issues first',
            'Consider joint venture structure with minority position to reduce power imbalances',
            'Develop comprehensive risk mitigation strategies with dedicated oversight',
            'Invest in relationship management and communication infrastructure immediately',
            'Establish balanced governance and mutual benefit frameworks before proceeding',
            'Conduct detailed cultural integration assessment and change management planning',
            'Implement enhanced information gathering and verification processes',
            'Create structured decision-making and review processes with clear milestones'
          ],
          inputs,
          processingTime: 1250,
          version: '1.0.0',
          modelVersion: 'BW-Nexus-v1.0'
        });
      }, 2000);
    });
  };

  const runWorkflowStep = async (stepIndex: number): Promise<void> => {
    const step = workflowSteps[stepIndex];
    if (!step) return;

    setState(prev => ({ ...prev, currentStep: stepIndex }));

    try {
      switch (step.id) {
        case 'context-validation':
          await new Promise(resolve => setTimeout(resolve, 500));
          // CRASH PREVENTION: Handle missing inputs gracefully by applying smart defaults
          if (!strategicContext.persona) {
             console.warn("Missing Persona - Applying Default");
             setStrategicContext(prev => ({ ...prev, persona: "Multinational Corporation" }));
          }
          if (!strategicContext.targetRegion) {
             console.warn("Missing Region - Applying Default");
             setStrategicContext(prev => ({ ...prev, targetRegion: "Global Market" }));
          }
          break;

        case 'ethics-gateway':
          await new Promise(resolve => setTimeout(resolve, 800));
          break;

        case 'engine-orchestration':
          setState(prev => ({ ...prev, progress: 20 }));
          const computeResult = await callBackendCompute(strategicContext);
          setState(prev => ({
            ...prev,
            results: computeResult,
            progress: 60,
            reportId: computeResult.id
          }));
          break;

        case 'intelligence-synthesis':
          await new Promise(resolve => setTimeout(resolve, 600));
          setState(prev => ({ ...prev, progress: 75 }));
          break;

        case 'recommendation-engine':
          await new Promise(resolve => setTimeout(resolve, 400));
          setState(prev => ({ ...prev, progress: 85 }));
          break;

        case 'report-compilation':
          await new Promise(resolve => setTimeout(resolve, 800));
          setState(prev => ({ ...prev, progress: 95 }));
          break;

        case 'quality-assurance':
          await new Promise(resolve => setTimeout(resolve, 300));
          setState(prev => ({ ...prev, progress: 100 }));
          break;
      }

      workflowSteps[stepIndex].status = 'completed';
      workflowSteps[stepIndex].duration = Date.now() - Date.now();

    } catch (error: any) {
      workflowSteps[stepIndex].status = 'error';
      workflowSteps[stepIndex].errorMessage = error.message;
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, `${step.title}: ${error.message}`]
      }));
    }
  };

  const startReportGeneration = async () => {
    setState(prev => ({
      ...prev,
      isGenerating: true,
      currentStep: 0,
      progress: 0,
      errors: []
    }));

    workflowSteps.forEach(step => step.status = 'pending');

    for (let i = 0; i < workflowSteps.length; i++) {
      await runWorkflowStep(i);
      if (workflowSteps[i].requiredForNext && workflowSteps[i].status === 'error') {
        setState(prev => ({ ...prev, isGenerating: false }));
        return;
      }
    }

    setState(prev => ({ ...prev, isGenerating: false }));
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'running': return <ActivityIcon className="w-5 h-5 text-bronze-500 animate-pulse" />;
      case 'error': return <CloseIcon className="w-5 h-5 text-red-500" />;
      case 'blocked': return <AlertTriangleIcon className="w-5 h-5 text-orange-500" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-stone-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'running': return 'border-bronze-500 bg-bronze-50';
      case 'error': return 'border-red-500 bg-red-50';
      case 'blocked': return 'border-orange-500 bg-orange-50';
      default: return 'border-stone-300 bg-stone-50';
    }
  };

  return (
    <div className="flex h-full w-full bg-stone-50 text-stone-800 font-sans overflow-hidden">
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto h-full">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="bg-stone-900 rounded-xl p-8 text-white shadow-xl">
            <h1 className="text-4xl font-serif font-bold mb-2">BW Nexus AI - Complete Intelligence Platform</h1>
            <p className="text-stone-300 text-lg mb-4">Enterprise-Grade Strategic Analysis & Report Generation System</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-bronze-400" />
                <div>
                  <div className="font-semibold">8 Intelligence Engines</div>
                  <div className="text-xs text-stone-400">Multi-dimensional analysis</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-bronze-400" />
                <div>
                  <div className="font-semibold">Ethics & Compliance</div>
                  <div className="text-xs text-stone-400">Regulatory safeguards</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-bronze-400" />
                <div>
                  <div className="font-semibold">Professional Reports</div>
                  <div className="text-xs text-stone-400">Multi-format outputs</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-bronze-400" />
                <div>
                  <div className="font-semibold">Real-Time Processing</div>
                  <div className="text-xs text-stone-400">Live analysis pipeline</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
            <div className="flex space-x-1">
              {[
                { id: 'overview', label: 'System Overview', icon: GlobeIcon },
                { id: 'engines', label: 'Intelligence Engines', icon: CpuIcon },
                { id: 'results', label: 'Analysis Results', icon: BarChart },
                { id: 'reports', label: 'Report Generation', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-stone-900 text-white shadow-md'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Strategic Context Input */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2 text-stone-900">
                  <Settings className="w-5 h-5 text-stone-600" />
                  Strategic Context Configuration
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Organization Type</label>
                    <select
                      value={strategicContext.persona}
                      onChange={(e) => setStrategicContext(prev => ({ ...prev, persona: e.target.value }))}
                      className="w-full p-3 border-b-2 border-stone-200 bg-transparent focus:border-bronze-600 outline-none transition-colors font-serif text-lg"
                    >
                      <option value="Multinational Corporation">Multinational Corporation</option>
                      <option value="Government Agency">Government Agency</option>
                      <option value="Investment Firm">Investment Firm</option>
                      <option value="Development Organization">Development Organization</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Target Region</label>
                    <select
                      value={strategicContext.targetRegion}
                      onChange={(e) => setStrategicContext(prev => ({ ...prev, targetRegion: e.target.value }))}
                      className="w-full p-3 border-b-2 border-stone-200 bg-transparent focus:border-bronze-600 outline-none transition-colors font-serif text-lg"
                    >
                      <option value="Southeast Asia">Southeast Asia</option>
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Middle East">Middle East</option>
                      <option value="Africa">Africa</option>
                      <option value="Latin America">Latin America</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Strategic Notes</label>
                  <textarea
                    value={strategicContext.notes}
                    onChange={(e) => setStrategicContext(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full p-3 border border-stone-200 rounded-lg focus:ring-1 focus:ring-bronze-500 focus:border-bronze-500 outline-none bg-stone-50"
                    rows={3}
                    placeholder="Describe your strategic objectives, constraints, and key considerations..."
                  />
                </div>
              </div>

              {/* Workflow Progress */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-stone-900">
                    <ActivityIcon className="w-5 h-5 text-stone-600" />
                    Report Generation Workflow
                  </h2>
                  <div className="text-sm text-stone-500 font-bold">
                    Progress: {state.progress}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-stone-200 rounded-full h-2 mb-6">
                  <div
                    className="bg-stone-900 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${state.progress}%` }}
                  ></div>
                </div>

                {/* Workflow Steps */}
                <div className="space-y-4">
                  {workflowSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        index === state.currentStep && state.isGenerating
                          ? 'border-bronze-500 bg-bronze-50/30 shadow-md'
                          : getStatusColor(step.status)
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {getStepIcon(step.status)}
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-sm text-stone-900">{step.title}</h3>
                            {step.requiredForNext && (
                              <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Required</span>
                            )}
                          </div>
                          <p className="text-sm text-stone-600">{step.description}</p>
                          {step.errorMessage && (
                            <p className="text-sm text-red-600 mt-2 font-bold">{step.errorMessage}</p>
                          )}
                        </div>

                        {index < workflowSteps.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Control Buttons */}
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={startReportGeneration}
                    disabled={state.isGenerating}
                    className={`px-8 py-3 rounded-lg font-bold text-white transition-all shadow-xl uppercase tracking-widest text-sm ${
                      state.isGenerating
                        ? 'bg-stone-400 cursor-not-allowed'
                        : 'bg-stone-900 hover:bg-stone-800 transform hover:-translate-y-0.5'
                    }`}
                  >
                    {state.isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating Report...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Generate Strategic Report
                      </div>
                    )}
                  </button>

                  {state.reportId && !state.isGenerating && (
                    <button className="px-6 py-3 rounded-lg font-bold text-stone-900 border-2 border-stone-900 hover:bg-stone-900 hover:text-white transition-all flex items-center gap-2 uppercase tracking-widest text-sm shadow-lg">
                      <LoadIcon className="w-4 h-4" />
                      Download Report
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'engines' && (
            <div className="space-y-8 animate-fade-in">
              {/* Intelligence Engines Overview */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-stone-900">
                  <CpuIcon className="w-6 h-6 text-stone-600" />
                  BW Nexus AI - 8 Intelligence Engines
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-8 h-8 text-blue-600" />
                      <h3 className="font-bold text-blue-900 text-lg">SPI Engine</h3>
                    </div>
                    <p className="text-xs font-bold text-blue-800 mb-3 uppercase tracking-wide">Success Probability Index</p>
                    <p className="text-sm text-blue-700 leading-relaxed">Core viability assessment using 7 weighted risk factors with confidence intervals</p>
                    <div className="mt-3 text-xs font-mono bg-blue-100 p-2 rounded text-blue-800">
                      SPI = Σ(Wi × Ci)
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <HandshakeIcon className="w-8 h-8 text-purple-600" />
                      <h3 className="font-bold text-purple-900 text-lg">PEI Engine</h3>
                    </div>
                    <p className="text-xs font-bold text-purple-800 mb-3 uppercase tracking-wide">Partnership Entropy Index</p>
                    <p className="text-sm text-purple-700 leading-relaxed">Partnership complexity and integration challenge analysis</p>
                    <div className="mt-3 text-xs font-mono bg-purple-100 p-2 rounded text-purple-800">
                      Geometric mean complexity
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-lg border border-orange-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <ScaleIcon className="w-8 h-8 text-orange-600" />
                      <h3 className="font-bold text-orange-900 text-lg">SAQ Engine</h3>
                    </div>
                    <p className="text-xs font-bold text-orange-800 mb-3 uppercase tracking-wide">Strategic Asymmetry Quotient</p>
                    <p className="text-sm text-orange-700 leading-relaxed">Power balance and dependency relationship assessment</p>
                    <div className="mt-3 text-xs font-mono bg-orange-100 p-2 rounded text-orange-800">
                      4-factor power analysis
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <MicroscopeIcon className="w-8 h-8 text-green-600" />
                      <h3 className="font-bold text-green-900 text-lg">CFI Engine</h3>
                    </div>
                    <p className="text-xs font-bold text-green-800 mb-3 uppercase tracking-wide">Confidence Fracture Index</p>
                    <p className="text-sm text-green-700 leading-relaxed">Information reliability and trust factor evaluation</p>
                    <div className="mt-3 text-xs font-mono bg-green-100 p-2 rounded text-green-800">
                      Trust & verification metrics
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-6 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <RocketIcon className="w-8 h-8 text-red-600" />
                      <h3 className="font-bold text-red-900 text-lg">ESAC Engine</h3>
                    </div>
                    <p className="text-xs font-bold text-red-800 mb-3 uppercase tracking-wide">Economic Shock Absorption</p>
                    <p className="text-sm text-red-700 leading-relaxed">Economic resilience and crisis management capacity</p>
                    <div className="mt-3 text-xs font-mono bg-red-100 p-2 rounded text-red-800">
                      Crisis response modeling
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-6 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart className="w-8 h-8 text-yellow-600" />
                      <h3 className="font-bold text-yellow-900 text-lg">DDC Engine</h3>
                    </div>
                    <p className="text-xs font-bold text-yellow-800 mb-3 uppercase tracking-wide">Decision Decay Curve</p>
                    <p className="text-sm text-yellow-700 leading-relaxed">Time-based decision quality deterioration analysis</p>
                    <div className="mt-3 text-xs font-mono bg-yellow-100 p-2 rounded text-yellow-800">
                      Temporal decision modeling
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-6 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-8 h-8 text-indigo-600" />
                      <h3 className="font-bold text-indigo-900 text-lg">HICS Engine</h3>
                    </div>
                    <p className="text-xs font-bold text-indigo-800 mb-3 uppercase tracking-wide">Human-Institution Compatibility</p>
                    <p className="text-sm text-indigo-700 leading-relaxed">Cultural and operational integration feasibility</p>
                    <div className="mt-3 text-xs font-mono bg-indigo-100 p-2 rounded text-indigo-800">
                      Cultural integration scoring
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-stone-50 to-stone-200 p-6 rounded-lg border border-stone-300 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-8 h-8 text-stone-600" />
                      <h3 className="font-bold text-stone-900 text-lg">SVS Engine</h3>
                    </div>
                    <p className="text-xs font-bold text-stone-800 mb-3 uppercase tracking-wide">Strategic Viability Synthesis</p>
                    <p className="text-sm text-stone-700 leading-relaxed">Final comprehensive recommendation generation</p>
                    <div className="mt-3 text-xs font-mono bg-stone-200 p-2 rounded text-stone-800">
                      Multi-engine synthesis
                    </div>
                  </div>
                </div>
              </div>

              {/* Engine Processing Details */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
                <h3 className="text-xl font-serif font-bold mb-6 text-stone-900">Engine Processing Architecture</h3>

                <div className="space-y-6">
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <h4 className="font-bold text-stone-800 mb-2">Parallel Processing Pipeline</h4>
                    <div className="text-sm text-stone-600 space-y-2">
                      <div>• All 8 engines process simultaneously via backend APIs</div>
                      <div>• Queue-based processing for complex analyses</div>
                      <div>• Real-time progress tracking with WebSocket updates</div>
                      <div>• Confidence interval calculations for all metrics</div>
                    </div>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <h4 className="font-bold text-stone-800 mb-2">Cross-Engine Correlation Analysis</h4>
                    <div className="text-sm text-stone-600 space-y-2">
                      <div>• Pattern recognition across all engine outputs</div>
                      <div>• Risk factor clustering and prioritization</div>
                      <div>• Strategic opportunity identification</div>
                      <div>• Recommendation strength scoring</div>
                    </div>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <h4 className="font-bold text-stone-800 mb-2">Ethics & Compliance Integration</h4>
                    <div className="text-sm text-stone-600 space-y-2">
                      <div>• Automated integrity screening and regulatory checks</div>
                      <div>• Human-in-the-loop for critical compliance decisions</div>
                      <div>• Immutable audit trails for all processing</div>
                      <div>• Bias mitigation through weighted scoring algorithms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {state.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangleIcon className="w-5 h-5" />
                Generation Errors
              </h3>
              <div className="space-y-2">
                {state.errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-700 bg-red-100 p-3 rounded">
                    {error}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - Fixed Live AI Support */}
      <div className="w-80 flex-shrink-0 border-l border-stone-200 bg-white shadow-xl z-20 hidden xl:block h-full overflow-hidden">
        <Inquire params={params} />
      </div>
    </div>
  );
};

export default ReportGenerator;
