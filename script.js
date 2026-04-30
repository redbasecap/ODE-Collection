const CATEGORIES = [
  { id: "ovarian", label: "A. Ovarielle Reserve", accent: "#ff5d73" },
  { id: "hormones", label: "B. Hormonelle Systeme", accent: "#33c2ff" },
  { id: "health", label: "C. Gesundheit, Sport, Ernaehrung", accent: "#45d483" },
  { id: "business", label: "D. Startups, Business, Wachstum", accent: "#ffb84d" },
  { id: "ai", label: "E. KI, Software, Plattformen", accent: "#b38cff" },
  { id: "finance", label: "F. Finanzen und Maerkte", accent: "#f4dc57" },
  { id: "physics", label: "G. Physik, Technik, Alltag", accent: "#65d7c9" },
  { id: "society", label: "H. Oekologie und Gesellschaft", accent: "#f08ad6" },
];

const MODELS = [
  {
    id: 1,
    category: "ovarian",
    name: "Einfache Eizellreserve-Abnahme",
    dynamic: "decay",
    formula: "dR/dt = -k R",
    description: "Basislinie fuer Reserveverlust mit konstanter Rate.",
    variables: ["R"],
    observables: "Reserve R, verbleibender Anteil",
    params: { k: 0.035, initial: 1 },
    preset: "decay",
  },
  {
    id: 2,
    category: "ovarian",
    name: "Altersbeschleunigte Reserve-Abnahme",
    dynamic: "decay",
    formula: "dR/dt = -k0 exp(alpha max(t - 30, 0)) R",
    description: "Reserveverlust beschleunigt sich mit zunehmendem Alter.",
    variables: ["R"],
    observables: "Reserve R, beschleunigter Abfall",
    params: { k: 0.015, alpha: 0.065, initial: 1 },
    preset: "ageDecay",
  },
  {
    id: 3,
    category: "ovarian",
    name: "Zwei-Phasen-Abbau vor/nach 35",
    dynamic: "decay",
    formula: "dR/dt = -k(t) R, k(t)=k1 fuer t<35 sonst k2",
    description: "Stueckweise Dynamik fuer langsamere und schnellere Reserveabnahme.",
    variables: ["R"],
    observables: "Reserve R, Knickpunkt t=35",
    params: { k1: 0.018, k2: 0.065, initial: 1 },
    preset: "twoPhase",
  },
  {
    id: 4,
    category: "ovarian",
    name: "Primordial -> primary -> antral follicle",
    dynamic: "compartment",
    formula: "P'=-lambda P; Q'=lambda P-mu Q; A'=mu Q-nu A",
    description: "Kompartimentfluss von fruehen zu antralen Follikeln.",
    variables: ["P", "Q", "A"],
    observables: "Primordial P, primary Q, antral A",
    params: { lambda: 0.018, mu: 0.06, nu: 0.09 },
    preset: "chain3",
  },
  {
    id: 5,
    category: "ovarian",
    name: "AMH-Feedback auf Follikelaktivierung",
    dynamic: "feedback",
    formula: "P'=-lambda0 P/(1+beta AMH); A'=lambda0 P/(1+beta AMH)-mu A; AMH'=rho A-c AMH",
    description: "AMH bremst Aktivierung und wird von antralen Follikeln erzeugt.",
    variables: ["P", "A", "AMH"],
    observables: "AMH, antrale Follikel, Reserve",
    params: { lambda: 0.045, beta: 1.6, mu: 0.08, rho: 0.35, c: 0.22 },
    preset: "feedbackAmh",
  },
  {
    id: 6,
    category: "ovarian",
    name: "AFC-Prognose aus Follikelpopulation",
    dynamic: "compartment",
    formula: "A'=s-d A; AFC'=eta A-gamma AFC",
    description: "AFC wird als geglaettete Beobachtung der antralen Population modelliert.",
    variables: ["A", "AFC"],
    observables: "Antrale Follikel A, AFC",
    params: { source: 0.18, d: 0.08, eta: 1.25, gamma: 0.35 },
    preset: "observer",
  },
  {
    id: 7,
    category: "ovarian",
    name: "IVF-Stimulationsantwort",
    dynamic: "resource",
    formula: "R'=-k R; A'=u(t) R/(Km+R)-m A; E'=q A-r E",
    description: "FSH-Input rekrutiert antrale Follikel und erzeugt erwartete Eizellen.",
    variables: ["R", "A", "E"],
    observables: "Reserve, antrale Antwort, erwartete Eizellen",
    params: { k: 0.012, u: 0.42, km: 0.25, m: 0.16, q: 0.18, r: 0.05 },
    preset: "stimulusResponse",
  },
  {
    id: 8,
    category: "ovarian",
    name: "Ovarialreserve nach Chemotherapie",
    dynamic: "shock",
    formula: "dR/dt = -k R - chi(t) R",
    description: "Akuter zusaetzlicher Verlustimpuls waehrend Chemotherapie.",
    variables: ["R"],
    observables: "Reserve vor/nach Therapieimpuls",
    params: { k: 0.018, shock: 0.62, center: 25, width: 5 },
    preset: "shockDecay",
  },
  {
    id: 9,
    category: "ovarian",
    name: "Radiotherapie-Schadensmodell",
    dynamic: "shock",
    formula: "dR/dt = -k R - s D(t) R",
    description: "Dosisabhaengiger Kill-Term fuer Reserveverlust.",
    variables: ["R"],
    observables: "Reserve, kumulative Dosiswirkung",
    params: { k: 0.016, shock: 0.5, center: 32, width: 8 },
    preset: "shockDecay",
  },
  {
    id: 10,
    category: "ovarian",
    name: "Endometriose-OP-Effekt",
    dynamic: "shock",
    formula: "dR/dt = -k R - s exp(-(t-ts)^2/(2w^2)) R",
    description: "Operationsereignis als schmaler Verlustimpuls.",
    variables: ["R"],
    observables: "Reserve mit OP-Sprung",
    params: { k: 0.019, shock: 0.75, center: 36, width: 2.2 },
    preset: "shockDecay",
  },
  {
    id: 11,
    category: "ovarian",
    name: "PCOS-Modell",
    dynamic: "feedback",
    formula: "A'=lambda P + e - m A; H'=a A - c H",
    description: "Hohe antrale Follikelzahl und veraenderte hormonelle Reifung.",
    variables: ["P", "A", "H"],
    observables: "Antrale Follikel, Androgen-/Hormonindex",
    params: { lambda: 0.012, excess: 0.13, m: 0.04, a: 0.22, c: 0.16 },
    preset: "pcos",
  },
  {
    id: 12,
    category: "ovarian",
    name: "Menopause-Schwellenmodell",
    dynamic: "threshold",
    formula: "R'=-k R; M'=sigma((Rc-R)/w)-d M",
    description: "Menopause-Signal steigt, sobald die Reserve unter eine Schwelle faellt.",
    variables: ["R", "M"],
    observables: "Reserve R, Schwellenwahrscheinlichkeit M",
    params: { k: 0.045, rc: 0.22, width: 0.04, d: 0.08 },
    preset: "threshold",
  },
  {
    id: 13,
    category: "ovarian",
    name: "AMH-Verlauf ueber Jahre",
    dynamic: "observer",
    formula: "A'=s-d A; AMH'=g A-c AMH",
    description: "AMH als dynamische Beobachtung antraler Follikel.",
    variables: ["A", "AMH"],
    observables: "AMH, antrale Population",
    params: { source: 0.2, d: 0.09, g: 0.9, c: 0.18 },
    preset: "observer",
  },
  {
    id: 14,
    category: "ovarian",
    name: "Zykluslaenge als Folge von Reserve",
    dynamic: "feedback",
    formula: "R'=-k R; C'=a(h(R)-C)",
    description: "Zykluslaenge passt sich langsam an Reserve und Follikeldynamik an.",
    variables: ["R", "Cycle"],
    observables: "Reserve, Zykluslaenge",
    params: { k: 0.028, adapt: 0.25, base: 27, sens: 5 },
    preset: "cycleLength",
  },
  {
    id: 15,
    category: "ovarian",
    name: "Oocyte freezing Planung",
    dynamic: "resource",
    formula: "R'=-k R; E'=q u(t) R/(Km+R)-r E",
    description: "Erwartete Eizellzahl pro Stimulationsfenster.",
    variables: ["R", "E"],
    observables: "Reserve, erwartete kumulierte Eizellen",
    params: { k: 0.012, u: 0.5, q: 0.34, km: 0.18, r: 0.015 },
    preset: "freezing",
  },
  {
    id: 16,
    category: "ovarian",
    name: "Risiko fuer poor responder",
    dynamic: "threshold",
    formula: "A'=-k A; P'=a(sigma((Ac-A)/w)-P)",
    description: "Risiko folgt einem geglaetteten AFC-Schwellenwert.",
    variables: ["A", "Risk"],
    observables: "AFC, Poor-responder-Risiko",
    params: { k: 0.04, ac: 0.32, width: 0.05, adapt: 0.5 },
    preset: "risk",
  },
  {
    id: 17,
    category: "ovarian",
    name: "Familien-Menoalter als Prior",
    dynamic: "feedback",
    formula: "R'=-k R; k'=a(k_family-k)",
    description: "Individueller Abbauparameter wird zu einem Familienprior gezogen.",
    variables: ["R", "k"],
    observables: "Reserve, persoenlicher Abbauparameter",
    params: { k: 0.035, familyK: 0.045, adapt: 0.06 },
    preset: "adaptiveDecayRate",
  },
  {
    id: 18,
    category: "ovarian",
    name: "Ovarialvolumen als Proxy",
    dynamic: "observer",
    formula: "R'=-k R; V'=a(c R^alpha - V)",
    description: "Ovarialvolumen folgt der Reserve als langsamem Proxy.",
    variables: ["R", "V"],
    observables: "Reserve, Volumenproxy",
    params: { k: 0.03, scale: 1.2, alpha: 0.7, adapt: 0.4 },
    preset: "powerProxy",
  },
  {
    id: 19,
    category: "ovarian",
    name: "FSH-Anstieg bei tiefer Reserve",
    dynamic: "feedback",
    formula: "R'=-k R; Inhibin'=rho R-cI I; FSH'=a-b I-cF FSH",
    description: "Inhibin sinkt mit Reserve, FSH steigt dadurch an.",
    variables: ["R", "Inhibin", "FSH"],
    observables: "Reserve, Inhibin, FSH",
    params: { k: 0.03, rho: 0.42, cI: 0.2, a: 0.5, b: 0.35, cF: 0.16 },
    preset: "fsh",
  },
  {
    id: 20,
    category: "ovarian",
    name: "Multi-Zyklus-IVF-Simulation",
    dynamic: "resource",
    formula: "R'=-k R-d u(t) Resp; Resp'=s u(t) R/(Km+R)-c Resp",
    description: "Reserve sinkt ueber mehrere Stimulationszyklen, Antwort schwankt.",
    variables: ["R", "Response"],
    observables: "Reserve, Zyklusantwort",
    params: { k: 0.01, drain: 0.05, s: 0.45, km: 0.2, c: 0.15, u: 0.8 },
    preset: "multiCycle",
  },
  {
    id: 21,
    category: "hormones",
    name: "Menstruationszyklus-Modell",
    dynamic: "rhythm",
    formula: "GnRH', LH', FSH', E', P' mit Feedback und circadianem Input",
    description: "Gekoppeltes Hormonnetz fuer GnRH, LH, FSH, Oestrogen und Progesteron.",
    variables: ["GnRH", "LH", "FSH", "E", "P"],
    observables: "LH-Surge, Oestrogen, Progesteron",
    params: { period: 28, feedback: 1.2 },
    preset: "cycleHormones",
  },
  {
    id: 22,
    category: "hormones",
    name: "LH-Surge-Modell",
    dynamic: "feedback",
    formula: "E'=rE(1-E/K)-dE E; LH'=b+g sigma(E-Ec)-c LH",
    description: "Positives Oestrogenfeedback erzeugt einen LH-Surge.",
    variables: ["E", "LH", "P"],
    observables: "Oestrogen, LH, Progesteron",
    params: { r: 0.2, k: 1.0, g: 2.5, ec: 0.58, c: 0.4 },
    preset: "lhSurge",
  },
  {
    id: 23,
    category: "hormones",
    name: "Schilddruesenhormon-Modell",
    dynamic: "feedback",
    formula: "TSH'=a/(1+b(T3+T4))-c TSH; T4'=p TSH-m T4; T3'=m T4-d T3",
    description: "TSH, T4 und T3 als negatives Feedbacksystem.",
    variables: ["TSH", "T4", "T3"],
    observables: "TSH, T3, T4",
    params: { a: 1.1, b: 1.4, c: 0.35, p: 0.55, m: 0.22, d: 0.18 },
    preset: "thyroid",
  },
  {
    id: 24,
    category: "hormones",
    name: "Blutzucker-Insulin-Modell",
    dynamic: "feedback",
    formula: "G'=meal(t)-u I G-bG; I'=s G/(Km+G)-c I",
    description: "Glukoseaufnahme und Insulinausschuettung nach Mahlzeiten.",
    variables: ["Glucose", "Insulin"],
    observables: "Glukose, Insulin",
    params: { uptake: 0.018, secretion: 0.85, km: 90, clear: 0.28 },
    preset: "glucoseInsulin",
  },
  {
    id: 25,
    category: "hormones",
    name: "Cortisol-Tagesrhythmus",
    dynamic: "rhythm",
    formula: "C'=b+A sin(2 pi (t-phi)/24)+stress(t)-c C",
    description: "Circadianer Cortisolverlauf mit optionalem Stressimpuls.",
    variables: ["Cortisol"],
    observables: "Cortisolspiegel",
    params: { base: 0.35, amp: 0.28, phase: 6, clear: 0.12 },
    preset: "circadian",
  },
  {
    id: 26,
    category: "hormones",
    name: "Testosteron-Regulation",
    dynamic: "feedback",
    formula: "LH'=a/(1+b T)-c LH; T'=p LH-d T",
    description: "LH-Testosteron-Achse mit negativem Feedback.",
    variables: ["LH", "T"],
    observables: "LH, Testosteron",
    params: { a: 0.95, b: 1.1, c: 0.28, p: 0.75, d: 0.22 },
    preset: "axisFeedback",
  },
  {
    id: 27,
    category: "hormones",
    name: "Medikamentenlevel im Blut",
    dynamic: "compartment",
    formula: "Gut'=-ka Gut; Central'=ka Gut-ke C-kcp C+kpc P; Periph'=kcp C-kpc P",
    description: "Absorption, Verteilung und Abbau als PK-Kompartimente.",
    variables: ["Gut", "Blood", "Tissue"],
    observables: "Blutspiegel, Gewebespiegel",
    params: { ka: 1.1, ke: 0.22, kcp: 0.35, kpc: 0.18 },
    preset: "pharmacokinetic",
  },
  {
    id: 28,
    category: "hormones",
    name: "Ritalin-Wirkspiegel",
    dynamic: "compartment",
    formula: "Depot'=-ka Depot+dose(t); Blood'=ka Depot-ke Blood; Effect'=kon Blood-koff Effect",
    description: "Einnahme, Peak, Halbwertszeit und Effektkompartiment.",
    variables: ["Depot", "Blood", "Effect"],
    observables: "Blutspiegel, Effekt",
    params: { ka: 1.35, ke: 0.35, kon: 0.45, koff: 0.22 },
    preset: "effectCompartment",
  },
  {
    id: 29,
    category: "hormones",
    name: "Koffein-Abbau",
    dynamic: "decay",
    formula: "dC/dt = intake(t) - ln(2) C / half_life",
    description: "Exponentialer Abbau mit Halbwertszeit.",
    variables: ["Caffeine"],
    observables: "Koffeinspiegel",
    params: { halfLife: 5.2, intake: 1.0 },
    preset: "halfLife",
  },
  {
    id: 30,
    category: "hormones",
    name: "Alkoholabbau",
    dynamic: "decay",
    formula: "dA/dt = intake(t) - Vmax A/(Km+A)",
    description: "Saettigungsabhaengiger Alkoholabbau.",
    variables: ["Alcohol"],
    observables: "Alkoholspiegel",
    params: { vmax: 0.18, km: 0.08, intake: 1.0 },
    preset: "saturatingDecay",
  },
  {
    id: 31,
    category: "health",
    name: "VO2max-Trainingseffekt",
    dynamic: "resource",
    formula: "Fitness'=a load-dF Fitness; Fatigue'=b load-dX Fatigue",
    description: "Fitness steigt durch Reiz, Ermuendung steigt schneller und klingt ab.",
    variables: ["Fitness", "Fatigue"],
    observables: "Fitness, Fatigue, Performance",
    params: { adapt: 0.11, strain: 0.24, dF: 0.025, dX: 0.12 },
    preset: "training",
  },
  {
    id: 32,
    category: "health",
    name: "Hyrox-Leistungsmodell",
    dynamic: "resource",
    formula: "Energy'=-w Energy+r Rec; Lactate'=p w-c L; Rec'=g(1-Rec)-q w Rec",
    description: "Energie, Laktat und Erholung in gekoppelter Belastung.",
    variables: ["Energy", "Lactate", "Recovery"],
    observables: "Energie, Laktat, Erholung",
    params: { work: 0.35, rec: 0.18, prod: 0.4, clear: 0.2 },
    preset: "hyrox",
  },
  {
    id: 33,
    category: "health",
    name: "Muskelaufbau",
    dynamic: "growth",
    formula: "M'=s stimulus/(Km+stimulus)-d M",
    description: "Trainingsreiz treibt Synthese, Abbau zieht Muskelmasse zurueck.",
    variables: ["Muscle"],
    observables: "Muskelmasse",
    params: { synth: 0.16, km: 0.4, breakdown: 0.028 },
    preset: "stimGrowth",
  },
  {
    id: 34,
    category: "health",
    name: "Koerpergewicht",
    dynamic: "resource",
    formula: "W'=(intake-expenditure-adapt)/E; adapt'=a(W0-W)-d adapt",
    description: "Kalorienbilanz plus metabolische Adaptation.",
    variables: ["Weight", "Adaptation"],
    observables: "Gewicht, Adaptation",
    params: { intake: 2300, expenditure: 2450, density: 7700, adapt: 18, decay: 0.06 },
    preset: "weight",
  },
  {
    id: 35,
    category: "health",
    name: "LDL-Cholesterin-Senkung",
    dynamic: "decay",
    formula: "LDL'=production-clearance LDL-drug(t) LDL",
    description: "Ernaehrung, Medikamente und natuerlicher Abbau senken LDL.",
    variables: ["LDL"],
    observables: "LDL-Cholesterin",
    params: { production: 2.2, clearance: 0.025, drug: 0.035 },
    preset: "ldl",
  },
  {
    id: 36,
    category: "health",
    name: "Entzuendungsmarker",
    dynamic: "shock",
    formula: "S'=insult(t)-dS S; I'=g S-c I",
    description: "Reiz, Immunantwort und Abklingen eines Markers.",
    variables: ["Stimulus", "Inflammation"],
    observables: "Stimulus, Entzuendung",
    params: { dS: 0.3, gain: 0.55, clear: 0.16 },
    preset: "inflammation",
  },
  {
    id: 37,
    category: "health",
    name: "Schlafdruck",
    dynamic: "rhythm",
    formula: "H'=wake_rate am Tag; H'=-sleep_clear H nachts",
    description: "Aufbau am Tag, Abbau nachts.",
    variables: ["SleepPressure"],
    observables: "Schlafdruck",
    params: { wake: 0.045, sleep: 0.22 },
    preset: "sleepPressure",
  },
  {
    id: 38,
    category: "health",
    name: "Stress-Erholung",
    dynamic: "feedback",
    formula: "Stress'=load(t)-r Recovery Stress; Recovery'=g(1-Recovery)-q load Recovery",
    description: "Belastung und Regeneration als Gegenspieler.",
    variables: ["Stress", "Recovery"],
    observables: "Stress, Recovery",
    params: { recover: 0.18, regen: 0.08, cost: 0.18 },
    preset: "stressRecovery",
  },
  {
    id: 39,
    category: "health",
    name: "Verletzungsheilung",
    dynamic: "decay",
    formula: "Damage'=-r Repair Damage; Repair'=a Damage-c Repair",
    description: "Gewebereparatur ueber Zeit.",
    variables: ["Damage", "Repair"],
    observables: "Schaden, Reparaturaktivitaet",
    params: { repair: 0.22, activation: 0.42, clear: 0.16 },
    preset: "healing",
  },
  {
    id: 40,
    category: "health",
    name: "Ausdauer-Adaption",
    dynamic: "growth",
    formula: "Mito'=a training-d Mito; Fatigue'=b training-c Fatigue",
    description: "Mitochondriale Anpassung unter Ausdauertraining.",
    variables: ["Mito", "Fatigue"],
    observables: "Mitochondrienindex, Fatigue",
    params: { adapt: 0.1, decay: 0.025, strain: 0.16, clear: 0.1 },
    preset: "training",
  },
  {
    id: 41,
    category: "business",
    name: "Nutzerwachstum",
    dynamic: "growth",
    formula: "dN/dt = r N (1-N/K)",
    description: "Logistisches Wachstum mit Marktlimit.",
    variables: ["Users"],
    observables: "Nutzerzahl",
    params: { r: 0.12, k: 1 },
    preset: "logistic",
  },
  {
    id: 42,
    category: "business",
    name: "Churn-Modell",
    dynamic: "decay",
    formula: "N'=acquisition-c N",
    description: "Nutzer verlassen das Produkt mit Churnrate c.",
    variables: ["Users"],
    observables: "Aktive Nutzer",
    params: { acquisition: 0.08, churn: 0.035 },
    preset: "churn",
  },
  {
    id: 43,
    category: "business",
    name: "SaaS-MRR",
    dynamic: "resource",
    formula: "Customers'=new-c Customers; MRR'=ARPU new-c MRR",
    description: "Neukunden, Churn und wiederkehrender Umsatz.",
    variables: ["Customers", "MRR"],
    observables: "Kunden, MRR",
    params: { new: 0.08, churn: 0.025, arpu: 0.55 },
    preset: "saas",
  },
  {
    id: 44,
    category: "business",
    name: "Viralitaetsmodell",
    dynamic: "growth",
    formula: "U'=organic+v U(1-U/K)-churn U",
    description: "Bestehende Nutzer bringen neue Nutzer.",
    variables: ["Users"],
    observables: "Nutzer, viraler Beitrag",
    params: { organic: 0.015, viral: 0.18, churn: 0.02, k: 1 },
    preset: "viral",
  },
  {
    id: 45,
    category: "business",
    name: "Marketplace-Liquiditaet",
    dynamic: "feedback",
    formula: "S'=s0+a M-dS S; D'=d0+b M-dD D; M'=m S D/(1+S+D)-c M",
    description: "Angebot und Nachfrage koppeln sich ueber Matches.",
    variables: ["Supply", "Demand", "Matches"],
    observables: "Supply, Demand, Matches",
    params: { s0: 0.03, d0: 0.04, m: 0.45, clear: 0.18 },
    preset: "marketplace",
  },
  {
    id: 46,
    category: "business",
    name: "Wartelisten-Wachstum",
    dynamic: "growth",
    formula: "W'=organic+paid(t)+ref W(1-W/K)-conversion W",
    description: "Organisches, bezahltes und Referral-Wachstum.",
    variables: ["Waitlist"],
    observables: "Warteliste",
    params: { organic: 0.025, paid: 0.12, referral: 0.13, conversion: 0.018 },
    preset: "waitlist",
  },
  {
    id: 47,
    category: "business",
    name: "Cash Runway",
    dynamic: "resource",
    formula: "Cash'=Revenue-Burn; Revenue'=g Revenue-c Revenue",
    description: "Cash sinkt durch Burn und steigt durch Revenue.",
    variables: ["Cash", "Revenue"],
    observables: "Cash, Revenue, Runway",
    params: { burn: 0.055, growth: 0.08, churn: 0.02 },
    preset: "runway",
  },
  {
    id: 48,
    category: "business",
    name: "Sales Pipeline",
    dynamic: "compartment",
    formula: "Leads'=inflow-q Leads; Qualified'=q Leads-close Q-loss Q; Closed'=close Q",
    description: "Leads wandern durch Pipeline-Stufen.",
    variables: ["Leads", "Qualified", "Closed"],
    observables: "Leads, Qualified, Closed",
    params: { inflow: 0.12, qualify: 0.16, close: 0.07, loss: 0.04 },
    preset: "salesPipeline",
  },
  {
    id: 49,
    category: "business",
    name: "Produktivitaetsmodell im Team",
    dynamic: "feedback",
    formula: "Exp'=onboard(team-Exp)-attrition Exp; Overhead'=coord team^2-d O; Prod'=g Exp-h O-dP Prod",
    description: "Onboarding, Erfahrung und Kommunikations-Overhead.",
    variables: ["Experience", "Overhead", "Productivity"],
    observables: "Erfahrung, Overhead, Produktivitaet",
    params: { team: 0.65, onboard: 0.18, coord: 0.08, drag: 0.35 },
    preset: "teamProductivity",
  },
  {
    id: 50,
    category: "business",
    name: "Feature-Debt-Modell",
    dynamic: "feedback",
    formula: "Value'=feature_rate-complexity Debt; Debt'=a feature_rate-refactor Debt",
    description: "Entwicklung erhoeht Wert und Komplexitaet.",
    variables: ["Value", "Debt"],
    observables: "Produktwert, Feature Debt",
    params: { feature: 0.14, complexity: 0.08, debt: 0.22, refactor: 0.06 },
    preset: "featureDebt",
  },
  {
    id: 51,
    category: "ai",
    name: "API-Kostenwachstum",
    dynamic: "growth",
    formula: "Users'=g Users-c Users; Tokens'=tau Users-n Tokens; Cost'=price Tokens",
    description: "Nutzer, Tokens und Kosten wachsen gekoppelt.",
    variables: ["Users", "Tokens", "Cost"],
    observables: "Nutzer, Tokens, kumulative Kosten",
    params: { growth: 0.1, churn: 0.018, tau: 0.45, price: 0.04 },
    preset: "apiCost",
  },
  {
    id: 52,
    category: "ai",
    name: "LLM-Queue-Modell",
    dynamic: "resource",
    formula: "Q'=arrival-service(Q); W'=a(Q/mu-W)",
    description: "Requests, Verarbeitung und Wartezeit.",
    variables: ["Queue", "Wait"],
    observables: "Queue-Laenge, Wartezeit",
    params: { arrival: 0.38, service: 0.32, km: 0.2, adapt: 0.5 },
    preset: "queue",
  },
  {
    id: 53,
    category: "ai",
    name: "GPU-Auslastung",
    dynamic: "resource",
    formula: "Waiting'=arrivals-start; Running'=start-complete; Util'=a(R/cap-Util)",
    description: "Jobs kommen rein, Jobs werden abgearbeitet.",
    variables: ["Waiting", "Running", "Utilization"],
    observables: "Wartende Jobs, laufende Jobs, Auslastung",
    params: { arrivals: 0.28, capacity: 0.75, complete: 0.22 },
    preset: "gpu",
  },
  {
    id: 54,
    category: "ai",
    name: "Datenbank-Load",
    dynamic: "feedback",
    formula: "Load'=reads+writes-capacity cache Load; Cache'=warm(1-Cache)-evict writes Cache",
    description: "Reads, Writes und Cache-Hit-Rate.",
    variables: ["Load", "Cache"],
    observables: "DB-Load, Cache",
    params: { reads: 0.3, writes: 0.12, capacity: 0.42, warm: 0.08, evict: 0.18 },
    preset: "database",
  },
  {
    id: 55,
    category: "ai",
    name: "Bug-Bestand",
    dynamic: "resource",
    formula: "Bugs'=injection_rate features-fix_rate Bugs",
    description: "Neue Bugs minus geloeste Bugs.",
    variables: ["Bugs"],
    observables: "Offene Bugs",
    params: { injection: 0.11, features: 0.9, fix: 0.07 },
    preset: "bugStock",
  },
  {
    id: 56,
    category: "ai",
    name: "Tech-Debt-Dynamik",
    dynamic: "feedback",
    formula: "Debt'=feature_debt-refactor Debt; Velocity'=a(base/(1+d Debt)-Velocity)",
    description: "Neue Features erhoehen Debt, Refactoring senkt ihn.",
    variables: ["Debt", "Velocity"],
    observables: "Tech Debt, Velocity",
    params: { featureDebt: 0.12, refactor: 0.045, base: 0.9, drag: 1.5, adapt: 0.4 },
    preset: "techDebt",
  },
  {
    id: 57,
    category: "ai",
    name: "Modell-Degradation",
    dynamic: "decay",
    formula: "Drift'=drift_rate-retrain Drift; Quality'=-d Drift Quality+gain retrain(1-Quality)",
    description: "Daten-Drift senkt Modellqualitaet, Retraining stabilisiert.",
    variables: ["Drift", "Quality"],
    observables: "Drift, Qualitaet",
    params: { drift: 0.04, retrain: 0.02, degrade: 0.5, gain: 0.55 },
    preset: "modelDrift",
  },
  {
    id: 58,
    category: "ai",
    name: "Retrieval-Qualitaet",
    dynamic: "feedback",
    formula: "Knowledge'=add-decay Knowledge; Quality'=benefit Knowledge/(Km+Knowledge)-stale Quality",
    description: "Wissensbasis waechst, Veralterung senkt Qualitaet.",
    variables: ["Knowledge", "Quality"],
    observables: "Wissensbasis, Retrieval-Qualitaet",
    params: { add: 0.12, decay: 0.018, benefit: 0.18, stale: 0.055 },
    preset: "retrieval",
  },
  {
    id: 59,
    category: "ai",
    name: "App-Retention",
    dynamic: "decay",
    formula: "Active'=-churn(t) Active+reactivation",
    description: "Kohortenabfluss mit Reaktivierung.",
    variables: ["Active"],
    observables: "Aktive Kohorte",
    params: { churn: 0.045, reactivation: 0.012 },
    preset: "retention",
  },
  {
    id: 60,
    category: "ai",
    name: "Empfehlungsalgorithmus-Feedback",
    dynamic: "feedback",
    formula: "Popularity'=base+f Exposure Popularity/(1+Popularity)-dP Popularity; Exposure'=r Popularity-dE Exposure",
    description: "Popularitaet verstaerkt Popularitaet ueber Exposition.",
    variables: ["Popularity", "Exposure"],
    observables: "Popularitaet, Exposition",
    params: { base: 0.02, feedback: 0.45, dP: 0.08, rank: 0.24, dE: 0.18 },
    preset: "recommendation",
  },
  {
    id: 61,
    category: "finance",
    name: "Portfolio-Wachstum",
    dynamic: "growth",
    formula: "Capital'=return Capital+contribution(t)",
    description: "Kapital waechst mit Rendite und Einzahlungen.",
    variables: ["Capital"],
    observables: "Portfolio-Kapital",
    params: { return: 0.055, contribution: 0.025 },
    preset: "compound",
  },
  {
    id: 62,
    category: "finance",
    name: "Zinseszins mit Cashflows",
    dynamic: "growth",
    formula: "Balance'=r Balance+cashflow(t)",
    description: "Sparplan als ODE.",
    variables: ["Balance"],
    observables: "Kontostand",
    params: { return: 0.045, contribution: 0.035 },
    preset: "compound",
  },
  {
    id: 63,
    category: "finance",
    name: "Crash-Erholung",
    dynamic: "shock",
    formula: "Price'=m(trend-Price)-shock(t) Price; Drawdown'=shock(t)-recovery Drawdown",
    description: "Drawdown und Mean-Reversion nach Crash.",
    variables: ["Price", "Drawdown"],
    observables: "Preis, Drawdown",
    params: { mean: 0.08, trend: 1, shock: 0.65, recovery: 0.12 },
    preset: "crash",
  },
  {
    id: 64,
    category: "finance",
    name: "Volatilitaetsmodell",
    dynamic: "shock",
    formula: "S'=shock(t)-d S; Vol'=a(base-Vol)+g S",
    description: "Volatilitaet steigt bei Schocks und faellt langsam.",
    variables: ["ShockMemory", "Volatility"],
    observables: "Schockspeicher, Volatilitaet",
    params: { decay: 0.18, revert: 0.08, base: 0.16, gain: 0.5 },
    preset: "volatility",
  },
  {
    id: 65,
    category: "finance",
    name: "Gold/S&P-Allokation",
    dynamic: "resource",
    formula: "Gold'=rG Gold+rebalance(targetG Total-Gold); SP'=rS SP+rebalance(targetS Total-SP)",
    description: "Umschichtung zwischen Gold und Aktien.",
    variables: ["Gold", "SP500"],
    observables: "Gold, S&P-Anteil",
    params: { rG: 0.025, rS: 0.06, targetG: 0.35, rebalance: 0.08 },
    preset: "allocation",
  },
  {
    id: 66,
    category: "finance",
    name: "Inflation und Kaufkraft",
    dynamic: "decay",
    formula: "PriceLevel'=inflation PriceLevel; Power'=-inflation Power",
    description: "Kaufkraft sinkt mit Inflation.",
    variables: ["PriceLevel", "Power"],
    observables: "Preislevel, Kaufkraft",
    params: { inflation: 0.045 },
    preset: "inflation",
  },
  {
    id: 67,
    category: "finance",
    name: "Hypothekarschuld",
    dynamic: "decay",
    formula: "Debt'=interest Debt-payment",
    description: "Tilgung und Zinskosten bestimmen Restschuld.",
    variables: ["Debt"],
    observables: "Restschuld",
    params: { interest: 0.035, payment: 0.07 },
    preset: "mortgage",
  },
  {
    id: 68,
    category: "finance",
    name: "Startup-Valuation",
    dynamic: "feedback",
    formula: "Revenue'=g Revenue; Multiple'=c(floor-Multiple); Valuation'=a(Revenue Multiple-Valuation)",
    description: "Revenue-Wachstum und Multiple-Kompression.",
    variables: ["Revenue", "Multiple", "Valuation"],
    observables: "Revenue, Multiple, Bewertung",
    params: { growth: 0.11, compression: 0.04, floor: 4, adapt: 0.45 },
    preset: "valuation",
  },
  {
    id: 69,
    category: "finance",
    name: "Token-Oekonomie",
    dynamic: "feedback",
    formula: "Supply'=mint-burn Demand; Demand'=adoption Demand(1-D/K)-decay Demand; Price'=s(Demand/Supply-Price)",
    description: "Angebot, Nachfrage, Burn und Preis.",
    variables: ["Supply", "Demand", "Price"],
    observables: "Supply, Demand, Preis",
    params: { mint: 0.035, burn: 0.025, adoption: 0.13, decay: 0.03, sensitivity: 0.6 },
    preset: "tokenEconomy",
  },
  {
    id: 70,
    category: "finance",
    name: "Liquiditaetsrisiko",
    dynamic: "threshold",
    formula: "Cash'=inflow-outflow; Risk'=a(sigma((threshold-Cash)/w)-Risk)",
    description: "Cashbestand und Abflussrate treiben Liquiditaetsrisiko.",
    variables: ["Cash", "Risk"],
    observables: "Cash, Risiko",
    params: { inflow: 0.06, outflow: 0.085, threshold: 0.35, width: 0.08, adapt: 0.6 },
    preset: "liquidity",
  },
  {
    id: 71,
    category: "physics",
    name: "Raumtemperatur",
    dynamic: "decay",
    formula: "T'=-k(T-Ambient)",
    description: "Newtonsches Abkuehlen.",
    variables: ["Temperature"],
    observables: "Raumtemperatur",
    params: { k: 0.08, ambient: 0.28 },
    preset: "cooling",
  },
  {
    id: 72,
    category: "physics",
    name: "Akku-Entladung",
    dynamic: "resource",
    formula: "Battery'=charge(t)-load(t)",
    description: "Verbrauch und Ladeleistung ueber Zeit.",
    variables: ["Battery"],
    observables: "Akkustand",
    params: { load: 0.035, charge: 0.12 },
    preset: "battery",
  },
  {
    id: 73,
    category: "physics",
    name: "E-Scooter-Reichweite",
    dynamic: "resource",
    formula: "Battery'=-consumption(v,weight,slope); Distance'=v",
    description: "Geschwindigkeit, Gewicht und Steigung bestimmen Reichweite.",
    variables: ["Battery", "Distance"],
    observables: "Akkustand, Distanz",
    params: { speed: 0.16, load: 0.042, slope: 0.02 },
    preset: "scooter",
  },
  {
    id: 74,
    category: "physics",
    name: "Wasserstand im Tank",
    dynamic: "resource",
    formula: "H'=inflow-c sqrt(H)",
    description: "Zufluss minus Ausfluss.",
    variables: ["Height"],
    observables: "Wasserstand",
    params: { inflow: 0.08, outflow: 0.12 },
    preset: "tank",
  },
  {
    id: 75,
    category: "physics",
    name: "Beton-Trocknung",
    dynamic: "decay",
    formula: "M'=-d(M-S); S'=d(M-S)-e S",
    description: "Feuchtigkeit diffundiert und verdunstet.",
    variables: ["CoreMoisture", "SurfaceMoisture"],
    observables: "Kern- und Oberflaechenfeuchte",
    params: { diffusion: 0.16, evap: 0.08 },
    preset: "drying",
  },
  {
    id: 76,
    category: "physics",
    name: "Waermeverlust im Boden",
    dynamic: "decay",
    formula: "T'=conductance(Outside-T)/capacity",
    description: "Isolation und Temperaturgradient bestimmen Waermeverlust.",
    variables: ["GroundTemp"],
    observables: "Bodentemperatur",
    params: { conductance: 0.055, outside: 0.18 },
    preset: "cooling",
  },
  {
    id: 77,
    category: "physics",
    name: "3D-Druck-Heizbett",
    dynamic: "feedback",
    formula: "I'=setpoint-T; T'=heater(kp e+ki I)-loss(T-Ambient)",
    description: "PID-Regelung fuer Heizbett-Temperatur.",
    variables: ["Temperature", "Integral"],
    observables: "Temperatur, Regler-Integral",
    params: { setpoint: 0.78, kp: 1.1, ki: 0.11, heater: 0.35, loss: 0.12 },
    preset: "pidHeatbed",
  },
  {
    id: 78,
    category: "physics",
    name: "Drohnenflugzeit",
    dynamic: "resource",
    formula: "Energy'=-power(t); Altitude'=climb(t)-sink Altitude",
    description: "Energieverbrauch ueber Flugzeit.",
    variables: ["Energy", "Altitude"],
    observables: "Energie, Hoehe",
    params: { power: 0.04, climb: 0.035, sink: 0.06 },
    preset: "drone",
  },
  {
    id: 79,
    category: "physics",
    name: "Kamera-Akku bei Kaelte",
    dynamic: "resource",
    formula: "Battery'=-draw(1+cold_gain max(0,20-Temp)/20)",
    description: "Temperaturabhaengiger Verbrauch.",
    variables: ["Battery", "Temperature"],
    observables: "Akkustand, Temperatur",
    params: { draw: 0.032, coldGain: 0.9, ambient: 0.08, relax: 0.05 },
    preset: "coldBattery",
  },
  {
    id: 80,
    category: "physics",
    name: "Gebaeudeheizung",
    dynamic: "feedback",
    formula: "Indoor'=heat/cap+e(Wall-Indoor)-loss(Indoor-Outdoor); Wall'=e(Indoor-Wall)-g(Wall-Outdoor)",
    description: "Waermekapazitaet, Verlust und Heizinput.",
    variables: ["Indoor", "Wall"],
    observables: "Innen- und Wandtemperatur",
    params: { heat: 0.09, exchange: 0.1, loss: 0.055, outdoor: 0.2 },
    preset: "buildingHeat",
  },
  {
    id: 81,
    category: "society",
    name: "Raeuber-Beute-Modell",
    dynamic: "feedback",
    formula: "Prey'=a Prey-b Prey Predator; Predator'=c Prey Predator-d Predator",
    description: "Lotka-Volterra Dynamik.",
    variables: ["Prey", "Predator"],
    observables: "Beute, Raeuber",
    params: { a: 0.55, b: 0.35, c: 0.26, d: 0.38 },
    preset: "lotka",
  },
  {
    id: 82,
    category: "society",
    name: "Epidemie-Modell",
    dynamic: "compartment",
    formula: "S'=-beta S I; I'=beta S I-gamma I; R'=gamma I",
    description: "SIR: Susceptible, Infected, Recovered.",
    variables: ["S", "I", "R"],
    observables: "Susceptible, Infected, Recovered",
    params: { beta: 0.6, gamma: 0.12 },
    preset: "sir",
  },
  {
    id: 83,
    category: "society",
    name: "Geruechte-Verbreitung",
    dynamic: "compartment",
    formula: "U'=-beta U S; Spreaders'=beta U S-gamma Spreaders; Forgotten'=gamma Spreaders",
    description: "Menschen erfahren und vergessen Information.",
    variables: ["Unaware", "Spreaders", "Forgotten"],
    observables: "Unwissende, Verbreiter, Vergessende",
    params: { beta: 0.75, gamma: 0.18 },
    preset: "rumor",
  },
  {
    id: 84,
    category: "society",
    name: "Staedtewachstum",
    dynamic: "growth",
    formula: "Pop'=r Pop(1-Pop/(K0+a Infra)); Infra'=invest Pop-d Infra",
    description: "Bevoelkerung und Infrastruktur wachsen gekoppelt.",
    variables: ["Population", "Infrastructure"],
    observables: "Population, Infrastruktur",
    params: { r: 0.08, k0: 0.6, alpha: 0.9, invest: 0.05, decay: 0.03 },
    preset: "city",
  },
  {
    id: 85,
    category: "society",
    name: "Verkehrsstau",
    dynamic: "resource",
    formula: "Cars'=inflow-capacity tanh(Cars/capacity); Delay'=a(Cars/capacity-Delay)",
    description: "Zufluss, Kapazitaet und Abfluss.",
    variables: ["Cars", "Delay"],
    observables: "Autos, Verzugszeit",
    params: { inflow: 0.33, capacity: 0.28, adapt: 0.45 },
    preset: "traffic",
  },
  {
    id: 86,
    category: "society",
    name: "CO2-Konzentration",
    dynamic: "resource",
    formula: "CO2'=emissions-uptake(CO2-baseline)",
    description: "Emissionen minus Bindung.",
    variables: ["CO2"],
    observables: "CO2-Konzentration",
    params: { emissions: 0.07, uptake: 0.025, baseline: 0.28 },
    preset: "co2",
  },
  {
    id: 87,
    category: "society",
    name: "Recycling-System",
    dynamic: "compartment",
    formula: "Raw'=-p Raw+r Recycle; Use'=p Raw-d Use; Waste'=d Use-c Waste; Recycle'=c Waste-l Recycle-r Recycle",
    description: "Materialfluss-Kompartimente.",
    variables: ["Raw", "Use", "Waste", "Recycle"],
    observables: "Rohstoff, Nutzung, Abfall, Recycling",
    params: { production: 0.09, discard: 0.05, collect: 0.11, recovery: 0.04, loss: 0.02 },
    preset: "recycling",
  },
  {
    id: 88,
    category: "society",
    name: "Waldbrand-Ausbreitung",
    dynamic: "shock",
    formula: "Fuel'=-s Fuel Fire; Fire'=s Fuel Fire-e Fire; Burned'=b Fire",
    description: "Brennbares Material, Feuer und verbrannte Flaeche.",
    variables: ["Fuel", "Fire", "Burned"],
    observables: "Fuel, Fire, Burned",
    params: { spread: 0.7, extinguish: 0.22, burn: 0.18 },
    preset: "wildfire",
  },
  {
    id: 89,
    category: "society",
    name: "See-Algenbluete",
    dynamic: "feedback",
    formula: "N'=input-u N A+r A-dN N; A'=g N A/(Km+N)-death A; O'=reaeration(sat-O)-resp A+photo A",
    description: "Naehrstoffe, Algen und Sauerstoff.",
    variables: ["Nutrients", "Algae", "Oxygen"],
    observables: "Naehrstoffe, Algen, Sauerstoff",
    params: { input: 0.08, uptake: 0.45, growth: 0.42, death: 0.12, reaeration: 0.08 },
    preset: "algae",
  },
  {
    id: 90,
    category: "society",
    name: "Wasserverbrauch in Stadt",
    dynamic: "resource",
    formula: "Storage'=inflow-Demand; Demand'=g Demand-conservation shortage Demand",
    description: "Nachfrage, Speicher und Zufluss.",
    variables: ["Storage", "Demand"],
    observables: "Wasserspeicher, Nachfrage",
    params: { inflow: 0.11, growth: 0.035, conservation: 0.2, threshold: 0.35 },
    preset: "waterCity",
  },
];

const PRIORITY = [
  ["Altersabhaengiges Ovarialreserve-Modell", "Einfach, erklaerbar, starke Basislinie fuer Patientinnenpfade."],
  ["Kompartimentmodell Reserve -> antral -> ovulatorisch", "Biologisch realistischer und anschlussfaehig an Ultraschall/AFC."],
  ["AMH/AFC-Beobachtungsmodell", "Verbindet latente Follikelpopulationen mit realen Messdaten."],
  ["Bayesian Personalisation", "Macht individuelle Prognose statt Durchschnittskurve moeglich."],
  ["IVF-Response-Modell", "Direkter klinischer Output: erwartete Antwort pro Stimulationszyklus."],
];

const qs = (selector) => document.querySelector(selector);
const categoryById = new Map(CATEGORIES.map((category) => [category.id, category]));
let selectedModel = MODELS[4];
let isPlaying = true;
let animationTime = 0;
let chartFrame = null;

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function pulse(t, center = 30, width = 6, strength = 1) {
  const z = (t - center) / width;
  return strength * Math.exp(-0.5 * z * z);
}

function periodicPulse(t, period = 14, width = 2, strength = 1) {
  const phase = ((t % period) + period) % period;
  const distance = Math.min(phase, period - phase);
  return strength * Math.exp(-0.5 * (distance / width) ** 2);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function initialState(model) {
  const presets = {
    decay: [model.params.initial ?? 1],
    ageDecay: [1],
    twoPhase: [1],
    chain3: [1, 0.08, 0.04],
    feedbackAmh: [1, 0.1, 0.35],
    observer: [0.55, 0.18],
    stimulusResponse: [1, 0.05, 0],
    shockDecay: [1],
    pcos: [1, 0.35, 0.4],
    threshold: [1, 0],
    cycleLength: [1, 28],
    freezing: [1, 0],
    risk: [0.9, 0.05],
    adaptiveDecayRate: [1, model.params.k ?? 0.035],
    powerProxy: [1, 1],
    fsh: [1, 0.8, 0.25],
    multiCycle: [1, 0.05],
    cycleHormones: [0.45, 0.25, 0.25, 0.3, 0.15],
    lhSurge: [0.2, 0.1, 0],
    thyroid: [0.55, 0.5, 0.4],
    glucoseInsulin: [110, 12],
    circadian: [0.35],
    axisFeedback: [0.55, 0.45],
    pharmacokinetic: [1, 0, 0],
    effectCompartment: [1, 0, 0],
    halfLife: [1],
    saturatingDecay: [1],
    training: [0.2, 0.05],
    hyrox: [1, 0.1, 0.85],
    stimGrowth: [0.25],
    weight: [80, 0],
    ldl: [145],
    inflammation: [0, 0.08],
    sleepPressure: [0.2],
    stressRecovery: [0.2, 0.8],
    healing: [1, 0.05],
    logistic: [0.08],
    churn: [0.6],
    saas: [0.1, 0.08],
    viral: [0.05],
    marketplace: [0.18, 0.2, 0.03],
    waitlist: [0.08],
    runway: [1, 0.08],
    salesPipeline: [0.08, 0.02, 0],
    teamProductivity: [0.18, 0.05, 0.12],
    featureDebt: [0.1, 0.08],
    apiCost: [0.08, 0.04, 0],
    queue: [0.12, 0.05],
    gpu: [0.1, 0.05, 0.08],
    database: [0.2, 0.65],
    bugStock: [0.12],
    techDebt: [0.12, 0.75],
    modelDrift: [0.06, 0.95],
    retrieval: [0.2, 0.4],
    retention: [1],
    recommendation: [0.12, 0.1],
    compound: [0.2],
    crash: [1, 0],
    volatility: [0.05, 0.18],
    allocation: [0.35, 0.65],
    inflation: [1, 1],
    mortgage: [1],
    valuation: [0.12, 8, 0.9],
    tokenEconomy: [1, 0.1, 0.08],
    liquidity: [1, 0.02],
    cooling: [0.85],
    battery: [1],
    scooter: [1, 0],
    tank: [0.2],
    drying: [1, 0.7],
    pidHeatbed: [0.2, 0],
    drone: [1, 0.1],
    coldBattery: [1, 0.1],
    buildingHeat: [0.32, 0.28],
    lotka: [0.65, 0.35],
    sir: [0.96, 0.04, 0],
    rumor: [0.96, 0.04, 0],
    city: [0.18, 0.1],
    traffic: [0.18, 0.02],
    co2: [0.42],
    recycling: [1, 0, 0, 0.08],
    wildfire: [1, 0.02, 0],
    algae: [0.5, 0.08, 0.9],
    waterCity: [0.8, 0.16],
  };
  return [...(presets[model.preset] ?? [1])];
}

function derivatives(model, t, y, knobs = {}) {
  const p = { ...model.params, ...knobs };
  const load = 0.55 + 0.35 * Math.sin(t * 0.35) + periodicPulse(t, 10, 1.5, 0.5);
  switch (model.preset) {
    case "decay":
      return [-p.k * y[0]];
    case "ageDecay":
      return [-(p.k * Math.exp(p.alpha * Math.max(t - 30, 0))) * y[0]];
    case "twoPhase":
      return [-(t < 35 ? p.k1 : p.k2) * y[0]];
    case "chain3":
      return [-p.lambda * y[0], p.lambda * y[0] - p.mu * y[1], p.mu * y[1] - p.nu * y[2]];
    case "feedbackAmh": {
      const activation = (p.lambda * y[0]) / (1 + p.beta * Math.max(y[2], 0));
      return [-activation, activation - p.mu * y[1], p.rho * y[1] - p.c * y[2]];
    }
    case "observer":
      return [p.source - p.d * y[0], (p.eta ?? p.g ?? 0.8) * y[0] - (p.gamma ?? p.c ?? 0.2) * y[1]];
    case "stimulusResponse": {
      const u = p.u * periodicPulse(t, 14, 3, 1);
      return [-p.k * y[0], (u * y[0]) / (p.km + y[0]) - p.m * y[1], p.q * y[1] - p.r * y[2]];
    }
    case "shockDecay":
      return [-(p.k + pulse(t, p.center, p.width, p.shock)) * y[0]];
    case "pcos":
      return [-p.lambda * y[0], p.lambda * y[0] + p.excess - p.m * y[1], p.a * y[1] - p.c * y[2]];
    case "threshold":
      return [-p.k * y[0], sigmoid((p.rc - y[0]) / p.width) - p.d * y[1]];
    case "cycleLength":
      return [-p.k * y[0], p.adapt * (p.base + p.sens / (0.2 + y[0]) - y[1])];
    case "freezing": {
      const u = p.u * periodicPulse(t, 20, 4, 1);
      return [-p.k * y[0], (p.q * u * y[0]) / (p.km + y[0]) - p.r * y[1]];
    }
    case "risk":
      return [-p.k * y[0], p.adapt * (sigmoid((p.ac - y[0]) / p.width) - y[1])];
    case "adaptiveDecayRate":
      return [-y[1] * y[0], p.adapt * (p.familyK - y[1])];
    case "powerProxy":
      return [-p.k * y[0], p.adapt * (p.scale * Math.max(y[0], 0) ** p.alpha - y[1])];
    case "fsh":
      return [-p.k * y[0], p.rho * y[0] - p.cI * y[1], p.a - p.b * y[1] - p.cF * y[2]];
    case "multiCycle": {
      const u = p.u * periodicPulse(t, 12, 2.5, 1);
      return [-p.k * y[0] - p.drain * u * y[1], (p.s * u * y[0]) / (p.km + y[0]) - p.c * y[1]];
    }
    case "cycleHormones": {
      const wave = 0.5 + 0.5 * Math.sin((2 * Math.PI * t) / p.period);
      return [
        0.15 + 0.2 * wave - 0.35 * y[0],
        0.45 * y[0] * (1 + p.feedback * sigmoid(8 * (y[3] - 0.55))) - 0.28 * y[1],
        0.35 * y[0] / (1 + y[4]) - 0.2 * y[2],
        0.38 * y[2] - 0.18 * y[3],
        0.22 * y[1] * sigmoid(8 * (y[3] - 0.55)) - 0.14 * y[4],
      ];
    }
    case "lhSurge":
      return [p.r * y[0] * (1 - y[0] / p.k) - 0.03 * y[0], 0.06 + p.g * sigmoid(14 * (y[0] - p.ec)) - p.c * y[1], 0.12 * y[1] - 0.16 * y[2]];
    case "thyroid":
      return [p.a / (1 + p.b * (y[1] + y[2])) - p.c * y[0], p.p * y[0] - p.m * y[1] - 0.08 * y[1], p.m * y[1] - p.d * y[2]];
    case "glucoseInsulin": {
      const meal = 45 * periodicPulse(t, 8, 0.7, 1);
      return [meal - p.uptake * y[1] * y[0] - 0.08 * (y[0] - 85), (p.secretion * Math.max(y[0] - 80, 0)) / (p.km + y[0]) - p.clear * y[1]];
    }
    case "circadian":
      return [p.base + p.amp * Math.sin((2 * Math.PI * (t - p.phase)) / 24) + pulse(t, 12, 1.5, 0.3) - p.clear * y[0]];
    case "axisFeedback":
      return [p.a / (1 + p.b * y[1]) - p.c * y[0], p.p * y[0] - p.d * y[1]];
    case "pharmacokinetic":
      return [-p.ka * y[0], p.ka * y[0] - p.ke * y[1] - p.kcp * y[1] + p.kpc * y[2], p.kcp * y[1] - p.kpc * y[2]];
    case "effectCompartment":
      return [-p.ka * y[0] + periodicPulse(t, 8, 0.4, 0.4), p.ka * y[0] - p.ke * y[1], p.kon * y[1] - p.koff * y[2]];
    case "halfLife":
      return [periodicPulse(t, 12, 0.35, p.intake * 0.4) - (Math.log(2) / p.halfLife) * y[0]];
    case "saturatingDecay":
      return [periodicPulse(t, 18, 0.45, p.intake * 0.5) - (p.vmax * y[0]) / (p.km + y[0] + 1e-6)];
    case "training":
      return [(p.adapt ?? 0.1) * load - (p.dF ?? p.decay ?? 0.02) * y[0], (p.strain ?? 0.15) * load - (p.dX ?? p.clear ?? 0.1) * y[1]];
    case "hyrox":
      return [-p.work * load * y[0] + p.rec * y[2], p.prod * load - p.clear * y[1], 0.08 * (1 - y[2]) - 0.18 * load * y[2]];
    case "stimGrowth":
      return [(p.synth * load) / (p.km + load) - p.breakdown * y[0]];
    case "weight":
      return [(p.intake - p.expenditure - y[1]) / p.density, p.adapt * (80 - y[0]) - p.decay * y[1]];
    case "ldl":
      return [p.production - p.clearance * y[0] - p.drug * sigmoid(t - 15) * y[0]];
    case "inflammation":
      return [pulse(t, 10, 1.7, 1) - p.dS * y[0], p.gain * y[0] - p.clear * y[1]];
    case "sleepPressure": {
      const hour = t % 24;
      return [hour >= 7 && hour <= 23 ? p.wake : -p.sleep * y[0]];
    }
    case "stressRecovery":
      return [load - p.recover * y[1] * y[0], p.regen * (1 - y[1]) - p.cost * load * y[1]];
    case "healing":
      return [-p.repair * y[1] * y[0], p.activation * y[0] - p.clear * y[1]];
    case "logistic":
      return [p.r * y[0] * (1 - y[0] / p.k)];
    case "churn":
      return [p.acquisition - p.churn * y[0]];
    case "saas":
      return [p.new - p.churn * y[0], p.arpu * p.new - p.churn * y[1]];
    case "viral":
      return [p.organic + p.viral * y[0] * (1 - y[0] / p.k) - p.churn * y[0]];
    case "marketplace": {
      const m = (p.m * y[0] * y[1]) / (1 + y[0] + y[1]);
      return [p.s0 + 0.15 * y[2] - 0.08 * y[0], p.d0 + 0.15 * y[2] - 0.08 * y[1], m - p.clear * y[2]];
    }
    case "waitlist":
      return [p.organic + p.paid * periodicPulse(t, 18, 4, 1) + p.referral * y[0] * (1 - y[0]) - p.conversion * y[0]];
    case "runway":
      return [y[1] - p.burn, (p.growth - p.churn) * y[1] + 0.005];
    case "salesPipeline":
      return [p.inflow - p.qualify * y[0], p.qualify * y[0] - p.close * y[1] - p.loss * y[1], p.close * y[1]];
    case "teamProductivity":
      return [p.onboard * (p.team - y[0]) - 0.03 * y[0], p.coord * p.team ** 2 - 0.12 * y[1], 0.7 * y[0] - p.drag * y[1] - 0.18 * y[2]];
    case "featureDebt":
      return [p.feature - p.complexity * y[1], p.debt * p.feature - p.refactor * y[1]];
    case "apiCost":
      return [(p.growth - p.churn) * y[0], p.tau * y[0] - 0.08 * y[1], p.price * y[1]];
    case "queue": {
      const served = (p.service * y[0]) / (p.km + y[0] + 1e-6);
      return [p.arrival - served, p.adapt * (y[0] / p.service - y[1])];
    }
    case "gpu": {
      const start = Math.min(p.capacity, y[0] + p.arrivals) * 0.28;
      return [p.arrivals - start, start - p.complete * y[1], 0.45 * (y[1] / p.capacity - y[2])];
    }
    case "database":
      return [p.reads + p.writes - p.capacity * y[1] * y[0], p.warm * (1 - y[1]) - p.evict * p.writes * y[1]];
    case "bugStock":
      return [p.injection * p.features - p.fix * y[0]];
    case "techDebt":
      return [p.featureDebt - p.refactor * y[0], p.adapt * (p.base / (1 + p.drag * y[0]) - y[1])];
    case "modelDrift":
      return [p.drift - p.retrain * y[0], -p.degrade * y[0] * y[1] + p.gain * p.retrain * (1 - y[1])];
    case "retrieval":
      return [p.add - p.decay * y[0], p.benefit * y[0] / (0.3 + y[0]) - p.stale * y[1]];
    case "retention":
      return [-p.churn * (1 + 0.25 * Math.sin(t * 0.2)) * y[0] + p.reactivation];
    case "recommendation":
      return [p.base + (p.feedback * y[1] * y[0]) / (1 + y[0]) - p.dP * y[0], p.rank * y[0] - p.dE * y[1]];
    case "compound":
      return [p.return * y[0] + p.contribution];
    case "crash": {
      const shock = pulse(t, 18, 1.6, p.shock);
      return [p.mean * (p.trend - y[0]) - shock * y[0], shock - p.recovery * y[1]];
    }
    case "volatility": {
      const s = pulse(t, 20, 2, 0.7);
      return [s - p.decay * y[0], p.revert * (p.base - y[1]) + p.gain * y[0]];
    }
    case "allocation": {
      const total = y[0] + y[1];
      return [p.rG * y[0] + p.rebalance * (p.targetG * total - y[0]), p.rS * y[1] + p.rebalance * ((1 - p.targetG) * total - y[1])];
    }
    case "inflation":
      return [p.inflation * y[0], -p.inflation * y[1]];
    case "mortgage":
      return [p.interest * y[0] - p.payment];
    case "valuation": {
      const target = y[0] * y[1];
      return [p.growth * y[0], p.compression * (p.floor - y[1]), p.adapt * (target - y[2])];
    }
    case "tokenEconomy":
      return [p.mint - p.burn * y[1], p.adoption * y[1] * (1 - y[1]) - p.decay * y[1] + 0.01, p.sensitivity * (y[1] / (y[0] + 1e-6) - y[2])];
    case "liquidity":
      return [p.inflow - p.outflow, p.adapt * (sigmoid((p.threshold - y[0]) / p.width) - y[1])];
    case "cooling":
      return [-p.k * (y[0] - p.ambient)];
    case "battery": {
      const charge = periodicPulse(t, 24, 3, p.charge);
      return [charge - p.load * (1 + 0.4 * Math.sin(t * 0.5) ** 2)];
    }
    case "scooter":
      return [-(p.load + p.slope) * (1 + p.speed), p.speed];
    case "tank":
      return [p.inflow - p.outflow * Math.sqrt(Math.max(y[0], 0))];
    case "drying":
      return [-p.diffusion * (y[0] - y[1]), p.diffusion * (y[0] - y[1]) - p.evap * y[1]];
    case "pidHeatbed": {
      const error = p.setpoint - y[0];
      return [p.heater * (p.kp * error + p.ki * y[1]) - p.loss * (y[0] - 0.2), error];
    }
    case "drone":
      return [-p.power * (1 + 0.5 * periodicPulse(t, 12, 2, 1)), p.climb * Math.sin(t * 0.2) - p.sink * y[1]];
    case "coldBattery":
      return [-p.draw * (1 + p.coldGain * Math.max(0, 0.4 - y[1])), p.relax * (p.ambient - y[1])];
    case "buildingHeat":
      return [p.heat + p.exchange * (y[1] - y[0]) - p.loss * (y[0] - p.outdoor), p.exchange * (y[0] - y[1]) - 0.04 * (y[1] - p.outdoor)];
    case "lotka":
      return [p.a * y[0] - p.b * y[0] * y[1], p.c * y[0] * y[1] - p.d * y[1]];
    case "sir":
      return [-p.beta * y[0] * y[1], p.beta * y[0] * y[1] - p.gamma * y[1], p.gamma * y[1]];
    case "rumor":
      return [-p.beta * y[0] * y[1], p.beta * y[0] * y[1] - p.gamma * y[1], p.gamma * y[1]];
    case "city":
      return [p.r * y[0] * (1 - y[0] / (p.k0 + p.alpha * y[1])), p.invest * y[0] - p.decay * y[1]];
    case "traffic": {
      const out = p.capacity * Math.tanh(y[0] / p.capacity);
      return [p.inflow - out, p.adapt * (y[0] / p.capacity - y[1])];
    }
    case "co2":
      return [p.emissions - p.uptake * (y[0] - p.baseline)];
    case "recycling":
      return [-p.production * y[0] + p.recovery * y[3], p.production * y[0] - p.discard * y[1], p.discard * y[1] - p.collect * y[2], p.collect * y[2] - p.loss * y[3] - p.recovery * y[3]];
    case "wildfire":
      return [-p.spread * y[0] * y[1], p.spread * y[0] * y[1] - p.extinguish * y[1], p.burn * y[1]];
    case "algae":
      return [p.input - p.uptake * y[0] * y[1] + 0.05 * y[1] - 0.04 * y[0], p.growth * y[0] * y[1] / (0.25 + y[0]) - p.death * y[1], p.reaeration * (1 - y[2]) - 0.18 * y[1] + 0.05 * y[1]];
    case "waterCity": {
      const shortage = sigmoid((p.threshold - y[0]) / 0.06);
      return [p.inflow - y[1], p.growth * y[1] - p.conservation * shortage * y[1]];
    }
    default:
      return [-0.05 * y[0]];
  }
}

function rk4Step(model, t, y, dt, knobs) {
  const k1 = derivatives(model, t, y, knobs);
  const y2 = y.map((value, index) => value + (dt * k1[index]) / 2);
  const k2 = derivatives(model, t + dt / 2, y2, knobs);
  const y3 = y.map((value, index) => value + (dt * k2[index]) / 2);
  const k3 = derivatives(model, t + dt / 2, y3, knobs);
  const y4 = y.map((value, index) => value + dt * k3[index]);
  const k4 = derivatives(model, t + dt, y4, knobs);
  return y.map((value, index) => clamp(value + (dt / 6) * (k1[index] + 2 * k2[index] + 2 * k3[index] + k4[index]), -20, 200));
}

function simulate(model, knobs = {}, steps = 260, dt = 0.25) {
  const points = [];
  let state = initialState(model);
  for (let i = 0; i < steps; i += 1) {
    const t = i * dt;
    points.push({ t, y: [...state] });
    state = rk4Step(model, t, state, dt, knobs);
  }
  return points;
}

function drawChart(canvas, model, points, progress = 1) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, rect.width);
  const height = Math.max(220, rect.height);
  if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const pad = { left: 54, right: 22, top: 26, bottom: 42 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const visibleCount = Math.max(2, Math.floor(points.length * progress));
  const visible = points.slice(0, visibleCount);
  const values = visible.flatMap((point) => point.y.map((value) => (Number.isFinite(value) ? value : 0)));
  let minY = Math.min(...values);
  let maxY = Math.max(...values);
  if (Math.abs(maxY - minY) < 1e-6) {
    maxY += 1;
    minY -= 1;
  }
  const margin = (maxY - minY) * 0.12;
  minY -= margin;
  maxY += margin;

  ctx.fillStyle = "rgba(8, 11, 16, 0.58)";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i += 1) {
    const y = pad.top + (plotH * i) / 5;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
  }
  for (let i = 0; i <= 6; i += 1) {
    const x = pad.left + (plotW * i) / 6;
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, height - pad.bottom);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,255,255,0.58)";
  ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText("t", width - pad.right - 10, height - 15);
  ctx.fillText(maxY.toFixed(maxY > 10 ? 0 : 2), 10, pad.top + 8);
  ctx.fillText(minY.toFixed(minY > 10 ? 0 : 2), 10, height - pad.bottom);

  const accent = categoryById.get(model.category)?.accent ?? "#ffffff";
  const colors = [accent, "#ffffff", "#f4dc57", "#65d7c9", "#ff8c42"];
  model.variables.forEach((variable, seriesIndex) => {
    if (seriesIndex > 4) return;
    ctx.strokeStyle = colors[seriesIndex % colors.length];
    ctx.lineWidth = seriesIndex === 0 ? 3 : 2;
    ctx.beginPath();
    visible.forEach((point, index) => {
      const x = pad.left + (plotW * index) / Math.max(visible.length - 1, 1);
      const raw = point.y[seriesIndex] ?? 0;
      const y = pad.top + plotH - ((raw - minY) / (maxY - minY)) * plotH;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    const last = visible[visible.length - 1];
    if (last) {
      const x = pad.left + plotW * ((visible.length - 1) / Math.max(points.length - 1, 1));
      const raw = last.y[seriesIndex] ?? 0;
      const y = pad.top + plotH - ((raw - minY) / (maxY - minY)) * plotH;
      ctx.fillStyle = colors[seriesIndex % colors.length];
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function renderCategories() {
  const select = qs("#category-select");
  const rail = qs("#category-rail");
  CATEGORIES.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.label;
    select.append(option);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category.label;
    button.style.setProperty("--accent", category.accent);
    button.addEventListener("click", () => {
      select.value = category.id;
      filterModels();
      document.getElementById("library").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    rail.append(button);
  });
}

function renderModels(models) {
  const grid = qs("#model-grid");
  grid.innerHTML = "";
  models.forEach((model, index) => {
    const category = categoryById.get(model.category);
    const card = document.createElement("article");
    card.className = "model-card";
    card.style.setProperty("--accent", category?.accent ?? "#fff");
    card.style.animationDelay = `${Math.min(index * 18, 500)}ms`;
    card.innerHTML = `
      <div class="card-topline">
        <span class="model-number">${String(model.id).padStart(2, "0")}</span>
        <span class="dynamic-pill">${model.dynamic}</span>
      </div>
      <h3>${model.name}</h3>
      <p>${model.description}</p>
      <code>${model.formula}</code>
      <footer>
        <span>${category?.label ?? model.category}</span>
        <button type="button" aria-label="${model.name} simulieren">Graph</button>
      </footer>
    `;
    card.querySelector("button").addEventListener("click", (event) => {
      event.stopPropagation();
      selectModel(model);
      document.getElementById("simulator").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    card.addEventListener("click", () => selectModel(model));
    grid.append(card);
  });
}

function filterModels() {
  const search = qs("#search-input").value.trim().toLowerCase();
  const category = qs("#category-select").value;
  const dynamic = qs("#dynamic-select").value;
  const result = MODELS.filter((model) => {
    const haystack = `${model.name} ${model.description} ${model.formula} ${model.observables}`.toLowerCase();
    return (category === "all" || model.category === category) && (dynamic === "all" || model.dynamic === dynamic) && (!search || haystack.includes(search));
  });
  renderModels(result);
  qs("#stat-models").textContent = result.length;
}

function selectModel(model) {
  selectedModel = model;
  const category = categoryById.get(model.category);
  qs("#selected-category").textContent = category?.label ?? model.category;
  qs("#selected-title").textContent = `${String(model.id).padStart(2, "0")} ${model.name}`;
  qs("#selected-description").textContent = model.description;
  qs("#selected-formula").textContent = model.formula;
  qs("#selected-observables").textContent = model.observables;
  qs("#selected-parameters").textContent = Object.keys(model.params).join(", ");
  qs("#chart-title").textContent = model.name;
  renderControls(model);
  drawMainChart(true);
}

function renderControls(model) {
  const container = qs("#parameter-controls");
  container.innerHTML = "";
  const numericEntries = Object.entries(model.params).filter(([, value]) => typeof value === "number").slice(0, 4);
  numericEntries.forEach(([key, value]) => {
    const abs = Math.max(Math.abs(value), 0.01);
    const min = key.toLowerCase().includes("phase") || key.toLowerCase().includes("center") ? 0 : Math.max(0, value - abs * 0.8);
    const max = value + abs * 1.8 + 0.01;
    const row = document.createElement("label");
    row.className = "slider-row";
    row.innerHTML = `
      <span><b>${key}</b><output>${value}</output></span>
      <input type="range" min="${min}" max="${max}" step="${(max - min) / 100}" value="${value}" data-param="${key}">
    `;
    row.querySelector("input").addEventListener("input", () => {
      row.querySelector("output").textContent = Number(row.querySelector("input").value).toFixed(3);
      drawMainChart(true);
    });
    container.append(row);
  });
}

function currentKnobs() {
  const knobs = {};
  document.querySelectorAll("#parameter-controls input").forEach((input) => {
    knobs[input.dataset.param] = Number(input.value);
  });
  return knobs;
}

function drawMainChart(resetProgress = false) {
  if (resetProgress) animationTime = 0;
  const points = simulate(selectedModel, currentKnobs());
  const progress = isPlaying ? clamp(animationTime / 120, 0.08, 1) : 1;
  drawChart(qs("#main-chart"), selectedModel, points, progress);
  renderLegend(selectedModel);
}

function renderLegend(model) {
  const category = categoryById.get(model.category);
  const colors = [category?.accent ?? "#fff", "#ffffff", "#f4dc57", "#65d7c9", "#ff8c42"];
  const legend = qs("#legend-row");
  legend.innerHTML = "";
  model.variables.forEach((variable, index) => {
    const item = document.createElement("span");
    item.innerHTML = `<i style="--legend:${colors[index % colors.length]}"></i>${variable}`;
    legend.append(item);
  });
}

function animateCharts() {
  if (isPlaying) animationTime = (animationTime + 1.4) % 150;
  drawMainChart(false);
  const heroModel = MODELS[(Math.floor(Date.now() / 5000) % MODELS.length)];
  qs("#hero-model-name").textContent = heroModel.name;
  drawChart(qs("#hero-chart"), heroModel, simulate(heroModel, {}, 190, 0.28), 0.25 + 0.75 * ((Date.now() / 5000) % 1));
  chartFrame = requestAnimationFrame(animateCharts);
}

function renderPriority() {
  const grid = qs("#priority-grid");
  PRIORITY.forEach(([title, reason], index) => {
    const card = document.createElement("article");
    card.innerHTML = `<span>${index + 1}</span><h3>${title}</h3><p>${reason}</p>`;
    grid.append(card);
  });
}

function startBackground() {
  const canvas = qs("#phase-canvas");
  const ctx = canvas.getContext("2d");
  const points = Array.from({ length: 110 }, (_, index) => ({
    x: Math.random(),
    y: Math.random(),
    r: 1 + Math.random() * 2,
    speed: 0.12 + Math.random() * 0.45,
    phase: index * 0.31,
  }));

  function frame(now) {
    const dpr = window.devicePixelRatio || 1;
    const { innerWidth: width, innerHeight: height } = window;
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    points.forEach((point) => {
      const x = ((point.x + Math.sin(now * 0.00004 * point.speed + point.phase) * 0.08 + 1) % 1) * width;
      const y = ((point.y + Math.cos(now * 0.00005 * point.speed + point.phase) * 0.08 + 1) % 1) * height;
      ctx.globalAlpha = 0.18 + 0.32 * Math.sin(now * 0.001 + point.phase) ** 2;
      ctx.beginPath();
      ctx.arc(x, y, point.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function init() {
  renderCategories();
  renderPriority();
  renderModels(MODELS);
  selectModel(selectedModel);
  qs("#search-input").addEventListener("input", filterModels);
  qs("#category-select").addEventListener("change", filterModels);
  qs("#dynamic-select").addEventListener("change", filterModels);
  qs("#play-button").addEventListener("click", () => {
    isPlaying = !isPlaying;
    qs("#play-button span").textContent = isPlaying ? "||" : ">";
  });
  qs("#reset-button").addEventListener("click", () => {
    animationTime = 0;
    drawMainChart(true);
  });
  startBackground();
  cancelAnimationFrame(chartFrame);
  animateCharts();
}

window.addEventListener("resize", () => drawMainChart(false));
window.addEventListener("DOMContentLoaded", init);
