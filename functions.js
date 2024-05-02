export class Functions {

    arraySum = ({ arr }) => arr.reduce((s, a) => s + a, 0);

    splitText = ({ text }) => text
        .split(' ')
        .map(word => word.toLowerCase().replace(/[^а-яА-Я]/g, ''))
        .filter(word => word);

    countUniqWords = ({ words }) => {
        const result = [];
        const uniq_words = new Set(words);
        for (const item of uniq_words.keys()) { result.push({ word: item, count: words.filter(word => word === item).length }) };
        return result.sort((a, b) => b.count - a.count);
    };

    sortByZipfRules = ({ uniq_words }) => {
        const sort_by_rules = [];
        for (let i = 0; i < uniq_words.length; i++) {
            const { word, count } = uniq_words[i];
            const more_frequency_word = uniq_words[0];
            const Zipf_frequency = Number((more_frequency_word.count / (i + 1)).toFixed(2));
            const diff = Number((-Zipf_frequency + count).toFixed(2));
            sort_by_rules.push({ word, count, Zipf_frequency, diff });
        };
        return sort_by_rules;
    };

    getAvgDiffs = ({ sort_by_rules }) => {
        const sum = sort_by_rules.map(word => word.diff).reduce((a, b) => a + b, 0);
        return (sum / sort_by_rules.length);
    };

    getZipfValue = ({ text }) => {
        const words = this.splitText({ text });
        const uniq_words = this.countUniqWords({ words });
        const sort_by_rules = this.sortByZipfRules({ uniq_words });
        const avg = this.getAvgDiffs({ sort_by_rules });
        return avg;
    };

    averageSentenceLength = ({ text }) => {
        const sentences = text.match(/[^.!?]+[.!?]+/g);
        const total_sentences = sentences.length;
        const total_characters = sentences.reduce((total, sentence) => total + sentence.replace(/\s/g, '').length, 0);
        const average_sentences_length = total_characters / total_sentences;
        const total_words = sentences.map(s => s.split(' ').filter(word => word.length > 1).length).reduce((s, a) => s + a, 0);
        const average_words_count = total_words / total_sentences;
        return { average_sentences_length, average_words_count };
    };

    generateNGrams = ({ text, n }) => {
        const words = text.toLowerCase().replace(/[^a-zа-я0-9 ]/g, "").split(" ");
        const nGrams = [];
        for (let i = 0; i < words.length - n + 1; i++) {
            let nGram = "";
            for (let j = 0; j < n; j++) {
                nGram += (j > 0 ? " " : "") + words[i + j];
            }
            nGrams.push(nGram);
        }
        return nGrams;
    };

    countPopularWords = ({ array, limit = 100 }) => {
        let words_map = {};
        array.forEach(word => {
            const lowerCaseWord = word.toLowerCase();
            words_map[lowerCaseWord] = (words_map[lowerCaseWord] || 0) + 1;
        });
        const popular_words = Object.keys(words_map)
            .map(word => ({ word, count: words_map[word] }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
        return popular_words;
    };

};