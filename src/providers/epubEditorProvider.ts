import * as vscode from "vscode";
import ePub from "epubjs";
import { EpubTreeProvider } from "./epubTreeProvider";

export class EpubEditorProvider implements vscode.CustomReadonlyEditorProvider {
  public static readonly viewType = "epubview.editor";
  private currentWebview: vscode.WebviewPanel | null = null;
  private currentBook: any = null;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly treeProvider: EpubTreeProvider
  ) {}

  public async openCustomDocument(
    uri: vscode.Uri,
    openContext: { backupId?: string },
    _token: vscode.CancellationToken
  ): Promise<vscode.CustomDocument> {
    return {
      uri,
      dispose: () => {},
    };
  }

  public async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    console.log("=== resolveCustomEditor called ===");

    this.currentWebview = webviewPanel;

    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, "src", "libs"),
      ],
    };

    webviewPanel.webview.onDidReceiveMessage((message) => {
      console.log("Received message from webview:", message);
      if (message.type === "tocLoaded") {
        console.log("TOC loaded, sending to tree provider:", message.toc);
        this.treeProvider.loadToc(message.toc);
      }
    });

    try {
      console.log("Reading EPUB file...");
      const epubData = await vscode.workspace.fs.readFile(document.uri);

      // Convert to base64 for the webview
      const base64Data = Buffer.from(epubData).toString("base64");

      // Send the EPUB data to the webview where epubjs can run properly
      webviewPanel.webview.html = this.getWebviewContent(base64Data);
    } catch (error) {
      console.error("ERROR:", error);
      webviewPanel.webview.html = this.getErrorContent(`Error: ${error}`);
    }
  }

  private getWebviewContent(base64Data: string): string {
    const jszipUri = this.currentWebview!.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "src",
        "libs",
        "jszip.min.js"
      )
    );
    const epubjsUri = this.currentWebview!.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "src",
        "libs",
        "epub.min.js"
      )
    );

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <script src="${jszipUri}"></script>
            <script src="${epubjsUri}"></script><style>
                body { 
                    font-family: var(--vscode-font-family);
                    background-color: var(--vscode-editor-background);
                    color: var(--vscode-foreground);
                    margin: 0;
                    padding: 20px;
                }
                #controls {
                    height: 10vh;
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    z-index: 1000;
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }
                button, input {
                    background: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background: var(--vscode-button-hoverBackground);
                }
                button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                #epub-container { 
                    width: 100%; 
                    height: 100vh; 
                    padding: 20px;
                    box-sizing: border-box;
                }
                .color-control {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 12px;
                }
                input[type="color"] {
                    width: 30px;
                    height: 30px;
                    padding: 0;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
          <div id="controls">
            <div style="position: fixed; top: 10px; right: 10px; z-index: 1000; background: var(--vscode-editor-background); padding: 10px; border: 1px solid var(--vscode-panel-border); border-radius: 4px;">
              <div style="margin-bottom: 8px;">
                <label for="textColor" style="display: block; margin-bottom: 4px; color: var(--vscode-foreground);">Text Color:</label>
                <input type="color" id="textColor" value="#000000" style="width: 50px; height: 30px;">
              </div>
              <div style="margin-bottom: 8px;">
                <label for="bgColor" style="display: block; margin-bottom: 4px; color: var(--vscode-foreground);">Background:</label>
                <input type="color" id="bgColor" value="#ffffff" style="width: 50px; height: 30px;">
              </div>
              <div>
                <label for="fontFamily" style="display: block; margin-bottom: 4px; color: var(--vscode-foreground);">Font:</label>
                <select id="fontFamily" style="width: 120px; padding: 4px;">
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Times, serif">Times</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="'Comic Sans MS', cursive">Comic Sans</option>
                </select>
              </div>
            </div>
            <button id="prev" onclick="prevPage()">← Previous</button>
            <button id="next" onclick="nextPage()">Next →</button>
          </div>
          <div id="epub-container"></div>
          <script>
            const vscode = acquireVsCodeApi();
            let book, rendition;
            let currentLocation = null;
            
            // Get saved state
            const state = vscode.getState();
            
            // Convert base64 back to ArrayBuffer
            const binaryString = atob('${base64Data}');
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Initialize epub
            book = ePub(bytes.buffer);
            rendition = book.renderTo("epub-container", { 
                width: "100%", 
                height: "100%" 
            });
            
            // Restore position if available
            if (state && state.currentLocation) {
                rendition.display(state.currentLocation);
            } else {
                rendition.display();
            }
                
            // Send TOC to extension when book is ready
            book.ready.then(() => {
              const toc = book.navigation.toc;
              console.log('Book ready, TOC:', toc);
              vscode.postMessage({
                  type: 'tocLoaded',
                  toc: toc
              });
              console.log('TOC message sent to extension');
            });
            
            // Save location when changed
            rendition.on('relocated', (location) => {
                currentLocation = location.start.cfi;
                vscode.setState({ currentLocation: currentLocation });
                
                document.getElementById('prev').disabled = location.atStart;
                document.getElementById('next').disabled = location.atEnd;
            });

            // Store current styles
            let currentStyles = {
                color: '#000000',
                backgroundColor: '#ffffff',
                fontFamily: 'Georgia, serif'
            };

            // Apply theme with persistence
            function applyTheme() {
                if (rendition && rendition.themes) {
                    rendition.themes.default({
                        'body': { 
                            'color': currentStyles.color + ' !important',
                            'background-color': currentStyles.backgroundColor + ' !important',
                            'font-family': currentStyles.fontFamily + ' !important'
                        }
                    });
                }
            }

            // Enhanced color picker handlers
            document.getElementById('textColor').addEventListener('change', (e) => {
                currentStyles.color = e.target.value;
                applyTheme();
            });

            document.getElementById('bgColor').addEventListener('change', (e) => {
                currentStyles.backgroundColor = e.target.value;
                applyTheme();
            });

            document.getElementById('fontFamily').addEventListener('change', (e) => {
                currentStyles.fontFamily = e.target.value;
                applyTheme();
            });

            // Reapply styles when content changes
            rendition.on('rendered', () => {
                setTimeout(applyTheme, 100); // Small delay to ensure content is ready
            });

            // Navigation functions
            function nextPage() {
                rendition.next();
            }
            
            function prevPage() {
                rendition.prev();
            }
                
            // Listen for navigation from sidebar
            window.addEventListener('message', event => {
                const message = event.data;
                if (message.type === 'navigateToChapter') {
                    rendition.display(message.href);
                }
            });
          </script>
        </body>
      </html>
    `;
  }

  // Method to navigate to a specific chapter
  public async navigateToChapter(href: string): Promise<void> {
    if (!this.currentWebview) {
      return;
    }

    this.currentWebview.webview.postMessage({
      type: "navigateToChapter",
      href: href,
    });
  }

  private getErrorContent(message: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>EPUB Error</title>
                <style>
                    body {
                        font-family: var(--vscode-font-family);
                        color: var(--vscode-errorForeground);
                        background-color: var(--vscode-editor-background);
                        padding: 20px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h2>Error Loading EPUB</h2>
                <p>${message}</p>
            </body>
            </html>
        `;
  }
}
