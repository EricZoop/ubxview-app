

# read a .xml file
# look for             
#  <MaxRange>1723.8066335</MaxRange> <!-- units [m] --> this sets outer_radius_cm
# <MinRange>74.9481145</MinRange>  this is inner_radius_cm



import numpy as np
from stl import mesh
import math


def generate_radar_box_frustum(
        filename="radar_box_frustum.stl",
        outer_radius_cm=50,       # MaxRange
        inner_radius_cm=10,       # MinRange
        max_altitude_cm=30,       # Flat ceiling height (absolute, from radar origin)
        horizontal_fov_deg=100,    # Total horizontal sweep angle
        vertical_fov_deg=60,      # Upward sweep from horizon (0° = horizon)
        n_x=32,                   # Horizontal grid resolution
        n_y=512                    # Vertical grid resolution
        ):
    """
    Generates a radar frustum STL that matches the diagram:

      - Bottom face  : flat at y = 0 (the horizon — cone never dips below ground)
      - Top face     : flat at y = max_altitude (ceiling clamp)
      - Left / Right : flat side walls at the horizontal FOV limits
      - Near face    : spherical inner cap at MinRange (blind-zone offset)
      - Far face     : spherical outer cap at MaxRange (clipped by ceiling)

    Vertical FOV sweeps UPWARD ONLY (0° = horizon → +vertical_fov_deg).
    """

    R_out = outer_radius_cm * 10.0   # mm
    R_in  = inner_radius_cm  * 10.0  # mm
    Y_max = max_altitude_cm  * 10.0  # mm  (ceiling)

    # Horizontal: symmetric about the boresight
    u_max = math.tan(math.radians(horizontal_fov_deg / 2.0))

    # Vertical: from horizon (v = 0) upward to vertical_fov_deg
    v_min = 0.0  # horizon — bottom edge never goes below y = 0
    v_max = math.tan(math.radians(vertical_fov_deg))

    u_vals = np.linspace(-u_max, u_max, n_x + 1)
    v_vals = np.linspace( v_min,  v_max, n_y + 1)   # <── upward only

    # ── Build grid of 3-D points for the outer and inner shells ────────────
    P_out = []
    P_in  = []

    for u in u_vals:
        row_out, row_in = [], []
        for v in v_vals:
            length = math.sqrt(u**2 + v**2 + 1.0)
            nx_ = u / length
            ny_ = v / length   # ≥ 0 everywhere (horizon → upward)
            nz_ = 1.0 / length

            # Ceiling clamp (applies only when the ray is angled upward)
            if ny_ > 1e-9:
                r_ceil = Y_max / ny_
                r_out_eff = min(R_out, r_ceil)
                r_in_eff  = min(R_in,  r_ceil)
            else:
                # Perfectly horizontal ray — no altitude clamp needed
                r_out_eff = R_out
                r_in_eff  = R_in

            row_out.append(np.array([r_out_eff * nx_, r_out_eff * ny_, r_out_eff * nz_]))
            row_in .append(np.array([r_in_eff  * nx_, r_in_eff  * ny_, r_in_eff  * nz_]))

        P_out.append(row_out)
        P_in .append(row_in)

    tris = []

    # ── 1. Outer face (far spherical/altitude-clipped surface) ─────────────
    for i in range(n_x):
        for j in range(n_y):
            A, B = P_out[i][j],   P_out[i+1][j]
            C, D = P_out[i+1][j+1], P_out[i][j+1]
            tris += [[A, B, C], [A, C, D]]

    # ── 2. Inner face (near spherical surface — normals toward origin) ──────
    for i in range(n_x):
        for j in range(n_y):
            A, B = P_in[i][j],   P_in[i+1][j]
            C, D = P_in[i+1][j+1], P_in[i][j+1]
            tris += [[A, C, B], [A, D, C]]   # reversed winding

    # ── 3. Left side wall  (i = 0) ─────────────────────────────────────────
    for j in range(n_y):
        A, B = P_out[0][j],   P_out[0][j+1]
        C, D = P_in [0][j+1], P_in [0][j]
        tris += [[A, B, C], [A, C, D]]

    # ── 4. Right side wall (i = n_x) ───────────────────────────────────────
    for j in range(n_y):
        A, B = P_out[-1][j],   P_out[-1][j+1]
        C, D = P_in [-1][j+1], P_in [-1][j]
        tris += [[A, C, B], [A, D, C]]       # reversed winding

    # ── 5. Bottom face — flat at y = 0 (the horizon) ───────────────────────
    #    j = 0 row has ny = 0 for all points, so every point sits at y = 0.
    for i in range(n_x):
        A, B = P_out[i][0],   P_out[i+1][0]
        C, D = P_in [i+1][0], P_in [i][0]
        tris += [[A, C, B], [A, D, C]]

    # ── 6. Top face — flat at y = max_altitude (ceiling) ───────────────────
    #    j = n_y row; points are already clamped to Y_max where needed.
    for i in range(n_x):
        A, B = P_out[i][-1],   P_out[i+1][-1]
        C, D = P_in [i+1][-1], P_in [i][-1]
        tris += [[A, B, C], [A, C, D]]

    # ── Build and save mesh ─────────────────────────────────────────────────
    tris = np.array(tris)
    m = mesh.Mesh(np.zeros(len(tris), dtype=mesh.Mesh.dtype))
    for k, tri in enumerate(tris):
        m.vectors[k] = tri

    m.save(filename)
    print(f"Saved:          {filename}")
    print(f"Horizontal FOV: {horizontal_fov_deg}°  (±{horizontal_fov_deg/2}° about boresight)")
    print(f"Vertical FOV:   0° (horizon) → {vertical_fov_deg}° (upward)")
    print(f"Outer Radius:   {outer_radius_cm} cm  (MaxRange)")
    print(f"Inner Radius:   {inner_radius_cm} cm  (MinRange blind zone)")
    print(f"Max Altitude:   {max_altitude_cm} cm  (ceiling clamp)")
    print(f"Triangles:      {len(tris)}")


generate_radar_box_frustum()