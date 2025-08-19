import * as vscode from "vscode";
import { getCreditsHtml } from "../webviews/credits";

export function showCredits() {
  const panel = vscode.window.createWebviewPanel(
    "epubviewCredits",
    "EpubView - About & Support",
    vscode.ViewColumn.One,
    { enableFindWidget: true }
  );

  panel.webview.html = getCreditsHtml();
}
