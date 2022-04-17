import Cors from 'cors'
import { runMiddleware } from '../../runMiddleware';
import { calcularIntervalos, fix, random } from '../../utils';

const response = {
    serie: [],
    intervals: []
}

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
})

const exponencial = (rnd, {
    lambda
}) => {
    if (!lambda) {
        //calcular la media y el lambda
    }
    return (-1 / Number(lambda)) * Math.log(1 - rnd)
}

const normal = (_, {
    media,
    desviacion
}) => {
    const arr = [];
    for(let i = 0; i < 12; i++){
        arr.push(random())
    }
    const sum = arr.reduce((acu, number) => acu + number, 0);
    const res = ((sum - 6) * Number(desviacion)) + Number(media);
    return fix(res);
}

const uniforme = (rnd, {
    a, b
}) => Number(a) + (rnd * (Number(b) - Number(a)))

const exec = (modo, params) => {
    const gen = random();
    const rnd = MODOS[modo](gen, params);
    return { rnd, gen }
}

const MODOS = {
    uniforme,
    exponencial,
    normal
}

const generar = (n, modo, params) => {
    response.serie = [];
    response.max = 0;
    response.min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        const { rnd, gen } = exec(modo, params);
        const result = fix(Number(rnd))
        if(result > response.max){
            response.max = result;
        }
        if(result < response.min){
            response.min = result;
        }
        response.serie.push({
            i, rnd: result, gen
        });
    }
}

const maxMinInterval = (modo, params) => {
    switch(modo){
        case 'uniforme':
            return {
                min: params.a,
                max: Number(params.b)
            }
        case 'exponencial': {
            return {
                min: 0,
                max: response.max
            }
        }
        case 'normal': {
            return {
                min: response.min,
                max: response.max
            }
        }
    }
}


export default async function handler(req, res) {
    await runMiddleware(req, res, cors);
    const { n, modo, page, size, cantIntervalos, ...params } = req.query;
    if (!page && !size) {
        generar(Number(n), modo, params)
        const { min, max } = maxMinInterval(modo, params);
        response.intervals = calcularIntervalos(Number(cantIntervalos), Number(min), Number(max))
        response.serie.forEach(number => {
            response.intervals.forEach(interval => {
                if (number.rnd >= interval.from && (number.rnd < interval.to || interval.number === response.intervals.length)) {
                    interval.items += 1
                }
            })
        })
        return res.status(200).json({
            size: response.serie.length,
            max: response.max,
            min: response.min,
            intervals: response.intervals
        })
    }
    const pageSize = Number(size);
    const pageNumber = Number(page);
    const from = pageSize * pageNumber;
    const to = (pageNumber + 1) * pageSize;
    return res.status(200).json(response.serie.slice(from, to))

}
