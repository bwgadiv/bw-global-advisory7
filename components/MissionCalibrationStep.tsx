
import React, { useState, useEffect } from 'react';
import { ReportParameters } from '../types';
import { Target, Layers, ShieldCheckIcon, Users, ArrowUpIcon, TrashIcon, PlusCircleIcon } from './Icons';
import { ManualInputModal } from './ManualInputModal';

interface MissionCalibrationStepProps {
    params: ReportParameters;
    onParamsChange: (params: ReportParameters) => void;
}

// Predefined Options
const PROBLEM_ARCHITECTURES = [
    'Supply Chain Fragility', 'Market Saturation', 'Regulatory Barrier', 'Capital Inefficiency',
    'Talent Shortage', 'Technological Obsolescence', 'Geopolitical Exposure', 'Brand Erosion',
    'Cost Structure Inflation', 'Partner Misalignment', 'Innovation Stagnation'
];

const CAPABILITY_TAGS = [
    'Liquid Capital', 'Proprietary IP', 'Global Logistics Network', 'Regulatory Licenses',
    'Skilled Workforce', 'Raw Material Access', 'Government Relations', 'Brand Equity',
    'Manufacturing Base', 'R&D Facilities', 'Data Infrastructure', 'Land Banks'
];

const PARTNER_TYPES = [
    'Government (Federal)', 'SOE (State Owned Enterprise)', 'MNC (Multinational)', 
    'SME (Local)', 'Financial Institution', 'NGO / Development Agency', 
    'Academic / Research', 'Private Equity / VC'
];

export const MissionCalibrationStep: React.FC<MissionCalibrationStepProps> = ({ params, onParamsChange }) => {
    const [calib, setCalib] = useState(params.calibration || {
        problemArchitecture: '',
        capabilitiesHave: [],
        capabilitiesNeed: [],
        constraints: { budgetCap: '', excludedRegions: [], ethicalRedLines: [] },
        partnerPreferences: { types: [], size: [] }
    });

    // Manual Entry Modal State
    const [manualModal, setManualModal] = useState<{ isOpen: boolean; type: 'problem' | 'have' | 'need' | 'partnerType'; title: string }>({
        isOpen: false,
        type: 'problem',
        title: ''
    });

    // Sync local state to parent whenever it changes
    useEffect(() => {
        onParamsChange({ ...params, calibration: calib });
    }, [calib]);

    const toggleItem = (list: string[], item: string) => {
        return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    };

    const openManual = (type: 'problem' | 'have' | 'need' | 'partnerType', title: string) => {
        setManualModal({ isOpen: true, type, title });
    };

    const handleManualSave = (val: string) => {
        if (manualModal.type === 'problem') {
            setCalib({ ...calib, problemArchitecture: val });
        } else if (manualModal.type === 'have') {
            setCalib({ ...calib, capabilitiesHave: [...calib.capabilitiesHave, val] });
        } else if (manualModal.type === 'need') {
            setCalib({ ...calib, capabilitiesNeed: [...calib.capabilitiesNeed, val] });
        } else if (manualModal.type === 'partnerType') {
            setCalib({ ...calib, partnerPreferences: { ...calib.partnerPreferences, types: [...calib.partnerPreferences.types, val] }});
        }
        setManualModal(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold flex items-center gap-3">
                    <Target className="w-6 h-6 text-orange-500" />
                    Step 3.5: Mission Calibration
                </h3>
                <p className="text-slate-400 text-sm mt-1 max-w-3xl">
                    The Economic Intelligence OS requires structured inputs to run deep simulations. 
                    Please define your problem architecture, capability gaps, and operational constraints.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                
                {/* 1. Problem Architecture */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-600" /> Problem Architecture
                    </h4>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Core Structural Challenge</label>
                    <select 
                        className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-blue-900 outline-none"
                        value={calib.problemArchitecture}
                        onChange={e => {
                            if(e.target.value === 'Manual') {
                                openManual('problem', 'Custom Structural Challenge');
                            } else {
                                setCalib({ ...calib, problemArchitecture: e.target.value });
                            }
                        }}
                    >
                        <option value="">Select Primary Structural Issue...</option>
                        {PROBLEM_ARCHITECTURES.map(p => <option key={p} value={p}>{p}</option>)}
                        <option value="Manual">Other / Custom...</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-2 italic">
                        This defines which heuristic models (IVAS, SPI) are prioritized by the orchestrator.
                    </p>
                </div>

                {/* 2. Constraints & Red Lines */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <ShieldCheckIcon className="w-5 h-5 text-red-600" /> Operational Constraints
                    </h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Budget / Investment Cap</label>
                            <input 
                                type="text" 
                                placeholder="e.g. $50M USD" 
                                className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                                value={calib.constraints.budgetCap}
                                onChange={e => setCalib({ ...calib, constraints: { ...calib.constraints, budgetCap: e.target.value } })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Excluded Regions (Red Lines)</label>
                            <div className="flex gap-2">
                                <input 
                                    id="exclude-region-input"
                                    type="text" 
                                    placeholder="e.g. Sanctioned Zones" 
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                                    onKeyDown={e => {
                                        if(e.key === 'Enter') {
                                            const val = e.currentTarget.value;
                                            if(val) {
                                                setCalib({...calib, constraints: {...calib.constraints, excludedRegions: [...(calib.constraints.excludedRegions || []), val]}});
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {calib.constraints.excludedRegions?.map(r => (
                                    <span key={r} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded flex items-center gap-1 border border-red-100">
                                        {r} <button onClick={() => setCalib({...calib, constraints: {...calib.constraints, excludedRegions: calib.constraints.excludedRegions?.filter(x => x !== r)}})}><TrashIcon className="w-3 h-3" /></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Capability Matrix (Have vs Need) */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ArrowUpIcon className="w-5 h-5 text-green-600" /> Capability Exchange Profile
                </h4>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Capabilities HAVE */}
                    <div>
                        <h5 className="text-sm font-bold text-slate-700 mb-3 border-b pb-2">Assets You Possess (Leverage)</h5>
                        <div className="flex flex-wrap gap-2">
                            {CAPABILITY_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setCalib({ ...calib, capabilitiesHave: toggleItem(calib.capabilitiesHave, tag) })}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                                        calib.capabilitiesHave.includes(tag)
                                        ? 'bg-green-600 text-white border-green-600'
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-green-300'
                                    }`}
                                >
                                    {calib.capabilitiesHave.includes(tag) ? '✓ ' : '+ '}{tag}
                                </button>
                            ))}
                            <button 
                                onClick={() => openManual('have', 'Add Custom Asset')}
                                className="px-3 py-1.5 rounded-full text-xs font-bold border border-dashed border-slate-300 text-slate-500 hover:border-green-500 hover:text-green-600 flex items-center gap-1"
                            >
                                <PlusCircleIcon className="w-3 h-3" /> Custom
                            </button>
                        </div>
                    </div>

                    {/* Capabilities NEED */}
                    <div>
                        <h5 className="text-sm font-bold text-slate-700 mb-3 border-b pb-2">Assets Required (Gap)</h5>
                        <div className="flex flex-wrap gap-2">
                            {CAPABILITY_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setCalib({ ...calib, capabilitiesNeed: toggleItem(calib.capabilitiesNeed, tag) })}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                                        calib.capabilitiesNeed.includes(tag)
                                        ? 'bg-orange-500 text-white border-orange-500'
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-orange-300'
                                    }`}
                                >
                                    {calib.capabilitiesNeed.includes(tag) ? '✓ ' : '+ '}{tag}
                                </button>
                            ))}
                            <button 
                                onClick={() => openManual('need', 'Add Custom Requirement')}
                                className="px-3 py-1.5 rounded-full text-xs font-bold border border-dashed border-slate-300 text-slate-500 hover:border-orange-500 hover:text-orange-600 flex items-center gap-1"
                            >
                                <PlusCircleIcon className="w-3 h-3" /> Custom
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Partner Archetype */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" /> Ideal Partner Archetype
                </h4>
                <div className="flex flex-wrap gap-2">
                    {PARTNER_TYPES.map(type => (
                        <button
                            key={type}
                            onClick={() => setCalib({ 
                                ...calib, 
                                partnerPreferences: { 
                                    ...calib.partnerPreferences, 
                                    types: toggleItem(calib.partnerPreferences.types, type) 
                                } 
                            })}
                            className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                                calib.partnerPreferences.types.includes(type)
                                ? 'bg-purple-900 text-white border-purple-900'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-purple-50'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                    <button 
                        onClick={() => openManual('partnerType', 'Add Custom Partner Type')}
                        className="px-4 py-2 rounded-lg text-xs font-bold border border-dashed border-slate-300 text-slate-500 hover:border-purple-500 hover:text-purple-600 flex items-center gap-1"
                    >
                        <PlusCircleIcon className="w-3 h-3" /> Custom
                    </button>
                </div>
            </div>

            <ManualInputModal 
                isOpen={manualModal.isOpen}
                title={manualModal.title}
                label="Custom Entry"
                onClose={() => setManualModal(prev => ({ ...prev, isOpen: false }))}
                onSave={handleManualSave}
            />
        </div>
    );
};
