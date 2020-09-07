# Counterbalancing Not Needed

## Pavlovia in SONA

---

1. Set experiment URL for SONA:

```markdown
https://run.pavlovia.org/pavloviausername/projectname/html?participant=%SURVEY_CODE%
```

2. After adding the study, copy the client-side completion URL from SONA:

```markdown
https://pennstate.sona-systems.com/webstudy_credit.aspx?experiment_id=123&credit_token=abcd&survey_code=XXXX
```

On Builder:

3. Modify and add the following string to PsychoPy Builder → Settings → Online → Completed URL

```markdown
$"https://pennstate.sona-systems.com/webstudy_credit.aspx?experiment_id=123&credit_token=abcd&survey_code=" + expInfo['participant']
```

On GitLab:

3. Add a line here:

```jsx
function updateInfo() {
	...
	psychoJS.setRedirectUrls(('https://pennstate.sona-systems.com/webstudy_credit.aspx?experiment_id=123&credit_token=abcd&survey_code=' + expInfo['participant']), '');
	...
}
```

---

References

- SONA: [https://www.sona-systems.com/help/psychopy.aspx](https://www.sona-systems.com/help/psychopy.aspx)