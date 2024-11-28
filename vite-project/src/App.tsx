import Header from "./components/Header";
import Results from "./components/Results";
import UserInput from "./components/UserInput";
import { useState } from "react";

function App() {
  // Stato globale per memorizzare i valori degli input
  const [inputValue, setInputValue] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  // Validazione dei dati: controllo che la durata dell'investimento sia positiva
  const inputIsValid = inputValue.duration > 0;

  // Funzione per gestire i cambiamenti negli input da parte dell'utente
  function handleChange(inputIdentifier: string, newValue: string) {
    // `setInputValue` è una funzione fornita da React (derivante da `useState`)
    // per aggiornare lo stato in modo controllato.
    setInputValue((prevUserInput) => {
      // Il valore corrente dello stato (prevUserInput) viene passato automaticamente da React.

      // Restituiamo un nuovo oggetto stato, copiando i valori precedenti.
      // Questo è importante per rispettare l'immutabilità dello stato, una regola chiave di React.
      return {
        ...prevUserInput, // Utilizzo dello spread operator per copiare tutte le proprietà esistenti dello stato.

        // Utilizziamo una chiave dinamica `[inputIdentifier]` per aggiornare
        // solo il campo specificato, ad esempio "initialInvestment".
        // `inputIdentifier` contiene il nome del campo da aggiornare.
        // Convertiamo `newValue` da stringa a numero con `Number(newValue)` poiché i valori numerici
        // degli input HTML sono sempre trattati inizialmente come stringhe.
        [inputIdentifier]: Number(newValue),
      };
    });
  }

  return (
    <>
      {/* Componente per l'intestazione */}
      <Header />

      {/* Componente per l'input dell'utente */}
      {/* Passiamo lo stato e la funzione `handleChange` come props */}
      <UserInput onChange={handleChange} inputValue={inputValue} />

      {/* Mostra un messaggio di errore se la durata non è valida */}
      {!inputIsValid && <p className="center">Please enter a valid input.</p>}

      {/* Mostra i risultati se l'input è valido */}
      {inputIsValid && <Results inputValue={inputValue} />}
    </>
  );
}

export default App;
