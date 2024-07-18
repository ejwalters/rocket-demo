let newCookie = getCookie(cname);

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Select the Sign In button
var signInButton = document.getElementById('sign-in-btn');  // Replace 'signInButton' with the actual ID of your Sign In button

// Add a click event listener to the Sign In button
signInButton.addEventListener('click', function () {

    // Handle the click event here
    let name = document.getElementById('signInName').value;
    let email = document.getElementById('signInEmail').value;

    analytics.identify(email, {
        name: name,
        email: email,
    });
    console.log('Sign In button clicked');
    signInModal.style.display = 'none';
});


document.addEventListener('DOMContentLoaded', function () {

    // Select the image in bottom-nav
    var bottomNavImage = document.querySelector('.bottom-nav img');

    // Add a click event listener to the image
    bottomNavImage.addEventListener('click', function () {
        // Navigate to the root directory
        window.location.href = '/';
    });

    const links = document.querySelectorAll('.top-nav .nav-link'); // Select all nav links
    signInModal.style.display = 'none';
    const resetAJS = document.querySelector('.resetAJS');

    if (resetAJS) {
        resetAJS.addEventListener('click', function () {
            analytics.reset();
        });
    }


    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(l => l.classList.remove('active'));
            analytics.track("Navigation Clicked", {
                name: event.target.textContent
            });
            console.log(event.target.textContent); // Remove active class from all links
            this.classList.add('active'); // Add active class to the clicked link
        });
    });
    // Select all the nav-links elements
    const navLinks = document.querySelectorAll('.bottom-nav .nav-links a');
    let mainContent = document.getElementById('mainContent');


    // Add a 'click' event listener to each nav-link
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {


            event.preventDefault(); // Prevent the default action
            console.log(event.target.textContent);
            if (event.target.textContent === 'Learning Center') {
                fetch('learning.html')  // Replace 'media.html' with the path to your HTML file
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (html) {
                        // Insert the HTML content into the content container
                        mainContent.innerHTML = html;
                        // Select all buttons
                        var buttons = document.querySelectorAll('.learning-btn');

                        // Add a click event listener to each button
                        buttons.forEach(function (button, index) {
                            console.log("BUTTONS:" + button.classList);
                            button.addEventListener('click', function (event) {
                                // Prevent the default action
                                event.preventDefault();

                                // Log a message to the console
                                console.log('Button ' + (index + 1) + ' clicked');

                                var card = button.closest('.card');

                                // Get the card title and card text
                                var cardTitle = card.querySelector('.card-title').textContent.trim();
                                var cardText = card.querySelector('.card-text').textContent.trim();
                                let articleCategory;

                                // Log the card title and card text


                                switch (index + 1) {
                                    case 1:
                                        articleCategory = 'First-Time Home Buyer';
                                        break;
                                    case 2:
                                        articleCategory = 'Seasoned Home Buyer';
                                        fetch('article.html')  // Replace 'media.html' with the path to your HTML file
                                            .then(function (response) {
                                                return response.text();
                                            })
                                            .then(function (html) {
                                                mainContent.innerHTML = html;
                                            });
                                        break;
                                    case 3:
                                        articleCategory = 'Refinance';
                                        break;
                                    default:
                                        articleCategory = 'HELOC';
                                        break;
                                }

                                if (index >= 0) {
                                    analytics.track("Article Clicked", {
                                        category: articleCategory,
                                        title: cardTitle,
                                        text: cardText
                                    });
                                }

                            });
                        });
                    })
                    .catch(function (error) {
                        console.log('Error: ' + error);
                    });
            }
            // Add your code here to handle the click event
            analytics.track("Navigation Clicked", {
                name: event.target.textContent
            });
        });
    });



    // Select all the card elements
    const cards = document.querySelectorAll('.card-container .hero-card');

    // Add a 'click' event listener to each card
    cards.forEach(card => {
        card.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action
            for (let className of event.target.classList) {
                //console.log(className);
                let modalHeader;
                switch (className) {
                    case 'buy':
                        modalHeader = 'Buy';
                        break;
                    case 'sell':
                        modalHeader = 'Sell';
                        break;
                    case 'both':
                        modalHeader = 'Buy and Sell';
                        break;
                    default:
                        break;
                }

                if (modalHeader) {
                    analytics.track("Hero Promo Clicked", {
                        name: modalHeader
                    });
                    openModal(modalHeader);
                }
            }
            // Add your code here to handle the click event
        });
    });

    // Function to open the modal and set the header
    // Function to open the modal and set the header
    function openModal(header) {
        // Select the modal and the header element
        const modal = document.querySelector('#modal');
        const buyFields = modal.querySelector('.buy-fields');
        const sellFields = modal.querySelector('.sell-fields');
        const bothFields = modal.querySelector('.both-fields');

        // Hide all fields
        [buyFields, sellFields, bothFields].forEach(fields => {
            fields.style.display = 'none';
            const childDivs = fields.querySelectorAll('div');
            childDivs.forEach(div => {
                div.style.display = 'none';
            });
        });

        // Show only the relevant fields
        let selectedFields;
        switch (header) {
            case 'Buy':
                selectedFields = buyFields;
                break;
            case 'Sell':
                selectedFields = sellFields;
                break;
            case 'Buy and Sell':
                selectedFields = bothFields;
                break;
        }

        if (selectedFields) {
            selectedFields.style.display = 'block';
            const childDivs = selectedFields.querySelectorAll('div');
            childDivs.forEach(div => {
                div.style.display = 'block';
            });
        }

        // Open the modal
        modal.style.display = 'flex';
    }
});

var signInModal = document.getElementById('signInModal');
var signInButton = document.querySelector('.sign-in-btn');
var closeButton = document.querySelector('.close-button');
const modal = document.querySelector('#modal');

document.addEventListener('DOMContentLoaded', function () {


    signInButton.onclick = function () {
        signInModal.style.display = 'flex';
    };

    closeButton.onclick = function () {
        signInModal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == signInModal) {
            signInModal.style.display = 'none';
        }

        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});



function handleSubmit(formType) {
    event.preventDefault(); // Prevent the form from submitting normally
    // Access the form fields


    // Handle the event based on formType
    switch (formType) {
        case 'buy':
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var email = document.getElementById('email').value;
            var zipcode = document.getElementById('zip').value;
            var timeline = document.getElementById('timeline').value;
            var budget = document.getElementById('budget').value;
            analytics.track("Form Submitted", {
                type: 'Buying',
                budget: budget,
                timeline: timeline,
                zipcode: zipcode,
            });
            analytics.identify(email, {
                name: firstName + ' ' + lastName,
                email: email,
                budget: budget,
                zipcode: zipcode,
                is_buyer: true,
            });
            break;
        case 'sell':
            // Handle sell-fields
            var firstName = document.getElementById('sellFirstName').value;
            var lastName = document.getElementById('sellLastName').value;
            var email = document.getElementById('sellEmail').value;
            var zipcode = document.getElementById('sellZip').value;
            var timeline = document.getElementById('sellTimeline').value;
            var budget = document.getElementById('sellValue').value;
            analytics.track("Form Submitted", {
                type: 'Selling',
                home_value: budget,
                timeline: timeline,
                zipcode: zipcode,
            });
            analytics.identify(email, {
                name: firstName + ' ' + lastName,
                email: email,
                home_value: budget,
                zipcode: zipcode,
                is_seller: true,
            });
            break;
        case 'both':
            // Handle both-fields
            var firstName = document.getElementById('bothFirstName').value;
            var lastName = document.getElementById('bothLastName').value;
            var email = document.getElementById('bothEmail').value;
            var zipcode = document.getElementById('bothZip').value;
            var timeline = document.getElementById('bothTimeline').value;
            var homeValue = document.getElementById('both-home-value').value;
            var budget = document.getElementById('bothBudget').value;
            analytics.track("Form Submitted", {
                type: 'Buying & Selling',
                home_value: homeValue,
                timeline: timeline,
                zipcode: zipcode,
                budget: budget,
            });
            analytics.identify(email, {
                name: firstName + ' ' + lastName,
                email: email,
                home_value: homeValue,
                zipcode: zipcode,
                is_seller: true,
                is_buyer: true,
                budget: budget
            });
            break;

    }
    modal.style.display = 'none';
}