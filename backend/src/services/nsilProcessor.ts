
export function assembleNSIL(caseId: string, payload: any, lais: any[], ivas: any, scf: any, matches: any[]) {
    const xml = `
<nsil:report id="${caseId}" timestamp="${new Date().toISOString()}">
  <nsil:context>
    <nsil:objective>${payload.objective}</nsil:objective>
    <nsil:region>${payload.region?.name}</nsil:region>
  </nsil:context>
  <nsil:lai_analysis>
    ${lais.map(l => `<nsil:asset id="${l.id}" score="${l.synergyScore}">${l.title}</nsil:asset>`).join('\n')}
  </nsil:lai_analysis>
  <nsil:ivas_score>${ivas?.ivasScore}</nsil:ivas_score>
  <nsil:scf_impact>${scf?.totalEconomicImpactUSD}</nsil:scf_impact>
  <nsil:matches>
    ${matches.map(m => `<nsil:partner name="${m.match.entityName}" type="${m.match.entityType}" rating="${m.rating.overallRating}" />`).join('\n')}
  </nsil:matches>
</nsil:report>
    `.trim();
    
    return { xml };
}
