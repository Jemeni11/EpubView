import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function getCreditsHtml(
  context: vscode.ExtensionContext,
  webview: vscode.Webview
): string {
  const htmlPath = path.join(
    context.extensionPath,
    "out",
    "webviews",
    "credits",
    "credits.html"
  );
  const cssPath = path.join(
    context.extensionPath,
    "out",
    "webviews",
    "credits",
    "styles.css"
  );

  console.log("webview, ", webview);
  const cssUri = webview.asWebviewUri(vscode.Uri.file(cssPath));

  let html = fs.readFileSync(htmlPath, "utf8");
  html = html.replace("{{CSS_URI}}", cssUri.toString());

  return html;
}
