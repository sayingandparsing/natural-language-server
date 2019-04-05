import {
	IPCMessageReader, IPCMessageWriter,
	createConnection, IConnection, TextDocumentSyncKind,
	TextDocuments, TextDocument, Diagnostic, DiagnosticSeverity,
	InitializeParams, InitializeResult, TextDocumentPositionParams,
	CompletionItem, CompletionItemKind, DocumentOnTypeFormattingParams
	Hover, Files
} from 'vscode-languageserver';
import { TextEdit } from 'vscode';



const connection :IConnection = createConnection(
    new IPCMessageReader(process),
    new IPCMessageWriter(process)
)

connection.listen()

let documents :TextDocuments = new TextDocuments()

documents.listen(connection)

let workspaceRoot :string;

connection.onInitialize((params): InitializeResult => {
    workspaceRoot = params.rootPath;

    return {
        capabilities: {
            textDocumentSync: documents.syncKind,
            completionProvider: {
                resolveProvider: true
            },
            //hoverProvider: true
        }
    }
})


const defaultCompletions :CompletionItem[] = [

]


connection.onDocumentOnTypeFormatting (
    (request :DocumentOnTypeFormattingParams) :TextEdit[] => {


    }
)

connection.onCompletion(
    (textDocumentPosition :TextDocumentPositionParams) :CompletionItem[] => {
        const doc = documents
                .get(textDocumentPosition.textDocument.uri || '')
        var lastSix :string;
        if (doc) {
            const text = doc.getText()
            const offset = doc.offsetAt(textDocumentPosition.position)
            lastSix = text.substring(offset-6, offset);
        }
        

        
    })


class PositionTracker {
    position :number



    isContinuation() {
        
    }


    registerChange() {

    }
}