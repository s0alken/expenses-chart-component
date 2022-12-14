
const card_graph = document.querySelector('.card__graph');
const weekday = new Date().toLocaleString('en-US', {weekday: 'short'}).toLocaleLowerCase();

const loadData = async () => {

    const response = await fetch("../data.json");
    const data = await response.json();

    const maxAmount = Math.max(...data.map(value => value.amount));
    const maxHeight = 15;
    const proportion = maxHeight / maxAmount;

    data.forEach(spent => {

        const column = document.createElement('div');
        const bar = document.createElement('div');
        const fill = document.createElement('div');
        const value = document.createElement('div');
        const label = document.createElement('div');
        
        column.classList.add('card__graph-column');
        bar.classList.add('card__graph-column-bar');
        fill.classList.add('card__graph-column-bar-fill');
        value.classList.add('card__graph-column-bar-value');
        label.classList.add('card__graph-column-label');

        value.textContent = `$${spent.amount}`;
        label.textContent = spent.day;

        bar.style.height = `${proportion * spent.amount}rem`;

        weekday === spent.day && fill.classList.add('highlight');

        bar.appendChild(fill);
        bar.appendChild(value);

        column.appendChild(bar);
        column.appendChild(label);

        card_graph.appendChild(column);

    });
}

loadData();