import * as vscode from "vscode";
import { registerProviders } from "./providers";
import { registerCommands } from "./commands";

export function activate(
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  console.log("EpubView extension is now active!");

  context.subscriptions.push(
    ...registerCommands(context, webview)
    // ...registerProviders(context)
  );

  registerProviders(context);
}

export function deactivate() {}
