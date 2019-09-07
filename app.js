window.addEventListener('load', () => {
    let long;
    let lat;

    // Check to see if the user has granted location permissions
    if (navigator.geolocation) {
        // Get geolocation information from the browser
        navigator.geolocation.getCurrentPosition(position => {
            // Lattitude and longitude of your position
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let temperatureDescription = document.querySelector('.temperature-description');
            let temperatureDeegree = document.querySelector('.temperature-degree');
            let locationTimezone = document.querySelector('.location-timezone');
            let degreeSection = document.querySelector(".temperature");
            let degreeSpan = document.querySelector(".temperature span");

            // Dark sky will not allow calls from a localhost.
            // Use this proxy to allow it to work in localhost
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/0e9c615e534ccef3ec9a84ed76eef693/${lat},${long}`;

            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                const {temperature, summary, icon} = data.currently;

                // Set DOM elements from the API
                temperatureDeegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Formula for F to C
                let celsius = (temperature - 32) * (5 / 9);

                // Set icons
                setIcons(icon, document.querySelector(".icon"));

                // Change C or F on element click
                degreeSection.addEventListener("click", () => {
                    if (degreeSpan.textContent === "F") {
                        degreeSpan.textContent = "C";
                        temperatureDeegree.textContent = Math.floor(celsius);
                    } else {
                        degreeSpan.textContent = "F";
                        temperatureDeegree.textContent = temperature;
                    }
                })
            });
        });
    } else {
        console.log("Not working");
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});