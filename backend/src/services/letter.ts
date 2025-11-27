
export function generateOutreachLetter(caseRow: any, partner: any, meta: any) {
  const org = caseRow.payload.organizationType || "Our Organization";
  const project = caseRow.payload.problemStatement || "Strategic Partnership";
  const region = caseRow.payload.region || "your region";
  
  const intro = `Dear ${partner.contact_name || partner.name} Team,\n\nWe represent a ${org} looking to expand operations within ${region}. Based on our analysis of ${partner.location}, we believe a collaboration on "${project}" could deliver significant mutual economic benefits.`;
  
  const pitch = `Our proprietary Nexus analysis indicates a ${meta.ivas.humanReadable} activation potential with a Symbiosis Score of ${Math.round(meta.sym * 100)}. Your capacity index and infrastructure proximity align perfectly with our requirements.`;
  
  const close = `We propose an exploratory meeting to discuss this potential partnership further.\n\nSincerely,\n${caseRow.payload.userName || 'Strategic Director'}\n${caseRow.payload.userEmail || ''}`;
  
  return `${intro}\n\n${pitch}\n\n${close}`;
}
