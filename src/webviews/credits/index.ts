export function getCreditsHtml(): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EpubView Credits</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        background-color: var(--vscode-editor-background);
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
        min-height: 100vh;
        line-height: 1.5;
      }
      
      .container {
        max-width: 672px; /* max-w-2xl */
        margin: 0 auto; /* mx-auto */
        padding: 32px; /* p-8 */
      }
      
      .header {
        text-align: center; /* text-center */
        margin-bottom: 32px; /* mb-8 */
      }
      
      .title {
        font-size: 2.25rem; /* text-4xl */
        font-weight: 700; /* font-bold */
        margin-bottom: 8px; /* mb-2 */
        line-height: 1.1;
      }
      
      .subtitle {
        color: var(--vscode-descriptionForeground); /* text-gray-300 equivalent */
      }
      
      .sections {
        display: flex;
        flex-direction: column;
        gap: 24px; /* space-y-6 */
      }
      
      .section {
        background-color: var(--vscode-sideBar-background); /* bg-gray-800 equivalent */
        border: 1px solid var(--vscode-panel-border);
        border-radius: 8px; /* rounded-lg */
        padding: 24px; /* p-6 */
      }
      
      .section-title {
        font-size: 1.25rem; /* text-xl */
        font-weight: 600; /* font-semibold */
        margin-bottom: 12px; /* mb-3 */
        line-height: 1.4;
      }
      
      .section-title-spaced {
        font-size: 1.25rem; /* text-xl */
        font-weight: 600; /* font-semibold */
        margin-bottom: 16px; /* mb-4 */
        line-height: 1.4;
      }
      
      .section-text {
        color: var(--vscode-descriptionForeground); /* text-gray-300 equivalent */
        margin-bottom: 16px;
      }
      
      .links {
        display: flex; /* flex */
        flex-wrap: wrap; /* flex-wrap */
        gap: 12px; /* gap-3 */
      }
      
      .link {
        text-decoration: none;
        padding: 8px 16px; /* py-2 px-4 */
        border-radius: 6px; /* rounded-md */
        transition: background-color 150ms ease; /* transition-colors */
        font-size: 14px;
        font-weight: 500;
        border: none;
        cursor: pointer;
      }
      
      .link-primary {
        background-color: var(--vscode-button-background); /* bg-blue-600 */
        color: var(--vscode-button-foreground);
      }
      
      .link-primary:hover {
        background-color: var(--vscode-button-hoverBackground); /* hover:bg-blue-700 */
      }
      
      .link-secondary {
        background-color: var(--vscode-button-secondaryBackground); /* bg-green-600 */
        color: var(--vscode-button-secondaryForeground);
      }
      
      .link-secondary:hover {
        background-color: var(--vscode-button-secondaryHoverBackground); /* hover:bg-green-700 */
      }
      
      /* Fallback colors if VSCode theme variables aren't available */
      @media (prefers-color-scheme: dark) {
        body {
          background-color: var(--vscode-editor-background, #1e1e1e);
          color: var(--vscode-foreground, #cccccc);
        }
        
        .section {
          background-color: var(--vscode-sideBar-background, #252526);
          border-color: var(--vscode-panel-border, #3c3c3c);
        }
        
        .subtitle, .section-text {
          color: var(--vscode-descriptionForeground, #999999);
        }
        
        .link-primary {
          background-color: var(--vscode-button-background, #0e639c);
          color: var(--vscode-button-foreground, #ffffff);
        }
        
        .link-primary:hover {
          background-color: var(--vscode-button-hoverBackground, #1177bb);
        }
        
        .link-secondary {
          background-color: var(--vscode-button-secondaryBackground, #3c3c3c);
          color: var(--vscode-button-secondaryForeground, #cccccc);
        }
        
        .link-secondary:hover {
          background-color: var(--vscode-button-secondaryHoverBackground, #4a4a4a);
        }
      }
      
      @media (prefers-color-scheme: light) {
        body {
          background-color: var(--vscode-editor-background, #ffffff);
          color: var(--vscode-foreground, #333333);
        }
        
        .section {
          background-color: var(--vscode-sideBar-background, #f3f3f3);
          border-color: var(--vscode-panel-border, #cccccc);
        }
        
        .subtitle, .section-text {
          color: var(--vscode-descriptionForeground, #666666);
        }
        
        .link-primary {
          background-color: var(--vscode-button-background, #0078d4);
          color: var(--vscode-button-foreground, #ffffff);
        }
        
        .link-primary:hover {
          background-color: var(--vscode-button-hoverBackground, #106ebe);
        }
        
        .link-secondary {
          background-color: var(--vscode-button-secondaryBackground, #e5e5e5);
          color: var(--vscode-button-secondaryForeground, #333333);
        }
        
        .link-secondary:hover {
          background-color: var(--vscode-button-secondaryHoverBackground, #d0d0d0);
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="title">📚 EpubView</h1>
        <p class="subtitle">Read EPUB files directly in VSCode</p>
      </div>

      <div class="sections">
        <div class="section">
          <h3 class="section-title">
            👨‍💻 Created by Emmanuel Jemeni
          </h3>
          <p class="section-text">
            Making it easier to read books and documentation without leaving
            your favorite editor!
          </p>
        </div>

        <div class="section">
          <h3 class="section-title-spaced">🔗 Connect</h3>
          <div class="links">
            <a
              href="https://github.com/Jemeni11"
              class="link link-primary"
              >GitHub</a
            >
            <a
              href="https://linkedin.com/in/emmanuel-jemeni"
              class="link link-primary"
              >LinkedIn</a
            >
            <a
              href="https://bsky.app/profile/jemeni11.bsky.social"
              class="link link-primary"
              >BlueSky</a
            >
          </div>
        </div>

        <div class="section">
          <h3 class="section-title-spaced">💖 Support EpubView</h3>
          <div class="links">
            <a
              href="#"
              class="link link-secondary"
              >⭐ Rate Extension</a
            >
            <a
              href="https://github.com/Jemeni11/EpubView"
              class="link link-secondary"
              >🔄 Contribute</a
            >
            <a
              href="https://buymeacoffee.com/jemeni11"
              class="link link-secondary"
              >☕ Buy Coffee</a
            >
            <a
              href="https://github.com/sponsors/Jemeni11"
              class="link link-secondary"
              >💰 Sponsor</a
            >
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
  `;
}
