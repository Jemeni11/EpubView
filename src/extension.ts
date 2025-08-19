import * as vscode from "vscode";
import { registerProviders } from "./providers";
import { registerCommands } from "./commands";

export function activate(context: vscode.ExtensionContext) {
  console.log("EpubView extension is now active!");

  registerCommands(context);
  registerProviders(context);
}

export function deactivate() {}
