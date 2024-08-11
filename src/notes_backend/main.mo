import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat8 "mo:base/Nat8";
import Time "mo:base/Time";
import Nat "mo:base/Nat";

actor DKeeper {

    public type Note = {
        title: Text;
        content: Text;
        image: [Nat8];
        timestamp: Time.Time;
    };

    stable var notes: List.List<Note> = List.nil<Note>();

    public func createNote(titleText: Text, contentText: Text, imageData: [Nat8]) {
        var currentTime = Time.now();
        let newNote: Note = {
            title = titleText;
            content = contentText;
            image = imageData;
            timestamp = currentTime;
        };

        notes := List.push(newNote,  notes);

    };

    public query func readNotes(): async [Note] {
        return List.toArray(notes);
    };

    public func removeNote(id: Nat) {
        //take drop append
        let listFront = List.take(notes, id);
        let listBack = List.drop(notes, id + 1);
        notes := List.append(listFront, listBack);
    
    }

}