# MIPS64 Hazard Lab

Clickable teaching tool for MIPS64 RAW and control hazards.

It visualizes the instruction-pair matrix from `CE_ARCH_4_Hazards`:

- ALU -> ALU
- Load -> ALU
- ALU -> Branch
- Load -> Branch
- Taken branch

Each case can be inspected with and without forwarding, showing the pipeline timing, inserted bubbles, forwarding path, and current-stage resource usage.
