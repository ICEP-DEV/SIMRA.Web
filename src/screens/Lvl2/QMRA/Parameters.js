/* import React, { useState } from 'react';

const qmraParameters = {
  'Campylobacter jejun': { model: 'Beta-Poisson', alpha: 0.145, beta: 7.45 },
  'E-Coli O157:H7': { model: 'Beta-Poisson', alpha: 0.4, beta: 45.9 },
  'Salmonella Typhi': { model: 'Beta-Poisson', alpha: 0.21, beta: 49.78 },
  'S. flexneri': { model: 'Beta-Poisson', alpha: 0.265, beta: 1480 },
  'Vibrio cholerae': { model: 'Beta-Poisson', alpha: 0.169, beta: 2305 },
  'Cryptosporidium parvum': { model: 'exponential', r: 0.059 },
  'Entamoeba coli': { model: 'Beta-Poisson', alpha: 0.79433, beta: 5.40789 },
  'Giardia lambia': { model: 'exponential', k: 0.01199 },
  'Other': { model: '', alpha: 0, beta: 0 },
};

function QMRAApp() {
  const [selectedOrganism, setSelectedOrganism] = useState('Campylobacter jejun');
  const [count, setCount] = useState('');
  const [alpha, setAlpha] = useState('');
  const [beta, setBeta] = useState('');
  const [r, setr] = useState('');
  const [k, setk] = useState('');
  const [model, setModel] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () => {
    if (selectedOrganism === 'Other' && model && count && alpha && beta) {
      let calculatedResult = 0;

      if (model === 'Beta-Poisson') {
        calculatedResult = calculateBetaPoisson(alpha, beta, count);
      }  if (selectedOrganism === 'Cryptosporidium parvum') {
          calculatedResult = calculateExponentialForCryptosporidium(r, count);
        } else if (selectedOrganism === 'Giardia lambia') {
          calculatedResult = calculateExponentialForGiardia(k, count);
        }
 
      setResult(`Calculated Result: ${calculatedResult}`);
    } else {
      setResult('');
    }
  };

  const calculateExponentialForCryptosporidium = (r, count) => {
    // Implement the exponential calculation for Cryptosporidium parvum
      // Your formula here 
      const calculatedResult = 1 - Math.pow(2.71828, -r * count);
    return calculatedResult;
  };

  const calculateExponentialForGiardia = (k, count) => {
    // Implement the exponential calculation for Giardia lambia
     // Your formula here 
     const calculatedResult = 1 - Math.pow(2.71828, -k * count);;
    return calculatedResult;
  };


  const calculateBetaPoisson = (alpha, beta, count) => {
    // Perform the Beta-Poisson calculation here  
    const calculatedResult = 1 -[1+(count/beta)]-alpha;
    return calculatedResult;
  };

  const calculateOther = () => {
    // Perform other calculations here
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>QMRA Parameters</h1>
      <select
        value={selectedOrganism}
        onChange={(e) => {
          const selectedValue = e.target.value;
          setSelectedOrganism(selectedValue);
          setModel(qmraParameters[selectedValue].model);
          setResult('');
        }}
      >
        {Object.keys(qmraParameters).map((organism) => (
          <option
            key={organism}
            value={organism}
          >
            {organism}
          </option>
        ))}

        <option value="Other">Other</option>
      </select>
      {selectedOrganism === 'Other' && (
        <>
          <input
            style={styles.input}
            placeholder="Enter Organism"
            onChange={(e) => setSelectedOrganism(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Model"
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Count"
            type="number"
            onChange={(e) => setCount(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Alpha"
            type="number"
            step="0.01"
            onChange={(e) => setAlpha(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Beta"
            type="number"
            step="0.01"
            onChange={(e) => setBeta(e.target.value)}
          />
          {model === 'exponential' && (
            <>
              {selectedOrganism !== 'Cryptosporidium parvum' && (
                <input
                  style={styles.input}
                  placeholder="Enter r"
                  type="number"
                  step="0.01"
                  onChange={(e) => setr(e.target.value)}
                />
              )}
              {selectedOrganism !== 'Giardia lambia' && (
                <input
                  style={styles.input}
                  placeholder="Enter k"
                  type="number"
                  step="0.01"
                  onChange={(e) => setk(e.target.value)}
                />
              )}
            </>
          )}
        </>
      )}
      <button
        onClick={calculateResult}
      >
        Calculate
      </button>
      {result !== '' && (
        <p style={styles.result}>{result}</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  header: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  input: {
    width: '200px',
    fontSize: '16px',
    marginBottom: '10px',
    padding: '10px',
    borderWidth: '1px',
    borderColor: 'blue',
  },
  result: {
    fontSize: '18px',
    marginTop: '20px',
  },
};

export default QMRAApp;
 */
import React, { useState } from 'react';

const qmraParameters = {
  'Campylobacter jejun': { model: 'Beta-Poisson', alpha: 0.145, beta: 7.45 },
  'E-Coli O157:H7': { model: 'Beta-Poisson', alpha: 0.4, beta: 45.9 },
  'Salmonella Typhi': { model: 'Beta-Poisson', alpha: 0.21, beta: 49.78 },
  'S. flexneri': { model: 'Beta-Poisson', alpha: 0.265, beta: 1480 },
  'Vibrio cholerae': { model: 'Beta-Poisson', alpha: 0.169, beta: 2305 },
  'Cryptosporidium parvum': { model: 'exponential', r: 0.059 },
  'Entamoeba coli': { model: 'Beta-Poisson', alpha: 0.79433, beta: 5.40789 },
  'Giardia lambia': { model: 'exponential', k: 0.01199 },
  'Other': { model: '', alpha: 0, beta: 0 },
};

export default function QMRAApp() {
  const [selectedOrganism, setSelectedOrganism] = useState('Campylobacter jejun');
  const [count, setCount] = useState('');
  const [alpha, setAlpha] = useState('');
  const [beta, setBeta] = useState('');
  const [r, setR] = useState('');
  const [k, setK] = useState('');
  const [model, setModel] = useState('');
  const [result, setResult] = useState('');

  const calculateResult = () => {
    if (selectedOrganism === 'Other' && model && count && alpha && beta) {
      let calculatedResult = 0;

      if (model === 'Beta-Poisson') {
        console.log(model);
        calculatedResult = calculateBetaPoisson(alpha, beta, count);
      } if (selectedOrganism === 'Cryptosporidium parvum' && model === 'exponential') {
        calculatedResult = calculateExponentialForCryptosporidium(r, count);
      } else if (selectedOrganism === 'Giardia lambia' && model === 'exponential') {
        calculatedResult = calculateExponentialForGiardia(k, count);
      }

      setResult(`Model Type: ${model}, Calculated Result: ${calculatedResult}`);
    } else {
      setResult('');
    }
  };

  const calculateExponentialForCryptosporidium = (r, count) => {
    // Implement the exponential calculation for Cryptosporidium parvum
    // Your formula here 
    const calculatedResult = 1 - Math.pow(2.71828, -r * count);
    return calculatedResult;
  };

  const calculateExponentialForGiardia = (k, count) => {
    // Implement the exponential calculation for Giardia lambia
    // Your formula here 
    const calculatedResult = 1 - Math.pow(2.71828, -k * count);
    return calculatedResult;
  };

  const calculateBetaPoisson = (alpha, beta, count) => {
    // Perform the Beta-Poisson calculation here  
    const calculatedResult = 1 - (1 + (count / beta)) - alpha;
    return calculatedResult;
  };
  const methods=(e)=>{
    if(e==='Campylobacter jejun'){
      console.log(qmraParameters['Campylobacter jejun']);
    }
    else if(e==='E-Coli O157:H7'){
      console.log(qmraParameters['E-Coli O157:H7']);
    }
    else if(e==='Salmonella Typhi'){
      console.log(qmraParameters['Salmonella Typhi']);
    }
    else if(e==='S. flexneri'){
      console.log(qmraParameters['S. flexneri']);
    }
    else if(e==='Vibrio cholerae'){
      console.log(qmraParameters['Vibrio cholerae']);
    }
    else if(e==='Cryptosporidium parvum'){
      console.log(qmraParameters['Cryptosporidium parvum']);
    }
    else if(e==='Entamoeba coli'){
      console.log(qmraParameters['Entamoeba coli']);
    }
    else if(e==='Giardia lambia'){
      console.log(qmraParameters['Giardia lambia']);
    }
    else if(e==='Other'){
      console.log(qmraParameters['Other']);
    }

  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>QMRA Parameters</h1>
      <select
        value={selectedOrganism}
        onChange={(e) => {
          setSelectedOrganism(e.target.value);
          setResult('');
          // {e.target.value === 'Campylobacter jejun'? (console.log(qmraParameters['Campylobacter jejun'])):(console.log('null'))}
          methods(e.target.value)
        }}
      >
        {Object.keys(qmraParameters).map((organism) => (
          <option key={organism} value={organism}>
            {organism}
          </option>
        ))}
        <option value="Campylobacter jejun">Campylobacter jejun</option>
      </select>

      {selectedOrganism !== 'Other' && model === 'Beta-Poisson' && (
        <div>
          <label>Selected Model: {model}</label>
          <input
            style={styles.input}
            placeholder="Enter Count"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Alpha"
            type="number"
            value={alpha}
            onChange={(e) => setAlpha(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Beta"
            type="number"
            value={beta}
            onChange={(e) => setBeta(e.target.value)}
          />
        </div>
      )}

      {(selectedOrganism === 'Cryptosporidium parvum' || selectedOrganism === 'Giardia lambia') && model === 'exponential' && (
        <div>
          <input
            style={styles.input}
            placeholder="Enter r"
            type="number"
            value={r}
            onChange={(e) => setR(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Count"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          {selectedOrganism === 'Giardia lambia' && (
            <input
              style={styles.input}
              placeholder="Enter k"
              type="number"
              value={k}
              onChange={(e) => setK(e.target.value)}
            />
          )}
        </div>
      )}

      {selectedOrganism === 'Other' && (
        <div>
          <input
            style={styles.input}
            placeholder="Enter Organism"
            onChange={(e) => setSelectedOrganism(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Model"
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Count"
            type="number"
            onChange={(e) => setCount(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Alpha"
            type="number"
            step="0.01"
            onChange={(e) => setAlpha(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Enter Beta"
            type="number"
            step="0.01"
            onChange={(e) => setBeta(e.target.value)}
          />
        </div>
      )}
      <button onClick={calculateResult}>Calculate</button>
      {result !== '' && <p style={styles.result}>{result}</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  input: {
    width: '200px',
    fontSize: '16px',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid blue',
  },
  result: {
    fontSize: '18px',
    marginTop: '20px',
  },
};
