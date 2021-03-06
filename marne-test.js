var vigicrueNiveau = new XMLHttpRequest();
vigicrueNiveau.open("GET", "https://www.vigicrues.gouv.fr/services/observations.json/index.php?CdStationHydro=F664000104&GrdSerie=H&FormatSortie=simple", false);
vigicrueNiveau.send();

var vigicrueVitesse = new XMLHttpRequest();
vigicrueVitesse.open("GET", "https://www.vigicrues.gouv.fr/services/observations.json/index.php?CdStationHydro=F664000104&GrdSerie=Q&FormatSortie=simple", false);
vigicrueVitesse.send();

const vigicrueNiveauObjet = JSON.parse(vigicrueNiveau.responseText);
const vigicrueVitesseObjet = JSON.parse(vigicrueVitesse.responseText);

var dernierNiveau = vigicrueNiveauObjet.Serie.ObssHydro[vigicrueNiveauObjet.Serie.ObssHydro.length - 1]
var dernierVitesse = vigicrueVitesseObjet.Serie.ObssHydro[vigicrueVitesseObjet.Serie.ObssHydro.length - 1]

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