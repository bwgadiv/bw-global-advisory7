
// Mock Partner Database Store
// In production, this connects to the Postgres 'partners' table.

export interface Partner {
    id: string;
    name: string;
    location: string;
    sectors: string[];
    keywords: string[];
    capacity_index: number;
    track_record_score: number;
    incentives_present: boolean;
    regulatory_friction: number;
    risk_score: number;
    infraProximity: number;
    skillOverlap: number;
    supplyOverlap: number;
    contact_name: string;
    contact_email: string;
}

const MOCK_PARTNERS: Partner[] = [
    {
        id: "p-001",
        name: "Pagadian Logistics Hub",
        location: "Pagadian City, Philippines",
        sectors: ["Logistics", "Infrastructure", "Agriculture"],
        keywords: ["shipping", "warehouse", "cold chain"],
        capacity_index: 0.8,
        track_record_score: 0.7,
        incentives_present: true,
        regulatory_friction: 0.3,
        risk_score: 0.2,
        infraProximity: 0.9,
        skillOverlap: 0.7,
        supplyOverlap: 0.8,
        contact_name: "Maria Santos",
        contact_email: "partnerships@pagadianhub.ph"
    },
    {
        id: "p-002",
        name: "Vietnam Tech Manufacturing Corp",
        location: "Ho Chi Minh City, Vietnam",
        sectors: ["Manufacturing", "Technology", "Electronics"],
        keywords: ["assembly", "pcb", "skilled labor"],
        capacity_index: 0.9,
        track_record_score: 0.85,
        incentives_present: true,
        regulatory_friction: 0.4,
        risk_score: 0.3,
        infraProximity: 0.8,
        skillOverlap: 0.9,
        supplyOverlap: 0.6,
        contact_name: "Nguyen Van Minh",
        contact_email: "bizdev@vtmc.vn"
    },
    {
        id: "p-003",
        name: "Nairobi Green Energy Coop",
        location: "Nairobi, Kenya",
        sectors: ["Energy", "Renewable", "Infrastructure"],
        keywords: ["solar", "grid", "sustainable"],
        capacity_index: 0.6,
        track_record_score: 0.6,
        incentives_present: false,
        regulatory_friction: 0.5,
        risk_score: 0.4,
        infraProximity: 0.5,
        skillOverlap: 0.6,
        supplyOverlap: 0.4,
        contact_name: "David Ochieng",
        contact_email: "connect@greenenergy.ke"
    },
    {
        id: "p-004",
        name: "Gdansk Maritime Services",
        location: "Gdansk, Poland",
        sectors: ["Logistics", "Maritime", "Manufacturing"],
        keywords: ["shipping", "eu access", "port"],
        capacity_index: 0.85,
        track_record_score: 0.9,
        incentives_present: true,
        regulatory_friction: 0.2,
        risk_score: 0.1,
        infraProximity: 0.95,
        skillOverlap: 0.8,
        supplyOverlap: 0.7,
        contact_name: "Jakub Kowalski",
        contact_email: "info@gdanskmaritime.pl"
    },
    {
        id: "p-005",
        name: "São Paulo AgriTech Solutions",
        location: "São Paulo, Brazil",
        sectors: ["Agriculture", "Technology", "Biotech"],
        keywords: ["farming", "drones", "automation"],
        capacity_index: 0.75,
        track_record_score: 0.7,
        incentives_present: true,
        regulatory_friction: 0.6,
        risk_score: 0.4,
        infraProximity: 0.6,
        skillOverlap: 0.8,
        supplyOverlap: 0.5,
        contact_name: "Ana Silva",
        contact_email: "contact@spagritech.br"
    }
];

export const partnerStore = {
    searchPartners: async (sectors: string[], region?: string) => {
        // Simulate DB latency
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return MOCK_PARTNERS.filter(p => {
            const sectorMatch = sectors.length === 0 || p.sectors.some(s => sectors.some(req => s.includes(req) || req.includes(s)));
            // Loose region matching for demo purposes
            // const regionMatch = !region || p.location.includes(region) || region.includes("Global"); 
            // For demo, return all matches sorted by score if region doesn't match perfectly
            return sectorMatch;
        });
    }
};
