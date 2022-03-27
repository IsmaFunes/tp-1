// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

const response = {
  serie: [],
  freq: {},
  intervals: []
};


// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const congruenciaLineal = ({
  semilla,
  multiplicativa,
  aditiva,
  modulo,
  n
}) => {
  const aux = (multiplicativa * semilla) + aditiva;
  const next = aux % modulo;
  const rnd = (next / (modulo - 1)).toFixed(4);
  return {
    rnd: Number(rnd),
    next
  }
}

const congruencialMultiplicativo = ({
  semilla,
  multiplicativa,
  modulo
}) => {
  const aux = (multiplicativa * semilla);
  const next = aux % modulo;
  const rnd = (next / (modulo - 1)).toFixed(4);
  return {
    rnd: Number(rnd),
    next
  }
}

const nativo = () => {
  return { rnd: Number(Math.random().toFixed(4)) }
}


const MODOS = {
  lineal: congruenciaLineal,
  multiplicativo: congruencialMultiplicativo,
  nativo
}

const calcularIntervalos = (cant) => {
  const ancho = 1 / cant;
  response.intervals = [];
  for (let i = 0; i < cant; i++) {
    let from = response.intervals[i - 1]?.to || 0;
    console.log({ from })
    response.intervals.push({
      from,
      to: Number((from + ancho).toFixed(4)),
      number: i + 1,
      items: []
    })
  }
}

const generar = ({ n, modo, multiplicativa, aditiva, modulo, semilla, intervalos = 5 }) => {
  let semillaInicial = Number(semilla);
  for (let i = 1; i <= n; i++) {
    const { rnd, next } = MODOS[modo]({
      semilla: semillaInicial,
      modulo: Number(modulo),
      multiplicativa: Number(multiplicativa),
      aditiva: Number(aditiva),
    })
    response.serie.push({
      i,
      rnd
    })
    response.freq[rnd] = (response.freq[rnd] || 0) + 1
    semillaInicial = next;
    response.intervals.forEach(interval => {
      if(rnd >= interval.from && rnd < interval.to){
        interval.items.push(rnd)
      }
    })
  }
}


export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const { n, modo, page, size, multiplicativa, aditiva, modulo, semilla, intervalos = 5 } = req.query;
  if (!page && !size) {
    response.freq = {};
    response.serie = [];
    calcularIntervalos(Number(intervalos));
    generar({
      n, modo, multiplicativa, aditiva, modulo, semilla
    })
    return res.status(200).json({
      size: response.serie.length,
      intervals: response.intervals
    })
  }
  const pageSize = Number(size);
  const pageNumber = Number(page);
  const from = pageSize * pageNumber;
  const to = (pageNumber + 1) * pageSize;
  return res.status(200).json(response.serie.slice(from, to))

}
