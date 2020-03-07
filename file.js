var locationData = [];
var rows = [];

function showLocation(attendance_id) {
  console.log(event);

  var locationObj = locationData.find(item => {
    return attendance_id === item.attendance_id;
  });

  var locationCoords = "" + locationObj.lat_lng.lat + locationObj.lat_lng.lng;

  var popupHtml = `<iframe src="./map.html?coords=${locationCoords}" style="width: 80%;height: 80vh;margin-top: 50px;"></iframe>`;

  document.getElementById("popUp").classList.add("show");
  document.getElementById("popUp").innerHTML = popupHtml;
}

document.onload = loadLocationData();
document.onload = loadRowData();
function loadLocationData() {
  fetch("./api/location_tracking.json")
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function(data) {
        locationData = data;
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

function loadRowData() {
  fetch("./api/attendance.json")
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function(data) {
        rows = data;
        showDataOnScreen();
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}

function showDataOnScreen() {
  var html =
    "<table  border='2'><thead><th>Sr_No</th><th>Salesman</th><th>attendance_date</th><th>in_time</th><th>out_time</th><th>Date</th><th>Status</th><th>id</th><th>Action</th></thead>";
  for (var i = 0; i < rows.length; i++) {
    html += "<tr>";
    html += "<td>" + (i + 1) + "</td>";
    html += "<td>" + rows[i].party_id + "</td>";
    html += "<td>" + rows[i].attendance_date + "</td>";
    html += "<td>" + rows[i].in_time + "</td>";
    html += "<td>" + rows[i].out_time + "</td>";
    html += "<td>" + rows[i].date + "</td>";
    html += "<td>" + rows[i].status + "</td>";
    html += "<td>" + rows[i].id + "</td>";
    html +=
      "<td onclick=showLocation('" +
      rows[i].id +
      "')> <button >Show Details</buttton></td>";

    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("box").innerHTML = html;
}

function hidePopup() {
  document.getElementById("popUp").classList.remove("show");
}
