import {
	IPCMessageReader, IPCMessageWriter,
	createConnection, IConnection, TextDocumentSyncKind,
	TextDocuments, TextDocument, Diagnostic, DiagnosticSeverity,
	InitializeParams, InitializeResult, TextDocumentPositionParams,
	CompletionItem, CompletionItemKind, DocumentOnTypeFormattingParams,
	Hover, Files, DidChangeTextDocumentParams, Range, TextEdit
} from 'vscode-languageserver';




const connection :IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

connection.listen()

let documents :TextDocuments = new TextDocuments()

documents.listen(connection)

let workspaceRoot :string|null|undefined;

connection.onInitialize((params): InitializeResult => {
    workspaceRoot = params.rootPath;

    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            /*completionProvider: {
                resolveProvider: true
            },*/
            documentOnTypeFormattingProvider: {
                firstTriggerCharacter: '\s'
            }
            //hoverProvider: true
        }
    }
})


const defaultCompletions :CompletionItem[] = [

]


connection.onDocumentOnTypeFormatting (
    (request :DocumentOnTypeFormattingParams) :TextEdit[] => {
        if (request.ch !== '\s') return []
        const doc = documents.get(request.textDocument.uri)
        if (!doc) return []
        
        const offset = doc.offsetAt(request.position)
        const preceding :string = doc.getText().substring(offset-6, offset)
        if (preceding.includes('this')) {
            return [
                {
                    range: {
                        start: doc.positionAt(offset-6), 
                        end: doc.positionAt(offset-1)
                    },
                    newText: "works"
                }
            ]
        } else {
            return []
        }
    }
)

/* connection.onCompletion(
    (textDocumentPosition :TextDocumentPositionParams) :CompletionItem[] => {
        const doc = documents
                .get(textDocumentPosition.textDocument.uri || '')
        var lastSix :string;
        if (doc) {
            const text = doc.getText()
            const offset = doc.offsetAt(textDocumentPosition.position)
            lastSix = text.substring(offset-6, offset);
        }
        

        
    }) */


