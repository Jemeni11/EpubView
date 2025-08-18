import * as vscode from "vscode";
import { showCredits } from "./creditsCommand";

export function registerCommands(
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  return [
    vscode.commands.registerCommand("epubview.showCredits", () =>
      showCredits(context, webview)
    ),
  ];
}
