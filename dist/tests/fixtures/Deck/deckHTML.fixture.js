"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckHTMLFixture = void 0;
var DeckHTMLFixture = /** @class */ (function () {
    function DeckHTMLFixture() {
        this.cards = [];
        this.cardsInstance = [];
        this.initCards();
    }
    DeckHTMLFixture.prototype.initCards = function () {
        this.cards.push({ text: "Que veut dire HTML ?" }, { text: "Hype Text Markup Language" }, { text: "Qui établit les normes du Web ?" }, { text: "The World Wide Web Consortium" }, { text: "La balise HTML pour le plus grand titre" }, { text: "<h1>" }, { text: "La balise HTML qui insert un retour à la ligne" }, { text: "<br>" }, { text: "Une balise HTML avec une couleur de fond" }, { text: "<body style=\"background-color:yellow;\">" }, { text: "La balise HTML qui permet de définir un texte important" }, { text: "<strong>" }, { text: "La balise HTML qui permet de définir un texte accentué" }, { text: "<em>" }, { text: "Une balise HTML avec un lien" }, { text: "<a href=\"www.mindory.fr\">Mindory</a>" }, { text: "Le caractère utilisé pour fermer une balise" }, { text: "/" }, { text: "Une balise que ouvre le lien dans une nouvelle fenêtre" }, { text: "<a href=\"url\" target=\"_blank\">" }, { text: "Une balise HTML qui permet de faire une liste numéroté" }, { text: "<ol>" }, { text: "Une balise HTML qui permet de faire une liste à points" }, { text: "<ul>" }, { text: "Une balise HTML qui permet de faire une case à cocher" }, { text: "<input type=\"checkbox\">" }, { text: "Une balise HTML qui permet de faire un champ texte" }, { text: "<input type=\"text\">" }, { text: "Une balise HTML qui permet de faire une liste déroulante" }, { text: "<select>" }, { text: "Une balise HTML qui permet de faire une zone de texte" }, { text: "<textarea>" }, { text: "Une balise HTML pour insérer une image" }, { text: "<img src=\"image.gif\" alt=\"MonImage\">" }, { text: "Une balise HTML pour insérer une image en arrière plan" }, { text: "<body style=\"background-image:url(background.gif)\">" });
    };
    return DeckHTMLFixture;
}());
exports.DeckHTMLFixture = DeckHTMLFixture;
