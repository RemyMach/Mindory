import {CardCreationProps, CardInstance, CardProps} from "../../../models/card.model";
import {text} from "express";

export class DeckPythonFixture {

    cards: CardCreationProps[] = [];
    cardsInstance: CardInstance[] = [];

    constructor() {
        this.initCards();
    }

    initCards(): void {
        this.cards.push(
            {text: "Python et les spécificateurs d'accès"},
            {text: "Python consière les spécificateurs d'accès dépassé et redondant"},
            {text: "fonctionnement de l'opérateur ternaire"},
            {text: "A si condition sinon B"},
            {text: "comment une exception est prise en compte en Python ?"},
            {text: "il faut utiliser les mots try et except"},
            {text: "outils pour tester du code en Python"},
            {text: "py.test, Hypothesis, mock, tox, Unittest2"},
            {text: "le fonctionnement des blocs en Python"},
            {text: "les bocs sont définit par indentation"},
            {text: "différence entre list et tuple en Python"},
            {text: "les listes Python sont mutable, les tuples ne le sont pas"},
            {text: "différence entre == et est"},
            {text: "le premier vérifie l'équivalence et le deuxième vérifie que les deux objets sont identiques"},
            {text: "signification de *args et **kwargs"},
            {text: "le premier est utilisé quand on est pas sûr du nombre d'argument mais pas de mot clé et le deuxième permet d'envoyer des arguements avec mot clé donc un dict par exemple"},
            {text: "résultat de -> " +
                    "list = ['1', ‘2', '3', '4', '5']\n" +
                    "print (list[12:]) "},
            {text: "[]"},
            {text: "exemples de fonction terminale en Python"},
            {text: "any all min max, sum"},
            {text: "exemples de fonction intermédiaire en Python"},
            {text: "map zip filter enumeerate sorted reversed"},
            {text: "dans quel ordre sorted retourne une liste"},
            {text: "de l'index le plus petit au plus grand"},
            {text: "dans quel ordre sorted avec l'argument reverse à false retourne une liste"},
            {text: "de l'index le plus grand au plus petit"},
            {text: "comment fonctionne any"},
            {text: "retourne True si au moins un des éléments de la séquence est vrai"},
            {text: "comment fonctionne all"},
            {text: "retourne True si tous les éléments de la séquence sont vrais"},
            {text: "argument pour ouvrir avec la fonction open() un fichier avec un encodage utf-8"},
            {text: "r"},
            {text: "argument pour ouvrir avec la fonction open() un fichier en lisant bit par bit"},
            {text: "rb"},
            {text: "méthode pour fermer le flux d'un fichier"},
            {text: "close()"});
    }
}
