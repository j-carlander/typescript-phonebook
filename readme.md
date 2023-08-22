# TypeScript

## Övning

Detta är endast en av många tänkbara övningar. Det viktiga är att du provar på att skapa typescript kod med objekt och interfaces. Ett återskapande av memoryspelet eller dylikt fungerar precis lika bra som övning, men med högre nivå på baskoden.

### Skapa en telefonbok med typescript!

Detta är beskrivningen, efter att du har läst igenom de 4 stegen börja då enligt instruktionerna under "utvecklingssteg".

Telefonlistan ska ha en GUI, och användaren ska kunna

1. Lägga till kontakter med förnamn, efternamn och telefonnummer.
2. Se tillagda kontakter på samma sida där formuläret finns.
3. En kontakt ska kunna markeras som hemlig och då visa xxx på telefonnumret vid utskrift.
4. Kontakten ska kunnas tas bort.

#### Utvecklingssteg 1

1. Skapa **ett** textfält
2. Skapa en knapp
3. Sätt ett clickevent på knappen
4. När clickeventet triggas, pusha innehållet i textfältet som en kontakt
5. Läga kontaktens innehåll i en array av textsträngar

#### Utvecklingssteg 2

1. Printa ut innehållet i arrayen av kontakter till en DOM lista

#### Utvecklingssteg 3

Dags för lite OOP.

Då kontakter kan visas i olika format så är det inte praktiskt att lagra allt direkt som en textsträng.
Dessutom så kan kontaktuppgifter skickas i olika format, exempelvis:

1. firstname, lastname, phonenumber
2. lastname, firstname, phonenumber
3. phonenumber

_Stegen_

1. Skapa därför 3 textfält som representerar varje egenskap.
2. Skapa därefter en klass som representerar en "kontakt", klassen bör innehålla egenskaperna "firstname", "lastname" och "phonenumber".
