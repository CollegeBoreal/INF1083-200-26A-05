#!/usr/bin/env pwsh
# --------------------------------------
# Dynamic Participation Generator
# --------------------------------------

# Load students + compute groups
. ../.scripts/students.ps1

    
$outfile = ".scripts/Participation.md"
    
pwsh .scripts/participation.ps1 > $outfile 2>$null
