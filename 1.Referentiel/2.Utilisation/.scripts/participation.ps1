#!/usr/bin/env pwsh

$ErrorActionPreference = "Stop"

# Importer la liste des étudiants
. ../../.scripts/students.ps1

# Importer les fonctions
. ../../.scripts/functions.ps1
. ../../.scripts/commons.ps1

# Header
function Write-LabHeader {

    Write-Output ""
    Write-Output "## :a: Présence"
    Write-Output ""

    Write-Output "|:hash:| Boréal :id: | Success |"
    Write-Output "|------|-------------|---------|"
}



Write-ParticipationHeader
Write-LabHeader

$i = 0
$s = 0

foreach ($entry in $STUDENTS) {

    $parts = $entry -split '\|'

    $StudentID = $parts[0]
    $GitHubID  = $parts[1]
    $AvatarID  = $parts[2]

    $url = Get-GitHubAvatarLink `
        -GitHubID $GitHubID `
        -AvatarID $AvatarID

    # Dépôt attendu
    $repoUrl = "https://github.com/$GitHubID/MonProjet"

    try {
        $response = Invoke-WebRequest `
            -Uri $repoUrl `
            -Method Head `
            -SkipHttpErrorCheck

        $exists = ($response.StatusCode -eq 200)
    }
    catch {
        $exists = $false
    }

    $status = if ($exists) {
        ":tada:"
        $s++
    }
    else {
        ":x:"
    }

    $row = "| $($i + 1) | [$StudentID]($repoUrl) :point_right: $GitHubLink $url | $status |"
    Write-Host $row

    $i++
}

Write-Summary `
    -SuccessCount $s `
    -TotalCount $i
