<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the pmm-portfolio React + Vite application. `posthog-js` was installed and initialized in `src/main.jsx` with exception autocapture enabled. Six custom events were added across two files to track the most business-critical visitor interactions: project engagement, social link clicks, and the primary contact conversion CTA.

| Event name | Description | File |
|---|---|---|
| `project opened` | Fired when a visitor clicks a project card to open the case study modal (includes `project_id`, `project_title`, `project_company`, `layout`) | `src/components.jsx` |
| `project closed` | Fired when a visitor closes the project modal (via backdrop click or × button) | `src/components.jsx` |
| `project link clicked` | Fired when a visitor clicks an external link inside a project modal (includes `project_id`, `project_title`, `link_label`, `link_url`) | `src/components.jsx` |
| `linkedin clicked` | Fired when a visitor clicks any LinkedIn button on the page (includes `label`, `href`) | `src/components.jsx` |
| `github clicked` | Fired when a visitor clicks any GitHub button on the page (includes `label`, `href`) | `src/components.jsx` |
| `contact reached out` | Fired when a visitor clicks the primary "Reach out →" CTA in the Contact section — top of the hiring/recruiter conversion funnel | `src/portfolio.jsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/372712/dashboard/1532838
- **Contact conversion funnel** (project opened → project link clicked → contact reached out): https://us.posthog.com/project/372712/insights/vyFz0FnT
- **Most opened projects** (which case studies attract the most attention): https://us.posthog.com/project/372712/insights/WlCqr4Ds
- **LinkedIn & GitHub clicks over time:** https://us.posthog.com/project/372712/insights/wPDlZa89
- **Contact CTA clicks over time:** https://us.posthog.com/project/372712/insights/oCCwTrFk
- **Project engagement rate** (projects opened vs. project links clicked): https://us.posthog.com/project/372712/insights/7aN3eWZd

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
