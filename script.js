const listOfPhone = document.getElementById('list-of-phones-id');
const showAllButton = document.getElementById('btn-show-all');

showAllButton.addEventListener('click', function () {
    searchPhoneByText(true);
})

const loadDataFromDB = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await response.json();
    showPhonesToUI(data.data, true);
}

// Search data into DB by text
const searchDataFromDB = async (searchText, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json();
    showPhonesToUI(data.data, isShowAll);
}

// Show data to modal
const handleShowDetails = async getID => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${getID}`);
    const data = await response.json();
    showModal(data.data);
}

const showModal = data => {
    document.querySelector('.modal-box #modal-img').src = data.image;
    document.querySelector('.modal-box #phone-name').textContent = data.name;
    document.querySelector('.modal-box #phone-storage').textContent = data.mainFeatures.storage;
    document.querySelector('.modal-box #phone-chipset').textContent = data.mainFeatures.chipSet;
    document.querySelector('.modal-box #phone-memory').textContent = data.mainFeatures.memory;
    document.querySelector('.modal-box #phone-slug').textContent = data.slug;
    document.querySelector('.modal-box #phone-release').textContent = data.releaseDate;
    document.querySelector('.modal-box #phone-brand').textContent = data.brand;
    document.querySelector('.modal-box #phone-gps').textContent = data.others.GPS;

    show_modal.showModal();
}

const searchPhoneByText = (isShowAll) => {
    const searchInputElement = document.getElementById('search');
    const searchText = searchInputElement.value;
    toggleLoadingSpinner(true);
    searchDataFromDB(searchText, isShowAll);
}

// Toggle spinner on data load
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

const showPhonesToUI = (data, isShowAll) => {
    listOfPhone.innerHTML = '';

    if (data.length > 15 && !isShowAll) {
        showAllButton.classList.remove('hidden');
    } else {
        showAllButton.classList.add('hidden');
    }

    if (!isShowAll) {
        data = data.slice(0, 12);
    }

    data.forEach(phone => {
        const card = `
            <div class="card rounded-[8px] border p-4" data-id="${phone.slug}">
                <div class="bg-cloud p-4 rounded-[8px]">
                    <img class="block mx-auto" src='${phone.image}'>
                </div>
                <div class="my-8">
                    <h1 class="text-center font-bold">${phone.phone_name}</h1>
                    <p class="text-center my-2">There are many variations of passages of available, but the majority have suffered</p>
                    <p class="text-center font-bold">$999</p>
                </div>
                <div>
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-blue block mx-auto">Show Details</button>
                </div>
            </div>
        `
        listOfPhone.insertAdjacentHTML('beforeend', card);
    });

    toggleLoadingSpinner(false);
}


loadDataFromDB();


