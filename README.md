# ODE World Library

Interactive GitHub Pages app for 120 ODE model ideas across ovarian reserve,
hormones, health, startups, AI platforms, finance, physics, society, and
research-backed mental/medical health dynamics.

The project is intentionally static:

- `index.html` is the GitHub Pages entry point.
- `styles.css` contains the full visual system and responsive layout.
- `script.js` contains the 120-model catalog, canvas graphs, filters, evidence tags, and RK4-style browser simulation.
- `ode_formulas.py` contains executable Python formulas for all 120 ODEs.
- `docs/research_notes.md` maps the new mental/medical models to papers and source families.
- `.github/workflows/pages.yml` deploys the static app with GitHub Pages Actions.

## Run Locally

Open `index.html` in a browser, or run a tiny static server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Python Formula Library

Every model is available through the shared dispatcher:

```python
import ode_formulas as ode

print(ode.formula_for(1))
dy = ode.rhs(1, t=0.0, y=ode.initial_state(1))
trajectory = ode.simulate_rk4(1, t_end=60, dt=0.25)
```

The module also creates direct aliases:

```python
from ode_formulas import ode_001, ode_082

reserve_derivative = ode_001(0.0, [1.0])
sir_derivative = ode_082(0.0, [0.96, 0.04, 0.0])
```

## Verify

```bash
python3 -B -c "import py_compile; py_compile.compile('ode_formulas.py', cfile='/tmp/ode_formulas.pyc', doraise=True)"
node --check script.js
PYTHONDONTWRITEBYTECODE=1 python3 -B tests/test_ode_formulas.py
```

## Research Expansion

Models 91-120 add a mental and medical health tranche covering HPA-axis
stress physiology, rumination loops, fear extinction, addiction learning,
bipolar oscillation, digital relapse observers, tumor-immune dynamics,
within-host HIV dynamics, sepsis inflammation, neurodegeneration, chronic
pain sensitization, metabolic compensation, and closed-loop care.

See [`docs/research_notes.md`](docs/research_notes.md) for the paper map.

## Deploy to GitHub Pages

1. Push this directory to a GitHub repository.
2. In GitHub, open `Settings -> Pages`.
3. Set Source to `GitHub Actions`.
4. Push to `main` or run the `Deploy ODE World Library to GitHub Pages` workflow.

## Scope

These equations are educational model skeletons. Medical and financial models
are not diagnostic, therapeutic, investment, or decision advice. The
mental/medical entries are not calibrated to patient data and should be treated
as hypothesis scaffolds only.
