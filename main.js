const tariffBase = document.getElementsByClassName('base')[0],
    tariffPremium = document.getElementsByClassName('premium')[0],
    threeMonths = document.getElementsByClassName('threeMonths')[0],
    sixMonths = document.getElementsByClassName('sixMonths')[0],
    oneYer = document.getElementsByClassName('oneYer')[0],
    blockPristavka = document.getElementsByClassName('pristavka')[0], 
    btnPristavkaNo = document.getElementsByClassName('btn-pristavka-no')[0],
    btnPristavkaYes = document.getElementsByClassName('btn-pristavka-yes')[0],
    itemPristavkaBase = document.getElementsByClassName('pristavkaBase')[0],
    itemPristavkaPremium = document.getElementsByClassName('pristavkaPremium')[0],
    btnOrder = document.getElementsByClassName('btn-order')[0];

let objServices = {
        tariff : 'base',
        period : '6',
        pristavka : false,
        type : ''
    };
 
let objPrice = {
        'base3' : 10.50,
        'base6' : 10,
        'base12' : 9,
        'premium3' : 14.50,
        'premium6' : 13.50,
        'premium12' : 12,
    };

tariffBase.addEventListener('click', ()=> activeElement(tariffBase));
tariffPremium.addEventListener('click', ()=> activeElement(tariffPremium));
threeMonths.addEventListener('click', ()=> activeElement(threeMonths));
sixMonths.addEventListener('click', ()=> activeElement(sixMonths));
oneYer.addEventListener('click', ()=> activeElement(oneYer));
itemPristavkaBase.addEventListener('click', ()=> activeBlock(itemPristavkaBase));
itemPristavkaPremium.addEventListener('click', ()=> activeBlock(itemPristavkaPremium));
btnOrder.addEventListener('click', ()=> orderPrice());

btnPristavkaYes.onclick = () => {
    blockPristavka.classList.toggle('show');
    activeElement(btnPristavkaYes);
};

btnPristavkaNo.onclick = () => {
    blockPristavka.classList.toggle('show');
    activeElement(btnPristavkaNo);
}

function activeElement(elem) {
    const list = document.getElementById(elem.parentNode.id),
        idElement = elem.dataset.key,
        objectKey = elem.dataset.name;
    list.querySelectorAll('*').forEach((n) => n.classList.remove('active'));
    elem.classList.add('active');
    objServices[objectKey] = idElement;
}

function activeBlock(elem) {
    const list = document.getElementById(elem.parentNode.id),
        idElement = elem.dataset.key,
        objectKey = elem.dataset.name;
    list.querySelectorAll('*').forEach((n) => n.classList.remove('active_block'));
    elem.classList.add('active_block');
    objServices[objectKey] = idElement;
}

function orderPrice() {
    let sum,
    tariffOrder = objPrice[objServices.tariff + objServices.period];

    if (objServices.pristavka == 'false') {
        sum = tariffOrder;
    }  
    if (objServices.pristavka == 'true' && objServices.type == 'min') {
        sum = (3 * objServices.period) + tariffOrder;
    }       
    if (objServices.pristavka == 'true'  && objServices.type == 'max') {
        sum = (6 * objServices.period) + tariffOrder;
        
    }
    localStorage.setItem('orderPrice', sum);
}