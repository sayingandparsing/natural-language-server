


Client will request completions following each typed character; however, the completion item aren't meant to be selected, and thus won't result in an insertion. The transformation from abbreviation to complete word is triggered by a different mechanism.

Instead, the server will instruct the client to send a `textDocument/onTypeFormatting` request whenever the user types a space character.
The server responds with an `TextEdit[]`

https://github.com/Microsoft/language-server-protocol/blob/master/versions/protocol-2-x.md#textDocument_onTypeFormatting

```typescript
    interface DocumentOnTypeFormattingParams {
        /**
         * The document to format.
         */
        textDocument: TextDocumentIdentifier;

        /**
         * The position at which this request was sent.
         */
        position: Position;

        /**
         * The character that has been typed.
         */
        ch: string;
        
        /**
         * The format options.
         */
        options: FormattingOptions;
    }
```