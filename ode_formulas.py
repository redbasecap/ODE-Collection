"""Executable ODE formulas for the ODE World Library.

The module is dependency-free and intentionally notebook-friendly:

    from ode_formulas import rhs, simulate_rk4
    trajectory = simulate_rk4(1, t_end=60, dt=0.25)

Every model has a formula string, state variable names, default parameters,
default initial state, and an executable right-hand side.

These are educational model skeletons. Medical and financial entries are not
diagnostic, therapeutic, investment, or decision advice.
"""

from __future__ import annotations

from dataclasses import dataclass
from math import exp, log, pi, sin, sqrt, tanh
from typing import Callable, Mapping, Sequence

State = Sequence[float]
Params = Mapping[str, float]


@dataclass(frozen=True)
class ModelSpec:
    id: int
    name: str
    category: str
    variables: tuple[str, ...]
    formula: str
    preset: str
    params: Params
    initial: tuple[float, ...]


def _spec(
    model_id: int,
    name: str,
    category: str,
    variables: tuple[str, ...],
    formula: str,
    preset: str,
    params: Params,
    initial: tuple[float, ...],
) -> ModelSpec:
    return ModelSpec(model_id, name, category, variables, formula, preset, params, initial)


MODELS: dict[int, ModelSpec] = {
    1: _spec(1, "Einfache Eizellreserve-Abnahme", "ovarian", ("R",), "dR/dt = -k R", "decay", {"k": 0.035}, (1.0,)),
    2: _spec(2, "Altersbeschleunigte Reserve-Abnahme", "ovarian", ("R",), "dR/dt = -k0 exp(alpha max(t-30,0)) R", "age_decay", {"k": 0.015, "alpha": 0.065}, (1.0,)),
    3: _spec(3, "Zwei-Phasen-Abbau vor/nach 35", "ovarian", ("R",), "dR/dt = -k(t) R, k(t)=k1 (t<35), k2 (t>=35)", "two_phase", {"k1": 0.018, "k2": 0.065}, (1.0,)),
    4: _spec(4, "Primordial -> primary -> antral follicle", "ovarian", ("P", "Q", "A"), "P'=-lambda P; Q'=lambda P-mu Q; A'=mu Q-nu A", "chain3", {"lambda": 0.018, "mu": 0.06, "nu": 0.09}, (1.0, 0.08, 0.04)),
    5: _spec(5, "AMH-Feedback auf Follikelaktivierung", "ovarian", ("P", "A", "AMH"), "P'=-lambda0 P/(1+beta AMH); A'=lambda0 P/(1+beta AMH)-mu A; AMH'=rho A-c AMH", "feedback_amh", {"lambda": 0.045, "beta": 1.6, "mu": 0.08, "rho": 0.35, "c": 0.22}, (1.0, 0.1, 0.35)),
    6: _spec(6, "AFC-Prognose aus Follikelpopulation", "ovarian", ("A", "AFC"), "A'=s-d A; AFC'=eta A-gamma AFC", "observer", {"source": 0.18, "d": 0.08, "eta": 1.25, "gamma": 0.35}, (0.55, 0.18)),
    7: _spec(7, "IVF-Stimulationsantwort", "ovarian", ("R", "A", "E"), "R'=-k R; A'=u(t) R/(Km+R)-m A; E'=q A-r E", "stimulus_response", {"k": 0.012, "u": 0.42, "km": 0.25, "m": 0.16, "q": 0.18, "r": 0.05}, (1.0, 0.05, 0.0)),
    8: _spec(8, "Ovarialreserve nach Chemotherapie", "ovarian", ("R",), "dR/dt = -k R - chi(t) R", "shock_decay", {"k": 0.018, "shock": 0.62, "center": 25.0, "width": 5.0}, (1.0,)),
    9: _spec(9, "Radiotherapie-Schadensmodell", "ovarian", ("R",), "dR/dt = -k R - s D(t) R", "shock_decay", {"k": 0.016, "shock": 0.5, "center": 32.0, "width": 8.0}, (1.0,)),
    10: _spec(10, "Endometriose-OP-Effekt", "ovarian", ("R",), "dR/dt = -k R - s exp(-(t-ts)^2/(2w^2)) R", "shock_decay", {"k": 0.019, "shock": 0.75, "center": 36.0, "width": 2.2}, (1.0,)),
    11: _spec(11, "PCOS-Modell", "ovarian", ("P", "A", "H"), "P'=-lambda P; A'=lambda P+e-m A; H'=a A-c H", "pcos", {"lambda": 0.012, "excess": 0.13, "m": 0.04, "a": 0.22, "c": 0.16}, (1.0, 0.35, 0.4)),
    12: _spec(12, "Menopause-Schwellenmodell", "ovarian", ("R", "M"), "R'=-k R; M'=sigma((Rc-R)/w)-d M", "threshold", {"k": 0.045, "rc": 0.22, "width": 0.04, "d": 0.08}, (1.0, 0.0)),
    13: _spec(13, "AMH-Verlauf über Jahre", "ovarian", ("A", "AMH"), "A'=s-d A; AMH'=g A-c AMH", "observer", {"source": 0.2, "d": 0.09, "g": 0.9, "c": 0.18}, (0.55, 0.18)),
    14: _spec(14, "Zykluslänge als Folge von Reserve", "ovarian", ("R", "Cycle"), "R'=-k R; Cycle'=a(base+sens/(0.2+R)-Cycle)", "cycle_length", {"k": 0.028, "adapt": 0.25, "base": 27.0, "sens": 5.0}, (1.0, 28.0)),
    15: _spec(15, "Oocyte freezing Planung", "ovarian", ("R", "E"), "R'=-k R; E'=q u(t) R/(Km+R)-r E", "freezing", {"k": 0.012, "u": 0.5, "q": 0.34, "km": 0.18, "r": 0.015}, (1.0, 0.0)),
    16: _spec(16, "Risiko für poor responder", "ovarian", ("A", "Risk"), "A'=-k A; Risk'=a(sigma((Ac-A)/w)-Risk)", "risk", {"k": 0.04, "ac": 0.32, "width": 0.05, "adapt": 0.5}, (0.9, 0.05)),
    17: _spec(17, "Familien-Menoalter als Prior", "ovarian", ("R", "k"), "R'=-k R; k'=a(k_family-k)", "adaptive_decay_rate", {"k": 0.035, "family_k": 0.045, "adapt": 0.06}, (1.0, 0.035)),
    18: _spec(18, "Ovarialvolumen als Proxy", "ovarian", ("R", "V"), "R'=-k R; V'=a(c R^alpha - V)", "power_proxy", {"k": 0.03, "scale": 1.2, "alpha": 0.7, "adapt": 0.4}, (1.0, 1.0)),
    19: _spec(19, "FSH-Anstieg bei tiefer Reserve", "ovarian", ("R", "Inhibin", "FSH"), "R'=-k R; Inhibin'=rho R-cI Inhibin; FSH'=a-b Inhibin-cF FSH", "fsh", {"k": 0.03, "rho": 0.42, "c_i": 0.2, "a": 0.5, "b": 0.35, "c_f": 0.16}, (1.0, 0.8, 0.25)),
    20: _spec(20, "Multi-Zyklus-IVF-Simulation", "ovarian", ("R", "Response"), "R'=-k R-d u(t) Resp; Resp'=s u(t) R/(Km+R)-c Resp", "multi_cycle", {"k": 0.01, "drain": 0.05, "s": 0.45, "km": 0.2, "c": 0.15, "u": 0.8}, (1.0, 0.05)),
    21: _spec(21, "Menstruationszyklus-Modell", "hormones", ("GnRH", "LH", "FSH", "E", "P"), "GnRH', LH', FSH', E', P' with circadian input and feedback", "cycle_hormones", {"period": 28.0, "feedback": 1.2}, (0.45, 0.25, 0.25, 0.3, 0.15)),
    22: _spec(22, "LH-Surge-Modell", "hormones", ("E", "LH", "P"), "E'=rE(1-E/K)-dE E; LH'=b+g sigma(E-Ec)-c LH; P'=p LH-dP P", "lh_surge", {"r": 0.2, "k": 1.0, "g": 2.5, "ec": 0.58, "c": 0.4}, (0.2, 0.1, 0.0)),
    23: _spec(23, "Schilddrüsenhormon-Modell", "hormones", ("TSH", "T4", "T3"), "TSH'=a/(1+b(T3+T4))-c TSH; T4'=p TSH-m T4; T3'=m T4-d T3", "thyroid", {"a": 1.1, "b": 1.4, "c": 0.35, "p": 0.55, "m": 0.22, "d": 0.18}, (0.55, 0.5, 0.4)),
    24: _spec(24, "Blutzucker-Insulin-Modell", "hormones", ("Glucose", "Insulin"), "G'=meal(t)-u I G-bG; I'=s max(G-80,0)/(Km+G)-c I", "glucose_insulin", {"uptake": 0.018, "secretion": 0.85, "km": 90.0, "clear": 0.28}, (110.0, 12.0)),
    25: _spec(25, "Cortisol-Tagesrhythmus", "hormones", ("Cortisol",), "C'=b+A sin(2 pi (t-phi)/24)+stress(t)-c C", "circadian", {"base": 0.35, "amp": 0.28, "phase": 6.0, "clear": 0.12}, (0.35,)),
    26: _spec(26, "Testosteron-Regulation", "hormones", ("LH", "T"), "LH'=a/(1+bT)-cLH; T'=pLH-dT", "axis_feedback", {"a": 0.95, "b": 1.1, "c": 0.28, "p": 0.75, "d": 0.22}, (0.55, 0.45)),
    27: _spec(27, "Medikamentenlevel im Blut", "hormones", ("Gut", "Blood", "Tissue"), "Gut'=-ka Gut; Blood'=ka Gut-ke Blood-kcp Blood+kpc Tissue; Tissue'=kcp Blood-kpc Tissue", "pharmacokinetic", {"ka": 1.1, "ke": 0.22, "kcp": 0.35, "kpc": 0.18}, (1.0, 0.0, 0.0)),
    28: _spec(28, "Ritalin-Wirkspiegel", "hormones", ("Depot", "Blood", "Effect"), "Depot'=-ka Depot+dose(t); Blood'=ka Depot-ke Blood; Effect'=kon Blood-koff Effect", "effect_compartment", {"ka": 1.35, "ke": 0.35, "kon": 0.45, "koff": 0.22}, (1.0, 0.0, 0.0)),
    29: _spec(29, "Koffein-Abbau", "hormones", ("Caffeine",), "C'=intake(t)-ln(2) C/half_life", "half_life", {"half_life": 5.2, "intake": 1.0}, (1.0,)),
    30: _spec(30, "Alkoholabbau", "hormones", ("Alcohol",), "A'=intake(t)-Vmax A/(Km+A)", "saturating_decay", {"vmax": 0.18, "km": 0.08, "intake": 1.0}, (1.0,)),
    31: _spec(31, "VO2max-Trainingseffekt", "health", ("Fitness", "Fatigue"), "Fitness'=a load-dF Fitness; Fatigue'=b load-dX Fatigue", "training", {"adapt": 0.11, "strain": 0.24, "d_f": 0.025, "d_x": 0.12}, (0.2, 0.05)),
    32: _spec(32, "Hyrox-Leistungsmodell", "health", ("Energy", "Lactate", "Recovery"), "Energy'=-w Energy+r Rec; Lactate'=p w-c L; Rec'=g(1-Rec)-q w Rec", "hyrox", {"work": 0.35, "rec": 0.18, "prod": 0.4, "clear": 0.2}, (1.0, 0.1, 0.85)),
    33: _spec(33, "Muskelaufbau", "health", ("Muscle",), "M'=s stimulus/(Km+stimulus)-d M", "stim_growth", {"synth": 0.16, "km": 0.4, "breakdown": 0.028}, (0.25,)),
    34: _spec(34, "Körpergewicht", "health", ("Weight", "Adaptation"), "Weight'=(intake-expenditure-adapt)/E; Adapt'=a(W0-Weight)-d Adapt", "weight", {"intake": 2300.0, "expenditure": 2450.0, "density": 7700.0, "adapt": 18.0, "decay": 0.06}, (80.0, 0.0)),
    35: _spec(35, "LDL-Cholesterin-Senkung", "health", ("LDL",), "LDL'=production-clearance LDL-drug(t) LDL", "ldl", {"production": 2.2, "clearance": 0.025, "drug": 0.035}, (145.0,)),
    36: _spec(36, "Entzündungsmarker", "health", ("Stimulus", "Inflammation"), "Stimulus'=insult(t)-dS Stimulus; Inflammation'=gain Stimulus-clear Inflammation", "inflammation", {"d_s": 0.3, "gain": 0.55, "clear": 0.16}, (0.0, 0.08)),
    37: _spec(37, "Schlafdruck", "health", ("SleepPressure",), "H'=wake_rate during day; H'=-sleep_clear H at night", "sleep_pressure", {"wake": 0.045, "sleep": 0.22}, (0.2,)),
    38: _spec(38, "Stress-Erholung", "health", ("Stress", "Recovery"), "Stress'=load(t)-r Recovery Stress; Recovery'=g(1-Recovery)-q load Recovery", "stress_recovery", {"recover": 0.18, "regen": 0.08, "cost": 0.18}, (0.2, 0.8)),
    39: _spec(39, "Verletzungsheilung", "health", ("Damage", "Repair"), "Damage'=-r Repair Damage; Repair'=a Damage-c Repair", "healing", {"repair": 0.22, "activation": 0.42, "clear": 0.16}, (1.0, 0.05)),
    40: _spec(40, "Ausdauer-Adaption", "health", ("Mito", "Fatigue"), "Mito'=a training-d Mito; Fatigue'=b training-c Fatigue", "training", {"adapt": 0.1, "decay": 0.025, "strain": 0.16, "clear": 0.1}, (0.2, 0.05)),
    41: _spec(41, "Nutzerwachstum", "business", ("Users",), "N'=r N (1-N/K)", "logistic", {"r": 0.12, "k": 1.0}, (0.08,)),
    42: _spec(42, "Churn-Modell", "business", ("Users",), "N'=acquisition-c N", "churn", {"acquisition": 0.08, "churn": 0.035}, (0.6,)),
    43: _spec(43, "SaaS-MRR", "business", ("Customers", "MRR"), "Customers'=new-churn Customers; MRR'=ARPU new-churn MRR", "saas", {"new": 0.08, "churn": 0.025, "arpu": 0.55}, (0.1, 0.08)),
    44: _spec(44, "Viralitätsmodell", "business", ("Users",), "U'=organic+viral U(1-U/K)-churn U", "viral", {"organic": 0.015, "viral": 0.18, "churn": 0.02, "k": 1.0}, (0.05,)),
    45: _spec(45, "Marketplace-Liquidität", "business", ("Supply", "Demand", "Matches"), "S'=s0+aM-dS S; D'=d0+bM-dD D; M'=mSD/(1+S+D)-cM", "marketplace", {"s0": 0.03, "d0": 0.04, "m": 0.45, "clear": 0.18}, (0.18, 0.2, 0.03)),
    46: _spec(46, "Wartelisten-Wachstum", "business", ("Waitlist",), "W'=organic+paid(t)+ref W(1-W/K)-conversion W", "waitlist", {"organic": 0.025, "paid": 0.12, "referral": 0.13, "conversion": 0.018}, (0.08,)),
    47: _spec(47, "Cash Runway", "business", ("Cash", "Revenue"), "Cash'=Revenue-Burn; Revenue'=g Revenue-c Revenue", "runway", {"burn": 0.055, "growth": 0.08, "churn": 0.02}, (1.0, 0.08)),
    48: _spec(48, "Sales Pipeline", "business", ("Leads", "Qualified", "Closed"), "Leads'=inflow-q Leads; Qualified'=q Leads-close Q-loss Q; Closed'=close Q", "sales_pipeline", {"inflow": 0.12, "qualify": 0.16, "close": 0.07, "loss": 0.04}, (0.08, 0.02, 0.0)),
    49: _spec(49, "Produktivitätsmodell im Team", "business", ("Experience", "Overhead", "Productivity"), "Exp'=onboard(team-Exp)-attrition Exp; Overhead'=coord team^2-dO; Prod'=gExp-hO-dPProd", "team_productivity", {"team": 0.65, "onboard": 0.18, "coord": 0.08, "drag": 0.35}, (0.18, 0.05, 0.12)),
    50: _spec(50, "Feature-Debt-Modell", "business", ("Value", "Debt"), "Value'=feature_rate-complexity Debt; Debt'=a feature_rate-refactor Debt", "feature_debt", {"feature": 0.14, "complexity": 0.08, "debt": 0.22, "refactor": 0.06}, (0.1, 0.08)),
    51: _spec(51, "API-Kostenwachstum", "ai", ("Users", "Tokens", "Cost"), "Users'=gUsers-cUsers; Tokens'=tauUsers-nTokens; Cost'=priceTokens", "api_cost", {"growth": 0.1, "churn": 0.018, "tau": 0.45, "price": 0.04}, (0.08, 0.04, 0.0)),
    52: _spec(52, "LLM-Warteschlangenmodell", "ai", ("Queue", "Wait"), "Queue'=arrival-service(Q); Wait'=a(Queue/mu-Wait)", "queue", {"arrival": 0.38, "service": 0.32, "km": 0.2, "adapt": 0.5}, (0.12, 0.05)),
    53: _spec(53, "GPU-Auslastung", "ai", ("Waiting", "Running", "Utilization"), "Waiting'=arrivals-start; Running'=start-complete; Util'=a(R/cap-Util)", "gpu", {"arrivals": 0.28, "capacity": 0.75, "complete": 0.22}, (0.1, 0.05, 0.08)),
    54: _spec(54, "Datenbank-Load", "ai", ("Load", "Cache"), "Load'=reads+writes-capacity cache Load; Cache'=warm(1-Cache)-evict writes Cache", "database", {"reads": 0.3, "writes": 0.12, "capacity": 0.42, "warm": 0.08, "evict": 0.18}, (0.2, 0.65)),
    55: _spec(55, "Bug-Bestand", "ai", ("Bugs",), "Bugs'=injection_rate features-fix_rate Bugs", "bug_stock", {"injection": 0.11, "features": 0.9, "fix": 0.07}, (0.12,)),
    56: _spec(56, "Tech-Debt-Dynamik", "ai", ("Debt", "Velocity"), "Debt'=feature_debt-refactor Debt; Velocity'=a(base/(1+dDebt)-Velocity)", "tech_debt", {"feature_debt": 0.12, "refactor": 0.045, "base": 0.9, "drag": 1.5, "adapt": 0.4}, (0.12, 0.75)),
    57: _spec(57, "Modell-Degradation", "ai", ("Drift", "Quality"), "Drift'=drift_rate-retrain Drift; Quality'=-d Drift Quality+gain retrain(1-Quality)", "model_drift", {"drift": 0.04, "retrain": 0.02, "degrade": 0.5, "gain": 0.55}, (0.06, 0.95)),
    58: _spec(58, "Retrieval-Qualität", "ai", ("Knowledge", "Quality"), "Knowledge'=add-decay Knowledge; Quality'=benefit Knowledge/(Km+Knowledge)-stale Quality", "retrieval", {"add": 0.12, "decay": 0.018, "benefit": 0.18, "stale": 0.055}, (0.2, 0.4)),
    59: _spec(59, "App-Retention", "ai", ("Active",), "Active'=-churn(t) Active+reactivation", "retention", {"churn": 0.045, "reactivation": 0.012}, (1.0,)),
    60: _spec(60, "Empfehlungsalgorithmus-Feedback", "ai", ("Popularity", "Exposure"), "Popularity'=base+f Exposure Popularity/(1+Popularity)-dP Popularity; Exposure'=rPopularity-dEExposure", "recommendation", {"base": 0.02, "feedback": 0.45, "d_p": 0.08, "rank": 0.24, "d_e": 0.18}, (0.12, 0.1)),
    61: _spec(61, "Portfolio-Wachstum", "finance", ("Capital",), "Capital'=return Capital+contribution(t)", "compound", {"return": 0.055, "contribution": 0.025}, (0.2,)),
    62: _spec(62, "Zinseszins mit Cashflows", "finance", ("Balance",), "Balance'=r Balance+cashflow(t)", "compound", {"return": 0.045, "contribution": 0.035}, (0.2,)),
    63: _spec(63, "Crash-Erholung", "finance", ("Price", "Drawdown"), "Price'=m(trend-Price)-shock(t)Price; Drawdown'=shock(t)-recovery Drawdown", "crash", {"mean": 0.08, "trend": 1.0, "shock": 0.65, "recovery": 0.12}, (1.0, 0.0)),
    64: _spec(64, "Volatilitätsmodell", "finance", ("ShockMemory", "Volatility"), "ShockMemory'=shock(t)-dS; Vol'=a(base-Vol)+g ShockMemory", "volatility", {"decay": 0.18, "revert": 0.08, "base": 0.16, "gain": 0.5}, (0.05, 0.18)),
    65: _spec(65, "Gold/S&P-Allokation", "finance", ("Gold", "SP500"), "Gold'=rGGold+rebalance(targetGTotal-Gold); SP'=rSSP+rebalance(targetSTotal-SP)", "allocation", {"r_g": 0.025, "r_s": 0.06, "target_g": 0.35, "rebalance": 0.08}, (0.35, 0.65)),
    66: _spec(66, "Inflation und Kaufkraft", "finance", ("PriceLevel", "Power"), "PriceLevel'=inflation PriceLevel; Power'=-inflation Power", "inflation", {"inflation": 0.045}, (1.0, 1.0)),
    67: _spec(67, "Hypothekarschuld", "finance", ("Debt",), "Debt'=interest Debt-payment", "mortgage", {"interest": 0.035, "payment": 0.07}, (1.0,)),
    68: _spec(68, "Startup-Valuation", "finance", ("Revenue", "Multiple", "Valuation"), "Revenue'=gRevenue; Multiple'=c(floor-Multiple); Valuation'=a(Revenue Multiple-Valuation)", "valuation", {"growth": 0.11, "compression": 0.04, "floor": 4.0, "adapt": 0.45}, (0.12, 8.0, 0.9)),
    69: _spec(69, "Token-Ökonomie", "finance", ("Supply", "Demand", "Price"), "Supply'=mint-burnDemand; Demand'=adoption Demand(1-D/K)-decay Demand; Price'=s(Demand/Supply-Price)", "token_economy", {"mint": 0.035, "burn": 0.025, "adoption": 0.13, "decay": 0.03, "sensitivity": 0.6}, (1.0, 0.1, 0.08)),
    70: _spec(70, "Liquiditätsrisiko", "finance", ("Cash", "Risk"), "Cash'=inflow-outflow; Risk'=a(sigma((threshold-Cash)/w)-Risk)", "liquidity", {"inflow": 0.06, "outflow": 0.085, "threshold": 0.35, "width": 0.08, "adapt": 0.6}, (1.0, 0.02)),
    71: _spec(71, "Raumtemperatur", "physics", ("Temperature",), "Temperature'=-k(Temperature-Ambient)", "cooling", {"k": 0.08, "ambient": 0.28}, (0.85,)),
    72: _spec(72, "Akku-Entladung", "physics", ("Battery",), "Battery'=charge(t)-load(t)", "battery", {"load": 0.035, "charge": 0.12}, (1.0,)),
    73: _spec(73, "E-Scooter-Reichweite", "physics", ("Battery", "Distance"), "Battery'=-consumption(v,weight,slope); Distance'=v", "scooter", {"speed": 0.16, "load": 0.042, "slope": 0.02}, (1.0, 0.0)),
    74: _spec(74, "Wasserstand im Tank", "physics", ("Height",), "Height'=inflow-c sqrt(Height)", "tank", {"inflow": 0.08, "outflow": 0.12}, (0.2,)),
    75: _spec(75, "Beton-Trocknung", "physics", ("CoreMoisture", "SurfaceMoisture"), "Core'=-d(Core-Surface); Surface'=d(Core-Surface)-e Surface", "drying", {"diffusion": 0.16, "evap": 0.08}, (1.0, 0.7)),
    76: _spec(76, "Wärmeverlust im Boden", "physics", ("GroundTemp",), "GroundTemp'=conductance(Outside-GroundTemp)/capacity", "cooling", {"k": 0.055, "ambient": 0.18}, (0.85,)),
    77: _spec(77, "3D-Druck-Heizbett", "physics", ("Temperature", "Integral"), "Integral'=setpoint-T; T'=heater(kp e+ki Integral)-loss(T-Ambient)", "pid_heatbed", {"setpoint": 0.78, "kp": 1.1, "ki": 0.11, "heater": 0.35, "loss": 0.12}, (0.2, 0.0)),
    78: _spec(78, "Drohnenflugzeit", "physics", ("Energy", "Altitude"), "Energy'=-power(t); Altitude'=climb(t)-sink Altitude", "drone", {"power": 0.04, "climb": 0.035, "sink": 0.06}, (1.0, 0.1)),
    79: _spec(79, "Kamera-Akku bei Kälte", "physics", ("Battery", "Temperature"), "Battery'=-draw(1+cold_gain max(0,20-Temp)/20); Temp'=relax(Ambient-Temp)", "cold_battery", {"draw": 0.032, "cold_gain": 0.9, "ambient": 0.08, "relax": 0.05}, (1.0, 0.1)),
    80: _spec(80, "Gebäudeheizung", "physics", ("Indoor", "Wall"), "Indoor'=heat+e(Wall-Indoor)-loss(Indoor-Outdoor); Wall'=e(Indoor-Wall)-g(Wall-Outdoor)", "building_heat", {"heat": 0.09, "exchange": 0.1, "loss": 0.055, "outdoor": 0.2}, (0.32, 0.28)),
    81: _spec(81, "Räuber-Beute-Modell", "society", ("Prey", "Predator"), "Prey'=aPrey-bPreyPredator; Predator'=cPreyPredator-dPredator", "lotka", {"a": 0.55, "b": 0.35, "c": 0.26, "d": 0.38}, (0.65, 0.35)),
    82: _spec(82, "Epidemie-Modell", "society", ("S", "I", "R"), "S'=-beta S I; I'=beta S I-gamma I; R'=gamma I", "sir", {"beta": 0.6, "gamma": 0.12}, (0.96, 0.04, 0.0)),
    83: _spec(83, "Gerüchte-Verbreitung", "society", ("Unaware", "Spreaders", "Forgotten"), "U'=-beta U S; Spreaders'=beta U S-gamma Spreaders; Forgotten'=gamma Spreaders", "rumor", {"beta": 0.75, "gamma": 0.18}, (0.96, 0.04, 0.0)),
    84: _spec(84, "Städtewachstum", "society", ("Population", "Infrastructure"), "Pop'=rPop(1-Pop/(K0+aInfra)); Infra'=investPop-dInfra", "city", {"r": 0.08, "k0": 0.6, "alpha": 0.9, "invest": 0.05, "decay": 0.03}, (0.18, 0.1)),
    85: _spec(85, "Verkehrsstau", "society", ("Cars", "Delay"), "Cars'=inflow-capacity tanh(Cars/capacity); Delay'=a(Cars/capacity-Delay)", "traffic", {"inflow": 0.33, "capacity": 0.28, "adapt": 0.45}, (0.18, 0.02)),
    86: _spec(86, "CO2-Konzentration", "society", ("CO2",), "CO2'=emissions-uptake(CO2-baseline)", "co2", {"emissions": 0.07, "uptake": 0.025, "baseline": 0.28}, (0.42,)),
    87: _spec(87, "Recycling-System", "society", ("Raw", "Use", "Waste", "Recycle"), "Raw'=-pRaw+rRecycle; Use'=pRaw-dUse; Waste'=dUse-cWaste; Recycle'=cWaste-lRecycle-rRecycle", "recycling", {"production": 0.09, "discard": 0.05, "collect": 0.11, "recovery": 0.04, "loss": 0.02}, (1.0, 0.0, 0.0, 0.08)),
    88: _spec(88, "Waldbrand-Ausbreitung", "society", ("Fuel", "Fire", "Burned"), "Fuel'=-sFuelFire; Fire'=sFuelFire-eFire; Burned'=bFire", "wildfire", {"spread": 0.7, "extinguish": 0.22, "burn": 0.18}, (1.0, 0.02, 0.0)),
    89: _spec(89, "See-Algenblüte", "society", ("Nutrients", "Algae", "Oxygen"), "N'=input-uNA+rA-dN; A'=gNA/(Km+N)-deathA; O'=reaeration(sat-O)-respA+photoA", "algae", {"input": 0.08, "uptake": 0.45, "growth": 0.42, "death": 0.12, "reaeration": 0.08}, (0.5, 0.08, 0.9)),
    90: _spec(90, "Wasserverbrauch in Stadt", "society", ("Storage", "Demand"), "Storage'=inflow-Demand; Demand'=gDemand-conservation shortage Demand", "water_city", {"inflow": 0.11, "growth": 0.035, "conservation": 0.2, "threshold": 0.35}, (0.8, 0.16)),
    91: _spec(91, "HPA-Achse und allostatische Last", "mental_medical", ("CRH", "ACTH", "Cortisol", "GR"), "CRH'=stress/(1+f C GR)-c1 CRH; ACTH'=a CRH/(1+C GR)-c2 ACTH; C'=b ACTH-c3 C; GR'=repair(1-GR)-damage C GR", "hpa_axis", {"stress": 0.16, "feedback": 1.4, "acth_drive": 0.65, "cort_drive": 0.55, "clear": 0.28, "gr_repair": 0.08, "gr_damage": 0.10}, (0.25, 0.22, 0.35, 0.70)),
    92: _spec(92, "Zirkadiane Depression-Bistabilität", "mental_medical", ("MoodBurden", "CircadianDrive", "Cortisol"), "M'=aM-bM^3+sC-rD; D'=q(circadian-D)-uC; C'=base+amp circadian+stress-cC", "circadian_bistable_mood", {"mood_gain": 0.18, "nonlinear": 0.42, "drive_gain": 0.22, "stress_gain": 0.34, "entrain": 0.20, "cort_drag": 0.08, "base": 0.20, "amp": 0.18, "clear": 0.25}, (0.08, 0.20, 0.35)),
    93: _spec(93, "Rumination-Stress-Depressionsschleife", "mental_medical", ("Stressors", "Rumination", "MoodBurden"), "S'=load+sens R-coping S; R'=trigger S+habit R(1-R)-disengage R; M'=aR+bS-rec M", "rumination_loop", {"load": 0.06, "sensitivity": 0.10, "coping": 0.18, "trigger": 0.22, "habit": 0.16, "disengage": 0.11, "rumination_gain": 0.32, "stress_gain": 0.18, "recovery": 0.20}, (0.20, 0.15, 0.20)),
    94: _spec(94, "Stress-Reward-Mentalizing Depression", "mental_medical", ("Stress", "Reward", "Mentalizing", "MoodBurden"), "S'=load-resilience Z S; R'=gain/(1+hS)-dR; Z'=practice(1-Z)-stress ZS; M'=aS-bR-recM", "stress_reward_mentalizing", {"load": 0.10, "resilience": 0.35, "reward_gain": 0.24, "stress_suppression": 1.2, "reward_decay": 0.16, "practice": 0.08, "stress_damage": 0.12, "burden_gain": 0.28, "reward_buffer": 0.20, "recovery": 0.16}, (0.25, 0.45, 0.55, 0.25)),
    95: _spec(95, "SSRI-Wirkverzögerung und Neuroplastizität", "mental_medical", ("Drug", "Serotonin", "Plasticity", "SymptomBurden"), "D'=dose-kaD; 5HT'=base+rel-clear 5HT/(1+iD); P'=adapt 5HT/(Km+5HT)-lossP; S'=stress-benefit P S-recS", "ssri_plasticity", {"dose": 0.45, "ka": 0.75, "base": 0.10, "release": 0.08, "clear": 0.40, "inhibition": 1.4, "adapt": 0.16, "km": 0.35, "loss": 0.045, "stress": 0.08, "benefit": 0.24, "recovery": 0.04}, (0.0, 0.35, 0.10, 0.80)),
    96: _spec(96, "PTSD-Furchtextinktion", "mental_medical", ("Fear", "SafetyMemory", "Arousal"), "F'=recon A(1-F)-ext exposure Safety F; Safety'=learn exposure(1-Safety)-forget Safety; A'=cueF+stress-calm Safety A", "fear_extinction", {"exposure": 0.65, "reconsolidation": 0.18, "extinction": 0.45, "learning": 0.30, "forget": 0.035, "cue": 0.32, "stress": 0.04, "calm": 0.35}, (0.75, 0.18, 0.42)),
    97: _spec(97, "Panik-CO2-Arousal-Schleife", "mental_medical", ("CO2", "Arousal", "Avoidance"), "CO2'=challenge-breath CO2; A'=sens CO2+anticip Avoid-calm A; Avoid'=learn A(1-Avoid)-exposure Avoid", "panic_loop", {"challenge": 0.08, "breathing": 0.18, "sensitivity": 0.55, "anticipation": 0.28, "calm": 0.34, "learning": 0.20, "exposure": 0.08}, (0.22, 0.18, 0.25)),
    98: _spec(98, "Sucht: Reward-Learning und Craving", "mental_medical", ("Cue", "Craving", "Control"), "Cue'=cue(t)-dCue; Craving'=sens Cue(1+l(1-Control))-ext Control Craving; Control'=rec(1-Control)-stress Craving Control+treat(1-Control)", "addiction_learning", {"cue": 0.50, "cue_decay": 0.28, "sensitization": 0.42, "learning": 0.75, "extinction": 0.22, "recovery": 0.08, "stress": 0.20, "treatment": 0.05}, (0.12, 0.20, 0.55)),
    99: _spec(99, "Bipolare Mood-Oszillation", "mental_medical", ("Mood", "Momentum", "SleepDebt"), "Mood'=Momentum; Momentum'=drive(bias-Mood)-d Momentum-nl Mood^3+sleep SleepDebt; SleepDebt'=mania max(Mood,0)-rec SleepDebt", "bipolar_oscillator", {"drive": 0.16, "bias": 0.0, "damping": 0.08, "nonlinear": 0.08, "sleep_gain": 0.20, "mania": 0.18, "recovery": 0.11}, (0.15, 0.05, 0.20)),
    100: _spec(100, "Soziale Isolation als Attraktor", "mental_medical", ("Connection", "Threat", "Inflammation"), "C'=outreach(1-C)-withdraw Threat C; Threat'=stress+iso(1-C)-safety C Threat; Infl'=immune Threat-clear Infl", "social_isolation_attractor", {"outreach": 0.10, "withdrawal": 0.24, "stress": 0.04, "isolation": 0.22, "safety": 0.30, "immune": 0.20, "clear": 0.14}, (0.55, 0.25, 0.16)),
    101: _spec(101, "Digitaler Relapse-Risiko-Beobachter", "mental_medical", ("Stress", "SleepDebt", "Biomarker", "Risk"), "Stress'=load-coping Stress; Sleep'=disrupt+s Stress-rec Sleep; Bio'=gain(Stress+Sleep)-clear Bio; Risk'=a(sigmoid((Bio-th)/w)-Risk)", "relapse_observer", {"load": 0.08, "coping": 0.16, "disruption": 0.04, "stress_sleep": 0.18, "sleep_recovery": 0.15, "gain": 0.34, "clear": 0.22, "threshold": 0.50, "width": 0.08, "adapt": 0.50}, (0.22, 0.18, 0.20, 0.08)),
    102: _spec(102, "Expositionstherapie und Skill-Aufbau", "mental_medical", ("Distress", "Skill", "Avoidance"), "D'=trigger+relief Avoid-skill Skill D-hab exposure D; Skill'=learn exposure(1-Skill)-forget Skill; Avoid'=threat D(1-Avoid)-approach Skill Avoid", "exposure_learning", {"trigger": 0.06, "avoidance_relief": 0.12, "skill": 0.35, "habituation": 0.26, "learning": 0.22, "forget": 0.035, "threat": 0.28, "approach": 0.24}, (0.45, 0.12, 0.55)),
    103: _spec(103, "Achtsamkeit: Aufmerksamkeitskontrolle", "mental_medical", ("Rumination", "Attention", "Arousal"), "R'=trigger+arousal A-decenter Attention R; Attention'=practice(1-Attention)-fatigue A Attention; A'=stress+rum R-calm Attention A", "mindfulness_control", {"trigger": 0.06, "arousal_gain": 0.22, "decenter": 0.38, "practice": 0.16, "fatigue": 0.14, "stress": 0.06, "rumination_gain": 0.24, "calm": 0.30}, (0.42, 0.25, 0.30)),
    104: _spec(104, "HRV und autonome Balance", "mental_medical", ("Sympathetic", "Parasympathetic", "HRV"), "S'=stress-vagal P S-clear S; P'=rec(1-P)-cost S P+breath(t); HRV'=a(P/(1+S)-HRV)", "autonomic_balance", {"stress": 0.18, "vagal": 0.35, "clear": 0.22, "recovery": 0.11, "cost": 0.18, "breathing": 0.08, "adapt": 0.45}, (0.30, 0.55, 0.45)),
    105: _spec(105, "Gut-Brain-Inflammationsschleife", "mental_medical", ("Microbiome", "Cytokines", "MoodBurden"), "Micro'=diet(1-Micro)-stress Cyto Micro; Cyto'=dysbiosis(1-Micro)+insult-clear Cyto; Mood'=cyto Cyto-resilience Micro Mood-rec Mood", "gut_brain_inflammation", {"diet": 0.08, "stress_damage": 0.10, "dysbiosis": 0.18, "insult": 0.04, "clear": 0.16, "cyto_gain": 0.25, "resilience": 0.16, "recovery": 0.07}, (0.65, 0.20, 0.30)),
    106: _spec(106, "Tumor-Immune-Checkpoint-Therapie", "mental_medical", ("Tumor", "EffectorT", "Checkpoint", "Drug"), "T'=rT(1-T/K)-kill E T-drug D T; E'=prime T/(Km+T)+therapy D-exhaust C E-dE; C'=gain T-clear C-block D C; D'=dose(t)-cD", "tumor_immune_checkpoint", {"growth": 0.22, "k": 1.4, "kill": 0.38, "drug_kill": 0.18, "priming": 0.28, "km": 0.20, "immunotherapy": 0.18, "exhaustion": 0.25, "decay_e": 0.08, "checkpoint_gain": 0.24, "checkpoint_clear": 0.10, "block": 0.22, "dose": 0.45, "clear": 0.28}, (0.35, 0.22, 0.20, 0.0)),
    107: _spec(107, "Within-Host HIV-Viraldynamik", "mental_medical", ("TargetCells", "InfectedCells", "Virus"), "T'=lambda-dT T-beta T V; I'=beta T V-delta I; V'=burst I-cV-therapy(t)V", "viral_dynamics", {"lambda": 0.18, "death": 0.04, "beta": 0.45, "delta": 0.35, "burst": 1.4, "clear": 0.70, "therapy": 0.45}, (1.0, 0.02, 0.08)),
    108: _spec(108, "Sepsis: Zytokine, Schaden, Blutdruck", "mental_medical", ("Pathogen", "Cytokine", "Damage", "BloodPressure"), "P'=gP/(1+P)-kill C P-abxP; C'=immuneP-clearC+feedD; D'=tox C-repairD; BP'=rec(1-BP)-vaso C BP", "sepsis_inflammation", {"growth": 0.32, "kill": 0.42, "antibiotic": 0.08, "immune": 0.55, "clear": 0.34, "damage_feed": 0.10, "toxicity": 0.26, "repair": 0.12, "recovery": 0.18, "vasodilation": 0.22}, (0.22, 0.12, 0.05, 1.0)),
    109: _spec(109, "Antibiotikaresistenz-Wettbewerb", "mental_medical", ("Sensitive", "Resistant", "Drug"), "S'=rS S(1-N/K)-kill D S-mut S; R'=rR R(1-N/K)+mut S-cost R-kR D R; D'=dose(t)-clearD", "resistance_competition", {"growth_s": 0.35, "growth_r": 0.24, "k": 1.2, "kill": 0.65, "mutation": 0.015, "cost": 0.04, "resistant_kill": 0.12, "dose": 0.55, "clear": 0.45}, (0.35, 0.04, 0.0)),
    110: _spec(110, "Krebs: Sensitive und resistente Klone", "mental_medical", ("SensitiveTumor", "ResistantTumor", "Drug"), "S'=rS S(1-N/K)-kill D S-mutS; R'=rR R(1-N/K)+mutS-costR; D'=dose(t)-clearD", "cancer_resistance", {"growth_s": 0.24, "growth_r": 0.17, "k": 1.5, "kill": 0.40, "mutation": 0.010, "cost": 0.025, "dose": 0.42, "clear": 0.28}, (0.32, 0.03, 0.0)),
    111: _spec(111, "Alzheimer Amyloid-Tau-Neuroinflammation", "mental_medical", ("Amyloid", "Tau", "Neurons", "Microglia"), "A'=prod-clearA A-micro M A; Tau'=seed A-clearT Tau; N'=-tox(A+Tau)N+repair(1-N); M'=activation(A+Tau)-resolution M", "alzheimer_cascade", {"prod": 0.055, "clear_a": 0.05, "micro_clear": 0.08, "tau_seed": 0.11, "clear_t": 0.045, "neurotox": 0.045, "repair": 0.012, "activation": 0.12, "resolution": 0.11}, (0.20, 0.08, 1.0, 0.12)),
    112: _spec(112, "Parkinson Dopamin-Neuron-Verlust", "mental_medical", ("Neurons", "Dopamine", "MotorBurden"), "N'=-stress N+rescue(1-N); Dopamine'=synth N-clear D; Burden'=gain max(th-D,0)-adapt Burden", "parkinson_dopamine", {"stress": 0.025, "rescue": 0.008, "synth": 0.35, "clear": 0.22, "threshold": 0.55, "burden_gain": 0.22, "adapt": 0.08}, (1.0, 0.75, 0.08)),
    113: _spec(113, "Epilepsie E-I-Seizure-Risk", "mental_medical", ("Excitation", "Inhibition", "Adaptation"), "E'=(-E+sigmoid(gEE E-gEI I-A+stim))/tauE; I'=(-I+sigmoid(gIE E-gII I))/tauI; A'=rec E-decay A", "seizure_ei", {"g_ee": 4.2, "g_ei": 3.5, "g_ie": 3.2, "g_ii": 1.0, "stim": -0.8, "tau_e": 1.0, "tau_i": 1.6, "recruit": 0.12, "decay": 0.08}, (0.18, 0.24, 0.10)),
    114: _spec(114, "Migräne Cortical-Spreading-Dynamik", "mental_medical", ("Excitation", "Potassium", "Recovery"), "E'=stim+gainK-inhib R E-decayE; K'=releaseE-clearK; R'=restore(1-R)-fatigue E R", "migraine_csd", {"stim": 0.035, "k_gain": 0.28, "inhibition": 0.45, "decay": 0.22, "release": 0.24, "clear_k": 0.20, "restore": 0.10, "fatigue": 0.18}, (0.12, 0.10, 0.85)),
    115: _spec(115, "Chronischer Schmerz und Sensibilisierung", "mental_medical", ("Nociception", "Sensitization", "Analgesia"), "N'=injury-analgesia A N-clearN; S'=plasticity N(1-S)-desens A S-decayS; A'=treat(t)-clearA", "pain_sensitization", {"injury": 0.08, "analgesia": 0.40, "clear_n": 0.16, "plasticity": 0.30, "desensitize": 0.22, "decay_s": 0.045, "treatment": 0.30, "clear_a": 0.24}, (0.22, 0.20, 0.0)),
    116: _spec(116, "Diabetes Beta-Zell-Kompensation", "mental_medical", ("Glucose", "Insulin", "BetaCell"), "G'=meal+hepatic-uptake I G-basal(G-90); I'=secret Beta max(G-90)/(Km+G)-clearI; Beta'=comp hyper Beta-glucotox hyper Beta-turnover(Beta-1)", "beta_cell_diabetes", {"hepatic": 8.0, "uptake": 0.0025, "basal_clear": 0.05, "secretion": 1.25, "km": 120.0, "clear_i": 0.28, "compensation": 0.0008, "glucotoxicity": 0.0009, "turnover": 0.015}, (115.0, 10.0, 1.0)),
    117: _spec(117, "Hypertonie RAAS-Druck-Regelkreis", "mental_medical", ("Pressure", "RAAS", "Natriuresis"), "P'=salt+raas R-natriuresis N P-relax(P-base); R'=signal(setpoint-P)-block R; N'=pressure max(P-base)-clearN", "hypertension_raas", {"salt": 0.08, "raas_gain": 0.28, "natriuresis": 0.22, "relax": 0.10, "baseline": 1.0, "setpoint": 0.98, "width": 0.08, "block": 0.12, "pressure_gain": 0.25, "clear_n": 0.16}, (1.08, 0.35, 0.20)),
    118: _spec(118, "Asthma Entzündung und Bronchokonstriktion", "mental_medical", ("Inflammation", "Bronchoconstriction", "Medication"), "I'=allergen+eos B-steroid M I-clearI; B'=bronch I-bronchod M B-relaxB; M'=dose(t)-clearM", "asthma_inflammation", {"allergen": 0.08, "eos_gain": 0.10, "steroid": 0.28, "clear_i": 0.15, "bronch": 0.40, "bronchodilator": 0.35, "relax": 0.22, "dose": 0.38, "clear_m": 0.30}, (0.18, 0.12, 0.0)),
    119: _spec(119, "Placebo-Nocebo-Erwartungsdynamik", "mental_medical", ("Expectation", "SymptomBurden", "Adherence"), "E'=reinforce(baseline-Symptom)-decay(E-neutral); Symptom'=stress-placebo max(E,0)Symptom+nocebo max(-E,0)-treat Adh Symptom; Adh'=trust sigmoid(E)(1-Adh)-burden Symptom Adh", "expectation_adherence", {"reinforcement": 0.16, "baseline": 0.55, "decay": 0.08, "neutral": 0.0, "stress": 0.06, "placebo": 0.20, "nocebo": 0.16, "treatment": 0.18, "trust": 0.20, "burden": 0.10}, (0.05, 0.55, 0.62)),
    120: _spec(120, "Personalisierte Closed-Loop-Care", "mental_medical", ("Symptom", "Intervention", "Burden", "Trust"), "Intervention'=controller sigmoid((Symptom-target)/w)(1-I)-fatigue I; Symptom'=stress+Burden-efficacy I Trust Symptom-rec Symptom; Burden'=friction I-support Trust Burden-decay Burden; Trust'=success max(target-Symptom,0)-overload I Trust", "closed_loop_care", {"controller": 0.45, "target": 0.28, "width": 0.08, "fatigue": 0.18, "stress": 0.08, "efficacy": 0.42, "recovery": 0.08, "friction": 0.08, "support": 0.18, "decay": 0.10, "success": 0.18, "overload": 0.12}, (0.55, 0.05, 0.18, 0.62)),
}


def _p(params: Params, key: str, default: float = 0.0) -> float:
    return float(params.get(key, default))


def _y(state: State, index: int, default: float = 0.0) -> float:
    return float(state[index]) if index < len(state) else default


def sigmoid(value: float) -> float:
    return 1.0 / (1.0 + exp(-value))


def pulse(t: float, center: float = 30.0, width: float = 6.0, strength: float = 1.0) -> float:
    z = (t - center) / max(width, 1e-9)
    return strength * exp(-0.5 * z * z)


def periodic_pulse(t: float, period: float = 14.0, width: float = 2.0, strength: float = 1.0) -> float:
    phase = t % period
    distance = min(phase, period - phase)
    return strength * exp(-0.5 * (distance / max(width, 1e-9)) ** 2)


def training_load(t: float) -> float:
    return 0.55 + 0.35 * sin(t * 0.35) + periodic_pulse(t, 10.0, 1.5, 0.5)


def initial_state(model_id: int) -> tuple[float, ...]:
    """Return the default initial state for a model."""

    return MODELS[model_id].initial


def formula_for(model_id: int) -> str:
    """Return the human-readable formula string for a model."""

    return MODELS[model_id].formula


def rhs(model_id: int, t: float, y: State, params: Params | None = None) -> list[float]:
    """Evaluate dy/dt for one model.

    Args:
        model_id: Integer key present in ``MODELS``.
        t: Current time.
        y: Current state vector.
        params: Optional parameter overrides.

    Returns:
        A list with one derivative per state variable.
    """

    spec = MODELS[model_id]
    p = {**spec.params, **(params or {})}
    kind = spec.preset
    load = training_load(t)

    if kind == "decay":
        return [-_p(p, "k") * _y(y, 0)]
    if kind == "age_decay":
        return [-(_p(p, "k") * exp(_p(p, "alpha") * max(t - 30.0, 0.0))) * _y(y, 0)]
    if kind == "two_phase":
        return [-(_p(p, "k1") if t < 35.0 else _p(p, "k2")) * _y(y, 0)]
    if kind == "chain3":
        return [
            -_p(p, "lambda") * _y(y, 0),
            _p(p, "lambda") * _y(y, 0) - _p(p, "mu") * _y(y, 1),
            _p(p, "mu") * _y(y, 1) - _p(p, "nu") * _y(y, 2),
        ]
    if kind == "feedback_amh":
        activation = (_p(p, "lambda") * _y(y, 0)) / (1.0 + _p(p, "beta") * max(_y(y, 2), 0.0))
        return [-activation, activation - _p(p, "mu") * _y(y, 1), _p(p, "rho") * _y(y, 1) - _p(p, "c") * _y(y, 2)]
    if kind == "observer":
        return [
            _p(p, "source") - _p(p, "d") * _y(y, 0),
            _p(p, "eta", _p(p, "g", 0.8)) * _y(y, 0) - _p(p, "gamma", _p(p, "c", 0.2)) * _y(y, 1),
        ]
    if kind == "stimulus_response":
        u = _p(p, "u") * periodic_pulse(t, 14.0, 3.0)
        return [
            -_p(p, "k") * _y(y, 0),
            (u * _y(y, 0)) / (_p(p, "km") + _y(y, 0)) - _p(p, "m") * _y(y, 1),
            _p(p, "q") * _y(y, 1) - _p(p, "r") * _y(y, 2),
        ]
    if kind == "shock_decay":
        return [-(_p(p, "k") + pulse(t, _p(p, "center"), _p(p, "width"), _p(p, "shock"))) * _y(y, 0)]
    if kind == "pcos":
        return [
            -_p(p, "lambda") * _y(y, 0),
            _p(p, "lambda") * _y(y, 0) + _p(p, "excess") - _p(p, "m") * _y(y, 1),
            _p(p, "a") * _y(y, 1) - _p(p, "c") * _y(y, 2),
        ]
    if kind == "threshold":
        return [-_p(p, "k") * _y(y, 0), sigmoid((_p(p, "rc") - _y(y, 0)) / _p(p, "width")) - _p(p, "d") * _y(y, 1)]
    if kind == "cycle_length":
        return [-_p(p, "k") * _y(y, 0), _p(p, "adapt") * (_p(p, "base") + _p(p, "sens") / (0.2 + _y(y, 0)) - _y(y, 1))]
    if kind == "freezing":
        u = _p(p, "u") * periodic_pulse(t, 20.0, 4.0)
        return [-_p(p, "k") * _y(y, 0), (_p(p, "q") * u * _y(y, 0)) / (_p(p, "km") + _y(y, 0)) - _p(p, "r") * _y(y, 1)]
    if kind == "risk":
        return [-_p(p, "k") * _y(y, 0), _p(p, "adapt") * (sigmoid((_p(p, "ac") - _y(y, 0)) / _p(p, "width")) - _y(y, 1))]
    if kind == "adaptive_decay_rate":
        return [-_y(y, 1) * _y(y, 0), _p(p, "adapt") * (_p(p, "family_k") - _y(y, 1))]
    if kind == "power_proxy":
        return [-_p(p, "k") * _y(y, 0), _p(p, "adapt") * (_p(p, "scale") * max(_y(y, 0), 0.0) ** _p(p, "alpha") - _y(y, 1))]
    if kind == "fsh":
        return [
            -_p(p, "k") * _y(y, 0),
            _p(p, "rho") * _y(y, 0) - _p(p, "c_i") * _y(y, 1),
            _p(p, "a") - _p(p, "b") * _y(y, 1) - _p(p, "c_f") * _y(y, 2),
        ]
    if kind == "multi_cycle":
        u = _p(p, "u") * periodic_pulse(t, 12.0, 2.5)
        return [
            -_p(p, "k") * _y(y, 0) - _p(p, "drain") * u * _y(y, 1),
            (_p(p, "s") * u * _y(y, 0)) / (_p(p, "km") + _y(y, 0)) - _p(p, "c") * _y(y, 1),
        ]
    if kind == "cycle_hormones":
        wave = 0.5 + 0.5 * sin((2.0 * pi * t) / _p(p, "period"))
        return [
            0.15 + 0.2 * wave - 0.35 * _y(y, 0),
            0.45 * _y(y, 0) * (1.0 + _p(p, "feedback") * sigmoid(8.0 * (_y(y, 3) - 0.55))) - 0.28 * _y(y, 1),
            0.35 * _y(y, 0) / (1.0 + _y(y, 4)) - 0.2 * _y(y, 2),
            0.38 * _y(y, 2) - 0.18 * _y(y, 3),
            0.22 * _y(y, 1) * sigmoid(8.0 * (_y(y, 3) - 0.55)) - 0.14 * _y(y, 4),
        ]
    if kind == "lh_surge":
        return [
            _p(p, "r") * _y(y, 0) * (1.0 - _y(y, 0) / _p(p, "k")) - 0.03 * _y(y, 0),
            0.06 + _p(p, "g") * sigmoid(14.0 * (_y(y, 0) - _p(p, "ec"))) - _p(p, "c") * _y(y, 1),
            0.12 * _y(y, 1) - 0.16 * _y(y, 2),
        ]
    if kind == "thyroid":
        return [
            _p(p, "a") / (1.0 + _p(p, "b") * (_y(y, 1) + _y(y, 2))) - _p(p, "c") * _y(y, 0),
            _p(p, "p") * _y(y, 0) - _p(p, "m") * _y(y, 1) - 0.08 * _y(y, 1),
            _p(p, "m") * _y(y, 1) - _p(p, "d") * _y(y, 2),
        ]
    if kind == "glucose_insulin":
        meal = 45.0 * periodic_pulse(t, 8.0, 0.7)
        return [
            meal - _p(p, "uptake") * _y(y, 1) * _y(y, 0) - 0.08 * (_y(y, 0) - 85.0),
            (_p(p, "secretion") * max(_y(y, 0) - 80.0, 0.0)) / (_p(p, "km") + _y(y, 0)) - _p(p, "clear") * _y(y, 1),
        ]
    if kind == "circadian":
        return [_p(p, "base") + _p(p, "amp") * sin((2.0 * pi * (t - _p(p, "phase"))) / 24.0) + pulse(t, 12.0, 1.5, 0.3) - _p(p, "clear") * _y(y, 0)]
    if kind == "axis_feedback":
        return [_p(p, "a") / (1.0 + _p(p, "b") * _y(y, 1)) - _p(p, "c") * _y(y, 0), _p(p, "p") * _y(y, 0) - _p(p, "d") * _y(y, 1)]
    if kind == "pharmacokinetic":
        return [
            -_p(p, "ka") * _y(y, 0),
            _p(p, "ka") * _y(y, 0) - _p(p, "ke") * _y(y, 1) - _p(p, "kcp") * _y(y, 1) + _p(p, "kpc") * _y(y, 2),
            _p(p, "kcp") * _y(y, 1) - _p(p, "kpc") * _y(y, 2),
        ]
    if kind == "effect_compartment":
        return [
            -_p(p, "ka") * _y(y, 0) + periodic_pulse(t, 8.0, 0.4, 0.4),
            _p(p, "ka") * _y(y, 0) - _p(p, "ke") * _y(y, 1),
            _p(p, "kon") * _y(y, 1) - _p(p, "koff") * _y(y, 2),
        ]
    if kind == "half_life":
        return [periodic_pulse(t, 12.0, 0.35, _p(p, "intake") * 0.4) - (log(2.0) / _p(p, "half_life")) * _y(y, 0)]
    if kind == "saturating_decay":
        return [periodic_pulse(t, 18.0, 0.45, _p(p, "intake") * 0.5) - (_p(p, "vmax") * _y(y, 0)) / (_p(p, "km") + _y(y, 0) + 1e-9)]
    if kind == "training":
        return [
            _p(p, "adapt", 0.1) * load - _p(p, "d_f", _p(p, "decay", 0.02)) * _y(y, 0),
            _p(p, "strain", 0.15) * load - _p(p, "d_x", _p(p, "clear", 0.1)) * _y(y, 1),
        ]
    if kind == "hyrox":
        return [-_p(p, "work") * load * _y(y, 0) + _p(p, "rec") * _y(y, 2), _p(p, "prod") * load - _p(p, "clear") * _y(y, 1), 0.08 * (1.0 - _y(y, 2)) - 0.18 * load * _y(y, 2)]
    if kind == "stim_growth":
        return [(_p(p, "synth") * load) / (_p(p, "km") + load) - _p(p, "breakdown") * _y(y, 0)]
    if kind == "weight":
        return [(_p(p, "intake") - _p(p, "expenditure") - _y(y, 1)) / _p(p, "density"), _p(p, "adapt") * (80.0 - _y(y, 0)) - _p(p, "decay") * _y(y, 1)]
    if kind == "ldl":
        return [_p(p, "production") - _p(p, "clearance") * _y(y, 0) - _p(p, "drug") * sigmoid(t - 15.0) * _y(y, 0)]
    if kind == "inflammation":
        return [pulse(t, 10.0, 1.7) - _p(p, "d_s") * _y(y, 0), _p(p, "gain") * _y(y, 0) - _p(p, "clear") * _y(y, 1)]
    if kind == "sleep_pressure":
        hour = t % 24.0
        return [_p(p, "wake") if 7.0 <= hour <= 23.0 else -_p(p, "sleep") * _y(y, 0)]
    if kind == "stress_recovery":
        return [load - _p(p, "recover") * _y(y, 1) * _y(y, 0), _p(p, "regen") * (1.0 - _y(y, 1)) - _p(p, "cost") * load * _y(y, 1)]
    if kind == "healing":
        return [-_p(p, "repair") * _y(y, 1) * _y(y, 0), _p(p, "activation") * _y(y, 0) - _p(p, "clear") * _y(y, 1)]
    if kind == "logistic":
        return [_p(p, "r") * _y(y, 0) * (1.0 - _y(y, 0) / _p(p, "k"))]
    if kind == "churn":
        return [_p(p, "acquisition") - _p(p, "churn") * _y(y, 0)]
    if kind == "saas":
        return [_p(p, "new") - _p(p, "churn") * _y(y, 0), _p(p, "arpu") * _p(p, "new") - _p(p, "churn") * _y(y, 1)]
    if kind == "viral":
        return [_p(p, "organic") + _p(p, "viral") * _y(y, 0) * (1.0 - _y(y, 0) / _p(p, "k")) - _p(p, "churn") * _y(y, 0)]
    if kind == "marketplace":
        matches = (_p(p, "m") * _y(y, 0) * _y(y, 1)) / (1.0 + _y(y, 0) + _y(y, 1))
        return [_p(p, "s0") + 0.15 * _y(y, 2) - 0.08 * _y(y, 0), _p(p, "d0") + 0.15 * _y(y, 2) - 0.08 * _y(y, 1), matches - _p(p, "clear") * _y(y, 2)]
    if kind == "waitlist":
        return [_p(p, "organic") + _p(p, "paid") * periodic_pulse(t, 18.0, 4.0) + _p(p, "referral") * _y(y, 0) * (1.0 - _y(y, 0)) - _p(p, "conversion") * _y(y, 0)]
    if kind == "runway":
        return [_y(y, 1) - _p(p, "burn"), (_p(p, "growth") - _p(p, "churn")) * _y(y, 1) + 0.005]
    if kind == "sales_pipeline":
        return [_p(p, "inflow") - _p(p, "qualify") * _y(y, 0), _p(p, "qualify") * _y(y, 0) - _p(p, "close") * _y(y, 1) - _p(p, "loss") * _y(y, 1), _p(p, "close") * _y(y, 1)]
    if kind == "team_productivity":
        return [_p(p, "onboard") * (_p(p, "team") - _y(y, 0)) - 0.03 * _y(y, 0), _p(p, "coord") * _p(p, "team") ** 2 - 0.12 * _y(y, 1), 0.7 * _y(y, 0) - _p(p, "drag") * _y(y, 1) - 0.18 * _y(y, 2)]
    if kind == "feature_debt":
        return [_p(p, "feature") - _p(p, "complexity") * _y(y, 1), _p(p, "debt") * _p(p, "feature") - _p(p, "refactor") * _y(y, 1)]
    if kind == "api_cost":
        return [(_p(p, "growth") - _p(p, "churn")) * _y(y, 0), _p(p, "tau") * _y(y, 0) - 0.08 * _y(y, 1), _p(p, "price") * _y(y, 1)]
    if kind == "queue":
        served = (_p(p, "service") * _y(y, 0)) / (_p(p, "km") + _y(y, 0) + 1e-9)
        return [_p(p, "arrival") - served, _p(p, "adapt") * (_y(y, 0) / _p(p, "service") - _y(y, 1))]
    if kind == "gpu":
        start = min(_p(p, "capacity"), _y(y, 0) + _p(p, "arrivals")) * 0.28
        return [_p(p, "arrivals") - start, start - _p(p, "complete") * _y(y, 1), 0.45 * (_y(y, 1) / _p(p, "capacity") - _y(y, 2))]
    if kind == "database":
        return [_p(p, "reads") + _p(p, "writes") - _p(p, "capacity") * _y(y, 1) * _y(y, 0), _p(p, "warm") * (1.0 - _y(y, 1)) - _p(p, "evict") * _p(p, "writes") * _y(y, 1)]
    if kind == "bug_stock":
        return [_p(p, "injection") * _p(p, "features") - _p(p, "fix") * _y(y, 0)]
    if kind == "tech_debt":
        return [_p(p, "feature_debt") - _p(p, "refactor") * _y(y, 0), _p(p, "adapt") * (_p(p, "base") / (1.0 + _p(p, "drag") * _y(y, 0)) - _y(y, 1))]
    if kind == "model_drift":
        return [_p(p, "drift") - _p(p, "retrain") * _y(y, 0), -_p(p, "degrade") * _y(y, 0) * _y(y, 1) + _p(p, "gain") * _p(p, "retrain") * (1.0 - _y(y, 1))]
    if kind == "retrieval":
        return [_p(p, "add") - _p(p, "decay") * _y(y, 0), _p(p, "benefit") * _y(y, 0) / (0.3 + _y(y, 0)) - _p(p, "stale") * _y(y, 1)]
    if kind == "retention":
        return [-_p(p, "churn") * (1.0 + 0.25 * sin(t * 0.2)) * _y(y, 0) + _p(p, "reactivation")]
    if kind == "recommendation":
        return [_p(p, "base") + (_p(p, "feedback") * _y(y, 1) * _y(y, 0)) / (1.0 + _y(y, 0)) - _p(p, "d_p") * _y(y, 0), _p(p, "rank") * _y(y, 0) - _p(p, "d_e") * _y(y, 1)]
    if kind == "compound":
        return [_p(p, "return") * _y(y, 0) + _p(p, "contribution")]
    if kind == "crash":
        shock = pulse(t, 18.0, 1.6, _p(p, "shock"))
        return [_p(p, "mean") * (_p(p, "trend") - _y(y, 0)) - shock * _y(y, 0), shock - _p(p, "recovery") * _y(y, 1)]
    if kind == "volatility":
        shock = pulse(t, 20.0, 2.0, 0.7)
        return [shock - _p(p, "decay") * _y(y, 0), _p(p, "revert") * (_p(p, "base") - _y(y, 1)) + _p(p, "gain") * _y(y, 0)]
    if kind == "allocation":
        total = _y(y, 0) + _y(y, 1)
        return [_p(p, "r_g") * _y(y, 0) + _p(p, "rebalance") * (_p(p, "target_g") * total - _y(y, 0)), _p(p, "r_s") * _y(y, 1) + _p(p, "rebalance") * ((1.0 - _p(p, "target_g")) * total - _y(y, 1))]
    if kind == "inflation":
        return [_p(p, "inflation") * _y(y, 0), -_p(p, "inflation") * _y(y, 1)]
    if kind == "mortgage":
        return [_p(p, "interest") * _y(y, 0) - _p(p, "payment")]
    if kind == "valuation":
        target = _y(y, 0) * _y(y, 1)
        return [_p(p, "growth") * _y(y, 0), _p(p, "compression") * (_p(p, "floor") - _y(y, 1)), _p(p, "adapt") * (target - _y(y, 2))]
    if kind == "token_economy":
        return [_p(p, "mint") - _p(p, "burn") * _y(y, 1), _p(p, "adoption") * _y(y, 1) * (1.0 - _y(y, 1)) - _p(p, "decay") * _y(y, 1) + 0.01, _p(p, "sensitivity") * (_y(y, 1) / (_y(y, 0) + 1e-9) - _y(y, 2))]
    if kind == "liquidity":
        return [_p(p, "inflow") - _p(p, "outflow"), _p(p, "adapt") * (sigmoid((_p(p, "threshold") - _y(y, 0)) / _p(p, "width")) - _y(y, 1))]
    if kind == "cooling":
        return [-_p(p, "k") * (_y(y, 0) - _p(p, "ambient"))]
    if kind == "battery":
        charge = periodic_pulse(t, 24.0, 3.0, _p(p, "charge"))
        return [charge - _p(p, "load") * (1.0 + 0.4 * sin(t * 0.5) ** 2)]
    if kind == "scooter":
        return [-(_p(p, "load") + _p(p, "slope")) * (1.0 + _p(p, "speed")), _p(p, "speed")]
    if kind == "tank":
        return [_p(p, "inflow") - _p(p, "outflow") * sqrt(max(_y(y, 0), 0.0))]
    if kind == "drying":
        return [-_p(p, "diffusion") * (_y(y, 0) - _y(y, 1)), _p(p, "diffusion") * (_y(y, 0) - _y(y, 1)) - _p(p, "evap") * _y(y, 1)]
    if kind == "pid_heatbed":
        error = _p(p, "setpoint") - _y(y, 0)
        return [_p(p, "heater") * (_p(p, "kp") * error + _p(p, "ki") * _y(y, 1)) - _p(p, "loss") * (_y(y, 0) - 0.2), error]
    if kind == "drone":
        return [-_p(p, "power") * (1.0 + 0.5 * periodic_pulse(t, 12.0, 2.0)), _p(p, "climb") * sin(t * 0.2) - _p(p, "sink") * _y(y, 1)]
    if kind == "cold_battery":
        return [-_p(p, "draw") * (1.0 + _p(p, "cold_gain") * max(0.0, 0.4 - _y(y, 1))), _p(p, "relax") * (_p(p, "ambient") - _y(y, 1))]
    if kind == "building_heat":
        return [_p(p, "heat") + _p(p, "exchange") * (_y(y, 1) - _y(y, 0)) - _p(p, "loss") * (_y(y, 0) - _p(p, "outdoor")), _p(p, "exchange") * (_y(y, 0) - _y(y, 1)) - 0.04 * (_y(y, 1) - _p(p, "outdoor"))]
    if kind == "lotka":
        return [_p(p, "a") * _y(y, 0) - _p(p, "b") * _y(y, 0) * _y(y, 1), _p(p, "c") * _y(y, 0) * _y(y, 1) - _p(p, "d") * _y(y, 1)]
    if kind == "sir":
        return [-_p(p, "beta") * _y(y, 0) * _y(y, 1), _p(p, "beta") * _y(y, 0) * _y(y, 1) - _p(p, "gamma") * _y(y, 1), _p(p, "gamma") * _y(y, 1)]
    if kind == "rumor":
        return [-_p(p, "beta") * _y(y, 0) * _y(y, 1), _p(p, "beta") * _y(y, 0) * _y(y, 1) - _p(p, "gamma") * _y(y, 1), _p(p, "gamma") * _y(y, 1)]
    if kind == "city":
        return [_p(p, "r") * _y(y, 0) * (1.0 - _y(y, 0) / (_p(p, "k0") + _p(p, "alpha") * _y(y, 1))), _p(p, "invest") * _y(y, 0) - _p(p, "decay") * _y(y, 1)]
    if kind == "traffic":
        outflow = _p(p, "capacity") * tanh(_y(y, 0) / _p(p, "capacity"))
        return [_p(p, "inflow") - outflow, _p(p, "adapt") * (_y(y, 0) / _p(p, "capacity") - _y(y, 1))]
    if kind == "co2":
        return [_p(p, "emissions") - _p(p, "uptake") * (_y(y, 0) - _p(p, "baseline"))]
    if kind == "recycling":
        return [
            -_p(p, "production") * _y(y, 0) + _p(p, "recovery") * _y(y, 3),
            _p(p, "production") * _y(y, 0) - _p(p, "discard") * _y(y, 1),
            _p(p, "discard") * _y(y, 1) - _p(p, "collect") * _y(y, 2),
            _p(p, "collect") * _y(y, 2) - _p(p, "loss") * _y(y, 3) - _p(p, "recovery") * _y(y, 3),
        ]
    if kind == "wildfire":
        return [-_p(p, "spread") * _y(y, 0) * _y(y, 1), _p(p, "spread") * _y(y, 0) * _y(y, 1) - _p(p, "extinguish") * _y(y, 1), _p(p, "burn") * _y(y, 1)]
    if kind == "algae":
        return [
            _p(p, "input") - _p(p, "uptake") * _y(y, 0) * _y(y, 1) + 0.05 * _y(y, 1) - 0.04 * _y(y, 0),
            _p(p, "growth") * _y(y, 0) * _y(y, 1) / (0.25 + _y(y, 0)) - _p(p, "death") * _y(y, 1),
            _p(p, "reaeration") * (1.0 - _y(y, 2)) - 0.18 * _y(y, 1) + 0.05 * _y(y, 1),
        ]
    if kind == "water_city":
        shortage = sigmoid((_p(p, "threshold") - _y(y, 0)) / 0.06)
        return [_p(p, "inflow") - _y(y, 1), _p(p, "growth") * _y(y, 1) - _p(p, "conservation") * shortage * _y(y, 1)]
    if kind == "hpa_axis":
        stress = 0.08 + 0.03 * sin((2.0 * pi * t) / 24.0) + pulse(t, 18.0, 5.0, _p(p, "stress"))
        cort_gr = max(_y(y, 2), 0.0) * max(_y(y, 3), 0.0)
        return [
            stress / (1.0 + _p(p, "feedback") * cort_gr) - 0.32 * _y(y, 0),
            _p(p, "acth_drive") * _y(y, 0) / (1.0 + cort_gr) - 0.30 * _y(y, 1),
            _p(p, "cort_drive") * _y(y, 1) - _p(p, "clear") * _y(y, 2),
            _p(p, "gr_repair") * (1.0 - _y(y, 3)) - _p(p, "gr_damage") * max(_y(y, 2), 0.0) * _y(y, 3),
        ]
    if kind == "circadian_bistable_mood":
        circadian = 0.5 + 0.5 * sin((2.0 * pi * t) / 24.0)
        stress = pulse(t, 20.0, 3.0, 0.20)
        return [
            _p(p, "mood_gain") * _y(y, 0) - _p(p, "nonlinear") * _y(y, 0) ** 3 + _p(p, "stress_gain") * _y(y, 2) - _p(p, "drive_gain") * _y(y, 1),
            _p(p, "entrain") * (circadian - _y(y, 1)) - _p(p, "cort_drag") * _y(y, 2),
            _p(p, "base") + _p(p, "amp") * circadian + stress - _p(p, "clear") * _y(y, 2),
        ]
    if kind == "rumination_loop":
        return [
            _p(p, "load") + _p(p, "sensitivity") * _y(y, 1) - _p(p, "coping") * _y(y, 0),
            _p(p, "trigger") * _y(y, 0) + _p(p, "habit") * _y(y, 1) * (1.0 - _y(y, 1)) - _p(p, "disengage") * _y(y, 1),
            _p(p, "rumination_gain") * _y(y, 1) + _p(p, "stress_gain") * _y(y, 0) - _p(p, "recovery") * _y(y, 2),
        ]
    if kind == "stress_reward_mentalizing":
        return [
            _p(p, "load") - _p(p, "resilience") * _y(y, 2) * _y(y, 0),
            _p(p, "reward_gain") / (1.0 + _p(p, "stress_suppression") * max(_y(y, 0), 0.0)) - _p(p, "reward_decay") * _y(y, 1),
            _p(p, "practice") * (1.0 - _y(y, 2)) - _p(p, "stress_damage") * max(_y(y, 0), 0.0) * _y(y, 2),
            _p(p, "burden_gain") * _y(y, 0) - _p(p, "reward_buffer") * _y(y, 1) - _p(p, "recovery") * _y(y, 3),
        ]
    if kind == "ssri_plasticity":
        dose = _p(p, "dose") * periodic_pulse(t, 24.0, 1.0)
        serotonin = max(_y(y, 1), 0.0)
        return [
            dose - _p(p, "ka") * _y(y, 0),
            _p(p, "base") + _p(p, "release") - (_p(p, "clear") * serotonin) / (1.0 + _p(p, "inhibition") * max(_y(y, 0), 0.0)),
            (_p(p, "adapt") * serotonin) / (_p(p, "km") + serotonin + 1e-9) - _p(p, "loss") * _y(y, 2),
            _p(p, "stress") - _p(p, "benefit") * _y(y, 2) * _y(y, 3) - _p(p, "recovery") * _y(y, 3),
        ]
    if kind == "fear_extinction":
        exposure = _p(p, "exposure") * periodic_pulse(t, 12.0, 2.0)
        return [
            _p(p, "reconsolidation") * _y(y, 2) * (1.0 - _y(y, 0)) - _p(p, "extinction") * exposure * _y(y, 1) * _y(y, 0),
            _p(p, "learning") * exposure * (1.0 - _y(y, 1)) - _p(p, "forget") * _y(y, 1),
            _p(p, "cue") * _y(y, 0) + _p(p, "stress") - _p(p, "calm") * _y(y, 1) * _y(y, 2),
        ]
    if kind == "panic_loop":
        challenge = _p(p, "challenge") + pulse(t, 16.0, 2.0, 0.10)
        return [
            challenge + 0.04 * _y(y, 1) - _p(p, "breathing") * _y(y, 0),
            _p(p, "sensitivity") * _y(y, 0) + _p(p, "anticipation") * _y(y, 2) - _p(p, "calm") * _y(y, 1),
            _p(p, "learning") * _y(y, 1) * (1.0 - _y(y, 2)) - _p(p, "exposure") * _y(y, 2),
        ]
    if kind == "addiction_learning":
        cue_input = _p(p, "cue") * periodic_pulse(t, 18.0, 2.2)
        return [
            cue_input - _p(p, "cue_decay") * _y(y, 0),
            _p(p, "sensitization") * _y(y, 0) * (1.0 + _p(p, "learning") * (1.0 - _y(y, 2))) - _p(p, "extinction") * _y(y, 2) * _y(y, 1),
            _p(p, "recovery") * (1.0 - _y(y, 2)) - _p(p, "stress") * _y(y, 1) * _y(y, 2) + _p(p, "treatment") * (1.0 - _y(y, 2)),
        ]
    if kind == "bipolar_oscillator":
        return [
            _y(y, 1),
            _p(p, "drive") * (_p(p, "bias") - _y(y, 0)) - _p(p, "damping") * _y(y, 1) - _p(p, "nonlinear") * _y(y, 0) ** 3 + _p(p, "sleep_gain") * _y(y, 2),
            _p(p, "mania") * max(_y(y, 0), 0.0) - _p(p, "recovery") * _y(y, 2),
        ]
    if kind == "social_isolation_attractor":
        return [
            _p(p, "outreach") * (1.0 - _y(y, 0)) - _p(p, "withdrawal") * _y(y, 1) * _y(y, 0),
            _p(p, "stress") + _p(p, "isolation") * (1.0 - _y(y, 0)) - _p(p, "safety") * _y(y, 0) * _y(y, 1),
            _p(p, "immune") * _y(y, 1) - _p(p, "clear") * _y(y, 2),
        ]
    if kind == "relapse_observer":
        return [
            _p(p, "load") - _p(p, "coping") * _y(y, 0),
            _p(p, "disruption") + _p(p, "stress_sleep") * _y(y, 0) - _p(p, "sleep_recovery") * _y(y, 1),
            _p(p, "gain") * (_y(y, 0) + _y(y, 1)) - _p(p, "clear") * _y(y, 2),
            _p(p, "adapt") * (sigmoid((_y(y, 2) - _p(p, "threshold")) / _p(p, "width")) - _y(y, 3)),
        ]
    if kind == "exposure_learning":
        exposure = periodic_pulse(t, 10.0, 2.0)
        return [
            _p(p, "trigger") + _p(p, "avoidance_relief") * _y(y, 2) - _p(p, "skill") * _y(y, 1) * _y(y, 0) - _p(p, "habituation") * exposure * _y(y, 0),
            _p(p, "learning") * exposure * (1.0 - _y(y, 1)) - _p(p, "forget") * _y(y, 1),
            _p(p, "threat") * _y(y, 0) * (1.0 - _y(y, 2)) - _p(p, "approach") * _y(y, 1) * _y(y, 2),
        ]
    if kind == "mindfulness_control":
        practice = _p(p, "practice") * (0.6 + periodic_pulse(t, 24.0, 1.2, 0.8))
        return [
            _p(p, "trigger") + _p(p, "arousal_gain") * _y(y, 2) - _p(p, "decenter") * _y(y, 1) * _y(y, 0),
            practice * (1.0 - _y(y, 1)) - _p(p, "fatigue") * _y(y, 2) * _y(y, 1),
            _p(p, "stress") + _p(p, "rumination_gain") * _y(y, 0) - _p(p, "calm") * _y(y, 1) * _y(y, 2),
        ]
    if kind == "autonomic_balance":
        stress = 0.06 + _p(p, "stress") * periodic_pulse(t, 12.0, 3.0)
        return [
            stress - _p(p, "vagal") * _y(y, 1) * _y(y, 0) - _p(p, "clear") * _y(y, 0),
            _p(p, "recovery") * (1.0 - _y(y, 1)) - _p(p, "cost") * _y(y, 0) * _y(y, 1) + _p(p, "breathing") * periodic_pulse(t, 6.0, 1.0),
            _p(p, "adapt") * (_y(y, 1) / (1.0 + max(_y(y, 0), 0.0)) - _y(y, 2)),
        ]
    if kind == "gut_brain_inflammation":
        insult = _p(p, "insult") + pulse(t, 20.0, 4.0, 0.08)
        return [
            _p(p, "diet") * (1.0 - _y(y, 0)) - _p(p, "stress_damage") * _y(y, 1) * _y(y, 0),
            _p(p, "dysbiosis") * (1.0 - _y(y, 0)) + insult - _p(p, "clear") * _y(y, 1),
            _p(p, "cyto_gain") * _y(y, 1) - _p(p, "resilience") * _y(y, 0) * _y(y, 2) - _p(p, "recovery") * _y(y, 2),
        ]
    if kind == "tumor_immune_checkpoint":
        dose = _p(p, "dose") * periodic_pulse(t, 14.0, 2.0)
        return [
            _p(p, "growth") * _y(y, 0) * (1.0 - _y(y, 0) / _p(p, "k")) - _p(p, "kill") * _y(y, 1) * _y(y, 0) - _p(p, "drug_kill") * _y(y, 3) * _y(y, 0),
            _p(p, "priming") * _y(y, 0) / (_p(p, "km") + _y(y, 0) + 1e-9) + _p(p, "immunotherapy") * _y(y, 3) - _p(p, "exhaustion") * _y(y, 2) * _y(y, 1) - _p(p, "decay_e") * _y(y, 1),
            _p(p, "checkpoint_gain") * _y(y, 0) - _p(p, "checkpoint_clear") * _y(y, 2) - _p(p, "block") * _y(y, 3) * _y(y, 2),
            dose - _p(p, "clear") * _y(y, 3),
        ]
    if kind == "viral_dynamics":
        therapy = _p(p, "therapy") * sigmoid(t - 15.0)
        return [
            _p(p, "lambda") - _p(p, "death") * _y(y, 0) - _p(p, "beta") * _y(y, 0) * _y(y, 2),
            _p(p, "beta") * _y(y, 0) * _y(y, 2) - _p(p, "delta") * _y(y, 1),
            _p(p, "burst") * _y(y, 1) - _p(p, "clear") * _y(y, 2) - therapy * _y(y, 2),
        ]
    if kind == "sepsis_inflammation":
        antibiotic = _p(p, "antibiotic") * sigmoid(t - 10.0)
        return [
            _p(p, "growth") * _y(y, 0) / (1.0 + _y(y, 0)) - _p(p, "kill") * _y(y, 1) * _y(y, 0) - antibiotic * _y(y, 0),
            _p(p, "immune") * _y(y, 0) - _p(p, "clear") * _y(y, 1) + _p(p, "damage_feed") * _y(y, 2),
            _p(p, "toxicity") * _y(y, 1) - _p(p, "repair") * _y(y, 2),
            _p(p, "recovery") * (1.0 - _y(y, 3)) - _p(p, "vasodilation") * _y(y, 1) * _y(y, 3),
        ]
    if kind == "resistance_competition":
        total = _y(y, 0) + _y(y, 1)
        dose = _p(p, "dose") * periodic_pulse(t, 12.0, 1.5)
        return [
            _p(p, "growth_s") * _y(y, 0) * (1.0 - total / _p(p, "k")) - _p(p, "kill") * _y(y, 2) * _y(y, 0) - _p(p, "mutation") * _y(y, 0),
            _p(p, "growth_r") * _y(y, 1) * (1.0 - total / _p(p, "k")) + _p(p, "mutation") * _y(y, 0) - _p(p, "cost") * _y(y, 1) - _p(p, "resistant_kill") * _y(y, 2) * _y(y, 1),
            dose - _p(p, "clear") * _y(y, 2),
        ]
    if kind == "cancer_resistance":
        total = _y(y, 0) + _y(y, 1)
        dose = _p(p, "dose") * periodic_pulse(t, 21.0, 3.0)
        return [
            _p(p, "growth_s") * _y(y, 0) * (1.0 - total / _p(p, "k")) - _p(p, "kill") * _y(y, 2) * _y(y, 0) - _p(p, "mutation") * _y(y, 0),
            _p(p, "growth_r") * _y(y, 1) * (1.0 - total / _p(p, "k")) + _p(p, "mutation") * _y(y, 0) - _p(p, "cost") * _y(y, 1),
            dose - _p(p, "clear") * _y(y, 2),
        ]
    if kind == "alzheimer_cascade":
        toxic = max(_y(y, 0) + _y(y, 1), 0.0)
        return [
            _p(p, "prod") - _p(p, "clear_a") * _y(y, 0) - _p(p, "micro_clear") * _y(y, 3) * _y(y, 0),
            _p(p, "tau_seed") * _y(y, 0) - _p(p, "clear_t") * _y(y, 1),
            -_p(p, "neurotox") * toxic * _y(y, 2) + _p(p, "repair") * (1.0 - _y(y, 2)),
            _p(p, "activation") * toxic - _p(p, "resolution") * _y(y, 3),
        ]
    if kind == "parkinson_dopamine":
        return [
            -_p(p, "stress") * _y(y, 0) + _p(p, "rescue") * (1.0 - _y(y, 0)),
            _p(p, "synth") * _y(y, 0) - _p(p, "clear") * _y(y, 1),
            _p(p, "burden_gain") * max(_p(p, "threshold") - _y(y, 1), 0.0) - _p(p, "adapt") * _y(y, 2),
        ]
    if kind == "seizure_ei":
        drive_e = _p(p, "g_ee") * _y(y, 0) - _p(p, "g_ei") * _y(y, 1) - _y(y, 2) + _p(p, "stim")
        drive_i = _p(p, "g_ie") * _y(y, 0) - _p(p, "g_ii") * _y(y, 1)
        return [
            (-_y(y, 0) + sigmoid(drive_e)) / _p(p, "tau_e"),
            (-_y(y, 1) + sigmoid(drive_i)) / _p(p, "tau_i"),
            _p(p, "recruit") * _y(y, 0) - _p(p, "decay") * _y(y, 2),
        ]
    if kind == "migraine_csd":
        stim = _p(p, "stim") + pulse(t, 18.0, 2.0, 0.15)
        return [
            stim + _p(p, "k_gain") * _y(y, 1) - _p(p, "inhibition") * _y(y, 2) * _y(y, 0) - _p(p, "decay") * _y(y, 0),
            _p(p, "release") * _y(y, 0) - _p(p, "clear_k") * _y(y, 1),
            _p(p, "restore") * (1.0 - _y(y, 2)) - _p(p, "fatigue") * _y(y, 0) * _y(y, 2),
        ]
    if kind == "pain_sensitization":
        treatment = _p(p, "treatment") * periodic_pulse(t, 24.0, 2.0)
        return [
            _p(p, "injury") - _p(p, "analgesia") * _y(y, 2) * _y(y, 0) - _p(p, "clear_n") * _y(y, 0),
            _p(p, "plasticity") * _y(y, 0) * (1.0 - _y(y, 1)) - _p(p, "desensitize") * _y(y, 2) * _y(y, 1) - _p(p, "decay_s") * _y(y, 1),
            treatment - _p(p, "clear_a") * _y(y, 2),
        ]
    if kind == "beta_cell_diabetes":
        glucose = _y(y, 0)
        meal = 35.0 * periodic_pulse(t, 8.0, 0.7)
        hyper = max(glucose - 100.0, 0.0)
        tox = max(glucose - 120.0, 0.0)
        return [
            meal + _p(p, "hepatic") - _p(p, "uptake") * _y(y, 1) * glucose - _p(p, "basal_clear") * (glucose - 90.0),
            (_p(p, "secretion") * _y(y, 2) * max(glucose - 90.0, 0.0)) / (_p(p, "km") + glucose + 1e-9) - _p(p, "clear_i") * _y(y, 1),
            _p(p, "compensation") * hyper * _y(y, 2) - _p(p, "glucotoxicity") * tox * _y(y, 2) - _p(p, "turnover") * (_y(y, 2) - 1.0),
        ]
    if kind == "hypertension_raas":
        signal = sigmoid((_p(p, "setpoint") - _y(y, 0)) / _p(p, "width"))
        return [
            _p(p, "salt") + _p(p, "raas_gain") * _y(y, 1) - _p(p, "natriuresis") * _y(y, 2) * _y(y, 0) - _p(p, "relax") * (_y(y, 0) - _p(p, "baseline")),
            signal - _p(p, "block") * _y(y, 1),
            _p(p, "pressure_gain") * max(_y(y, 0) - _p(p, "baseline"), 0.0) - _p(p, "clear_n") * _y(y, 2),
        ]
    if kind == "asthma_inflammation":
        allergen = _p(p, "allergen") + periodic_pulse(t, 18.0, 2.0, 0.15)
        dose = _p(p, "dose") * periodic_pulse(t, 12.0, 1.0)
        return [
            allergen + _p(p, "eos_gain") * _y(y, 1) - _p(p, "steroid") * _y(y, 2) * _y(y, 0) - _p(p, "clear_i") * _y(y, 0),
            _p(p, "bronch") * _y(y, 0) - _p(p, "bronchodilator") * _y(y, 2) * _y(y, 1) - _p(p, "relax") * _y(y, 1),
            dose - _p(p, "clear_m") * _y(y, 2),
        ]
    if kind == "expectation_adherence":
        positive = max(_y(y, 0), 0.0)
        negative = max(-_y(y, 0), 0.0)
        return [
            _p(p, "reinforcement") * (_p(p, "baseline") - _y(y, 1)) - _p(p, "decay") * (_y(y, 0) - _p(p, "neutral")),
            _p(p, "stress") - _p(p, "placebo") * positive * _y(y, 1) + _p(p, "nocebo") * negative - _p(p, "treatment") * _y(y, 2) * _y(y, 1),
            _p(p, "trust") * sigmoid(_y(y, 0)) * (1.0 - _y(y, 2)) - _p(p, "burden") * _y(y, 1) * _y(y, 2),
        ]
    if kind == "closed_loop_care":
        signal = sigmoid((_y(y, 0) - _p(p, "target")) / _p(p, "width"))
        return [
            _p(p, "stress") + _y(y, 2) - _p(p, "efficacy") * _y(y, 1) * _y(y, 3) * _y(y, 0) - _p(p, "recovery") * _y(y, 0),
            _p(p, "controller") * signal * (1.0 - _y(y, 1)) - _p(p, "fatigue") * _y(y, 1),
            _p(p, "friction") * _y(y, 1) - _p(p, "support") * _y(y, 3) * _y(y, 2) - _p(p, "decay") * _y(y, 2),
            _p(p, "success") * max(_p(p, "target") - _y(y, 0), 0.0) - _p(p, "overload") * _y(y, 1) * _y(y, 3) + 0.02 * (1.0 - _y(y, 3)),
        ]

    raise ValueError(f"Unhandled model preset: {kind}")


def rk4_step(model_id: int, t: float, y: State, dt: float, params: Params | None = None) -> list[float]:
    """Advance one RK4 integration step."""

    k1 = rhs(model_id, t, y, params)
    y2 = [_y(y, i) + 0.5 * dt * k1[i] for i in range(len(k1))]
    k2 = rhs(model_id, t + 0.5 * dt, y2, params)
    y3 = [_y(y, i) + 0.5 * dt * k2[i] for i in range(len(k2))]
    k3 = rhs(model_id, t + 0.5 * dt, y3, params)
    y4 = [_y(y, i) + dt * k3[i] for i in range(len(k3))]
    k4 = rhs(model_id, t + dt, y4, params)
    return [_y(y, i) + (dt / 6.0) * (k1[i] + 2.0 * k2[i] + 2.0 * k3[i] + k4[i]) for i in range(len(k1))]


def simulate_rk4(
    model_id: int,
    t_end: float = 60.0,
    dt: float = 0.25,
    y0: State | None = None,
    params: Params | None = None,
) -> list[tuple[float, tuple[float, ...]]]:
    """Simulate one model with RK4.

    Returns a list of ``(t, state)`` tuples.
    """

    if dt <= 0:
        raise ValueError("dt must be positive")

    t = 0.0
    state = tuple(float(value) for value in (y0 if y0 is not None else initial_state(model_id)))
    out: list[tuple[float, tuple[float, ...]]] = []
    while t <= t_end + 1e-12:
        out.append((t, state))
        state = tuple(rk4_step(model_id, t, state, dt, params))
        t += dt
    return out


def _make_alias(model_id: int) -> Callable[[float, State, Params | None], list[float]]:
    def _model_rhs(t: float, y: State, params: Params | None = None) -> list[float]:
        return rhs(model_id, t, y, params)

    _model_rhs.__name__ = f"ode_{model_id:03d}"
    _model_rhs.__doc__ = f"dy/dt for model {model_id}: {MODELS[model_id].name}."
    return _model_rhs


for _model_id in MODELS:
    globals()[f"ode_{_model_id:03d}"] = _make_alias(_model_id)


__all__ = [
    "ModelSpec",
    "MODELS",
    "formula_for",
    "initial_state",
    "periodic_pulse",
    "pulse",
    "rhs",
    "rk4_step",
    "sigmoid",
    "simulate_rk4",
    "training_load",
    *[f"ode_{model_id:03d}" for model_id in MODELS],
]
