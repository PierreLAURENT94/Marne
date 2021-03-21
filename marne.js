// Pierre LAURENT - mars 2021
var vigicrueNiveau = new XMLHttpRequest();
vigicrueNiveau.open("GET", "https://www.vigicrues.gouv.fr/services/observations.json/index.php?CdStationHydro=F664000104&GrdSerie=H&FormatSortie=simple", false);
vigicrueNiveau.send();

var vigicrueVitesse = new XMLHttpRequest();
vigicrueVitesse.open("GET", "https://www.vigicrues.gouv.fr/services/observations.json/index.php?CdStationHydro=F664000104&GrdSerie=Q&FormatSortie=simple", false);
vigicrueVitesse.send();

const vigicrueNiveauObjet = JSON.parse(vigicrueNiveau.responseText);
const vigicrueVitesseObjet = JSON.parse(vigicrueVitesse.responseText);

var dernierNiveau = vigicrueNiveauObjet.Serie.ObssHydro[vigicrueNiveauObjet.Serie.ObssHydro.length - 1];
var dernierVitesse = vigicrueVitesseObjet.Serie.ObssHydro[vigicrueVitesseObjet.Serie.ObssHydro.length - 1];

var dernierNiveauDate = new Date(dernierNiveau[0]);
var dernierNiveauNiveau = dernierNiveau[1];
var dernierVitesseVitesse = dernierVitesse[1];

var ajouter ='<h2>' + dernierNiveauDate.toLocaleDateString() + " | " + dernierNiveauDate.toLocaleTimeString() + " : <big><mark>" + dernierNiveauNiveau + "m</mark> | " + dernierVitesseVitesse +"m/s</big></h2>";

var tour;
var actuel;
var actuelDate;
var actuelNiveau;
var actuelVitesse;
var listeObservationNiveau = vigicrueNiveauObjet.Serie.ObssHydro;
var listeObservationVitesse = vigicrueVitesseObjet.Serie.ObssHydro;
listeObservationNiveau.reverse();
listeObservationVitesse.reverse();
for(tour=0; tour < listeObservationNiveau.length; tour++){
    actuelNiveau = listeObservationNiveau[tour];
    actuelVitesse = listeObservationVitesse[tour];
    actuelNiveauDate = new Date(actuelNiveau[0]);
    actuelNiveauNiveau = actuelNiveau[1];
    actuelVitesseVitesse = actuelVitesse[1];
    ajouter+= actuelNiveauDate.toLocaleDateString() + " | " + actuelNiveauDate.toLocaleTimeString() + " : <big><b><mark>" + actuelNiveauNiveau + "m</mark> | " + actuelVitesseVitesse +"m/s</b></big><br/>";
}
document.body.innerHTML+=ajouter;

dessiner(dernierNiveauNiveau * 100);

function dessiner(niveau) {
    var ctx = document.getElementById("canvas").getContext("2d");

    ctx.clearRect(0, 0, 700, 700);

    ctx.fillStyle = "#85C1E9";
    ctx.fillRect(0, 0, 600, 700);

    ctx.fillStyle = "#F4D03F";
    ctx.arc(25, 0, 100, 0, (Math.PI/180)*360);
    ctx.fill();

    ctx.fillStyle = "#145A32";
    ctx.fillRect(0, 700 - niveau, 600, 700);

    ctx.fillStyle = "#CACFD2";
    ctx.fillRect(600, 0, 200, 700);

    for(var tour=675; tour >= 25; tour-=25){
        ctx.fillStyle = "#17202A";
        ctx.fillRect(600, tour - 5, 30, 10);
        ctx.font = '20px sans-serif';
        ctx.fillText((700 - tour)* 0.01 + "m", 635, tour+8);
    }

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#CB4335";
    ctx.fillRect(0, 0, 600, 145 - 5);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#CB4335";
    ctx.fillRect(0, 700 - 555 - 5, 600, 10);

    ctx.font = '30px sans-serif';
    ctx.fillText("5.55m(Mur anti-crue)", 315, 700 - 555 - 5 - 10);

    ctx.fillStyle = "#145A32";
    ctx.font = '30px sans-serif';
    ctx.fillText(niveau* 0.01 + "m(Marne)", 5, 700 - niveau - 10);
}