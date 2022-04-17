// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors'
import { calcularIntervalos, fix } from '../../utils';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

const response = {
  serie: [],
  intervals: []
};

const congruenciaLineal = ({
  semilla,
  multiplicativa,
  aditiva,
  modulo,
  n
}) => {
  const axic = (multiplicativa * semilla) + aditiva;
  const next = axic % modulo;
  const rnd = next / (modulo)
  return {
    rnd,
    next,
    axic
  }
}

const congruencialMultiplicativo = ({
  semilla,
  multiplicativa,
  modulo
}) => {
  const axic = (multiplicativa * semilla);
  const next = axic % modulo;
  const rnd = next / (modulo)
  return {
    rnd,
    next,
    axic
  }
}

const nativo = () => {
  return { rnd: Math.random() }
}


const MODOS = {
  lineal: congruenciaLineal,
  multiplicativo: congruencialMultiplicativo,
  nativo
}

const generar = ({ n, modo, multiplicativa, aditiva, modulo, semilla, round }) => {
  let semillaInicial = Number(semilla);
  const shouldRound = JSON.parse(round)
  for (let i = 1; i <= n; i++) {
    const { rnd, next, axic } = MODOS[modo]({
      semilla: semillaInicial,
      modulo: Number(modulo),
      multiplicativa: Number(multiplicativa),
      aditiva: Number(aditiva)
    })
    response.serie.push({
      i,
      axic,
      next,
      rnd: fix(rnd, shouldRound)
    })
    semillaInicial = next;
    response.intervals.forEach(interval => {
      if (rnd >= interval.from && rnd < interval.to) {
        interval.items.push(rnd)
      }
    })
  }
}


export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const { n, modo, page, size, multiplicativa, aditiva, modulo, semilla, intervalos = 5, round } = req.query;
  if (!page && !size) {
    response.serie = [];
    response.intervals = []
    response.intervals = calcularIntervalos(Number(intervalos), round);
    generar({
      n, modo, multiplicativa, aditiva, modulo, semilla, round
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


/** TODO:
 * Truncar o redondear
 * 2 formulas del multiplicativo
 */