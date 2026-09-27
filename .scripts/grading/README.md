# Setup

## :a: Class - INF1083-200-26A-05 - Introduction à l'administration des systèmes

```
https://${LMS_URL}/course/view.php?id=7
```

## :b: Assignments for:

- [ ] courseids[0]=7

- [ ] Retrieve all assignments from LMS

```bash
curl -X POST "https://${LMS_URL}/webservice/rest/server.php" \
-d "wstoken=${API_SYNC_TOKEN}" \
-d "wsfunction=mod_assign_get_assignments" \
-d "moodlewsrestformat=json" \
-d "courseids[0]=7" | jq '.courses[].assignments[] | {id, cmid, name}'
```
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1704    0  1587  100   117   2463    181 --:--:-- --:--:-- --:--:--  2645
```
<details><summary>📑</summary>

```json
{
  "id": 45,
  "cmid": 51,
  "name": "0.PlanDeCours"
}
```

</details>
