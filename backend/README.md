# Backend configuration

## Password reset email

The forgot-password endpoint sends a single-use reset link through SMTP. Configure
these environment variables in the backend deployment (Vercel Project Settings →
Environment Variables) and redeploy:

- `SMTP_HOST`
- `SMTP_PORT` (`587` for STARTTLS, or `465` for implicit TLS)
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM` (optional; defaults to `SMTP_USER`)
- `FRONTEND_URL` (for example, `https://shopnex-frontend.vercel.app`)

For Gmail, use an App Password for `SMTP_PASSWORD`, not the account password.
Keep mail credentials in deployment environment settings; do not commit them.
See [.env.example](./.env.example) for the variable names and example values.

Reset links expire after 15 minutes and can only be used once. If SMTP is missing
or email delivery fails, the endpoint responds with an error instead of reporting
that a reset email was sent.
