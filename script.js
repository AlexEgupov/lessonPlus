'use strict';

const heroes = document.querySelector('.heroes');
const select = document.querySelector('select');

const getData = () => {
    return fetch('dbHeroes.json')
        .then((response) => {
            return response.json();
        });
};

const render = (data) => {

    heroes.innerHTML = '';

    data.forEach((item) => {
        heroes.insertAdjacentHTML('beforeend', `
            <div class="heroes-item">
                <div class="heroes-text">
                    <p>Имя: ${item.name}</p>
                    <p>${item.realName ? `Настоящее имя: ${item.realName}` : ''}</p>
                    <p>${item.species ? `Раса: ${item.species}` : ''}</p>
                    <p>${item.citizenship ? `Гражданство: ${item.citizenship}` : ''}</p>
                    <p>Пол: ${item.gender}</p>
                    <p>${item.birthDay ? `Дата рождения: ${item.birthDay}` : ''}</p>
                    <p>${item.deathDay ? `Дата смерти: ${item.deathDay}` : ''}</p>
                    <p>Статус: ${item.status}</p>
                    <p>Актер: ${item.actors}</p>
                    <p>${item.movies ? `Фильмы с участием: ${item.movies}` : ''}</p>
                </div>
                <div class="heroes-img">
                    <img src="${item.photo}" alt="">
                </div>
            </div>
            `);
    });

};

const filter = (data, selectedMovie) => {
    let compare = new RegExp(selectedMovie);
    let newData = [];
    data.forEach((item) => {
        if (compare.test(item.movies)) {
            newData.push(item);
        }
    });

    if (selectedMovie == 'Фильтр по фильму') {
        getData().then((data) => render(data));
    }

    return newData;
};

select.addEventListener('change', () => {
    let selectedMovie = select.options[select.selectedIndex].text;

    getData().then((data) => {
        render(filter(data, selectedMovie));
    });

});

getData().then((data) => render(data));
