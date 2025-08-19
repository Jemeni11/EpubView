import * as vscode from "vscode";
import { showCredits } from "./creditsCommand";

export function registerCommands(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("epubview.showCredits", showCredits)
  );
}
