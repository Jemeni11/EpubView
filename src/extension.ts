import * as vscode from "vscode";
import { registerProviders } from "./providers";
import { registerCommands } from "./commands";

export function activate(context: vscode.ExtensionContext) {
  console.log("EpubView extension is now active!");

  context.subscriptions.push(
    ...registerCommands(context)
    // ...registerProviders(context)
  );

  registerProviders(context);
}

export function deactivate() {}
