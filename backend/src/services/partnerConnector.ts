
export async function searchPartners(criteria: any = {}) {
  if (process.env.DEMO_PARTNERS === 'true') {
    return [
      { id: 'sample-1', name: 'Sample Partner A', type: 'company', region: criteria.region || 'Global', score: 70, notes: 'Demo partner (enable DEMO_PARTNERS=true)' }
    ];
  }
  return [];
}
