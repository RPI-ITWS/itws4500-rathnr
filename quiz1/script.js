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

function displayActivity(activity) {
    const resultDiv = document.getElementById('activityResult');
    if (activity.error) {
        resultDiv.innerHTML = activity.error;
    } else {
        resultDiv.innerHTML = 
        `<p><strong>Activity:</strong> ${activity.activity}</p>
        <p><strong>Type:</strong> ${activity.type}</p>
        <p><strong>Participants:</strong> ${activity.participants}</p>
        <p><strong>Price:</strong> ${activity.price}</p>
        <p><strong>Link:</strong> ${activity.link ? `<a href="${activity.link}" target="_blank">Click here</a>` : 'N/A'}</p>`;
    }
}
