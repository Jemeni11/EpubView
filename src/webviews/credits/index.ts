export function getCreditsHtml(): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EpubView Credits</title>
    <style>
      :root {
        --radius: 8px;
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 20px;
        --spacing-6: 24px;
        --spacing-8: 32px;
        --spacing-10: 40px;
        --spacing-12: 48px;
        --spacing-16: 64px;
        
        /* Typography scale */
        --text-xs: 12px;
        --text-sm: 14px;
        --text-base: 16px;
        --text-lg: 18px;
        --text-xl: 20px;
        --text-2xl: 24px;
        --text-3xl: 30px;
        --text-4xl: 36px;
        
        /* Modern neutral palette that adapts to VSCode themes */
        --background: var(--vscode-editor-background);
        --foreground: var(--vscode-foreground);
        --muted: var(--vscode-descriptionForeground);
        --muted-foreground: var(--vscode-descriptionForeground);
        --border: var(--vscode-panel-border);
        --card: var(--vscode-sideBar-background);
        --card-foreground: var(--vscode-foreground);
        --accent: var(--vscode-button-background);
        --accent-foreground: var(--vscode-button-foreground);
        --secondary: var(--vscode-button-secondaryBackground);
        --secondary-foreground: var(--vscode-button-secondaryForeground);
        
        /* Shadows for depth */
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        background: var(--background);
        color: var(--foreground);
        font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        font-size: var(--text-base);
        line-height: 1.6;
        min-height: 100vh;
        overflow-x: hidden;
      }
      
      .container {
        max-width: 680px;
        margin: 0 auto;
        padding: var(--spacing-12) var(--spacing-6);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      .header {
        text-align: center;
        margin-bottom: var(--spacing-16);
        position: relative;
      }
      
      .header::after {
        content: '';
        position: absolute;
        bottom: calc(var(--spacing-8) * -1);
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
      
      .logo {
        font-size: var(--text-4xl);
        margin-bottom: var(--spacing-2);
        background: linear-gradient(135deg, var(--accent), var(--secondary));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
        letter-spacing: -0.025em;
      }
      
      .tagline {
        font-size: var(--text-lg);
        color: var(--muted-foreground);
        font-weight: 400;
        margin-bottom: var(--spacing-3);
      }
      
      .version-badge {
        display: inline-flex;
        align-items: center;
        padding: var(--spacing-1) var(--spacing-3);
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: calc(var(--radius) * 2);
        font-size: var(--text-xs);
        font-weight: 500;
        color: var(--muted-foreground);
        gap: var(--spacing-2);
      }
      
      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #10b981;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      
      .content {
        flex: 1;
        display: grid;
        gap: var(--spacing-8);
      }
      
      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: var(--spacing-6);
        box-shadow: var(--shadow-sm);
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }
      
      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--accent), transparent);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      
      .card:hover {
        border-color: var(--accent);
        box-shadow: var(--shadow-md);
        transform: translateY(-1px);
      }
      
      .card:hover::before {
        opacity: 1;
      }
      
      .card-header {
        margin-bottom: var(--spacing-5);
      }
      
      .card-title {
        font-size: var(--text-xl);
        font-weight: 600;
        color: var(--card-foreground);
        margin-bottom: var(--spacing-2);
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
      }
      
      .card-description {
        font-size: var(--text-sm);
        color: var(--muted-foreground);
        line-height: 1.5;
      }
      
      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-3);
      }
      
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        font-size: var(--text-sm);
        font-weight: 500;
        border-radius: calc(var(--radius) - 2px);
        padding: var(--spacing-2) var(--spacing-4);
        text-decoration: none;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.15s ease;
        gap: var(--spacing-2);
        position: relative;
        overflow: hidden;
      }
      
      .button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.3s ease;
      }
      
      .button:hover::before {
        left: 100%;
      }
      
      .button-primary {
        background: var(--accent);
        color: var(--accent-foreground);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .button-primary:hover {
        background: var(--vscode-button-hoverBackground);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }
      
      .button-secondary {
        background: var(--secondary);
        color: var(--secondary-foreground);
        border-color: var(--border);
      }
      
      .button-secondary:hover {
        background: var(--vscode-button-secondaryHoverBackground);
        border-color: var(--accent);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .button-ghost {
        background: transparent;
        color: var(--muted-foreground);
        border-color: var(--border);
      }
      
      .button-ghost:hover {
        background: var(--card);
        color: var(--foreground);
        border-color: var(--accent);
      }
      
      .icon {
        width: 16px;
        height: 16px;
        opacity: 0.8;
      }
      
      .footer {
        margin-top: var(--spacing-16);
        padding-top: var(--spacing-8);
        border-top: 1px solid var(--border);
        text-align: center;
      }
      
      .footer-text {
        font-size: var(--text-xs);
        color: var(--muted-foreground);
        line-height: 1.4;
      }
      
      .highlight {
        color: var(--accent);
        font-weight: 500;
      }
      
      /* Responsive design */
      @media (max-width: 640px) {
        .container {
          padding: var(--spacing-8) var(--spacing-4);
        }
        
        .logo {
          font-size: var(--text-3xl);
        }
        
        .tagline {
          font-size: var(--text-base);
        }
        
        .button-group {
          justify-content: center;
        }
        
        .button {
          flex: 1;
          min-width: 0;
        }
      }
      
      /* Dark theme enhancements */
      @media (prefers-color-scheme: dark) {
        :root {
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
          --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header class="header">
        <h1 class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128"><path fill="#bdbdbd" d="M-125.7 124.54V11.79c29.36 1.85 58.81 1.91 88.18.19 1.77-.1 3.21 1.08 3.21 2.66v107.04c0 1.58-1.44 2.94-3.21 3.05a727 727 0 0 1-88.18-.19"/><path fill="#6444d5" d="M-125.7 124.54V11.79c27.11-5.31 54.34-8.57 81.45-9.76 1.64-.07 2.96 1.15 2.96 2.73V111.8c0 1.58-1.33 2.9-2.96 2.98-27.11 1.19-54.34 4.45-81.45 9.76"/><g fill="#757575"><path d="M-92.84 42.86c-7.46 1-14.91 2.16-22.36 3.47v-3.22c7.45-1.31 14.9-2.47 22.36-3.47zm-12.76-15.72c-3.2.51-6.4 1.04-9.6 1.6v-8.47c3.2-.56 6.4-1.1 9.6-1.6zm12.17-1.78c-3.2.43-6.4.9-9.6 1.39v-8.47c3.2-.49 6.4-.95 9.6-1.39zm12.17-1.52q-4.8.54-9.6 1.17v-8.47q4.8-.63 9.6-1.17zm12.17-1.23c-3.2.29-6.4.61-9.6.95v-8.47c3.2-.35 6.4-.66 9.6-.95zm17.21 5.12a548 548 0 0 0-63.31 7.42v-.81c21.09-3.72 42.23-6.19 63.31-7.42zm-32.67 14.08c-2.21.26-4.41.54-6.62.83v-3.22c2.21-.29 4.41-.57 6.62-.83z"/><path d="M-75.06 40.77c-3.6.37-7.21.77-10.81 1.2v-3.22c3.6-.44 7.21-.84 10.81-1.2zm12.29-1.11-3.66.3v-3.22l3.66-.3z"/><path d="M-65.38 39.87c-2.47.21-4.95.43-7.42.67v-3.22c2.47-.24 4.95-.46 7.42-.67zm10.32-.76c-2.02.13-4.05.27-6.07.42v-3.22c2.02-.15 4.05-.29 6.07-.42zm-49.89 14.57c-3.42.54-6.83 1.11-10.25 1.71v-3.22c3.41-.6 6.83-1.17 10.25-1.71zm9.51-1.4c-2.63.37-5.26.75-7.89 1.16v-3.22c2.63-.41 5.26-.79 7.89-1.16z"/><path d="M-84.55 50.87c-3.95.47-7.89.98-11.84 1.54v-3.22c3.95-.56 7.89-1.07 11.84-1.54z"/><path d="M-75.06 49.82c-3.6.37-7.21.77-10.81 1.2V47.8c3.6-.44 7.21-.84 10.81-1.2zm12.29-1.1-3.66.3V45.8l3.66-.3z"/><path d="M-61.13 48.59c-3.89.29-7.78.63-11.67 1.01v-3.22c3.89-.38 7.78-.71 11.67-1.01z"/><path d="M-51.89 47.97c-3.08.18-6.16.39-9.25.62v-3.22c3.08-.23 6.17-.44 9.25-.62zm-49.5 14.22q-6.9 1.035-13.8 2.25v-3.22q6.9-1.215 13.8-2.25z"/><path d="M-95.44 61.33c-2.63.37-5.26.75-7.89 1.16v-3.22c2.63-.41 5.26-.79 7.89-1.16zm10.89-1.4c-2.76.33-5.53.68-8.29 1.05v-3.22c2.76-.37 5.53-.72 8.29-1.05z"/><path d="M-78.26 59.21c-2.54.27-5.07.56-7.61.87v-3.22c2.54-.31 5.07-.6 7.61-.87zm26.37 24.99q-12.075.705-24.18 1.95V55.76q12.09-1.245 24.18-1.95zm-38.55-14.48c-8.25 1.07-16.51 2.34-24.75 3.79v-3.22c8.24-1.45 16.5-2.72 24.75-3.79z"/><path d="M-95.44 70.39c-1.31.18-2.63.37-3.94.56v-3.22c1.31-.19 2.63-.38 3.94-.56zm10.89-1.41c-2.21.26-4.41.54-6.62.83v-3.22c2.21-.29 4.41-.57 6.62-.83z"/><path d="M-78.32 68.28c-2.51.27-5.03.56-7.54.86v-3.22c2.51-.31 5.03-.59 7.54-.86zm-23.07 12.03q-6.9 1.035-13.8 2.25v-3.22q6.9-1.215 13.8-2.25z"/><path d="M-98.16 79.83c-1.72.25-3.44.51-5.17.77v-3.22c1.72-.27 3.44-.52 5.17-.77zm13.61-1.79q-5.445.645-10.89 1.41v-3.22c3.63-.51 7.26-.97 10.89-1.41z"/><path d="M-80.46 77.57c-1.8.2-3.6.41-5.41.63v-3.22c1.8-.22 3.6-.43 5.41-.63zm-16.95 11.21c-5.93.85-11.86 1.79-17.79 2.84V88.4c5.92-1.04 11.85-1.99 17.79-2.84z"/><path d="M-92.54 88.1c-2.28.31-4.56.62-6.84.96v-3.22q3.42-.495 6.84-.96zm7.99-1.01c-1.75.21-3.5.43-5.25.65v-3.22c1.75-.23 3.5-.44 5.25-.65z"/><path d="M-78.32 86.39c-2.51.27-5.03.56-7.54.86v-3.22c2.51-.31 5.03-.59 7.54-.86zm-23.07 12.03q-6.9 1.035-13.8 2.25v-3.22q6.9-1.215 13.8-2.25zm14.22-1.95q-6.105.75-12.21 1.65V94.9q6.105-.9 12.21-1.65z"/><path d="M-84.55 96.15c-2.21.26-4.41.54-6.62.83v-3.22c2.21-.29 4.41-.57 6.62-.83z"/><path d="M-75.06 95.1c-3.6.37-7.21.77-10.81 1.2v-3.22c3.6-.44 7.21-.84 10.81-1.2zm12.29-1.1-3.66.3v-3.22l3.66-.3zm-5.64.47c-1.46.13-2.93.27-4.39.41v-3.22c1.46-.14 2.93-.28 4.39-.41z"/><path d="M-51.89 93.25c-6 .35-12.01.8-18.01 1.35v-3.22c6.01-.55 12.01-1 18.01-1.35zm-43.56 13.36c-6.59.92-13.17 1.96-19.75 3.11v-3.22c6.58-1.16 13.16-2.2 19.75-3.11zm22.09-2.62c-3.48.34-6.96.72-10.44 1.13v-3.22c3.48-.41 6.96-.78 10.44-1.13zm-13.53 1.5c-2.18.27-4.36.55-6.55.85v-3.22c2.18-.3 4.36-.58 6.55-.85z"/></g><path fill="#eee" d="M15.71 280.41V170.86h76.08a2.77 2.77 0 0 1 2.77 2.77v104.01a2.77 2.77 0 0 1-2.77 2.77z"/><g fill="#757575"><path d="M25.53 203.19h20.88v3.13H25.53zm0-22.19h8.96v8.23h-8.96zm11.36 0h8.96v8.23h-8.96zm11.36 0h8.96v8.23h-8.96zm11.36 0h8.96v8.23h-8.96zm-34.08 13.66h59.12v.79H25.53zm22.44 8.53h6.18v3.13h-6.18z"/><path d="M52.92 203.19h10.09v3.13H52.92zm18.14 0h3.42v3.13h-3.42z"/><path d="M65.11 203.19h6.93v3.13h-6.93zm10.9 0h5.67v3.13h-5.67zm-50.48 8.8h9.57v3.13h-9.57zm11.08 0h7.37v3.13h-7.37z"/><path d="M43.1 211.99h11.05v3.13H43.1z"/><path d="M52.92 211.99h10.09v3.13H52.92zm18.14 0h3.42v3.13h-3.42z"/><path d="M65.11 211.99H76v3.13H65.11zm10.9 0h8.64v3.13h-8.64zm-50.48 8.8h12.89v3.13H25.53z"/><path d="M36.61 220.79h7.37v3.13h-7.37zm9.8 0h7.74v3.13h-7.74z"/><path d="M52.92 220.79h7.1v3.13h-7.1zm9.15 0h22.58v29.53H62.07zm-36.54 8.8h23.11v3.13H25.53z"/><path d="M40.3 229.59h3.68v3.13H40.3zm7.67 0h6.18v3.13h-6.18z"/><path d="M52.92 229.59h7.04v3.13h-7.04zm-27.39 8.8h12.89v3.13H25.53z"/><path d="M36.61 238.39h4.82v3.13h-4.82zm7.37 0h10.17v3.13H43.98z"/><path d="M52.92 238.39h5.04v3.13h-5.04zm-27.39 8.79h16.61v3.13H25.53z"/><path d="M40.3 247.18h6.38v3.13H40.3zm8.95 0h4.9v3.13h-4.9z"/><path d="M52.92 247.18h7.04v3.13h-7.04zm-27.39 8.8h12.89v3.13H25.53zm14.77 0h11.39v3.13H40.3z"/><path d="M47.97 255.98h6.18v3.13h-6.18z"/><path d="M52.92 255.98h10.09v3.13H52.92zm18.14 0h3.42v3.13h-3.42zm-5.95 0h4.1v3.13h-4.1z"/><path d="M67.82 255.98h16.82v3.13H67.82zm-42.29 8.8h18.44v3.13H25.53zm29.32 0h9.74v3.13h-9.74zm-9 0h6.11v3.13h-6.11z"/></g><path fill="#bdbdbd" d="M16.62 124.27V14.04c30.52 2.2 61.18 2.27 91.71.21 1.68-.11 3.05 1.04 3.05 2.58v104.65c0 1.54-1.36 2.89-3.05 3a659 659 0 0 1-91.71-.21"/><path fill="#6444d5" d="M16.62 124.25V14.02C44.36 7.91 72.21 3.9 99.95 2.03c1.53-.1 2.77 1.07 2.77 2.61v104.65c0 1.54-1.24 2.87-2.77 2.97-27.74 1.87-55.59 5.88-83.33 11.99"/><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" d="M28.75 49.34c20.6-4.08 41.25-7 61.84-8.74M28.75 63.23a565 565 0 0 1 26.45-4.6M28.75 77.11a565 565 0 0 1 26.45-4.6m-26.45 33.06c20.6-4.08 41.25-7 61.84-8.74M28.75 91a565 565 0 0 1 26.45-4.6"/><path fill="#fff" d="M64.86 87.55a560 560 0 0 1 24.67-2.69c1.49-.13 2.69-1.44 2.69-2.94V54.54c0-1.5-1.21-2.61-2.69-2.48-8.22.71-16.44 1.61-24.67 2.69-1.49.2-2.7 1.58-2.7 3.07V85.2c.01 1.5 1.21 2.55 2.7 2.35m-34.4-52.14c2.03-.4 4.05-.78 6.08-1.15 1.49-.27 2.69-1.7 2.69-3.2v-7.02c0-1.5-1.21-2.49-2.69-2.22-2.03.37-4.05.76-6.08 1.15-1.49.29-2.69 1.75-2.69 3.24v7.02c-.01 1.5 1.2 2.47 2.69 2.18m15.96-2.88c2.03-.34 4.05-.66 6.08-.97 1.49-.23 2.7-1.62 2.7-3.12v-7.02c0-1.5-1.21-2.53-2.7-2.3-2.03.31-4.06.64-6.08.97-1.49.25-2.69 1.67-2.69 3.16v7.02c0 1.5 1.2 2.51 2.69 2.26m15.97-2.41c2.03-.28 4.06-.54 6.08-.8 1.49-.19 2.7-1.54 2.7-3.04v-7.02c0-1.5-1.21-2.57-2.7-2.38-2.03.25-4.06.52-6.08.8-1.49.2-2.7 1.59-2.7 3.08v7.02c.01 1.5 1.22 2.54 2.7 2.34"/><path fill="#6444d5" d="M374.07 165.73V44.63h92.1a3.06 3.06 0 0 1 3.06 3.06v114.98a3.06 3.06 0 0 1-3.06 3.06z"/><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" d="M387.48 86.21h68.34m-68.34 15.26h29.23m-29.23 15.26h29.23M387.48 148h68.34m-68.34-16.01h29.23"/><path fill="#fff" d="M427.38 134.75h27.26c1.64 0 2.98-1.33 2.98-2.98v-30.08c0-1.64-1.33-2.98-2.98-2.98h-27.26c-1.64 0-2.98 1.33-2.98 2.98v30.08a2.987 2.987 0 0 0 2.98 2.98m-38.01-63.47h6.72c1.64 0 2.98-1.33 2.98-2.98v-7.71c0-1.64-1.33-2.98-2.98-2.98h-6.72c-1.64 0-2.98 1.33-2.98 2.98v7.71c0 1.65 1.33 2.98 2.98 2.98m17.64 0h6.72c1.64 0 2.98-1.33 2.98-2.98v-7.71c0-1.64-1.33-2.98-2.98-2.98h-6.72c-1.64 0-2.98 1.33-2.98 2.98v7.71a2.987 2.987 0 0 0 2.98 2.98m17.65 0h6.72c1.64 0 2.98-1.33 2.98-2.98v-7.71c0-1.64-1.33-2.98-2.98-2.98h-6.72c-1.64 0-2.98 1.33-2.98 2.98v7.71c0 1.65 1.33 2.98 2.98 2.98"/><path fill="#bdbdbd" d="M479.86 165.73V44.63h92.1a3.06 3.06 0 0 1 3.06 3.06v114.98a3.06 3.06 0 0 1-3.06 3.06z"/></svg>
        EpubView</h1>
        <p class="tagline">A modern EPUB reader for Visual Studio Code</p>
        <div class="version-badge">
          <div class="status-dot"></div>
          <span>v0.0.1 • Active Development</span>
        </div>
      </header>

      <main class="content">
        <article class="card">
          <div class="card-header">
            <h2 class="card-title">
              <span>👨‍💻</span>
              Created by Emmanuel Jemeni
            </h2>
            <p class="card-description">
              Building tools that make developers' lives easier, one extension at a time. 
              Passionate about creating seamless experiences that bridge the gap between reading and coding.
            </p>
          </div>
        </article>

        <article class="card">
          <div class="card-header">
            <h2 class="card-title">
              <span>🌐</span>
              Connect & Follow
            </h2>
            <p class="card-description">
              Let's connect! Find me across the web for updates, discussions, and more projects.
            </p>
          </div>
          <div class="button-group">
            <a href="https://github.com/Jemeni11" class="button button-primary">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/emmanuel-jemeni" class="button button-primary">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://bsky.app/profile/jemeni11.bsky.social" class="button button-secondary">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
              </svg>
              BlueSky
            </a>
          </div>
        </article>

        <article class="card">
          <div class="card-header">
            <h2 class="card-title">
              <span>💝</span>
              Support This Project
            </h2>
            <p class="card-description">
              Help keep EpubView growing! Your support enables continued development and new features.
            </p>
          </div>
          <div class="button-group">
            <a href="#" class="button button-ghost">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Rate Extension
            </a>
            <a href="https://github.com/Jemeni11/EpubView" class="button button-secondary">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
              Contribute
            </a>
            <a href="https://buymeacoffee.com/jemeni11" class="button button-primary">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.3 5.3c.3-.3.7-.3 1 0 .3.3.3.7 0 1l-6 6c-.3.3-.7.3-1 0l-6-6c-.3-.3-.3-.7 0-1 .3-.3.7-.3 1 0L12 11.6l5.3-6.3z"/>
              </svg>
              Buy Me Coffee
            </a>
            <a href="https://github.com/sponsors/Jemeni11" class="button button-primary">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Sponsor
            </a>
          </div>
        </article>
      </main>

      <footer class="footer">
        <p class="footer-text">
          Made with <span class="highlight">💜</span> for the VSCode community
          <br>
          <span>Open source • MIT License • Built with modern web standards</span>
        </p>
      </footer>
    </div>
  </body>
</html>
  `;
}
