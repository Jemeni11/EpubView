import * as vscode from "vscode";
import { EpubEditorProvider } from "./epubEditorProvider";
import { EpubTreeProvider } from "./epubTreeProvider";

// export function registerProviders(
//   context: vscode.ExtensionContext
// ): vscode.Disposable[] {
//   console.log("Registering providers...");

//   const treeProvider = new EpubTreeProvider();
//   const editorProvider = new EpubEditorProvider(context, treeProvider);

//   console.log("Registering custom editor provider...");

//   return [
//     vscode.window.registerCustomEditorProvider(
//       EpubEditorProvider.viewType,
//       editorProvider
//     ),
//     vscode.window.registerTreeDataProvider("epubview.contents", treeProvider),
//     vscode.commands.registerCommand("epubview.goToChapter", (href: string) => {
//       editorProvider.navigateToChapter(href);
//     }),
//   ];
// }

export function registerProviders(context: vscode.ExtensionContext) {
    console.log('Registering providers...');
    
    try {
        // Create providers
        console.log('Creating tree provider...');
        const treeProvider = new EpubTreeProvider();
        console.log('Tree provider created successfully');
        
        console.log('Creating editor provider...');
        const editorProvider = new EpubEditorProvider(context, treeProvider);
        console.log('Editor provider created successfully');

        console.log('Registering custom editor provider...');
        // Register providers
        context.subscriptions.push(
            vscode.window.registerCustomEditorProvider(
                EpubEditorProvider.viewType,
                editorProvider
            )
        );
        console.log('Custom editor provider registered');
        
        console.log('Registering tree data provider...');
        context.subscriptions.push(
            vscode.window.registerTreeDataProvider(
                'epubview.contents',
                treeProvider
            )
        );
        console.log('Tree data provider registered');

        console.log('Registering navigation command...');
        // Register navigation command
        context.subscriptions.push(
            vscode.commands.registerCommand('epubview.goToChapter', (href: string) => {
                editorProvider.navigateToChapter(href);
            })
        );
        
        console.log('Providers registered successfully!');
    } catch (error) {
        console.error('Error registering providers:', error);
    }
}