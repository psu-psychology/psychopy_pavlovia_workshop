# Counterbalancing Needed

## Pavlovia in SONA

---

1. Set experiment URL for SONA:

```markdown
https://moryscarter.com/vespr/pavlovia.php?folder=pavloviausername&experiment=projectname&id=%SURVEY_CODE%
```

2. After adding the study, copy the client-side completion URL from SONA:

```markdown
https://pennstate.sona-systems.com/webstudy_credit.aspx?experiment_id=123&credit_token=abcd&survey_code=XXXX
```

On Builder:

3. Modify and add the following string to PsychoPy Builder → Settings → Online → Completed URL

```markdown
$"https://pennstate.sona-systems.com/webstudy_credit.aspx?experiment_id=123&credit_token=abcd&survey_code=" + expInfo['id']
```

4. Set the condition variable as:

```python
condition = int(expInfo['participant'])%x 
# x is the number of conditions. This will assign values 0 to x-1
```

On GitLab:

3. Add a line here:

```jsx
function updateInfo() {
	...
	psychoJS.setRedirectUrls(('https://pennstate.sona-systems.com/webstudy_credit.aspx?experiment_id=123&credit_token=abcd&survey_code=' + expInfo['id']), '');
	...
}
```

4. Set condition here:

```jsx
function experimentInit() {
	...
	var condition = Number.parseInt(expInfo['participant'])%x 
	// x is the number of conditions. This will assign values 0 to x-1
	...
}
```

---

References

- SONA: [https://www.sona-systems.com/help/psychopy.aspx](https://www.sona-systems.com/help/psychopy.aspx)
- Counterbalancing app built by Wakefield Morys-Carter: [https://moryscarter.com/vespr/pavlovia.php](https://moryscarter.com/vespr/pavlovia.php)