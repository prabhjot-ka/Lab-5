const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
const roboImage = document.getElementById('roboImage');

function updateBatteryStatus(battery) {
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = (battery.level * 100);

    fetchRoboImage(battery.level);
}

function fetchRoboImage(batteryLevel) {
    const percentage = Math.round(batteryLevel * 100);
    const imageUrl = `https://robohash.org/${percentage}percent.png`;
    roboImage.src = imageUrl;
}

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);

    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });

    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});
