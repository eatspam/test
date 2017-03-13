/**
 * Created by mradojewski on 13.03.2017.
 */

const makeProgrammer = function() {

    var languages = [];

    const learn = function(lang) {
        languages.push(lang);
    };

    const isPragmatic = function() {
        return languages.length >= 3;
    };

    return {
        learn: learn,
        isPragmatic: isPragmatic
    };

};


p = makeProgrammer();

p.learn("a");
p.learn("b");

console.log(p.isPragmatic());

p.learn("c");

console.log(p.isPragmatic());