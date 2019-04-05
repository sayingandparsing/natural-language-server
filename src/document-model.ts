


interface DocumentRepresentation {

}

interface IDocumentModel {
    doc :DocumentRepresentation

    update(changes) :Promise<void>

    text() :Promise<string>

    length() :Promise<number>

    cursorPos() :Promise<number>

}


interface Insertion {
    
}

interface ContinuousInsertionHistory {
    first :Insertion
    previous :Insertion

    cursorAtEnd() :Promise<boolean>
}


namespace ContinuousInsertionHistory {
    
}