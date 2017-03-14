/**
 * Created by mradojewski on 13.03.2017.
 */

function Programmer() {
    this.languages = [];
}

Programmer.prototype.learnNewLanguage = function(lang) {
    this.languages.push(lang);
};

Programmer.prototype.isPragmatic = function() {
    return this.languages.length >= 3;
}

p = new Programmer();

['a','b','c'].forEach(function(x) {
    p.learnNewLanguage(x);
});

console.log('is pragmntic: ', p.isPragmatic());