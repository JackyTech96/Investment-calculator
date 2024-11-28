// Interfaccia per definire i tipi delle proprietà accettate dal componente UserInput
export interface UserInputProps {
  inputValue: {
    // Oggetto contenente i valori degli input
    initialInvestment: number; // Valore iniziale dell'investimento
    annualInvestment: number; // Valore dell'investimento annuale
    expectedReturn: number; // Percentuale del rendimento atteso
    duration: number; // Durata dell'investimento in anni
  };
  onChange: (inputIdentifier: string, newValue: string) => void;
  // Funzione callback per gestire il cambiamento di valore di un campo.
  // Viene passata al componente da un livello superiore.
  // `inputIdentifier` è una stringa che identifica il campo (es. "duration"),
  // `newValue` è il nuovo valore inserito nel campo.
}

// Componente principale che permette all'utente di inserire i dati di input
export default function UserInput({ inputValue, onChange }: UserInputProps) {
  return (
    <section id="user-input">
      {/* Primo gruppo di campi di input */}
      <div className="input-group">
        <p>
          <label htmlFor="initial-investment">Initial Investment</label>
          <input
            type="number"
            required
            value={inputValue.initialInvestment}
            // Lega il valore del campo al valore di inputValue.initialInvestment
            onChange={
              (event) => onChange("initialInvestment", event.target.value)
              // Utilizziamo una funzione anonima (arrow function) per intercettare l'evento onChange:
              // 1. `event.target.value` cattura il valore inserito dall'utente (JavaScript standard).
              // 2. Passiamo il valore alla funzione `onChange`,
              //    fornendo anche l'identificatore del campo ("initialInvestment") per sapere cosa aggiornare.
              // 3. L'uso di un callback esterno (`onChange`) permette di gestire la logica di aggiornamento
              //    dello stato da un livello superiore (principio di gestione centralizzata dello stato in React).
            }
          />
        </p>
        <p>
          <label htmlFor="annual-investment">Annual Investment</label>
          <input
            type="number"
            required
            value={inputValue.annualInvestment}
            // Lega il valore del campo a inputValue.annualInvestment
            onChange={
              (event) => onChange("annualInvestment", event.target.value)
              // Passiamo "annualInvestment" e il valore aggiornato, esattamente come sopra.
              // Questo approccio dinamico evita la duplicazione del codice,
              // poiché la logica di gestione del cambiamento è astratta nella funzione `onChange`.
            }
          />
        </p>
      </div>

      {/* Secondo gruppo di campi di input */}
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">Expected Return</label>
          <input
            type="number"
            required
            value={inputValue.expectedReturn}
            // Lega il valore del campo a inputValue.expectedReturn
            onChange={
              (event) => onChange("expectedReturn", event.target.value)
              // Passa "expectedReturn" come identificatore per aggiornare il valore
            }
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            required
            value={inputValue.duration}
            // Associa il valore dell'input al valore di inputValue.duration
            onChange={
              (event) => onChange("duration", event.target.value)
              // Invoca onChange per aggiornare il valore del campo "duration"
            }
          />
        </p>
      </div>
    </section>
  );
}
