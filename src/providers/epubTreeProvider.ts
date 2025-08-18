import * as vscode from "vscode";

export interface EpubChapter {
  id: string;
  label: string;
  href: string;
  children?: EpubChapter[];
}

export class EpubTreeProvider implements vscode.TreeDataProvider<EpubChapter> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    EpubChapter | undefined | null | void
  > = new vscode.EventEmitter<EpubChapter | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    EpubChapter | undefined | null | void
  > = this._onDidChangeTreeData.event;

  private chapters: EpubChapter[] = [];
  private currentBook: any = null;

  constructor() {}

  public loadToc(toc: any[]): void {
    console.log("Raw TOC structure:", JSON.stringify(toc, null, 2));
    this.currentBook = { navigation: { toc } };
    this.chapters = this.extractTableOfContents(toc);
    console.log("Extracted chapters:", this.chapters);
    this._onDidChangeTreeData.fire();
    vscode.commands.executeCommand("setContext", "epubview.hasEpubOpen", true);
  }

  // Called when an EPUB is opened
  public async loadEpub(book: any): Promise<void> {
    this.currentBook = book;
    await book.ready;

    this.chapters = this.extractTableOfContents(book.navigation.toc);
    this._onDidChangeTreeData.fire();

    // Set context to show the tree view
    vscode.commands.executeCommand("setContext", "epubview.hasEpubOpen", true);
  }

  // Called when EPUB is closed
  public clearEpub(): void {
    this.currentBook = null;
    this.chapters = [];
    this._onDidChangeTreeData.fire();

    // Hide the tree view
    vscode.commands.executeCommand("setContext", "epubview.hasEpubOpen", false);
  }

  private extractTableOfContents(tocItems: any[]): EpubChapter[] {
    return tocItems.map((item) => {
      console.log("Processing TOC item:", item);
      console.log("Item properties:", Object.keys(item));

      return {
        id: item.id || item.href,
        label: item.label.trim(),
        href: item.href,
        children: item.subitems
          ? this.extractTableOfContents(item.subitems)
          : undefined,
      };
    });
  }

  getTreeItem(element: EpubChapter): vscode.TreeItem {
    const hasChildren = element.children && element.children.length > 0;

    const treeItem = new vscode.TreeItem(
      element.label,
      hasChildren
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None
    );

    treeItem.id = element.id;
    treeItem.tooltip = element.label;

    // Always set an icon
    if (hasChildren) {
      // Use folder icon for sections with children
      treeItem.iconPath = new vscode.ThemeIcon("folder");
    } else {
      // Use document icon for actual chapters
      treeItem.iconPath = new vscode.ThemeIcon("file-text");

      treeItem.command = {
        command: "epubview.goToChapter",
        title: "Go to Chapter",
        arguments: [element.href],
      };
    }

    return treeItem;
  }

  getChildren(element?: EpubChapter): Thenable<EpubChapter[]> {
    console.log("getChildren called with element:", element);
    console.log("currentBook exists:", !!this.currentBook);
    console.log("chapters array:", this.chapters);
    console.log("chapters length:", this.chapters.length);

    if (!this.currentBook) {
      console.log("No current book, returning empty array");
      return Promise.resolve([]);
    }

    if (element) {
      // Return children of the element
      console.log("Returning children of element:", element.children || []);
      return Promise.resolve(element.children || []);
    } else {
      // Return root level chapters
      console.log("Returning root chapters:", this.chapters);
      return Promise.resolve(this.chapters);
    }
  }

  // Get the current book for other components
  public getCurrentBook(): any {
    return this.currentBook;
  }
}
