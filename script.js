const CATEGORIES = [
  { id: "ovarian", label: { de: "A. Ovarielle Reserve", en: "A. Ovarian Reserve" }, accent: "#ff5d73" },
  { id: "hormones", label: { de: "B. Hormonelle Systeme", en: "B. Hormonal Systems" }, accent: "#33c2ff" },
  { id: "health", label: { de: "C. Gesundheit, Sport, Ernährung", en: "C. Health, Sport, Nutrition" }, accent: "#45d483" },
  { id: "business", label: { de: "D. Startups, Business, Wachstum", en: "D. Startups, Business, Growth" }, accent: "#ffb84d" },
  { id: "ai", label: { de: "E. KI, Software, Plattformen", en: "E. AI, Software, Platforms" }, accent: "#b38cff" },
  { id: "finance", label: { de: "F. Finanzen und Märkte", en: "F. Finance and Markets" }, accent: "#f4dc57" },
  { id: "physics", label: { de: "G. Physik, Technik, Alltag", en: "G. Physics, Technology, Everyday Life" }, accent: "#65d7c9" },
  { id: "society", label: { de: "H. Ökologie und Gesellschaft", en: "H. Ecology and Society" }, accent: "#f08ad6" },
  { id: "mental_medical", label: { de: "I. Mentale & Medizinische Gesundheit", en: "I. Mental & Medical Health" }, accent: "#7ee787" },
];

const I18N = {
  de: {
    brandSub: "120 dynamische Modelle",
    navLibrary: "Bibliothek",
    navSimulator: "Simulator",
    heroEyebrow: "Differentialgleichungen als lebendige Sammlung",
    heroTitle: "Die ODE-Bibliothek für Reproduktion, Hormone, mentale Medizin, KI, Physik und Gesellschaft.",
    heroLead: "Eine zweisprachige Web-App mit 120 Modellideen, animierten Trajektorien, sofort simulierbaren Graphen und einer Struktur, die später echte Daten aufnehmen kann.",
    heroPrimary: "Simulator starten",
    heroSecondary: "Alle Modelle ansehen",
    liveSystem: "Live-System",
    instrumentA: "RK4-Engine",
    instrumentB: "Canvas-Graphen",
    instrumentC: "DE/EN Atlas",
    statModels: "ODE-Ideen",
    statDomains: "Domänen",
    statLang: "Sprachen",
    statAtlas: "ODE-Atlas",
    libraryEyebrow: "Bibliothek",
    libraryTitle: "120 Modelle, sortierbar nach Domäne und Dynamik.",
    libraryLead: "Suche nach Begriffen wie AMH, HPA, PTSD, HIV, Tumor, SIR, GPU oder Cash. Jeder Eintrag besitzt eine ODE-Kernidee, eine Formel und eine Startsimulation.",
    searchLabel: "Suche",
    searchPlaceholder: "z.B. AMH, SaaS, SIR, Koffein",
    categoryLabel: "Kategorie",
    allCategories: "Alle Kategorien",
    dynamicLabel: "Dynamik",
    simulatorEyebrow: "Simulator",
    simulatorTitle: "Wähle ein Modell, verändere Parameter, beobachte die Trajektorie.",
    odeCore: "ODE-Kern",
    observables: "Messgrößen",
    evidenceBasis: "Evidenzbasis",
    parameters: "Parameter",
    graphLab: "Graph-Labor",
    roadmapEyebrow: "Forschungsfrontier",
    roadmapTitle: "Die 5 stärksten Mental- und Medical-ODEs für ein echtes Datenprojekt.",
    footerDisclaimer: "Educational ODE simulations only. Medizinische und finanzielle Modelle sind keine Diagnose, Therapie-, Investment- oder Entscheidungsberatung.",
    backTop: "Zurück nach oben",
    cardGraph: "Graph",
    graphAria: "simulieren",
    dynamics: {
      all: "Alle Dynamiken",
      decay: "Abnahme",
      growth: "Wachstum",
      feedback: "Feedback",
      compartment: "Kompartiment",
      observer: "Beobachtung",
      rhythm: "Rhythmus",
      shock: "Schock",
      threshold: "Schwelle",
      resource: "Ressource",
    },
  },
  en: {
    brandSub: "120 dynamic models",
    navLibrary: "Library",
    navSimulator: "Simulator",
    heroEyebrow: "Differential equations as a living collection",
    heroTitle: "The ODE library for reproduction, hormones, mental medicine, AI, physics, and society.",
    heroLead: "A bilingual web app with 120 model ideas, animated trajectories, instantly simulated graphs, and a structure ready for real data later.",
    heroPrimary: "Start simulator",
    heroSecondary: "Explore all models",
    liveSystem: "Live system",
    instrumentA: "RK4 engine",
    instrumentB: "Canvas graphs",
    instrumentC: "DE/EN atlas",
    statModels: "ODE ideas",
    statDomains: "domains",
    statLang: "languages",
    statAtlas: "ODE atlas",
    libraryEyebrow: "Library",
    libraryTitle: "120 models, sortable by domain and dynamic behavior.",
    libraryLead: "Search for terms such as AMH, HPA, PTSD, HIV, tumor, SIR, GPU, or cash. Every entry includes an ODE core idea, a formula, and a starter simulation.",
    searchLabel: "Search",
    searchPlaceholder: "e.g. AMH, SaaS, SIR, caffeine",
    categoryLabel: "Category",
    allCategories: "All categories",
    dynamicLabel: "Dynamics",
    simulatorEyebrow: "Simulator",
    simulatorTitle: "Choose a model, adjust parameters, and watch the trajectory.",
    odeCore: "ODE core",
    observables: "Observables",
    evidenceBasis: "Evidence basis",
    parameters: "Parameters",
    graphLab: "Graph lab",
    roadmapEyebrow: "Research frontier",
    roadmapTitle: "The 5 strongest mental and medical ODEs for a real data project.",
    footerDisclaimer: "Educational ODE simulations only. Medical and financial models are not diagnosis, treatment, investment, or decision advice.",
    backTop: "Back to top",
    cardGraph: "Graph",
    graphAria: "simulate",
    dynamics: {
      all: "All dynamics",
      decay: "decline",
      growth: "growth",
      feedback: "feedback",
      compartment: "compartment",
      observer: "observation",
      rhythm: "rhythm",
      shock: "shock",
      threshold: "threshold",
      resource: "resource",
    },
  },
};

const MODELS = [
  {
    id: 1,
    category: "ovarian",
    name: "Einfache Eizellreserve-Abnahme",
    dynamic: "decay",
    formula: "dR/dt = -k R",
    description: "Basislinie für Reserveverlust mit konstanter Rate.",
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
    formula: "dR/dt = -k(t) R, k(t)=k1 (t<35), k2 (t>=35)",
    description: "Stückweise Dynamik für langsamere und schnellere Reserveabnahme.",
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
    description: "Kompartimentfluss von frühen zu antralen Follikeln.",
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
    description: "AFC wird als geglättete Beobachtung der antralen Population modelliert.",
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
    description: "Akuter zusätzlicher Verlustimpuls während Chemotherapie.",
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
    description: "Dosisabhängiger Kill-Term für Reserveverlust.",
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
    description: "Hohe antrale Follikelzahl und veränderte hormonelle Reifung.",
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
    description: "Menopause-Signal steigt, sobald die Reserve unter eine Schwelle fällt.",
    variables: ["R", "M"],
    observables: "Reserve R, Schwellenwahrscheinlichkeit M",
    params: { k: 0.045, rc: 0.22, width: 0.04, d: 0.08 },
    preset: "threshold",
  },
  {
    id: 13,
    category: "ovarian",
    name: "AMH-Verlauf über Jahre",
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
    name: "Zykluslänge als Folge von Reserve",
    dynamic: "feedback",
    formula: "R'=-k R; C'=a(h(R)-C)",
    description: "Zykluslänge passt sich langsam an Reserve und Follikeldynamik an.",
    variables: ["R", "Cycle"],
    observables: "Reserve, Zykluslänge",
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
    name: "Risiko für poor responder",
    dynamic: "threshold",
    formula: "A'=-k A; P'=a(sigma((Ac-A)/w)-P)",
    description: "Risiko folgt einem gegeglätteten AFC-Schwellenwert.",
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
    observables: "Reserve, persönlicher Abbauparameter",
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
    description: "Reserve sinkt über mehrere Stimulationszyklen, Antwort schwankt.",
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
    formula: "GnRH', LH', FSH', E', P' with feedback + circadian input",
    description: "Gekoppeltes Hormonnetz für GnRH, LH, FSH, Östrogen und Progesteron.",
    variables: ["GnRH", "LH", "FSH", "E", "P"],
    observables: "LH-Surge, Östrogen, Progesteron",
    params: { period: 28, feedback: 1.2 },
    preset: "cycleHormones",
  },
  {
    id: 22,
    category: "hormones",
    name: "LH-Surge-Modell",
    dynamic: "feedback",
    formula: "E'=rE(1-E/K)-dE E; LH'=b+g sigma(E-Ec)-c LH",
    description: "Positives Östrogenfeedback erzeugt einen LH-Surge.",
    variables: ["E", "LH", "P"],
    observables: "Östrogen, LH, Progesteron",
    params: { r: 0.2, k: 1.0, g: 2.5, ec: 0.58, c: 0.4 },
    preset: "lhSurge",
  },
  {
    id: 23,
    category: "hormones",
    name: "Schilddrüsenhormon-Modell",
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
    description: "Glukoseaufnahme und Insulinausschüttung nach Mahlzeiten.",
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
    description: "Sättigungsabhängiger Alkoholabbau.",
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
    description: "Fitness steigt durch Reiz, Ermüdung steigt schneller und klingt ab.",
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
    description: "Trainingsreiz treibt Synthese, Abbau zieht Muskelmasse zurück.",
    variables: ["Muscle"],
    observables: "Muskelmasse",
    params: { synth: 0.16, km: 0.4, breakdown: 0.028 },
    preset: "stimGrowth",
  },
  {
    id: 34,
    category: "health",
    name: "Körpergewicht",
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
    description: "Ernährung, Medikamente und natürlicher Abbau senken LDL.",
    variables: ["LDL"],
    observables: "LDL-Cholesterin",
    params: { production: 2.2, clearance: 0.025, drug: 0.035 },
    preset: "ldl",
  },
  {
    id: 36,
    category: "health",
    name: "Entzündungsmarker",
    dynamic: "shock",
    formula: "S'=insult(t)-dS S; I'=g S-c I",
    description: "Reiz, Immunantwort und Abklingen eines Markers.",
    variables: ["Stimulus", "Inflammation"],
    observables: "Stimulus, Entzündung",
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
    description: "Gewebereparatur über Zeit.",
    variables: ["Damage", "Repair"],
    observables: "Schaden, Reparaturaktivität",
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
    name: "Viralitätsmodell",
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
    name: "Marketplace-Liquidität",
    dynamic: "feedback",
    formula: "S'=s0+a M-dS S; D'=d0+b M-dD D; M'=m S D/(1+S+D)-c M",
    description: "Angebot und Nachfrage koppeln sich über Matches.",
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
    name: "Produktivitätsmodell im Team",
    dynamic: "feedback",
    formula: "Exp'=onboard(team-Exp)-attrition Exp; Overhead'=coord team^2-d O; Prod'=g Exp-h O-dP Prod",
    description: "Onboarding, Erfahrung und Kommunikations-Overhead.",
    variables: ["Experience", "Overhead", "Productivity"],
    observables: "Erfahrung, Overhead, Produktivität",
    params: { team: 0.65, onboard: 0.18, coord: 0.08, drag: 0.35 },
    preset: "teamProductivity",
  },
  {
    id: 50,
    category: "business",
    name: "Feature-Debt-Modell",
    dynamic: "feedback",
    formula: "Value'=feature_rate-complexity Debt; Debt'=a feature_rate-refactor Debt",
    description: "Entwicklung erhöht Wert und Komplexität.",
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
    name: "LLM-Warteschlangenmodell",
    dynamic: "resource",
    formula: "Q'=arrival-service(Q); W'=a(Q/mu-W)",
    description: "Anfragen, Verarbeitung und Wartezeit.",
    variables: ["Queue", "Wait"],
    observables: "Warteschlangenlänge, Wartezeit",
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
    description: "Neue Bugs minus gelöste Bugs.",
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
    description: "Neue Features erhöhen Debt, Refactoring senkt ihn.",
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
    description: "Daten-Drift senkt Modellqualität, Retraining stabilisiert.",
    variables: ["Drift", "Quality"],
    observables: "Drift, Qualität",
    params: { drift: 0.04, retrain: 0.02, degrade: 0.5, gain: 0.55 },
    preset: "modelDrift",
  },
  {
    id: 58,
    category: "ai",
    name: "Retrieval-Qualität",
    dynamic: "feedback",
    formula: "Knowledge'=add-decay Knowledge; Quality'=benefit Knowledge/(Km+Knowledge)-stale Quality",
    description: "Wissensbasis wächst, Veralterung senkt Qualität.",
    variables: ["Knowledge", "Quality"],
    observables: "Wissensbasis, Retrieval-Qualität",
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
    description: "Popularität verstärkt Popularität über Exposition.",
    variables: ["Popularity", "Exposure"],
    observables: "Popularität, Exposition",
    params: { base: 0.02, feedback: 0.45, dP: 0.08, rank: 0.24, dE: 0.18 },
    preset: "recommendation",
  },
  {
    id: 61,
    category: "finance",
    name: "Portfolio-Wachstum",
    dynamic: "growth",
    formula: "Capital'=return Capital+contribution(t)",
    description: "Kapital wächst mit Rendite und Einzahlungen.",
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
    name: "Volatilitätsmodell",
    dynamic: "shock",
    formula: "S'=shock(t)-d S; Vol'=a(base-Vol)+g S",
    description: "Volatilität steigt bei Schocks und fällt langsam.",
    variables: ["ShockMemory", "Volatility"],
    observables: "Schockspeicher, Volatilität",
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
    name: "Token-Ökonomie",
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
    name: "Liquiditätsrisiko",
    dynamic: "threshold",
    formula: "Cash'=inflow-outflow; Risk'=a(sigma((threshold-Cash)/w)-Risk)",
    description: "Cashbestand und Abflussrate treiben Liquiditätsrisiko.",
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
    description: "Newtonsches Abkühlen.",
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
    description: "Verbrauch und Ladeleistung über Zeit.",
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
    observables: "Kern- und Oberflächenfeuchte",
    params: { diffusion: 0.16, evap: 0.08 },
    preset: "drying",
  },
  {
    id: 76,
    category: "physics",
    name: "Wärmeverlust im Boden",
    dynamic: "decay",
    formula: "T'=conductance(Outside-T)/capacity",
    description: "Isolation und Temperaturgradient bestimmen Wärmeverlust.",
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
    description: "PID-Regelung für Heizbett-Temperatur.",
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
    description: "Energieverbrauch über Flugzeit.",
    variables: ["Energy", "Altitude"],
    observables: "Energie, Höhe",
    params: { power: 0.04, climb: 0.035, sink: 0.06 },
    preset: "drone",
  },
  {
    id: 79,
    category: "physics",
    name: "Kamera-Akku bei Kälte",
    dynamic: "resource",
    formula: "Battery'=-draw(1+cold_gain max(0,20-Temp)/20)",
    description: "Temperaturabhängiger Verbrauch.",
    variables: ["Battery", "Temperature"],
    observables: "Akkustand, Temperatur",
    params: { draw: 0.032, coldGain: 0.9, ambient: 0.08, relax: 0.05 },
    preset: "coldBattery",
  },
  {
    id: 80,
    category: "physics",
    name: "Gebäudeheizung",
    dynamic: "feedback",
    formula: "Indoor'=heat/cap+e(Wall-Indoor)-loss(Indoor-Outdoor); Wall'=e(Indoor-Wall)-g(Wall-Outdoor)",
    description: "Wärmekapazität, Verlust und Heizinput.",
    variables: ["Indoor", "Wall"],
    observables: "Innen- und Wandtemperatur",
    params: { heat: 0.09, exchange: 0.1, loss: 0.055, outdoor: 0.2 },
    preset: "buildingHeat",
  },
  {
    id: 81,
    category: "society",
    name: "Räuber-Beute-Modell",
    dynamic: "feedback",
    formula: "Prey'=a Prey-b Prey Predator; Predator'=c Prey Predator-d Predator",
    description: "Lotka-Volterra Dynamik.",
    variables: ["Prey", "Predator"],
    observables: "Beute, Räuber",
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
    name: "Gerüchte-Verbreitung",
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
    name: "Städtewachstum",
    dynamic: "growth",
    formula: "Pop'=r Pop(1-Pop/(K0+a Infra)); Infra'=invest Pop-d Infra",
    description: "Bevölkerung und Infrastruktur wachsen gekoppelt.",
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
    description: "Zufluss, Kapazität und Abfluss.",
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
    description: "Brennbares Material, Feuer und verbrannte Fläche.",
    variables: ["Fuel", "Fire", "Burned"],
    observables: "Fuel, Fire, Burned",
    params: { spread: 0.7, extinguish: 0.22, burn: 0.18 },
    preset: "wildfire",
  },
  {
    id: 89,
    category: "society",
    name: "See-Algenblüte",
    dynamic: "feedback",
    formula: "N'=input-u N A+r A-dN N; A'=g N A/(Km+N)-death A; O'=reaeration(sat-O)-resp A+photo A",
    description: "Nährstoffe, Algen und Sauerstoff.",
    variables: ["Nutrients", "Algae", "Oxygen"],
    observables: "Nährstoffe, Algen, Sauerstoff",
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
  {
    id: 91,
    category: "mental_medical",
    name: "HPA-Achse und allostatische Last",
    dynamic: "feedback",
    formula: "CRH'=stress/(1+f C GR)-c1 CRH; ACTH'=a CRH/(1+C GR)-c2 ACTH; C'=b ACTH-c3 C; GR'=repair(1-GR)-damage C GR",
    description: "Hypothalamus-Hypophysen-Nebennieren-Achse mit Cortisol-Feedback und Glukokortikoid-Rezeptor-Adaption.",
    variables: ["CRH", "ACTH", "Cortisol", "GR"],
    observables: "Cortisol, CRH/ACTH, Rezeptor-Sensitivität",
    params: { stress: 0.16, feedback: 1.4, acthDrive: 0.65, cortDrive: 0.55, clear: 0.28, grRepair: 0.08, grDamage: 0.1 },
    preset: "hpaAxis",
    evidence: ["HPA axis", "depression", "allostasis"],
  },
  {
    id: 92,
    category: "mental_medical",
    name: "Zirkadiane Depression-Bistabilität",
    dynamic: "rhythm",
    formula: "M'=aM-bM^3+sC-rD; D'=q(circadian-D)-uC; C'=base+amp circadian+stress-cC",
    description: "Mood-Burden, zirkadianer Drive und Cortisol können stabile oder kippende Zustände erzeugen.",
    variables: ["MoodBurden", "CircadianDrive", "Cortisol"],
    observables: "Symptomlast, Tagesrhythmus, Cortisol",
    params: { moodGain: 0.18, nonlinear: 0.42, driveGain: 0.22, stressGain: 0.34, entrain: 0.2, cortDrag: 0.08, base: 0.2, amp: 0.18, clear: 0.25 },
    preset: "circadianBistableMood",
    evidence: ["bistability", "circadian", "mood"],
  },
  {
    id: 93,
    category: "mental_medical",
    name: "Rumination-Stress-Depressionsschleife",
    dynamic: "feedback",
    formula: "S'=load+sens R-coping S; R'=trigger S+habit R(1-R)-disengage R; M'=aR+bS-rec M",
    description: "Eine positive Schleife aus Stressoren, Rumination und Symptomlast als Interventionsziel.",
    variables: ["Stressors", "Rumination", "MoodBurden"],
    observables: "Stress, Rumination, depressive Last",
    params: { load: 0.06, sensitivity: 0.1, coping: 0.18, trigger: 0.22, habit: 0.16, disengage: 0.11, ruminationGain: 0.32, stressGain: 0.18, recovery: 0.2 },
    preset: "ruminationLoop",
    evidence: ["rumination", "system dynamics", "depression"],
  },
  {
    id: 94,
    category: "mental_medical",
    name: "Stress-Reward-Mentalizing Depression",
    dynamic: "feedback",
    formula: "S'=load-resilience Z S; R'=gain/(1+hS)-dR; Z'=practice(1-Z)-stress ZS; M'=aS-bR-recM",
    description: "Stress senkt Belohnungssensitivität und Mentalizing; Reward puffert Symptomlast.",
    variables: ["Stress", "Reward", "Mentalizing", "MoodBurden"],
    observables: "Stress, Reward-Index, Mentalizing, Symptomlast",
    params: { load: 0.1, resilience: 0.35, rewardGain: 0.24, stressSuppression: 1.2, rewardDecay: 0.16, practice: 0.08, stressDamage: 0.12, burdenGain: 0.28, rewardBuffer: 0.2, recovery: 0.16 },
    preset: "stressRewardMentalizing",
    evidence: ["RDoC", "reward", "social processes"],
  },
  {
    id: 95,
    category: "mental_medical",
    name: "SSRI-Wirkverzögerung und Neuroplastizität",
    dynamic: "compartment",
    formula: "D'=dose-kaD; 5HT'=base+rel-clear 5HT/(1+iD); P'=adapt 5HT/(Km+5HT)-lossP; S'=stress-benefit P S-recS",
    description: "PK/PD-Skeleton für frühe serotonerge Änderung und langsamere Symptomantwort über Plastizität.",
    variables: ["Drug", "Serotonin", "Plasticity", "SymptomBurden"],
    observables: "Wirkspiegel, Serotonin, Plastizität, Symptomlast",
    params: { dose: 0.45, ka: 0.75, base: 0.1, release: 0.08, clear: 0.4, inhibition: 1.4, adapt: 0.16, km: 0.35, loss: 0.045, stress: 0.08, benefit: 0.24, recovery: 0.04 },
    preset: "ssriPlasticity",
    evidence: ["PK/PD", "SSRI", "plasticity"],
  },
  {
    id: 96,
    category: "mental_medical",
    name: "PTSD-Furchtextinktion",
    dynamic: "threshold",
    formula: "F'=recon A(1-F)-ext exposure Safety F; Safety'=learn exposure(1-Safety)-forget Safety; A'=cueF+stress-calm Safety A",
    description: "Exposition stärkt Safety-Memory und senkt Furcht nur, wenn Arousal und Erinnerung gemeinsam modelliert werden.",
    variables: ["Fear", "SafetyMemory", "Arousal"],
    observables: "Furcht, Safety Memory, Arousal",
    params: { exposure: 0.65, reconsolidation: 0.18, extinction: 0.45, learning: 0.3, forget: 0.035, cue: 0.32, stress: 0.04, calm: 0.35 },
    preset: "fearExtinction",
    evidence: ["PTSD", "fear extinction", "learning"],
  },
  {
    id: 97,
    category: "mental_medical",
    name: "Panik-CO2-Arousal-Schleife",
    dynamic: "feedback",
    formula: "CO2'=challenge-breath CO2; A'=sens CO2+anticip Avoid-calm A; Avoid'=learn A(1-Avoid)-exposure Avoid",
    description: "Interozeptive CO2-Sensitivität, Arousal und Vermeidung bilden eine verstärkende Panikschleife.",
    variables: ["CO2", "Arousal", "Avoidance"],
    observables: "CO2-Proxy, Arousal, Vermeidung",
    params: { challenge: 0.08, breathing: 0.18, sensitivity: 0.55, anticipation: 0.28, calm: 0.34, learning: 0.2, exposure: 0.08 },
    preset: "panicLoop",
    evidence: ["interoception", "panic", "avoidance"],
  },
  {
    id: 98,
    category: "mental_medical",
    name: "Sucht: Reward-Learning und Craving",
    dynamic: "feedback",
    formula: "Cue'=cue(t)-dCue; Craving'=sens Cue(1+l(1-Control))-ext Control Craving; Control'=rec(1-Control)-stress Craving Control+treat(1-Control)",
    description: "Cue-Sensitisierung, Craving und Kontrollkapazität als behandelbare dynamische Variablen.",
    variables: ["Cue", "Craving", "Control"],
    observables: "Cue-Salienz, Craving, Kontrolle",
    params: { cue: 0.5, cueDecay: 0.28, sensitization: 0.42, learning: 0.75, extinction: 0.22, recovery: 0.08, stress: 0.2, treatment: 0.05 },
    preset: "addictionLearning",
    evidence: ["addiction", "reward learning", "control"],
  },
  {
    id: 99,
    category: "mental_medical",
    name: "Bipolare Mood-Oszillation",
    dynamic: "rhythm",
    formula: "Mood'=Momentum; Momentum'=drive(bias-Mood)-d Momentum-nl Mood^3+sleep SleepDebt; SleepDebt'=mania max(Mood,0)-rec SleepDebt",
    description: "Nichtlinearer Mood-Oszillator, bei dem Schlafschuld Phasenwechsel verstärken kann.",
    variables: ["Mood", "Momentum", "SleepDebt"],
    observables: "Mood-Lage, Momentum, Schlafschuld",
    params: { drive: 0.16, bias: 0, damping: 0.08, nonlinear: 0.08, sleepGain: 0.2, mania: 0.18, recovery: 0.11 },
    preset: "bipolarOscillator",
    evidence: ["bipolar", "oscillation", "sleep"],
  },
  {
    id: 100,
    category: "mental_medical",
    name: "Soziale Isolation als Attraktor",
    dynamic: "feedback",
    formula: "C'=outreach(1-C)-withdraw Threat C; Threat'=stress+iso(1-C)-safety C Threat; Infl'=immune Threat-clear Infl",
    description: "Verbindung, Bedrohungswahrnehmung und Inflammation können in hilfreiche oder schädliche Attraktoren kippen.",
    variables: ["Connection", "Threat", "Inflammation"],
    observables: "Soziale Verbindung, Threat, Inflammation",
    params: { outreach: 0.1, withdrawal: 0.24, stress: 0.04, isolation: 0.22, safety: 0.3, immune: 0.2, clear: 0.14 },
    preset: "socialIsolationAttractor",
    evidence: ["social isolation", "attractors", "inflammation"],
  },
  {
    id: 101,
    category: "mental_medical",
    name: "Digitaler Relapse-Risiko-Beobachter",
    dynamic: "observer",
    formula: "Stress'=load-coping Stress; Sleep'=disrupt+s Stress-rec Sleep; Bio'=gain(Stress+Sleep)-clear Bio; Risk'=a(sigmoid((Bio-th)/w)-Risk)",
    description: "Wearable- und Smartphone-Signale werden als geglätteter Risikobeobachter modelliert.",
    variables: ["Stress", "SleepDebt", "Biomarker", "Risk"],
    observables: "Stress, Schlafschuld, digitaler Marker, Relapse-Risiko",
    params: { load: 0.08, coping: 0.16, disruption: 0.04, stressSleep: 0.18, sleepRecovery: 0.15, gain: 0.34, clear: 0.22, threshold: 0.5, width: 0.08, adapt: 0.5 },
    preset: "relapseObserver",
    evidence: ["digital phenotyping", "relapse", "observer"],
  },
  {
    id: 102,
    category: "mental_medical",
    name: "Expositionstherapie und Skill-Aufbau",
    dynamic: "feedback",
    formula: "D'=trigger+relief Avoid-skill Skill D-hab exposure D; Skill'=learn exposure(1-Skill)-forget Skill; Avoid'=threat D(1-Avoid)-approach Skill Avoid",
    description: "Exposition senkt Distress über Habituation und baut eine langsam vergessende Skill-Komponente auf.",
    variables: ["Distress", "Skill", "Avoidance"],
    observables: "Distress, Skill, Vermeidung",
    params: { trigger: 0.06, avoidanceRelief: 0.12, skill: 0.35, habituation: 0.26, learning: 0.22, forget: 0.035, threat: 0.28, approach: 0.24 },
    preset: "exposureLearning",
    evidence: ["CBT", "exposure", "learning"],
  },
  {
    id: 103,
    category: "mental_medical",
    name: "Achtsamkeit: Aufmerksamkeitskontrolle",
    dynamic: "feedback",
    formula: "R'=trigger+arousal A-decenter Attention R; Attention'=practice(1-Attention)-fatigue A Attention; A'=stress+rum R-calm Attention A",
    description: "Aufmerksamkeitskontrolle wirkt als Bremse zwischen Arousal und Rumination.",
    variables: ["Rumination", "Attention", "Arousal"],
    observables: "Rumination, Attention, Arousal",
    params: { trigger: 0.06, arousalGain: 0.22, decenter: 0.38, practice: 0.16, fatigue: 0.14, stress: 0.06, ruminationGain: 0.24, calm: 0.3 },
    preset: "mindfulnessControl",
    evidence: ["mindfulness", "attention", "rumination"],
  },
  {
    id: 104,
    category: "mental_medical",
    name: "HRV und autonome Balance",
    dynamic: "observer",
    formula: "S'=stress-vagal P S-clear S; P'=rec(1-P)-cost S P+breath(t); HRV'=a(P/(1+S)-HRV)",
    description: "Sympathikus, Parasympathikus und HRV als kompakter Stressregulations-Proxy.",
    variables: ["Sympathetic", "Parasympathetic", "HRV"],
    observables: "Autonomer Tonus und HRV",
    params: { stress: 0.18, vagal: 0.35, clear: 0.22, recovery: 0.11, cost: 0.18, breathing: 0.08, adapt: 0.45 },
    preset: "autonomicBalance",
    evidence: ["HRV", "autonomic", "stress"],
  },
  {
    id: 105,
    category: "mental_medical",
    name: "Gut-Brain-Inflammationsschleife",
    dynamic: "feedback",
    formula: "Micro'=diet(1-Micro)-stress Cyto Micro; Cyto'=dysbiosis(1-Micro)+insult-clear Cyto; Mood'=cyto Cyto-resilience Micro Mood-rec Mood",
    description: "Mikrobiom-Diversität, Zytokine und Mood-Burden als immunmetabolische Schleife.",
    variables: ["Microbiome", "Cytokines", "MoodBurden"],
    observables: "Mikrobiom, Zytokine, Symptomlast",
    params: { diet: 0.08, stressDamage: 0.1, dysbiosis: 0.18, insult: 0.04, clear: 0.16, cytoGain: 0.25, resilience: 0.16, recovery: 0.07 },
    preset: "gutBrainInflammation",
    evidence: ["gut-brain", "cytokines", "mood"],
  },
  {
    id: 106,
    category: "mental_medical",
    name: "Tumor-Immune-Checkpoint-Therapie",
    dynamic: "compartment",
    formula: "T'=rT(1-T/K)-kill E T-drug D T; E'=prime T/(Km+T)+therapy D-exhaust C E-dE; C'=gain T-clear C-block D C; D'=dose(t)-cD",
    description: "Tumor, Effektor-T-Zellen, Checkpoint-Last und Therapieimpulse in einem translationalen ODE-Skeleton.",
    variables: ["Tumor", "EffectorT", "Checkpoint", "Drug"],
    observables: "Tumorlast, Immunantwort, Checkpoint, Medikament",
    params: { growth: 0.22, k: 1.4, kill: 0.38, drugKill: 0.18, priming: 0.28, km: 0.2, immunotherapy: 0.18, exhaustion: 0.25, decayE: 0.08, checkpointGain: 0.24, checkpointClear: 0.1, block: 0.22, dose: 0.45, clear: 0.28 },
    preset: "tumorImmuneCheckpoint",
    evidence: ["tumor-immune", "checkpoint", "ODE"],
  },
  {
    id: 107,
    category: "mental_medical",
    name: "Within-Host HIV-Viraldynamik",
    dynamic: "compartment",
    formula: "T'=lambda-dT T-beta T V; I'=beta T V-delta I; V'=burst I-cV-therapy(t)V",
    description: "Klassisches Target-Infected-Virus-Modell mit später Therapie-Suppression.",
    variables: ["TargetCells", "InfectedCells", "Virus"],
    observables: "Target cells, infected cells, viral load",
    params: { lambda: 0.18, death: 0.04, beta: 0.45, delta: 0.35, burst: 1.4, clear: 0.7, therapy: 0.45 },
    preset: "viralDynamics",
    evidence: ["HIV dynamics", "viral load", "ODE"],
  },
  {
    id: 108,
    category: "mental_medical",
    name: "Sepsis: Zytokine, Schaden, Blutdruck",
    dynamic: "shock",
    formula: "P'=gP/(1+P)-kill C P-abxP; C'=immuneP-clearC+feedD; D'=tox C-repairD; BP'=rec(1-BP)-vaso C BP",
    description: "Pathogen, Zytokinantwort, Organschaden und Blutdruck als dynamische Sepsis-Skizze.",
    variables: ["Pathogen", "Cytokine", "Damage", "BloodPressure"],
    observables: "Pathogenlast, Cytokine, Schaden, Blutdruck",
    params: { growth: 0.32, kill: 0.42, antibiotic: 0.08, immune: 0.55, clear: 0.34, damageFeed: 0.1, toxicity: 0.26, repair: 0.12, recovery: 0.18, vasodilation: 0.22 },
    preset: "sepsisInflammation",
    evidence: ["sepsis", "cytokines", "shock"],
  },
  {
    id: 109,
    category: "mental_medical",
    name: "Antibiotikaresistenz-Wettbewerb",
    dynamic: "compartment",
    formula: "S'=rS S(1-N/K)-kill D S-mut S; R'=rR R(1-N/K)+mut S-cost R-kR D R; D'=dose(t)-clearD",
    description: "Sensitive und resistente Stämme konkurrieren unter gepulster Antibiotikagabe.",
    variables: ["Sensitive", "Resistant", "Drug"],
    observables: "Sensitive Zellen, resistente Zellen, Wirkspiegel",
    params: { growthS: 0.35, growthR: 0.24, k: 1.2, kill: 0.65, mutation: 0.015, cost: 0.04, resistantKill: 0.12, dose: 0.55, clear: 0.45 },
    preset: "resistanceCompetition",
    evidence: ["antibiotic resistance", "competition", "PK/PD"],
  },
  {
    id: 110,
    category: "mental_medical",
    name: "Krebs: Sensitive und resistente Klone",
    dynamic: "compartment",
    formula: "S'=rS S(1-N/K)-kill D S-mutS; R'=rR R(1-N/K)+mutS-costR; D'=dose(t)-clearD",
    description: "Tumorheterogenität mit sensiblen und resistenten Klonen unter Therapieimpulsen.",
    variables: ["SensitiveTumor", "ResistantTumor", "Drug"],
    observables: "Sensitive Klone, resistente Klone, Wirkstoff",
    params: { growthS: 0.24, growthR: 0.17, k: 1.5, kill: 0.4, mutation: 0.01, cost: 0.025, dose: 0.42, clear: 0.28 },
    preset: "cancerResistance",
    evidence: ["cancer resistance", "clonal dynamics", "therapy"],
  },
  {
    id: 111,
    category: "mental_medical",
    name: "Alzheimer Amyloid-Tau-Neuroinflammation",
    dynamic: "feedback",
    formula: "A'=prod-clearA A-micro M A; Tau'=seed A-clearT Tau; N'=-tox(A+Tau)N+repair(1-N); M'=activation(A+Tau)-resolution M",
    description: "Amyloid, Tau, Neuronen und Mikroglia als gekoppelte neurodegenerative Kaskade.",
    variables: ["Amyloid", "Tau", "Neurons", "Microglia"],
    observables: "Amyloid, Tau, neuronale Reserve, Mikroglia",
    params: { prod: 0.055, clearA: 0.05, microClear: 0.08, tauSeed: 0.11, clearT: 0.045, neurotox: 0.045, repair: 0.012, activation: 0.12, resolution: 0.11 },
    preset: "alzheimerCascade",
    evidence: ["Alzheimer", "amyloid-tau", "neuroinflammation"],
  },
  {
    id: 112,
    category: "mental_medical",
    name: "Parkinson Dopamin-Neuron-Verlust",
    dynamic: "decay",
    formula: "N'=-stress N+rescue(1-N); Dopamine'=synth N-clear D; Burden'=gain max(th-D,0)-adapt Burden",
    description: "Nigrostriatale Neuronen steuern Dopamin; unter Schwelle steigt motorische Symptomlast.",
    variables: ["Neurons", "Dopamine", "MotorBurden"],
    observables: "Neuronale Reserve, Dopamin, Motorburden",
    params: { stress: 0.025, rescue: 0.008, synth: 0.35, clear: 0.22, threshold: 0.55, burdenGain: 0.22, adapt: 0.08 },
    preset: "parkinsonDopamine",
    evidence: ["Parkinson", "dopamine", "neurodegeneration"],
  },
  {
    id: 113,
    category: "mental_medical",
    name: "Epilepsie E-I-Seizure-Risk",
    dynamic: "threshold",
    formula: "E'=(-E+sigmoid(gEE E-gEI I-A+stim))/tauE; I'=(-I+sigmoid(gIE E-gII I))/tauI; A'=rec E-decay A",
    description: "Wilson-Cowan-artige Erregung-Hemmung-Dynamik mit Adaptation als Seizure-Risk-Kern.",
    variables: ["Excitation", "Inhibition", "Adaptation"],
    observables: "Excitation, Inhibition, Adaptation",
    params: { gEE: 4.2, gEI: 3.5, gIE: 3.2, gII: 1, stim: -0.8, tauE: 1, tauI: 1.6, recruit: 0.12, decay: 0.08 },
    preset: "seizureEI",
    evidence: ["Wilson-Cowan", "epilepsy", "E/I balance"],
  },
  {
    id: 114,
    category: "mental_medical",
    name: "Migräne Cortical-Spreading-Dynamik",
    dynamic: "shock",
    formula: "E'=stim+gainK-inhib R E-decayE; K'=releaseE-clearK; R'=restore(1-R)-fatigue E R",
    description: "Ein reduziertes Excitation-Kalium-Recovery-System für spreading-depression-ähnliche Wellen.",
    variables: ["Excitation", "Potassium", "Recovery"],
    observables: "Erregung, Kalium-Proxy, Recovery",
    params: { stim: 0.035, kGain: 0.28, inhibition: 0.45, decay: 0.22, release: 0.24, clearK: 0.2, restore: 0.1, fatigue: 0.18 },
    preset: "migraineCsd",
    evidence: ["migraine", "cortical spreading", "recovery"],
  },
  {
    id: 115,
    category: "mental_medical",
    name: "Chronischer Schmerz und Sensibilisierung",
    dynamic: "feedback",
    formula: "N'=injury-analgesia A N-clearN; S'=plasticity N(1-S)-desens A S-decayS; A'=treat(t)-clearA",
    description: "Nociception treibt Sensibilisierung; Analgesie senkt Schmerzinput und plastische Verstärkung.",
    variables: ["Nociception", "Sensitization", "Analgesia"],
    observables: "Nociception, Sensibilisierung, Analgesie",
    params: { injury: 0.08, analgesia: 0.4, clearN: 0.16, plasticity: 0.3, desensitize: 0.22, decayS: 0.045, treatment: 0.3, clearA: 0.24 },
    preset: "painSensitization",
    evidence: ["chronic pain", "sensitization", "analgesia"],
  },
  {
    id: 116,
    category: "mental_medical",
    name: "Diabetes Beta-Zell-Kompensation",
    dynamic: "feedback",
    formula: "G'=meal+hepatic-uptake I G-basal(G-90); I'=secret Beta max(G-90)/(Km+G)-clearI; Beta'=comp hyper Beta-glucotox hyper Beta-turnover(Beta-1)",
    description: "Glukose, Insulin und Beta-Zell-Masse mit Kompensation und Glukotoxizität.",
    variables: ["Glucose", "Insulin", "BetaCell"],
    observables: "Glukose, Insulin, Beta-Zellen",
    params: { hepatic: 8, uptake: 0.0025, basalClear: 0.05, secretion: 1.25, km: 120, clearI: 0.28, compensation: 0.0008, glucotoxicity: 0.0009, turnover: 0.015 },
    preset: "betaCellDiabetes",
    evidence: ["diabetes", "beta-cell", "glucose-insulin"],
  },
  {
    id: 117,
    category: "mental_medical",
    name: "Hypertonie RAAS-Druck-Regelkreis",
    dynamic: "feedback",
    formula: "P'=salt+raas R-natriuresis N P-relax(P-base); R'=signal(setpoint-P)-block R; N'=pressure max(P-base)-clearN",
    description: "Blutdruck, RAAS und Drucknatriurese als kompakter Regelkreis.",
    variables: ["Pressure", "RAAS", "Natriuresis"],
    observables: "Druck, RAAS, Natriurese",
    params: { salt: 0.08, raasGain: 0.28, natriuresis: 0.22, relax: 0.1, baseline: 1, setpoint: 0.98, width: 0.08, block: 0.12, pressureGain: 0.25, clearN: 0.16 },
    preset: "hypertensionRaas",
    evidence: ["hypertension", "RAAS", "homeostasis"],
  },
  {
    id: 118,
    category: "mental_medical",
    name: "Asthma Entzündung und Bronchokonstriktion",
    dynamic: "feedback",
    formula: "I'=allergen+eos B-steroid M I-clearI; B'=bronch I-bronchod M B-relaxB; M'=dose(t)-clearM",
    description: "Allergen-getriebene Inflammation koppelt an Bronchokonstriktion und Medikamentenwirkung.",
    variables: ["Inflammation", "Bronchoconstriction", "Medication"],
    observables: "Inflammation, Bronchokonstriktion, Medikation",
    params: { allergen: 0.08, eosGain: 0.1, steroid: 0.28, clearI: 0.15, bronch: 0.4, bronchodilator: 0.35, relax: 0.22, dose: 0.38, clearM: 0.3 },
    preset: "asthmaInflammation",
    evidence: ["asthma", "inflammation", "bronchoconstriction"],
  },
  {
    id: 119,
    category: "mental_medical",
    name: "Placebo-Nocebo-Erwartungsdynamik",
    dynamic: "feedback",
    formula: "E'=reinforce(baseline-Symptom)-decay(E-neutral); Symptom'=stress-placebo max(E,0)Symptom+nocebo max(-E,0)-treat Adh Symptom; Adh'=trust sigmoid(E)(1-Adh)-burden Symptom Adh",
    description: "Erwartung beeinflusst Symptomwahrnehmung und Adhärenz, mit positiver und negativer Richtung.",
    variables: ["Expectation", "SymptomBurden", "Adherence"],
    observables: "Erwartung, Symptomlast, Adhärenz",
    params: { reinforcement: 0.16, baseline: 0.55, decay: 0.08, neutral: 0, stress: 0.06, placebo: 0.2, nocebo: 0.16, treatment: 0.18, trust: 0.2, burden: 0.1 },
    preset: "expectationAdherence",
    evidence: ["placebo", "nocebo", "adherence"],
  },
  {
    id: 120,
    category: "mental_medical",
    name: "Personalisierte Closed-Loop-Care",
    dynamic: "observer",
    formula: "Intervention'=controller sigmoid((Symptom-target)/w)(1-I)-fatigue I; Symptom'=stress+Burden-efficacy I Trust Symptom-rec Symptom; Burden'=friction I-support Trust Burden-decay Burden; Trust'=success max(target-Symptom,0)-overload I Trust",
    description: "Digitaler Controller, Intervention, Belastung und Vertrauen als Zukunftsmodell für adaptive Versorgung.",
    variables: ["Symptom", "Intervention", "Burden", "Trust"],
    observables: "Symptom, Intervention, Belastung, Vertrauen",
    params: { controller: 0.45, target: 0.28, width: 0.08, fatigue: 0.18, stress: 0.08, efficacy: 0.42, recovery: 0.08, friction: 0.08, support: 0.18, decay: 0.1, success: 0.18, overload: 0.12 },
    preset: "closedLoopCare",
    evidence: ["precision medicine", "closed-loop", "digital health"],
  },
];

const PRIORITY = [
  ["HPA-Achse + digitale Stressdaten", "Verbindet Cortisol, Schlaf, Belastung und Relapse-Risiko zu testbaren Hypothesen."],
  ["Furchtextinktion + Exposition", "Direkt anschlussfähig an Therapieprozesse und Lernmarker bei PTSD und Angst."],
  ["Tumor-Immune-Checkpoint", "Ein klinisch relevantes ODE-Backbone für adaptive Immuntherapie-Simulationen."],
  ["Alzheimer Amyloid-Tau-Mikroglia", "Macht neurodegenerative Kaskaden als Intervention-Targets explorierbar."],
  ["Closed-Loop-Care", "Brücke zwischen Digital Health, personalisierter Dosierung und Patient Burden."],
];

const PRIORITY_EN = [
  ["HPA axis + digital stress data", "Connects cortisol, sleep, load, and relapse risk into testable hypotheses."],
  ["Fear extinction + exposure", "Maps naturally to therapy processes and learning markers in PTSD and anxiety."],
  ["Tumor-immune checkpoint", "A clinically relevant ODE backbone for adaptive immunotherapy simulations."],
  ["Alzheimer amyloid-tau-microglia", "Turns neurodegenerative cascades into explorable intervention targets."],
  ["Closed-loop care", "Bridges digital health, personalized dosing, and patient burden."],
];

const MODEL_EN = {
  1: ["Simple oocyte reserve decline", "Baseline reserve loss with a constant rate.", "Reserve R, remaining share"],
  2: ["Age-accelerated reserve decline", "Reserve loss accelerates as age increases.", "Reserve R, accelerated decline"],
  3: ["Two-phase decline before and after 35", "Piecewise dynamics for slower and faster reserve loss.", "Reserve R, breakpoint at t=35"],
  4: ["Primordial -> primary -> antral follicles", "Compartment flow from early follicles to antral follicles.", "Primordial P, primary Q, antral A"],
  5: ["AMH feedback on follicle activation", "AMH slows activation and is produced by antral follicles.", "AMH, antral follicles, reserve"],
  6: ["AFC forecast from follicle population", "AFC is modeled as a smoothed observation of the antral population.", "Antral follicles A, AFC"],
  7: ["IVF stimulation response", "FSH input recruits antral follicles and produces expected oocytes.", "Reserve, antral response, expected oocytes"],
  8: ["Ovarian reserve after chemotherapy", "Acute additional loss during chemotherapy.", "Reserve before and after therapy impulse"],
  9: ["Radiotherapy damage model", "Dose-dependent kill term for reserve loss.", "Reserve, cumulative dose effect"],
  10: ["Endometriosis surgery effect", "Surgery event represented as a narrow loss impulse.", "Reserve with surgery drop"],
  11: ["PCOS model", "High antral follicle count and altered hormonal maturation.", "Antral follicles, androgen or hormone index"],
  12: ["Menopause threshold model", "Menopause signal rises when reserve falls below a threshold.", "Reserve R, threshold probability M"],
  13: ["AMH trajectory over years", "AMH as a dynamic observation of antral follicles.", "AMH, antral population"],
  14: ["Cycle length as a consequence of reserve", "Cycle length adapts slowly to reserve and follicle dynamics.", "Reserve, cycle length"],
  15: ["Oocyte freezing planning", "Expected oocyte count per stimulation window.", "Reserve, expected cumulative oocytes"],
  16: ["Poor responder risk", "Risk follows a smoothed AFC threshold.", "AFC, poor-responder risk"],
  17: ["Family menopause age as prior", "The individual decline parameter is pulled toward a family prior.", "Reserve, personal decline parameter"],
  18: ["Ovarian volume as proxy", "Ovarian volume follows reserve as a slow proxy.", "Reserve, volume proxy"],
  19: ["FSH rise at low reserve", "Inhibin falls with reserve, which lets FSH rise.", "Reserve, inhibin, FSH"],
  20: ["Multi-cycle IVF simulation", "Reserve declines across stimulation cycles while response varies.", "Reserve, cycle response"],
  21: ["Menstrual cycle model", "Coupled hormone network for GnRH, LH, FSH, estrogen, and progesterone.", "LH surge, estrogen, progesterone"],
  22: ["LH surge model", "Positive estrogen feedback generates an LH surge.", "Estrogen, LH, progesterone"],
  23: ["Thyroid hormone model", "TSH, T4, and T3 as a negative feedback system.", "TSH, T3, T4"],
  24: ["Blood glucose and insulin model", "Glucose uptake and insulin secretion after meals.", "Glucose, insulin"],
  25: ["Daily cortisol rhythm", "Circadian cortisol trajectory with optional stress impulse.", "Cortisol level"],
  26: ["Testosterone regulation", "LH-testosterone axis with negative feedback.", "LH, testosterone"],
  27: ["Medication level in blood", "Absorption, distribution, and elimination as PK compartments.", "Blood level, tissue level"],
  28: ["Ritalin effect level", "Intake, peak, half-life, and effect compartment.", "Blood level, effect"],
  29: ["Caffeine elimination", "Exponential elimination with half-life.", "Caffeine level"],
  30: ["Alcohol elimination", "Saturation-dependent alcohol elimination.", "Alcohol level"],
  31: ["VO2max training effect", "Fitness rises through stimulus, fatigue rises faster and decays.", "Fitness, fatigue, performance"],
  32: ["Hyrox performance model", "Energy, lactate, and recovery under coupled load.", "Energy, lactate, recovery"],
  33: ["Muscle growth", "Training stimulus drives synthesis while breakdown pulls mass back.", "Muscle mass"],
  34: ["Body weight", "Calorie balance plus metabolic adaptation.", "Weight, adaptation"],
  35: ["LDL cholesterol reduction", "Nutrition, medication, and natural clearance lower LDL.", "LDL cholesterol"],
  36: ["Inflammation marker", "Stimulus, immune response, and marker decay.", "Stimulus, inflammation"],
  37: ["Sleep pressure", "Build-up during the day and decay at night.", "Sleep pressure"],
  38: ["Stress and recovery", "Load and regeneration as opposing processes.", "Stress, recovery"],
  39: ["Injury healing", "Tissue repair over time.", "Damage, repair activity"],
  40: ["Endurance adaptation", "Mitochondrial adaptation under endurance training.", "Mitochondrial index, fatigue"],
  41: ["User growth", "Logistic growth with market limit.", "User count"],
  42: ["Churn model", "Users leave the product at churn rate c.", "Active users"],
  43: ["SaaS MRR", "New customers, churn, and recurring revenue.", "Customers, MRR"],
  44: ["Virality model", "Existing users bring in new users.", "Users, viral contribution"],
  45: ["Marketplace liquidity", "Supply and demand are coupled through matches.", "Supply, demand, matches"],
  46: ["Waitlist growth", "Organic, paid, and referral growth.", "Waitlist"],
  47: ["Cash runway", "Cash falls through burn and rises through revenue.", "Cash, revenue, runway"],
  48: ["Sales pipeline", "Leads move through pipeline stages.", "Leads, qualified, closed"],
  49: ["Team productivity model", "Onboarding, experience, and communication overhead.", "Experience, overhead, productivity"],
  50: ["Feature debt model", "Development increases value and complexity.", "Product value, feature debt"],
  51: ["API cost growth", "Users, tokens, and cost grow together.", "Users, tokens, cumulative cost"],
  52: ["LLM queue model", "Requests, processing, and waiting time.", "Queue length, waiting time"],
  53: ["GPU utilization", "Jobs arrive and are processed.", "Waiting jobs, running jobs, utilization"],
  54: ["Database load", "Reads, writes, and cache hit rate.", "DB load, cache"],
  55: ["Bug stock", "New bugs minus fixed bugs.", "Open bugs"],
  56: ["Tech debt dynamics", "New features increase debt, refactoring lowers it.", "Tech debt, velocity"],
  57: ["Model degradation", "Data drift lowers model quality while retraining stabilizes it.", "Drift, quality"],
  58: ["Retrieval quality", "The knowledge base grows while staleness lowers quality.", "Knowledge base, retrieval quality"],
  59: ["App retention", "Cohort decay with reactivation.", "Active cohort"],
  60: ["Recommendation feedback", "Popularity reinforces popularity through exposure.", "Popularity, exposure"],
  61: ["Portfolio growth", "Capital grows through returns and contributions.", "Portfolio capital"],
  62: ["Compound interest with cash flows", "Savings plan as an ODE.", "Balance"],
  63: ["Crash recovery", "Drawdown and mean reversion after a crash.", "Price, drawdown"],
  64: ["Volatility model", "Volatility rises during shocks and falls slowly.", "Shock memory, volatility"],
  65: ["Gold/S&P allocation", "Rebalancing between gold and equities.", "Gold share, S&P share"],
  66: ["Inflation and purchasing power", "Purchasing power falls with inflation.", "Price level, purchasing power"],
  67: ["Mortgage debt", "Amortization and interest determine remaining debt.", "Remaining debt"],
  68: ["Startup valuation", "Revenue growth and multiple compression.", "Revenue, multiple, valuation"],
  69: ["Token economy", "Supply, demand, burn, and price.", "Supply, demand, price"],
  70: ["Liquidity risk", "Cash stock and outflow drive liquidity risk.", "Cash, risk"],
  71: ["Room temperature", "Newtonian cooling.", "Room temperature"],
  72: ["Battery discharge", "Consumption and charging power over time.", "Battery level"],
  73: ["E-scooter range", "Speed, weight, and slope determine range.", "Battery level, distance"],
  74: ["Water level in a tank", "Inflow minus outflow.", "Water level"],
  75: ["Concrete drying", "Moisture diffuses and evaporates.", "Core and surface moisture"],
  76: ["Heat loss in the ground", "Insulation and temperature gradient determine heat loss.", "Ground temperature"],
  77: ["3D printer heated bed", "PID control for heated-bed temperature.", "Temperature, controller integral"],
  78: ["Drone flight time", "Energy use over flight time.", "Energy, altitude"],
  79: ["Camera battery in cold weather", "Temperature-dependent consumption.", "Battery level, temperature"],
  80: ["Building heating", "Heat capacity, loss, and heating input.", "Indoor and wall temperature"],
  81: ["Predator-prey model", "Lotka-Volterra dynamics.", "Prey, predator"],
  82: ["Epidemic model", "SIR: susceptible, infected, recovered.", "Susceptible, infected, recovered"],
  83: ["Rumor spreading", "People learn and forget information.", "Unaware, spreaders, forgotten"],
  84: ["City growth", "Population and infrastructure grow together.", "Population, infrastructure"],
  85: ["Traffic jam", "Inflow, capacity, and outflow.", "Cars, delay time"],
  86: ["CO2 concentration", "Emissions minus uptake.", "CO2 concentration"],
  87: ["Recycling system", "Material-flow compartments.", "Raw material, use, waste, recycling"],
  88: ["Wildfire spread", "Fuel, fire, and burned area.", "Fuel, fire, burned"],
  89: ["Lake algae bloom", "Nutrients, algae, and oxygen.", "Nutrients, algae, oxygen"],
  90: ["Urban water consumption", "Demand, storage, and inflow.", "Water storage, demand"],
  91: ["HPA axis and allostatic load", "Hypothalamic-pituitary-adrenal axis with cortisol feedback and glucocorticoid-receptor adaptation.", "Cortisol, CRH/ACTH, receptor sensitivity"],
  92: ["Circadian depression bistability", "Mood burden, circadian drive, and cortisol can create stable or tipping states.", "Symptom burden, circadian rhythm, cortisol"],
  93: ["Rumination-stress-depression loop", "A positive loop among stressors, rumination, and symptom burden as an intervention target.", "Stress, rumination, depressive burden"],
  94: ["Stress-reward-mentalizing depression", "Stress lowers reward sensitivity and mentalizing; reward buffers symptom burden.", "Stress, reward index, mentalizing, symptom burden"],
  95: ["SSRI response lag and neuroplasticity", "PK/PD skeleton for fast serotonergic change and slower symptom response through plasticity.", "Drug level, serotonin, plasticity, symptom burden"],
  96: ["PTSD fear extinction", "Exposure strengthens safety memory and lowers fear when arousal and memory are modeled together.", "Fear, safety memory, arousal"],
  97: ["Panic CO2-arousal loop", "Interoceptive CO2 sensitivity, arousal, and avoidance form a reinforcing panic loop.", "CO2 proxy, arousal, avoidance"],
  98: ["Addiction reward learning and craving", "Cue sensitization, craving, and control capacity as treatable dynamic variables.", "Cue salience, craving, control"],
  99: ["Bipolar mood oscillator", "Nonlinear mood oscillator where sleep debt can amplify phase changes.", "Mood state, momentum, sleep debt"],
  100: ["Social isolation as an attractor", "Connection, threat perception, and inflammation can tip into helpful or harmful attractors.", "Social connection, threat, inflammation"],
  101: ["Digital relapse-risk observer", "Wearable and smartphone signals are modeled as a smoothed risk observer.", "Stress, sleep debt, digital marker, relapse risk"],
  102: ["Exposure therapy and skill growth", "Exposure lowers distress through habituation and builds a slowly forgotten skill component.", "Distress, skill, avoidance"],
  103: ["Mindfulness attentional control", "Attentional control acts as a brake between arousal and rumination.", "Rumination, attention, arousal"],
  104: ["HRV and autonomic balance", "Sympathetic tone, parasympathetic tone, and HRV as a compact stress-regulation proxy.", "Autonomic tone and HRV"],
  105: ["Gut-brain inflammation loop", "Microbiome diversity, cytokines, and mood burden as an immunometabolic loop.", "Microbiome, cytokines, symptom burden"],
  106: ["Tumor-immune checkpoint therapy", "Tumor, effector T cells, checkpoint burden, and therapy pulses in a translational ODE skeleton.", "Tumor burden, immune response, checkpoint, drug"],
  107: ["Within-host HIV viral dynamics", "Classic target-infected-virus model with later therapy suppression.", "Target cells, infected cells, viral load"],
  108: ["Sepsis: cytokines, damage, blood pressure", "Pathogen, cytokine response, organ damage, and blood pressure as a dynamic sepsis sketch.", "Pathogen load, cytokines, damage, blood pressure"],
  109: ["Antibiotic resistance competition", "Sensitive and resistant strains compete under pulsed antibiotic dosing.", "Sensitive cells, resistant cells, drug level"],
  110: ["Cancer: sensitive and resistant clones", "Tumor heterogeneity with sensitive and resistant clones under therapy pulses.", "Sensitive clones, resistant clones, drug"],
  111: ["Alzheimer amyloid-tau-neuroinflammation", "Amyloid, tau, neurons, and microglia as a coupled neurodegenerative cascade.", "Amyloid, tau, neuronal reserve, microglia"],
  112: ["Parkinson dopamine neuron loss", "Nigrostriatal neurons drive dopamine; motor burden rises below a threshold.", "Neuronal reserve, dopamine, motor burden"],
  113: ["Epilepsy E-I seizure risk", "Wilson-Cowan-like excitation-inhibition dynamics with adaptation as a seizure-risk core.", "Excitation, inhibition, adaptation"],
  114: ["Migraine cortical-spreading dynamics", "Reduced excitation-potassium-recovery system for spreading-depression-like waves.", "Excitation, potassium proxy, recovery"],
  115: ["Chronic pain and sensitization", "Nociception drives sensitization; analgesia lowers pain input and plastic amplification.", "Nociception, sensitization, analgesia"],
  116: ["Diabetes beta-cell compensation", "Glucose, insulin, and beta-cell mass with compensation and glucotoxicity.", "Glucose, insulin, beta cells"],
  117: ["Hypertension RAAS pressure loop", "Blood pressure, RAAS, and pressure natriuresis as a compact control loop.", "Pressure, RAAS, natriuresis"],
  118: ["Asthma inflammation and bronchoconstriction", "Allergen-driven inflammation couples to bronchoconstriction and medication effect.", "Inflammation, bronchoconstriction, medication"],
  119: ["Placebo-nocebo expectation dynamics", "Expectation affects symptom perception and adherence in positive and negative directions.", "Expectation, symptom burden, adherence"],
  120: ["Personalized closed-loop care", "Digital controller, intervention, burden, and trust as a future model for adaptive care.", "Symptom, intervention, burden, trust"],
};

const qs = (selector) => document.querySelector(selector);
const categoryById = new Map(CATEGORIES.map((category) => [category.id, category]));
let selectedModel = MODELS[4];
let currentLang = "de";
let isPlaying = true;
let animationTime = 0;
let chartFrame = null;
const MAIN_ANIMATION_SPEED = 0.22;
const MAIN_ANIMATION_PROGRESS_FRAMES = 520;
const MAIN_ANIMATION_LOOP_FRAMES = 780;
const HERO_MODEL_INTERVAL_MS = 26000;

function t(key) {
  return I18N[currentLang][key] ?? I18N.de[key] ?? key;
}

function categoryLabel(category) {
  return category?.label?.[currentLang] ?? category?.label?.de ?? "";
}

function dynamicLabel(kind) {
  return I18N[currentLang].dynamics[kind] ?? I18N.de.dynamics[kind] ?? kind;
}

function modelName(model) {
  return currentLang === "en" ? MODEL_EN[model.id]?.[0] ?? model.name : model.name;
}

function modelDescription(model) {
  return currentLang === "en" ? MODEL_EN[model.id]?.[1] ?? model.description : model.description;
}

function modelObservables(model) {
  return currentLang === "en" ? MODEL_EN[model.id]?.[2] ?? model.observables : model.observables;
}

function modelEvidence(model) {
  const evidence = model.evidence ?? [];
  if (!evidence.length) return currentLang === "en" ? "educational model skeleton" : "didaktisches Modell-Skeleton";
  return evidence.join(" · ");
}

function scientificProgress(rawProgress) {
  const x = clamp(rawProgress, 0, 1);
  return x * x * (3 - 2 * x);
}

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
    hpaAxis: [0.25, 0.22, 0.35, 0.7],
    circadianBistableMood: [0.08, 0.2, 0.35],
    ruminationLoop: [0.2, 0.15, 0.2],
    stressRewardMentalizing: [0.25, 0.45, 0.55, 0.25],
    ssriPlasticity: [0, 0.35, 0.1, 0.8],
    fearExtinction: [0.75, 0.18, 0.42],
    panicLoop: [0.22, 0.18, 0.25],
    addictionLearning: [0.12, 0.2, 0.55],
    bipolarOscillator: [0.15, 0.05, 0.2],
    socialIsolationAttractor: [0.55, 0.25, 0.16],
    relapseObserver: [0.22, 0.18, 0.2, 0.08],
    exposureLearning: [0.45, 0.12, 0.55],
    mindfulnessControl: [0.42, 0.25, 0.3],
    autonomicBalance: [0.3, 0.55, 0.45],
    gutBrainInflammation: [0.65, 0.2, 0.3],
    tumorImmuneCheckpoint: [0.35, 0.22, 0.2, 0],
    viralDynamics: [1, 0.02, 0.08],
    sepsisInflammation: [0.22, 0.12, 0.05, 1],
    resistanceCompetition: [0.35, 0.04, 0],
    cancerResistance: [0.32, 0.03, 0],
    alzheimerCascade: [0.2, 0.08, 1, 0.12],
    parkinsonDopamine: [1, 0.75, 0.08],
    seizureEI: [0.18, 0.24, 0.1],
    migraineCsd: [0.12, 0.1, 0.85],
    painSensitization: [0.22, 0.2, 0],
    betaCellDiabetes: [115, 10, 1],
    hypertensionRaas: [1.08, 0.35, 0.2],
    asthmaInflammation: [0.18, 0.12, 0],
    expectationAdherence: [0.05, 0.55, 0.62],
    closedLoopCare: [0.55, 0.05, 0.18, 0.62],
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
      return [-(p.k ?? p.conductance) * (y[0] - (p.ambient ?? p.outside))];
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
    case "hpaAxis": {
      const stress = 0.08 + 0.03 * Math.sin((2 * Math.PI * t) / 24) + pulse(t, 18, 5, p.stress);
      const cortGr = Math.max(y[2], 0) * Math.max(y[3], 0);
      return [
        stress / (1 + p.feedback * cortGr) - 0.32 * y[0],
        (p.acthDrive * y[0]) / (1 + cortGr) - 0.3 * y[1],
        p.cortDrive * y[1] - p.clear * y[2],
        p.grRepair * (1 - y[3]) - p.grDamage * Math.max(y[2], 0) * y[3],
      ];
    }
    case "circadianBistableMood": {
      const circadian = 0.5 + 0.5 * Math.sin((2 * Math.PI * t) / 24);
      const stress = pulse(t, 20, 3, 0.2);
      return [
        p.moodGain * y[0] - p.nonlinear * y[0] ** 3 + p.stressGain * y[2] - p.driveGain * y[1],
        p.entrain * (circadian - y[1]) - p.cortDrag * y[2],
        p.base + p.amp * circadian + stress - p.clear * y[2],
      ];
    }
    case "ruminationLoop":
      return [
        p.load + p.sensitivity * y[1] - p.coping * y[0],
        p.trigger * y[0] + p.habit * y[1] * (1 - y[1]) - p.disengage * y[1],
        p.ruminationGain * y[1] + p.stressGain * y[0] - p.recovery * y[2],
      ];
    case "stressRewardMentalizing":
      return [
        p.load - p.resilience * y[2] * y[0],
        p.rewardGain / (1 + p.stressSuppression * Math.max(y[0], 0)) - p.rewardDecay * y[1],
        p.practice * (1 - y[2]) - p.stressDamage * Math.max(y[0], 0) * y[2],
        p.burdenGain * y[0] - p.rewardBuffer * y[1] - p.recovery * y[3],
      ];
    case "ssriPlasticity": {
      const dose = p.dose * periodicPulse(t, 24, 1, 1);
      const serotonin = Math.max(y[1], 0);
      return [
        dose - p.ka * y[0],
        p.base + p.release - (p.clear * serotonin) / (1 + p.inhibition * Math.max(y[0], 0)),
        (p.adapt * serotonin) / (p.km + serotonin + 1e-6) - p.loss * y[2],
        p.stress - p.benefit * y[2] * y[3] - p.recovery * y[3],
      ];
    }
    case "fearExtinction": {
      const exposure = p.exposure * periodicPulse(t, 12, 2, 1);
      return [
        p.reconsolidation * y[2] * (1 - y[0]) - p.extinction * exposure * y[1] * y[0],
        p.learning * exposure * (1 - y[1]) - p.forget * y[1],
        p.cue * y[0] + p.stress - p.calm * y[1] * y[2],
      ];
    }
    case "panicLoop": {
      const challenge = p.challenge + pulse(t, 16, 2, 0.1);
      return [
        challenge + 0.04 * y[1] - p.breathing * y[0],
        p.sensitivity * y[0] + p.anticipation * y[2] - p.calm * y[1],
        p.learning * y[1] * (1 - y[2]) - p.exposure * y[2],
      ];
    }
    case "addictionLearning": {
      const cueInput = p.cue * periodicPulse(t, 18, 2.2, 1);
      return [
        cueInput - p.cueDecay * y[0],
        p.sensitization * y[0] * (1 + p.learning * (1 - y[2])) - p.extinction * y[2] * y[1],
        p.recovery * (1 - y[2]) - p.stress * y[1] * y[2] + p.treatment * (1 - y[2]),
      ];
    }
    case "bipolarOscillator":
      return [
        y[1],
        p.drive * (p.bias - y[0]) - p.damping * y[1] - p.nonlinear * y[0] ** 3 + p.sleepGain * y[2],
        p.mania * Math.max(y[0], 0) - p.recovery * y[2],
      ];
    case "socialIsolationAttractor":
      return [
        p.outreach * (1 - y[0]) - p.withdrawal * y[1] * y[0],
        p.stress + p.isolation * (1 - y[0]) - p.safety * y[0] * y[1],
        p.immune * y[1] - p.clear * y[2],
      ];
    case "relapseObserver":
      return [
        p.load - p.coping * y[0],
        p.disruption + p.stressSleep * y[0] - p.sleepRecovery * y[1],
        p.gain * (y[0] + y[1]) - p.clear * y[2],
        p.adapt * (sigmoid((y[2] - p.threshold) / p.width) - y[3]),
      ];
    case "exposureLearning": {
      const exposure = periodicPulse(t, 10, 2, 1);
      return [
        p.trigger + p.avoidanceRelief * y[2] - p.skill * y[1] * y[0] - p.habituation * exposure * y[0],
        p.learning * exposure * (1 - y[1]) - p.forget * y[1],
        p.threat * y[0] * (1 - y[2]) - p.approach * y[1] * y[2],
      ];
    }
    case "mindfulnessControl": {
      const practice = p.practice * (0.6 + periodicPulse(t, 24, 1.2, 0.8));
      return [
        p.trigger + p.arousalGain * y[2] - p.decenter * y[1] * y[0],
        practice * (1 - y[1]) - p.fatigue * y[2] * y[1],
        p.stress + p.ruminationGain * y[0] - p.calm * y[1] * y[2],
      ];
    }
    case "autonomicBalance": {
      const stress = 0.06 + p.stress * periodicPulse(t, 12, 3, 1);
      return [
        stress - p.vagal * y[1] * y[0] - p.clear * y[0],
        p.recovery * (1 - y[1]) - p.cost * y[0] * y[1] + p.breathing * periodicPulse(t, 6, 1, 1),
        p.adapt * (y[1] / (1 + Math.max(y[0], 0)) - y[2]),
      ];
    }
    case "gutBrainInflammation": {
      const insult = p.insult + pulse(t, 20, 4, 0.08);
      return [
        p.diet * (1 - y[0]) - p.stressDamage * y[1] * y[0],
        p.dysbiosis * (1 - y[0]) + insult - p.clear * y[1],
        p.cytoGain * y[1] - p.resilience * y[0] * y[2] - p.recovery * y[2],
      ];
    }
    case "tumorImmuneCheckpoint": {
      const dose = p.dose * periodicPulse(t, 14, 2, 1);
      return [
        p.growth * y[0] * (1 - y[0] / p.k) - p.kill * y[1] * y[0] - p.drugKill * y[3] * y[0],
        (p.priming * y[0]) / (p.km + y[0] + 1e-6) + p.immunotherapy * y[3] - p.exhaustion * y[2] * y[1] - p.decayE * y[1],
        p.checkpointGain * y[0] - p.checkpointClear * y[2] - p.block * y[3] * y[2],
        dose - p.clear * y[3],
      ];
    }
    case "viralDynamics": {
      const therapy = p.therapy * sigmoid(t - 15);
      return [
        p.lambda - p.death * y[0] - p.beta * y[0] * y[2],
        p.beta * y[0] * y[2] - p.delta * y[1],
        p.burst * y[1] - p.clear * y[2] - therapy * y[2],
      ];
    }
    case "sepsisInflammation": {
      const antibiotic = p.antibiotic * sigmoid(t - 10);
      return [
        (p.growth * y[0]) / (1 + y[0]) - p.kill * y[1] * y[0] - antibiotic * y[0],
        p.immune * y[0] - p.clear * y[1] + p.damageFeed * y[2],
        p.toxicity * y[1] - p.repair * y[2],
        p.recovery * (1 - y[3]) - p.vasodilation * y[1] * y[3],
      ];
    }
    case "resistanceCompetition": {
      const total = y[0] + y[1];
      const dose = p.dose * periodicPulse(t, 12, 1.5, 1);
      return [
        p.growthS * y[0] * (1 - total / p.k) - p.kill * y[2] * y[0] - p.mutation * y[0],
        p.growthR * y[1] * (1 - total / p.k) + p.mutation * y[0] - p.cost * y[1] - p.resistantKill * y[2] * y[1],
        dose - p.clear * y[2],
      ];
    }
    case "cancerResistance": {
      const total = y[0] + y[1];
      const dose = p.dose * periodicPulse(t, 21, 3, 1);
      return [
        p.growthS * y[0] * (1 - total / p.k) - p.kill * y[2] * y[0] - p.mutation * y[0],
        p.growthR * y[1] * (1 - total / p.k) + p.mutation * y[0] - p.cost * y[1],
        dose - p.clear * y[2],
      ];
    }
    case "alzheimerCascade": {
      const toxic = Math.max(y[0] + y[1], 0);
      return [
        p.prod - p.clearA * y[0] - p.microClear * y[3] * y[0],
        p.tauSeed * y[0] - p.clearT * y[1],
        -p.neurotox * toxic * y[2] + p.repair * (1 - y[2]),
        p.activation * toxic - p.resolution * y[3],
      ];
    }
    case "parkinsonDopamine":
      return [
        -p.stress * y[0] + p.rescue * (1 - y[0]),
        p.synth * y[0] - p.clear * y[1],
        p.burdenGain * Math.max(p.threshold - y[1], 0) - p.adapt * y[2],
      ];
    case "seizureEI": {
      const driveE = p.gEE * y[0] - p.gEI * y[1] - y[2] + p.stim;
      const driveI = p.gIE * y[0] - p.gII * y[1];
      return [(-y[0] + sigmoid(driveE)) / p.tauE, (-y[1] + sigmoid(driveI)) / p.tauI, p.recruit * y[0] - p.decay * y[2]];
    }
    case "migraineCsd": {
      const stim = p.stim + pulse(t, 18, 2, 0.15);
      return [
        stim + p.kGain * y[1] - p.inhibition * y[2] * y[0] - p.decay * y[0],
        p.release * y[0] - p.clearK * y[1],
        p.restore * (1 - y[2]) - p.fatigue * y[0] * y[2],
      ];
    }
    case "painSensitization": {
      const treatment = p.treatment * periodicPulse(t, 24, 2, 1);
      return [
        p.injury - p.analgesia * y[2] * y[0] - p.clearN * y[0],
        p.plasticity * y[0] * (1 - y[1]) - p.desensitize * y[2] * y[1] - p.decayS * y[1],
        treatment - p.clearA * y[2],
      ];
    }
    case "betaCellDiabetes": {
      const glucose = y[0];
      const meal = 35 * periodicPulse(t, 8, 0.7, 1);
      const hyper = Math.max(glucose - 100, 0);
      const tox = Math.max(glucose - 120, 0);
      return [
        meal + p.hepatic - p.uptake * y[1] * glucose - p.basalClear * (glucose - 90),
        (p.secretion * y[2] * Math.max(glucose - 90, 0)) / (p.km + glucose + 1e-6) - p.clearI * y[1],
        p.compensation * hyper * y[2] - p.glucotoxicity * tox * y[2] - p.turnover * (y[2] - 1),
      ];
    }
    case "hypertensionRaas": {
      const signal = sigmoid((p.setpoint - y[0]) / p.width);
      return [
        p.salt + p.raasGain * y[1] - p.natriuresis * y[2] * y[0] - p.relax * (y[0] - p.baseline),
        signal - p.block * y[1],
        p.pressureGain * Math.max(y[0] - p.baseline, 0) - p.clearN * y[2],
      ];
    }
    case "asthmaInflammation": {
      const allergen = p.allergen + periodicPulse(t, 18, 2, 0.15);
      const dose = p.dose * periodicPulse(t, 12, 1, 1);
      return [
        allergen + p.eosGain * y[1] - p.steroid * y[2] * y[0] - p.clearI * y[0],
        p.bronch * y[0] - p.bronchodilator * y[2] * y[1] - p.relax * y[1],
        dose - p.clearM * y[2],
      ];
    }
    case "expectationAdherence": {
      const positive = Math.max(y[0], 0);
      const negative = Math.max(-y[0], 0);
      return [
        p.reinforcement * (p.baseline - y[1]) - p.decay * (y[0] - p.neutral),
        p.stress - p.placebo * positive * y[1] + p.nocebo * negative - p.treatment * y[2] * y[1],
        p.trust * sigmoid(y[0]) * (1 - y[2]) - p.burden * y[1] * y[2],
      ];
    }
    case "closedLoopCare": {
      const signal = sigmoid((y[0] - p.target) / p.width);
      return [
        p.stress + y[2] - p.efficacy * y[1] * y[3] * y[0] - p.recovery * y[0],
        p.controller * signal * (1 - y[1]) - p.fatigue * y[1],
        p.friction * y[1] - p.support * y[3] * y[2] - p.decay * y[2],
        p.success * Math.max(p.target - y[0], 0) - p.overload * y[1] * y[3] + 0.02 * (1 - y[3]),
      ];
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
  const selected = select.value || "all";
  select.innerHTML = "";
  rail.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = t("allCategories");
  select.append(allOption);
  CATEGORIES.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = categoryLabel(category);
    select.append(option);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = categoryLabel(category);
    button.style.setProperty("--accent", category.accent);
    button.addEventListener("click", () => {
      select.value = category.id;
      filterModels();
      document.getElementById("library").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    rail.append(button);
  });
  select.value = [...select.options].some((option) => option.value === selected) ? selected : "all";
}

function renderModels(models) {
  const grid = qs("#model-grid");
  grid.innerHTML = "";
  models.forEach((model, index) => {
    const category = categoryById.get(model.category);
    const evidence = (model.evidence ?? []).slice(0, 3).map((tag) => `<span>${tag}</span>`).join("");
    const card = document.createElement("article");
    card.className = "model-card";
    card.style.setProperty("--accent", category?.accent ?? "#fff");
    card.style.animationDelay = `${Math.min(index * 18, 500)}ms`;
    card.innerHTML = `
      <div class="card-topline">
        <span class="model-number">${String(model.id).padStart(2, "0")}</span>
        <span class="dynamic-pill">${dynamicLabel(model.dynamic)}</span>
      </div>
      <h3>${modelName(model)}</h3>
      <p>${modelDescription(model)}</p>
      ${evidence ? `<div class="evidence-tags">${evidence}</div>` : ""}
      <code>${model.formula}</code>
      <footer>
        <span>${categoryLabel(category) || model.category}</span>
        <button type="button" aria-label="${modelName(model)} ${t("graphAria")}">${t("cardGraph")}</button>
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
    const english = MODEL_EN[model.id]?.join(" ") ?? "";
    const evidence = (model.evidence ?? []).join(" ");
    const haystack = `${model.name} ${model.description} ${model.formula} ${model.observables} ${english} ${evidence}`.toLowerCase();
    return (category === "all" || model.category === category) && (dynamic === "all" || model.dynamic === dynamic) && (!search || haystack.includes(search));
  });
  renderModels(result);
  qs("#stat-models").textContent = result.length;
}

function selectModel(model) {
  selectedModel = model;
  const category = categoryById.get(model.category);
  qs("#selected-category").textContent = categoryLabel(category) || model.category;
  qs("#selected-title").textContent = `${String(model.id).padStart(2, "0")} ${modelName(model)}`;
  qs("#selected-description").textContent = modelDescription(model);
  qs("#selected-formula").textContent = model.formula;
  qs("#selected-observables").textContent = modelObservables(model);
  qs("#selected-evidence").textContent = modelEvidence(model);
  qs("#selected-parameters").textContent = Object.keys(model.params).join(", ");
  qs("#chart-title").textContent = modelName(model);
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
  const progress = isPlaying ? clamp(0.06 + 0.94 * scientificProgress(animationTime / MAIN_ANIMATION_PROGRESS_FRAMES), 0.06, 1) : 1;
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
  if (isPlaying) animationTime = (animationTime + MAIN_ANIMATION_SPEED) % MAIN_ANIMATION_LOOP_FRAMES;
  drawMainChart(false);
  const heroPhase = Date.now() / HERO_MODEL_INTERVAL_MS;
  const heroModel = MODELS[Math.floor(heroPhase) % MODELS.length];
  qs("#hero-model-name").textContent = modelName(heroModel);
  drawChart(qs("#hero-chart"), heroModel, simulate(heroModel, {}, 190, 0.28), 0.08 + 0.92 * scientificProgress(heroPhase % 1));
  chartFrame = requestAnimationFrame(animateCharts);
}

function renderPriority() {
  const grid = qs("#priority-grid");
  grid.innerHTML = "";
  const items = currentLang === "en" ? PRIORITY_EN : PRIORITY;
  items.forEach(([title, reason], index) => {
    const card = document.createElement("article");
    card.innerHTML = `<span>${index + 1}</span><h3>${title}</h3><p>${reason}</p>`;
    grid.append(card);
  });
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-dynamic-label]").forEach((option) => {
    option.textContent = dynamicLabel(option.dataset.dynamicLabel);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
  renderCategories();
  filterModels();
  renderPriority();
  selectModel(selectedModel);
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
  qs("#search-input").addEventListener("input", filterModels);
  qs("#category-select").addEventListener("change", filterModels);
  qs("#dynamic-select").addEventListener("change", filterModels);
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });
  applyLanguage(currentLang);
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
