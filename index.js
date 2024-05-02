import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';

import { Functions } from './functions.js';
const { averageSentenceLength, getZipfValue, arraySum, generateNGrams, countPopularWords } = new Functions();

const paths = ['texts/ai', 'texts/human'];

const startSampleAnalysis = ({ path }) => readdirSync(path).forEach(file => {

    const average_words_sum = [];
    const average_sentences_sum = [];
    const average_total_words_sum = [];
    const average_ziph_sum = [];

    const data = readFileSync(join(path, file), 'utf8');
    const articles = data.split('\n\n');

    articles.forEach(text => {
        const { average_sentences_length, average_words_count } = averageSentenceLength({ text });
        // const array = generateNGrams({ n: 3, text });
        // console.log(countPopularWords({ array, limit: 100 }));
        average_sentences_sum.push(average_sentences_length);
        average_words_sum.push(average_words_count);
        average_total_words_sum.push(text.split(' ').length);
        average_ziph_sum.push(getZipfValue({ text }));
    });

    const sum_w = arraySum({ arr: average_words_sum });
    const sum_s = arraySum({ arr: average_sentences_sum });
    const sum_t = arraySum({ arr: average_total_words_sum });
    const sum_z = arraySum({ arr: average_ziph_sum });

    return console.log({
        file,
        articles_count: articles.length,
        average_total_words: sum_t / average_total_words_sum.length,
        average_words_in_sentence: sum_w / average_words_sum.length,
        average_sentences: sum_s / average_sentences_sum.length,
        ziph_law: sum_z / average_ziph_sum.length
    });
});



paths.forEach(path => startSampleAnalysis({ path }));


