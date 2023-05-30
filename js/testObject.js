function Ligne(longueur){
    this.longueur = longueur;
}
Ligne.prototype.taille = function(){
    document.getElementById('p1').innerHTML = 'Longueur : ' + this.longueur};

const ligne = new Ligne(4);
console.log(ligne);

function Rectangle(longueur, largeur){
    Ligne.call(this, longueur);
    this.largeur = largeur;
}
Rectangle.prototype = Object.create(Ligne.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.aire = function(){
    document.getElementById('p2').innerHTML =
    'Aire : ' + this.longueur * this.largeur};

const rectangle = new Rectangle(5,6);
console.log(rectangle);
console.log(`rectangle.taille()=${rectangle.taille()}`);
console.log(`rectangle.aire()=${rectangle.aire()}`);

// Ce qu'il y a ci-dessus est difficilement compréhensible.
// Quel sens donner la taille d'un rectangle ? est-ce juste ça longueur comme le sous entend cet exemple ?

function Animal(nom, poids) {
    this.nom = nom;
    this.poids = poids;
}
Animal.prototype.toString = function (){
    document.getElementById('p4').innerHTML = JSON.stringify(this);
}
const animal = new Animal("Joe", 500);
console.log(animal);
animal.toString();


function Chat(nom, poids) {
    Animal.call(this, nom, poids);
    this.nbPattes = 4;
}
Chat.prototype = Object.create(Animal.prototype);
Chat.prototype.constructor = Chat;
Chat.prototype.cri = function() {
    document.getElementById('p5').innerHTML = "Miaou";
}
const chat = new Chat("Migou", 8000);
chat.toString();
console.log(chat);
console.log(chat.prototype);
