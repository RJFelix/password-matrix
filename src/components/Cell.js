import React from "react";
import "./Cell.css";


const TYPES = {
  ucLetter: Symbol("ucLetter"),
  lcLetter: Symbol("lcLetter"),
  number: Symbol("number"),
  special: Symbol("special"),
  any: Symbol("any")
};

//non-const because we may need to add an [TYPES.any] property later
let LETTERS = {
  [TYPES.ucLetter]: ["A", "B", "C", "D", "E", "F",
                     "G", "H", "I", "J", "K", "L",
                     "M", "N", "O", "P", "Q", "R",
                     "S", "T", "U", "V", "W", "X",
                     "Y", "Z"],
  [TYPES.lcLetter]: ["a", "b", "c", "d", "e", "f",
                     "g", "h", "i", "j", "k", "l",
                     "m", "n", "o", "p", "q", "r",
                     "s", "t", "u", "v", "w", "x",
                     "y", "z"],
  [TYPES.number]: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  [TYPES.special]: ["!", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "{", "}", ";", ":", "<", ">", "/", "?", "~"]
}

export default function Cell(props) {
  // defend against bad length input
  let wordLength = props.cellWordLength;
  if(!Number.isInteger(wordLength)) {
    console.log("Bad argument cellWordLength: " + wordLength + " is not an integer! Defaulting to cellWordLength = 4.");
    // todo - replace above with an error
    wordLength = 4;
  }
  if(wordLength > 8) {
    wordLength = 8;
  } else if(wordLength < 2) {
    wordLength = 2; 
  }
  // set up an array to hold our random positive ints
  // +1 int for ordering
  let randoms = new Uint8Array(wordLength + 1);
  window.crypto.getRandomValues(randoms);

  // create an array of all valid values, if it will be needed
  if(wordLength > (2 + (props.useNumbers && 1) + (props.useSpecials && 1))) {
    LETTERS[TYPES.any] = LETTERS[TYPES.ucLetter].concat(LETTERS[TYPES.lcLetter], 
                                                        props.useNumbers ? LETTERS[TYPES.number] : [], 
                                                        props.useSpecials ? LETTERS[TYPES.special] : []);
  }
  
  // populate an array with the types we need to use
  // note - it's fine if wordLength is less than the length of typesToUse,
  //        we won't use all the types obviously but it will implicitly use two (or whatever) different permitted types
  let typesToUse = [TYPES.ucLetter, TYPES.lcLetter];
  if(props.useNumbers) {
    typesToUse.push(TYPES.number);
  }
  if(props.useSpecials) {
    typesToUse.push(TYPES.special);
  }
  while(wordLength > typesToUse.length) {
    typesToUse.push(TYPES.any);
  }
  // very far from the neatest implementation but it works!
  let cellWord = [];
  for(let i = 0; i < wordLength; i++) {
    // get the type we're using for this char, and remove it from the typesToUse array
    const type = typesToUse.splice(randoms[0] % typesToUse.length, 1)[0];
    // got rid of the switch! :D
    cellWord[i] = LETTERS[type][randoms[i + 1] % LETTERS[type].length];

    // ideally get rid of this switch
    // switch (type) {
    //   case TYPES.ucLetter:
    //     cellWord[i] = UCLETTERS[randoms[i + 1] % UCLETTERS.length];
    //     break;
    //   case TYPES.lcLetter:
    //     cellWord[i] = LCLETTERS[randoms[i + 1] % LCLETTERS.length];
    //     break;
    //   case TYPES.number:
    //     cellWord[i] = NUMBERS[randoms[i + 1] % NUMBERS.length];
    //     break;
    //   case TYPES.special:
    //     cellWord[i] = SPECIALS[randoms[i + 1] % SPECIALS.length];
    //     break;
    //   case TYPES.any:
    //   default:
    //     cellWord[i] = validChars[randoms[i + 1] % validChars.length];
    // }
  }

  return(
    <div className="cell">
      <h2 className="cell-letter">{props.letter}</h2>
      <p className="cell-word">{cellWord.reduce((accum, cur) => accum += cur, "")}</p>
    </div>
  );
}