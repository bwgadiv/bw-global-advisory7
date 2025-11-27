
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ScaleIcon, LockIcon, Users, BookOpenIcon, NexusLogo, CloseIcon } from './Icons';

interface LegalInfoHubProps {
    onBack: () => void;
    initialSection?: string;
}

const SECTIONS = [
    { id: 'ethical-framework', title: 'Ethical AI Framework', icon: ShieldCheck },
    { id: 'terms', title: 'Terms of Service', icon: ScaleIcon },
    { id: 'privacy', title: 'Privacy Policy', icon: LockIcon },
    { id: 'company', title: 'Company Profile', icon: Users },
    { id: 'narrative', title: 'Development Narrative', icon: BookOpenIcon },
];

export const LegalInfoHub: React.FC<LegalInfoHubProps> = ({ onBack, initialSection }) => {
    const [activeSection, setActiveSection] = useState('ethical-framework');

    useEffect(() => {
        if (initialSection) {
            scrollToSection(initialSection);
        }
    }, [initialSection]);

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="flex h-screen bg-stone-50 overflow-hidden font-sans text-stone-900">
            {/* Sidebar Navigation */}
            <aside className="w-80 bg-white border-r border-stone-200 flex flex-col flex-shrink-0 z-20 shadow-sm">
                <div className="p-6 border-b border-stone-100 flex items-center gap-3 cursor-pointer" onClick={onBack}>
                    <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
                        <NexusLogo className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-serif font-bold text-stone-900 leading-none">BW Nexus</h1>
                        <span className="text-[10px] text-bronze-600 font-bold uppercase tracking-widest">Governance Center</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-lg transition-all duration-200 text-left ${
                                activeSection === section.id
                                    ? 'bg-stone-900 text-white shadow-md'
                                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                            }`}
                        >
                            <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-bronze-400' : 'currentColor'}`} />
                            {section.title}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-stone-100">
                    <button 
                        onClick={onBack}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-stone-300 rounded-lg text-xs font-bold text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    >
                        <CloseIcon className="w-4 h-4" />
                        Return to Platform
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto scroll-smooth bg-stone-50">
                <div className="max-w-4xl mx-auto p-8 md:p-12 space-y-16">
                    
                    {/* --- ETHICAL FRAMEWORK --- */}
                    <section id="ethical-framework" className="scroll-mt-12">
                        <div className="mb-8 border-b border-stone-200 pb-6">
                            <span className="text-bronze-700 font-bold uppercase tracking-widest text-xs mb-2 block">Governance Doctrine</span>
                            <h2 className="text-4xl font-serif font-bold text-stone-900">Ethical AI & Data Governance Framework</h2>
                            <p className="text-stone-500 mt-2 font-mono text-xs">Version 1.0 | May 2025</p>
                        </div>

                        <div className="prose prose-stone max-w-none text-sm leading-relaxed text-stone-700">
                            <h3 className="text-lg font-bold text-stone-900 mt-8 mb-4">1. Statement of Commitment</h3>
                            <p>
                                BW Global Advisory (“BWGA”) is founded upon the principle that artificial intelligence, economic intelligence systems, and advanced analytical technologies must be developed and deployed with the highest degree of ethical responsibility, lawful compliance, and human accountability. The firm acknowledges that the power of advanced computational systems carries a corresponding obligation to ensure that technology is never used in a manner that compromises human rights, privacy, transparency, social stability, economic fairness, or the dignity of communities.
                            </p>
                            <p>
                                The BWGA Nexus™ platform has been architected not merely as a technical product, but as a governance-driven intelligence system built upon rigorous internal controls, ethical safeguards, and formal oversight structures. BWGA affirms that artificial intelligence must always function as a decision-support system under human supervision and must never operate as an autonomous authority in matters affecting communities, capital allocation, government decision-making, or socio-economic development.
                            </p>
                            <p>
                                This Ethical AI and Data Governance Framework establishes the binding principles, internal standards, and operational policies governing how BWGA designs, develops, deploys, audits, and continuously improves its artificial intelligence systems and associated data infrastructure. This document is not intended as promotional material. It constitutes formal policy and internal doctrine, applicable to all personnel, contractors, platform deployments, and business engagements worldwide.
                            </p>

                            <h3 className="text-lg font-bold text-stone-900 mt-8 mb-4">2. Human Authority and Decision Governance</h3>
                            <p>
                                BWGA affirms without qualification that artificial intelligence shall never replace human authority. All outputs produced by the BWGA Nexus engine are advisory in nature and exist solely to assist decision-makers. No output, recommendation, forecast, ranking, simulation, or matched opportunity is to be regarded as deterministic, final, or binding.
                            </p>
                            <p>
                                All strategic intelligence produced by BWGA is subject to human review, contextual interpretation, and executive validation prior to release or use. The presence of a human review layer is mandatory for all high-impact outputs. Where political sensitivity, financial exposure, regulatory complexity, or community impact is present, final authority rests solely with qualified human personnel.
                            </p>
                            <p>
                                BWGA strictly prohibits any form of automated governance, automated investment execution, automated decision-making authority, or AI-driven recommendation issuance without human sign-off.
                            </p>

                            <h3 className="text-lg font-bold text-stone-900 mt-8 mb-4">3. Lawful Processing and Global Regulatory Compliance</h3>
                            <p>
                                BWGA operates as an international entity and therefore adopts a compliance-by-design methodology in which regulatory conditions are embedded into systems architecture rather than treated as afterthoughts. The firm aligns its operations with major international regulatory standards, including but not limited to the European Union General Data Protection Regulation (GDPR), the Australian Privacy Act, the Philippine Data Privacy Act of 2012, emerging Asian data localization frameworks, and OECD-aligned data ethics principles.
                            </p>
                            <p>
                                Where legal frameworks differ across jurisdictions, BWGA applies the stricter regulatory standard as its baseline internal policy. This includes, but is not limited to, data retention requirements, lawful basis tests, subject rights enforcement, and cross-border data transfer mechanisms.
                            </p>
                            <p>
                                BWGA does not proceed with data processing activities unless a lawful basis is present, whether arising from contract, legitimate interest, consent, or statutory authorization. In all engagements, clients warrant that supplied data has been lawfully acquired and disclosed. BWGA reserves the right to refuse processing where compliance cannot be verified.
                            </p>

                            <h3 className="text-lg font-bold text-stone-900 mt-8 mb-4">4. Data Collection, Limitation and Integrity Control</h3>
                            <p>
                                BWGA’s data strategy is governed by the principle of data restraint. The firm collects and processes only those data necessary to fulfill legitimate analytical and development purposes. Primary data sources consist of publicly accessible economic indicators, international datasets, government statistics, licensed content, and lawfully acquired third-party information.
                            </p>
                            <p>
                                BWGA does not collect biometric information, surveillance data, personal monitoring data, behavioral tracking information, surveillance feeds, communications content, or private correspondence.
                            </p>
                            <p>
                                All data passing through BWGA systems is subject to quality checks, validation logic, timestamp tracking, and integrity safeguards. Where data quality deficiencies exist, those limitations are disclosed in output documentation. Where predictive uncertainty exceeds internal thresholds, the system flags confidence insufficiency to human reviewers.
                            </p>

                            <h3 className="text-lg font-bold text-stone-900 mt-8 mb-4">5. Security Architecture and Risk Control</h3>
                            <p>
                                BWGA operates a security-first architecture. System design incorporates encryption, identity controls, role-based permissions, access logging, and abuse prevention mechanisms. Proprietary architectures are protected under trade-secret doctrine and confidential methodologies are compartmentalised through internal access policies.
                            </p>
                            <p>
                                BWGA implements layered protection against misuse, data theft, unauthorised access, and system compromise. Disaster recovery planning, integrity verification, intrusion monitoring, and continuity planning form integral components of the operational model. No data is sold, exchanged, monetised, or transferred without explicit authorisation.
                            </p>

                            <h3 className="text-lg font-bold text-stone-900 mt-8 mb-4">6. Ethical Safeguards and Limitation of Use</h3>
                            <p>
                                BWGA explicitly prohibits the use of its systems for political manipulation, disinformation, electoral interference, propaganda, social manipulation, financial market distortion, regulatory evasion, or corrupt facilitation. Any request that contravenes ethical boundaries, legal compliance, or social responsibility is refused without negotiation.
                            </p>
                            <p>
                                BWGA reserves the right to terminate engagement where improper conduct is suspected or ethical breaches are identified.
                            </p>

                            <h3 className="text-lg font-bold text-stone-900 mt-8 mb-4">7. Incident Response and Accountability</h3>
                            <p>
                                BWGA operates a formal incident response framework. Any suspected breach, ethical concern, or operational anomaly triggers an internal review process. Incidents are documented, analysed, corrected, and escalated as appropriate. Where required by law, impacted parties are notified. Ultimate accountability rests with BWGA leadership.
                            </p>
                        </div>
                    </section>

                    {/* --- TERMS OF SERVICE --- */}
                    <section id="terms" className="scroll-mt-12 pt-12 border-t border-stone-200">
                        <div className="mb-8">
                            <span className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-2 block">Legal Agreement</span>
                            <h2 className="text-3xl font-serif font-bold text-stone-900">Terms and Conditions of Service</h2>
                            <p className="text-stone-500 mt-2 font-mono text-xs">Effective May 2025</p>
                        </div>
                        <div className="prose prose-stone max-w-none text-sm leading-relaxed text-stone-700 bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
                            <p>
                                BW Global Advisory Pty Ltd (“BWGA”) provides strategic intelligence, analytical products, advisory services, and AI-assisted research capabilities. The services offered are informational in nature and do not constitute legal advice, financial advice, investment advice, regulatory opinion, or government approval.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>BWGA makes no representation that any forecast, model, scenario analysis, risk simulation, or output will materialise in real-world performance. No warranties, express or implied, are provided regarding future outcomes.</li>
                                <li>BWGA is not a licensed broker, investment intermediary, legal practice, or accounting firm.</li>
                                <li>Clients acknowledge that all intelligence is provided for strategic evaluation only and must be independently verified prior to reliance.</li>
                                <li>All reports, insights, frameworks, methodologies, and documentation remain the intellectual property of BWGA and may not be redistributed, resold, published, or reproduced without written permission.</li>
                                <li>Confidentiality obligations bind clients and partners to non-disclosure concerning proprietary materials.</li>
                                <li>BWGA’s total liability is limited to the value of fees paid.</li>
                                <li>BWGA reserves the right to cease service immediately upon breach, misuse, or misrepresentation.</li>
                                <li>Australian law governs unless otherwise agreed in writing.</li>
                            </ul>
                        </div>
                    </section>

                    {/* --- PRIVACY POLICY --- */}
                    <section id="privacy" className="scroll-mt-12 pt-12 border-t border-stone-200">
                        <div className="mb-8">
                            <span className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-2 block">Data Protection</span>
                            <h2 className="text-3xl font-serif font-bold text-stone-900">Privacy Policy & Data Handling</h2>
                        </div>
                        <div className="prose prose-stone max-w-none text-sm leading-relaxed text-stone-700">
                            <p>
                                BWGA is committed to lawful handling of all personal data. The firm processes personal data only where necessary and lawful, and only for defined purposes.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-6">
                                <div className="bg-stone-100 p-6 rounded-lg">
                                    <h4 className="font-bold text-stone-900 mb-2">Commercial Usage</h4>
                                    <p className="text-xs text-stone-600">Personal information is not sold or shared for commercial exploitation. Data is used strictly for the delivery of intelligence services.</p>
                                </div>
                                <div className="bg-stone-100 p-6 rounded-lg">
                                    <h4 className="font-bold text-stone-900 mb-2">Subject Rights</h4>
                                    <p className="text-xs text-stone-600">Where personal data is processed, the firm ensures data subjects retain rights to access, correction, restriction and deletion under applicable law.</p>
                                </div>
                                <div className="bg-stone-100 p-6 rounded-lg">
                                    <h4 className="font-bold text-stone-900 mb-2">Security</h4>
                                    <p className="text-xs text-stone-600">All personal data is stored securely and retained only as necessary using enterprise-grade encryption and access controls.</p>
                                </div>
                                <div className="bg-stone-100 p-6 rounded-lg">
                                    <h4 className="font-bold text-stone-900 mb-2">No Surveillance</h4>
                                    <p className="text-xs text-stone-600">BWGA does not conduct surveillance, profiling, or user tracking.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- COMPANY PROFILE --- */}
                    <section id="company" className="scroll-mt-12 pt-12 border-t border-stone-200">
                        <div className="mb-8">
                            <span className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-2 block">About The Firm</span>
                            <h2 className="text-3xl font-serif font-bold text-stone-900">Company Profile</h2>
                        </div>
                        <div className="bg-stone-900 text-stone-300 p-8 rounded-xl shadow-lg prose prose-invert max-w-none leading-relaxed">
                            <p className="text-lg text-white font-medium">
                                BW Global Advisory is an international advisory and intelligence firm dedicated to unlocking regional economic potential through structured intelligence, ethical AI deployment, and policy-aligned strategic analysis.
                            </p>
                            <p>
                                BWGA exists to correct the imbalance between global capital and regional opportunity. It operates at the intersection of data, economics, governance and development with a singular mission: transform overlooked regions into investable, governable and viable economic destinations.
                            </p>
                            <p>
                                The firm does not operate as a sales engine, brokerage service, or consulting franchise. It functions as an intelligence architecture partner to institutions, governments and enterprises requiring analytical clarity in complex environments.
                            </p>
                        </div>
                    </section>

                    {/* --- DEVELOPMENT NARRATIVE --- */}
                    <section id="narrative" className="scroll-mt-12 pt-12 border-t border-stone-200">
                        <div className="mb-8">
                            <span className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-2 block">Origin Story</span>
                            <h2 className="text-3xl font-serif font-bold text-stone-900">Why This System Exists</h2>
                        </div>
                        <div className="prose prose-stone max-w-none text-sm leading-relaxed text-stone-700">
                            <p>
                                BWGA Nexus was built as a response to repeated field observations that emerging regions are structurally excluded not because they lack value, but because they lack visibility, infrastructure articulation and governance translation.
                            </p>
                            <p className="font-medium italic text-stone-900 border-l-4 border-bronze-500 pl-4 my-4">
                                Where conventional systems rely on static data, BWGA designed dynamic intelligence.<br/>
                                Where others rely on generic market ratings, BWGA engineered intelligence to account for cultural, regulatory, infrastructural and institutional systems.<br/>
                                Where global finance values simplicity, BWGA models complexity.
                            </p>
                        </div>
                    </section>

                    {/* --- FOOTER --- */}
                    <div className="pt-20 pb-12 text-center border-t border-stone-200">
                        <NexusLogo className="w-10 h-10 text-stone-300 mx-auto mb-4" />
                        <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">BW Global Advisory Pty Ltd</p>
                        <p className="text-xs text-stone-400 mt-2">ABN: 55 978 113 300</p>
                    </div>

                </div>
            </main>
        </div>
    );
};
