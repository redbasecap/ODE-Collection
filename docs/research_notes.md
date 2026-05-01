# Research Notes: Mental and Medical ODE Expansion

Last reviewed: 2026-05-01

This repo is an educational ODE atlas, not a medical device. The models below are
reduced-form scaffolds for hypothesis generation, teaching, and future data-model
design. They deliberately avoid clinical thresholds, diagnosis, dosing advice, or
patient-specific recommendations.

## Design Principle

The new mental-health models follow a transdiagnostic style: instead of treating
diagnoses as single fixed mechanisms, they represent measurable latent processes
such as threat, reward, arousal, sleep, inflammatory load, and control. This is
aligned with the NIMH RDoC framing of mental health as dysfunction across
psychological and biological systems, not as a replacement for diagnosis.

## New Model Map

| IDs | Theme | Scientific idea encoded |
| --- | --- | --- |
| 91-94 | Depression, stress, reward | HPA-axis feedback, circadian driving, bistability, rumination, reward sensitivity, and social-cognitive buffering. |
| 95, 119 | Antidepressant response and expectation | Fast pharmacologic perturbation plus slower adaptation, symptom burden, placebo/nocebo expectation, and adherence. |
| 96-103 | Anxiety, PTSD, addiction, bipolar dynamics | Fear extinction, interoceptive panic loops, craving/control, nonlinear mood oscillation, exposure learning, and attentional control. |
| 100-105 | Social and physiology-linked psychiatry | Social isolation attractors, digital relapse observers, HRV/autonomic balance, cytokines, and gut-brain loops. |
| 106-110, 118 | Translational medicine | Tumor-immune therapy, HIV viral dynamics, sepsis inflammation, antibiotic resistance, cancer resistance, and asthma inflammation. |
| 111-115 | Neurology and pain | Amyloid-tau-microglia cascades, dopamine neuron loss, excitation-inhibition seizure risk, migraine waves, and chronic pain sensitization. |
| 116-117, 120 | Future clinical systems | Glucose-insulin-beta-cell compensation, RAAS pressure regulation, and adaptive closed-loop digital care. |

## Papers and Sources Reviewed

- NIMH RDoC: supports modeling mental illness through measurable
  neurobehavioral domains and dimensions rather than only diagnostic labels.
  Source: <https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc/about-rdoc>
- NIMH RDoC FAQ: notes that RDoC-style studies often integrate multiple units of
  analysis and computational approaches. Source:
  <https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc/resources/rdoc-frequently-asked-questions-faq>
- HPA-axis mathematical modeling: CRH, ACTH, cortisol, glucocorticoid receptor
  dynamics, and bistability motivate models 91-92. Sources:
  <https://tbiomed.biomedcentral.com/articles/10.1186/1742-4682-4-8>,
  <https://www.sciencedirect.com/science/article/pii/S2001037020304578>,
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC4568136/>
- Bipolar mood dynamics and learned expectation motivate the nonlinear mood
  oscillator in model 99. Source:
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC6317753/>
- Digital phenotyping and relapse monitoring motivate model 101 and the
  closed-loop-care model 120. Sources:
  <https://www.jmir.org/2023/1/e46778/>,
  <https://link.springer.com/article/10.1186/s12888-026-08033-w>
- Antidepressant neuroadaptation, SSRI delay, and cognitive/neuroplastic
  adaptation motivate model 95. Sources:
  <https://www.frontiersin.org/articles/10.3389/fphar.2017.00925/full>,
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC3638386/>
- Wilson-Cowan neural-mass equations motivate the excitation-inhibition seizure
  skeleton in model 113. Source:
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC4733815/>
- Mathematical and computational pain modeling motivates model 115. Sources:
  <https://academic.oup.com/painmedicine/article/22/12/2806/6288499>,
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC5510708/>
- Tumor-immune ODEs and checkpoint/immuno-chemotherapy models motivate models
  106 and 110. Sources:
  <https://www.mdpi.com/2227-7390/14/2/347>,
  <https://www.sciencedirect.com/science/article/pii/S1110016821001964>
- Within-host HIV viral dynamics motivate model 107. Source:
  <https://link.springer.com/article/10.1186/1741-7007-11-96>
- Acute inflammation and sepsis ODEs motivate model 108. Sources:
  <https://arxiv.org/abs/q-bio/0404034>,
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC6042260/>
- Alzheimer amyloid, tau, microglia, and neurodegeneration models motivate
  model 111. Sources:
  <https://bmcsystbiol.biomedcentral.com/counter/pdf/10.1186/s12918-016-0348-2.pdf>,
  <https://arxiv.org/abs/2504.13438>

## Research Gaps Preserved on Purpose

- No model is calibrated to patient data yet.
- Parameters are scale-free defaults chosen for stable visualization.
- Delay differential equations, stochastic terms, and Bayesian parameter
  inference are not implemented yet.
- Clinical-grade versions would need dataset provenance, uncertainty intervals,
  validation cohorts, ethics review, and human-subjects governance.

