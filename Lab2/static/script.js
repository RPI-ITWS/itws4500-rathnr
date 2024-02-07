fetch('http://127.0.0.1:3000/articles')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        let tickerClass = document.getElementsByClassName("news-tick");
        let tickerItem = tickerClass[0];
        let newsData = JSON.stringify(data);
        makeNews(tickerItem, newsData);
        

    })
    .catch(error => {
        console.log('There was a problem with the fetch operation:', error);
    });


    function makeNews(element, data) {
        const articles = JSON.parse(data);
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'card';
    
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
    
            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = article.Title;
    
            const description = document.createElement('p');
            description.className = 'card-text';
            description.textContent = article.Description;
    
            const link = document.createElement('a');
            link.href = article.Link;
            link.className = 'btn btn-primary';
            link.textContent = 'Read More';
    
            cardBody.appendChild(title);
            cardBody.appendChild(description);
            cardBody.appendChild(link);
            card.appendChild(cardBody);
            element.appendChild(card);
        });
    }
    