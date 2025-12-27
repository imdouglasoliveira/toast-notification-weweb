# Toast Notification Component for WeWeb

[![WeWeb](https://img.shields.io/badge/WeWeb-Component-blue)](https://www.weweb.io/)
[![Vue 3](https://img.shields.io/badge/Vue-3-green)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

**[English]** | [Portugues](README.pt-BR.md)

A reusable WeWeb component for displaying customizable toast notifications with support for 4 types (success, info, warning, error), configurable auto-dismiss, and seamless Workflow integration.

![Toast Notification Examples](docs/img/toast_examples.png)

## Why This Component?

Every app needs feedback: *success*, *error*, *warning*, *info*... and developers usually end up rebuilding toast notifications from scratch on every project.

**Import once, reuse everywhere.**

- Import the coded component into your project a single time
- Configure it on one page
- On other pages, just use **"Create an instance"** and wire it to your workflows
- Each workflow only sends the **title, description and durationMs** when calling the component action

This keeps UX consistent across the whole app while still letting each page decide *what* to say.

## Features

- 4 toast types: success, info, warning, error
- Configurable auto-dismiss (default: 5000ms, max: 30s)
- Flexible positioning (4 desktop positions)
- **Mobile responsive** (centered at top, 90% width)
- Automatic queue with toast limit
- Payload validation with error events
- Conditional rendering (optional description)
- Smooth animations adapted per device
- Full WeWeb Workflow integration

**Configurable from the editor:**

- Default duration (ms)
- Position (top/bottom, left/right)
- Max number of toasts on screen
- Language + timestamp visibility
- Icon sizes
- Colors for each toast type (success, error, warning, info)

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run serve --port=8080
```

Then, in WeWeb Editor:
1. Go to **Dev** > **Add local Element**
2. Name: `toast-notification`, Port: `8080`
3. Accept the SSL certificate

### Production Usage

1. Publish this repo on GitHub
2. In WeWeb Dashboard: add as **Source Code**
3. In WeWeb Editor: drag the component to your page
4. Use **Execute Component Action** in Workflows

## Configuration

All properties are configurable directly from the WeWeb editor:

![Toast Configuration Options](docs/img/toast_options.png)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Default Duration | Number | 5000 | Duration in milliseconds |
| Position | Select | Bottom Left | Toast position on screen |
| Max Toasts | Number | 5 | Maximum toasts visible at once |
| Language | Select | English | Language for timestamps |
| Show Timestamp | Toggle | On | Display time on toasts |
| Main Icon Size | Number | 20 | Size of the toast icon |
| Close Icon Size | Number | 16 | Size of the close button |
| Success Colors | Color | Green tones | Background, border, text, icon |
| Error Colors | Color | Red tones | Background, border, text, icon |
| Warning Colors | Color | Yellow tones | Background, border, text, icon |
| Info Colors | Color | Blue tones | Background, border, text, icon |

## Workflow Integration

Use **Execute Component Action** to trigger toasts from any workflow:

![Workflow Configuration](docs/img/toast_configuration.png)

### Payload API

#### Required Fields

| Field | Type | Values |
|-------|------|--------|
| `type` | String | `"success"`, `"info"`, `"warning"`, `"error"` |
| `title` | String | Any string |

#### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | String | Additional text (not rendered if omitted) |
| `durationMs` | Number | Custom duration in ms |

### Example Payload

```json
{
  "type": "success",
  "title": "Saved successfully",
  "description": "Your changes have been saved.",
  "durationMs": 5000
}
```

## Visual Examples

### All Toast Types

![All Toast Types](docs/img/toast_examples.png)

### Top Right Position

![Top Right Position](docs/img/toast_examples_rigth_top.png)

## Project Structure

```
toast_notification_vue/
├── src/
│   ├── wwElement.vue              # Main host component
│   └── components/
│       └── ToastItem.vue          # Individual toast item
├── docs/
│   └── img/                       # Documentation images
├── ww-config.js                   # WeWeb configuration
├── package.json                   # Dependencies and scripts
├── README.md                      # This file (English)
└── README.pt-BR.md                # Portuguese version
```

## Available Scripts

```bash
npm run serve          # Dev server (default port: 8080)
npm run build          # Production build
```

## Contributing

1. Fork the project
2. Create a branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

MIT

## Useful Links

- [WeWeb Developer Docs](https://developer.weweb.io/)
- [WeWeb Component Documentation](https://docs.weweb.io/components/)
- [Execute Component Actions](https://docs.weweb.io/workflows/actions/execute-component-action.html)

---

**Developed for WeWeb** | Reusable Vue 3 Component | Made in Brazil
