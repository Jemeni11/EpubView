import * as vscode from "vscode";
import { showCredits } from "./creditsCommand";

export function registerCommands(context: vscode.ExtensionContext) {
  return [
    vscode.commands.registerCommand("epubview.showCredits", () =>
      showCredits(context)
    ),
  ];
}
