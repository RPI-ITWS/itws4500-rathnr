document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const type = document.getElementById('type').value;
    const apiUrl = `http://localhost:3000/get-activity?type=${type}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayActivity(data);
        })
        .catch(error => {
            console.error('Error fetching activity:', error);
            document.getElementById('activityResult').innerHTML = 'Failed to fetch activity. Please try again.';
        });
});

function displayActivity(data) {
    const resultDiv = document.getElementById('activityResult');
    resultDiv.innerHTML = `
        <h2>Activity Suggestion</h2>
        <p><strong>Activity:</strong> ${data.activity}</p>
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Participants:</strong> ${data.participants}</p>
        <p><strong>Price:</strong> ${data.price}</p>
        <p><strong>Accessibility:</strong> ${data.accessibility}</p>
    `;
}
function fetchActivity() {
    const activityType = document.getElementById('activityType').value;
    const participants = document.getElementById('participants').value;
    const price = document.getElementById('price').value;
    const accessibility = document.getElementById('accessibility').value;

    let queryURL = `/get-activity?type=${activityType}`;
    if (participants) queryURL += `&participants=${participants}`;
    if (price) queryURL += `&price=${price}`;
    if (accessibility) queryURL += `&accessibility=${accessibility}`;

    fetch(queryURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayActivity(data);
        })
        .catch(error => {
            console.error('Error fetching activity:', error);
            document.getElementById('activityResult').innerHTML = `<p>Error fetching activity. Please try again.</p>`;
        });
}


