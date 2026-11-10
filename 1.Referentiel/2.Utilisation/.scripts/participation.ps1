#!/usr/bin/env pwsh

$ErrorActionPreference = "Stop"

# Importer la liste des étudiants
. ../../.scripts/students.ps1

# Importer les fonctions
. ../../.scripts/functions.ps1
. ../../.scripts/commons.ps1

<<<<<<< HEAD
<<<<<<< HEAD
Write-ParticipationHeader
Write-PresenceHeader
=======
=======
>>>>>>> 6ff357d1a3ff31982ef9225f7553e1c52c0b8cb9
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
<<<<<<< HEAD
>>>>>>> 4f9e901c8b8a148b2039c506a159f23ca6c13da2
=======
>>>>>>> 6ff357d1a3ff31982ef9225f7553e1c52c0b8cb9

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
<<<<<<< HEAD
<<<<<<< HEAD
        ":heavy_check_mark:"
=======
        ":tada:"
        $s++
>>>>>>> 4f9e901c8b8a148b2039c506a159f23ca6c13da2
=======
        ":tada:"
        $s++
>>>>>>> 6ff357d1a3ff31982ef9225f7553e1c52c0b8cb9
    }
    else {
        ":x:"
    }

<<<<<<< HEAD
<<<<<<< HEAD

    $row = "| $($i + 1) | $url | $repoUrl | $status |"
=======
    $row = "| $($i + 1) | [$StudentID]($repoUrl) :point_right: $GitHubLink $url | $status |"
>>>>>>> 4f9e901c8b8a148b2039c506a159f23ca6c13da2
=======
    $row = "| $($i + 1) | [$StudentID]($repoUrl) :point_right: $GitHubLink $url | $status |"
>>>>>>> 6ff357d1a3ff31982ef9225f7553e1c52c0b8cb9
    Write-Host $row

    $i++
}

Write-Summary `
    -SuccessCount $s `
    -TotalCount $i
