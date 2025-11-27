
export function getEntityRating(entityName: string, entityType: string) {
    return {
        overallRating: 'amber',
        score: 65,
        factors: {
            financial: 70,
            reputation: 60,
            compliance: 65
        }
    };
}
