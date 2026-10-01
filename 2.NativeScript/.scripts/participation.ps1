#!/usr/bin/env pwsh
# --------------------------------------
# Dynamic participation script
# --------------------------------------

# Pass parameter to students.ps1
. ../.scripts/students.ps1

# --------------------------------------
# LOAD CURRENT GROUP
# --------------------------------------

# Importer les fonctions
. ../.scripts/functions.ps1
. ../.scripts/commons.ps1

# Importer les fonctions du lab
. .scripts/functions.ps1

# --------------------------------------
# FEEDBACK
# --------------------------------------

$FeedbackLookup = Get-FeedbackLookup -Students $Students

Write-ParticipationHeader
Write-LabHeader -FeedbackLookup $FeedbackLookup

$s = 0

foreach ($entry in $STUDENTS) {
    $parts = $entry -split '\|'
    $StudentID = $parts[0]
    $GitHubID  = $parts[1]
    $AvatarID  = $parts[2]

    $paths  = Get-StudentPaths -StudentID $StudentID
    $checks = Get-StudentChecks -Paths $paths
    $url    = Get-GitHubAvatarLink -GitHubID $GitHubID -AvatarID $AvatarID

    Write-LabStudentRow `
        -Index ($i + 1) `
        -StudentID $StudentID `
        -GitHubLink $url `
        -ReadmePath $Paths.README `
        -Checks $Checks `
        -FeedbackLookup $FeedbackLookup

    if (Test-AllRequiredFilesPresent -Checks $checks) {
        $s++
    }

}

Write-Summary -SuccessCount $s -TotalCount $i
