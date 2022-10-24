import Shipment from './modules/Shipment.mjs';

const shipments = [];

fetch(
    'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json'
)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((each) => {
            shipments.push(
                new Shipment(each.id, each.name, each.email, each.boxes)
            );
        });
    })
    .then(() => {
        const data = document.getElementById('data');
        const title = document.getElementById('title');
        const input = document.getElementById('input');
        const cargos = document.getElementById('cargos');
        title.innerHTML = shipments[0].name;
        input.value = shipments[0].boxes;
        shipments.forEach((each) => {
            const li = document.createElement('li');
            li.addEventListener('click', () => {
                title.innerHTML = each.name;
                let boxes = each.boxes;
                let total = 0;
                boxes &&
                    boxes
                        .split(',')
                        .forEach((each) => (total += parseFloat(each)));
                input.value = boxes;
                for (let i = 0; i < data.children.length; i++) {
                    data.children[i].classList.remove('active');
                }

                li.classList.add('active');
                cargos.innerHTML = Math.ceil(total / 10);
            });
            const anchor = document.createElement('a');
            const company = document.createTextNode(each.name);
            anchor.appendChild(company);
            li.appendChild(anchor);
            data.appendChild(li);
        });
        data.firstChild.classList.add('active');
    });
