from math import isfinite
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import ode_formulas as ode


def test_all_models_have_executable_rhs() -> None:
    assert len(ode.MODELS) >= 120
    assert sorted(ode.MODELS) == list(range(1, len(ode.MODELS) + 1))
    for model_id, spec in ode.MODELS.items():
        dy = ode.rhs(model_id, 0.0, spec.initial)
        assert len(dy) == len(spec.initial), model_id
        assert all(isfinite(value) for value in dy), model_id
        assert hasattr(ode, f"ode_{model_id:03d}"), model_id


def test_all_models_integrate_short_horizon() -> None:
    for model_id in ode.MODELS:
        trajectory = ode.simulate_rk4(model_id, t_end=1.0, dt=0.25)
        assert len(trajectory) == 5, model_id
        assert all(isfinite(value) for _, state in trajectory for value in state), model_id


if __name__ == "__main__":
    test_all_models_have_executable_rhs()
    test_all_models_integrate_short_horizon()
    print("ok", len(ode.MODELS))
