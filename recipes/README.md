# Sample Recipes

This directory contains starter recipes you can load into the hosted recipe store via `/api/recipes`.

## Browser Research Example

File: `recipes/browser-research-example.json`

What it does:

1. Creates a Playwright browser session.
2. Navigates to `$input.url`.
3. Extracts body text.
4. Captures a screenshot (base64 in output).
5. Closes the browser session.

### Load Recipe (PowerShell)

```powershell
$base = "http://127.0.0.1:1310"
$headers = @{ "x-api-key" = "<YOUR_HOSTED_API_KEY>" }
$recipe = Get-Content ".\recipes\browser-research-example.json" -Raw | ConvertFrom-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "$base/api/recipes" `
  -Headers $headers `
  -ContentType "application/json" `
  -Body (@{
    format = "json"
    recipe = $recipe
  } | ConvertTo-Json -Depth 20)
```

### Run Recipe (PowerShell)

```powershell
$base = "http://127.0.0.1:1310"
$headers = @{ "x-api-key" = "<YOUR_HOSTED_API_KEY>" }

Invoke-RestMethod `
  -Method Post `
  -Uri "$base/api/recipes/browser-research-example/run" `
  -Headers $headers `
  -ContentType "application/json" `
  -Body (@{
    input = @{
      url = "https://example.com"
    }
  } | ConvertTo-Json -Depth 20)
```

## Browser Form Workflow Example

File: `recipes/browser-form-workflow-example.json`

What it does:

1. Creates a Playwright browser session.
2. Opens `$input.url`.
3. Waits for common username/email + password selectors.
4. Types `$input.username` and `$input.password`.
5. Clicks submit.
6. Waits for page visibility, extracts body text, captures screenshot, and closes session.

### Load Recipe (PowerShell)

```powershell
$base = "http://127.0.0.1:1310"
$headers = @{ "x-api-key" = "<YOUR_HOSTED_API_KEY>" }
$recipe = Get-Content ".\recipes\browser-form-workflow-example.json" -Raw | ConvertFrom-Json

Invoke-RestMethod `
  -Method Post `
  -Uri "$base/api/recipes" `
  -Headers $headers `
  -ContentType "application/json" `
  -Body (@{
    format = "json"
    recipe = $recipe
  } | ConvertTo-Json -Depth 20)
```

### Run Recipe (PowerShell)

```powershell
$base = "http://127.0.0.1:1310"
$headers = @{ "x-api-key" = "<YOUR_HOSTED_API_KEY>" }

Invoke-RestMethod `
  -Method Post `
  -Uri "$base/api/recipes/browser-form-workflow-example/run" `
  -Headers $headers `
  -ContentType "application/json" `
  -Body (@{
    input = @{
      url = "https://example.com/login"
      username = "demo@example.com"
      password = "demo-password"
    }
  } | ConvertTo-Json -Depth 20)
```
