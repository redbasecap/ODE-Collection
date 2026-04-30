# ODE World Library

Interactive GitHub Pages app for 90 ODE model ideas across ovarian reserve,
hormones, health, startups, AI platforms, finance, physics, and society.

The project is intentionally static:

- `index.html` is the GitHub Pages entry point.
- `styles.css` contains the full visual system and responsive layout.
- `script.js` contains the 90-model catalog, canvas graphs, filters, and RK4-style browser simulation.
- `ode_formulas.py` contains executable Python formulas for all 90 ODEs.
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
python3 -m py_compile ode_formulas.py
node --check script.js
python3 tests/test_ode_formulas.py
```

## Deploy to GitHub Pages

1. Push this directory to a GitHub repository.
2. In GitHub, open `Settings -> Pages`.
3. Set Source to `GitHub Actions`.
4. Push to `main` or run the `Deploy ODE World Library to GitHub Pages` workflow.

## Scope

These equations are educational model skeletons. Medical and financial models
are not diagnostic, therapeutic, investment, or decision advice.
