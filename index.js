const countrySelect = document.getElementById("country")
const leagueSelect = document.getElementById("league")
const clubSelect = document.getElementById("club")


const container = document.getElementById("card-wrapper")
let img = document.getElementById("club-image")
let name = document.getElementById("name")
let formedYear = document.getElementById("formed-year")
let nickname = document.getElementById("nickName")
let stadium = document.getElementById("stadium")
let description = document.getElementById("description")


fetch("https://www.thesportsdb.com/api/v1/json/2/all_countries.php")
    .then(res => res.json())
    .then(data => {
        data.countries.forEach(c => {
            let option = document.createElement("option")
            option.innerHTML = c.name_en
            option.value = c.name_en
            countrySelect.append(option)
        })
    })


countrySelect.addEventListener("change", () => {
    let currCountry
    currCountry = countrySelect.value;
    console.log(currCountry);
    fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=${currCountry}&s=Soccer`)
        .then(res => (res.json()))
        // .then(res => console.log(res.countrys))
        .then(data => {
            if (data.countrys != null) {

                leagueSelect.innerHTML = `<option value="0"> ... </option>`
                container.innerHTML = ""
                data.countrys.forEach(e => {
                    let option = document.createElement("option")
                    option.innerHTML = e.strLeague
                    leagueSelect.append(option)
                })

            } else {
                container.innerHTML = "No info yet"
                leagueSelect.innerHTML = `<option value="0"> ... </option>`
            }
        })
})

container.style.display = "none"

leagueSelect.addEventListener("change", () => {
    clubSelect.innerHTML = `<option value="0"> ... </option>`
    let currLeague
    currLeague = leagueSelect.value;
    console.log(currLeague);
    let modifiedLeague = currLeague.split(" ").join("%20")
    console.log(modifiedLeague);
    fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${modifiedLeague}`)
        .then(res => (res.json()))
        .then(data => {
            if (data.teams != null) {
                // leagueSelect.innerHTML = `<option value="0"> ... </option>`
                container.innerHTML = ""
                data.teams.forEach(e => {
                    let option = document.createElement("option")
                    option.innerHTML = e.strTeam
                    clubSelect.append(option)
                })

            } else {
                container.innerHTML = "No info yet"
                leagueSelect.innerHTML = `<option value="0"> ... </option>`
                clubSelect.innerHTML = `<option value="0"> ... </option>`
            }
            clubSelect.addEventListener("change", () => {
                container.innerHTML = ""
                container.style.display = "block"
                let currClub
                currClub = clubSelect.value;
                // console.log(currClub)

                let currTeam = data.teams.filter(t => (t.strTeam == currClub))
                
                container.innerHTML =
                `<div id="card-wrapper">
                    <img id="club-image" src="${currTeam[0].strTeamBadge}" alt="club-badge" width="300" height"300">
                    <div id="info">
                        <div id="name"><b>Name:</b>${currTeam[0].strTeam} </div>
                        <div id="formed-year"><b>Formed Year:</b> ${currTeam[0].intFormedYear}</div>
                        <div id="nickName"><b>AKA:</b> ${currTeam[0].strKeywords}</div>
                        <div id="stadium"><b>Stadium:</b> ${currTeam[0].strStadium}</div>
                        <div id="description"><b>Description:</b> ${currTeam[0].strDescriptionEN}</div>
                    </div>
                </div>`

                img.src = currTeam[0].strTeamBadge
                name.append(currTeam[0].strTeam)
                formedYear.append(currTeam[0].intFormedYear)
                nickname.append(currTeam[0].strKeywords)
                stadium.append(currTeam[0].strStadium)
                description.append(currTeam[0].strDescriptionEN)

                
        
                
            })
        })
})