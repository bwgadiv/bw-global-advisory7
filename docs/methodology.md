
# Nexus Economic Intelligence Methodology

## 1. Success Probability Index (SPI)
**Type:** Deterministic Weighted Sum
**Range:** 0-100

The SPI is the primary viability metric. It is calculated using normalized inputs from the Mission Calibration and Context phases.

**Formula:**
$$SPI = \sum (W_i \times C_i)$$

**Weights ($W_i$):**
*   **Economic Readiness (ER) [0.25]:** Infrastructure quality + Labor availability.
*   **Symbiotic Fit (SP) [0.20]:** Capability match % derived from matchmaking engine.
*   **Political Stability (PS) [0.15]:** Inverse of Fragile States Index / Regional risk.
*   **Partner Reliability (PR) [0.15]:** Based on due diligence depth and track record.
*   **Ethics/Compliance (EA) [0.10]:** Binary pass/fail converted to score (Pass=100, Fail=0).
*   **Activation Velocity (CA) [0.10]:** Timeline realism factor.
*   **User Transparency (UT) [0.05]:** Data completeness score.

**Confidence Interval (CI):**
$$CI = SPI \pm (12 \times (1 - TransparencyScore))$$

---

## 2. Investment Velocity & Activation Score (IVAS)
**Type:** Probabilistic / Predictive
**Range:** 0-100

Predicts the *speed* of value realization.

**Formula:**
$$IVAS = (OppQuantum \times 0.45) + (SymbioticConfidence \times 0.45) + ((1 - Friction) \times 0.1)$$

*   **Opportunity Quantum:** Log-normalized market size estimate ($log_{10}(MarketSize)$).
*   **Symbiotic Confidence:** Weighted score of Partner Quality + Regional Incentives.
*   **Friction:** Regulatory barrier estimate (0.0 - 1.0).

---

## 3. Ethics Engine
**Type:** Rule-Based Safeguard

**Logic:**
1.  **BLOCK:** 
    *   Sanctions Match (OFAC/UN/EU)
    *   High-Risk Industry (Weapons, Extraction) without ESIA documentation.
2.  **CAUTION:** 
    *   CPI (Corruption Perception Index) < 40.
    *   PEP (Politically Exposed Person) detected.
3.  **PASS:** No flags detected.

*Overrides require manual admin intervention and are logged immutably.*
