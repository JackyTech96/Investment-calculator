// Importiamo funzioni di utilità per il calcolo degli investimenti e per formattare i numeri in valuta
import { calculateInvestmentResults, formatter } from "../util/investment";

// Definizione dei tipi per le proprietà passate al componente Results
export interface ResultsProps {
  inputValue: {
    initialInvestment: number; // Importo iniziale investito
    annualInvestment: number; // Importo investito annualmente
    expectedReturn: number; // Percentuale di rendimento atteso
    duration: number; // Durata dell'investimento in anni
  };
}

// Componente principale per la visualizzazione dei risultati
export default function Results({ inputValue }: ResultsProps) {
  // Calcolo dei risultati dell'investimento basandosi sui valori di input
  // La funzione `calculateInvestmentResults` restituisce un array di oggetti con i dettagli dell'investimento per ogni anno.
  const resultsData = calculateInvestmentResults(inputValue);
  console.log(resultsData); // Stampa di debug per verificare i dati calcolati

  // Calcolo dell'investimento iniziale basandosi sui dati del primo anno
  // Spiegazione:
  // 1. Sottraiamo dal valore totale a fine anno il guadagno in interessi e l'investimento annuale.
  // 2. Questo ci fornisce l'importo iniziale investito.
  const initialInvestment =
    resultsData[0].valueEndOfYear - // Valore totale dell'investimento a fine del primo anno
    resultsData[0].interest - // Guadagno in interessi nel primo anno
    resultsData[0].annualInvestment; // Importo aggiuntivo investito nel primo anno

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th> {/* Anno dell'investimento */}
          <th>Investment Value</th> {/* Valore totale dell'investimento */}
          <th>Interest (Year)</th> {/* Guadagno in interessi di quell'anno */}
          <th>Total Interest</th>{" "}
          {/* Guadagno totale in interessi fino a quell'anno */}
          <th>Invested Capital</th> {/* Capitale totale investito */}
        </tr>
      </thead>
      <tbody>
        {/* Iteriamo su `resultsData` per generare una riga della tabella per ogni anno */}
        {resultsData.map((yearData) => {
          // Calcolo degli interessi totali accumulati fino all'anno corrente
          // Spiegazione:
          // 1. Sottraiamo dal valore totale a fine anno:
          //    - Il capitale investito annualmente per tutti gli anni fino all'anno corrente.
          //    - L'investimento iniziale.
          const totalInterest =
            yearData.valueEndOfYear - // Valore totale a fine anno
            yearData.annualInvestment * yearData.year - // Capitale investito ogni anno moltiplicato per il numero di anni
            initialInvestment; // Importo iniziale investito

          // Calcolo del capitale totale investito senza interessi
          // Spiegazione:
          // 1. Sottraiamo gli interessi totali dal valore a fine anno.
          // 2. Questo rappresenta il capitale puro investito.
          const totalAutomatedInvestment =
            yearData.valueEndOfYear - totalInterest;

          // Ritorniamo una riga della tabella con i dati formattati
          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td> {/* Numero dell'anno */}
              <td>{formatter.format(yearData.valueEndOfYear)}</td>{" "}
              {/* Valore totale dell'investimento */}
              <td>{formatter.format(yearData.interest)}</td>{" "}
              {/* Guadagno in interessi */}
              <td>{formatter.format(totalInterest)}</td>{" "}
              {/* Guadagno totale in interessi */}
              <td>{formatter.format(totalAutomatedInvestment)}</td>{" "}
              {/* Capitale totale investito */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
