# Setup

## :a: LMS Assignment ID = 51

```
https://${LMS_URL}/mod/assign/view.php?id=51
```

```json
{
  "id": 45,                // Assignment ID
  "cmid": 51,              // Rubric Definition CMID
  "name": "0.PlanDeCours". // Assignment name
}
```

## :b: Rubric Definition for

- [ ] cmids[0]=51

- [ ] Retrieve all rubric definitions from LMS

```bash
curl -X POST "https://${LMS_URL}/webservice/rest/server.php" \
-d "wstoken=${API_SYNC_TOKEN}" \
-d "wsfunction=core_grading_get_definitions" \
-d "moodlewsrestformat=json" \
-d "cmids[0]=51" \
-d "areaname=submissions" | jq .
```
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2397    0  2261  100   136   3849    231 --:--:-- --:--:-- --:--:--  4076
```
<details><summary>📑</summary>

```json
100  1048    0   911  100   137   1610    242 --:--:-- --:--:-- --:--:--  1851
{
  "areas": [
    {
      "cmid": 51,
      "contextid": 619,
      "component": "mod_assign",
      "areaname": "submissions",
      "activemethod": "rubric",
      "definitions": [
        {
          "id": 44,
          "method": "rubric",
          "name": "Participation",
          "description": "Plan De Cours",
          "descriptionformat": 1,
          "status": 20,
          "copiedfromid": null,
          "timecreated": 1790435684,
          "usercreated": 2,
          "timemodified": 1790435684,
          "usermodified": 2,
          "timecopied": 0,
          "rubric": {
            "rubric_criteria": [
              {
                "id": 211,
                "sortorder": 1,
                "description": "README.md",
                "descriptionformat": 1,
                "levels": [
                  {
                    "id": 502,
                    "score": 0,
                    "definition": "❌",
                    "definitionformat": 1
                  },
                  {
                    "id": 503,
                    "score": 1,
                    "definition": "🥈",
                    "definitionformat": 1
                  },
                  {
                    "id": 504,
                    "score": 2,
                    "definition": "🥇",
                    "definitionformat": 1
                  }
                ]
              },
              {
                "id": 212,
                "sortorder": 2,
                "description": "images",
                "descriptionformat": 1,
                "levels": [
                  {
                    "id": 505,
                    "score": 0,
                    "definition": "❌",
                    "definitionformat": 1
                  },
                  {
                    "id": 506,
                    "score": 1,
                    "definition": "✔️",
                    "definitionformat": 1
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  ],
  "warnings": []
}
```

</details>